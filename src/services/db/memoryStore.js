/**
 * ==============================================================================
 * POLARSPHERE IN-MEMORY RELATIONAL STORE
 * "The Polar World, Through India's Eyes"
 * ==============================================================================
 * High-performance indexed relational store for development, testing, and offline modes.
 * Implements relational integrity, foreign key traversal, and multi-entity joins.
 */

import {
  DEMO_RESEARCHERS,
  DEMO_PROJECTS,
  DEMO_EXPEDITIONS,
  DEMO_DATASETS,
  DEMO_PUBLICATIONS,
  DEMO_MEDIA,
  DEMO_RESEARCHER_PROJECTS,
  DEMO_PROJECT_EXPEDITIONS,
  DEMO_PROJECT_DATASETS,
  DEMO_EXPEDITION_DATASETS,
  DEMO_RESEARCHER_PUBLICATIONS,
  DEMO_PUBLICATION_DATASETS,
  DEMO_EXPEDITION_MEDIA,
  DEMO_PROJECT_PUBLICATIONS,
  DEMO_PROJECT_MEDIA
} from '../../data/fixtures/demoData.js';

class MemoryRelationalStore {
  constructor() {
    this.reset();
  }

  reset() {
    // Primary tables
    this.tables = {
      researchers: [...DEMO_RESEARCHERS],
      projects: [...DEMO_PROJECTS],
      expeditions: [...DEMO_EXPEDITIONS],
      datasets: [...DEMO_DATASETS],
      publications: [...DEMO_PUBLICATIONS],
      media: [...DEMO_MEDIA],
      resources: [],

      // Junction tables (Many-to-Many relationships)
      researcher_projects: [...DEMO_RESEARCHER_PROJECTS],
      project_expeditions: [...DEMO_PROJECT_EXPEDITIONS],
      project_datasets: [...DEMO_PROJECT_DATASETS],
      expedition_datasets: [...DEMO_EXPEDITION_DATASETS],
      researcher_publications: [...DEMO_RESEARCHER_PUBLICATIONS],
      publication_datasets: [...DEMO_PUBLICATION_DATASETS],
      expedition_media: [...DEMO_EXPEDITION_MEDIA],
      project_publications: [...DEMO_PROJECT_PUBLICATIONS],
      project_media: [...DEMO_PROJECT_MEDIA]
    };

    this.rebuildIndexes();
  }

  rebuildIndexes() {
    this.indexes = {
      researchers: new Map(this.tables.researchers.map(r => [r.researcher_id, r])),
      projects: new Map(this.tables.projects.map(p => [p.project_id, p])),
      expeditions: new Map(this.tables.expeditions.map(e => [e.expedition_id, e])),
      datasets: new Map(this.tables.datasets.map(d => [d.dataset_id, d])),
      publications: new Map(this.tables.publications.map(pb => [pb.publication_id, pb])),
      media: new Map(this.tables.media.map(m => [m.media_id, m]))
    };
  }

  // ----------------------------------------------------------------------------
  // Generic CRUD Operations
  // ----------------------------------------------------------------------------
  findById(tableName, id) {
    if (this.indexes[tableName] && this.indexes[tableName].has(id)) {
      return this.indexes[tableName].get(id);
    }
    const pk = this.getPrimaryKeyField(tableName);
    return this.tables[tableName]?.find(item => item[pk] === id) || null;
  }

  findMany(tableName, { where = {}, limit = 50, offset = 0, sort = null } = {}) {
    let rows = [...(this.tables[tableName] || [])];

    // Apply where filter
    const filterKeys = Object.keys(where);
    if (filterKeys.length > 0) {
      rows = rows.filter(row => {
        return filterKeys.every(k => {
          if (where[k] === undefined || where[k] === null || where[k] === 'ALL') return true;
          if (Array.isArray(row[k])) {
            return row[k].includes(where[k]);
          }
          return String(row[k]).toLowerCase() === String(where[k]).toLowerCase();
        });
      });
    }

    // Apply sorting
    if (sort) {
      const { field, ascending = true } = sort;
      rows.sort((a, b) => {
        if (a[field] < b[field]) return ascending ? -1 : 1;
        if (a[field] > b[field]) return ascending ? 1 : -1;
        return 0;
      });
    }

    const total = rows.length;
    const paginated = rows.slice(offset, offset + limit);

    return {
      data: paginated,
      total,
      limit,
      offset,
      hasMore: offset + limit < total
    };
  }

  insert(tableName, record) {
    if (!this.tables[tableName]) {
      this.tables[tableName] = [];
    }
    this.tables[tableName].push(record);
    const pk = this.getPrimaryKeyField(tableName);
    if (this.indexes[tableName] && record[pk]) {
      this.indexes[tableName].set(record[pk], record);
    }
    return record;
  }

  getPrimaryKeyField(tableName) {
    switch (tableName) {
      case 'researchers': return 'researcher_id';
      case 'projects': return 'project_id';
      case 'expeditions': return 'expedition_id';
      case 'datasets': return 'dataset_id';
      case 'publications': return 'publication_id';
      case 'media': return 'media_id';
      case 'resources': return 'resource_id';
      default: return 'id';
    }
  }

  // ----------------------------------------------------------------------------
  // Relational Joins & Navigations
  // ----------------------------------------------------------------------------

