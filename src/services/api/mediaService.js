/**
 * ==============================================================================
 * POLARSPHERE MEDIA SERVICE
 * "The Polar World, Through India's Eyes"
 * ==============================================================================
 * Manages high-resolution photographs, expedition 4K footage, and infographics.
 */

import { db } from '../db/databaseAdapter.js';

export const mediaService = {
  async getMedia({ limit = 50, offset = 0, type, region, search } = {}) {
    const options = {
      limit,
      offset,
      where: {}
    };

    if (type && type !== 'ALL') {
      options.where.type = type;
    }
    if (region && region !== 'ALL') {
      options.where.geographic_region = region;
    }

    let result = await db.findMany('media', options);

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      const filtered = result.data.filter(m => 
        m.title.toLowerCase().includes(q) ||
        (m.description && m.description.toLowerCase().includes(q)) ||
        (m.topic && m.topic.toLowerCase().includes(q)) ||
        (m.location && m.location.toLowerCase().includes(q))
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

  async getMediaById(id) {
    if (!id) return null;
    return db.getById('media', id);
  }
};
