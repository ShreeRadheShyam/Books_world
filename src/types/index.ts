export interface ChapterItem {
  number: number | string;
  title: string;
  kicker?: string;
  description?: string;
  body?: string;
  pages?: number;
}

export interface BookPart {
  number: number | string;
  title: string;
  description: string;
  chapters: ChapterItem[];
}

export interface BookMetric {
  num: string;
  title: string;
  description: string;
}

export interface BookDomain {
  num: string;
  title: string;
  description: string;
  chapterKey?: string;
}

export interface BookHardProblem {
  num: string;
  title: string;
  description: string;
  chapterKey?: string;
}

export interface ScenarioItem {
  title: string;
  lead: string;
  items: [string, string][];
}

export interface CitationReview {
  source: string;
  quote: string;
}

export interface Ebook {
  id: string;
  slug: string; // e.g. "10xAiTomorrow"
  title: string;
  subtitle: string;
  description: string;
  shortDescription: string;
  authorId: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  tags: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  pages: number;
  language: string;
  format: string;
  featured?: boolean;
  bestseller?: boolean;
  newRelease?: boolean;
  editorsPick?: boolean;
  trending?: boolean;
  externalUrl: string;
  publishedAt: string;
  lastUpdated?: string;
  isbn?: string;
  highlights: string[];
  whatYouWillLearn: string[];
  targetAudience: {
    idealFor: string[];
    notFor?: string[];
  };
  tableOfContents: {
    chapterNumber: number;
    title: string;
    description?: string;
    pages?: number;
  }[];
  coverStyle: {
    bgGradient: string;
    accentColor: string;
    badgeText?: string;
    badgeColor?: string;
    icon: string;
    pattern?: 'dots' | 'grid' | 'waves' | 'circuit' | 'geometric';
  };
  // Rich Superhuman Landing Page Structures
  landingSlug?: string;
  launchBadge?: string;
  keyIdea?: string;
  citationReviews?: CitationReview[];
  parts?: BookPart[];
  metrics?: BookMetric[];
  domains?: BookDomain[];
  hardProblems?: BookHardProblem[];
  scenarios?: Record<string, ScenarioItem>;
  checklists?: {
    individual: string[];
    organizational: string[];
  };
}

export interface Author {
  id: string;
  slug: string;
  name: string;
  title: string;
  company?: string;
  avatar: string;
  bio: string;
  shortBio: string;
  location?: string;
  socials: {
    twitter?: string;
    github?: string;
    website?: string;
    linkedin?: string;
  };
  featuredBookSlug?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  description: string;
  icon: string;
  color: string;
  subcategories: string[];
  featuredBookSlug?: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  curatorNote: string;
  icon: string;
  badge: string;
  gradient: string;
  ebookSlugs: string[];
}

export interface FilterOptions {
  category?: string;
  subcategory?: string;
  priceRange?: 'all' | 'under-20' | '20-35' | 'above-35';
  minRating?: number;
  format?: string;
  badge?: 'featured' | 'bestseller' | 'newRelease' | 'editorsPick' | 'trending';
  sort?: 'featured' | 'popular' | 'newest' | 'rating' | 'price-asc' | 'price-desc';
  search?: string;
  tag?: string;
}
