/**
 * ==============================================================================
 * POLARSPHERE MODULAR INGESTION PIPELINE
 * "The Polar World, Through India's Eyes"
 * ==============================================================================
 * 9-Stage Ingestion Service converting heterogeneous NCPOR scientific feeds
 * into normalized PolarSphere entities and relationship graph edges.
 */

import { ProvenanceTracker } from './ProvenanceTracker.js';
import { DeduplicationEngine } from './deduplication.js';
import { REGIONS, SCIENTIFIC_DOMAINS, createResourceRecord } from '../../models/types.js';
import { memoryStore } from '../db/memoryStore.js';

export class IngestionPipeline {
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Main entrypoint to process an incoming payload
   */
  async process(rawInput, { resourceType, sourceSystem = 'NCPOR_NPDC', originalUrl = '' } = {}) {
    // Stage 1: Validate input
    const validated = this.validate(rawInput);

    // Stage 2: Parse raw input
    const parsed = this.parse(validated);

    // Stage 3: Normalize fields
    const normalized = this.normalize(parsed, resourceType);

    // Stage 4: Extract metadata
    const enriched = this.extractMetadata(normalized);

    // Stage 5: Classify region & domain
    const classified = this.classify(enriched);

    // Stage 6: Attach Provenance & Check duplicates
    classified.provenance = ProvenanceTracker.create({
      sourceSystem,
      originalUrl,
      externalSourceId: classified.id || classified.code || classified.doi || '',
      notes: `Ingested through PolarSphere Ingestion Pipeline v1`
    });

    const dupCheck = this.detectDuplicates(classified, resourceType);
    if (dupCheck.isDuplicate) {
      return {
        success: false,
        status: 'duplicate_skipped',
        reason: `Duplicate detected matching ${dupCheck.matchedOn} on existing record ${dupCheck.existingId}`,
        record: classified
      };
    }

    // Stage 7: Resolve entities (link to existing researchers, projects, expeditions)
    const resolved = this.resolveEntities(classified, resourceType);

    // Stage 8: Create relationships (many-to-many junction edges)
    const relationships = this.createRelationships(resolved, resourceType);

    // Stage 9: Store into Database / MemoryStore
    const stored = this.store(resolved, resourceType, relationships);

    return {
      success: true,
      status: 'ingested',
      recordId: stored.id || stored.dataset_id || stored.expedition_id,
      record: stored,
      relationshipsCreated: relationships.length
    };
  }

  // 1. Validate
  validate(raw) {
    if (!raw) throw new Error('Ingestion error: Input payload is null or undefined.');
    if (typeof raw === 'string') {
      try {
        return JSON.parse(raw);
      } catch (e) {
        throw new Error(`Ingestion error: Payload is invalid JSON string: ${e.message}`);
      }
    }
    return raw;
  }

  // 2. Parse
  parse(data) {
    // Strip trailing whitespace, convert key strings
    return { ...data };
  }

  // 3. Normalize
  normalize(data, resourceType) {
    const idKey = resourceType ? `${resourceType}_id` : 'id';
    return {
      [idKey]: data[idKey] || data.id || `ingested-${Date.now()}`,
      title: (data.title || data.name || 'Untitled Polar Asset').trim(),
      description: (data.description || data.abstract || '').trim(),
      ...data
    };
  }

  // 4. Extract Metadata
  extractMetadata(data) {
    const metadata = { ...(data.metadata || {}) };
    if (data.file_format) metadata.format = data.file_format;
    if (data.doi) metadata.doi = data.doi;
    return { ...data, metadata };
  }

