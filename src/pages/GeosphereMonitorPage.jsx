import React, { useState } from 'react';

export default function GeosphereMonitorPage({ onNavigate }) {
  const [viewportMode, setViewportMode] = useState('orthographic'); // 'orthographic', 'orbital', 'ionosphere', 'radar'
  const [targetLock, setTargetLock] = useState('bharati'); // 'bharati', 'maitri', 'himadri', 'himansh'

  return (
    <div className="w-full bg-surface text-on-surface py-8 px-4 sm:px-6 lg:px-12 space-y-12">
      {/* ==============================================================
          TACTICAL HUD HEADER & JARVIS SYSTEM DIAGNOSTICS RIBBON
          ============================================================== */}
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-primary/20 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-3 bg-primary animate-pulse inline-block" />
                <span className="w-1 h-2 bg-primary/60 inline-block" />
              </div>
              <span className="font-['Space_Grotesk'] text-[11px] font-bold text-primary uppercase tracking-widest">
                TACTICAL HUD // HEURISTIC POLAR PROTOCOL • J.A.R.V.I.S. MK-VI ENGINE
              </span>
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/30 text-[10px] font-mono tracking-wider uppercase">
                SYNAPSE 99.8% NOMINAL
              </span>
            </div>

            <h1 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-bold text-on-surface uppercase tracking-tight flex items-center gap-3">
              POLAR GEOSPHERE MONITOR
              <span className="text-xs font-mono font-normal text-tertiary-fixed-dim hidden sm:inline-block px-2.5 py-1 rounded bg-surface-container-high/60 border border-outline-variant/40">
                SYS.LOC: NCPOR-GLOBAL-GRID
              </span>
            </h1>
          </div>

          {/* Oscillating Audio/Synapse Bars & Status */}
          <div className="flex items-center gap-4 text-xs font-mono text-on-surface-variant">
            <div className="flex items-end gap-1 h-6 px-2 py-1 bg-surface-container-lowest/80 rounded border border-primary/25">
              <span className="w-1 bg-primary rounded-xs h-3 animate-pulse" />
              <span className="w-1 bg-primary-fixed-dim rounded-xs h-5 animate-pulse [animation-delay:0.2s]" />
              <span className="w-1 bg-secondary rounded-xs h-2 animate-pulse [animation-delay:0.4s]" />
              <span className="w-1 bg-primary rounded-xs h-6 animate-pulse [animation-delay:0.1s]" />
              <span className="w-1 bg-tertiary-fixed rounded-xs h-4 animate-pulse [animation-delay:0.3s]" />
              <span className="w-1 bg-primary rounded-xs h-2 animate-pulse [animation-delay:0.5s]" />
            </div>

            <div className="flex flex-col text-right">
              <span className="inline-flex items-center justify-end gap-1.5 text-primary font-semibold">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                CARRIER FREQ: 8.42 GHz
              </span>
              <span className="text-[11px] text-tertiary-fixed-dim">ORBITAL SYNC // 41ms LATENCY</span>
            </div>
          </div>
        </div>

        {/* Viewport Mode Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-on-surface-variant uppercase mr-1">VIEWPORT:</span>
            
            <button
              onClick={() => setViewportMode('orthographic')}
              className={`px-3 py-1.5 rounded font-semibold flex items-center gap-1.5 border transition-all ${
                viewportMode === 'orthographic'
                  ? 'bg-primary-container text-on-primary-container shadow-[0_0_12px_rgba(53,200,232,0.4)] border-primary'
                  : 'bg-surface-container-high/70 hover:bg-surface-container-highest text-on-surface-variant border-outline-variant/30'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest" />
              ORTHOGRAPHIC POLAR
            </button>

            <button
              onClick={() => setViewportMode('orbital')}
              className={`px-3 py-1.5 rounded flex items-center gap-1.5 border transition-all ${
                viewportMode === 'orbital'
                  ? 'bg-primary-container text-on-primary-container shadow-[0_0_12px_rgba(53,200,232,0.4)] border-primary font-semibold'
                  : 'bg-surface-container-high/70 hover:bg-surface-container-highest text-on-surface-variant border-outline-variant/30'
              }`}
            >
              <span className="material-symbols-outlined !text-sm">satellite_alt</span>
              ORBITAL VECTOR
            </button>

            <button
              onClick={() => setViewportMode('ionosphere')}
              className={`px-3 py-1.5 rounded flex items-center gap-1.5 border transition-all ${
                viewportMode === 'ionosphere'
                  ? 'bg-primary-container text-on-primary-container shadow-[0_0_12px_rgba(53,200,232,0.4)] border-primary font-semibold'
                  : 'bg-surface-container-high/70 hover:bg-surface-container-highest text-on-surface-variant border-outline-variant/30'
              }`}
            >
              <span className="material-symbols-outlined !text-sm">storm</span>
              IONOSPHERE / AURORA
            </button>

            <button
              onClick={() => setViewportMode('radar')}
              className={`px-3 py-1.5 rounded flex items-center gap-1.5 border transition-all ${
                viewportMode === 'radar'
                  ? 'bg-primary-container text-on-primary-container shadow-[0_0_12px_rgba(53,200,232,0.4)] border-primary font-semibold'
                  : 'bg-surface-container-high/70 hover:bg-surface-container-highest text-on-surface-variant border-outline-variant/30'
              }`}
            >
              <span className="material-symbols-outlined !text-sm">radar</span>
              DEEP ICE RADAR
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3 text-tertiary-fixed">
            <span className="text-primary font-semibold">[TARGET LOCK: 4/4 NODES ONLINE]</span>
            <span className="text-outline">SEC-POLAR-ALPHA</span>
          </div>
        </div>
      </div>

      {/* ==============================================================
          MAIN HOLOGRAPHIC GLOBE & TACTICAL PANELS (Stitch Artboard 3)
          ============================================================== */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Holographic Polar Sphere (8 Cols) */}
        <div className="lg:col-span-8 bg-surface-container-lowest/90 rounded-xl p-4 sm:p-6 lg:p-8 relative flex flex-col justify-between overflow-hidden min-h-[520px] border border-primary/30 shadow-[0_0_35px_rgba(53,200,232,0.12)]">
          {/* Tactical Corner Tech Brackets (J.A.R.V.I.S. Crosshairs) */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary/70 pointer-events-none" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary/70 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-primary/70 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-primary/70 pointer-events-none" />
          <span className="absolute top-2.5 left-12 text-[9px] font-mono text-primary/60 tracking-widest pointer-events-none">
            TGT-LOCK // HUD-01
          </span>
          <span className="absolute bottom-2.5 right-12 text-[9px] font-mono text-primary/60 tracking-widest pointer-events-none">
            POLAR-COORD-MATRIX [SEC-GRID]
          </span>

          {/* Top HUD Telemetry Ribbon */}
          <div className="flex items-center justify-between z-10 flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 bg-surface-container-high/80 px-3 py-1 rounded border border-primary/30 backdrop-blur-md">
              <span className="material-symbols-outlined !text-base text-primary animate-spin [animation-duration:16s]">
                public
              </span>
              <span className="font-mono text-xs text-on-surface font-semibold tracking-wide">
                CRYOSPHERE SYNC: ACTIVE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            </div>

            <div className="flex items-center gap-1.5 font-mono text-xs text-tertiary">
              <span className="px-2 py-0.5 rounded bg-surface-container-highest border border-outline-variant/30 text-primary font-semibold">
                POLAR-SAT-04 [LEO]
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container-highest border border-outline-variant/30">
                CARTOSAT-2B
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container-highest border border-outline-variant/30 text-tertiary-fixed-dim">
                ORBIT #18,491
              </span>
            </div>
          </div>

          {/* Holographic SVG Geosphere with Concentric Rings, Radar Sweep, Station Callouts & Oceanographic Waves */}
          <div className="relative w-full flex-grow flex items-center justify-center my-4 z-10 py-2 select-none">
            <svg className="w-full max-w-2xl h-auto text-primary" fill="none" viewBox="0 0 680 400">
              <defs>
                <radialGradient cx="50%" cy="50%" id="jarvisCoreGlow" r="50%">
                  <stop offset="0%" stopColor="#35c8e8" stopOpacity="0.32" />
                  <stop offset="35%" stopColor="#35c8e8" stopOpacity="0.12" />
                  <stop offset="70%" stopColor="#74e2ff" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#09141f" stopOpacity="0" />
                </radialGradient>
                <radialGradient cx="50%" cy="50%" id="radarSweepGradient" r="50%">
                  <stop offset="0%" stopColor="#74e2ff" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="#35c8e8" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#35c8e8" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="orbitGrad1" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#35c8e8" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#74e2ff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#96ccff" stopOpacity="0.2" />
                </linearGradient>
                {/* Stratification Wave Gradients (Cyan & Mint Dual Curves) */}
                <linearGradient id="waveStratCyan" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#35c8e8" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#74e2ff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#35c8e8" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="waveStratMint" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#4bd7f7" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#b0dbe5" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#96ccff" stopOpacity="0.2" />
                </linearGradient>
                <filter height="160%" id="hudGlow" width="160%" x="-30%" y="-30%">
                  <feGaussianBlur result="blur" stdDeviation="3" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Ambient Center Glow */}
              <circle cx="340" cy="200" fill="url(#jarvisCoreGlow)" r="160" />

              {/* ROTATING RETICLE DIALS */}
              <g className="animate-spin [animation-duration:42s] origin-[340px_200px]">
                <circle cx="340" cy="200" r="185" stroke="#35c8e8" strokeDasharray="2 12" strokeOpacity="0.2" strokeWidth="1" />
                <circle cx="340" cy="200" r="176" stroke="#74e2ff" strokeDasharray="14 32 4 8" strokeOpacity="0.3" strokeWidth="1.5" />
                <text fill="#74e2ff" fillOpacity="0.6" fontFamily="JetBrains Mono" fontSize="7" textAnchor="middle" x="340" y="22">000° [N-AZIMUTH]</text>
                <text fill="#74e2ff" fillOpacity="0.6" fontFamily="JetBrains Mono" fontSize="7" textAnchor="start" x="532" y="203">090° [E]</text>
                <text fill="#74e2ff" fillOpacity="0.6" fontFamily="JetBrains Mono" fontSize="7" textAnchor="middle" x="340" y="388">180° [S-POLAR]</text>
                <text fill="#74e2ff" fillOpacity="0.6" fontFamily="JetBrains Mono" fontSize="7" textAnchor="end" x="145" y="203">270° [W]</text>
              </g>

              {/* Counter-Clockwise Dial */}
              <g className="animate-spin [animation-duration:34s] [animation-direction:reverse] origin-[340px_200px]">
                <circle cx="340" cy="200" r="150" stroke="#96ccff" strokeDasharray="40 18 10 18" strokeOpacity="0.3" strokeWidth="1.5" />
                <circle cx="340" cy="200" r="138" stroke="#35c8e8" strokeDasharray="1 6" strokeOpacity="0.2" strokeWidth="1" />
                <path d="M 190 200 A 150 150 0 0 1 340 50" fill="none" stroke="#74e2ff" strokeOpacity="0.55" strokeWidth="2.5" />
                <path d="M 490 200 A 150 150 0 0 1 340 350" fill="none" stroke="#74e2ff" strokeOpacity="0.55" strokeWidth="2.5" />
              </g>

              {/* Radar Sweep Conical Scan */}
              <g className="animate-spin [animation-duration:6s] origin-[340px_200px]">
                <path d="M 340 200 L 485 120 A 165 165 0 0 0 450 70 Z" fill="url(#radarSweepGradient)" opacity="0.65" />
                <line filter="url(#hudGlow)" stroke="#74e2ff" strokeWidth="1.8" x1="340" x2="485" y1="200" y2="120" />
              </g>

              {/* Coordinate Ellipses (Globe Mesh) */}
              <ellipse cx="340" cy="200" fill="none" rx="125" ry="125" stroke="#35c8e8" strokeOpacity="0.5" strokeWidth="1.2" />
              <ellipse cx="340" cy="200" fill="none" rx="125" ry="48" stroke="#74e2ff" strokeDasharray="3 3" strokeOpacity="0.35" strokeWidth="1" />
              <ellipse cx="340" cy="200" fill="none" rx="125" ry="85" stroke="#74e2ff" strokeDasharray="4 4" strokeOpacity="0.25" strokeWidth="1" />
              <ellipse cx="340" cy="200" fill="none" rx="65" ry="125" stroke="#74e2ff" strokeDasharray="4 4" strokeOpacity="0.3" strokeWidth="1" />
              <ellipse cx="340" cy="200" fill="none" rx="98" ry="125" stroke="#74e2ff" strokeDasharray="2 4" strokeOpacity="0.25" strokeWidth="1" />
              <line stroke="#74e2ff" strokeDasharray="4 6" strokeOpacity="0.25" strokeWidth="1" x1="340" x2="340" y1="40" y2="360" />
              <line stroke="#74e2ff" strokeDasharray="4 6" strokeOpacity="0.25" strokeWidth="1" x1="120" x2="560" y1="200" y2="200" />
              <circle className="animate-pulse" cx="340" cy="200" fill="#74e2ff" r="3" />

              {/* DUAL STRATIFICATION DOME CURVES (Oceanographic Stratification Profile) */}
              <path
                d="M 230,280 C 270,140 330,130 370,280 Z"
                fill="url(#waveStratCyan)"
                opacity="0.35"
              />
              <path
                d="M 230,280 C 270,140 330,130 370,280"
                stroke="#74e2ff"
                strokeWidth="2"
                filter="url(#hudGlow)"
              />
              <path
                d="M 310,280 C 350,160 410,150 450,280 Z"
                fill="url(#waveStratMint)"
                opacity="0.35"
              />
              <path
                d="M 310,280 C 350,160 410,150 450,280"
                stroke="#b0dbe5"
                strokeWidth="2"
                strokeDasharray="4 2"
              />

              {/* SATELLITE ORBITAL TRAJECTORY TRACKS */}
              <path d="M 170 300 C 230 110 430 70 510 130" fill="none" filter="url(#hudGlow)" stroke="url(#orbitGrad1)" strokeDasharray="7 5" strokeWidth="2.5" />
              <g transform="translate(390, 88)">
                <circle cx="0" cy="0" fill="#ffffff" filter="url(#hudGlow)" r="4" />
                <circle className="animate-spin [animation-duration:6s]" cx="0" cy="0" r="10" stroke="#74e2ff" strokeDasharray="2 2" strokeOpacity="0.7" strokeWidth="1" />
                <text fill="#74e2ff" fontFamily="JetBrains Mono" fontSize="9" fontWeight="600" letterSpacing="0.05em" x="12" y="-4">POLAR-SAT-04 [98.2° INC]</text>
                <text fill="#bcc9cd" fontFamily="JetBrains Mono" fontSize="8" x="12" y="7">VEL: 7.62 km/s // ALT: 620km</text>
              </g>

              {/* TARGET LOCK 1: BHARATI STATION (Antarctica) */}
              <g 
                transform="translate(290, 275)"
                onClick={() => setTargetLock('bharati')}
                className="cursor-pointer"
              >
                <circle cx="0" cy="0" fill="#35c8e8" filter="url(#hudGlow)" r="5" />
                <circle className="animate-ping" cx="0" cy="0" r="12" stroke="#35c8e8" strokeOpacity="0.7" strokeWidth="1.2" />
                <circle cx="0" cy="0" r="18" stroke="#35c8e8" strokeDasharray="3 3" strokeOpacity="0.5" strokeWidth="1" />
                <path d="M -8 -12 L -12 -12 L -12 -8" stroke="#35c8e8" strokeWidth="1.2" />
                <path d="M 8 -12 L 12 -12 L 12 -8" stroke="#35c8e8" strokeWidth="1.2" />
                <path d="M -8 12 L -12 12 L -12 8" stroke="#35c8e8" strokeWidth="1.2" />
                <path d="M 8 12 L 12 12 L 12 8" stroke="#35c8e8" strokeWidth="1.2" />
                <path d="M 12 12 L 28 28 L 130 28" fill="none" stroke="#35c8e8" strokeOpacity="0.8" strokeWidth="1.2" />
                <g transform="translate(32, 24)">
                  <rect fill="#111c28" fillOpacity="0.9" height="28" rx="2" stroke="#35c8e8" strokeWidth="1" width="138" x="0" y="-12" />
                  <text fill="#74e2ff" fontFamily="Space Grotesk" fontSize="10" fontWeight="700" letterSpacing="0.06em" x="6" y="0">BHARATI • ANTR [LOCK]</text>
                  <text fill="#bcc9cd" fontFamily="JetBrains Mono" fontSize="8" x="6" y="11">69°24'S 76°11'E // -28.4°C</text>
                </g>
              </g>

              {/* TARGET LOCK 2: MAITRI STATION */}
              <g 
                transform="translate(230, 235)"
                onClick={() => setTargetLock('maitri')}
                className="cursor-pointer"
              >
                <circle cx="0" cy="0" fill="#74e2ff" filter="url(#hudGlow)" r="4.5" />
                <circle cx="0" cy="0" r="10" stroke="#74e2ff" strokeDasharray="2 2" strokeOpacity="0.5" strokeWidth="1" />
                <path d="M -10 -4 L -30 -22 L -140 -22" fill="none" stroke="#74e2ff" strokeOpacity="0.8" strokeWidth="1.2" />
                <g transform="translate(-142, -26)">
                  <rect fill="#111c28" fillOpacity="0.9" height="28" rx="2" stroke="#74e2ff" strokeWidth="1" width="108" x="0" y="-12" />
                  <text fill="#74e2ff" fontFamily="Space Grotesk" fontSize="10" fontWeight="700" x="6" y="0">MAITRI • ANTR</text>
                  <text fill="#bcc9cd" fontFamily="JetBrains Mono" fontSize="8" x="6" y="11">70°45'S // SCHIRMACHER</text>
                </g>
              </g>

              {/* TARGET LOCK 3: HIMADRI BASE (Arctic) */}
              <g 
                transform="translate(415, 125)"
                onClick={() => setTargetLock('himadri')}
                className="cursor-pointer"
              >
                <circle cx="0" cy="0" fill="#96ccff" filter="url(#hudGlow)" r="4.5" />
                <circle className="animate-pulse" cx="0" cy="0" r="12" stroke="#96ccff" strokeOpacity="0.6" strokeWidth="1" />
                <path d="M 8 -8 L 30 -26 L 140 -26" fill="none" stroke="#96ccff" strokeOpacity="0.8" strokeWidth="1.2" />
                <g transform="translate(32, -30)">
                  <rect fill="#111c28" fillOpacity="0.9" height="28" rx="2" stroke="#96ccff" strokeWidth="1" width="130" x="0" y="-12" />
                  <text fill="#96ccff" fontFamily="Space Grotesk" fontSize="10" fontWeight="700" x="6" y="0">HIMADRI • ARCTIC</text>
                  <text fill="#bcc9cd" fontFamily="JetBrains Mono" fontSize="8" x="6" y="11">78°55'N // NY-ÅLESUND</text>
                </g>
              </g>

              {/* TARGET LOCK 4: HIMANSH OBSERVATORY (Himalaya) */}
              <g 
                transform="translate(425, 178)"
                onClick={() => setTargetLock('himansh')}
                className="cursor-pointer"
              >
                <circle cx="0" cy="0" fill="#b0dbe5" filter="url(#hudGlow)" r="4" />
                <circle cx="0" cy="0" r="9" stroke="#b0dbe5" strokeDasharray="2 2" strokeOpacity="0.5" strokeWidth="1" />
                <path d="M 8 2 L 25 14 L 115 14" fill="none" stroke="#b0dbe5" strokeOpacity="0.8" strokeWidth="1.2" />
                <g transform="translate(28, 10)">
                  <rect fill="#111c28" fillOpacity="0.9" height="28" rx="2" stroke="#b0dbe5" strokeWidth="1" width="112" x="0" y="-12" />
                  <text fill="#b0dbe5" fontFamily="Space Grotesk" fontSize="10" fontWeight="700" x="6" y="0">HIMANSH • 3RD POLE</text>
                  <text fill="#bcc9cd" fontFamily="JetBrains Mono" fontSize="8" x="6" y="11">32°24'N // SPITI 4,000m+</text>
                </g>
              </g>
            </svg>
          </div>

          {/* Bottom HUD Telemetry Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 z-10 pt-3 bg-surface-container-high/60 backdrop-blur-md px-4 py-2.5 rounded-lg border border-primary/20 font-mono text-xs">
            <div className="flex flex-wrap items-center gap-4 text-on-surface-variant">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                AURORA SHIELD: <span className="text-primary font-semibold">STABLE G1 (Kp=1.67)</span>
              </span>
              <span className="text-outline-variant hidden sm:inline">|</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                ICE CORE DRILL: <span className="text-secondary font-semibold">DEPTH 482m // δ¹⁸O</span>
              </span>
              <span className="text-outline-variant hidden md:inline">|</span>
              <span className="text-[11px] hidden md:inline">
                VECTOR FIELD: CYCLONIC POLAR VORTEX (-58 hPa)
              </span>
            </div>

            <button
              onClick={() => onNavigate('stations', targetLock)}
              className="text-primary hover:text-primary-fixed font-semibold flex items-center gap-1 transition-all"
            >
              <span>INSPECT NODE: {targetLock.toUpperCase()}</span>
              <span className="material-symbols-outlined !text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Right Column: Holographic Glass Telemetry Panels (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Panel 1: Expedition Corps Readiness */}
          <div className="bg-surface-container-low/90 rounded-xl p-5 flex flex-col justify-between flex-1 border border-primary/20 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-tertiary rounded-full animate-ping" />
                <span className="font-['Space_Grotesk'] text-[11px] font-bold text-tertiary uppercase tracking-wider">
                  EXPEDITION CORPS // READINESS
                </span>
              </div>
              <span className="material-symbols-outlined !text-lg text-tertiary-fixed">group</span>
            </div>

            <div className="my-3 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-['Space_Grotesk'] text-4xl font-bold text-on-surface tracking-tight">76</span>
                  <span className="font-mono text-xs text-primary font-semibold">/ 105 ACTIVE</span>
                </div>
                <p className="font-['Inter'] text-xs text-on-surface-variant mt-1 leading-snug">
                  Indian scientists, glaciologists, and military engineers on high-latitude polar deployment.
                </p>
              </div>

              {/* Segmented Radial Mini Dial */}
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" fill="none" r="20" stroke="#16202c" strokeWidth="4" />
                  <circle
                    className="animate-pulse"
                    cx="24" cy="24" fill="none" r="20"
                    stroke="#35c8e8"
                    strokeDasharray="125.6"
                    strokeDashoffset="35.1"
                    strokeLinecap="round"
                    strokeWidth="4"
                  />
                </svg>
                <span className="absolute font-mono text-[11px] font-bold text-primary">72%</span>
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] font-mono text-on-surface-variant">
                <span>CREW CAPACITY: POLAR V-BASE</span>
                <span className="text-tertiary-fixed font-semibold">STAGE 3 WINTERING</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary shadow-[0_0_8px_#35c8e8]" style={{ width: '72%' }} />
              </div>
            </div>
          </div>

          {/* Panel 2: Surface Thermal Range & Windchill Matrix */}
          <div className="bg-surface-container-low/90 rounded-xl p-5 flex flex-col justify-between flex-1 border border-secondary/20 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-ping" />
                <span className="font-['Space_Grotesk'] text-[11px] font-bold text-secondary uppercase tracking-wider">
                  SURFACE THERMAL RANGE
                </span>
              </div>
              <span className="material-symbols-outlined !text-lg text-secondary-fixed">device_thermostat</span>
            </div>

            <div className="my-3 space-y-1">
              <div className="flex items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-['Space_Grotesk'] text-3xl font-bold text-secondary-fixed">-28.4°C</span>
                  <span className="font-mono text-xs text-on-surface-variant">to -4.1°C</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container-highest border border-secondary/30 text-[10px] font-mono text-secondary font-semibold">
                  STATION BHARATI
                </span>
              </div>
              <p className="font-['Inter'] text-xs text-on-surface-variant leading-snug">
                Bharati station windchill factor currently recorded at <span className="text-rose-400 font-semibold">-39.2°C</span>.
              </p>
            </div>

            {/* Segmented Bar Meter & Wind Speed */}
            <div className="space-y-1.5 pt-1">
              <div className="grid grid-cols-8 gap-1 h-1.5 w-full">
                <div className="bg-primary h-full rounded-xs" />
                <div className="bg-primary h-full rounded-xs" />
                <div className="bg-primary h-full rounded-xs" />
                <div className="bg-secondary h-full rounded-xs" />
                <div className="bg-secondary h-full rounded-xs" />
                <div className="bg-surface-container-highest h-full rounded-xs" />
                <div className="bg-surface-container-highest h-full rounded-xs" />
                <div className="bg-surface-container-highest h-full rounded-xs" />
              </div>
              <div className="flex justify-between items-center font-mono text-xs text-on-surface-variant pt-0.5">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined !text-sm text-tertiary">air</span>
                  WIND: 42 KNOTS
                </span>
                <span className="text-primary font-semibold tracking-wider">GALE LVL 6 // BLIZZARD</span>
              </div>
            </div>
          </div>

          {/* Panel 3: Permanent Observatories / 100% Lock */}
          <div className="bg-surface-container-low/90 rounded-xl p-5 flex flex-col justify-between flex-1 border border-primary/20 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                <span className="font-['Space_Grotesk'] text-[11px] font-bold text-primary uppercase tracking-wider">
                  PERMANENT OBSERVATORIES
                </span>
              </div>
              <span className="material-symbols-outlined !text-lg text-primary">domain</span>
            </div>

            <div className="my-3 space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="font-['Space_Grotesk'] text-3xl font-bold text-primary">4 NODES</span>
                <span className="text-[11px] font-mono text-tertiary-fixed-dim border border-primary/20 px-2 py-0.5 rounded">
                  CARRIER LOCK: NOMINAL
                </span>
              </div>
              <p className="font-['Inter'] text-xs text-on-surface-variant leading-snug">
                100% operational sensor uptime across Antarctic, Arctic & Third Pole sectors.
              </p>
            </div>

            {/* Station Status Grid */}
            <div className="grid grid-cols-2 gap-1.5 pt-1 font-mono text-xs">
              <div 
                onClick={() => onNavigate('stations', 'maitri')}
                className="flex items-center justify-between px-2.5 py-1.5 rounded bg-surface-container-highest/60 border border-outline-variant/30 hover:border-primary/50 cursor-pointer transition-colors"
              >
                <span className="text-on-surface">MAITRI</span>
                <span className="text-primary font-semibold">100%</span>
              </div>
              <div 
                onClick={() => onNavigate('stations', 'bharati')}
                className="flex items-center justify-between px-2.5 py-1.5 rounded bg-surface-container-highest/60 border border-outline-variant/30 hover:border-primary/50 cursor-pointer transition-colors"
              >
                <span className="text-on-surface">BHARATI</span>
                <span className="text-primary font-semibold">100%</span>
              </div>
              <div 
                onClick={() => onNavigate('stations', 'himadri')}
                className="flex items-center justify-between px-2.5 py-1.5 rounded bg-surface-container-highest/60 border border-outline-variant/30 hover:border-primary/50 cursor-pointer transition-colors"
              >
                <span className="text-on-surface">HIMADRI</span>
                <span className="text-primary font-semibold">100%</span>
              </div>
              <div 
                onClick={() => onNavigate('stations', 'himansh')}
                className="flex items-center justify-between px-2.5 py-1.5 rounded bg-surface-container-highest/60 border border-outline-variant/30 hover:border-primary/50 cursor-pointer transition-colors"
              >
                <span className="text-on-surface">HIMANSH</span>
                <span className="text-primary font-semibold">100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==============================================================
          CORE OPERATIONAL PILLARS (Stitch Design)
          ============================================================== */}
      <div className="max-w-7xl mx-auto space-y-8 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/20 pb-4">
          <div>
            <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold block mb-1">
              MISSION CAPABILITIES
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-on-surface uppercase tracking-tight">
              Core Operational Pillars
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant font-['Inter'] max-w-md">
            Providing continuous atmospheric, biological, and deep ice observations in accordance with Antarctic Treaty and Arctic Council protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div 
            onClick={() => onNavigate('stations')}
            className="group flex flex-col rounded-xl bg-surface-container-low border border-outline-variant/30 overflow-hidden hover:border-primary/50 transition-all shadow-xl cursor-pointer hover:-translate-y-1"
          >
            <div className="relative h-52 w-full overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDloMAEeDVAnEky3KiYbz_5XymyWRE7J4LGozsPoKjbT0_rw9MASivIJ46m3FBc9L1VHj-4_2Qw2co7gTNnWCmGFTfA7GOyjcPAvQbqUefu4lNI-JOKV_mGBOPgYUAkjKjeAOZiq-0bZFJwhSAN6WQi8xHCTEpvwyhAXPizVEHuHgUg8dwwHJJBK0pmbr--dpWXSSxwcqni_Ne-zDzmSekcWBBxtnzOy-hgnUnaplyY3zBNWup58qmclA"
                alt="Bharati Station"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent" />
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-surface/80 backdrop-blur-md text-[10px] font-mono text-primary uppercase font-semibold">
                FACILITIES & LOGISTICS
              </span>
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow gap-4">
              <div>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                  Stations & Outposts
                </h3>
                <p className="font-['Inter'] text-xs text-on-surface-variant mt-2 leading-relaxed">
                  Take a structural tour through Maitri, the state-of-the-art Bharati lab complex, and high-altitude Himalayan monitoring camps.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-mono text-primary pt-2 border-t border-outline-variant/20 font-semibold">
                <span>EXPLORE BASES</span>
                <span className="material-symbols-outlined !text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div 
            onClick={() => onNavigate('expeditions')}
            className="group flex flex-col rounded-xl bg-surface-container-low border border-outline-variant/30 overflow-hidden hover:border-secondary/50 transition-all shadow-xl cursor-pointer hover:-translate-y-1"
          >
            <div className="relative h-52 w-full overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCa_ejpjPbo9oQR_pqtwTkmbBKgMsP4LiP91D_rMvSB_KvoSr7lIUqoMDEWdWjMVkqMSZJpICPNcH3nivO_dO9I38oaWZY_2LfybfFaRLC46AAOLfQJXWjoIOoU9tE9DzF_s_G4yl8vrdSfsGagjOAVAcMglvP82n1mEIovblh1ZpdY4Dad-4QesHjGm9vgCioBMhs7tTTU7Pmiz7xZQXMWdzASexorMEcF5WNT9r57pHdSUva5ylXC1Q"
                alt="ORV Sagar Nidhi"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent" />
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-surface/80 backdrop-blur-md text-[10px] font-mono text-secondary uppercase font-semibold">
                ACTIVE VOYAGES
              </span>
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow gap-4">
              <div>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-on-surface group-hover:text-secondary transition-colors">
                  Expeditions & Logistics
                </h3>
                <p className="font-['Inter'] text-xs text-on-surface-variant mt-2 leading-relaxed">
                  Real-time tracking of the 44th Indian Scientific Expedition to Antarctica, ice-shelf drilling traverses, and vessel routes.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-mono text-secondary pt-2 border-t border-outline-variant/20 font-semibold">
                <span>TRACK EXPEDITIONS</span>
                <span className="material-symbols-outlined !text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div 
            onClick={() => onNavigate('data')}
            className="group flex flex-col rounded-xl bg-surface-container-low border border-outline-variant/30 overflow-hidden hover:border-tertiary/50 transition-all shadow-xl cursor-pointer hover:-translate-y-1"
          >
            <div className="relative h-52 w-full overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDue4iZ7nH2315dqXwvQUhsliapDPivf5XCVayTrATAEGGSYnalpjOeY4J9twmgYJ_cOR1G5-9NREXSQCMGfBVYFU2VwyxWGvQqgHYsWsuWKs_t-RoJeZMzYIJVqiBct4NX30zFATTsOG5HlhSeCCwKbG14R_h6zhO7JV_99OoBWaiqHMhcXNtWGgECabwqICeWE8QkbPkUwXqnfv5fcEQJXXY2RTXaUbwwgPAYB7IWsdI6BuymZrQFw"
                alt="Ice Core Lab"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent" />
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-surface/80 backdrop-blur-md text-[10px] font-mono text-tertiary uppercase font-semibold">
                OPEN SCIENTIFIC DATA
              </span>
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow gap-4">
              <div>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-on-surface group-hover:text-tertiary transition-colors">
                  Open Data & Archives
                </h3>
                <p className="font-['Inter'] text-xs text-on-surface-variant mt-2 leading-relaxed">
                  Query petabytes of meteorological logs, ice-core isotopic profiles, ionosphere measurements, and Southern Ocean bathymetry.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-mono text-tertiary pt-2 border-t border-outline-variant/20 font-semibold">
                <span>QUERY REPO</span>
                <span className="material-symbols-outlined !text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
