import React, { useState, useEffect, useRef } from 'react';
import { searchService } from '../services/api/searchService';
import { RESOURCE_TYPES } from '../models/types';
import { STATIONS } from '../data/stationsData';

export default function GlobalSearchModal({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [activeRegion, setActiveRegion] = useState('ALL');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSearchResults(null);
      setActiveFilter('ALL');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onNavigate(null, 'openSearch');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigate]);

  // Execute search when query or filters change
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      try {
        const res = searchService.search(query, {
          type: activeFilter,
          region: activeRegion,
          limit: 30
        });
        setSearchResults(res);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsSearching(false);
      }
    }, 80);

    return () => clearTimeout(timer);
  }, [query, activeFilter, activeRegion]);

  if (!isOpen) return null;

  const normalized = query.toLowerCase().trim();

  // Also query stations for local telemetry navigation
  const matchingStations = STATIONS.filter(s =>
    !normalized ||
    s.name.toLowerCase().includes(normalized) ||
    s.region.toLowerCase().includes(normalized) ||
    s.shortName.toLowerCase().includes(normalized)
  );

  const handleSelect = (tab, subId) => {
    onNavigate(tab, subId);
    onClose();
  };

  const getResourceTypeColor = (type) => {
    switch (type) {
      case RESOURCE_TYPES.DATASET: return 'text-primary bg-primary/10 border-primary/30';
      case RESOURCE_TYPES.EXPEDITION: return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case RESOURCE_TYPES.RESEARCHER: return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case RESOURCE_TYPES.PROJECT: return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      case RESOURCE_TYPES.PUBLICATION: return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30';
      case RESOURCE_TYPES.MEDIA: return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      default: return 'text-outline bg-surface-container border-outline-variant/30';
    }
  };

  const getDestinationTab = (type) => {
    switch (type) {
      case RESOURCE_TYPES.DATASET: return 'data';
      case RESOURCE_TYPES.EXPEDITION: return 'expeditions';
      case RESOURCE_TYPES.RESEARCHER: return 'data';
      case RESOURCE_TYPES.PROJECT: return 'data';
      case RESOURCE_TYPES.PUBLICATION: return 'data';
      case RESOURCE_TYPES.MEDIA: return 'explore';
      default: return 'home';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-3xl bg-surface-container-low rounded-2xl border border-outline-variant/40 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header & Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-outline-variant/30 bg-surface-container">
          <span className="material-symbols-outlined !text-2xl text-primary animate-pulse">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search polar researchers, projects, expeditions, datasets, publications, media..."
            className="w-full bg-transparent text-sm sm:text-base text-on-surface placeholder:text-outline focus:outline-none font-['Inter']"
          />
          {isSearching && (
            <span className="material-symbols-outlined !text-lg text-primary animate-spin">
              progress_activity
            </span>
          )}
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-outline hover:text-on-surface p-1"
            >
              <span className="material-symbols-outlined !text-base">close</span>
            </button>
          )}
          <span className="hidden sm:inline text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-lowest text-outline border border-outline-variant/30">
            ESC
          </span>
        </div>

        {/* Filter Tabs Strip */}
        <div className="px-5 py-2.5 bg-surface-container-lowest/80 border-b border-outline-variant/20 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
            <span className="text-outline text-[11px] mr-1 hidden sm:inline">TYPE:</span>
            {[
              { id: 'ALL', label: 'ALL' },
              { id: RESOURCE_TYPES.DATASET, label: 'DATASETS' },
              { id: RESOURCE_TYPES.EXPEDITION, label: 'EXPEDITIONS' },
              { id: RESOURCE_TYPES.RESEARCHER, label: 'RESEARCHERS' },
              { id: RESOURCE_TYPES.PROJECT, label: 'PROJECTS' },
              { id: RESOURCE_TYPES.PUBLICATION, label: 'PAPERS' },
              { id: RESOURCE_TYPES.MEDIA, label: 'MEDIA' }
            ].map(tab => {
              const count = searchResults?.categories ? 
                (tab.id === 'ALL' ? searchResults.categories.all : searchResults.categories[tab.id]) 
                : null;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-all flex items-center gap-1 ${
                    activeFilter === tab.id
                      ? 'bg-primary text-on-primary font-bold shadow-sm shadow-primary/20'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  <span>{tab.label}</span>
                  {count !== null && count !== undefined && (
                    <span className="opacity-80 text-[10px]">({count})</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1">
            <span className="text-outline text-[11px] mr-1">REGION:</span>
            <select
              value={activeRegion}
              onChange={(e) => setActiveRegion(e.target.value)}
              className="bg-surface-container text-on-surface px-2 py-1 rounded border border-outline-variant/30 text-[11px] focus:outline-none"
            >
              <option value="ALL">All Regions</option>
              <option value="Antarctica">Antarctica</option>
              <option value="Arctic">Arctic</option>
              <option value="Southern Ocean">Southern Ocean</option>
              <option value="Himalaya">Himalaya</option>
            </select>
          </div>
        </div>

        {/* Results Container */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {/* Quick Query Suggestions (when query is empty) */}
          {!query.trim() && (
            <div className="space-y-4 py-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="text-outline">SUGGESTED DISCOVERIES:</span>
                {[
                  'Antarctica',
                  'Maitri',
                  'Bharati',
                  'Himadri',
                  'Himansh',
                  'Ice Core',
                  'ISEA-44',
                  'Thamban Meloth',
                  'Kongsfjorden',
                  'pCO2',
                  'Geomagnetism'
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded bg-surface-container hover:bg-primary/20 hover:text-primary text-on-surface-variant transition-colors border border-outline-variant/30"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Station Outposts Quick Grid */}
              <div className="pt-4 border-t border-outline-variant/20">
                <div className="text-xs font-mono text-primary font-semibold uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>OUTPOST TELEMETRY SHORTCUTS</span>
                  <span className="text-outline font-normal text-[11px]">4 BASES ACTIVE</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {matchingStations.slice(0, 4).map(st => (
                    <div
                      key={st.id}
                      onClick={() => handleSelect('stations', st.id)}
                      className="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 cursor-pointer transition-all hover:border-primary/50 group"
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-['Space_Grotesk'] text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                          {st.shortName}
                        </span>
                        <span className="text-[10px] font-mono text-primary">
                          {st.liveWeather.temp}°C
                        </span>
                      </div>
                      <p className="text-[10px] text-outline mt-1 font-mono">{st.region}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Unified Deterministic Search Results */}
          {searchResults && searchResults.results.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-outline">
                <span>FOUND {searchResults.totalResults} SCIENTIFIC ASSETS FOR "{searchResults.query}"</span>
                <span>SORTED BY RELEVANCE</span>
              </div>

              <div className="space-y-2.5">
                {searchResults.results.map((item) => (
                  <div
                    key={`${item.resourceType}-${item.id}`}
                    onClick={() => handleSelect(getDestinationTab(item.resourceType), item.id)}
                    className="p-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 hover:border-primary/50 cursor-pointer transition-all group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${getResourceTypeColor(item.resourceType)}`}>
                          {item.resourceType}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-lowest text-outline border border-outline-variant/20">
                            {item.badge}
                          </span>
                        )}
                        {item.region && (
                          <span className="text-[10px] font-mono text-outline">
                            • {item.region}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[10px] font-mono text-outline shrink-0">
                        <span className="text-primary font-semibold">RELEVANCE: {item.relevanceScore}</span>
                      </div>
                    </div>

                    <h4 className="font-['Space_Grotesk'] text-sm font-bold text-on-surface group-hover:text-primary transition-colors mt-2">
                      {item.title}
                    </h4>

                    {item.shortDescription && (
                      <p className="text-xs text-on-surface-variant font-['Inter'] mt-1 line-clamp-2 leading-relaxed">
                        {item.shortDescription}
                      </p>
                    )}

                    {/* Metadata & Provenance Footer */}
                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-outline-variant/20 text-[10px] font-mono text-outline">
                      <div className="flex items-center gap-2">
                        {item.provenance && (
                          <span className="text-primary/80">
                            SRC: {item.provenance.sourceSystem}
                          </span>
                        )}
                        {item.matchedFields && item.matchedFields.length > 0 && (
                          <span className="hidden sm:inline">
                            MATCH: {item.matchedFields.join(', ')}
                          </span>
                        )}
                      </div>
                      <span className="text-primary font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        VIEW RECORD <span className="material-symbols-outlined !text-xs">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {query.trim() && searchResults && searchResults.results.length === 0 && (
            <div className="py-12 text-center text-on-surface-variant space-y-3">
              <span className="material-symbols-outlined !text-4xl text-outline animate-bounce">search_off</span>
              <h3 className="text-sm font-['Space_Grotesk'] font-bold text-on-surface uppercase">
                No Scientific Records Found for "{query}"
              </h3>
              <p className="text-xs text-outline font-['Inter'] max-w-sm mx-auto">
                No indexed researchers, projects, expeditions, datasets, or papers matched your search criteria in the selected filter.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => { setActiveFilter('ALL'); setActiveRegion('ALL'); }}
                  className="px-3 py-1.5 rounded bg-surface-container text-xs font-mono text-primary hover:bg-surface-container-high border border-outline-variant/30"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Institutional Footer */}
        <div className="px-5 py-3 border-t border-outline-variant/30 bg-surface-container-lowest text-[11px] font-mono text-outline flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>UNIFIED DETERMINISTIC ENGINE // FAIR OPEN ACCESS</span>
          </div>
          <span className="hidden sm:inline">PRESS ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
}
