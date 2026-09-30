/**
 * ==============================================================================
 * POLARSPHERE UNIFIED SEARCH ENGINE (DETERMINISTIC)
 * "The Polar World, Through India's Eyes"
 * ==============================================================================
 * Fast, deterministic multi-entity search across Researchers, Projects,
 * Expeditions, Datasets, Publications, and Media with weighted relevance scoring.
 */

import { memoryStore } from '../db/memoryStore.js';
import { RESOURCE_TYPES } from '../../models/types.js';

export class UnifiedSearchEngine {
  /**
   * Executes unified cross-entity search
   * @param {string} query Search terms
   * @param {Object} filters Filtering options { type, region, domain, limit }
   */
  static search(query = '', { type = 'ALL', region = 'ALL', domain = 'ALL', limit = 40 } = {}) {
    const rawQuery = (query || '').trim();
    if (!rawQuery) {
      return {
        query: '',
        totalResults: 0,
        results: [],
        categories: { all: 0, dataset: 0, expedition: 0, researcher: 0, project: 0, publication: 0, media: 0 }
      };
    }

    const q = rawQuery.toLowerCase();
    const tokens = q.split(/\s+/).filter(t => t.length > 1);
    const results = [];

    // Helper: calculate relevance score
    const scoreText = (text, exactWeight = 50, tokenWeight = 15) => {
      if (!text) return 0;
      const lower = text.toLowerCase();
      let score = 0;
      if (lower === q) score += exactWeight * 2;
      else if (lower.includes(q)) score += exactWeight;

      for (const token of tokens) {
        if (lower.includes(token)) score += tokenWeight;
      }
      return score;
    };

    // 1. Search Datasets
    if (type === 'ALL' || type === RESOURCE_TYPES.DATASET) {
      for (const d of memoryStore.tables.datasets) {
        if (region !== 'ALL' && d.geographic_region !== region) continue;
        if (domain !== 'ALL' && d.scientific_domain !== domain) continue;

        let score = 0;
        const matchedFields = [];

        const titleScore = scoreText(d.title, 80, 25);
        if (titleScore > 0) { score += titleScore; matchedFields.push('title'); }

        const descScore = scoreText(d.description, 40, 10);
        if (descScore > 0) { score += descScore; matchedFields.push('description'); }

        const kwScore = scoreText((d.keywords || []).join(' '), 60, 20);
        if (kwScore > 0) { score += kwScore; matchedFields.push('keywords'); }

        const domainScore = scoreText(d.scientific_domain, 50, 15);
        if (domainScore > 0) { score += domainScore; matchedFields.push('domain'); }

        const regionScore = scoreText(d.geographic_region, 40, 15);
        if (regionScore > 0) { score += regionScore; matchedFields.push('region'); }

        if (d.doi && d.doi.toLowerCase().includes(q)) {
          score += 100;
          matchedFields.push('doi');
        }

        // Entity type intent match
        if (q.includes('dataset') || q.includes('data') || q.includes('archive')) {
          score += 60;
          matchedFields.push('entity_type');
        }

        if (score > 0) {
          results.push({
            id: d.dataset_id,
            resourceType: RESOURCE_TYPES.DATASET,
            title: d.title,
            shortDescription: d.description,
            badge: d.data_format,
            region: d.geographic_region,
            domain: d.scientific_domain,
            relevanceScore: score,
            matchedFields,
            provenance: d.provenance,
            relatedEntities: {
              doi: d.doi,
              license: d.license,
              accessLevel: d.access_level
            }
          });
        }
      }
    }

    // 2. Search Expeditions
    if (type === 'ALL' || type === RESOURCE_TYPES.EXPEDITION) {
      for (const e of memoryStore.tables.expeditions) {
        if (region !== 'ALL' && e.region !== region) continue;

        let score = 0;
        const matchedFields = [];

        const nameScore = scoreText(e.expedition_name, 90, 30);
        if (nameScore > 0) { score += nameScore; matchedFields.push('name'); }

        if (e.code.toLowerCase().includes(q)) {
          score += 100;
          matchedFields.push('code');
        }

        const descScore = scoreText(e.description, 35, 10);
        if (descScore > 0) { score += descScore; matchedFields.push('description'); }

        const leaderScore = scoreText(e.leader_name, 60, 20);
        if (leaderScore > 0) { score += leaderScore; matchedFields.push('leader'); }

        const baseScore = scoreText(e.vessel_or_base, 50, 15);
        if (baseScore > 0) { score += baseScore; matchedFields.push('base/vessel'); }

        if (q.includes('expedition') || q.includes('voyage') || q.includes('isea')) {
          score += 60;
          matchedFields.push('entity_type');
        }

        if (score > 0) {
          results.push({
            id: e.expedition_id,
            resourceType: RESOURCE_TYPES.EXPEDITION,
            title: e.expedition_name,
            shortDescription: e.description,
            badge: e.code,
            region: e.region,
            domain: 'Polar Logistics & Multidisciplinary Science',
            relevanceScore: score,
            matchedFields,
            provenance: e.provenance,
            relatedEntities: {
              leader: e.leader_name,
              status: e.status,
              dates: `${e.start_date} to ${e.end_date}`
            }
          });
        }
      }
    }

    // 3. Search Researchers
    if (type === 'ALL' || type === RESOURCE_TYPES.RESEARCHER) {
      for (const r of memoryStore.tables.researchers) {
        let score = 0;
        const matchedFields = [];

        const nameScore = scoreText(r.name, 95, 35);
        if (nameScore > 0) { score += nameScore; matchedFields.push('name'); }

        const specScore = scoreText(r.specialization, 60, 20);
        if (specScore > 0) { score += specScore; matchedFields.push('specialization'); }

        const instScore = scoreText(r.institution, 50, 15);
        if (instScore > 0) { score += instScore; matchedFields.push('institution'); }

        const bioScore = scoreText(r.profile, 30, 10);
        if (bioScore > 0) { score += bioScore; matchedFields.push('profile'); }

        if (q.includes('researcher') || q.includes('scientist') || q.includes('author') || q.includes('director')) {
          score += 60;
          matchedFields.push('entity_type');
        }

        if (score > 0) {
          results.push({
            id: r.researcher_id,
            resourceType: RESOURCE_TYPES.RESEARCHER,
            title: r.name,
            shortDescription: `${r.designation} at ${r.institution}. Specialization: ${r.specialization}`,
            badge: 'Researcher',
            domain: r.specialization,
            relevanceScore: score,
            matchedFields,
            provenance: r.provenance,
            relatedEntities: {
              institution: r.institution,
              orcid: r.orcid,
              email: r.email
            }
          });
        }
      }
    }

    // 4. Search Projects
    if (type === 'ALL' || type === RESOURCE_TYPES.PROJECT) {
      for (const p of memoryStore.tables.projects) {
        if (domain !== 'ALL' && p.research_domain !== domain) continue;

        let score = 0;
        const matchedFields = [];

        const titleScore = scoreText(p.title, 85, 25);
        if (titleScore > 0) { score += titleScore; matchedFields.push('title'); }

        if (p.code && p.code.toLowerCase().includes(q)) {
          score += 100;
          matchedFields.push('code');
        }

        const descScore = scoreText(p.description, 40, 10);
        if (descScore > 0) { score += descScore; matchedFields.push('description'); }

        const domainScore = scoreText(p.research_domain, 50, 15);
        if (domainScore > 0) { score += domainScore; matchedFields.push('domain'); }

        if (q.includes('project') || q.includes('pacer')) {
          score += 60;
          matchedFields.push('entity_type');
        }

        if (score > 0) {
          results.push({
            id: p.project_id,
            resourceType: RESOURCE_TYPES.PROJECT,
            title: p.title,
            shortDescription: p.description,
            badge: p.code || 'Project',
            domain: p.research_domain,
            relevanceScore: score,
            matchedFields,
            provenance: p.provenance,
            relatedEntities: {
              institution: p.lead_institution,
              status: p.status
            }
          });
        }
      }
    }

    // 5. Search Publications
    if (type === 'ALL' || type === RESOURCE_TYPES.PUBLICATION) {
      for (const pb of memoryStore.tables.publications) {
        if (domain !== 'ALL' && pb.scientific_domain !== domain) continue;

        let score = 0;
        const matchedFields = [];

        const titleScore = scoreText(pb.title, 85, 25);
        if (titleScore > 0) { score += titleScore; matchedFields.push('title'); }

        const authorScore = scoreText((pb.authors || []).join(' '), 70, 25);
        if (authorScore > 0) { score += authorScore; matchedFields.push('authors'); }

        const absScore = scoreText(pb.abstract, 35, 10);
        if (absScore > 0) { score += absScore; matchedFields.push('abstract'); }

        const journalScore = scoreText(pb.journal, 50, 15);
        if (journalScore > 0) { score += journalScore; matchedFields.push('journal'); }

        if (pb.doi && pb.doi.toLowerCase().includes(q)) {
          score += 100;
          matchedFields.push('doi');
        }

        if (q.includes('publication') || q.includes('paper') || q.includes('journal') || q.includes('article')) {
          score += 60;
          matchedFields.push('entity_type');
        }

        if (score > 0) {
          results.push({
            id: pb.publication_id,
            resourceType: RESOURCE_TYPES.PUBLICATION,
            title: pb.title,
            shortDescription: pb.abstract,
            badge: pb.journal,
            domain: pb.scientific_domain,
            relevanceScore: score,
            matchedFields,
            provenance: pb.provenance,
            relatedEntities: {
              authors: pb.authors.join(', '),
              date: pb.publication_date,
              doi: pb.doi
            }
          });
        }
      }
    }

    // 6. Search Media
    if (type === 'ALL' || type === RESOURCE_TYPES.MEDIA) {
      for (const m of memoryStore.tables.media) {
        if (region !== 'ALL' && m.geographic_region !== region) continue;

        let score = 0;
        const matchedFields = [];

        const titleScore = scoreText(m.title, 75, 25);
        if (titleScore > 0) { score += titleScore; matchedFields.push('title'); }

        const descScore = scoreText(m.description, 35, 10);
        if (descScore > 0) { score += descScore; matchedFields.push('description'); }

        const locScore = scoreText(m.location, 50, 15);
        if (locScore > 0) { score += locScore; matchedFields.push('location'); }

        const topicScore = scoreText(m.topic, 50, 15);
        if (topicScore > 0) { score += topicScore; matchedFields.push('topic'); }

        if (score > 0) {
          results.push({
            id: m.media_id,
            resourceType: RESOURCE_TYPES.MEDIA,
            title: m.title,
            shortDescription: m.description,
            badge: m.type,
            region: m.geographic_region,
            relevanceScore: score,
            matchedFields,
            provenance: m.provenance,
            thumbnailUrl: m.thumbnail_url,
            mediaUrl: m.media_url,
            relatedEntities: {
              location: m.location,
              format: m.file_format
            }
          });
        }
      }
    }

    // Sort by relevance score descending
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Compute category counts
    const categories = {
      all: results.length,
      dataset: results.filter(r => r.resourceType === RESOURCE_TYPES.DATASET).length,
      expedition: results.filter(r => r.resourceType === RESOURCE_TYPES.EXPEDITION).length,
      researcher: results.filter(r => r.resourceType === RESOURCE_TYPES.RESEARCHER).length,
      project: results.filter(r => r.resourceType === RESOURCE_TYPES.PROJECT).length,
      publication: results.filter(r => r.resourceType === RESOURCE_TYPES.PUBLICATION).length,
      media: results.filter(r => r.resourceType === RESOURCE_TYPES.MEDIA).length
    };

    return {
      query: rawQuery,
      totalResults: results.length,
      results: results.slice(0, limit),
      categories
    };
  }
}

export const searchService = {
  search: (query, filters) => UnifiedSearchEngine.search(query, filters)
};
