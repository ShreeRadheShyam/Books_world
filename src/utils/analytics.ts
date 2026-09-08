/**
 * Analytics abstraction for BookskiDuniya
 * Allows tracking outbound clicks, book views, and search terms
 * without locking into any single analytics provider.
 */

export interface AnalyticsEventMap {
  ebook_external_click: {
    ebookId: string;
    ebookSlug: string;
    ebookTitle: string;
    destination: string;
    authorName: string;
    price: number;
  };
  ebook_view: {
    ebookId: string;
    ebookSlug: string;
  };
  search_performed: {
    query: string;
    resultsCount: number;
  };
  filter_applied: {
    category?: string;
    priceRange?: string;
    minRating?: number;
  };
}

export function trackEvent<K extends keyof AnalyticsEventMap>(
  eventName: K,
  payload: AnalyticsEventMap[K]
): void {
  if (typeof window === 'undefined') return;

  // Log in development
  if (import.meta.env.DEV) {
    console.info(`[Analytics Event: ${eventName}]`, payload);
  }

  // Dispatch custom browser event for any listener/provider (Plausible, PostHog, GA, etc.)
  const customEvent = new CustomEvent('bookskiduniya:analytics', {
    detail: {
      event: eventName,
      properties: payload,
      timestamp: new Date().toISOString()
    }
  });
  window.dispatchEvent(customEvent);
}
