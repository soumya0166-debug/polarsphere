/**
 * ==============================================================================
 * POLARSPHERE UNIFIED SERVICE REGISTRY
 * "The Polar World, Through India's Eyes"
 * ==============================================================================
 */

export { db } from './db/databaseAdapter';
export { memoryStore } from './db/memoryStore';
export { supabase, isSupabaseConfigured } from './db/supabaseClient';

export { researchersService } from './api/researchersService';
export { projectsService } from './api/projectsService';
export { expeditionsService } from './api/expeditionsService';
export { datasetsService } from './api/datasetsService';
export { publicationsService } from './api/publicationsService';
export { mediaService } from './api/mediaService';
export { searchService } from './api/searchService';
export { knowledgeGraphService } from './api/knowledgeGraphService';

export { IngestionPipeline, ingestionPipeline } from './ingestion/IngestionPipeline';
export { ProvenanceTracker } from './ingestion/ProvenanceTracker';
export { DeduplicationEngine } from './ingestion/deduplication';
