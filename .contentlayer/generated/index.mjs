// NOTE This file is auto-generated by Contentlayer

export { isType } from 'contentlayer2/client'

// NOTE During development Contentlayer imports from `.mjs` files to improve HMR speeds.
// During (production) builds Contentlayer it imports from `.json` files to improve build performance.
import allPosts from './Post/_index.json' with { type: 'json' }
import allCaseStudies from './CaseStudy/_index.json' with { type: 'json' }
import allResearchArticles from './ResearchArticle/_index.json' with { type: 'json' }

export { allPosts, allCaseStudies, allResearchArticles }

export const allDocuments = [...allPosts, ...allCaseStudies, ...allResearchArticles]


