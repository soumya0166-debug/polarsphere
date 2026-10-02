import React, { useState, useEffect } from 'react';
import { datasetsService } from '../services/api/datasetsService';
import { POLAR_DATASETS, DATA_DOMAINS } from '../data/datasetsData';
import { authService } from '../services/auth/authService';

export default function DataExplorerPage({ currentUser, onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [activeCodeTab, setActiveCodeTab] = useState('python');
  const [copiedCitation, setCopiedCitation] = useState(null);
  const [downloadModalDataset, setDownloadModalDataset] = useState(null);
  const [lineageDataset, setLineageDataset] = useState(null);
  const [lineageData, setLineageData] = useState(null);
  const [isLoadingLineage, setIsLoadingLineage] = useState(false);
  const [accessDeniedAlert, setAccessDeniedAlert] = useState(null);

  // Dynamic datasets from API service
  const [datasets, setDatasets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    async function fetchDatasets() {
      try {
        const domainMap = {
          'Cryosphere': 'Cryosphere & Glaciology',
          'Atmospheric Physics': 'Atmospheric Physics & Meteorology',
          'Oceanography': 'Oceanography & Marine Biogeochemistry',
          'Geoscience': 'Geology & Paleoclimate',
          'Marine Geochemistry': 'Polar Biology & Ecology'
        };
        const queryDomain = selectedDomain === 'all' ? undefined : (domainMap[selectedDomain] || selectedDomain);

        const res = await datasetsService.getDatasets({
          region: selectedRegion === 'all' ? undefined : selectedRegion,
          domain: queryDomain,
          search: searchQuery
        });

        if (isMounted) {
          // Normalize service data to match UI cards while preserving richness
          const normalizedList = res.data.map(d => ({
            id: d.dataset_id || d.id,
            title: d.title,
            shortTitle: d.title.split(' ')[0] + ' Data',
            region: d.geographic_region || d.region || 'Antarctica',
            domain: d.scientific_domain || d.domain || 'Cryosphere & Glaciology',
            version: d.metadata?.version || '2.4.1',
            doi: d.doi || '10.5067/NCPOR/NPDC/CORE',
            abstract: d.description || d.abstract,
            temporalCoverage: d.temporal_coverage_start && d.temporal_coverage_end 
              ? `${d.temporal_coverage_start} to ${d.temporal_coverage_end}`
              : (d.temporalCoverage || '2018 – 2024'),
            size: d.file_size_bytes 
              ? `${(d.file_size_bytes / (1024 * 1024)).toFixed(1)} MB` 
              : (d.size || '420 MB'),
            formats: d.data_format ? [d.data_format] : (d.formats || ['NetCDF']),
            license: d.license || 'CC-BY-4.0',
            fairCompliance: d.fairCompliance || {
              findable: 'Indexed in NPDC & WMO WIS 2.0 with registered DOI',
              accessible: 'Open OPeNDAP & HTTPS direct download',
              interoperable: 'Compliant with CF-1.8 NetCDF conventions',
              reusable: 'Full provenance & calibration metadata attached'
            },
            citations: d.citations || {
              apa: `NCPOR (2024). ${d.title}. National Polar Data Center. https://doi.org/${d.doi || '10.5067/NPDC'}`,
              bibtex: `@data{ncpor2024,\n  title={${d.title}},\n  author={NCPOR Team},\n  year={2024},\n  doi={${d.doi || '10.5067/NPDC'}}\n}`
            },
            provenance: d.provenance
          }));

          setDatasets(normalizedList);
        }
      } catch (err) {
        console.warn('Dataset service fetch error, falling back to static fixtures:', err);
        if (isMounted) {
          setError(err.message);
          // Fallback to static datasets
          setDatasets(POLAR_DATASETS);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    const timer = setTimeout(fetchDatasets, 100);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [searchQuery, selectedRegion, selectedDomain]);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCitation(id);
    setTimeout(() => setCopiedCitation(null), 2000);
  };

  const handleOpenLineage = async (dataset) => {
    setLineageDataset(dataset);
    setIsLoadingLineage(true);
    try {
      const lineage = await datasetsService.getDatasetLineage(dataset.id);
      setLineageData(lineage);
    } catch (err) {
      console.error('Error loading lineage:', err);
    } finally {
      setIsLoadingLineage(false);
    }
  };

  const handleDownloadClick = (ds) => {
    const access = authService.isDatasetAccessible(currentUser, ds);
    if (!access.allowed) {
      setAccessDeniedAlert({
        dataset: ds,
        reason: access.reason,
        code: access.code,
        requiredClearance: ds.clearanceRequired || 'researcher'
      });
      return;
    }
    setDownloadModalDataset(ds);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-primary/30 text-xs font-mono text-primary">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span>NATIONAL POLAR DATA CENTER (NPDC) // OPEN SCIENCE REPOSITORY</span>
        </div>
        <h1 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-bold tracking-tight text-on-surface uppercase">
          Polar Data Explorer & Open Science Archives
        </h1>
        <p className="text-sm sm:text-base text-on-surface-variant font-['Inter'] max-w-3xl leading-relaxed">
          Search, stream, and cite calibrated cryospheric time-series, LiDAR point clouds, bedrock GNSS archives, and marine biogeochemistry transects in full compliance with FAIR principles.
        </p>
      </div>

      {/* Search & Faceted Filter Bar */}
      <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Box */}
          <div className="flex-1 relative">
            <span className="material-symbols-outlined !text-xl absolute left-3.5 top-1/2 -translate-y-1/2 text-primary">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search datasets by keyword, variable, DOI, station, or author..."
              className="w-full bg-surface-container-lowest pl-11 pr-4 py-2.5 rounded-xl border border-outline-variant/40 text-xs sm:text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary font-['Inter']"
            />
          </div>

          {/* Region Dropdown */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-surface-container-lowest px-4 py-2.5 rounded-xl border border-outline-variant/40 text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary font-['Space_Grotesk'] cursor-pointer"
          >
            <option value="all">All Polar Regions</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Arctic">Arctic</option>
            <option value="Southern Ocean">Southern Ocean</option>
            <option value="Himalaya">Himalaya</option>
          </select>

          {/* Domain Dropdown */}
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="bg-surface-container-lowest px-4 py-2.5 rounded-xl border border-outline-variant/40 text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary font-['Space_Grotesk'] cursor-pointer"
          >
            <option value="all">All Scientific Domains</option>
            {DATA_DOMAINS.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Quick Result Counter & Provenance Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-outline pt-2 border-t border-outline-variant/20 gap-2">
          <div className="flex items-center gap-3">
            <span className="text-primary font-semibold">
              {isLoading ? 'QUERYING REPOSITORY...' : `SHOWING ${datasets.length} CERTIFIED OPEN DATASETS`}
            </span>
            {error && (
              <span className="text-amber-400 text-[11px]">(Offline fixture fallback active)</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span>DATA POLICY: CC-BY 4.0 UNRESTRICTED</span>
            <span>PROVENANCE: VERIFIED</span>
          </div>
        </div>
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="py-16 text-center space-y-3">
          <span className="material-symbols-outlined !text-4xl text-primary animate-spin">
            progress_activity
          </span>
          <p className="text-xs font-mono text-outline">Querying Polar Data Architecture & Metadata Cache...</p>
        </div>
      )}

      {/* Datasets List */}
      {!isLoading && (
        <div className="space-y-6">
          {datasets.map((ds) => (
            <div
              key={ds.id}
              id={ds.id}
              className="p-6 sm:p-8 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-6 hover:border-primary/50 transition-all duration-200 shadow-xl"
            >
              {/* Top Badges & DOI */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/20 pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-primary-container/20 border border-primary/30 text-[11px] font-mono text-primary font-semibold">
                    {ds.region}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-surface-container-high border border-outline-variant/30 text-[11px] font-mono text-on-surface-variant">
                    {ds.domain}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-surface-container-high border border-outline-variant/30 text-[11px] font-mono text-outline">
                    VERSION: {ds.version}
                  </span>
                  {ds.clearanceRequired && ds.clearanceRequired !== 'public' && (
                    <span className="px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-[11px] font-mono text-amber-400 flex items-center gap-1 font-semibold">
                      <span className="material-symbols-outlined !text-xs">lock</span>
                      {ds.clearanceRequired.toUpperCase()} CLEARANCE
                    </span>
                  )}
                  {ds.provenance && (
                    <span className="px-2 py-0.5 rounded bg-surface-container text-[10px] font-mono text-outline border border-outline-variant/20">
                      SRC: {ds.provenance.sourceSystem}
                    </span>
                  )}
                </div>
                <div className="text-xs font-mono text-outline flex items-center gap-2">
                  <span>DOI:</span>
                  <span className="text-primary font-medium">{ds.doi}</span>
                </div>
              </div>

              {/* Dataset Title & Description */}
              <div className="space-y-3">
                <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-on-surface">
                  {ds.title}
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant font-['Inter'] leading-relaxed">
                  {ds.abstract}
                </p>
              </div>

              {/* Metadata Badges Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-outline block">TEMPORAL RANGE</span>
                  <span className="text-on-surface font-semibold text-[11px] block mt-0.5">{ds.temporalCoverage}</span>
                </div>
                <div>
                  <span className="text-[10px] text-outline block">TOTAL ARCHIVE SIZE</span>
                  <span className="text-primary font-semibold text-[11px] block mt-0.5">{ds.size}</span>
                </div>
                <div>
                  <span className="text-[10px] text-outline block">FILE FORMATS</span>
                  <span className="text-on-surface font-semibold text-[11px] block mt-0.5">{ds.formats.join(', ')}</span>
                </div>
                <div>
                  <span className="text-[10px] text-outline block">LICENSE</span>
                  <span className="text-emerald-400 font-semibold text-[11px] block mt-0.5">{ds.license}</span>
                </div>
              </div>

              {/* FAIR Matrix Compliance Strip */}
              <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/20 font-mono text-[11px] grid grid-cols-2 md:grid-cols-4 gap-2 text-outline">
                <div><span className="text-primary font-bold">F:</span> {ds.fairCompliance.findable}</div>
                <div><span className="text-primary font-bold">A:</span> {ds.fairCompliance.accessible}</div>
                <div><span className="text-primary font-bold">I:</span> {ds.fairCompliance.interoperable}</div>
                <div><span className="text-primary font-bold">R:</span> {ds.fairCompliance.reusable}</div>
              </div>

              {/* Action Row */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleCopy(ds.citations.apa, ds.id + '-apa')}
                    className="px-3 py-1.5 rounded bg-surface-container-high hover:bg-surface-bright text-xs font-mono text-on-surface border border-outline-variant/30 flex items-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined !text-sm">format_quote</span>
                    <span>{copiedCitation === ds.id + '-apa' ? 'Copied APA!' : 'Cite (APA)'}</span>
                  </button>

                  <button
                    onClick={() => handleCopy(ds.citations.bibtex, ds.id + '-bib')}
                    className="px-3 py-1.5 rounded bg-surface-container-high hover:bg-surface-bright text-xs font-mono text-on-surface border border-outline-variant/30 flex items-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined !text-sm">content_copy</span>
                    <span>{copiedCitation === ds.id + '-bib' ? 'Copied BibTeX!' : 'BibTeX'}</span>
                  </button>

                  {/* Knowledge Graph Lineage Trigger */}
                  <button
                    onClick={() => handleOpenLineage(ds)}
                    className="px-3 py-1.5 rounded bg-primary/10 hover:bg-primary/20 text-xs font-mono text-primary border border-primary/30 flex items-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined !text-sm text-primary">hub</span>
                    <span>Knowledge Graph Lineage</span>
                  </button>
                </div>

                <button
                  onClick={() => handleDownloadClick(ds)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-primary text-on-primary hover:bg-primary-fixed text-xs font-['Space_Grotesk'] font-bold tracking-wider uppercase transition-all shadow-md shadow-primary/20"
                >
                  <span className="material-symbols-outlined !text-base">cloud_download</span>
                  <span>DOWNLOAD ARCHIVE ({ds.size})</span>
                </button>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {datasets.length === 0 && (
            <div className="py-16 text-center text-on-surface-variant space-y-3 p-8 rounded-2xl bg-surface-container-low border border-outline-variant/30">
              <span className="material-symbols-outlined !text-5xl text-outline animate-bounce">database</span>
              <h3 className="text-base font-['Space_Grotesk'] font-bold text-on-surface uppercase">
                No Polar Datasets Match Selected Filters
              </h3>
              <p className="text-xs text-outline font-['Inter'] max-w-md mx-auto">
                No records matched region: "{selectedRegion}" or domain: "{selectedDomain}". Try clearing your search keyword or selecting "All Polar Regions".
              </p>
              <button
                onClick={() => { setSelectedRegion('all'); setSelectedDomain('all'); setSearchQuery(''); }}
                className="mt-2 px-4 py-2 rounded bg-primary text-on-primary text-xs font-mono font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Section: FAIR Data Implementation Matrix (From Stitch Design) */}
      <section className="rounded-2xl bg-surface-container-low border border-outline-variant/30 p-6 sm:p-8 space-y-6">
        <div className="space-y-1 border-b border-outline-variant/30 pb-4">
          <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
            INTERNATIONAL DATA GOVERNANCE COMPLIANCE
          </span>
          <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-on-surface uppercase">
            FAIR Data Implementation Matrix
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant font-['Inter']">
            PolarSphere datasets conform strictly to the FAIR (Findable, Accessible, Interoperable, and Reusable) scientific data stewardship mandate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              letter: 'F',
              title: 'Findable',
              desc: 'Global persistent DOIs assigned via DataCite/Crossref. Rich geospatial & temporal metadata indexed in OAI-PMH and WMO WIS 2.0 catalogs.'
            },
            {
              letter: 'A',
              title: 'Accessible',
              desc: 'Open standard HTTPS and OPeNDAP retrieval protocols without authentication barriers for non-sensitive public scientific time series.'
            },
            {
              letter: 'I',
              title: 'Interoperable',
              desc: 'Standardized schemas: CF-1.8 NetCDF conventions for multi-dimensional ocean/atmospheric grids, ASPRS LAS 1.4 for point clouds.'
            },
            {
              letter: 'R',
              title: 'Reusable',
              desc: 'Explicit CC-BY 4.0 licensing, sensor calibration traceability certificates, and standardized machine-readable provenance chains.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-primary text-on-primary font-mono font-bold text-base flex items-center justify-center">
                {item.letter}
              </div>
              <h3 className="font-['Space_Grotesk'] font-bold text-sm text-on-surface">{item.title}</h3>
              <p className="text-xs text-on-surface-variant font-['Inter'] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Programmatic Telemetry & Archive API Snippets (From Stitch Design) */}
      <section className="rounded-2xl bg-surface-container-low border border-outline-variant/30 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/30 pb-4">
          <div>
            <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
              DEVELOPER & SCIENTIST API
            </span>
            <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-on-surface uppercase mt-0.5">
              Programmatic Telemetry & Archive API
            </h2>
          </div>

          <div className="flex items-center gap-1 font-mono text-xs">
            {['python', 'curl', 'r'].map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveCodeTab(lang)}
                className={`px-3 py-1 rounded uppercase tracking-wider transition-colors ${
                  activeCodeTab === lang
                    ? 'bg-primary text-on-primary font-bold'
                    : 'bg-surface-container-high text-outline hover:text-on-surface'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Code Box */}
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 font-mono text-xs overflow-x-auto text-primary">
          {activeCodeTab === 'python' && (
            <pre>
{`import requests
import xarray as xr

# Stream Bharati GNSS and Meteorological Telemetry
url = "https://data.npdc.gov.in/api/v1/telemetry/station/bharati/latest"
headers = {"Accept": "application/x-netcdf"}

response = requests.get(url, headers=headers)
with open("bharati_latest.nc", "wb") as f:
    f.write(response.content)

ds = xr.open_dataset("bharati_latest.nc")
print(ds.info())`}
            </pre>
          )}

          {activeCodeTab === 'curl' && (
            <pre>
{`# Fetch Maitri Station 1-minute surface weather record (JSON stream)
curl -X GET "https://data.npdc.gov.in/api/v1/archive/maitri/met?year=2025" \\
  -H "Accept: application/json" \\
  -H "User-Agent: PolarSphere-Client/2.4"`}
            </pre>
          )}

          {activeCodeTab === 'r' && (
            <pre>
{`# Load Kongsfjorden High-Arctic marine sediment records
library(httr)
library(ncdf4)

res <- GET("https://data.npdc.gov.in/api/v1/archive/himadri/sediment")
writeBin(content(res, "raw"), "kongsfjorden_sediment.nc")
nc_data <- nc_open("kongsfjorden_sediment.nc")
print(nc_data)`}
            </pre>
          )}
        </div>
      </section>

      {/* Lineage Modal (Knowledge Graph Inspector) */}
      {lineageDataset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div 
            className="w-full max-w-2xl bg-surface-container-low rounded-2xl border border-primary/40 shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-outline-variant/30 pb-4">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-lg bg-primary/20 text-primary material-symbols-outlined !text-xl">
                  hub
                </span>
                <div>
                  <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-widest">
                    POLAR KNOWLEDGE GRAPH // MULTI-HOP LINEAGE
                  </span>
                  <h3 className="font-['Space_Grotesk'] text-lg font-bold text-on-surface">
                    {lineageDataset.title}
                  </h3>
                </div>
              </div>
              <button onClick={() => setLineageDataset(null)} className="text-outline hover:text-on-surface">
                <span className="material-symbols-outlined !text-xl">close</span>
              </button>
            </div>

            {isLoadingLineage ? (
              <div className="py-12 text-center space-y-2">
                <span className="material-symbols-outlined !text-3xl text-primary animate-spin">progress_activity</span>
                <p className="text-xs font-mono text-outline">Resolving Knowledge Graph Edges...</p>
              </div>
            ) : lineageData ? (
              <div className="space-y-4 text-xs font-['Inter']">
                {/* Visual Lineage Chain */}
                <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 font-mono text-xs space-y-3">
                  <div className="text-[11px] text-primary font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                    <span>RESOLVED SCIENTIFIC RELATIONSHIP GRAPH</span>
                  </div>

                  {/* Linked Projects */}
                  <div>
                    <span className="text-[10px] text-outline block">PRODUCING PROJECT:</span>
                    {lineageData.projects.length > 0 ? lineageData.projects.map(p => (
                      <div key={p.project_id} className="text-on-surface font-semibold text-xs mt-0.5">
                        • {p.title} ({p.code})
                      </div>
                    )) : <span className="text-outline text-xs">Direct expedition collection</span>}
                  </div>

                  {/* Linked Expeditions */}
                  <div>
                    <span className="text-[10px] text-outline block">COLLECTION EXPEDITIONS:</span>
                    {lineageData.expeditions.length > 0 ? lineageData.expeditions.map(e => (
                      <div key={e.expedition_id} className="text-emerald-400 font-semibold text-xs mt-0.5">
                        • {e.expedition_name} [{e.code}] ({e.vessel_or_base})
                      </div>
                    )) : <span className="text-outline text-xs">Autonomous continuous telemetry station</span>}
                  </div>

                  {/* Linked Researchers */}
                  <div>
                    <span className="text-[10px] text-outline block">LEAD INVESTIGATORS / SCIENTISTS:</span>
                    {lineageData.researchers.length > 0 ? lineageData.researchers.map(r => (
                      <div key={r.researcher_id} className="text-amber-400 font-semibold text-xs mt-0.5">
                        • {r.name} — {r.designation} ({r.institution})
                      </div>
                    )) : <span className="text-outline text-xs">Institutional repository team</span>}
                  </div>

                  {/* Linked Publications */}
                  <div>
                    <span className="text-[10px] text-outline block">ASSOCIATED PEER-REVIEWED PUBLICATIONS:</span>
                    {lineageData.publications.length > 0 ? lineageData.publications.map(pb => (
                      <div key={pb.publication_id} className="text-indigo-400 font-semibold text-xs mt-0.5">
                        • "{pb.title}" in {pb.journal} ({pb.doi})
                      </div>
                    )) : <span className="text-outline text-xs">Manuscript in review</span>}
                  </div>
                </div>

                <div className="flex justify-between items-center text-[11px] font-mono text-outline pt-2 border-t border-outline-variant/20">
                  <span>PROVENANCE: {lineageDataset.provenance?.sourceSystem || 'NCPOR_NPDC'}</span>
                  <span>GRAPH HOP DISTANCE: 1-2 DEGREES</span>
                </div>
              </div>
            ) : null}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setLineageDataset(null)}
                className="px-4 py-2 rounded bg-surface-container-high text-xs font-mono text-on-surface hover:bg-surface-bright"
              >
                Close Lineage
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Access Denied / Clearance Required Modal */}
      {accessDeniedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div 
            className="w-full max-w-lg bg-surface-container-low rounded-2xl border border-amber-500/40 shadow-2xl p-6 sm:p-8 space-y-5"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined !text-xl text-amber-400">shield_lock</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-widest block">
                    SCIENTIFIC CLEARANCE EMBARGO
                  </span>
                  <h3 className="font-['Space_Grotesk'] text-lg font-bold text-on-surface mt-0.5">
                    Restricted Research Dataset
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setAccessDeniedAlert(null)} 
                className="text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined !text-xl">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/20">
                <span className="text-outline block text-[10px]">REQUESTED ARCHIVE:</span>
                <span className="text-on-surface font-semibold text-xs">{accessDeniedAlert.dataset.title}</span>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-on-surface-variant font-['Inter'] text-xs leading-relaxed">
                <span className="font-mono text-amber-400 font-semibold block mb-1">
                  CLEARANCE POLICY REQUIREMENT:
                </span>
                {accessDeniedAlert.reason}
              </div>
              <div className="flex justify-between p-2 rounded bg-surface-container-lowest text-outline">
                <span>REQUIRED CLEARANCE:</span>
                <span className="text-amber-400 font-bold uppercase">{accessDeniedAlert.requiredClearance}</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-surface-container-lowest text-outline">
                <span>YOUR CURRENT CLEARANCE:</span>
                <span className="text-primary font-bold uppercase">{currentUser ? (currentUser.clearance || 'RESEARCHER') : 'UNAUTHENTICATED (PUBLIC)'}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setAccessDeniedAlert(null)}
                className="px-4 py-2 rounded bg-surface-container-high text-xs font-mono text-on-surface hover:bg-surface-bright"
              >
                Dismiss
              </button>
              {!currentUser ? (
                <button
                  onClick={() => {
                    setAccessDeniedAlert(null);
                    if (onNavigate) onNavigate('auth');
                  }}
                  className="px-5 py-2 rounded bg-primary text-on-primary text-xs font-['Space_Grotesk'] font-bold uppercase tracking-wider shadow-md shadow-primary/20 hover:bg-primary-fixed flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined !text-sm">lock_open</span>
                  <span>Sign In / Register</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setAccessDeniedAlert(null);
                    if (onNavigate) onNavigate('auth');
                  }}
                  className="px-5 py-2 rounded bg-amber-500 text-on-primary text-xs font-['Space_Grotesk'] font-bold uppercase tracking-wider shadow-md shadow-amber-500/20 hover:bg-amber-400 flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined !text-sm">badge</span>
                  <span>View Dossier & Elevation</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Simulated Download Modal */}
      {downloadModalDataset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div 
            className="w-full max-w-lg bg-surface-container-low rounded-2xl border border-outline-variant/40 shadow-2xl p-6 sm:p-8 space-y-5"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-outline-variant/30 pb-3">
              <div>
                <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-widest">
                  NPDC OPEN ACCESS REPOSITORY
                </span>
                <h3 className="font-['Space_Grotesk'] text-lg font-bold text-on-surface mt-1">
                  Dataset Download Confirmation
                </h3>
              </div>
              <button onClick={() => setDownloadModalDataset(null)} className="text-outline hover:text-on-surface">
                <span className="material-symbols-outlined !text-xl">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/20">
                <span className="text-outline block text-[10px]">DATASET:</span>
                <span className="text-on-surface font-semibold text-xs">{downloadModalDataset.title}</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-surface-container-lowest text-outline">
                <span>ESTIMATED SIZE:</span>
                <span className="text-primary font-bold">{downloadModalDataset.size}</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-surface-container-lowest text-outline">
                <span>DATA LICENSE:</span>
                <span className="text-emerald-400 font-bold">{downloadModalDataset.license}</span>
              </div>
              <p className="text-[11px] text-outline font-['Inter']">
                By downloading, you agree to cite the National Polar Data Center (NPDC) and dataset authors using DOI: <span className="text-primary font-mono">{downloadModalDataset.doi}</span> in all subsequent research publications.
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setDownloadModalDataset(null)}
                className="px-4 py-2 rounded bg-surface-container-high text-xs font-mono text-on-surface hover:bg-surface-bright"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Direct download initiated for ${downloadModalDataset.shortTitle} archive package.`);
                  setDownloadModalDataset(null);
                }}
                className="px-5 py-2 rounded bg-primary text-on-primary text-xs font-['Space_Grotesk'] font-bold uppercase tracking-wider shadow-md shadow-primary/20 hover:bg-primary-fixed"
              >
                Begin Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
