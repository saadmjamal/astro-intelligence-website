import { Metadata } from 'next';

interface GenerateMetadataProps {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    images?: string[];
  };
  twitter?: {
    title?: string;
    description?: string;
    images?: string[];
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
  alternates?: {
    canonical?: string;
  };
}

const siteConfig = {
  name: 'Astro Intelligence Inc',
  url: 'https://astrointelligence.com',
  description: 'Leading provider of AI-enhanced orchestration, DevOps, and cloud solutions',
  twitter: '@astrointel',
};

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  openGraph,
  twitter,
  robots = { index: true, follow: true },
  alternates,
}: GenerateMetadataProps): Metadata {
  const metadataTitle = `${title} | ${siteConfig.name}`;

  return {
    title: metadataTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates,
    openGraph: {
      title: openGraph?.title || metadataTitle,
      description: openGraph?.description || description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: openGraph?.images || ['/og-image.png'],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: twitter?.title || metadataTitle,
      description: twitter?.description || description,
      site: siteConfig.twitter,
      creator: siteConfig.twitter,
      images: twitter?.images || ['/twitter-image.png'],
    },
    robots: {
      index: robots.index,
      follow: robots.follow,
      googleBot: {
        index: robots.index,
        follow: robots.follow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateArticleMetadata(
  props: GenerateMetadataProps & {
    publishedTime: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  }
): Metadata {
  const baseMetadata = generateSEOMetadata(props);

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      type: 'article',
      publishedTime: props.publishedTime,
      modifiedTime: props.modifiedTime,
      authors: props.authors,
      tags: props.tags,
    },
  };
}
