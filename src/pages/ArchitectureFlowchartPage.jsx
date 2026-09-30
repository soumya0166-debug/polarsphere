import React, { useState } from 'react';

export default function ArchitectureFlowchartPage({ onNavigate }) {
  const [activeHighlight, setActiveHighlight] = useState(null);
  const [viewMode, setViewMode] = useState('executive'); // 'executive' or 'deepdive'
  const [selectedNode, setSelectedNode] = useState(null);

  // 7 Existing NCPOR Sources
  const existingSources = [
    { id: 'reports', label: 'Expedition Reports', icon: 'assignment', desc: '44+ seasons of field voyage logs' },
    { id: 'datasets', label: 'Scientific Datasets', icon: 'dataset', desc: 'Meteorology, ice cores, GNSS, CTD' },
    { id: 'publications', label: 'Publications', icon: 'menu_book', desc: 'Peer-reviewed polar research papers' },
    { id: 'photographs', label: 'Photographs', icon: 'photo_camera', desc: 'High-res station & wildlife archives' },
    { id: 'videos', label: 'Videos', icon: 'videocam', desc: 'Voyage footage & documentary media' },
    { id: 'news', label: 'News & Activities', icon: 'campaign', desc: 'Institutional updates & press briefings' },
    { id: 'outreach', label: 'Outreach Resources', icon: 'school', desc: 'Student kits, brochures, webinars' }
  ];

  // 4 Ingestion Modules
  const ingestionModules = [
    { title: 'Metadata Extraction', tag: 'STAGE 01', desc: 'Extracts authors, DOIs, timestamps, geo-coordinates, and station codes' },
    { title: 'OCR / Transcription', tag: 'STAGE 02', desc: 'Digitizes legacy expedition reports and transcribes field voyage audio' },
    { title: 'AI Tagging & Classify', tag: 'STAGE 03', desc: 'Semantic taxonomy tagging across Cryosphere, Ocean, and Climate' },
    { title: 'Deduplication & Norm', tag: 'STAGE 04', desc: 'Resolves cross-system entity conflicts into standardized JSON-LD' }
  ];

  // Knowledge Graph Nodes
  const graphNodes = [
    { id: 'researcher', label: 'Researcher', role: 'Chief Scientist / Field PI', icon: 'person', x: '10%', y: '30%', color: '#74e2ff' },
    { id: 'project', label: 'Project', role: 'Cryosphere Dynamics Program', icon: 'folder_special', x: '26%', y: '65%', color: '#35c8e8' },
    { id: 'expedition', label: 'Expedition', role: 'ISEA-44 / Himadri Arctic', icon: 'directions_boat', x: '45%', y: '25%', color: '#96ccff' },
    { id: 'dataset', label: 'Dataset', role: 'Larsemann GNSS / Met Logs', icon: 'storage', x: '62%', y: '70%', color: '#4bd7f7' },
    { id: 'publication', label: 'Publication', role: 'Nature / Polar Science Papers', icon: 'article', x: '78%', y: '25%', color: '#b0dbe5' },
    { id: 'media', label: 'Photo / Video', role: 'Drone LiDAR & Field Dispatches', icon: 'perm_media', x: '92%', y: '65%', color: '#cee5ff' }
  ];

  // Core Platform Experiences
  const platformModules = [
    { name: 'Explore Polar World', icon: 'travel_explore' },
    { name: 'Polar Science Explorer', icon: 'biotech' },
    { name: 'Polar Data Explorer', icon: 'dataset' },
    { name: 'Knowledge Hub', icon: 'auto_stories' },
    { name: 'Polar Media', icon: 'perm_media' },
    { name: 'Learning Lab', icon: 'school' },
    { name: 'Ask Polar AI', icon: 'smart_toy' },
    { name: 'Expedition & Research Explorer', icon: 'directions_boat' }
  ];

  // User Audiences
  const userAudiences = [
    {
      role: 'Researchers',
      subtitle: 'Scientific Discovery',
      bullets: ['FAIR Datasets', 'Publications', 'Expedition Archives'],
      icon: 'science',
      color: '#74e2ff'
    },
    {
      role: 'Students',
      subtitle: 'Interactive Learning',
      bullets: ['Simulated Lessons', '3D Visualizations', 'Polar Quizzes'],
      icon: 'school',
      color: '#35c8e8'
    },
    {
      role: 'Teachers',
      subtitle: 'Educational Resources',
      bullets: ['Verified Science', 'Curriculum Kits', 'Teaching Material'],
      icon: 'menu_book',
      color: '#96ccff'
    },
    {
      role: 'Public',
      subtitle: 'Polar Awareness',
      bullets: ['Expedition Stories', 'Station Telemetry', 'Discoveries'],
      icon: 'public',
      color: '#b0dbe5'
    }
  ];

  return (
    <div className="w-full bg-[#060c14] text-[#d8e3f4] py-8 sm:py-12 px-3 sm:px-6 lg:px-8 space-y-12">
      {/* Top Presentation Header Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-outline-variant/30 pb-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-primary/20 text-primary border border-primary/40 uppercase">
              Smart India Hackathon (SIH) Solution Architecture
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
              NATIONAL-LEVEL TECHNICAL SPECIFICATION
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase">
            PolarSphere Solution Architecture
          </h1>
          <p className="text-xs sm:text-sm text-[#869397] font-['Inter'] max-w-3xl leading-relaxed">
            Architectural transformation from siloed NCPOR institutional resources into a unified, navigable <span className="text-primary font-semibold">Polar Knowledge Graph</span> powered by parallel AI retrieval and interactive geospatial visualization.
          </p>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex p-1 rounded-xl bg-surface-container-low border border-outline-variant/30 font-['Space_Grotesk'] text-xs">
            <button
              onClick={() => setViewMode('executive')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-semibold ${
                viewMode === 'executive'
                  ? 'bg-primary text-[#09141f] shadow-sm'
                  : 'text-[#869397] hover:text-white'
              }`}
            >
              Executive (5-8s View)
            </button>
            <button
              onClick={() => setViewMode('deepdive')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-semibold ${
                viewMode === 'deepdive'
                  ? 'bg-primary text-[#09141f] shadow-sm'
                  : 'text-[#869397] hover:text-white'
              }`}
            >
              Technical Deep-Dive
            </button>
          </div>

          <a
            href="/architecture_presentation.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-high hover:bg-surface-bright text-xs font-mono text-primary border border-outline-variant/40"
            title="Open Fullscreen Presentation Slide (16:9)"
          >
            <span className="material-symbols-outlined !text-base">open_in_new</span>
            <span>16:9 Slide</span>
          </a>
        </div>
      </div>

      {/* Main Flowchart Canvas (16:9 Flow Composition) */}
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ========================================================================= */}
        {/* LAYER 1: EXISTING NCPOR DIGITAL ECOSYSTEM (SOURCE LAYER) */}
        {/* ========================================================================= */}
        <div className="relative rounded-2xl bg-surface-container-low/90 border border-outline-variant/40 p-6 sm:p-7 shadow-2xl space-y-4">
          {/* Header Strip with Differentiating Tag */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/30 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <h2 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-white tracking-wider uppercase">
                EXISTING NCPOR DIGITAL ECOSYSTEM
              </h2>
            </div>
            <span className="text-[11px] font-mono text-amber-300/90 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
              EXISTING ASSETS // HIGH VALUE BUT FRAGMENTED
            </span>
          </div>

          {/* 7 Visually Distinct Source Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {existingSources.map((src) => (
              <div
                key={src.id}
                className="p-3 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/30 hover:border-amber-400/50 transition-all text-center space-y-2 group"
              >
                <div className="w-9 h-9 mx-auto rounded-lg bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined !text-lg">{src.icon}</span>
                </div>
                <div className="font-['Space_Grotesk'] text-xs font-bold text-white leading-tight">
                  {src.label}
                </div>
                <div className="text-[10px] text-[#869397] font-['Inter'] line-clamp-2">
                  {src.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Layer Caption */}
          <div className="text-center pt-1 text-xs font-mono text-[#869397]">
            <span className="text-amber-400 font-semibold">“Valuable resources exist across multiple digital systems”</span>
            <span className="hidden sm:inline"> — Opportunity to connect, enrich, and unify without recreation.</span>
          </div>
        </div>

        {/* CONNECTING FLOW ARROW: 1 -> 2 */}
        <div className="flex flex-col items-center justify-center -my-3 relative z-10">
          <div className="w-px h-6 bg-gradient-to-b from-amber-400/50 to-primary"></div>
          <div className="px-3 py-0.5 rounded-full bg-surface-container-high border border-primary/40 text-[10px] font-mono text-primary flex items-center gap-1 shadow-lg">
            <span>DATA INGESTION PIPELINE</span>
            <span className="material-symbols-outlined !text-xs">arrow_downward</span>
          </div>
          <div className="w-px h-6 bg-gradient-to-b from-primary to-primary"></div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 2: UNIFIED KNOWLEDGE INGESTION */}
        {/* ========================================================================= */}
        <div className="rounded-2xl bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low border border-primary/40 p-6 sm:p-7 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/30 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
              <h2 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-white tracking-wider uppercase">
                UNIFIED KNOWLEDGE INGESTION
              </h2>
            </div>
            <span className="text-[11px] font-mono text-primary bg-primary/10 px-2.5 py-0.5 rounded border border-primary/30">
              PROPOSED POLARSPHERE INTEGRATION CORE
            </span>
          </div>

          {/* 4 Pipeline Stages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ingestionModules.map((mod, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 relative space-y-2 hover:border-primary/60 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-primary font-bold">{mod.tag}</span>
                  {idx < 3 && (
                    <span className="material-symbols-outlined !text-xs text-outline hidden lg:inline">
                      arrow_forward
                    </span>
                  )}
                </div>
                <h3 className="font-['Space_Grotesk'] text-sm font-bold text-white">
                  {mod.title}
                </h3>
                <p className="text-[11px] text-[#869397] font-['Inter'] leading-relaxed">
                  {mod.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Caption */}
          <div className="text-center pt-1 text-xs font-mono text-[#869397]">
            <span className="text-primary font-semibold">“Convert distributed resources into structured, discoverable knowledge.”</span>
          </div>
        </div>

        {/* CONNECTING FLOW ARROW: 2 -> 3 */}
        <div className="flex flex-col items-center justify-center -my-3 relative z-10">
          <div className="w-px h-6 bg-primary"></div>
          <div className="px-3 py-0.5 rounded-full bg-surface-container-high border border-primary/40 text-[10px] font-mono text-primary flex items-center gap-1 shadow-lg">
            <span>GRAPH ENRICHMENT & ONTOLOGY MAPPING</span>
            <span className="material-symbols-outlined !text-xs">arrow_downward</span>
          </div>
          <div className="w-px h-6 bg-primary"></div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 3: POLAR KNOWLEDGE GRAPH (VISUAL CENTERPIECE) */}
        {/* ========================================================================= */}
        <div className="rounded-2xl bg-[#09141f] border-2 border-primary/50 p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden bg-polar-grid">
          {/* Subtle Radar Background Glow */}
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/30 pb-4 relative z-10">
            <div>
              <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-widest block">
                CORE INNOVATION // SEMANTIC RELATIONSHIP MATRIX
              </span>
              <h2 className="font-['Space_Grotesk'] text-lg sm:text-2xl font-bold text-white tracking-wider uppercase mt-0.5">
                POLAR KNOWLEDGE GRAPH
              </h2>
            </div>
            <div className="px-3 py-1 rounded bg-primary/10 text-primary border border-primary/30 text-xs font-mono font-semibold">
              CONNECTED SCIENTIFIC ECOSYSTEM
            </div>
          </div>

          {/* Knowledge Graph Visual Node Map */}
          <div className="relative py-4 z-10">
            {/* Visual Golden Relationship Strip */}
            <div className="mb-6 p-3 rounded-xl bg-surface-container-lowest/90 border border-primary/30 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-center shadow-inner">
              <span className="text-white font-bold">CORE LINK:</span>
              <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-semibold">Researcher</span>
              <span className="text-[#869397]">→</span>
              <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-semibold">Project</span>
              <span className="text-[#869397]">→</span>
              <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-semibold">Expedition</span>
              <span className="text-[#869397]">→</span>
              <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-semibold">Dataset</span>
              <span className="text-[#869397]">→</span>
              <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-semibold">Paper</span>
              <span className="text-[#869397]">↔</span>
              <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-semibold">Media</span>
            </div>

            {/* Interactive Graph Node Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {graphNodes.map((node) => (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-center space-y-2 group ${
                    selectedNode?.id === node.id
                      ? 'bg-primary-container/20 border-primary shadow-lg shadow-primary/20 scale-105'
                      : 'bg-surface-container-low border-outline-variant/30 hover:border-primary/60 hover:bg-surface-container-high'
                  }`}
                >
                  <div
                    className="w-10 h-10 mx-auto rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${node.color}20`, color: node.color, border: `1px solid ${node.color}50` }}
                  >
                    <span className="material-symbols-outlined !text-xl">{node.icon}</span>
                  </div>
                  <div className="font-['Space_Grotesk'] text-sm font-bold text-white leading-tight">
                    {node.label}
                  </div>
                  <div className="text-[10px] text-[#869397] font-mono leading-tight">
                    {node.role}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Caption */}
          <div className="text-center pt-2 text-xs font-mono text-[#869397] relative z-10">
            <span className="text-primary font-semibold">“Connect previously distributed scientific relationships into one navigable knowledge ecosystem.”</span>
          </div>
        </div>

        {/* CONNECTING DUAL BRANCH SPLIT ARROWS: 3 -> 4 */}
        <div className="relative py-2">
          <div className="flex justify-center items-center">
            <div className="w-px h-6 bg-primary"></div>
          </div>
          {/* Horizontal Fork Bar */}
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="w-1/2 border-t-2 border-primary"></div>
            <div className="px-4 py-0.5 rounded bg-surface-container-high border border-primary/40 text-[10px] font-mono text-primary font-semibold shadow-md whitespace-nowrap">
              PARALLEL INTELLIGENCE PIPELINE
            </div>
            <div className="w-1/2 border-t-2 border-primary"></div>
          </div>
          {/* Downward branches to left and right */}
          <div className="max-w-3xl mx-auto flex justify-between px-16">
            <div className="w-px h-6 bg-primary"></div>
            <div className="w-px h-6 bg-primary"></div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 4: TWO INTELLIGENCE PATHS (LEFT: AI ENGINE | RIGHT: VISUALIZATION) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT BRANCH: POLAR AI KNOWLEDGE ENGINE */}
          <div className="rounded-2xl bg-surface-container-low border border-primary/40 p-6 space-y-5 shadow-2xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">smart_toy</span>
                  <h3 className="font-['Space_Grotesk'] text-base font-bold text-white uppercase tracking-wider">
                    POLAR AI KNOWLEDGE ENGINE
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/30">
                  RAG ARCHITECTURE
                </span>
              </div>

              {/* Step Sequence */}
              <div className="space-y-2 font-mono text-xs">
                {[
                  { step: '01', title: 'RAG-based Retrieval', desc: 'Hybrid dense vector + BM25 keyword retrieval over indexed NCPOR knowledge base' },
                  { step: '02', title: 'Natural-Language Search', desc: 'Semantic understanding of domain terms (e.g. katabatic winds, AABW, firn)' },
                  { step: '03', title: 'Ask Polar AI', desc: 'Context-grounded assistant with transparent DOI source citations' },
                  { step: '04', title: 'Summarization & Recommendations', desc: 'Automated synthesis across multi-decade voyage expedition reports' }
                ].map((s, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex items-start gap-3">
                    <span className="text-primary font-bold">{s.step}</span>
                    <div className="space-y-0.5">
                      <div className="text-white font-['Space_Grotesk'] font-bold text-xs">{s.title}</div>
                      <div className="text-[11px] text-[#869397] font-['Inter'] leading-relaxed">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Query Bubble */}
            <div className="p-3.5 rounded-xl bg-surface-container-highest/60 border border-primary/40 font-mono text-xs space-y-1">
              <span className="text-[10px] text-primary font-semibold block uppercase">EXAMPLE USER PROMPT:</span>
              <p className="text-white italic">
                “Show me India's Antarctic expeditions related to climate research.”
              </p>
              <div className="text-[10px] text-emerald-400 font-semibold pt-1">
                ✓ Retrieves from Knowledge Graph: ISEA-44 • Bharati Station • pCO₂ Datasets
              </div>
            </div>
          </div>

          {/* RIGHT BRANCH: POLAR DATA & VISUALIZATION ENGINE */}
          <div className="rounded-2xl bg-surface-container-low border border-primary/40 p-6 space-y-5 shadow-2xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">public</span>
                  <h3 className="font-['Space_Grotesk'] text-base font-bold text-white uppercase tracking-wider">
                    POLAR DATA & VISUALIZATION ENGINE
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/30">
                  INTERACTIVE EXPLORATION
                </span>
              </div>

              {/* Step Sequence */}
              <div className="space-y-2 font-mono text-xs">
                {[
                  { step: '01', title: 'Interactive Polar Globe', desc: 'Canvas-driven 3D orthographic projections for Antarctica, Arctic, and Third Pole' },
                  { step: '02', title: 'Expedition & Station Maps', desc: 'Real-time vessel tracking, GPS fast-ice waypoints, and bathymetry depth lines' },
                  { step: '03', title: 'Scientific Charts', desc: 'Synoptic micro-climate sparklines, air pressure trends, and solar flux analytics' },
                  { step: '04', title: 'Timelines & Media Exploration', desc: 'Interactive chronological traverses and high-resolution photo/video galleries' }
                ].map((s, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex items-start gap-3">
                    <span className="text-primary font-bold">{s.step}</span>
                    <div className="space-y-0.5">
                      <div className="text-white font-['Space_Grotesk'] font-bold text-xs">{s.title}</div>
                      <div className="text-[11px] text-[#869397] font-['Inter'] leading-relaxed">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Transformation Capsule */}
            <div className="p-3.5 rounded-xl bg-surface-container-highest/60 border border-primary/40 font-mono text-xs space-y-1">
              <span className="text-[10px] text-primary font-semibold block uppercase">DATA-TO-EXPLORATION TRANSFORMATION:</span>
              <p className="text-white">
                Complex NetCDF grids, LiDAR points & sensor logs → Intuitive 3D globe & interactive dashboards
              </p>
              <div className="text-[10px] text-emerald-400 font-semibold pt-1">
                ✓ Accessible to school students, researchers, and public citizens
              </div>
            </div>
          </div>
        </div>

        {/* CONNECTING CONVERGENCE ARROWS: 4 -> 5 */}
        <div className="relative py-2">
          {/* Inward fork bar converging to center */}
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="w-1/2 border-b-2 border-primary"></div>
            <div className="px-4 py-0.5 rounded bg-surface-container-high border border-primary/40 text-[10px] font-mono text-primary font-semibold shadow-md whitespace-nowrap">
              CONVERGENCE INTO INTEGRATED PLATFORM
            </div>
            <div className="w-1/2 border-b-2 border-primary"></div>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-px h-6 bg-primary"></div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 5: POLARSPHERE PLATFORM (VISUALLY DOMINANT CENTRAL BLOCK) */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-gradient-to-b from-[#111c28] to-[#09141f] border-2 border-primary p-6 sm:p-10 shadow-2xl space-y-6 text-center relative overflow-hidden">
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute inset-0 bg-polar-aurora pointer-events-none opacity-50"></div>

          <div className="space-y-2 relative z-10 max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/40 text-xs font-mono font-bold uppercase tracking-widest">
              UNIFIED DIGITAL PRODUCT EXPERIENCE
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-extrabold text-white tracking-wider uppercase">
              POLARSPHERE
            </h2>
            <p className="font-['Space_Grotesk'] text-sm sm:text-lg text-primary font-semibold tracking-wide">
              Integrated Polar Knowledge, Discovery & Outreach Platform
            </p>
          </div>

          {/* 8 Core Experience Modules Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10 pt-2">
            {platformModules.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-surface-container-lowest/90 border border-outline-variant/30 hover:border-primary/80 transition-colors flex items-center gap-2.5 text-left group"
              >
                <span className="material-symbols-outlined !text-xl text-primary group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span className="font-['Space_Grotesk'] text-xs font-bold text-white leading-tight">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CONNECTING ARROW: 5 -> 6 */}
        <div className="flex flex-col items-center justify-center -my-3 relative z-10">
          <div className="w-px h-6 bg-primary"></div>
          <div className="px-3 py-0.5 rounded-full bg-surface-container-high border border-primary/40 text-[10px] font-mono text-primary flex items-center gap-1 shadow-lg">
            <span>TAILORED AUDIENCE PATHWAYS</span>
            <span className="material-symbols-outlined !text-xs">arrow_downward</span>
          </div>
          <div className="w-px h-6 bg-primary"></div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 6: USERS (4 TARGET AUDIENCE PATHWAYS) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {userAudiences.map((aud, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 hover:border-primary/50 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${aud.color}20`, color: aud.color, border: `1px solid ${aud.color}40` }}
                  >
                    <span className="material-symbols-outlined !text-xl">{aud.icon}</span>
                  </div>
                  <span className="text-[10px] font-mono text-outline uppercase font-semibold">
                    PATHWAY 0{idx + 1}
                  </span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">
                  {aud.role}
                </h3>
                <div className="text-xs font-mono text-primary font-medium">
                  {aud.subtitle}
                </div>
              </div>

              <div className="pt-2 border-t border-outline-variant/20 space-y-1">
                {aud.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="text-xs text-[#869397] font-['Inter'] flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary"></span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* LAYER 7: FINAL IMPACT STRIP (HORIZONTAL TRANSFORMATION STATEMENT) */}
        {/* ========================================================================= */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-surface-container-lowest via-surface-container-high to-surface-container-lowest border-2 border-primary/40 shadow-2xl space-y-4">
          <div className="text-center font-['Space_Grotesk'] text-xs sm:text-sm font-bold text-primary tracking-widest uppercase">
            STRATEGIC IMPACT TRANSFORMATION STATEMENT
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            {/* Stage 1 */}
            <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 space-y-1">
              <div className="text-xs font-mono font-bold text-amber-400">01. FRAGMENTED</div>
              <div className="text-xs text-[#869397] font-['Inter']">Multiple siloed digital resources across agencies</div>
            </div>

            {/* Stage 2 */}
            <div className="p-3 rounded-xl bg-surface-container-lowest border border-primary/30 space-y-1">
              <div className="text-xs font-mono font-bold text-primary">02. CONNECTED</div>
              <div className="text-xs text-[#869397] font-['Inter']">Navigable Polar Knowledge Graph with linked entities</div>
            </div>

            {/* Stage 3 */}
            <div className="p-3 rounded-xl bg-surface-container-lowest border border-primary/30 space-y-1">
              <div className="text-xs font-mono font-bold text-primary">03. INTELLIGENT</div>
              <div className="text-xs text-[#869397] font-['Inter']">Domain RAG AI with grounded natural language discovery</div>
            </div>

            {/* Stage 4 */}
            <div className="p-3 rounded-xl bg-surface-container-lowest border border-emerald-500/30 space-y-1">
              <div className="text-xs font-mono font-bold text-emerald-400">04. ENGAGING</div>
              <div className="text-xs text-[#869397] font-['Inter']">3D Geosphere, telemetry charts & outreach lab</div>
            </div>
          </div>

          <div className="text-center text-[11px] font-mono text-white tracking-wider pt-2 border-t border-outline-variant/20">
            FROM FRAGMENTED INFORMATION → CONNECTED POLAR KNOWLEDGE → INTELLIGENT DISCOVERY → SCIENCE OUTREACH
          </div>
        </div>

      </div>
    </div>
  );
}
