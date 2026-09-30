/**
 * ==============================================================================
 * POLARSPHERE KNOWLEDGE GRAPH SERVICE
 * "The Polar World, Through India's Eyes"
 * ==============================================================================
 * Graph abstraction layer representing scientific polar entities as Nodes & Edges.
 * Exposes full graph topology, neighborhood subgraphs, and multi-hop pathfinding.
 */

import { memoryStore } from '../db/memoryStore.js';
import { RESOURCE_TYPES } from '../../models/types.js';

export class KnowledgeGraphService {
  /**
   * Builds the complete interconnected Polar Knowledge Graph
   */
  static getFullGraph() {
    const nodes = [];
    const edges = [];
    const nodeMap = new Set();

    const addNode = (id, type, title, subtitle = '', metadata = {}) => {
      if (!nodeMap.has(id)) {
        nodeMap.add(id);
        nodes.push({ id, type, title, subtitle, metadata });
      }
    };

    const addEdge = (source, target, relationship, label = '') => {
      edges.push({
        id: `e-${source}-${target}-${relationship}`,
        source,
        target,
        relationship,
        label: label || relationship
      });
    };

    // 1. Add Researcher Nodes
    for (const r of memoryStore.tables.researchers) {
      addNode(r.researcher_id, RESOURCE_TYPES.RESEARCHER, r.name, r.designation, {
        institution: r.institution,
        specialization: r.specialization
      });
    }

    // 2. Add Project Nodes
    for (const p of memoryStore.tables.projects) {
      addNode(p.project_id, RESOURCE_TYPES.PROJECT, p.title, p.code, {
        domain: p.research_domain,
        status: p.status
      });
    }

    // 3. Add Expedition Nodes
    for (const e of memoryStore.tables.expeditions) {
      addNode(e.expedition_id, RESOURCE_TYPES.EXPEDITION, e.expedition_name, e.code, {
        region: e.region,
        status: e.status,
        leader: e.leader_name
      });
    }

    // 4. Add Dataset Nodes
    for (const d of memoryStore.tables.datasets) {
      addNode(d.dataset_id, RESOURCE_TYPES.DATASET, d.title, d.data_format, {
        domain: d.scientific_domain,
        region: d.geographic_region,
        doi: d.doi
      });
    }

    // 5. Add Publication Nodes
    for (const pb of memoryStore.tables.publications) {
      addNode(pb.publication_id, RESOURCE_TYPES.PUBLICATION, pb.title, pb.journal, {
        domain: pb.scientific_domain,
        doi: pb.doi,
        date: pb.publication_date
      });
    }

    // 6. Add Media Nodes
    for (const m of memoryStore.tables.media) {
      addNode(m.media_id, RESOURCE_TYPES.MEDIA, m.title, m.type, {
        region: m.geographic_region,
        topic: m.topic
      });
    }

    // 7. Add Edges from Junction Tables

    // Researcher ↔ Project (WORKS_ON / LEADS)
    for (const rp of memoryStore.tables.researcher_projects) {
      addEdge(rp.researcher_id, rp.project_id, 'WORKS_ON', rp.role);
    }

    // Project ↔ Expedition (HAS_EXPEDITION)
    for (const pe of memoryStore.tables.project_expeditions) {
      addEdge(pe.project_id, pe.expedition_id, 'DEPLOYED_IN', pe.operational_phase || 'Field Operations');
    }

    // Project ↔ Dataset (PRODUCES)
    for (const pd of memoryStore.tables.project_datasets) {
      addEdge(pd.project_id, pd.dataset_id, 'PRODUCES', pd.role || 'Data Product');
    }

    // Expedition ↔ Dataset (COLLECTS)
    for (const ed of memoryStore.tables.expedition_datasets) {
      addEdge(ed.expedition_id, ed.dataset_id, 'COLLECTS', ed.collection_station_or_transect || 'Field Collection');
    }

    // Researcher ↔ Publication (AUTHORS)
    for (const rpub of memoryStore.tables.researcher_publications) {
      addEdge(rpub.researcher_id, rpub.publication_id, 'AUTHORS', rpub.is_corresponding ? 'Lead Author' : 'Co-Author');
    }

    // Publication ↔ Dataset (DERIVES_FROM / CITES)
    for (const pubdata of memoryStore.tables.publication_datasets) {
      addEdge(pubdata.publication_id, pubdata.dataset_id, 'DERIVES_FROM', pubdata.relation_type);
    }

    // Expedition ↔ Media (DOCUMENTS)
    for (const em of memoryStore.tables.expedition_media) {
      addEdge(em.expedition_id, em.media_id, 'DOCUMENTS', em.caption || 'Field Media');
    }

    // Project ↔ Publication (RESULTED_IN)
    for (const ppub of memoryStore.tables.project_publications) {
      addEdge(ppub.project_id, ppub.publication_id, 'RESULTED_IN', ppub.grant_or_ack || 'Publication');
    }

    // Project ↔ Media (FEATURING)
    for (const pm of memoryStore.tables.project_media) {
      addEdge(pm.project_id, pm.media_id, 'FEATURING', pm.context || 'Visual Archive');
    }

    return {
      nodes,
      edges,
      stats: {
        totalNodes: nodes.length,
        totalEdges: edges.length,
        researchers: nodes.filter(n => n.type === RESOURCE_TYPES.RESEARCHER).length,
        projects: nodes.filter(n => n.type === RESOURCE_TYPES.PROJECT).length,
        expeditions: nodes.filter(n => n.type === RESOURCE_TYPES.EXPEDITION).length,
        datasets: nodes.filter(n => n.type === RESOURCE_TYPES.DATASET).length,
        publications: nodes.filter(n => n.type === RESOURCE_TYPES.PUBLICATION).length,
        media: nodes.filter(n => n.type === RESOURCE_TYPES.MEDIA).length
      }
    };
  }

