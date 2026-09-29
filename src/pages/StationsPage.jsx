import React, { useState } from 'react';
import { STATIONS, REGIONS } from '../data/stationsData';

export default function StationsPage({ selectedStationId, onNavigate }) {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [activeModalStation, setActiveModalStation] = useState(null);

  const filteredStations = STATIONS.filter(s =>
    selectedRegion === 'all' || s.region === selectedRegion
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header & Regional Filter */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-primary/30 text-xs font-mono text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>HIGH-LATITUDE & HIGH-ALTITUDE OBSERVATION NETWORK</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-bold tracking-tight text-on-surface uppercase">
            Stations & Outposts
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant font-['Inter'] max-w-3xl leading-relaxed">
            India maintains year-round institutional research bastions in Antarctica (Bharati, Maitri), Svalbard in the High Arctic (Himadri), and Spiti in the Western Himalaya (Himansh).
          </p>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-outline-variant/30 pb-4 font-['Space_Grotesk'] text-xs">
          {REGIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              className={`px-4 py-2 rounded-lg font-medium tracking-wider transition-all ${
                selectedRegion === r.id
                  ? 'bg-primary text-on-primary font-bold shadow-md shadow-primary/20'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-bright border border-outline-variant/30'
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>

      {/* Station Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredStations.map((station) => (
          <div
            key={station.id}
            id={station.id}
            className="rounded-2xl bg-surface-container-low border border-outline-variant/30 overflow-hidden shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Station Image Banner */}
            <div className="relative h-64 sm:h-72 w-full bg-surface-container overflow-hidden group">
              <img
                src={station.image}
                alt={station.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/20 to-transparent"></div>
              
              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[11px] font-mono text-primary border border-outline-variant/40 font-semibold">
                  {station.code}
                </span>
                <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[11px] font-mono text-emerald-400 border border-emerald-500/30">
                  {station.statusBadge}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-xs font-mono text-outline block">EST. {station.establishedYear} // ELEVATION {station.altitude}</span>
                  <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-on-surface">
                    {station.name}
                  </h3>
                </div>
                <div className="text-right font-mono">
                  <span className="text-2xl sm:text-3xl font-bold text-primary block">
                    {station.liveWeather.temp}°C
                  </span>
                  <span className="text-[10px] text-outline">LIVE SENSOR</span>
                </div>
              </div>
            </div>

            {/* Station Details Body */}
            <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-on-surface-variant font-['Inter'] leading-relaxed">
                  {station.description}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-outline block">COORDINATES</span>
                    <span className="text-on-surface font-semibold text-[11px] truncate block" title={station.coordinates}>
                      {station.coordinates}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-outline block">WINTER CREW</span>
                    <span className="text-on-surface font-semibold">{station.personnel.winter} Scientists</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-outline block">WIND SPEED</span>
                    <span className="text-primary font-semibold">{station.liveWeather.windSpeed} kt</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-outline block">STATION CHIEF</span>
                    <span className="text-on-surface font-semibold text-[11px] truncate block" title={station.personnel.leader}>
                      {station.personnel.leader}
                    </span>
                  </div>
                </div>

                {/* Scientific Focus Pillars */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-primary font-semibold uppercase tracking-wider">
                    Core Scientific Research Programs:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-on-surface-variant font-['Inter']">
                    {station.scientificDisciplines.slice(0, 4).map((disc, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{disc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Diagnostics Status Pills */}
                <div className="pt-3 border-t border-outline-variant/20 flex flex-wrap gap-2 text-[11px] font-mono text-outline">
                  <span className="px-2 py-0.5 rounded bg-surface-container-high border border-outline-variant/30">
                    POWER: {station.diagnostics.powerLoad}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high border border-outline-variant/30">
                    UPLINK: {station.diagnostics.satelliteUplink}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high border border-outline-variant/30">
                    RESERVES: {station.diagnostics.fuelReserveDays} Days
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveModalStation(station)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-surface-container-high hover:bg-surface-bright text-xs font-['Space_Grotesk'] font-bold text-primary border border-outline-variant/30 tracking-wider"
                >
                  <span>FACILITIES & INSTRUMENTS</span>
                  <span className="material-symbols-outlined !text-sm">tune</span>
                </button>

                <button
                  onClick={() => onNavigate('data', station.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-primary text-on-primary hover:bg-primary-fixed text-xs font-['Space_Grotesk'] font-bold tracking-wider transition-all shadow-md shadow-primary/20"
                >
                  <span>STATION DATASETS</span>
                  <span className="material-symbols-outlined !text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section: Live Micro-Climate Index Across Stations (Stitch Design Table) */}
      <section className="rounded-2xl bg-surface-container-low border border-outline-variant/30 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/30 pb-4">
          <div>
            <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
              SYNOPTIC TELEMETRY MATRIX
            </span>
            <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-on-surface uppercase mt-0.5">
              Live Micro-Climate Index Across Stations
            </h2>
          </div>
          <span className="text-xs font-mono text-outline">
            UPDATE FREQUENCY: 1-MINUTE IMD/NCPOR SAMPLING
          </span>
        </div>

        {/* Responsive Telemetry Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/40 text-outline text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Station</th>
                <th className="py-3 px-4 font-semibold">Region</th>
                <th className="py-3 px-4 font-semibold">Ambient Temp</th>
                <th className="py-3 px-4 font-semibold">Wind Velocity</th>
                <th className="py-3 px-4 font-semibold">Wind Chill</th>
                <th className="py-3 px-4 font-semibold">Pressure</th>
                <th className="py-3 px-4 font-semibold">Solar Flux</th>
                <th className="py-3 px-4 font-semibold">Satellite Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {STATIONS.map((st) => (
                <tr key={st.id} className="hover:bg-surface-container-high/50 transition-colors">
                  <td className="py-3.5 px-4 font-['Space_Grotesk'] font-bold text-sm text-on-surface">
                    {st.name}
                  </td>
                  <td className="py-3.5 px-4 text-primary font-medium">
                    {st.region}
                  </td>
                  <td className="py-3.5 px-4 text-primary font-bold text-sm">
                    {st.liveWeather.temp}{st.liveWeather.tempUnit}
                  </td>
                  <td className="py-3.5 px-4 text-on-surface">
                    {st.liveWeather.windSpeed} kt {st.liveWeather.windDirection}
                  </td>
                  <td className="py-3.5 px-4 text-on-surface-variant">
                    {st.liveWeather.windChill}°C
                  </td>
                  <td className="py-3.5 px-4 text-on-surface">
                    {st.liveWeather.pressure} hPa
                  </td>
                  <td className="py-3.5 px-4 text-on-surface-variant">
                    {st.liveWeather.solarRadiation}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>ACTIVE</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Facilities & Diagnostic Modal */}
      {activeModalStation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div 
            className="w-full max-w-2xl bg-surface-container-low rounded-2xl border border-outline-variant/40 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-outline-variant/30 pb-4">
              <div>
                <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
                  FACILITIES & INSTRUMENTATION
                </span>
                <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-on-surface mt-1">
                  {activeModalStation.name}
                </h3>
                <p className="text-xs font-mono text-outline">
                  {activeModalStation.location} ({activeModalStation.coordinates})
                </p>
              </div>
              <button
                onClick={() => setActiveModalStation(null)}
                className="p-1.5 rounded text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined !text-xl">close</span>
              </button>
            </div>

            {/* Specialized Labs */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-primary font-semibold uppercase tracking-wider">
                Specialized Research Facilities & Clean Laboratories:
              </h4>
              <div className="space-y-2">
                {activeModalStation.facilities.map((fac, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 flex items-center gap-3">
                    <span className="material-symbols-outlined !text-lg text-primary">science</span>
                    <span className="text-xs text-on-surface font-['Inter']">{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostic Matrix */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-primary font-semibold uppercase tracking-wider">
                Station Diagnostics & Life-Support Systems:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
                  <div className="text-[10px] text-outline">POWER GENERATION</div>
                  <div className="text-on-surface font-semibold mt-0.5">{activeModalStation.diagnostics.powerSource}</div>
                  <div className="text-[11px] text-primary mt-1">Load: {activeModalStation.diagnostics.powerLoad}</div>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
                  <div className="text-[10px] text-outline">SATELLITE TELEMETRY BANDWIDTH</div>
                  <div className="text-on-surface font-semibold mt-0.5">{activeModalStation.diagnostics.satelliteUplink}</div>
                  <div className="text-[11px] text-primary mt-1">Zero Latency Data Burst</div>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
                  <div className="text-[10px] text-outline">WATER & RECYCLING</div>
                  <div className="text-on-surface font-semibold mt-0.5">{activeModalStation.diagnostics.waterRecycling}</div>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
                  <div className="text-[10px] text-outline">STRUCTURAL INTEGRITY</div>
                  <div className="text-on-surface font-semibold mt-0.5">{activeModalStation.diagnostics.structuralHealth}</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/30 flex justify-end">
              <button
                onClick={() => setActiveModalStation(null)}
                className="px-5 py-2 rounded bg-surface-container-high hover:bg-surface-bright text-xs font-['Space_Grotesk'] font-bold text-on-surface"
              >
                Close Console
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
