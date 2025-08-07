'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { allPosts } from '@/.contentlayer/generated';
import { compareDesc } from 'date-fns';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import { PageLayout } from '@/components/layout/PageLayout';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  User, 
  Search, 
  Tag, 
  TrendingUp,
  Star,
  BookOpen,
  Filter,
  Sparkles
} from 'lucide-react';

// Reading time calculation helper
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Author profiles
const authorProfiles = {
  'Saad Jamal': {
    avatar: '/images/team/saad-jamal.jpg',
    role: 'Chief Technology Officer',
    expertise: ['Cloud Architecture', 'AI/ML', 'DevOps', 'Cost Optimization'],
    bio: 'Expert in cloud optimization and AI implementation with 15+ years of experience.'
  },
  // Add more authors as needed
};

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showNewsletter, setShowNewsletter] = useState(false);

  // Sort posts by date
  const sortedPosts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  const featuredPost = sortedPosts[0];
  const categories = Array.from(new Set(sortedPosts.map(post => post.tags).flat()));

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    let posts = sortedPosts;
    
    if (searchQuery) {
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedCategory) {
      posts = posts.filter(post => post.tags.includes(selectedCategory));
    }
    
    return posts;
  }, [searchQuery, selectedCategory, sortedPosts]);

  const relatedContent = [
    {
      id: 'case-studies',
      title: 'Case Studies',
      excerpt: 'Real-world success stories and transformations',
      href: '/portfolio',
    },
    {
      id: 'research',
      title: 'Research Lab',
      excerpt: 'Cutting-edge research and innovations',
      href: '/lab',
    },
    {
      id: 'whitepapers',
      title: 'Whitepapers',
      excerpt: 'In-depth technical guides and analyses',
      href: '/resources',
    },
  ];

  return (
    <PageLayout relatedContent={relatedContent}>
      {/* Hero Section with Featured Article */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <BookOpen className="h-16 w-16 text-primary" />
                <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-purple-500 animate-pulse" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
              AstroIntelligence Insights
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              Expert insights on cloud optimization, AI implementation, and modern infrastructure.
              Stay ahead with cutting-edge strategies and real-world solutions.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 backdrop-blur border-white/20 text-white placeholder:text-white/60"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div>
                <div className="text-2xl font-bold text-primary">{sortedPosts.length}</div>
                <div className="text-sm text-muted-foreground">Articles</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-500">{categories.length}</div>
                <div className="text-sm text-muted-foreground">Topics</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-500">10K+</div>
                <div className="text-sm text-muted-foreground">Monthly Readers</div>
              </div>
            </div>
          </div>

          {/* Featured Article */}
          {featuredPost && (
            <Card className="max-w-5xl mx-auto p-0 overflow-hidden hover bg-gradient-to-r from-primary/5 to-purple-500/5 border-primary/20">
              <div className="md:flex">
                <div className="md:flex-1 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="default" className="bg-primary text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(featuredPost.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                    <Link href={featuredPost.url} className="hover:text-primary transition-colors">
                      {featuredPost.title}
                    </Link>
                  </h2>
                  
                  <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {calculateReadingTime(featuredPost.body.raw)} min read
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.slice(0, 4).map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        size="sm"
                        className="cursor-pointer transition-colors hover:bg-primary hover:text-white"
                        onClick={() => setSelectedCategory(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button size="lg" asChild className="group">
                    <Link href={featuredPost.url}>
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
                
                {featuredPost.image && (
                  <div className="md:w-96 h-64 md:h-auto bg-muted overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                      <TrendingUp className="h-16 w-16 text-primary/60" />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 border-b">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Filter by topic:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={selectedCategory === null ? "default" : "outline"} 
                className="cursor-pointer transition-colors"
                onClick={() => setSelectedCategory(null)}
              >
                All Articles ({sortedPosts.length})
              </Badge>
              
              {categories.slice(0, 6).map((category) => {
                const count = sortedPosts.filter(post => post.tags.includes(category)).length;
                return (
                  <Badge 
                    key={category} 
                    variant={selectedCategory === category ? "default" : "outline"} 
                    className="cursor-pointer transition-colors"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category} ({count})
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest Articles</h2>
              <p className="text-muted-foreground">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} 
                {selectedCategory && ` in ${selectedCategory}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => setShowNewsletter(!showNewsletter)}
              className="group"
            >
              Subscribe to Updates
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Newsletter Signup */}
          {showNewsletter && (
            <Card className="mb-12 p-8 bg-gradient-to-r from-primary/5 to-purple-500/5 border-primary/20">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                <p className="text-muted-foreground mb-6">
                  Get the latest insights on cloud optimization, AI implementation, and infrastructure best practices delivered to your inbox.
                </p>
                <div className="flex gap-4 max-w-md mx-auto">
                  <Input type="email" placeholder="Enter your email" className="flex-1" />
                  <Button>Subscribe</Button>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Join 5,000+ professionals. No spam, unsubscribe anytime.
                </p>
              </div>
            </Card>
          )}

          <div className="grid gap-8">
            {filteredPosts.map((post, index) => {
              if (index === 0) return null; // Skip featured post
              
              const author = authorProfiles[post.author as keyof typeof authorProfiles];
              const readingTime = calculateReadingTime(post.body.raw);
              
              return (
                <Card key={post.slug} hover className="p-6 group">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {readingTime} min read
                        </span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight">
                        <Link 
                          href={post.url} 
                          className="hover:text-primary transition-colors group-hover:text-primary"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{post.author}</span>
                          {author && (
                            <span className="text-xs text-muted-foreground">• {author.role}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Tag className="h-3 w-3 text-muted-foreground mt-1" />
                        {post.tags.slice(0, 4).map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="outline" 
                            size="sm"
                            className="cursor-pointer transition-colors hover:bg-primary hover:text-white"
                            onClick={() => setSelectedCategory(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="md:w-48 h-32 md:h-36 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-primary/60" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6 pt-4 border-t">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={post.url} className="group/btn">
                        Read Article 
                        <ArrowRight className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    
                    {/* Related Articles Preview */}
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <TrendingUp className="h-3 w-3" />
                      {Math.floor(Math.random() * 500 + 100)} views
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Load More */}
          {filteredPosts.length > 10 && (
            <div className="text-center mt-12">
              <Button size="lg" variant="outline">
                Load More Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="p-12 text-center bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Infrastructure?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get expert guidance on cloud optimization, AI implementation, and modern infrastructure.
              Join thousands of companies that trust AstroIntelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/portfolio">View Case Studies</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </PageLayout>
  );
}