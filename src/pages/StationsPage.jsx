import React, { useState } from 'react';
import { STATIONS } from '../data/stationsData';

export default function StationsPage({ selectedStationId, onNavigate }) {
  const [activeStationId, setActiveStationId] = useState(selectedStationId || 'bharati');
  const [activeTab, setActiveTab] = useState('telemetry'); // 'telemetry', 'instruments', 'logistics'

  const activeStation = STATIONS.find(s => s.id === activeStationId) || STATIONS[0];

  const comparativeData = [
    {
      id: 'maitri',
      name: 'MAITRI (STN-01)',
      coordinates: '70°45′S 11°44′E',
      temp: '-28.4°C',
      tempNum: -28.4,
      wind: '38.6 kt (SSE 155°)',
      pressure: '982.4 hPa',
      humidity: '42%',
      solar: '310 W/m²',
      linkStatus: '99.8% Nominal',
      color: '#35c8e8',
    },
    {
      id: 'bharati',
      name: 'BHARATI (STN-02)',
      coordinates: '69°24′S 76°11′E',
      temp: '-19.2°C',
      tempNum: -19.2,
      wind: '18.6 kt (E 092°)',
      pressure: '996.1 hPa',
      humidity: '58%',
      solar: '285 W/m²',
      linkStatus: '100.0% Nominal',
      color: '#96ccff',
    },
    {
      id: 'himadri',
      name: 'HIMADRI (STN-03)',
      coordinates: '78°55′N 11°56′E',
      temp: '-04.1°C',
      tempNum: -4.1,
      wind: '11.2 kt (WNW 290°)',
      pressure: '1012.3 hPa',
      humidity: '84%',
      solar: '42 W/m²',
      linkStatus: '99.4% Nominal',
      color: '#b0dbe5',
    },
    {
      id: 'himansh',
      name: 'HIMANSH (STN-04)',
      coordinates: '32°24′N 77°37′E',
      temp: '-15.6°C',
      tempNum: -15.6,
      wind: '24.1 kt (NE 045°)',
      pressure: '624.8 hPa',
      humidity: '31%',
      solar: '790 W/m²',
      linkStatus: '98.9% Nominal',
      color: '#adecff',
    },
  ];

  return (
    <div className="w-full bg-surface text-on-surface py-10 px-4 sm:px-6 lg:px-12 space-y-12">
      {/* ==============================================================
          TOP HEADER: INDIAN POLAR STATIONS & OBSERVING SYSTEMS
          ============================================================== */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-outline-variant/30 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high/80 border border-primary/30 text-xs font-mono text-primary shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="tracking-widest uppercase font-semibold">
              NATIONAL SOVEREIGN CRYOSPHERE NETWORK • MOES OBSERVATORIES
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-bold tracking-tight text-on-surface uppercase">
            Indian Polar Stations & Observing Systems
          </h1>
          <p className="font-['Inter'] text-sm sm:text-base text-on-surface-variant max-w-3xl leading-relaxed">
            Permanent research infrastructure spanning three geographical poles: maritime Antarctica, the high Arctic Svalbard archipelago, and the cryospheric Third Pole of the Western Himalayas.
          </p>
        </div>

        {/* Quick Metrics Ribbon */}
        <div className="flex items-center gap-4 sm:gap-6 bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 font-mono shadow-lg shrink-0">
          <div className="flex flex-col">
            <span className="text-[10px] text-outline uppercase font-semibold">Total Crew On-Ice</span>
            <span className="text-xl sm:text-2xl font-bold text-on-surface font-['Space_Grotesk']">
              80 <span className="text-xs text-tertiary font-mono">pers</span>
            </span>
          </div>
          <div className="w-px h-10 bg-outline-variant/30" />
          <div className="flex flex-col">
            <span className="text-[10px] text-outline uppercase font-semibold">Max Station Lat</span>
            <span className="text-xl sm:text-2xl font-bold text-primary font-['Space_Grotesk']">78°55′N</span>
          </div>
          <div className="w-px h-10 bg-outline-variant/30" />
          <div className="flex flex-col">
            <span className="text-[10px] text-outline uppercase font-semibold">Peak Altitude</span>
            <span className="text-xl sm:text-2xl font-bold text-secondary font-['Space_Grotesk']">
              4,080 <span className="text-xs text-tertiary font-mono">m</span>
            </span>
          </div>
        </div>
      </div>

      {/* ==============================================================
          MAIN LAYOUT: SIDEBAR STATION SELECTOR + ACTIVE STATION HUD
          ============================================================== */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar: Station Selector Cards (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center justify-between font-mono text-xs text-on-surface-variant px-1">
            <span className="uppercase tracking-widest text-primary font-semibold">SELECT OBSERVATORY</span>
            <span>4 / 4 ONLINE</span>
          </div>

          <div className="flex flex-col gap-3">
            {STATIONS.map((stn) => {
              const isSelected = stn.id === activeStation.id;
              return (
                <div
                  key={stn.id}
                  onClick={() => setActiveStationId(stn.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border flex flex-col gap-2 relative overflow-hidden group ${
                    isSelected
                      ? 'bg-surface-container border-primary shadow-[0_0_20px_rgba(53,200,232,0.25)]'
                      : 'bg-surface-container-low border-outline-variant/30 hover:bg-surface-container hover:border-outline-variant/60'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-primary" />
                  )}

                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={`font-semibold uppercase ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                      {stn.code}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-[10px] text-emerald-400 font-semibold border border-emerald-500/20">
                      {stn.statusBadge}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mt-1">
                    <h3 className="font-['Space_Grotesk'] text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                      {stn.name}
                    </h3>
                    <span className="font-mono text-lg font-bold text-primary">
                      {stn.liveWeather.temp}°C
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant pt-1 border-t border-outline-variant/20">
                    <span className="truncate">{stn.location}</span>
                    <span className="text-tertiary shrink-0 ml-2">{stn.altitude}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Nav to Geosphere Monitor */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-primary/20 flex flex-col gap-2 mt-2">
            <span className="font-mono text-[10px] text-primary uppercase font-semibold">HOLOGRAPHIC GEOSPHERE</span>
            <p className="text-xs text-on-surface-variant font-['Inter']">
              Switch to full-screen orbital perspective with live satellite trajectories.
            </p>
            <button
              onClick={() => onNavigate('explore')}
              className="mt-1 w-full py-2 rounded bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 font-mono text-xs font-semibold flex items-center justify-center gap-1 transition-all"
            >
              <span>LAUNCH POLAR GEOSPHERE MONITOR</span>
              <span className="material-symbols-outlined !text-sm">sensors</span>
            </button>
          </div>
        </div>

        {/* Right Main Panel: Active Station Full Telemetry HUD (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Main Visual & Key Metadata Card */}
          <div className="rounded-2xl bg-surface-container-low border border-outline-variant/30 overflow-hidden shadow-2xl flex flex-col">
            {/* Station Image Banner with Badges */}
            <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-surface-container">
              <img
                src={activeStation.image}
                alt={activeStation.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent" />
              
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono text-primary font-semibold border border-primary/30">
                  {activeStation.code} // EST. {activeStation.establishedYear}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono text-tertiary border border-outline-variant/30">
                  {activeStation.coordinates}
                </span>
              </div>

              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md text-xs font-mono text-emerald-400 font-semibold border border-emerald-500/30">
                  100% OPERATIONAL
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-xs font-mono text-tertiary-fixed block uppercase tracking-wider">
                    {activeStation.region} SOVEREIGN RESEARCH OUTPOST
                  </span>
                  <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-on-surface">
                    {activeStation.name}
                  </h2>
                </div>
                <div className="text-right font-mono bg-surface-container-lowest/80 backdrop-blur-md px-4 py-2 rounded-lg border border-outline-variant/30">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    {activeStation.liveWeather.temp}°C
                  </div>
                  <div className="text-[10px] text-on-surface-variant">
                    WIND: {activeStation.liveWeather.windSpeed} kt
                  </div>
                </div>
              </div>
            </div>

            {/* Station Overview & Navigation Tabs */}
            <div className="p-6 space-y-6">
              <p className="text-sm text-on-surface-variant font-['Inter'] leading-relaxed">
                {activeStation.description}
              </p>

              {/* Station Telemetry Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/20">
                  <span className="text-[10px] text-outline uppercase block">ELEVATION</span>
                  <span className="text-base font-bold text-on-surface block mt-1">{activeStation.altitude}</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/20">
                  <span className="text-[10px] text-outline uppercase block">CREW OVERWINTER</span>
                  <span className="text-base font-bold text-on-surface block mt-1">{activeStation.personnel.winter} Scientists</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/20">
                  <span className="text-[10px] text-outline uppercase block">SUMMER CAPACITY</span>
                  <span className="text-base font-bold text-on-surface block mt-1">{activeStation.personnel.summer} Personnel</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/20">
                  <span className="text-[10px] text-outline uppercase block">STATION CHIEF</span>
                  <span className="text-xs font-semibold text-primary truncate block mt-1">{activeStation.personnel.leader}</span>
                </div>
              </div>

              {/* Sub-Tabs: Live Gauges / Scientific Instruments / Power & Uplink */}
              <div className="border-t border-outline-variant/20 pt-4 space-y-4">
                <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-2">
                  <button
                    onClick={() => setActiveTab('telemetry')}
                    className={`px-3 py-1.5 rounded font-['Space_Grotesk'] text-xs font-bold uppercase transition-all ${
                      activeTab === 'telemetry'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Atmospheric Telemetry
                  </button>
                  <button
                    onClick={() => setActiveTab('instruments')}
                    className={`px-3 py-1.5 rounded font-['Space_Grotesk'] text-xs font-bold uppercase transition-all ${
                      activeTab === 'instruments'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Sensor Payloads ({activeStation.scientificDisciplines.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('logistics')}
                    className={`px-3 py-1.5 rounded font-['Space_Grotesk'] text-xs font-bold uppercase transition-all ${
                      activeTab === 'logistics'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Systems Diagnostics
                  </button>
                </div>

                {/* Tab 1: Live Meteorological Gauges */}
                {activeTab === 'telemetry' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                    <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/20">
                      <span className="text-[10px] text-outline block">WINDCHILL FACTOR</span>
                      <span className="text-xl font-bold text-secondary block mt-0.5">{activeStation.liveWeather.windChill}°C</span>
                      <span className="text-[10px] text-outline-variant">Cold stress index</span>
                    </div>

                    <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/20">
                      <span className="text-[10px] text-outline block">BAROMETRIC PRESSURE</span>
                      <span className="text-xl font-bold text-primary block mt-0.5">{activeStation.liveWeather.pressure} hPa</span>
                      <span className="text-[10px] text-outline-variant">{activeStation.liveWeather.pressureTrend}</span>
                    </div>

                    <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/20">
                      <span className="text-[10px] text-outline block">WIND VECTOR</span>
                      <span className="text-xl font-bold text-on-surface block mt-0.5">{activeStation.liveWeather.windDirection}</span>
                      <span className="text-[10px] text-outline-variant">{activeStation.liveWeather.windSpeed} kt (Peak 44 kt)</span>
                    </div>

                    <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/20">
                      <span className="text-[10px] text-outline block">RELATIVE HUMIDITY</span>
                      <span className="text-xl font-bold text-on-surface block mt-0.5">{activeStation.liveWeather.humidity}%</span>
                      <span className="text-[10px] text-outline-variant">Sublimation regime</span>
                    </div>

                    <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/20">
                      <span className="text-[10px] text-outline block">SOLAR BROADBAND</span>
                      <span className="text-xl font-bold text-primary block mt-0.5">{activeStation.liveWeather.solarRadiation}</span>
                      <span className="text-[10px] text-outline-variant">Pyranometer flux</span>
                    </div>

                    <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/20">
                      <span className="text-[10px] text-outline block">OPTICAL VISIBILITY</span>
                      <span className="text-xl font-bold text-tertiary block mt-0.5">{activeStation.liveWeather.visibility}</span>
                      <span className="text-[10px] text-outline-variant">Forward scatter sensor</span>
                    </div>
                  </div>
                )}

                {/* Tab 2: Scientific Instruments */}
                {activeTab === 'instruments' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activeStation.scientificDisciplines.map((disc, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-surface-container border border-outline-variant/20 flex items-start gap-2">
                          <span className="material-symbols-outlined !text-base text-primary shrink-0 mt-0.5">science</span>
                          <div>
                            <span className="font-semibold text-on-surface block font-['Space_Grotesk']">{disc}</span>
                            <span className="text-[11px] text-outline block mt-0.5">Continuous digital acquisition • Fair Data 4.2</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 rounded-lg bg-surface-container-lowest border border-primary/20 flex items-center justify-between">
                      <span className="text-primary font-semibold">FACILITIES INCLUDED</span>
                      <span className="text-on-surface-variant text-[11px]">Class-1000 Clean Labs • Ice Core Recovery Vault</span>
                    </div>
                  </div>
                )}

                {/* Tab 3: System Diagnostics */}
                {activeTab === 'logistics' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/20">
                      <span className="text-[10px] text-outline block">POWER GENERATION</span>
                      <span className="text-sm font-bold text-on-surface block mt-1">{activeStation.diagnostics.powerLoad}</span>
                      <span className="text-[10px] text-on-surface-variant block mt-0.5">{activeStation.diagnostics.powerSource}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/20">
                      <span className="text-[10px] text-outline block">FUEL AUTONOMY</span>
                      <span className="text-sm font-bold text-emerald-400 block mt-1">{activeStation.diagnostics.fuelReserveDays} Days Reserve</span>
                      <span className="text-[10px] text-on-surface-variant block mt-0.5">Aviation Turbine Fuel (ATF-50)</span>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/20">
                      <span className="text-[10px] text-outline block">SATELLITE UPLINK</span>
                      <span className="text-sm font-bold text-primary block mt-1">{activeStation.diagnostics.satelliteUplink}</span>
                      <span className="text-[10px] text-on-surface-variant block mt-0.5">ISRO GSAT-7R / Inmarsat FleetBroadband</span>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/20">
                      <span className="text-[10px] text-outline block">WATER & STRUCTURAL</span>
                      <span className="text-sm font-bold text-tertiary block mt-1">{activeStation.diagnostics.waterRecycling}</span>
                      <span className="text-[10px] text-on-surface-variant block mt-0.5">{activeStation.diagnostics.structuralHealth}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==============================================================
          COMPARATIVE SECTION: 24-HOUR SURFACE TEMP TREND & TABLE
          ============================================================== */}
      <div className="max-w-7xl mx-auto rounded-2xl bg-surface-container-low border border-outline-variant/30 p-6 sm:p-8 space-y-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
          <div>
            <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold block mb-1">
              AUTONOMOUS INGESTION • REFRESH RATE: 30s
            </span>
            <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-on-surface uppercase">
              Live Micro-Climate Index Across Stations
            </h3>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>4 STATIONS ACTIVE</span>
            </span>
            <span>UTC+00:00 TIME LOCK</span>
          </div>
        </div>

        {/* Comparative Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-surface-container text-on-surface-variant uppercase tracking-wider text-[11px] border-b border-outline-variant/30">
                <th className="py-3 px-4 font-semibold">Station Identifier</th>
                <th className="py-3 px-4 font-semibold">Coordinates</th>
                <th className="py-3 px-4 font-semibold">Ambient Temp</th>
                <th className="py-3 px-4 font-semibold">Wind Vector</th>
                <th className="py-3 px-4 font-semibold">Barometric Pressure</th>
                <th className="py-3 px-4 font-semibold">Relative Humidity</th>
                <th className="py-3 px-4 font-semibold">Radiation</th>
                <th className="py-3 px-4 font-semibold text-right">Operational Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {comparativeData.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => setActiveStationId(row.id)}
                  className={`hover:bg-surface-container-high/60 transition-colors cursor-pointer ${
                    activeStation.id === row.id ? 'bg-surface-container/70' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 font-semibold text-on-surface flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: row.color }} />
                    <span className="font-['Space_Grotesk'] font-bold">{row.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-on-surface-variant">{row.coordinates}</td>
                  <td className="py-3.5 px-4 font-bold" style={{ color: row.color }}>{row.temp}</td>
                  <td className="py-3.5 px-4 text-on-surface">{row.wind}</td>
                  <td className="py-3.5 px-4 text-on-surface">{row.pressure}</td>
                  <td className="py-3.5 px-4 text-on-surface">{row.humidity}</td>
                  <td className="py-3.5 px-4 text-tertiary">{row.solar}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-semibold text-[11px]">
                      {row.linkStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 24-Hour Cryospheric Surface Temp Trend (SVG) */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap items-center justify-between text-xs font-mono text-on-surface-variant">
            <span className="font-semibold text-on-surface uppercase">24-Hour Cryospheric Surface Temp Trend (°C)</span>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-[#35c8e8] inline-block rounded" /> Maitri (-28.4°C)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-[#96ccff] inline-block rounded" /> Bharati (-19.2°C)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-[#b0dbe5] inline-block rounded" /> Himadri (-04.1°C)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-[#adecff] inline-block rounded" /> Himansh (-15.6°C)</span>
            </div>
          </div>

          <div className="w-full h-28 bg-surface-container rounded-xl p-3 overflow-hidden flex items-end border border-outline-variant/20">
            <svg className="w-full h-full text-primary" preserveAspectRatio="none" viewBox="0 0 1000 100">
              {/* Grid lines */}
              <line x1="0" y1="25" x2="1000" y2="25" stroke="#869397" strokeOpacity="0.1" strokeDasharray="3 3" />
              <line x1="0" y1="50" x2="1000" y2="50" stroke="#869397" strokeOpacity="0.1" strokeDasharray="3 3" />
              <line x1="0" y1="75" x2="1000" y2="75" stroke="#869397" strokeOpacity="0.1" strokeDasharray="3 3" />
              
              {/* Maitri: -28C range (lowest line) */}
              <path d="M 0,82 Q 250,92 500,75 T 1000,78" fill="none" stroke="#35c8e8" strokeWidth="2.5" />
              {/* Bharati: -19C range */}
              <path d="M 0,60 Q 250,52 500,64 T 1000,58" fill="none" stroke="#96ccff" strokeWidth="2" />
              {/* Himadri: -4C range (top line) */}
              <path d="M 0,22 Q 250,16 500,28 T 1000,20" fill="none" stroke="#b0dbe5" strokeWidth="2" />
              {/* Himansh: -15C range */}
              <path d="M 0,48 Q 250,60 500,42 T 1000,50" fill="none" stroke="#adecff" strokeDasharray="4 2" strokeWidth="1.8" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
