/**
 * ==============================================================================
 * POLARSPHERE DATABASE ADAPTER
 * "The Polar World, Through India's Eyes"
 * ==============================================================================
 * Universal data gateway providing uniform async access.
 * Queries Supabase when configured, falling back to MemoryRelationalStore.
 */

import { supabase, isSupabaseConfigured } from './supabaseClient.js';
import { memoryStore } from './memoryStore.js';

export class DatabaseAdapter {
  constructor() {
    this.useSupabase = isSupabaseConfigured;
  }

  async getById(tableName, id) {
    if (this.useSupabase && supabase) {
      try {
        const pk = memoryStore.getPrimaryKeyField(tableName);
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .eq(pk, id)
          .single();
        if (error) throw error;
        return data;
      } catch (err) {
        console.warn(`[DB Adapter] Supabase query failed for ${tableName}:${id}, using memory store fallback:`, err.message);
      }
    }
    return memoryStore.findById(tableName, id);
  }

  async findMany(tableName, options = {}) {
    if (this.useSupabase && supabase) {
      try {
        const { where = {}, limit = 50, offset = 0, sort } = options;
        let query = supabase.from(tableName).select('*', { count: 'exact' });

        // Apply filters
        for (const [key, value] of Object.entries(where)) {
          if (value !== undefined && value !== null && value !== 'ALL') {
            query = query.eq(key, value);
          }
        }

        // Apply sort
        if (sort) {
          query = query.order(sort.field, { ascending: sort.ascending ?? true });
        }

        // Apply pagination
        query = query.range(offset, offset + limit - 1);

        const { data, count, error } = await query;
        if (error) throw error;

        return {
          data,
          total: count ?? data.length,
          limit,
          offset,
          hasMore: offset + limit < (count ?? data.length)
        };
      } catch (err) {
        console.warn(`[DB Adapter] Supabase findMany failed for ${tableName}, falling back to memory store:`, err.message);
      }
    }
    return memoryStore.findMany(tableName, options);
  }

  // Relational queries
  async getResearcherProjects(researcherId) {
    return memoryStore.getResearcherProjects(researcherId);
  }

  async getResearcherPublications(researcherId) {
    return memoryStore.getResearcherPublications(researcherId);
  }

  async getResearcherExpeditions(researcherId) {
    return memoryStore.getResearcherExpeditions(researcherId);
  }

  async getProjectExpeditions(projectId) {
    return memoryStore.getProjectExpeditions(projectId);
  }

  async getProjectDatasets(projectId) {
    return memoryStore.getProjectDatasets(projectId);
  }

  async getProjectPublications(projectId) {
    return memoryStore.getProjectPublications(projectId);
  }

  async getProjectResearchers(projectId) {
    return memoryStore.getProjectResearchers(projectId);
  }

  async getProjectMedia(projectId) {
    return memoryStore.getProjectMedia(projectId);
  }

  async getExpeditionDatasets(expeditionId) {
    return memoryStore.getExpeditionDatasets(expeditionId);
  }

  async getExpeditionMedia(expeditionId) {
    return memoryStore.getExpeditionMedia(expeditionId);
  }

  async getExpeditionResearchers(expeditionId) {
    return memoryStore.getExpeditionResearchers(expeditionId);
  }

  async getDatasetLineage(datasetId) {
    return memoryStore.getDatasetLineage(datasetId);
  }
}

export const db = new DatabaseAdapter();
