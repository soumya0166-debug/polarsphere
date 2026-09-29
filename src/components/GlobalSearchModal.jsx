import React, { useState, useEffect, useRef } from 'react';
import { STATIONS } from '../data/stationsData';
import { ACTIVE_EXPEDITIONS, FIELD_DISPATCHES } from '../data/expeditionsData';
import { POLAR_DATASETS } from '../data/datasetsData';

export default function GlobalSearchModal({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
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

  if (!isOpen) return null;

  const normalized = query.toLowerCase().trim();

  const matchingStations = STATIONS.filter(s =>
    !normalized || s.name.toLowerCase().includes(normalized) || s.region.toLowerCase().includes(normalized) || s.shortName.toLowerCase().includes(normalized)
  );

  const matchingExpeditions = ACTIVE_EXPEDITIONS.filter(e =>
    !normalized || e.name.toLowerCase().includes(normalized) || e.region.toLowerCase().includes(normalized) || e.leader.toLowerCase().includes(normalized)
  );

  const matchingDatasets = POLAR_DATASETS.filter(d =>
    !normalized || d.title.toLowerCase().includes(normalized) || d.domain.toLowerCase().includes(normalized) || d.region.toLowerCase().includes(normalized)
  );

  const matchingDispatches = FIELD_DISPATCHES.filter(f =>
    !normalized || f.title.toLowerCase().includes(normalized) || f.body.toLowerCase().includes(normalized) || f.tags.some(t => t.toLowerCase().includes(normalized))
  );

  const handleSelect = (tab, subId) => {
    onNavigate(tab, subId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-surface-container-low rounded-2xl border border-outline-variant/40 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-outline-variant/30 bg-surface-container">
          <span className="material-symbols-outlined !text-xl text-primary">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stations, expeditions, datasets, research disciplines..."
            className="w-full bg-transparent text-sm text-on-surface placeholder:text-outline focus:outline-none font-['Inter']"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined !text-base">close</span>
            </button>
          )}
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-lowest text-outline border border-outline-variant/30">
            ESC
          </span>
        </div>

        {/* Search Results Container */}
        <div className="p-4 overflow-y-auto space-y-6">
          {/* Quick Filter Categories */}
          <div className="flex flex-wrap gap-2 text-[11px] font-mono">
            <span className="text-outline py-1">SUGGESTIONS:</span>
            {['Bharati', 'ISEA-44', 'Kongsfjorden', 'LiDAR', 'Maitri', 'pCO2'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 rounded bg-surface-container-high hover:bg-primary/20 text-on-surface-variant hover:text-primary transition-colors border border-outline-variant/20"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Stations Group */}
          {matchingStations.length > 0 && (
            <div>
              <div className="text-[11px] font-mono text-primary font-semibold uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>STATIONS & OUTPOSTS ({matchingStations.length})</span>
                <span className="text-outline font-normal">VIEW IN STATIONS TAB</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchingStations.map(st => (
                  <div
                    key={st.id}
                    onClick={() => handleSelect('stations', st.id)}
                    className="p-3 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 cursor-pointer transition-all hover:border-primary/50 group"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-['Space_Grotesk'] text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                        {st.shortName} Station
                      </span>
                      <span className="text-[10px] font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                        {st.liveWeather.temp}°C
                      </span>
                    </div>
                    <p className="text-[11px] text-outline mt-1 font-mono">{st.region} • {st.coordinates}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expeditions Group */}
          {matchingExpeditions.length > 0 && (
            <div>
              <div className="text-[11px] font-mono text-primary font-semibold uppercase tracking-wider mb-2">
                ACTIVE FIELD EXPEDITIONS ({matchingExpeditions.length})
              </div>
              <div className="space-y-2">
                {matchingExpeditions.map(exp => (
                  <div
                    key={exp.id}
                    onClick={() => handleSelect('expeditions', exp.id)}
                    className="p-3 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 cursor-pointer transition-all hover:border-primary/50 group"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-['Space_Grotesk'] text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                        {exp.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                        {exp.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant mt-1">Leader: {exp.leader} • Region: {exp.region}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Datasets Group */}
          {matchingDatasets.length > 0 && (
            <div>
              <div className="text-[11px] font-mono text-primary font-semibold uppercase tracking-wider mb-2">
                OPEN SCIENCE ARCHIVES ({matchingDatasets.length})
              </div>
              <div className="space-y-2">
                {matchingDatasets.map(ds => (
                  <div
                    key={ds.id}
                    onClick={() => handleSelect('data', ds.id)}
                    className="p-3 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 cursor-pointer transition-all hover:border-primary/50 group"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-['Space_Grotesk'] text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                        {ds.title}
                      </span>
                      <span className="text-[10px] font-mono text-outline">{ds.size}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] font-mono text-outline">
                      <span className="text-primary font-medium">{ds.domain}</span>
                      <span>DOI: {ds.doi}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results message */}
          {matchingStations.length === 0 && matchingExpeditions.length === 0 && matchingDatasets.length === 0 && (
            <div className="py-12 text-center text-on-surface-variant">
              <span className="material-symbols-outlined !text-4xl text-outline mb-2">search_off</span>
              <p className="text-sm font-['Space_Grotesk'] font-medium">No scientific records match your query.</p>
              <p className="text-xs text-outline mt-1 font-mono">Try searching by station name, discipline, or expedition.</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 border-t border-outline-variant/30 bg-surface-container-lowest text-[11px] font-mono text-outline flex items-center justify-between">
          <span>POLARSPHERE INDEXED REPOSITORY</span>
          <span>PRESS ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
}
