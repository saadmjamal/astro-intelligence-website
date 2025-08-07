#!/usr/bin/env ts-node

/**
 * Image optimization script to generate WebP and AVIF versions of images
 * and create multiple sizes for responsive loading
 */

import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { glob } from 'glob';

// Configuration
const SUPPORTED_FORMATS = ['jpg', 'jpeg', 'png'] as const;
const OUTPUT_FORMATS = ['webp', 'avif'] as const;
const IMAGE_SIZES = [320, 640, 1024, 1920, 2560] as const;
const IMAGE_QUALITY = {
  webp: 85,
  avif: 80,
  jpeg: 90,
} as const;

interface OptimizationResult {
  original: string;
  optimized: string[];
  savings: number;
}

async function optimizeImage(imagePath: string): Promise<OptimizationResult> {
  const result: OptimizationResult = {
    original: imagePath,
    optimized: [],
    savings: 0,
  };

  try {
    const originalStats = await fs.stat(imagePath);
    const originalSize = originalStats.size;
    const parsedPath = path.parse(imagePath);
    const outputDir = path.join(parsedPath.dir, 'optimized');
    
    // Create output directory
    await fs.mkdir(outputDir, { recursive: true });
    
    // Load image
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    if (!metadata.width || !metadata.height) {
      throw new Error('Could not read image dimensions');
    }
    
    let totalOptimizedSize = 0;
    
    // Generate different sizes and formats
    for (const size of IMAGE_SIZES) {
      // Skip sizes larger than original
      if (size > metadata.width) continue;
      
      for (const format of OUTPUT_FORMATS) {
        const outputName = `${parsedPath.name}-${size}w.${format}`;
        const outputPath = path.join(outputDir, outputName);
        
        await image
          .resize(size, null, {
            withoutEnlargement: true,
            fit: 'inside',
          })
          [format]({
            quality: IMAGE_QUALITY[format],
            effort: format === 'avif' ? 4 : 6, // Balance speed vs compression
          })
          .toFile(outputPath);
        
        const optimizedStats = await fs.stat(outputPath);
        totalOptimizedSize += optimizedStats.size;
        result.optimized.push(outputPath);
        
        console.log(`✓ Generated ${outputName} (${formatBytes(optimizedStats.size)})`);
      }
    }
    
    // Calculate savings (average across all generated files)
    const avgOptimizedSize = totalOptimizedSize / result.optimized.length;
    result.savings = ((originalSize - avgOptimizedSize) / originalSize) * 100;
    
    return result;
  } catch (error) {
    console.error(`✗ Failed to optimize ${imagePath}:`, error);
    return result;
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');
  
  // Find all images in public directory
  const imagePatterns = SUPPORTED_FORMATS.map(ext => `public/**/*.${ext}`);
  const imagePaths: string[] = [];
  
  for (const pattern of imagePatterns) {
    const paths = await glob(pattern, { ignore: '**/optimized/**' });
    imagePaths.push(...paths);
  }
  
  if (imagePaths.length === 0) {
    console.log('No images found to optimize.');
    return;
  }
  
  console.log(`Found ${imagePaths.length} images to optimize.\n`);
  
  // Process images
  const results: OptimizationResult[] = [];
  for (const imagePath of imagePaths) {
    console.log(`\nProcessing: ${path.basename(imagePath)}`);
    const result = await optimizeImage(imagePath);
    results.push(result);
  }
  
  // Summary
  console.log('\n📊 Optimization Summary:');
  console.log('========================');
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  let optimizedCount = 0;
  
  for (const result of results) {
    if (result.optimized.length > 0) {
      console.log(`\n${path.basename(result.original)}:`);
      console.log(`  Generated ${result.optimized.length} optimized versions`);
      console.log(`  Average savings: ${result.savings.toFixed(1)}%`);
      optimizedCount++;
    }
  }
  
  console.log(`\n✅ Successfully optimized ${optimizedCount} images`);
  console.log('\nNext steps:');
  console.log('1. Update your image components to use the optimized versions');
  console.log('2. Implement <picture> elements or use Next.js Image for automatic format selection');
  console.log('3. Consider implementing a build-time optimization step');
}

// Check if sharp is installed
async function checkDependencies() {
  try {
    await import('sharp');
  } catch {
    console.error('❌ Error: sharp is not installed.');
    console.error('Please run: pnpm add -D sharp');
    process.exit(1);
  }
}

// Run the script
checkDependencies().then(() => {
  main().catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
});