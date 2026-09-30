/**
 * ==============================================================================
 * POLARSPHERE PUBLICATIONS SERVICE
 * "The Polar World, Through India's Eyes"
 * ==============================================================================
 * Handles scientific polar publications and peer-reviewed journals.
 */

import { db } from '../db/databaseAdapter.js';

export const publicationsService = {
  async getPublications({ limit = 50, offset = 0, domain, search } = {}) {
    const options = {
      limit,
      offset,
      where: {}
    };

    if (domain && domain !== 'ALL') {
      options.where.scientific_domain = domain;
    }

    let result = await db.findMany('publications', options);

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      const filtered = result.data.filter(p => 
        p.title.toLowerCase().includes(q) ||
        (p.abstract && p.abstract.toLowerCase().includes(q)) ||
        (p.authors && p.authors.some(a => a.toLowerCase().includes(q))) ||
        (p.journal && p.journal.toLowerCase().includes(q)) ||
        (p.doi && p.doi.toLowerCase().includes(q))
      );
      return {
        data: filtered,
        total: filtered.length,
        limit,
        offset,
        hasMore: false
      };
    }

    return result;
  },

  async getPublicationById(id) {
    if (!id) return null;
    return db.getById('publications', id);
  }
};
