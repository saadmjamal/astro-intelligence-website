import { generateSEOMetadata, generateArticleMetadata } from '@/lib/utils/metadata';
import { Metadata } from 'next';

describe('generateSEOMetadata', () => {
  const baseUrl = 'https://astrointelligence.com';

  it('generates basic metadata with title and description', () => {
    const metadata = generateSEOMetadata({
      title: 'Test Page',
      description: 'Test description',
    });

    expect(metadata.title).toBe('Test Page | Astro Intelligence Inc');
    expect(metadata.description).toBe('Test description');
  });

  it('generates Open Graph metadata', () => {
    const metadata = generateSEOMetadata({
      title: 'OG Test',
      description: 'OG description',
    });

    expect(metadata.openGraph?.title).toBe('OG Test | Astro Intelligence Inc');
    expect(metadata.openGraph?.description).toBe('OG description');
    expect(metadata.openGraph?.url).toBe(baseUrl);
    expect(metadata.openGraph?.siteName).toBe('Astro Intelligence Inc');
    expect((metadata.openGraph as any)?.type).toBe('website');
  });

  it('includes custom OG image when provided', () => {
    const metadata = generateSEOMetadata({
      title: 'Test',
      description: 'Test',
      openGraph: {
        images: ['/custom-image.jpg'],
      },
    });

    expect(metadata.openGraph?.images).toEqual(['/custom-image.jpg']);
  });

  it('generates dynamic OG image when not provided', () => {
    const metadata = generateSEOMetadata({
      title: 'Test',
      description: 'Test description',
    });

    const images = metadata.openGraph?.images as any[];
    expect(images[0].url).toContain('/api/og?title=Test&description=Test%20description');
    expect(images[0].width).toBe(1200);
    expect(images[0].height).toBe(630);
    expect(images[0].alt).toBe('Test');
  });

  it('generates Twitter card metadata', () => {
    const metadata = generateSEOMetadata({
      title: 'Twitter Test',
      description: 'Twitter description',
    });

    expect((metadata.twitter as any)?.card).toBe('summary_large_image');
    expect(metadata.twitter?.title).toBe('Twitter Test | Astro Intelligence Inc');
    expect(metadata.twitter?.description).toBe('Twitter description');
    expect(metadata.twitter?.creator).toBe('@astrointel');
  });

  it('includes keywords when provided', () => {
    const keywords = ['AI', 'cloud', 'consulting'];
    const metadata = generateSEOMetadata({
      title: 'Test',
      description: 'Test',
      keywords,
    });

    expect(metadata.keywords).toBe('AI, cloud, consulting');
  });

  it('generates canonical URL', () => {
    const metadata = generateSEOMetadata({
      title: 'Test',
      description: 'Test',
      alternates: {
        canonical: '/services/ai-consulting',
      },
    });

    expect(metadata.metadataBase?.toString()).toBe(`${baseUrl}/`);
    expect(metadata.alternates?.canonical).toBe('/services/ai-consulting');
  });

  it('sets noIndex when specified', () => {
    const metadata = generateSEOMetadata({
      title: 'Test',
      description: 'Test',
      robots: {
        index: false,
        follow: false,
      },
    });

    expect((metadata.robots as any)?.index).toBe(false);
    expect((metadata.robots as any)?.follow).toBe(false);
  });

  it('allows robots to index by default', () => {
    const metadata = generateSEOMetadata({
      title: 'Test',
      description: 'Test',
    });

    expect((metadata.robots as any)?.index).toBe(true);
    expect((metadata.robots as any)?.follow).toBe(true);
  });
});

describe('generateArticleMetadata', () => {
  it('generates article-specific metadata', () => {
    const publishedTime = '2024-01-01';
    const metadata = generateArticleMetadata({
      title: 'Article Test',
      description: 'Article description',
      publishedTime,
      authors: ['Saad Jamal'],
      tags: ['AI', 'cloud'],
    });

    expect((metadata.openGraph as any)?.type).toBe('article');
    expect((metadata.openGraph as any)?.publishedTime).toBe(publishedTime);
    expect((metadata.openGraph as any)?.authors).toEqual(['Saad Jamal']);
    expect((metadata.openGraph as any)?.tags).toEqual(['AI', 'cloud']);
  });

  it('includes modified time when provided', () => {
    const publishedTime = '2024-01-01';
    const modifiedTime = '2024-01-15';
    const metadata = generateArticleMetadata({
      title: 'Article Test',
      description: 'Article description',
      publishedTime,
      modifiedTime,
    });

    expect((metadata.openGraph as any)?.modifiedTime).toBe(modifiedTime);
  });
});