  // 5. Classify Region & Domain
  classify(data) {
    let region = data.region || data.geographic_region;
    if (!region) {
      const text = `${data.title} ${data.description}`.toLowerCase();
      if (text.includes('antarct') || text.includes('maitri') || text.includes('bharati')) {
        region = REGIONS.ANTARCTICA;
      } else if (text.includes('arctic') || text.includes('svalbard') || text.includes('himadri')) {
        region = REGIONS.ARCTIC;
      } else if (text.includes('himalay') || text.includes('himansh') || text.includes('spiti')) {
        region = REGIONS.HIMALAYA;
      } else if (text.includes('southern ocean') || text.includes('sagar nidhi')) {
        region = REGIONS.SOUTHERN_OCEAN;
      } else {
        region = REGIONS.GLOBAL_POLAR;
      }
    }

    let scientific_domain = data.scientific_domain;
    if (!scientific_domain) {
      const text = `${data.title} ${data.description}`.toLowerCase();
      if (text.includes('ice') || text.includes('glacier') || text.includes('snow')) {
        scientific_domain = SCIENTIFIC_DOMAINS.CRYOSPHERE_GLACIOLOGY;
      } else if (text.includes('ocean') || text.includes('pco2') || text.includes('marine')) {
        scientific_domain = SCIENTIFIC_DOMAINS.OCEANOGRAPHY_BIOGEOCHEM;
      } else if (text.includes('geomag') || text.includes('aurora') || text.includes('magnet')) {
        scientific_domain = SCIENTIFIC_DOMAINS.SPACE_WEATHER_GEOMAGNETISM;
      } else if (text.includes('aerosol') || text.includes('wind') || text.includes('atmosphere')) {
        scientific_domain = SCIENTIFIC_DOMAINS.ATMOSPHERIC_PHYSICS;
      } else {
        scientific_domain = SCIENTIFIC_DOMAINS.CRYOSPHERE_GLACIOLOGY;
      }
    }

    return { ...data, region, geographic_region: region, scientific_domain };
  }

  // 6. Detect Duplicates
  detectDuplicates(candidate, resourceType) {
    const tableName = resourceType ? `${resourceType}s` : 'datasets';
    const existing = memoryStore.tables[tableName] || [];
    return DeduplicationEngine.checkDuplicate(candidate, existing, resourceType);
  }

  // 7. Resolve Entities
  resolveEntities(data, resourceType) {
    const resolved = { ...data };
    resolved._resolvedEntities = {
      researchers: [],
      projects: [],
      expeditions: []
    };

    // Match expedition by code in text
    const text = `${data.title} ${data.description}`.toUpperCase();
    for (const exp of memoryStore.tables.expeditions) {
      if (text.includes(exp.code) || text.includes(exp.expedition_name.toUpperCase())) {
        resolved._resolvedEntities.expeditions.push(exp.expedition_id);
      }
    }

    return resolved;
  }

  // 8. Create Relationships
  createRelationships(data, resourceType) {
    const relationships = [];
    const entityId = data[`${resourceType}_id`] || data.id;

    if (resourceType === 'dataset' && data._resolvedEntities) {
      for (const expId of data._resolvedEntities.expeditions) {
        relationships.push({
          type: 'expedition_datasets',
          record: {
            id: `ed-ingested-${Date.now()}`,
            expedition_id: expId,
            dataset_id: entityId,
            collection_station_or_transect: 'Ingestion Auto-Resolution'
          }
        });
      }
    }

    return relationships;
  }

  // 9. Store
  store(data, resourceType, relationships) {
    const tableName = resourceType ? `${resourceType}s` : 'datasets';
    memoryStore.insert(tableName, data);

    // Also register in generic resources registry
    const resourceRecord = createResourceRecord({
      resourceId: `res-${Date.now()}`,
      resourceType: resourceType || 'dataset',
      title: data.title,
      description: data.description,
      sourceSystem: data.provenance?.sourceSystem || 'NCPOR_NPDC',
      originalUrl: data.provenance?.originalUrl || '',
      provenance: data.provenance,
      normalizedPayload: data
    });
    memoryStore.insert('resources', resourceRecord);

    // Insert relationship edges
    for (const rel of relationships) {
      memoryStore.insert(rel.type, rel.record);
    }

    return data;
  }
}

export const ingestionPipeline = new IngestionPipeline();
