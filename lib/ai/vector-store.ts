/**
 * Vector Store Service
 * Handles semantic search and content embeddings using Pinecone + Supabase
 */

import { Pinecone } from '@pinecone-database/pinecone';
import { createClient } from '@supabase/supabase-js';
import { openaiService } from './openai-service';
import type { 
  EmbeddingMetadata, 
  SearchResult, 
  VectorSearchOptions 
} from '@/types/ai';

export class VectorStore {
  private static instance: VectorStore;
  private pinecone?: Pinecone;
  private supabase?: ReturnType<typeof createClient>;
  private indexName = 'astro-intelligence';

  private constructor() {
    // Initialize Pinecone (optional)
    if (!process.env.PINECONE_API_KEY) {
      console.warn('Pinecone API key not configured. Vector search will use fallback mode.');
    } else {
      try {
        this.pinecone = new Pinecone({
          apiKey: process.env.PINECONE_API_KEY,
        });
      } catch (error) {
        console.error('Failed to initialize Pinecone:', error);
        console.warn('Vector search will use fallback mode.');
      }
    }

    // Initialize Supabase (optional)
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.warn('Supabase environment variables not configured. Content storage will use fallback mode.');
    } else {
      try {
        this.supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );
      } catch (error) {
        console.error('Failed to initialize Supabase:', error);
        console.warn('Content storage will use fallback mode.');
      }
    }
  }

  public static getInstance(): VectorStore {
    if (!VectorStore.instance) {
      VectorStore.instance = new VectorStore();
    }
    return VectorStore.instance;
  }

  /**
   * Check if Pinecone is available
   */
  private isPineconeAvailable(): boolean {
    return !!this.pinecone;
  }

  /**
   * Check if Supabase is available
   */
  private isSupabaseAvailable(): boolean {
    return !!this.supabase;
  }

  /**
   * Generate fallback search results
   */
  private generateFallbackSearchResults(query: string): SearchResult[] {
    const fallbackContent = [
      {
        id: 'service-ai-consulting',
        content: 'AI & ML Consulting: We help organizations develop comprehensive AI strategies, implement machine learning solutions, and ensure ethical AI practices.',
        title: 'AI & ML Consulting',
        category: 'services',
        score: 0.8
      },
      {
        id: 'service-cloud-architecture',
        content: 'Cloud Architecture: Design and implement scalable, secure cloud infrastructures on AWS, Azure, and GCP.',
        title: 'Cloud Architecture',
        category: 'services',
        score: 0.7
      },
      {
        id: 'service-platform-engineering',
        content: 'Platform Engineering: DevOps, infrastructure automation, monitoring, and CI/CD pipeline implementation.',
        title: 'Platform Engineering',
        category: 'services',
        score: 0.6
      }
    ];

    const queryLower = query.toLowerCase();
    
    return fallbackContent
      .filter(item => 
        item.content.toLowerCase().includes(queryLower) ||
        item.title.toLowerCase().includes(queryLower)
      )
      .map(item => ({
        id: item.id,
        content: item.content,
        score: item.score,
        metadata: {
          type: 'service',
          source: 'fallback',
          title: item.title,
          category: item.category,
          timestamp: Date.now()
        }
      }));
  }

  /**
   * Store content with embeddings
   */
  async storeContent(
    content: string,
    metadata: EmbeddingMetadata
  ): Promise<void> {
    try {
      // Generate embedding
      const embedding = await openaiService.generateEmbedding(content);
      
      // Store in Pinecone for semantic search
      if (this.isPineconeAvailable()) {
        const index = this.pinecone!.Index(this.indexName);
        await index.upsert([{
          id: metadata.id,
          values: embedding,
          metadata: {
            content: content.substring(0, 40000), // Pinecone metadata limit
            type: metadata.type,
            source: metadata.source,
            title: metadata.title,
            category: metadata.category,
            timestamp: Date.now(),
            contentLength: content.length
          }
        }]);
      } else {
        console.warn('Pinecone not available, skipping vector storage');
      }

      // Store full content in Supabase
      if (this.isSupabaseAvailable()) {
        const { error } = await this.supabase!
          .from('ai_embeddings')
          .upsert({
            id: metadata.id,
            content,
            embedding,
            type: metadata.type,
            source: metadata.source,
            title: metadata.title,
            category: metadata.category,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (error) {
          console.error('Supabase storage error:', error);
          throw new Error('Failed to store content in Supabase');
        }
      } else {
        console.warn('Supabase not available, skipping database storage');
      }
    } catch (error) {
      console.error('Vector storage error:', error);
      throw new Error('Failed to store content with embeddings');
    }
  }

  /**
   * Semantic search using vector similarity
   */
  async search(
    query: string,
    options: VectorSearchOptions = {}
  ): Promise<SearchResult[]> {
    const {
      limit = 10,
      threshold = 0.7,
      category,
      type
    } = options;

    // Use fallback search if Pinecone is not available
    if (!this.isPineconeAvailable()) {
      console.warn('Pinecone unavailable, using fallback search');
      const fallbackResults = this.generateFallbackSearchResults(query);
      return fallbackResults
        .filter(result => category ? result.metadata.category === category : true)
        .filter(result => type ? result.metadata.type === type : true)
        .slice(0, limit);
    }

    try {
      // Generate query embedding
      const queryEmbedding = await openaiService.generateEmbedding(query);
      
      // Build filter for Pinecone
      const filter: Record<string, any> = {};
      if (category) filter.category = category;
      if (type) filter.type = type;

      // Search in Pinecone
      const index = this.pinecone!.Index(this.indexName);
      const searchResults = await index.query({
        vector: queryEmbedding,
        topK: limit,
        includeMetadata: true,
        filter: Object.keys(filter).length > 0 ? filter : undefined
      });

      // Filter by similarity threshold and format results
      const results: SearchResult[] = (searchResults.matches || [])
        .filter((match) => match.score && match.score >= threshold)
        .map((match) => ({
          id: match.id,
          content: String(match.metadata?.content || ''),
          score: match.score!,
          metadata: {
            type: String(match.metadata?.type || 'unknown'),
            source: String(match.metadata?.source || ''),
            title: String(match.metadata?.title || ''),
            category: String(match.metadata?.category || 'general'),
            timestamp: typeof match.metadata?.timestamp === 'number' 
              ? match.metadata.timestamp 
              : Date.now()
          }
        }));

      // If no results from Pinecone, fallback to static search
      if (results.length === 0) {
        console.warn('No Pinecone results found, using fallback search');
        const fallbackResults = this.generateFallbackSearchResults(query);
        return fallbackResults
          .filter(result => category ? result.metadata.category === category : true)
          .filter(result => type ? result.metadata.type === type : true)
          .slice(0, limit);
      }

      return results;
    } catch (error) {
      console.error('Vector search error:', error);
      console.warn('Falling back to static search due to error');
      const fallbackResults = this.generateFallbackSearchResults(query);
      return fallbackResults
        .filter(result => category ? result.metadata.category === category : true)
        .filter(result => type ? result.metadata.type === type : true)
        .slice(0, limit);
    }
  }

  /**
   * Find similar content to a given document
   */
  async findSimilar(
    contentId: string,
    options: VectorSearchOptions = {}
  ): Promise<SearchResult[]> {
    try {
      // Get the content from Supabase
      if (!this.isSupabaseAvailable()) {
        console.warn('Supabase unavailable, cannot find similar content');
        return [];
      }
      
      const { data: content, error } = await this.supabase!
        .from('ai_embeddings')
        .select('embedding, content, type, source, title, category')
        .eq('id', contentId)
        .single() as { 
          data: {
            embedding: number[];
            content: string;
            type: string;
            source: string;
            title: string;
            category: string;
          } | null;
          error: any;
        };

      if (error || !content) {
        throw new Error('Content not found');
      }

      // Use the stored embedding for similarity search
      if (!this.isPineconeAvailable()) {
        console.warn('Pinecone unavailable, cannot find similar content');
        return [];
      }
      const index = this.pinecone!.Index(this.indexName);
      const searchResults = await index.query({
        vector: content.embedding,
        topK: (options.limit || 10) + 1, // +1 to exclude the original
        includeMetadata: true,
        filter: options.category ? { category: options.category } : undefined
      });

      // Filter out the original document and format results
      const results: SearchResult[] = (searchResults.matches || [])
        .filter((match) => match.id !== contentId)
        .slice(0, options.limit || 10)
        .map((match) => ({
          id: match.id,
          content: String(match.metadata?.content || ''),
          score: match.score || 0,
          metadata: {
            type: String(match.metadata?.type || 'unknown'),
            source: String(match.metadata?.source || ''),
            title: String(match.metadata?.title || ''),
            category: String(match.metadata?.category || 'general'),
            timestamp: typeof match.metadata?.timestamp === 'number' 
              ? match.metadata.timestamp 
              : Date.now()
          }
        }));

      return results;
    } catch (error) {
      console.error('Similar content search error:', error);
      throw new Error('Failed to find similar content');
    }
  }

  /**
   * Get content by ID from Supabase
   */
  async getContent(contentId: string): Promise<{
    content: string;
    metadata: EmbeddingMetadata;
  } | null> {
    try {
      if (!this.isSupabaseAvailable()) {
        console.warn('Supabase unavailable, cannot get content');
        return null;
      }
      
      const { data, error } = await this.supabase!
        .from('ai_embeddings')
        .select('*')
        .eq('id', contentId)
        .single();

      if (error || !data) {
        return null;
      }

      return {
        content: String(data.content || ''),
        metadata: {
          id: String(data.id || ''),
          type: String(data.type || 'unknown'),
          source: String(data.source || ''),
          title: String(data.title || ''),
          category: String(data.category || 'general')
        }
      };
    } catch (error) {
      console.error('Content retrieval error:', error);
      return null;
    }
  }

  /**
   * Delete content from both Pinecone and Supabase
   */
  async deleteContent(contentId: string): Promise<void> {
    try {
      // Delete from Pinecone
      if (this.isPineconeAvailable()) {
        const index = this.pinecone!.Index(this.indexName);
        await index.deleteOne(contentId);
      } else {
        console.warn('Pinecone unavailable, skipping vector deletion');
      }

      // Delete from Supabase
      if (!this.isSupabaseAvailable()) {
        console.warn('Supabase unavailable, skipping database deletion');
        return;
      }
      const { error } = await this.supabase!
        .from('ai_embeddings')
        .delete()
        .eq('id', contentId);

      if (error) {
        console.error('Supabase deletion error:', error);
        throw new Error('Failed to delete content from Supabase');
      }
    } catch (error) {
      console.error('Content deletion error:', error);
      throw new Error('Failed to delete content');
    }
  }

  /**
   * Initialize the vector database with sample content
   */
  async initializeWithSampleContent(): Promise<void> {
    const sampleContent = [
      {
        id: 'service-ai-consulting',
        content: 'AI & ML Consulting: We help organizations develop comprehensive AI strategies, implement machine learning solutions, and ensure ethical AI practices. Our team of experts guides you through the entire AI transformation journey, from initial assessment to production deployment.',
        metadata: {
          id: 'service-ai-consulting',
          type: 'service',
          source: 'website',
          title: 'AI & ML Consulting',
          category: 'services'
        }
      },
      {
        id: 'service-cloud-architecture',
        content: 'Cloud Architecture: Design and implement scalable, secure cloud infrastructures on AWS, Azure, and GCP. We provide cloud migration services, multi-cloud strategies, and ongoing optimization to ensure your infrastructure meets your business needs.',
        metadata: {
          id: 'service-cloud-architecture',
          type: 'service',
          source: 'website',
          title: 'Cloud Architecture',
          category: 'services'
        }
      },
      {
        id: 'case-study-fintech',
        content: 'Fintech Transformation Case Study: Implemented AI-powered trading platform that reduced processing time by 75% and improved accuracy by 40%. The solution included real-time data processing, machine learning models for prediction, and scalable cloud infrastructure.',
        metadata: {
          id: 'case-study-fintech',
          type: 'case-study',
          source: 'portfolio',
          title: 'Fintech AI Trading Platform',
          category: 'case-studies'
        }
      }
    ];

    for (const item of sampleContent) {
      await this.storeContent(item.content, item.metadata);
    }
  }
}

// Export singleton instance
export const vectorStore = VectorStore.getInstance();