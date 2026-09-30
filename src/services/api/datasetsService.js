/**
 * ==============================================================================
 * POLARSPHERE DATASETS SERVICE
 * "The Polar World, Through India's Eyes"
 * ==============================================================================
 * Manages open scientific cryospheric, atmospheric, and oceanographic datasets.
 */

import { db } from '../db/databaseAdapter.js';

export const datasetsService = {
  async getDatasets({ limit = 50, offset = 0, region, domain, format, accessLevel, search } = {}) {
    const options = {
      limit,
      offset,
      where: {}
    };

    if (region && region !== 'ALL') {
      options.where.geographic_region = region;
    }
    if (domain && domain !== 'ALL') {
      options.where.scientific_domain = domain;
    }
    if (format && format !== 'ALL') {
      options.where.data_format = format;
    }
    if (accessLevel && accessLevel !== 'ALL') {
      options.where.access_level = accessLevel;
    }

    let result = await db.findMany('datasets', options);

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      const filtered = result.data.filter(d => 
        d.title.toLowerCase().includes(q) ||
        (d.description && d.description.toLowerCase().includes(q)) ||
        (d.keywords && d.keywords.some(k => k.toLowerCase().includes(q))) ||
        (d.doi && d.doi.toLowerCase().includes(q))
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

  async getDatasetById(id) {
    if (!id) return null;
    return db.getById('datasets', id);
  },

  async getDatasetLineage(id) {
    if (!id) return null;
    return db.getDatasetLineage(id);
  }
};
