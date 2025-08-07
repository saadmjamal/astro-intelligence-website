import { algoliasearch } from 'algoliasearch';
import { allPosts, allCaseStudies, allResearchArticles } from '../.contentlayer/generated/index.mjs';

// Initialize Algolia client
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_KEY!
);

interface SearchRecord {
  objectID: string;
  type: 'post' | 'case-study' | 'research';
  title: string;
  description: string;
  content: string;
  url: string;
  date: string;
  author?: string;
  authors?: string[];
  tags?: string[];
  category?: string;
  [key: string]: unknown; // Index signature for Algolia compatibility
}

async function indexContent() {
  console.log('🔍 Starting content indexing...');

  const records: SearchRecord[] = [];

  // Index blog posts
  allPosts.forEach((post) => {
    records.push({
      objectID: `post-${post.slug}`,
      type: 'post',
      title: post.title,
      description: post.excerpt,
      content: post.body.raw,
      url: post.url,
      date: post.date,
      author: post.author,
      tags: post.tags,
    });
  });

  // Index case studies
  allCaseStudies.forEach((study) => {
    records.push({
      objectID: `case-study-${study.slug}`,
      type: 'case-study',
      title: study.title,
      description: study.excerpt,
      content: study.body.raw,
      url: study.url,
      date: study.date,
      tags: study.services,
    });
  });

  // Index research articles
  allResearchArticles.forEach((article) => {
    records.push({
      objectID: `research-${article.slug}`,
      type: 'research',
      title: article.title,
      description: article.abstract,
      content: article.body.raw,
      url: article.url,
      date: article.date,
      authors: article.authors,
      tags: article.tags,
      category: article.category,
    });
  });

  // Configure index settings - commenting out until we verify the correct v5 API
  // TODO: Update to correct Algolia v5 API for settings
  /*
  await client.setSettings({
    indexName: 'astro_intelligence',
    searchableAttributes: [
      'title',
      'description',
      'content',
      'tags',
      'author',
      'authors',
      'category'
    ],
    attributesToHighlight: ['title', 'description'],
    attributesToSnippet: ['content:50'],
    customRanking: ['desc(date)'],
    distinct: true,
    attributeForDistinct: 'url',
  });
  */

  // Clear existing records and add new ones
  await client.clearObjects({ indexName: 'astro_intelligence' });
  const result = await client.saveObjects({ 
    indexName: 'astro_intelligence',
    objects: records 
  });

  console.log(`✅ Indexed ${records.length} records`);
  console.log('📊 Breakdown:');
  console.log(`   - Blog posts: ${allPosts.length}`);
  console.log(`   - Case studies: ${allCaseStudies.length}`);
  console.log(`   - Research articles: ${allResearchArticles.length}`);
}

// Run indexing
indexContent().catch((error) => {
  console.error('❌ Indexing failed:', error);
  process.exit(1);
});