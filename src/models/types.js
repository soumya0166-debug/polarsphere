/**
 * ==============================================================================
 * POLARSPHERE DATA ARCHITECTURE & ENTITY SCHEMAS
 * "The Polar World, Through India's Eyes"
 * ==============================================================================
 * Defines canonical data structures for researchers, projects, expeditions,
 * datasets, publications, media, resources, and relationship links.
 */

export const REGIONS = Object.freeze({
  ANTARCTICA: 'Antarctica',
  ARCTIC: 'Arctic',
  SOUTHERN_OCEAN: 'Southern Ocean',
  HIMALAYA: 'Himalaya',
  GLOBAL_POLAR: 'Global Polar'
});

export const SCIENTIFIC_DOMAINS = Object.freeze({
  CRYOSPHERE_GLACIOLOGY: 'Cryosphere & Glaciology',
  ATMOSPHERIC_PHYSICS: 'Atmospheric Physics & Meteorology',
  OCEANOGRAPHY_BIOGEOCHEM: 'Oceanography & Marine Biogeochemistry',
  GEOLOGY_PALEOCLIMATE: 'Geology & Paleoclimate',
  SPACE_WEATHER_GEOMAGNETISM: 'Space Weather & Geomagnetism',
  POLAR_BIOLOGY_ECOLOGY: 'Polar Biology & Ecology'
});

export const ACCESS_LEVELS = Object.freeze({
  OPEN_ACCESS: 'Open Access',
  RESTRICTED: 'Restricted',
  EMBARGOED: 'Embargoed'
});

export const MEDIA_TYPES = Object.freeze({
  PHOTOGRAPH: 'Photograph',
  VIDEO: 'Video',
  AUDIO: 'Audio',
  INFOGRAPHIC: 'Infographic'
});

export const RESOURCE_TYPES = Object.freeze({
  RESEARCHER: 'researcher',
  PROJECT: 'project',
  EXPEDITION: 'expedition',
  DATASET: 'dataset',
  PUBLICATION: 'publication',
  MEDIA: 'media',
  REPORT: 'report',
  STATION: 'telemetry_station',
  OUTREACH: 'outreach_material'
});

/**
 * Normalizes provenance metadata for tracking information origin
 */
export function createProvenance({
  sourceSystem = 'NCPOR_NPDC',
  originalUrl = '',
  externalSourceId = '',
  ingestionTimestamp = new Date().toISOString(),
  checksum = '',
  processingStatus = 'processed',
  processingVersion = 'v1.0.0-phase1',
  confidence = 1.0,
  notes = ''
} = {}) {
  return {
    sourceSystem,
    originalUrl,
    externalSourceId,
    ingestionTimestamp,
    checksum,
    processingStatus,
    processingVersion,
    confidence,
    notes
  };
}

/**
 * Creates a generic resource record encapsulating any NCPOR asset
 */
export function createResourceRecord({
  resourceId,
  resourceType,
  title,
  description = '',
  sourceSystem = 'NCPOR_NPDC',
  originalUrl = '',
  provenance = {},
  normalizedPayload = {},
  rawPayload = {},
  ingestionStatus = 'processed',
  ingestionVersion = 'v1.0.0-phase1'
}) {
  return {
    resource_id: resourceId,
    resource_type: resourceType,
    title,
    description,
    source_system: sourceSystem,
    original_url: originalUrl,
    provenance: createProvenance(provenance),
    normalized_payload: normalizedPayload,
    raw_payload: rawPayload,
    ingestion_status: ingestionStatus,
    ingestion_version: ingestionVersion,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}
