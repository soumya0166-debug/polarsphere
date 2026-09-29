import React, { useState } from 'react';
import { ACTIVE_EXPEDITIONS, FIELD_DISPATCHES } from '../data/expeditionsData';

export default function ExpeditionsPage({ onNavigate }) {
  const [selectedExpeditionId, setSelectedExpeditionId] = useState('isea-44');
  const [dispatchFilter, setDispatchFilter] = useState('ALL');

  const expedition = ACTIVE_EXPEDITIONS.find(e => e.id === selectedExpeditionId) || ACTIVE_EXPEDITIONS[0];

  const filteredDispatches = FIELD_DISPATCHES.filter(d => 
    (selectedExpeditionId === 'isea-44' || d.expeditionId === selectedExpeditionId) &&
    (dispatchFilter === 'ALL' || d.tags.includes(dispatchFilter))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header & Expedition Switcher Tabs */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-primary/30 text-xs font-mono text-primary">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>POLAR MISSION CONTROL & FIELD TELEMETRY</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-bold tracking-tight text-on-surface uppercase">
            Expedition Mission Control
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant font-['Inter'] max-w-3xl leading-relaxed">
            Real-time tracking of maritime voyages, vessel transits, scientific fieldwork, and dispatches across the Southern Ocean, Antarctica, the High Arctic, and Himalayan glaciers.
          </p>
        </div>

        {/* Expedition Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-outline-variant/30 pb-4 font-['Space_Grotesk'] text-xs">
          {ACTIVE_EXPEDITIONS.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setSelectedExpeditionId(exp.id)}
              className={`px-4 py-2 rounded-lg font-medium tracking-wider transition-all flex items-center gap-2 ${
                selectedExpeditionId === exp.id
                  ? 'bg-primary text-on-primary font-bold shadow-md shadow-primary/20'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-bright border border-outline-variant/30'
              }`}
            >
              <span>{exp.shortName}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${exp.statusCategory === 'active' ? 'bg-emerald-400' : 'bg-outline'}`}></span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Expedition Mission HUD */}
      <div className="rounded-2xl bg-surface-container-low border border-outline-variant/30 overflow-hidden shadow-2xl">
        {/* Banner with Vessel Image & Status */}
        <div className="relative min-h-[280px] sm:min-h-[340px] bg-surface-container overflow-hidden">
          <img
            src={expedition.heroImage}
            alt={expedition.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>

          <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded bg-black/70 backdrop-blur-md text-xs font-mono text-emerald-400 border border-emerald-500/40 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{expedition.status}</span>
            </span>
            <span className="px-3 py-1 rounded bg-black/70 backdrop-blur-md text-xs font-mono text-primary border border-primary/30">
              EXP-ID: {expedition.id.toUpperCase()} // REGION: {expedition.region}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-xs font-mono text-outline block">EXPEDITION CYCLIC DEPLOYMENT // {expedition.year}</span>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-4xl font-bold text-on-surface uppercase mt-1">
              {expedition.name}
            </h2>
            {expedition.vessel && (
              <p className="text-xs sm:text-sm font-mono text-primary mt-1">
                VESSEL: {expedition.vessel} • TOTAL PERSONNEL: {expedition.totalPersonnel} SCIENTISTS & LOGISTICIANS
              </p>
            )}
          </div>
        </div>

        {/* Live Vessel Telemetry Console */}
        {expedition.currentTelemetry && (
          <div className="p-6 bg-surface-container-lowest border-b border-outline-variant/30">
            <div className="text-xs font-mono text-primary font-semibold uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>LIVE VESSEL TELEMETRY & OCEANOGRAPHIC SENSOR STREAM</span>
              <span className="text-outline font-normal">SYS: INMARSAT-C TELEMETRY LINK</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="text-[10px] text-outline block">LATITUDE</span>
                <span className="text-primary font-bold text-sm block mt-0.5">{expedition.currentTelemetry.lat}</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="text-[10px] text-outline block">LONGITUDE</span>
                <span className="text-primary font-bold text-sm block mt-0.5">{expedition.currentTelemetry.lng}</span>
              </div>
              {expedition.currentTelemetry.speed && (
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                  <span className="text-[10px] text-outline block">SPEED OVER GROUND</span>
                  <span className="text-on-surface font-bold text-sm block mt-0.5">{expedition.currentTelemetry.speed}</span>
                </div>
              )}
              {expedition.currentTelemetry.seaSurfaceTemp && (
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                  <span className="text-[10px] text-outline block">SEA SURFACE TEMP</span>
                  <span className="text-on-surface font-bold text-sm block mt-0.5">{expedition.currentTelemetry.seaSurfaceTemp}</span>
                </div>
              )}
              {expedition.currentTelemetry.swellHeight && (
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                  <span className="text-[10px] text-outline block">SWELL HEIGHT</span>
                  <span className="text-on-surface font-bold text-sm block mt-0.5">{expedition.currentTelemetry.swellHeight}</span>
                </div>
              )}
              {expedition.currentTelemetry.seaIceCover && (
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                  <span className="text-[10px] text-outline block">SEA ICE COVER</span>
                  <span className="text-primary font-bold text-sm block mt-0.5">{expedition.currentTelemetry.seaIceCover}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Voyage Route Waypoints Tracker */}
        {expedition.waypoints && expedition.waypoints.length > 0 && (
          <div className="p-6 sm:p-8 space-y-4 border-b border-outline-variant/30 bg-surface-container-low">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider">
                  VESSEL TRANSIT COORDINATES & BATHYMETRY TRACE
                </span>
                <h3 className="font-['Space_Grotesk'] text-lg font-bold text-on-surface uppercase mt-0.5">
                  Transit Progression: Mormugao to Prydz Bay
                </h3>
              </div>
              <span className="text-xs font-mono text-outline">
                ROUTE LENGTH: ~11,200 NAUTICAL MILES
              </span>
            </div>

            {/* Waypoint Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
              {expedition.waypoints.slice(0, 5).map((wp, idx) => (
                <div
                  key={wp.id}
                  className={`p-3 rounded-xl border font-mono text-xs space-y-1 ${
                    wp.status === 'CURRENT_LOC'
                      ? 'bg-primary-container/20 border-primary text-on-surface shadow-md shadow-primary/20'
                      : wp.status === 'COMPLETED'
                      ? 'bg-surface-container-lowest border-outline-variant/20 text-on-surface-variant'
                      : 'bg-surface-container-lowest/50 border-outline-variant/20 text-outline'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-primary">LEG 0{idx + 1}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] ${
                      wp.status === 'CURRENT_LOC' ? 'bg-primary text-on-primary font-bold' :
                      wp.status === 'COMPLETED' ? 'text-emerald-400' : 'text-outline'
                    }`}>
                      {wp.status}
                    </span>
                  </div>
                  <div className="font-['Space_Grotesk'] font-bold text-on-surface text-xs mt-1">
                    {wp.name}
                  </div>
                  <div className="text-[10px] text-outline">
                    {wp.lat}°, {wp.lng}° • {wp.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mission Objectives & Leadership Roster */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Scientific Objectives */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-['Space_Grotesk'] text-lg font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">science</span>
              <span>Primary Scientific & Logistical Objectives</span>
            </h3>
            <div className="space-y-2.5">
              {expedition.objectives.map((obj, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 flex items-start gap-3">
                  <span className="font-mono text-xs text-primary font-bold mt-0.5">0{idx + 1}</span>
                  <p className="text-xs sm:text-sm text-on-surface-variant font-['Inter'] leading-relaxed">
                    {obj}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Leadership Roster */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-['Space_Grotesk'] text-lg font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">groups</span>
              <span>Scientific Leadership</span>
            </h3>
            {expedition.leadershipTeam ? (
              <div className="space-y-3">
                {expedition.leadershipTeam.map((lead, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 flex items-center gap-3">
                    <img
                      src={lead.image}
                      alt={lead.name}
                      className="w-12 h-12 rounded-lg object-cover border border-outline-variant/30"
                      loading="lazy"
                    />
                    <div className="space-y-0.5">
                      <div className="text-[10px] font-mono text-primary font-semibold uppercase">{lead.role}</div>
                      <div className="font-['Space_Grotesk'] text-sm font-bold text-on-surface">{lead.name}</div>
                      <div className="text-[11px] text-outline truncate max-w-[240px]">{lead.affiliation}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-surface-container-lowest text-xs font-mono text-outline">
                Expedition Principal Investigator: <span className="text-on-surface font-semibold">{expedition.leader}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Field Dispatch Stream (From Stitch Design) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/30 pb-4">
          <div>
            <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
              FIELD COMMUNICATION CHANNEL
            </span>
            <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-on-surface uppercase mt-0.5">
              Field Dispatch Stream & Daily Observation Logs
            </h2>
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            {['ALL', 'NAVIGATION', 'SCIENCE', 'LOGISTICS', 'SEA_ICE', 'ARCTIC'].map((tag) => (
              <button
                key={tag}
                onClick={() => setDispatchFilter(tag)}
                className={`px-3 py-1 rounded transition-colors ${
                  dispatchFilter === tag
                    ? 'bg-primary text-on-primary font-bold'
                    : 'bg-surface-container-high text-outline hover:text-on-surface'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Dispatches List */}
        <div className="space-y-4">
          {filteredDispatches.map((disp) => (
            <div
              key={disp.id}
              className="p-5 sm:p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3 hover:border-primary/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs border-b border-outline-variant/20 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-primary font-semibold">{disp.timestamp}</span>
                  <span className="text-outline">|</span>
                  <span className="text-on-surface-variant">{disp.location}</span>
                </div>
                <div className="text-outline font-medium">BY: {disp.author}</div>
              </div>

              <h4 className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-on-surface">
                {disp.title}
              </h4>

              <p className="text-xs sm:text-sm text-on-surface-variant font-['Inter'] leading-relaxed">
                {disp.body}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {disp.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-container-lowest text-primary border border-outline-variant/30"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
