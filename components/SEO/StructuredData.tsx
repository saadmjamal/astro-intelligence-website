import Script from 'next/script';

interface PersonSchema {
  '@type': 'Person';
  name: string;
  jobTitle: string;
  url: string;
  sameAs: string[];
  knowsAbout: string[];
  alumniOf?: {
    '@type': 'Organization';
    name: string;
  };
}

interface OrganizationSchema {
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  founder: PersonSchema;
  foundingDate: string;
  description: string;
  sameAs: string[];
  knowsAbout: string[];
  areaServed: string;
  serviceType: string[];
}

interface ServiceSchema {
  '@type': 'Service';
  name: string;
  description: string;
  provider: {
    '@type': 'Organization';
    name: string;
  };
  serviceType: string;
  areaServed: string;
  hasOfferCatalog?: {
    '@type': 'OfferCatalog';
    name: string;
    itemListElement: Array<{
      '@type': 'Offer';
      itemOffered: {
        '@type': 'Service';
        name: string;
        description: string;
      };
    }>;
  };
}

const personSchema: PersonSchema = {
  '@type': 'Person',
  name: 'Saad Jamal',
  jobTitle: 'Cloud Engineer & AI Specialist',
  url: 'https://saadjamal.com',
  sameAs: [
    'https://github.com/saadjamal',
    'https://linkedin.com/in/saadjamal',
    'https://twitter.com/saadjamal'
  ],
  knowsAbout: [
    'Cloud Architecture',
    'Artificial Intelligence',
    'Machine Learning',
    'DevOps',
    'Automation',
    'Software Engineering'
  ]
};

const organizationSchema: OrganizationSchema = {
  '@type': 'Organization',
  name: 'Saad Jamal Consulting',
  url: 'https://saadjamal.com',
  logo: 'https://saadjamal.com/logo.png',
  founder: personSchema,
  foundingDate: '2023-01-01',
  description: 'Cloud engineering and AI consulting services for modern enterprises',
  sameAs: [
    'https://github.com/saadjamal',
    'https://linkedin.com/in/saadjamal'
  ],
  knowsAbout: [
    'Cloud Computing',
    'Artificial Intelligence',
    'Machine Learning',
    'Automation',
    'DevOps'
  ],
  areaServed: 'Worldwide',
  serviceType: [
    'Cloud Architecture Consulting',
    'AI/ML Engineering',
    'Automation Solutions',
    'Software Development'
  ]
};

export function OrganizationStructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    ...organizationSchema
  };

  return (
    <Script
      id="organization-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function PersonStructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    ...personSchema
  };

  return (
    <Script
      id="person-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ServiceStructuredData({ 
  serviceName, 
  serviceDescription 
}: { 
  serviceName: string; 
  serviceDescription: string;
}) {
  const serviceSchema: ServiceSchema = {
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'Organization',
      name: 'Saad Jamal Consulting'
    },
    serviceType: serviceName,
    areaServed: 'Worldwide'
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    ...serviceSchema
  };

  return (
    <Script
      id={`service-structured-data-${serviceName.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ArticleStructuredData({
  title,
  description,
  datePublished,
  dateModified,
  author = 'Saad Jamal',
  image
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image || 'https://saadjamal.com/og-image.png',
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Saad Jamal Consulting',
      logo: {
        '@type': 'ImageObject',
        url: 'https://saadjamal.com/logo.png'
      }
    }
  };

  return (
    <Script
      id="article-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbStructuredData({
  items
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FAQStructuredData({
  faqs
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <Script
      id="faq-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}