/**
 * ==============================================================================
 * POLARSPHERE PROJECTS SERVICE
 * "The Polar World, Through India's Eyes"
 * ==============================================================================
 * Provides endpoints for Polar Research Projects and linked deliverables.
 */

import { db } from '../db/databaseAdapter.js';

export const projectsService = {
  async getProjects({ limit = 50, offset = 0, domain, status, search } = {}) {
    const options = {
      limit,
      offset,
      where: {}
    };

    if (domain && domain !== 'ALL') {
      options.where.research_domain = domain;
    }
    if (status && status !== 'ALL') {
      options.where.status = status;
    }

    let result = await db.findMany('projects', options);

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      const filtered = result.data.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
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

  async getProjectById(id) {
    if (!id) return null;
    return db.getById('projects', id);
  },

  async getProjectExpeditions(id) {
    return db.getProjectExpeditions(id);
  },

  async getProjectDatasets(id) {
    return db.getProjectDatasets(id);
  },

  async getProjectPublications(id) {
    return db.getProjectPublications(id);
  },

  async getProjectResearchers(id) {
    return db.getProjectResearchers(id);
  },

  async getProjectMedia(id) {
    return db.getProjectMedia(id);
  }
};
