import React, { useState } from 'react';
import { POLAR_DATASETS, DATA_DOMAINS } from '../data/datasetsData';
import { REGIONS } from '../data/stationsData';

export default function DataExplorerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [activeCodeTab, setActiveCodeTab] = useState('python');
  const [copiedCitation, setCopiedCitation] = useState(null);
  const [downloadModalDataset, setDownloadModalDataset] = useState(null);

  const filteredDatasets = POLAR_DATASETS.filter(ds => {
    const matchesQuery = !searchQuery || 
      ds.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.doi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || ds.region === selectedRegion;
    const matchesDomain = selectedDomain === 'all' || ds.domain.includes(selectedDomain);
    return matchesQuery && matchesRegion && matchesDomain;
  });

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCitation(id);
    setTimeout(() => setCopiedCitation(null), 2000);
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
            {DATA_DOMAINS.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Quick Result Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-outline pt-2 border-t border-outline-variant/20">
          <span>SHOWING {filteredDatasets.length} CERTIFIED OPEN DATASETS</span>
          <span>DATA POLICY: CC-BY 4.0 UNRESTRICTED</span>
        </div>
      </div>

      {/* Datasets List */}
      <div className="space-y-6">
        {filteredDatasets.map((ds) => (
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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(ds.citations.apa, ds.id + '-apa')}
                  className="px-3 py-1.5 rounded bg-surface-container-high hover:bg-surface-bright text-xs font-mono text-on-surface border border-outline-variant/30 flex items-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined !text-sm">format_quote</span>
                  <span>{copiedCitation === ds.id + '-apa' ? 'Copied APA!' : 'Cite Dataset (APA)'}</span>
                </button>

                <button
                  onClick={() => handleCopy(ds.citations.bibtex, ds.id + '-bib')}
                  className="px-3 py-1.5 rounded bg-surface-container-high hover:bg-surface-bright text-xs font-mono text-on-surface border border-outline-variant/30 flex items-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined !text-sm">content_copy</span>
                  <span>{copiedCitation === ds.id + '-bib' ? 'Copied BibTeX!' : 'BibTeX'}</span>
                </button>
              </div>

              <button
                onClick={() => setDownloadModalDataset(ds)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-primary text-on-primary hover:bg-primary-fixed text-xs font-['Space_Grotesk'] font-bold tracking-wider uppercase transition-all shadow-md shadow-primary/20"
              >
                <span className="material-symbols-outlined !text-base">cloud_download</span>
                <span>DOWNLOAD ARCHIVE ({ds.size})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

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
