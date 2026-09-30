/**
 * ==============================================================================
 * POLARSPHERE EXPEDITIONS SERVICE
 * "The Polar World, Through India's Eyes"
 * ==============================================================================
 * Manages access to Indian scientific polar expeditions (Antarctic, Arctic, SO, Himalaya).
 */

import { db } from '../db/databaseAdapter.js';

export const expeditionsService = {
  async getExpeditions({ limit = 50, offset = 0, region, status, search } = {}) {
    const options = {
      limit,
      offset,
      where: {}
    };

    if (region && region !== 'ALL') {
      options.where.region = region;
    }
    if (status && status !== 'ALL') {
      options.where.status = status;
    }

    let result = await db.findMany('expeditions', options);

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      const filtered = result.data.filter(e => 
        e.expedition_name.toLowerCase().includes(q) ||
        e.code.toLowerCase().includes(q) ||
        (e.description && e.description.toLowerCase().includes(q)) ||
        (e.leader_name && e.leader_name.toLowerCase().includes(q))
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

  async getExpeditionById(id) {
    if (!id) return null;
    return db.getById('expeditions', id);
  },

  async getExpeditionDatasets(id) {
    return db.getExpeditionDatasets(id);
  },

  async getExpeditionMedia(id) {
    return db.getExpeditionMedia(id);
  },

  async getExpeditionResearchers(id) {
    return db.getExpeditionResearchers(id);
  }
};
