import type { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'artificial-intelligence',
    slug: 'artificial-intelligence',
    name: 'Artificial Intelligence & Systems Future',
    shortName: 'AI & Systems',
    description: 'Critical investigation of autonomous agents, frontier models, task horizons, verification bottlenecks, and technological governance.',
    icon: 'sparkles',
    color: '#714cb6',
    subcategories: ['Frontier Models', 'Reliability & Verification', 'The Control Problem', 'Entrenchment & Governance', 'Action Checklists'],
    featuredBookSlug: 'what-if-ai-became-10x-smarter-tomorrow'
  }
];
