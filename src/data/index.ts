import { ebooks } from './ebooks';
import { authors } from './authors';
import { categories } from './categories';
import { collections } from './collections';
import type { Ebook, Author, Category, Collection, FilterOptions } from '../types';

export * from './ebooks';
export * from './authors';
export * from './categories';
export * from './collections';

// Ebook helpers
export function getAllEbooks(): Ebook[] {
  return ebooks;
}

export function getEbookBySlug(slug: string): Ebook | undefined {
  return ebooks.find((b) => b.slug === slug);
}

export function getFeaturedEbooks(): Ebook[] {
  return ebooks.filter((b) => b.featured);
}

export function getTrendingEbooks(): Ebook[] {
  return ebooks.filter((b) => b.trending);
}

export function getBestsellers(): Ebook[] {
  return ebooks.filter((b) => b.bestseller);
}

export function getNewReleases(): Ebook[] {
  return ebooks.filter((b) => b.newRelease);
}

export function getEditorsPicks(): Ebook[] {
  return ebooks.filter((b) => b.editorsPick);
}

export function getRelatedEbooks(currentEbook: Ebook, limit: number = 3): Ebook[] {
  return ebooks
    .filter((b) => b.id !== currentEbook.id)
    .sort((a, b) => {
      // Score based on shared category, author, or tags
      let scoreA = 0;
      let scoreB = 0;

      if (a.categorySlug === currentEbook.categorySlug) scoreA += 4;
      if (b.categorySlug === currentEbook.categorySlug) scoreB += 4;

      if (a.authorId === currentEbook.authorId) scoreA += 3;
      if (b.authorId === currentEbook.authorId) scoreB += 3;

      const sharedTagsA = a.tags.filter((t) => currentEbook.tags.includes(t)).length;
      const sharedTagsB = b.tags.filter((t) => currentEbook.tags.includes(t)).length;
      scoreA += sharedTagsA;
      scoreB += sharedTagsB;

      return scoreB - scoreA;
    })
    .slice(0, limit);
}

// Author helpers
export function getAllAuthors(): Author[] {
  return authors;
}

export function getAuthorById(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}

export function getEbooksByAuthor(authorId: string): Ebook[] {
  return ebooks.filter((b) => b.authorId === authorId);
}

// Category helpers
export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getEbooksByCategory(categorySlug: string): Ebook[] {
  return ebooks.filter((b) => b.categorySlug === categorySlug);
}

export function getCategoryBookCount(categorySlug: string): number {
  return ebooks.filter((b) => b.categorySlug === categorySlug).length;
}

// Collection helpers
export function getAllCollections(): Collection[] {
  return collections;
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getEbooksForCollection(collection: Collection): Ebook[] {
  return collection.ebookSlugs
    .map((slug) => getEbookBySlug(slug))
    .filter((b): b is Ebook => b !== undefined);
}

// Filtering & Search
export function queryEbooks(options: FilterOptions = {}): Ebook[] {
  let results = [...ebooks];

  if (options.search) {
    const q = options.search.toLowerCase().trim();
    results = results.filter((b) => {
      const author = getAuthorById(b.authorId);
      return (
        b.title.toLowerCase().includes(q) ||
        b.subtitle.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q)) ||
        b.category.toLowerCase().includes(q) ||
        (author && author.name.toLowerCase().includes(q))
      );
    });
  }

  if (options.category && options.category !== 'all') {
    results = results.filter((b) => b.categorySlug === options.category);
  }

  if (options.subcategory && options.subcategory !== 'all') {
    results = results.filter((b) => b.subcategory.toLowerCase() === options.subcategory?.toLowerCase());
  }

  if (options.priceRange && options.priceRange !== 'all') {
    if (options.priceRange === 'under-20') {
      results = results.filter((b) => b.price < 20);
    } else if (options.priceRange === '20-35') {
      results = results.filter((b) => b.price >= 20 && b.price <= 35);
    } else if (options.priceRange === 'above-35') {
      results = results.filter((b) => b.price > 35);
    }
  }

  if (options.minRating) {
    results = results.filter((b) => b.rating >= options.minRating!);
  }

  if (options.badge) {
    if (options.badge === 'featured') results = results.filter((b) => b.featured);
    else if (options.badge === 'bestseller') results = results.filter((b) => b.bestseller);
    else if (options.badge === 'newRelease') results = results.filter((b) => b.newRelease);
    else if (options.badge === 'editorsPick') results = results.filter((b) => b.editorsPick);
    else if (options.badge === 'trending') results = results.filter((b) => b.trending);
  }

  if (options.tag) {
    results = results.filter((b) => b.tags.map((t) => t.toLowerCase()).includes(options.tag!.toLowerCase()));
  }

  // Sorting
  switch (options.sort) {
    case 'popular':
      results.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case 'newest':
      results.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      break;
    case 'rating':
      results.sort((a, b) => b.rating - a.rating);
      break;
    case 'price-asc':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'featured':
    default:
      results.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });
      break;
  }

  return results;
}
