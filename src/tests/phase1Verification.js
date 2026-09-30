/**
 * ==============================================================================
 * POLARSPHERE PHASE 1 ARCHITECTURAL VERIFICATION SUITE
 * "The Polar World, Through India's Eyes"
 * ==============================================================================
 * Validates:
 * 1. Entity schema compliance
 * 2. Database adapter & in-memory relational integrity
 * 3. Many-to-many relationship traversal
 * 4. Ingestion pipeline & duplicate detection
 * 5. Deterministic search on test queries
 * 6. Knowledge graph node/edge topology & pathfinding
 * 7. Data provenance retention
 */

import { memoryStore } from '../services/db/memoryStore.js';
import { db } from '../services/db/databaseAdapter.js';
import { researchersService } from '../services/api/researchersService.js';
import { projectsService } from '../services/api/projectsService.js';
import { expeditionsService } from '../services/api/expeditionsService.js';
import { datasetsService } from '../services/api/datasetsService.js';
import { searchService } from '../services/api/searchService.js';
import { knowledgeGraphService } from '../services/api/knowledgeGraphService.js';
import { IngestionPipeline } from '../services/ingestion/IngestionPipeline.js';
import { ProvenanceTracker } from '../services/ingestion/ProvenanceTracker.js';

export async function runPhase1VerificationSuite() {
  const results = {
    totalTests: 0,
    passed: 0,
    failed: 0,
    errors: [],
    logs: []
  };

  function assert(condition, message) {
    results.totalTests++;
    if (condition) {
      results.passed++;
      results.logs.push(`✓ PASS: ${message}`);
    } else {
      results.failed++;
      results.errors.push(`✗ FAIL: ${message}`);
      results.logs.push(`✗ FAIL: ${message}`);
    }
  }

  results.logs.push('===============================================================');
  results.logs.push('POLARSPHERE PHASE 1: DATA FOUNDATION VERIFICATION');
  results.logs.push('===============================================================');

  // TEST SUITE 1: Core Entity Schemas & DB Access
  results.logs.push('\n[1/6] Verifying Core Relational Tables...');
  const researchers = await researchersService.getResearchers({ limit: 10 });
  assert(researchers.data.length >= 8, `Researchers count: ${researchers.data.length} (expected >= 8)`);

  const projects = await projectsService.getProjects({ limit: 10 });
  assert(projects.data.length >= 6, `Projects count: ${projects.data.length} (expected >= 6)`);

  const expeditions = await expeditionsService.getExpeditions({ limit: 10 });
  assert(expeditions.data.length >= 5, `Expeditions count: ${expeditions.data.length} (expected >= 5)`);

  const datasets = await datasetsService.getDatasets({ limit: 10 });
  assert(datasets.data.length >= 6, `Datasets count: ${datasets.data.length} (expected >= 6)`);

  // TEST SUITE 2: Multi-Hop Relationship Traversal
  results.logs.push('\n[2/6] Verifying Many-to-Many Relationships & Multi-Hop Traversal...');
  // Test researcher -> projects -> expeditions -> datasets
  const leadResearcher = researchers.data[0];
  const userProjects = await researchersService.getResearcherProjects(leadResearcher.researcher_id);
  assert(userProjects.length > 0, `Researcher ${leadResearcher.name} has ${userProjects.length} linked projects`);

  const linkedProject = userProjects[0].project;
  const projectExpeditions = await projectsService.getProjectExpeditions(linkedProject.project_id);
  assert(projectExpeditions.length > 0, `Project ${linkedProject.code} links to ${projectExpeditions.length} expeditions`);

  const projectDatasets = await projectsService.getProjectDatasets(linkedProject.project_id);
  assert(projectDatasets.length > 0, `Project ${linkedProject.code} links to ${projectDatasets.length} datasets`);

  // Test dataset lineage
  const firstDataset = datasets.data[0];
  const lineage = await datasetsService.getDatasetLineage(firstDataset.dataset_id);
  assert(lineage !== null, `Dataset ${firstDataset.dataset_id} lineage retrieved`);
  assert(lineage.projects.length > 0 || lineage.expeditions.length > 0, 'Lineage contains linked projects or expeditions');

  // TEST SUITE 3: Data Provenance
  results.logs.push('\n[3/6] Verifying Provenance Tracking...');
  for (const ds of datasets.data) {
    assert(ProvenanceTracker.verify(ds.provenance), `Dataset ${ds.dataset_id} has verified provenance structure`);
    assert(Boolean(ds.provenance.sourceSystem), `Dataset ${ds.dataset_id} provenance has valid sourceSystem: ${ds.provenance.sourceSystem}`);
  }

  // TEST SUITE 4: Ingestion Pipeline & Duplicate Detection
  results.logs.push('\n[4/6] Verifying Ingestion Pipeline & Deduplication...');
  const testPipeline = new IngestionPipeline();

  const newRecord = {
    id: `ingest-test-${Date.now()}`,
    title: 'Prydz Bay Larsemann Hills Continuous Micro-Meteorological AWS Log',
    description: 'High frequency 1-minute ambient temperature and wind speed recorded at Bharati Station',
    region: 'Antarctica',
    scientific_domain: 'Atmospheric Physics & Meteorology',
    data_format: 'CSV',
    doi: `10.5067/NCPOR/NPDC/TEST-${Date.now()}`
  };

  const ingestRes = await testPipeline.process(newRecord, {
    resourceType: 'dataset',
    sourceSystem: 'NCPOR_NPDC_LIVE_TEST',
    originalUrl: 'https://npdc.ncpor.res.in/test-stream'
  });

  assert(ingestRes.success === true, 'Pipeline successfully ingested sample dataset');
  assert(ingestRes.status === 'ingested', 'Pipeline status is ingested');

  // Now test duplicate detection on same record
  const dupRes = await testPipeline.process(newRecord, {
    resourceType: 'dataset',
    sourceSystem: 'NCPOR_NPDC_LIVE_TEST'
  });
  assert(dupRes.success === false, 'Pipeline correctly flagged duplicate record');
  assert(dupRes.status === 'duplicate_skipped', `Duplicate skipped reason: ${dupRes.reason}`);

  // TEST SUITE 5: Deterministic Search Testing
  results.logs.push('\n[5/6] Verifying Deterministic Search on Standard SIH Queries...');
  const testQueries = [
    'Antarctica',
    'expedition',
    'climate research',
    'Maitri',
    'dataset',
    'researcher',
    'publication'
  ];

  for (const q of testQueries) {
    const searchRes = searchService.search(q, { limit: 10 });
    assert(searchRes.totalResults > 0, `Query "${q}" returned ${searchRes.totalResults} results (expected > 0)`);
    assert(searchRes.results.length > 0, `Top result for "${q}": "${searchRes.results[0].title}" [Score: ${searchRes.results[0].relevanceScore}]`);
  }

  // TEST SUITE 6: Knowledge Graph Topography & Pathfinding
  results.logs.push('\n[6/6] Verifying Polar Knowledge Graph Topography & Pathfinding...');
  const fullGraph = knowledgeGraphService.getFullGraph();
  assert(fullGraph.nodes.length >= 30, `Knowledge graph contains ${fullGraph.nodes.length} nodes (expected >= 30)`);
  assert(fullGraph.edges.length >= 25, `Knowledge graph contains ${fullGraph.edges.length} edges (expected >= 25)`);
  results.logs.push(`   Graph stats: ${JSON.stringify(fullGraph.stats)}`);

  // Pathfinding test: Researcher to Expedition
  const startResearcherId = researchers.data[0].researcher_id;
  const targetExpeditionId = expeditions.data[0].expedition_id;
  const pathResult = knowledgeGraphService.findPath(startResearcherId, targetExpeditionId);
  assert(pathResult.found === true, `Found path from ${startResearcherId} to ${targetExpeditionId} in ${pathResult.length} hops`);
  if (pathResult.found) {
    results.logs.push(`   Discovered path: ${pathResult.path.join(' ➔ ')}`);
  }

  results.logs.push('\n===============================================================');
  results.logs.push(`PHASE 1 VERIFICATION COMPLETE: ${results.passed}/${results.totalTests} PASSED, ${results.failed} FAILED.`);
  results.logs.push('===============================================================');

  return results;
}
