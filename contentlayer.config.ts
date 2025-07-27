import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    author: { type: 'string', required: true },
    excerpt: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    image: { type: 'string' },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/blog/${post._raw.flattenedPath.replace('blog/', '')}`,
    },
    slug: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath.replace('blog/', ''),
    },
  },
}));

export const CaseStudy = defineDocumentType(() => ({
  name: 'CaseStudy',
  filePathPattern: `case-studies/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    client: { type: 'string', required: true },
    date: { type: 'date', required: true },
    industry: { type: 'string', required: true },
    services: { type: 'list', of: { type: 'string' }, required: true },
    metrics: { type: 'json', required: true }, // For success metrics
    excerpt: { type: 'string', required: true },
    image: { type: 'string' },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (study) => `/portfolio/${study._raw.flattenedPath.replace('case-studies/', '')}`,
    },
    slug: {
      type: 'string',
      resolve: (study) => study._raw.flattenedPath.replace('case-studies/', ''),
    },
  },
}));

export const ResearchArticle = defineDocumentType(() => ({
  name: 'ResearchArticle',
  filePathPattern: `research/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    authors: { type: 'list', of: { type: 'string' }, required: true },
    abstract: { type: 'string', required: true },
    category: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (article) => `/research-lab/${article._raw.flattenedPath.replace('research/', '')}`,
    },
    slug: {
      type: 'string',
      resolve: (article) => article._raw.flattenedPath.replace('research/', ''),
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, CaseStudy, ResearchArticle],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          onVisitLine(node: any) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push('line--highlighted');
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ['word--highlighted'];
          },
        },
      ],
    ],
  },
});
