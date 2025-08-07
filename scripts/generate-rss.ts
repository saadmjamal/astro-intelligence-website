import { Feed } from 'feed';
import { allPosts } from '../.contentlayer/generated/index.mjs';
import { writeFileSync } from 'fs';
import path from 'path';

const siteUrl = process.env.SITE_URL || 'https://astrointelligence.com';

const feed = new Feed({
  title: 'Astro Intelligence Blog',
  description: 'Insights on AI, cloud architecture, and ethical technology from the Astro Intelligence team',
  id: siteUrl,
  link: `${siteUrl}/blog`,
  language: 'en',
  image: `${siteUrl}/og-image.png`,
  favicon: `${siteUrl}/favicon.ico`,
  copyright: `All rights reserved ${new Date().getFullYear()}, Astro Intelligence Inc`,
  updated: new Date(),
  generator: 'Feed for Node.js',
  feedLinks: {
    rss: `${siteUrl}/rss.xml`,
    json: `${siteUrl}/feed.json`,
    atom: `${siteUrl}/atom.xml`,
  },
  author: {
    name: 'Astro Intelligence Team',
    email: 'hello@astrointelligence.com',
    link: siteUrl,
  },
});

// Add posts to feed
allPosts
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .forEach((post) => {
    const url = `${siteUrl}/blog/${post.slug}`;
    
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt,
      content: post.body.raw,
      author: [
        {
          name: post.author,
          email: 'team@astrointelligence.com',
        },
      ],
      date: new Date(post.date),
      category: post.tags?.map((tag) => ({ name: tag })) || [],
    });
  });

// Generate RSS, Atom, and JSON feeds
const publicDir = path.join(process.cwd(), 'public');

writeFileSync(path.join(publicDir, 'rss.xml'), feed.rss2());
writeFileSync(path.join(publicDir, 'atom.xml'), feed.atom1());
writeFileSync(path.join(publicDir, 'feed.json'), feed.json1());

console.log('✅ RSS, Atom, and JSON feeds generated successfully!');