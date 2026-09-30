/**
 * ==============================================================================
 * POLARSPHERE RESEARCHERS SERVICE
 * "The Polar World, Through India's Eyes"
 * ==============================================================================
 * Provides clean CRUD, filtering, and relationship traversal for Polar Researchers.
 */

import { db } from '../db/databaseAdapter.js';

export const researchersService = {
  async getResearchers({ limit = 50, offset = 0, institution, specialization, search } = {}) {
    const options = {
      limit,
      offset,
      where: {}
    };

    if (institution && institution !== 'ALL') {
      options.where.institution = institution;
    }

    let result = await db.findMany('researchers', options);

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      const filtered = result.data.filter(r => 
        r.name.toLowerCase().includes(q) ||
        r.institution.toLowerCase().includes(q) ||
        (r.specialization && r.specialization.toLowerCase().includes(q))
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

  async getResearcherById(id) {
    if (!id) return null;
    return db.getById('researchers', id);
  },

  async getResearcherProjects(id) {
    return db.getResearcherProjects(id);
  },

  async getResearcherPublications(id) {
    return db.getResearcherPublications(id);
  },

  async getResearcherExpeditions(id) {
    return db.getResearcherExpeditions(id);
  }
};
