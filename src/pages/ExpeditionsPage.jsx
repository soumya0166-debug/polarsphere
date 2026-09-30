import React, { useState, useEffect } from 'react';
import { FIELD_DISPATCHES } from '../data/expeditionsData';

export default function ExpeditionsPage({ onNavigate }) {
  const [selectedRosterTab, setSelectedRosterTab] = useState('ISEA-44');
  const [dispatchFilter, setDispatchFilter] = useState('ALL');
  const [utcTime, setUtcTime] = useState('11:42:19 ZULU');

  // Clock simulation
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setUtcTime(`${now.toUTCString().slice(17, 25)} ZULU`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const disciplineData = [
    { name: 'Atmospheric Physics', days: 210, height: '95%', code: 'ATM-PHY' },
    { name: 'Space Weather & Aurora', days: 195, height: '88%', code: 'SPC-WTH' },
    { name: 'Glaciology & Ice Sheet', days: 184, height: '83%', code: 'GLACIO' },
    { name: 'Geology & Geodynamics', days: 160, height: '72%', code: 'GEODYN' },
    { name: 'Oceanography & CTD', days: 145, height: '65%', code: 'OCEANO' },
    { name: 'Marine Geochemistry', days: 130, height: '58%', code: 'MAR-BIO' },
    { name: 'Biological Sciences', days: 120, height: '54%', code: 'BIO-SCI' },
    { name: 'Environmental Baseline', days: 110, height: '49%', code: 'ENV-BAS' },
    { name: 'Polar Medicine & Phys', days: 90, height: '40%', code: 'POL-MED' },
    { name: 'Autonomous Robotics', days: 75, height: '34%', code: 'ROBOTX' },
  ];

  const waypoints = [
    { wp: 'WP-01 Cape Town Exit', coords: '34°21′S 18°28′E', speed: '13.2 kts', ice: '0 / 10 Open', status: 'CLEARED', statusColor: 'text-tertiary font-semibold' },
    { wp: 'WP-02 Roaring Forties', coords: '45°10′S 34°12′E', speed: '10.8 kts', ice: '0 / 10 Open', status: 'CLEARED', statusColor: 'text-tertiary font-semibold' },
    { wp: 'WP-03 Convergence Zone', coords: '63°28′S 58°42′E', speed: '11.4 kts', ice: '3 / 10 Loose Pack', status: 'CURRENT POS', statusColor: 'text-primary font-bold', current: true },
    { wp: 'WP-04 Prydz Bay Shelf', coords: '68°50′S 74°20′E', speed: '-- kts', ice: '7 / 10 Fast Ice', status: 'APPROACHING', statusColor: 'text-on-surface-variant' },
    { wp: 'WP-05 Bharati Fast-Ice', coords: '69°24′S 76°11′E', speed: '-- kts', ice: '9 / 10 Solid Sheet', status: 'DESTINATION', statusColor: 'text-on-surface-variant' },
  ];

  const leaders = [
    {
      name: 'Dr. Shailendra Verma',
      role: 'Expedition Leader (ISEA-44) // NCPOR',
      focus: 'Focus: Glaciology & Ice-Shelf Dynamics',
      tag: 'LEADER',
      tagColor: 'bg-primary/20 text-primary',
      icon: 'science',
      iconColor: 'text-primary',
      exp: 'ISEA-44',
    },
    {
      name: 'Dr. Kavitha Raman',
      role: 'Chief Oceanographer // INCOIS',
      focus: 'Focus: Southern Ocean Carbon Flux',
      tag: 'CHIEF SCI',
      tagColor: 'bg-secondary/20 text-secondary',
      icon: 'water',
      iconColor: 'text-secondary',
      exp: 'ISEA-44',
    },
    {
      name: 'Surg. Cdr. Rajesh Nair',
      role: 'Polar Medicine Officer // Indian Navy',
      focus: 'Focus: Hypothermia & Isolation Physiology',
      tag: 'MED-OPS',
      tagColor: 'bg-surface-container-highest text-tertiary-fixed',
      icon: 'medical_services',
      iconColor: 'text-tertiary',
      exp: 'ISEA-44',
    },
    {
      name: 'Er. Ankit Srivastava',
      role: 'Station Logistics & Mechanical Lead // NCPOR',
      focus: 'Focus: Station Life-Support Cogeneration',
      tag: 'LOG-LEAD',
      tagColor: 'bg-primary-container/30 text-primary',
      icon: 'precision_manufacturing',
      iconColor: 'text-primary',
      exp: 'BHARATI',
    },
    {
      name: 'Dr. S. K. Roy',
      role: 'High Arctic Station Chief // NCPOR',
      focus: 'Focus: Atmospheric Black Carbon Radiative Forcing',
      tag: 'ARCTIC LEAD',
      tagColor: 'bg-secondary-container text-on-secondary-container',
      icon: 'storm',
      iconColor: 'text-secondary',
      exp: 'HIMADRI',
    },
    {
      name: 'Dr. P. K. Sharma',
      role: 'Principal Glaciologist // Western Himalaya',
      focus: 'Focus: Chhota Shigri Glacier Mass-Balance Radar',
      tag: '3RD POLE',
      tagColor: 'bg-tertiary-container text-on-tertiary-container',
      icon: 'landscape',
      iconColor: 'text-tertiary-fixed',
      exp: 'BHARATI',
    },
  ];

  const filteredLeaders = leaders.filter(l => selectedRosterTab === 'ALL' || l.exp === selectedRosterTab);

  return (
    <div className="w-full bg-surface text-on-surface py-6 px-4 sm:px-6 lg:px-12 space-y-10">
      {/* ==============================================================
          OPERATIONAL SUB-TELEMETRY RIBBON
          ============================================================== */}
      <div className="max-w-7xl mx-auto rounded-xl bg-surface-container-low border border-outline-variant/30 p-4 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-ping" />
              <span className="text-primary font-semibold">OPS-GRID CONUS // SOUTHERN & ARCTIC SECTORS</span>
            </div>
            <div className="h-3 w-px bg-outline-variant hidden sm:block" />
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span>TIME UTC:</span>
              <span className="text-on-surface font-medium">{utcTime}</span>
            </div>
            <div className="h-3 w-px bg-outline-variant hidden md:block" />
            <div className="flex items-center gap-2 text-tertiary">
              <span className="material-symbols-outlined !text-base">satellite_alt</span>
              <span>SAT-LINK: GSAT-7R / IRIDIUM-NEXT MATRIX [LOCK 99.8%]</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-on-surface-variant font-['Space_Grotesk'] font-bold">CRYOSPHERE THREAT:</span>
            <span className="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-semibold">
              DEFCON-3 CRYO
            </span>
          </div>
        </div>
      </div>

      {/* ==============================================================
          COMMAND CENTER TELEMETRY: 4 HIGH-IMPACT STAT CARDS (Artboard 4)
          ============================================================== */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="p-5 rounded-xl bg-surface-container border border-outline-variant/30 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-['Space_Grotesk'] text-xs font-bold uppercase text-primary tracking-wider">
              Active Expeditions
            </span>
            <span className="material-symbols-outlined !text-lg text-primary">explore</span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-['Space_Grotesk'] text-4xl sm:text-5xl font-bold text-on-surface leading-none">03</span>
            <span className="font-mono text-xs text-tertiary-fixed-dim">DEPLOYMENTS</span>
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
            <span>Antarctic • Arctic • Himalaya</span>
            <span className="text-primary font-semibold">100% NOMINAL</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
        </div>

        {/* Stat 2 */}
        <div className="p-5 rounded-xl bg-surface-container border border-outline-variant/30 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-['Space_Grotesk'] text-xs font-bold uppercase text-secondary tracking-wider">
              Personnel In Field
            </span>
            <span className="material-symbols-outlined !text-lg text-secondary">groups</span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-['Space_Grotesk'] text-4xl sm:text-5xl font-bold text-on-surface leading-none">64</span>
            <span className="font-mono text-xs text-secondary-fixed">SCIENTISTS</span>
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
            <span>48 Winter-Over / 16 Cruise</span>
            <span className="text-emerald-400 font-semibold">MED: GREEN</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary" />
        </div>

        {/* Stat 3 */}
        <div className="p-5 rounded-xl bg-surface-container border border-outline-variant/30 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-['Space_Grotesk'] text-xs font-bold uppercase text-tertiary tracking-wider">
              Vessels Underway
            </span>
            <span className="material-symbols-outlined !text-lg text-tertiary">directions_boat</span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-['Space_Grotesk'] text-4xl sm:text-5xl font-bold text-on-surface leading-none">02</span>
            <span className="font-mono text-xs text-tertiary-fixed">ICE-CLASS</span>
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
            <span>V. Golovnin / Sagar Nidhi</span>
            <span className="text-tertiary font-semibold">TRANSIT TRACKED</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-tertiary" />
        </div>

        {/* Stat 4 */}
        <div className="p-5 rounded-xl bg-surface-container border border-outline-variant/30 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-['Space_Grotesk'] text-xs font-bold uppercase text-primary-fixed-dim tracking-wider">
              Telemetry Sync
            </span>
            <span className="material-symbols-outlined !text-lg text-primary-fixed-dim">sync</span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-['Space_Grotesk'] text-4xl sm:text-5xl font-bold text-primary leading-none">2m</span>
            <span className="font-mono text-xs text-on-surface-variant">AGO</span>
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
            <span>Packets: 184,920 Rx/s</span>
            <span className="text-primary font-semibold">0 DROP PACKETS</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-container" />
        </div>
      </div>

      {/* ==============================================================
          MAIN HERO MISSION: ISEA-44 TACTICAL DASHBOARD (Artboard 4)
          ============================================================== */}
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-primary tracking-widest uppercase font-semibold">
              <span className="w-2 h-2 rounded-full bg-primary" />
              PRIMARY STRATEGIC EXPEDITION DEPLOYMENT
            </div>
            <h1 className="font-['Space_Grotesk'] text-2xl sm:text-4xl font-bold text-on-surface tracking-tight mt-1 uppercase">
              44th Indian Scientific Expedition to Antarctica (ISEA-44)
            </h1>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded bg-surface-container-highest text-tertiary-fixed-dim">
              MOES-NCPOR // EXP-44-ANT
            </span>
            <span className="px-3 py-1 rounded bg-primary text-on-primary font-bold tracking-wide">
              STATUS: TRANSIT PHASE II
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-surface-container-low border border-outline-variant/30 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Polar Calving Scene / Real-time Map View (8 Cols) */}
          <div 
            className="lg:col-span-8 relative min-h-[440px] flex flex-col justify-between p-6 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCIQbyAtfkRwZ0XXjq7J504XuBP8NZq5WxZcBITRi08QvekeDmUbqPj_Goyet2XtnGSwyp67ZP9fBzB4oRUbut1XxR3onmdBA_ydrZFHp8RPFEls7wmSSDrtBgar0-K_VvHS4oGQLbuMWTf6c6RXSJ5vrqXIG0-biqIdqheCPkjzl_Ro3qqX5zCQCHTurFW86pnQhT21XYZfasqbUafLMb7_Py9gNeI6GVZVCobXTYgaPe3c9m5DysOyQ')"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-transparent to-transparent" />

            {/* Top HUD Badges */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface/90 backdrop-blur-md text-on-surface font-mono text-xs shadow-md border border-outline-variant/30">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary font-semibold">VESSEL:</span>
                <span>MV VASILY GOLOVNIN / CHARTER-IN-44</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-1.5 rounded bg-surface/90 backdrop-blur-md text-tertiary-fixed font-mono text-xs shadow-md border border-outline-variant/30">
                <span>LAT: 63°28′14″ S</span>
                <span className="text-outline-variant">|</span>
                <span>LON: 58°42′30″ E</span>
                <span className="text-outline-variant">|</span>
                <span className="text-primary font-semibold">SPEED: 11.4 KTS</span>
              </div>
            </div>

            {/* Center Tactical Reticle & Waypoint Projection Graphic */}
            <div className="relative z-10 my-auto py-12 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 rounded-full bg-primary/5 flex items-center justify-center relative border border-primary/20">
                <div className="absolute inset-0 rounded-full animate-spin [animation-duration:16s] border-t-2 border-primary/40" />
                <div className="w-36 h-36 rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_12px_#35c8e8]" />
                </div>
                <span className="absolute -top-3 px-2 py-0.5 rounded bg-surface-container font-mono text-[10px] text-primary border border-primary/30">
                  WAYPOINT 03 // POLAR CONVERGENCE
                </span>
                <span className="absolute -bottom-3 px-2 py-0.5 rounded bg-surface-container font-mono text-[10px] text-tertiary border border-tertiary/30">
                  RADAR ECHO: NO ICEBERG HAZARD
                </span>
              </div>
            </div>

            {/* Bottom Transit Corridor Info */}
            <div className="relative z-10 flex flex-wrap items-end justify-between gap-4 pt-4 border-t border-outline-variant/20">
              <div className="space-y-1 max-w-xl">
                <span className="font-['Space_Grotesk'] text-[11px] font-bold text-tertiary tracking-wider uppercase">
                  TRANSIT CORRIDOR
                </span>
                <p className="font-['Space_Grotesk'] text-lg font-bold text-on-surface leading-snug">
                  Southern Ocean Transit towards Prydz Bay & Maitri Air Link Dropzone
                </p>
                <span className="font-mono text-xs text-on-surface-variant block">
                  Target ETA Larsemann Hills (Bharati Station): 74 hrs (03 March 2025, 08:00 UTC)
                </span>
              </div>
              <button
                onClick={() => onNavigate('stations', 'bharati')}
                className="px-4 py-2.5 rounded bg-primary text-on-primary font-['Space_Grotesk'] text-xs font-bold hover:brightness-110 transition-all shadow-md flex items-center gap-2"
              >
                <span className="material-symbols-outlined !text-base">satellite</span>
                <span>OPEN BHARATI SENSOR MATRIX</span>
              </button>
            </div>
          </div>

          {/* Right: Telemetry & Mission Diagnostics Panel (4 Cols) */}
          <div className="lg:col-span-4 p-6 flex flex-col justify-between bg-surface-container border-l border-outline-variant/20">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined !text-lg text-primary">monitor_heart</span>
                  <span className="font-['Space_Grotesk'] text-sm font-bold uppercase text-on-surface">Telemetry Deck</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  ONLINE
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 space-y-1">
                  <div className="flex justify-between text-outline text-[10px] uppercase">
                    <span>HULL STRAIN GAUGE</span>
                    <span className="text-primary font-semibold">14.2 MPa [SAFE]</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '28%' }} />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 space-y-1">
                  <div className="flex justify-between text-outline text-[10px] uppercase">
                    <span>SEAWATER SURFACE TEMP</span>
                    <span className="text-secondary font-semibold">+0.8°C</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-on-surface-variant">
                    <span>Salinity: 33.8 PSU</span>
                    <span>Fluorescence: 1.4 mg/m³</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 space-y-1">
                  <div className="flex justify-between text-outline text-[10px] uppercase">
                    <span>FUEL AUTONOMY</span>
                    <span className="text-tertiary font-semibold">68 Days</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary" style={{ width: '78%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/20 font-mono text-xs text-on-surface-variant flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" />
                SATCOM INMARSAT-C
              </span>
              <span className="text-primary font-semibold">BER: &lt; 10^-8</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==============================================================
          DISCIPLINE BAR CHART: RESEARCH DAYS & FIELD ACTIVITIES 2024-2025
          ============================================================== */}
      <div className="max-w-7xl mx-auto rounded-2xl bg-surface-container-low border border-outline-variant/30 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/20 pb-4">
          <div>
            <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold block mb-1">
              FIELD RESEARCH INTENSITY // 10 ACTIVE DOMAINS
            </span>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-on-surface uppercase tracking-tight">
              Research Days and Field Activities by Discipline 2024-2025
            </h2>
          </div>
          <span className="font-mono text-xs text-tertiary px-3 py-1 rounded bg-surface-container">
            TOTAL CUMULATIVE: 1,303 LOGGED FIELD DAYS
          </span>
        </div>

        {/* Vertical Cyan Bars Chart */}
        <div className="h-64 sm:h-72 w-full bg-surface-container-lowest/80 rounded-xl p-4 sm:p-6 flex items-end justify-between gap-2 sm:gap-4 border border-outline-variant/20 relative">
          {/* Horizontal Grid lines */}
          <div className="absolute inset-0 px-6 py-6 flex flex-col justify-between pointer-events-none opacity-15">
            <div className="border-b border-outline-variant w-full" />
            <div className="border-b border-outline-variant w-full" />
            <div className="border-b border-outline-variant w-full" />
            <div className="border-b border-outline-variant w-full" />
          </div>

          {disciplineData.map((d, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group relative z-10">
              {/* Tooltip on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-surface-container-highest px-2 py-0.5 rounded text-[10px] font-mono text-primary whitespace-nowrap border border-primary/30 pointer-events-none">
                {d.days} Days Logged
              </div>

              {/* Day count label */}
              <span className="text-[10px] sm:text-xs font-mono font-bold text-primary group-hover:scale-110 transition-transform">
                {d.days}d
              </span>

              {/* Bar */}
              <div className="w-full max-w-[48px] bg-surface-container rounded-t-sm overflow-hidden flex items-end h-full">
                <div 
                  className="w-full bg-gradient-to-t from-primary/80 to-primary-fixed hover:to-white transition-all duration-500 rounded-t-sm shadow-[0_0_12px_rgba(53,200,232,0.3)] group-hover:shadow-[0_0_18px_rgba(53,200,232,0.6)]"
                  style={{ height: d.height }}
                />
              </div>

              {/* Discipline label */}
              <span className="text-[9px] sm:text-[10px] font-mono text-on-surface-variant truncate w-full text-center mt-1 group-hover:text-on-surface">
                {d.code}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ==============================================================
          VESSEL TRANSIT & SPATIAL ROUTE TRACKER (BATHYMETRY TRACE)
          ============================================================== */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Real-time Waypoint Track Visualizer (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4 rounded-xl bg-surface-container-low border border-outline-variant/30 p-6 shadow-md">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
            <div>
              <span className="font-['Space_Grotesk'] text-xs font-bold text-secondary uppercase">Spatial Route Tracker</span>
              <h3 className="font-['Space_Grotesk'] text-xl font-bold text-on-surface">Vessel Transit Coordinates & Bathymetry Trace</h3>
            </div>
            <span className="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-mono text-[10px]">
              MAP: STEREOGRAPHIC
            </span>
          </div>

          {/* Bathymetric Profile Chart (SVG) */}
          <div className="w-full h-44 rounded-lg bg-surface-container-lowest p-3 flex flex-col justify-between relative overflow-hidden border border-outline-variant/20">
            <div className="flex justify-between items-center text-on-surface-variant font-mono text-[10px] z-10">
              <span>CAPE TOWN (0 KM)</span>
              <span className="text-primary font-semibold">SUB-ANTARCTIC FRONT (2,100 KM)</span>
              <span>PRYDZ BAY (4,820 KM)</span>
            </div>

            <svg className="w-full h-24 text-primary" fill="none" preserveAspectRatio="none" viewBox="0 0 600 100">
              <defs>
                <linearGradient id="oceanGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#35c8e8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#040f1a" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <path d="M0,85 Q70,75 140,88 T280,60 T420,70 T520,35 L600,20 L600,100 L0,100 Z" fill="url(#oceanGrad)" />
              <path d="M0,85 Q70,75 140,88 T280,60 T420,70 T520,35 L600,20" stroke="#74e2ff" strokeWidth="2" />
              <circle className="animate-pulse" cx="360" cy="65" fill="#35c8e8" r="5" />
              <line stroke="#adecff" strokeDasharray="2 2" strokeWidth="1" x1="360" x2="360" y1="0" y2="100" />
              <text fill="#adecff" fontFamily="JetBrains Mono" fontSize="9" x="368" y="45">CURRENT DEPTH: 3,840m</text>
            </svg>

            <div className="flex justify-between items-center font-mono text-[10px] text-on-surface-variant z-10">
              <span>Continental Slope: -4,200m</span>
              <span className="text-tertiary">Abyssal Plain Crossing // CTD Station 09 Live</span>
              <span>Larsemann Shelf: -220m</span>
            </div>
          </div>

          {/* Waypoint Log Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="text-on-surface-variant bg-surface-container text-[11px]">
                  <th className="py-2.5 px-3 font-semibold">WAYPOINT</th>
                  <th className="py-2.5 px-3 font-semibold">LAT / LONG</th>
                  <th className="py-2.5 px-3 font-semibold">SPEED</th>
                  <th className="py-2.5 px-3 font-semibold">SEA ICE CONC.</th>
                  <th className="py-2.5 px-3 font-semibold text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {waypoints.map((wp, idx) => (
                  <tr 
                    key={idx} 
                    className={`transition-colors ${wp.current ? 'bg-primary-container/20 font-semibold' : 'hover:bg-surface-container'}`}
                  >
                    <td className="py-2.5 px-3 text-primary flex items-center gap-1.5">
                      {wp.current && <span className="h-2 w-2 rounded-full bg-primary animate-ping" />}
                      <span>{wp.wp}</span>
                    </td>
                    <td className="py-2.5 px-3 text-on-surface-variant">{wp.coords}</td>
                    <td className="py-2.5 px-3">{wp.speed}</td>
                    <td className="py-2.5 px-3 text-on-surface-variant">{wp.ice}</td>
                    <td className={`py-2.5 px-3 text-right ${wp.statusColor}`}>{wp.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Secondary Expeditions & Parallel Operations (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
            <div>
              <span className="font-['Space_Grotesk'] text-xs font-bold text-primary uppercase">Parallel Operations</span>
              <h3 className="font-['Space_Grotesk'] text-xl font-bold text-on-surface">Secondary Scientific Expeditions</h3>
            </div>
            <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-mono text-[10px]">
              2 IN ARCTIC/HIMALAYA
            </span>
          </div>

          {/* Expedition 2: Arctic Ny-Ålesund */}
          <div className="rounded-xl bg-surface-container-low border border-outline-variant/30 p-5 space-y-3 hover:border-secondary/50 transition-all shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-mono text-[10px] font-semibold">
                  ARCTIC-2025-W
                </span>
                <span className="font-mono text-xs text-tertiary">HIMADRI OBS // SVALBARD</span>
              </div>
              <span className="flex items-center gap-1 font-mono text-xs text-primary font-semibold">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                SAMPLING LIVE
              </span>
            </div>
            <h4 className="font-['Space_Grotesk'] text-base font-bold text-on-surface">
              Ny-Ålesund Marine Biogeochemistry & Kongsfjorden Runoff
            </h4>
            <p className="font-['Inter'] text-xs text-on-surface-variant leading-relaxed">
              Continuous fjord hydrographic monitoring analyzing glacial melt discharge, dissolved organic carbon, and atmospheric aerosol particulate exchange.
            </p>
            <div className="grid grid-cols-3 gap-2 font-mono text-xs pt-1">
              <div className="p-2 rounded bg-surface-container text-center">
                <span className="text-[10px] text-outline block">TEAM SIZE</span>
                <span className="font-bold text-on-surface">08 Scientists</span>
              </div>
              <div className="p-2 rounded bg-surface-container text-center">
                <span className="text-[10px] text-outline block">SURFACE TEMP</span>
                <span className="font-bold text-secondary">-18.6°C</span>
              </div>
              <div className="p-2 rounded bg-surface-container text-center">
                <span className="text-[10px] text-outline block">ICE COVER</span>
                <span className="font-bold text-primary">41% Basin</span>
              </div>
            </div>
          </div>

          {/* Expedition 3: Himalaya Chhota Shigri */}
          <div className="rounded-xl bg-surface-container-low border border-outline-variant/30 p-5 space-y-3 hover:border-tertiary/50 transition-all shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-mono text-[10px] font-semibold">
                  HIM-TRAVERSE-IX
                </span>
                <span className="font-mono text-xs text-tertiary">HIMANSH // SPITI VALLEY</span>
              </div>
              <span className="flex items-center gap-1 font-mono text-xs text-primary font-semibold">
                <span className="h-2 w-2 rounded-full bg-primary" />
                RADAR ACTIVE
              </span>
            </div>
            <h4 className="font-['Space_Grotesk'] text-base font-bold text-on-surface">
              Chhota Shigri & Batal Glacier Deep GPR Mass-Balance
            </h4>
            <p className="font-['Inter'] text-xs text-on-surface-variant leading-relaxed">
              Ground-Penetrating Radar cross-section mapping at 4,800m altitude. Quantifying seasonal ice thinning and permafrost core thermistors.
            </p>
            <div className="grid grid-cols-3 gap-2 font-mono text-xs pt-1">
              <div className="p-2 rounded bg-surface-container text-center">
                <span className="text-[10px] text-outline block">CREW ACTIVE</span>
                <span className="font-bold text-on-surface">08 Geologists</span>
              </div>
              <div className="p-2 rounded bg-surface-container text-center">
                <span className="text-[10px] text-outline block">ELEVATION</span>
                <span className="font-bold text-secondary">4,890m AMSL</span>
              </div>
              <div className="p-2 rounded bg-surface-container text-center">
                <span className="text-[10px] text-outline block">ICE THICKNESS</span>
                <span className="font-bold text-primary">124m Mean</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==============================================================
          SCIENTIFIC PERSONNEL ROSTER & LIVE FIELD DISPATCHES
          ============================================================== */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Leadership & Personnel Roster (8 Cols) */}
        <div className="lg:col-span-8 rounded-2xl bg-surface-container-low border border-outline-variant/30 p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined !text-xl text-primary">badge</span>
              <div>
                <span className="font-['Space_Grotesk'] text-xs font-bold text-primary uppercase block">
                  Active Station & Vessel Manifest
                </span>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-on-surface">
                  Scientific Leadership & Field Leads
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-xs">
              {['ALL', 'ISEA-44', 'HIMADRI', 'BHARATI'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setSelectedRosterTab(tab)}
                  className={`px-3 py-1 rounded text-xs transition-all ${
                    selectedRosterTab === tab
                      ? 'bg-primary text-on-primary font-bold'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLeaders.map((lead, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-surface-container border border-outline-variant/20 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0">
                  <span className={`material-symbols-outlined !text-2xl ${lead.iconColor}`}>
                    {lead.icon}
                  </span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-['Space_Grotesk'] text-sm font-bold text-on-surface truncate">
                      {lead.name}
                    </span>
                    <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded font-semibold ${lead.tagColor}`}>
                      {lead.tag}
                    </span>
                  </div>
                  <span className="text-xs text-tertiary truncate font-['Inter'] mt-0.5">
                    {lead.role}
                  </span>
                  <span className="font-mono text-[11px] text-on-surface-variant mt-1 truncate">
                    {lead.focus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Safety Dispatch Feed (4 Cols) */}
        <div className="lg:col-span-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="font-['Space_Grotesk'] text-base font-bold text-on-surface uppercase">
                Field Dispatches
              </h3>
            </div>
            <span className="font-mono text-[10px] text-primary">IRIDIUM BURST</span>
          </div>

          <div className="space-y-3">
            {FIELD_DISPATCHES.slice(0, 3).map((d) => (
              <div key={d.id} className="p-3.5 rounded-xl bg-surface-container border border-outline-variant/20 space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between text-[10px] text-on-surface-variant">
                  <span className="text-primary font-semibold">{d.author}</span>
                  <span>{d.timestamp}</span>
                </div>
                <h5 className="font-['Space_Grotesk'] font-bold text-on-surface text-xs leading-snug">
                  {d.title}
                </h5>
                <p className="text-on-surface-variant text-[11px] font-['Inter'] line-clamp-2">
                  {d.content}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('data')}
            className="w-full py-2 rounded bg-surface-container hover:bg-surface-container-high text-primary font-mono text-xs font-semibold flex items-center justify-center gap-1 transition-all"
          >
            <span>VIEW COMPLETE DISPATCH LOG</span>
            <span className="material-symbols-outlined !text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
