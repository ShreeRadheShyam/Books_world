import type { Ebook, Author, Category, Collection } from '../types';

export const SITE_URL = 'https://bookskiduniya.com';
export const SITE_NAME = 'BookskiDuniya';
export const DEFAULT_DESCRIPTION = 'The premier discovery platform for independent digital eBooks, engineering blueprints, and creator guides.';

export function generateBookSchema(ebook: Ebook, author?: Author) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': `${SITE_URL}/ebooks/${ebook.slug}`,
    name: ebook.title,
    headline: ebook.subtitle,
    description: ebook.shortDescription,
    url: `${SITE_URL}/ebooks/${ebook.slug}`,
    inLanguage: ebook.language,
    numberOfPages: ebook.pages,
    bookFormat: 'https://schema.org/EBook',
    isbn: ebook.isbn || `EBOOK-${ebook.id}`,
    datePublished: ebook.publishedAt,
    dateModified: ebook.lastUpdated || ebook.publishedAt,
    author: {
      '@type': 'Person',
      name: author ? author.name : 'Independent Creator',
      url: author ? `${SITE_URL}/authors/${author.slug}` : undefined,
      jobTitle: author?.title
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL
    },
    offers: {
      '@type': 'Offer',
      price: ebook.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: ebook.externalUrl
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ebook.rating,
      bestRating: 5,
      worstRating: 1,
      ratingCount: ebook.reviewCount
    }
  };
}

export function generateAuthorSchema(author: Author, publishedBooks: Ebook[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/authors/${author.slug}`,
    name: author.name,
    jobTitle: author.title,
    description: author.shortBio,
    url: `${SITE_URL}/authors/${author.slug}`,
    sameAs: [
      author.socials.website,
      author.socials.twitter,
      author.socials.github,
      author.socials.linkedin
    ].filter(Boolean),
    worksFor: author.company ? { '@type': 'Organization', name: author.company } : undefined,
    hasOccupation: {
      '@type': 'Occupation',
      name: author.title
    }
  };
}

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item.startsWith('http') ? item.item : `${SITE_URL}${item.item}`
    }))
  };
}

export function generateCollectionSchema(collection: Collection, books: Ebook[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.title,
    description: collection.description,
    url: `${SITE_URL}/collections/${collection.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: books.length,
      itemListElement: books.map((book, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/ebooks/${book.slug}`,
        name: book.title
      }))
    }
  };
}