  /**
   * Extracts a neighborhood subgraph centered on a specific entity
   */
  static getSubgraph(rootId, depth = 1) {
    const fullGraph = this.getFullGraph();
    const visitedNodes = new Set([rootId]);
    const includedEdges = [];

    let currentLayer = new Set([rootId]);

    for (let d = 0; d < depth; d++) {
      const nextLayer = new Set();
      for (const edge of fullGraph.edges) {
        if (currentLayer.has(edge.source)) {
          visitedNodes.add(edge.target);
          nextLayer.add(edge.target);
          if (!includedEdges.includes(edge)) includedEdges.push(edge);
        } else if (currentLayer.has(edge.target)) {
          visitedNodes.add(edge.source);
          nextLayer.add(edge.source);
          if (!includedEdges.includes(edge)) includedEdges.push(edge);
        }
      }
      currentLayer = nextLayer;
    }

    const filteredNodes = fullGraph.nodes.filter(n => visitedNodes.has(n.id));

    return {
      rootId,
      nodes: filteredNodes,
      edges: includedEdges,
      nodeCount: filteredNodes.length,
      edgeCount: includedEdges.length
    };
  }

  /**
   * Breadth-First Search finding path between two entities
   */
  static findPath(startId, endId) {
    const fullGraph = this.getFullGraph();
    const adj = new Map();

    for (const edge of fullGraph.edges) {
      if (!adj.has(edge.source)) adj.set(edge.source, []);
      if (!adj.has(edge.target)) adj.set(edge.target, []);
      adj.get(edge.source).push({ target: edge.target, edge });
      adj.get(edge.target).push({ target: edge.source, edge });
    }

    const queue = [[startId]];
    const visited = new Set([startId]);

    while (queue.length > 0) {
      const path = queue.shift();
      const current = path[path.length - 1];

      if (current === endId) {
        return {
          found: true,
          path,
          length: path.length - 1
        };
      }

      for (const neighbor of (adj.get(current) || [])) {
        if (!visited.has(neighbor.target)) {
          visited.add(neighbor.target);
          queue.push([...path, neighbor.target]);
        }
      }
    }

    return { found: false, path: [], length: 0 };
  }
}

export const knowledgeGraphService = {
  getFullGraph: () => KnowledgeGraphService.getFullGraph(),
  getSubgraph: (rootId, depth) => KnowledgeGraphService.getSubgraph(rootId, depth),
  findPath: (startId, endId) => KnowledgeGraphService.findPath(startId, endId)
};
