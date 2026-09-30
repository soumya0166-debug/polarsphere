/**
 * ==============================================================================
 * POLARSPHERE ENTITY VALIDATORS
 * "The Polar World, Through India's Eyes"
 * ==============================================================================
 * Validates incoming records against schema constraints before ingestion or storage.
 */

import { REGIONS, SCIENTIFIC_DOMAINS, ACCESS_LEVELS, MEDIA_TYPES } from './types.js';

export class ValidationError extends Error {
  constructor(entityType, errors) {
    super(`Validation failed for ${entityType}: ${errors.join(', ')}`);
    this.name = 'ValidationError';
    this.entityType = entityType;
    this.errors = errors;
  }
}

export function validateResearcher(record) {
  const errors = [];
  if (!record.researcher_id) errors.push('Missing researcher_id');
  if (!record.name || typeof record.name !== 'string' || record.name.trim().length === 0) {
    errors.push('Missing or invalid name');
  }
  if (!record.institution || typeof record.institution !== 'string') {
    errors.push('Missing or invalid institution');
  }
  return { isValid: errors.length === 0, errors };
}

export function validateProject(record) {
  const errors = [];
  if (!record.project_id) errors.push('Missing project_id');
  if (!record.title || typeof record.title !== 'string') errors.push('Missing or invalid title');
  if (!record.research_domain) errors.push('Missing research_domain');
  if (!record.lead_institution) errors.push('Missing lead_institution');
  return { isValid: errors.length === 0, errors };
}

export function validateExpedition(record) {
  const errors = [];
  if (!record.expedition_id) errors.push('Missing expedition_id');
  if (!record.expedition_name) errors.push('Missing expedition_name');
  if (!record.code) errors.push('Missing expedition code');
  if (!record.region || !Object.values(REGIONS).includes(record.region)) {
    errors.push(`Invalid region: "${record.region}". Must be one of: ${Object.values(REGIONS).join(', ')}`);
  }
  return { isValid: errors.length === 0, errors };
}

export function validateDataset(record) {
  const errors = [];
  if (!record.dataset_id) errors.push('Missing dataset_id');
  if (!record.title) errors.push('Missing dataset title');
  if (!record.scientific_domain) errors.push('Missing scientific_domain');
  if (!record.geographic_region) errors.push('Missing geographic_region');
  if (!record.data_format) errors.push('Missing data_format');
  return { isValid: errors.length === 0, errors };
}

export function validatePublication(record) {
  const errors = [];
  if (!record.publication_id) errors.push('Missing publication_id');
  if (!record.title) errors.push('Missing publication title');
  if (!Array.isArray(record.authors) || record.authors.length === 0) {
    errors.push('Missing or empty authors list');
  }
  return { isValid: errors.length === 0, errors };
}

export function validateMedia(record) {
  const errors = [];
  if (!record.media_id) errors.push('Missing media_id');
  if (!record.title) errors.push('Missing media title');
  if (!record.type || !Object.values(MEDIA_TYPES).includes(record.type)) {
    errors.push(`Invalid media type: "${record.type}"`);
  }
  if (!record.media_url) errors.push('Missing media_url');
  return { isValid: errors.length === 0, errors };
}
