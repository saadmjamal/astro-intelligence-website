// This script generates placeholder images for development
// In production, these would be replaced with actual screenshots and diagrams

const fs = require('fs');
const path = require('path');

// Simple SVG placeholder generator
function generatePlaceholderSVG(width, height, text, bgColor = '#1a1a2e', textColor = '#fff') {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="${bgColor}"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
          font-family="Arial, sans-serif" font-size="24" fill="${textColor}">
      ${text}
    </text>
  </svg>`;
}

// Define placeholder images
const placeholders = [
  // FinTech case study images
  { path: 'case-studies/fintech/dashboard-overview.svg', text: 'Dashboard Overview', width: 1920, height: 1080 },
  { path: 'case-studies/fintech/architecture-diagram.svg', text: 'Architecture Diagram', width: 1920, height: 1080 },
  { path: 'case-studies/fintech/deployment-pipeline.svg', text: 'CI/CD Pipeline', width: 1920, height: 1080 },
  { path: 'case-studies/fintech/monitoring-dashboard.svg', text: 'Monitoring Dashboard', width: 1920, height: 1080 },
  { path: 'case-studies/fintech/legacy-architecture.svg', text: 'Legacy Architecture', width: 1920, height: 1080, bgColor: '#2e1a1a' },
  { path: 'case-studies/fintech/modern-architecture.svg', text: 'Modern Architecture', width: 1920, height: 1080, bgColor: '#1a2e1a' },
  { path: 'case-studies/fintech/system-design.svg', text: 'System Design', width: 1920, height: 1080 },
  { path: 'case-studies/fintech/data-flow.svg', text: 'Data Flow Diagram', width: 1920, height: 1080 },
  { path: 'case-studies/fintech-transformation.svg', text: 'FinTech Transformation', width: 1920, height: 1080 },
  
  // Other case studies
  { path: 'case-studies/browser-autopilot.svg', text: 'Browser Autopilot', width: 1920, height: 1080 },
  { path: 'case-studies/33seconds-dating.svg', text: '33Seconds Dating App', width: 1920, height: 1080 },
  { path: 'case-studies/houston-property.svg', text: 'Houston Property Services', width: 1920, height: 1080 },
  
  // Testimonial avatars
  { path: 'testimonials/sarah-chen.svg', text: 'SC', width: 200, height: 200, bgColor: '#e91e63' },
  { path: 'testimonials/david-park.svg', text: 'DP', width: 200, height: 200, bgColor: '#2196f3' },
  { path: 'testimonials/rachel-green.svg', text: 'RG', width: 200, height: 200, bgColor: '#4caf50' },
  
  // Blog post images
  { path: 'blog/ethical-ai.svg', text: 'Ethical AI in Enterprise', width: 1920, height: 1080, bgColor: '#0f172a' },
  { path: 'blog/platform-engineering.svg', text: 'Platform Engineering', width: 1920, height: 1080, bgColor: '#1e3a8a' },
  { path: 'blog/vdi-automation.svg', text: 'VDI Automation', width: 1920, height: 1080, bgColor: '#166534' },
  { path: 'blog/infrastructure-as-code.svg', text: 'Infrastructure as Code', width: 1920, height: 1080, bgColor: '#7c2d12' },
  { path: 'blog/k8s-ai.svg', text: 'Kubernetes AI Orchestration', width: 1920, height: 1080, bgColor: '#581c87' },
  { path: 'blog/ethical-ai-implementation.svg', text: 'AI Implementation Guide', width: 1920, height: 1080, bgColor: '#0c4a6e' },
  { path: 'blog/cloud-cost-optimization.svg', text: 'Cloud Cost Optimization', width: 1920, height: 1080, bgColor: '#0f766e' },
];

// Generate all placeholder images
placeholders.forEach(({ path: imagePath, text, width, height, bgColor, textColor }) => {
  const fullPath = path.join(__dirname, '../public/images', imagePath);
  const dir = path.dirname(fullPath);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Generate and save SVG
  const svg = generatePlaceholderSVG(width, height, text, bgColor, textColor);
  fs.writeFileSync(fullPath, svg);
  console.log(`Generated: ${imagePath}`);
});

console.log('\nPlaceholder images generated successfully!');
console.log('Note: Replace these with actual screenshots and diagrams for production.');