  // Researcher Relationships
  getResearcherProjects(researcherId) {
    const junctions = this.tables.researcher_projects.filter(rp => rp.researcher_id === researcherId);
    return junctions.map(rp => ({
      ...rp,
      project: this.findById('projects', rp.project_id)
    })).filter(rp => rp.project !== null);
  }

  getResearcherPublications(researcherId) {
    const junctions = this.tables.researcher_publications.filter(rp => rp.researcher_id === researcherId);
    return junctions.map(rp => ({
      ...rp,
      publication: this.findById('publications', rp.publication_id)
    })).filter(rp => rp.publication !== null);
  }

  getResearcherExpeditions(researcherId) {
    const userProjects = this.tables.researcher_projects.filter(rp => rp.researcher_id === researcherId).map(rp => rp.project_id);
    const expIds = new Set(
      this.tables.project_expeditions
        .filter(pe => userProjects.includes(pe.project_id))
        .map(pe => pe.expedition_id)
    );
    return Array.from(expIds).map(id => this.findById('expeditions', id)).filter(Boolean);
  }

  // Project Relationships
  getProjectExpeditions(projectId) {
    const junctions = this.tables.project_expeditions.filter(pe => pe.project_id === projectId);
    return junctions.map(pe => ({
      ...pe,
      expedition: this.findById('expeditions', pe.expedition_id)
    })).filter(pe => pe.expedition !== null);
  }

  getProjectDatasets(projectId) {
    const junctions = this.tables.project_datasets.filter(pd => pd.project_id === projectId);
    return junctions.map(pd => ({
      ...pd,
      dataset: this.findById('datasets', pd.dataset_id)
    })).filter(pd => pd.dataset !== null);
  }

  getProjectPublications(projectId) {
    const junctions = this.tables.project_publications.filter(pp => pp.project_id === projectId);
    return junctions.map(pp => ({
      ...pp,
      publication: this.findById('publications', pp.publication_id)
    })).filter(pp => pp.publication !== null);
  }

  getProjectResearchers(projectId) {
    const junctions = this.tables.researcher_projects.filter(rp => rp.project_id === projectId);
    return junctions.map(rp => ({
      ...rp,
      researcher: this.findById('researchers', rp.researcher_id)
    })).filter(rp => rp.researcher !== null);
  }

  getProjectMedia(projectId) {
    const junctions = this.tables.project_media.filter(pm => pm.project_id === projectId);
    return junctions.map(pm => ({
      ...pm,
      media: this.findById('media', pm.media_id)
    })).filter(pm => pm.media !== null);
  }

  // Expedition Relationships
  getExpeditionDatasets(expeditionId) {
    const junctions = this.tables.expedition_datasets.filter(ed => ed.expedition_id === expeditionId);
    return junctions.map(ed => ({
      ...ed,
      dataset: this.findById('datasets', ed.dataset_id)
    })).filter(ed => ed.dataset !== null);
  }

  getExpeditionMedia(expeditionId) {
    const junctions = this.tables.expedition_media.filter(em => em.expedition_id === expeditionId);
    return junctions.map(em => ({
      ...em,
      media: this.findById('media', em.media_id)
    })).filter(em => em.media !== null);
  }

  getExpeditionProjects(expeditionId) {
    const junctions = this.tables.project_expeditions.filter(pe => pe.expedition_id === expeditionId);
    return junctions.map(pe => ({
      ...pe,
      project: this.findById('projects', pe.project_id)
    })).filter(pe => pe.project !== null);
  }

  getExpeditionResearchers(expeditionId) {
    const projects = this.getExpeditionProjects(expeditionId);
    const researcherIds = new Set();
    projects.forEach(p => {
      const rps = this.tables.researcher_projects.filter(rp => rp.project_id === p.project_id);
      rps.forEach(rp => researcherIds.add(rp.researcher_id));
    });
    return Array.from(researcherIds).map(id => this.findById('researchers', id)).filter(Boolean);
  }

  // Dataset Lineage
  getDatasetLineage(datasetId) {
    const dataset = this.findById('datasets', datasetId);
    if (!dataset) return null;

    // Associated projects
    const projJunctions = this.tables.project_datasets.filter(pd => pd.dataset_id === datasetId);
    const projects = projJunctions.map(pd => this.findById('projects', pd.project_id)).filter(Boolean);

    // Associated expeditions
    const expJunctions = this.tables.expedition_datasets.filter(ed => ed.dataset_id === datasetId);
    const expeditions = expJunctions.map(ed => this.findById('expeditions', ed.expedition_id)).filter(Boolean);

    // Associated publications
    const pubJunctions = this.tables.publication_datasets.filter(pbd => pbd.dataset_id === datasetId);
    const publications = pubJunctions.map(pbd => this.findById('publications', pbd.publication_id)).filter(Boolean);

    // Lead researchers from projects
    const researcherIds = new Set();
    projects.forEach(proj => {
      this.tables.researcher_projects
        .filter(rp => rp.project_id === proj.project_id)
        .forEach(rp => researcherIds.add(rp.researcher_id));
    });
    const researchers = Array.from(researcherIds).map(id => this.findById('researchers', id)).filter(Boolean);

    return {
      dataset,
      projects,
      expeditions,
      publications,
      researchers
    };
  }
}

export const memoryStore = new MemoryRelationalStore();
