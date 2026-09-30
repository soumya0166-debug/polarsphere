import React, { useState } from 'react';
import InteractiveGeosphere from '../components/InteractiveGeosphere';
import { STATIONS } from '../data/stationsData';
import { ACTIVE_EXPEDITIONS } from '../data/expeditionsData';

export default function HomePage({ onNavigate, onOpenGuide }) {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState(null);

  const jurisdictions = [
    {
      id: 'antarctica',
      title: 'Antarctica',
      subtitle: 'Continental Ice Sheet & Sub-Zero Laboratories',
      coordinates: '70°45′S // 14,000,000 km²',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIQbyAtfkRwZ0XXjq7J504XuBP8NZq5WxZcBITRi08QvekeDmUbqPj_Goyet2XtnGSwyp67ZP9fBzB4oRUbut1XxR3onmdBA_ydrZFHp8RPFEls7wmSSDrtBgar0-K_VvHS4oGQLbuMWTf6c6RXSJ5vrqXIG0-biqIdqheCPkjzl_Ro3qqX5zCQCHTurFW86pnQhT21XYZfasqbUafLMb7_Py9gNeI6GVZVCobXTYgaPe3c9m5DysOyQ',
      description: "India's permanent scientific presence in East Antarctica spans the Larsemann Hills and Schirmacher Oasis. Hosting Bharati and Maitri stations for deep ice core drilling, magnetospheric dynamics, and microbial ecology.",
      metrics: [
        { label: 'Stations', value: '02 Permanent' },
        { label: 'Personnel', value: '48 Wintering' },
        { label: 'Temp Range', value: '-89°C to -12°C' },
      ],
      badge: 'JURISDICTION 01',
      stationId: 'bharati',
    },
    {
      id: 'arctic',
      title: 'Arctic Realm',
      subtitle: 'Svalbard High-Latitude Marine Laboratory',
      coordinates: '78°55′N // Kongsfjorden Fjord',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK_sPFPQXSGhwpXdoceluCk2wRpC50uUvDDHDvLI5P0tNkimifL-POjqBkwT4Gs4LLcW2UlGmazOrtEprL1yfKNAb07lxXb4XFuGG_tzXlMyf3lx1vnHhYsHBHEnoDxp6fnNgMPN3A3deCbKzN4-IYjX70tbRX25L6kjjRXY2Cw2vOF9ctQ3DYz7xMj6fu4tRFTBFh138SoexMNvfry68eybqgLDQ0hp4yUFUnzpbtBZSpGhqZHNm6tA',
      description: "At Ny-Ålesund, Svalbard, Himadri base enables continuous atmospheric physics, glacial runoff biogeochemistry, and teleconnection research linking Arctic amplification to Indian Summer Monsoon anomalies.",
      metrics: [
        { label: 'Stations', value: '01 International' },
        { label: 'Fjord Mooring', value: 'IndARC Array' },
        { label: 'Aerosol Obs', value: '24/7 Continuous' },
      ],
      badge: 'JURISDICTION 02',
      stationId: 'himadri',
    },
    {
      id: 'southern-ocean',
      title: 'Southern Ocean',
      subtitle: 'Hydrodynamic Vessel Transects & Carbon Sink',
      coordinates: '40°S – 70°S // Polar Convergence',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa_ejpjPbo9oQR_pqtwTkmbBKgMsP4LiP91D_rMvSB_KvoSr7lIUqoMDEWdWjMVkqMSZJpICPNcH3nivO_dO9I38oaWZY_2LfybfFaRLC46AAOLfQJXWjoIOoU9tE9DzF_s_G4yl8vrdSfsGagjOAVAcMglvP82n1mEIovblh1ZpdY4Dad-4QesHjGm9vgCioBMhs7tTTU7Pmiz7xZQXMWdzASexorMEcF5WNT9r57pHdSUva5ylXC1Q',
      description: "Traversing the Roaring Forties, Furious Fifties, and Screaming Sixties. ORV Sagar Nidhi and chartered icebreakers map the circumpolar current, Southern Ocean carbon sequestration, and Antarctic fast ice.",
      metrics: [
        { label: 'Vessels', value: '02 Underway' },
        { label: 'CTD Stations', value: '22 Planned' },
        { label: 'Depth Sounding', value: '4,800m Max' },
      ],
      badge: 'JURISDICTION 03',
      stationId: null,
    },
    {
      id: 'himalaya',
      title: 'Himalayan Third Pole',
      subtitle: 'High-Altitude Cryosphere & Water Security',
      coordinates: '32°24′N // 4,080m Elevation',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzmH0EIu7w7OXYducsygwPpO_NevFVY0-X9gPpUcyTou-PQt968TT8AnQxXUmpf03GHFYnXQ6XO-MKiVOFZHIwgPvFRUo5BVS1PoUkBJA2UnfjrF6Qom0fkZBNHnzscgYUUZ29eeHouWme-1HRes4Z-jE-p9XNKwwnqABHIdc7wLzm1hGuTTUOZuzvV45uUACef-tW_ayXUZ2X-ngpAXEYAhFCH1YTn00dpWBG9NOme-d_TejFp7E7Ww',
      description: "Himansh station in the Chandra Basin of Himachal Pradesh monitors glacial mass balance for Chhota Shigri, Samudra Tapu, and Batal glaciers—quantifying seasonal melt dynamics that sustain downstream river basins.",
      metrics: [
        { label: 'Station', value: 'Himansh Outpost' },
        { label: 'Altitude', value: '4,080m AMSL' },
        { label: 'Glaciers', value: '6 Instrumented' },
      ],
      badge: 'JURISDICTION 04',
      stationId: 'himansh',
    },
  ];

  const expeditionLog = [
    {
      id: 'isea-44',
      name: '44th Indian Scientific Expedition to Antarctica (ISEA-44)',
      vessel: 'MV Vasily Golovnin',
      region: 'Antarctica (Larsemann & Schirmacher)',
      leader: 'Dr. Shailendra Verma (NCPOR)',
      status: 'TRANSIT PHASE II',
      statusColor: 'text-primary',
      badgeColor: 'bg-primary/10 border-primary/30',
      active: true,
      coordinates: '63°28′S, 58°42′E',
      days: '74 hrs to ETA',
    },
    {
      id: 'arc-2025-w',
      name: 'Arctic Winter Campaign 2024-2025',
      vessel: 'Himadri Polar Base (Ny-Ålesund)',
      region: 'Arctic Svalbard (78°55′N)',
      leader: 'Dr. Kavitha Raman (INCOIS / NCPOR)',
      status: 'SAMPLING LIVE',
      statusColor: 'text-emerald-400',
      badgeColor: 'bg-emerald-500/10 border-emerald-500/30',
      active: true,
      coordinates: '78°55′N, 11°56′E',
      days: 'Continuous Winter',
    },
    {
      id: 'so-cruise-14',
      name: 'Southern Ocean Hydrographic & Paleoclimate Cruise 14',
      vessel: 'ORV Sagar Nidhi',
      region: 'Southern Ocean (Polar Front)',
      leader: 'Dr. A. Sengupta (NIO / MoES)',
      status: 'UNDERWAY (STN 14/22)',
      statusColor: 'text-secondary',
      badgeColor: 'bg-secondary/10 border-secondary/30',
      active: true,
      coordinates: '54°12′S, 42°18′E',
      days: 'Day 26 of 45',
    },
    {
      id: 'him-traverse-ix',
      name: 'Himalayan Cryosphere Traverse IX',
      vessel: 'Himansh Observatory Camp',
      region: 'Western Himalaya (Spiti Valley)',
      leader: 'Er. Ankit Srivastava (NCPOR)',
      status: 'RADAR ACTIVE',
      statusColor: 'text-tertiary-fixed',
      badgeColor: 'bg-tertiary/10 border-tertiary/30',
      active: true,
      coordinates: '32°24′N, 77°37′E',
      days: '4,890m Altitude',
    },
    {
      id: 'isea-43',
      name: '43rd Indian Scientific Expedition to Antarctica (ISEA-43)',
      vessel: 'MV Vasily Golovnin / Air Link',
      region: 'Antarctica (Maitri & Bharati)',
      leader: 'Dr. R. K. Singh (NCPOR)',
      status: 'COMPLETED & ARCHIVED',
      statusColor: 'text-on-surface-variant',
      badgeColor: 'bg-surface-container-high border-outline-variant/30',
      active: false,
      coordinates: '69°24′S, 76°11′E',
      days: '14,800 nm Logged',
    },
  ];

  return (
    <div className="w-full bg-surface text-on-surface">
      {/* ==============================================================
          SECTION 1: MONUMENTAL CINEMATIC HERO
          ============================================================== */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-12 bg-surface-container-lowest">
        {/* Background Atmospheric Canvas with Polar Sea-Ice Texture */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-70 scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3asl-gPcTW4ZwmI3BNQUWQw5sMLiEIYS3atd3am-xY_Xv-RXXLfCVz5CJTwdsQQBzEAF7oqQGHmm2Rrm0Jl1_kZ-Ug_0yXF5Sk_IkVP-Zfxj07u9KE3KUaQSaWtGfHW5b9Tdy573wneul7cFLOIDn2ao_vRY9Eh9Ab-HAyrm0JFQ5y4etwFbcgRIOpbMlBMvdL0_nzvML7DCqpLmT5NHfcK8GydTFr2oA9AtpJrL3gSVfvLZ7YDoi6w')"
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-surface via-surface/75 to-surface-container-lowest/80 mix-blend-multiply" />
        <div className="absolute inset-0 z-0 bg-radial-at-c from-transparent via-surface/40 to-surface" />
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, #35c8e8 1px, transparent 1px), linear-gradient(to bottom, #35c8e8 1px, transparent 1px)', 
            backgroundSize: '80px 80px' 
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between flex-grow">
          {/* Top Identifier Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high/80 border border-primary/30 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-['Space_Grotesk'] text-[11px] font-semibold tracking-widest text-primary uppercase">
                NATIONAL POLAR INITIATIVE // NCPOR • MOES • GOI
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-on-surface-variant bg-surface-container-lowest/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-outline-variant/30">
              <span>ANTARCTIC MERIDIAN: <strong className="text-tertiary">70°45′S</strong></span>
              <span className="text-outline-variant">|</span>
              <span>ARCTIC LATITUDE: <strong className="text-tertiary">78°55′N</strong></span>
              <span className="text-outline-variant">|</span>
              <span className="text-primary font-semibold">SYNAPSE NOMINAL</span>
            </div>
          </div>

          {/* Monumental Headline Block & Radar Graphic */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-12">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-primary">
                <span className="material-symbols-outlined !text-base">explore</span>
                <span className="tracking-widest uppercase">SOVEREIGN CRYOSPHERIC RESEARCH & OBSERVATION</span>
              </div>

              <h1 className="font-['Space_Grotesk'] text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-on-surface uppercase leading-[1.05] drop-shadow-2xl">
                The Polar World,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-fixed to-secondary">
                  Through India’s Eyes.
                </span>
              </h1>

              <p className="font-['Inter'] text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                India’s sovereign scientific deployment across Antarctica, the high Arctic, the Southern Ocean, and the Himalayan Third Pole through continuous cryogenic telemetry, autonomous observatories, and frontier deep-ice paleoclimate discoveries.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('stations')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-primary-container text-on-primary-container font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_24px_rgba(53,200,232,0.4)]"
                >
                  <span>EXPLORE STATIONS</span>
                  <span className="material-symbols-outlined !text-base">arrow_forward</span>
                </button>

                <button
                  onClick={() => onNavigate('explore')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-surface-container-high/80 hover:bg-surface-container-highest text-tertiary-fixed font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider border border-outline-variant/30 backdrop-blur-md transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined !text-base text-primary">sensors</span>
                  <span>LIVE MISSION CONTROL</span>
                </button>

                <button
                  onClick={() => onNavigate('expeditions')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md bg-surface-container-low hover:bg-surface-container text-on-surface font-['Space_Grotesk'] text-xs font-medium uppercase tracking-wider border border-outline-variant/20 transition-all"
                >
                  <span className="material-symbols-outlined !text-base text-secondary">directions_boat</span>
                  <span>EXPEDITION DATA LOGISTICS</span>
                </button>
              </div>
            </div>

            {/* Right Orbital Radar Projection Graphic */}
            <div className="lg:col-span-4 hidden lg:flex items-center justify-center relative">
              <div className="w-80 h-80 rounded-full border border-primary/20 p-4 relative flex items-center justify-center">
                {/* Concentric rotating radar rings */}
                <div className="absolute inset-0 rounded-full border border-primary/10 animate-spin [animation-duration:40s]" />
                <div className="absolute inset-4 rounded-full border border-primary/30 border-dashed animate-spin [animation-duration:25s] [animation-direction:reverse]" />
                <div className="absolute inset-12 rounded-full border border-tertiary/20" />
                <div className="w-40 h-40 rounded-full bg-primary/5 flex items-center justify-center relative">
                  <div className="w-3 h-3 rounded-full bg-primary animate-ping" />
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_#35c8e8]" />
                </div>
                {/* Radar sweeping line */}
                <div className="absolute inset-0 rounded-full animate-spin [animation-duration:6s] pointer-events-none">
                  <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent to-primary absolute top-1/2 left-1/2 origin-left" />
                </div>
                {/* Lat/Long tags */}
                <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-primary/70">78°55′N HIMADRI</span>
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-primary/70">70°45′S MAITRI</span>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[9px] font-mono text-tertiary/70">69°24′S BHARATI</span>
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[9px] font-mono text-secondary/70">32°24′N HIMANSH</span>
              </div>
            </div>
          </div>

          {/* 4 Domains Quick-Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-8 pb-2 border-t border-outline-variant/20">
            <div 
              onClick={() => onNavigate('stations', 'maitri')}
              className="p-3 sm:p-4 rounded-lg bg-surface-container-high/60 backdrop-blur-md flex flex-col gap-1 transition-all hover:-translate-y-1 cursor-pointer border border-outline-variant/20 hover:border-primary/40 group"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-primary font-semibold group-hover:text-primary-fixed">ANTARCTICA</span>
                <span className="text-tertiary-fixed-dim">70°45′S</span>
              </div>
              <span className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-on-surface">Maitri & Bharati</span>
              <span className="text-xs font-mono text-on-surface-variant">Continuous year-round base</span>
            </div>

            <div 
              onClick={() => onNavigate('stations', 'himadri')}
              className="p-3 sm:p-4 rounded-lg bg-surface-container-high/60 backdrop-blur-md flex flex-col gap-1 transition-all hover:-translate-y-1 cursor-pointer border border-outline-variant/20 hover:border-primary/40 group"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-primary font-semibold group-hover:text-primary-fixed">ARCTIC</span>
                <span className="text-tertiary-fixed-dim">78°55′N</span>
              </div>
              <span className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-on-surface">Himadri</span>
              <span className="text-xs font-mono text-on-surface-variant">Svalbard Fjord Lab</span>
            </div>

            <div 
              onClick={() => onNavigate('expeditions')}
              className="p-3 sm:p-4 rounded-lg bg-surface-container-high/60 backdrop-blur-md flex flex-col gap-1 transition-all hover:-translate-y-1 cursor-pointer border border-outline-variant/20 hover:border-primary/40 group"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-primary font-semibold group-hover:text-primary-fixed">SOUTHERN OCEAN</span>
                <span className="text-tertiary-fixed-dim">TRANSIT</span>
              </div>
              <span className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-on-surface">ORV Sagar Nidhi</span>
              <span className="text-xs font-mono text-on-surface-variant">Deep-sea hydrodynamic vessel</span>
            </div>

            <div 
              onClick={() => onNavigate('stations', 'himansh')}
              className="p-3 sm:p-4 rounded-lg bg-surface-container-high/60 backdrop-blur-md flex flex-col gap-1 transition-all hover:-translate-y-1 cursor-pointer border border-outline-variant/20 hover:border-primary/40 group"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-primary font-semibold group-hover:text-primary-fixed">HIMALAYA</span>
                <span className="text-tertiary-fixed-dim">4,000m+</span>
              </div>
              <span className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-on-surface">Himansh</span>
              <span className="text-xs font-mono text-on-surface-variant">Spiti Cryospheric Outpost</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 2: THE FOUR CRYOSPHERIC JURISDICTIONS (Stitch Artboard 1)
          ============================================================== */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-16 bg-surface">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/20 pb-4">
            <div>
              <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold block mb-1">
                SOVEREIGN TERRITORIAL MANDATE // POLAR DIVISIONS
              </span>
              <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-on-surface uppercase tracking-tight">
                The Four Cryospheric Jurisdictions
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant font-['Inter'] max-w-md">
              Sustained multi-decadal scientific observation across the Southern Pole, Northern Pole, Circumpolar Ocean, and the Third Pole headwaters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jurisdictions.map((j) => (
              <div
                key={j.id}
                onClick={() => j.stationId ? onNavigate('stations', j.stationId) : onNavigate('expeditions')}
                className="group rounded-xl bg-surface-container-low border border-outline-variant/30 overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col justify-between shadow-xl cursor-pointer hover:-translate-y-1"
              >
                <div className="relative h-52 w-full overflow-hidden bg-surface-container">
                  <img
                    src={j.image}
                    alt={j.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-[10px] font-mono text-primary uppercase font-medium">
                    {j.badge}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-mono text-tertiary-fixed block">{j.coordinates}</span>
                    <h3 className="font-['Space_Grotesk'] text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                      {j.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-on-surface-variant font-['Inter'] leading-relaxed line-clamp-3">
                    {j.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-outline-variant/20 font-mono text-[10px]">
                    {j.metrics.map((m, idx) => (
                      <div key={idx} className="bg-surface-container p-1.5 rounded text-center">
                        <span className="text-on-surface-variant block text-[9px] uppercase">{m.label}</span>
                        <span className="text-on-surface font-semibold truncate block mt-0.5">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-['Space_Grotesk'] font-bold text-primary pt-1">
                    <span>EXPLORE DOMAIN</span>
                    <span className="material-symbols-outlined !text-sm group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 3: SOVEREIGN OPERATIONAL BASES (Artboard 1)
          ============================================================== */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-16 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/20 pb-4">
            <div>
              <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold block mb-1">
                PERMANENT HIGH-LATITUDE BASES
              </span>
              <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-on-surface uppercase tracking-tight">
                Sovereign Operational Bases
              </h2>
            </div>
            <button
              onClick={() => onNavigate('stations')}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:underline font-semibold"
            >
              <span>VIEW DETAILED TELEMETRY HUD</span>
              <span className="material-symbols-outlined !text-sm">open_in_new</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATIONS.map((stn) => (
              <div
                key={stn.id}
                onClick={() => onNavigate('stations', stn.id)}
                className="group rounded-xl bg-surface-container-low border border-outline-variant/30 overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col justify-between shadow-xl cursor-pointer hover:-translate-y-1"
              >
                <div className="relative h-48 w-full overflow-hidden bg-surface-container">
                  <img
                    src={stn.image}
                    alt={stn.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/20 to-transparent" />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-surface-container-lowest/80 text-[10px] font-mono text-primary font-semibold">
                      {stn.code}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-semibold">
                      {stn.statusBadge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-outline block">EST. {stn.establishedYear}</span>
                      <h3 className="font-['Space_Grotesk'] text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                        {stn.name}
                      </h3>
                    </div>
                    <span className="text-xl font-bold font-mono text-primary">
                      {stn.liveWeather.temp}°C
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-on-surface-variant font-['Inter'] leading-relaxed line-clamp-3">
                    {stn.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-outline-variant/20 font-mono text-[10px]">
                    <div className="bg-surface-container p-2 rounded">
                      <span className="text-on-surface-variant block">COORDINATES</span>
                      <span className="text-on-surface font-semibold truncate block mt-0.5">{stn.coordinates}</span>
                    </div>
                    <div className="bg-surface-container p-2 rounded">
                      <span className="text-on-surface-variant block">ELEVATION</span>
                      <span className="text-on-surface font-semibold truncate block mt-0.5">{stn.altitude}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-primary pt-1">
                    <span>INSPECT STATION HUD</span>
                    <span className="material-symbols-outlined !text-sm">arrow_forward</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 4: CURATED POLAR EXPEDITION LOG (Artboard 1)
          ============================================================== */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-16 bg-surface">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/20 pb-4">
            <div>
              <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold block mb-1">
                FIELD CAMPAIGN ARCHIVE & REAL-TIME MISSIONS
              </span>
              <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-on-surface uppercase tracking-tight">
                Curated Polar Expedition Log
              </h2>
            </div>
            <button
              onClick={() => onNavigate('expeditions')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-surface-container-high hover:bg-surface-bright text-xs font-mono text-primary border border-outline-variant/30"
            >
              <span>MISSION CONTROL (ISEA-44)</span>
              <span className="material-symbols-outlined !text-sm">directions_boat</span>
            </button>
          </div>

          <div className="rounded-xl bg-surface-container-low border border-outline-variant/30 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="bg-surface-container text-on-surface-variant uppercase tracking-wider text-[11px] border-b border-outline-variant/30">
                    <th className="py-3.5 px-4 font-semibold">Expedition</th>
                    <th className="py-3.5 px-4 font-semibold">Operational Vessel / Base</th>
                    <th className="py-3.5 px-4 font-semibold">Sector / Coordinates</th>
                    <th className="py-3.5 px-4 font-semibold">Expedition Lead</th>
                    <th className="py-3.5 px-4 font-semibold">Mission Status</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Telemetry</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {expeditionLog.map((exp) => (
                    <tr 
                      key={exp.id}
                      onClick={() => onNavigate('expeditions')}
                      className="hover:bg-surface-container-high/60 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-4 font-['Space_Grotesk'] font-bold text-on-surface group-hover:text-primary transition-colors">
                        <div className="flex items-center gap-2">
                          {exp.active && (
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
                          )}
                          <span>{exp.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-tertiary">
                        {exp.vessel}
                      </td>
                      <td className="py-4 px-4 text-on-surface-variant">
                        <span>{exp.region}</span>
                        <span className="block text-[10px] text-outline">{exp.coordinates}</span>
                      </td>
                      <td className="py-4 px-4 text-on-surface">
                        {exp.leader}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-semibold border ${exp.badgeColor} ${exp.statusColor}`}>
                          {exp.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right text-on-surface-variant font-mono text-[11px]">
                        {exp.days}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-surface-container flex flex-wrap items-center justify-between text-xs font-mono text-on-surface-variant border-t border-outline-variant/20">
              <span>SHOWING 5 OF 44 ANNUAL EXPEDITIONS RECORDED (1981–2025)</span>
              <button 
                onClick={() => onNavigate('expeditions')}
                className="text-primary hover:underline font-semibold"
              >
                OPEN COMPLETE HISTORICAL ARCHIVE →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 5: RESEARCH ARTIFACT TO SCIENTIFIC OUTCOME (Artboard 1)
          ============================================================== */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-16 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/20 pb-4">
            <div>
              <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold block mb-1">
                NATIONAL IMPACT & VALUE CHAIN
              </span>
              <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-on-surface uppercase tracking-tight">
                Research Artifact to Scientific Outcome
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant font-['Inter'] max-w-md">
              Translating harsh-environment field campaigns into open datasets, breakthrough papers, and indigenous patents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Outcome 1: Open Science Datasets */}
            <div 
              onClick={() => onNavigate('data')}
              className="p-6 rounded-xl bg-surface-container-low border border-outline-variant/30 hover:border-primary/50 transition-all shadow-xl space-y-4 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined !text-2xl">database</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold font-['Space_Grotesk'] text-on-surface">14,289</span>
                  <span className="text-xs font-mono text-primary font-semibold">FAIR 4.2 COMPLIANT</span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                  Open Science Datasets
                </h3>
                <p className="text-xs text-on-surface-variant font-['Inter'] leading-relaxed">
                  Continuous GNSS, ice core isotopes, CTD profiles, and meteorological series accessible via open REST API v2.4 and DOI indexed NetCDF formats.
                </p>
              </div>
              <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs font-mono text-primary">
                <span>QUERY REPOSITORY</span>
                <span className="material-symbols-outlined !text-sm">arrow_forward</span>
              </div>
            </div>

            {/* Outcome 2: Peer-Reviewed Publications */}
            <div 
              onClick={() => onNavigate('data')}
              className="p-6 rounded-xl bg-surface-container-low border border-outline-variant/30 hover:border-secondary/50 transition-all shadow-xl space-y-4 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined !text-2xl">article</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold font-['Space_Grotesk'] text-on-surface">850+</span>
                  <span className="text-xs font-mono text-secondary font-semibold">PEER-REVIEWED</span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-lg font-bold text-on-surface group-hover:text-secondary transition-colors">
                  High-Impact Publications
                </h3>
                <p className="text-xs text-on-surface-variant font-['Inter'] leading-relaxed">
                  Groundbreaking discoveries published in Nature Geoscience, Journal of Glaciology, and JGR detailing Pleistocene ice cores and teleconnections.
                </p>
              </div>
              <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs font-mono text-secondary">
                <span>VIEW CITATIONS</span>
                <span className="material-symbols-outlined !text-sm">arrow_forward</span>
              </div>
            </div>

            {/* Outcome 3: Indigenous Patents & Polar Tech */}
            <div 
              onClick={() => onNavigate('stations')}
              className="p-6 rounded-xl bg-surface-container-low border border-outline-variant/30 hover:border-tertiary/50 transition-all shadow-xl space-y-4 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-lg bg-tertiary/10 border border-tertiary/30 flex items-center justify-center text-tertiary group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined !text-2xl">precision_manufacturing</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold font-['Space_Grotesk'] text-on-surface">32</span>
                  <span className="text-xs font-mono text-tertiary font-semibold">PATENTS & TECH</span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-lg font-bold text-on-surface group-hover:text-tertiary transition-colors">
                  Polar Engineering & Patents
                </h3>
                <p className="text-xs text-on-surface-variant font-['Inter'] leading-relaxed">
                  Cold-climate thermal architecture, hot-water deep ice drilling rigs, sub-surface GPR arrays, and extremophile biotechnological enzymes.
                </p>
              </div>
              <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs font-mono text-tertiary">
                <span>TECHNOLOGY TRANSFER</span>
                <span className="material-symbols-outlined !text-sm">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 6: INTERACTIVE POLAR GEOSPHERE 3D COMPONENT
          ============================================================== */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-16 bg-surface">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/20 pb-4">
            <div>
              <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold block mb-1">
                3D PLANETARY VISUALIZER
              </span>
              <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-on-surface uppercase tracking-tight">
                Interactive Polar Geosphere
              </h2>
            </div>
            <button
              onClick={() => onNavigate('explore')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-primary-container text-on-primary-container text-xs font-mono font-bold"
            >
              <span>OPEN FULL-SCREEN HUD</span>
              <span className="material-symbols-outlined !text-sm">fullscreen</span>
            </button>
          </div>

          <InteractiveGeosphere onSelectStation={(stId) => onNavigate('stations', stId)} />
        </div>
      </section>
    </div>
  );
}
