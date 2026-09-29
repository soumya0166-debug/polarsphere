import React, { useState } from 'react';
import InteractiveGeosphere from '../components/InteractiveGeosphere';
import { STATIONS } from '../data/stationsData';

export default function GeosphereMonitorPage({ onNavigate }) {
  const [hudActiveTab, setHudActiveTab] = useState('stations');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Top HUD Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-primary/30 text-xs font-mono text-primary">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span>POLAR GEOSPHERE MONITOR SYS.LOC: NCPOR-GLOBAL-GRID</span>
        </div>
        <h1 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-bold tracking-tight text-on-surface uppercase">
          THE POLAR WORLD, THROUGH INDIA'S EYES
        </h1>
        <p className="text-sm sm:text-base text-on-surface-variant font-['Inter'] max-w-3xl leading-relaxed">
          Integrated scientific mission-control HUD visualizing high-latitude cryospheric telemetry, Antarctic fast-ice coordinates, and Arctic fjord dynamics.
        </p>
      </div>

      {/* Interactive Geosphere Canvas Section */}
      <section className="space-y-4">
        <InteractiveGeosphere onSelectStation={(stId) => onNavigate('stations', stId)} />
      </section>

      {/* Core Operational Pillars (Directly from Stitch Design) */}
      <section className="space-y-6">
        <div className="border-b border-outline-variant/30 pb-4">
          <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
            INSTITUTIONAL FOUNDATIONS
          </span>
          <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-on-surface uppercase mt-0.5">
            Core Operational Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1: Stations & Outposts */}
          <div 
            onClick={() => onNavigate('stations')}
            className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-4 cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined !text-2xl">domain</span>
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                Stations & Outposts
              </h3>
              <p className="text-xs text-on-surface-variant font-['Inter'] leading-relaxed">
                4 permanent research bases spanning East Antarctica (Maitri, Bharati), Svalbard (Himadri), and Himachal Pradesh (Himansh).
              </p>
            </div>
            <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs font-mono text-primary">
              <span>EXPLORE BASES</span>
              <span className="material-symbols-outlined !text-sm">arrow_forward</span>
            </div>
          </div>

          {/* Pillar 2: Expeditions & Logistics */}
          <div 
            onClick={() => onNavigate('expeditions')}
            className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-4 cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined !text-2xl">directions_boat</span>
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                Expeditions & Logistics
              </h3>
              <p className="text-xs text-on-surface-variant font-['Inter'] leading-relaxed">
                44 annual scientific voyages to Antarctica, High-Arctic seasonal field campaigns, and high-altitude Himalayan glaciology traverses.
              </p>
            </div>
            <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs font-mono text-primary">
              <span>TRACK EXPEDITIONS</span>
              <span className="material-symbols-outlined !text-sm">arrow_forward</span>
            </div>
          </div>

          {/* Pillar 3: Open Data & Archives */}
          <div 
            onClick={() => onNavigate('data')}
            className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-4 cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined !text-2xl">database</span>
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                Open Data & Archives
              </h3>
              <p className="text-xs text-on-surface-variant font-['Inter'] leading-relaxed">
                National Polar Data Center (NPDC) public data archives adhering to international FAIR principles with full DOI citations.
              </p>
            </div>
            <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs font-mono text-primary">
              <span>BROWSE DATASETS</span>
              <span className="material-symbols-outlined !text-sm">arrow_forward</span>
            </div>
          </div>

          {/* Pillar 4: Join Next Polar Deployment */}
          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <span className="material-symbols-outlined !text-2xl">badge</span>
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-on-surface">
                Join Next Deployment
              </h3>
              <p className="text-xs text-on-surface-variant font-['Inter'] leading-relaxed">
                Annual call for research proposals by NCPOR for Indian scientists, researchers, and doctoral fellows seeking polar deployment.
              </p>
            </div>
            <div className="pt-3 border-t border-outline-variant/20">
              <span className="text-[11px] font-mono text-emerald-400 font-semibold block">
                ANNUAL CALL: NCPOR.RES.IN
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
