import React from 'react';
import InteractiveGeosphere from '../components/InteractiveGeosphere';
import { STATIONS } from '../data/stationsData';
import { ACTIVE_EXPEDITIONS } from '../data/expeditionsData';
import { POLAR_DATASETS } from '../data/datasetsData';

export default function HomePage({ onNavigate, onOpenGuide }) {
  const featuredExpedition = ACTIVE_EXPEDITIONS.find(e => e.id === 'isea-44') || ACTIVE_EXPEDITIONS[0];

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-8 overflow-hidden bg-polar-aurora">
        {/* Subtle background glow & grid lines */}
        <div className="absolute inset-0 bg-polar-grid pointer-events-none opacity-40"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-primary/30 text-xs font-mono text-primary shadow-sm shadow-primary/10">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-semibold">MINISTRY OF EARTH SCIENCES // NCPOR REPOSITORY</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface leading-[1.1] uppercase">
              The Polar World, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-fixed to-secondary">
                Through India’s Eyes
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-on-surface-variant font-['Inter'] leading-relaxed max-w-2xl">
              Unified telemetry, open cryospheric data, and active expedition archives from Maitri, Bharati, Himadri, and Himansh across Antarctica, the Arctic, the Southern Ocean, and the Himalaya.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#interactive-globe"
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-primary text-on-primary hover:bg-primary-fixed font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xl shadow-primary/20 hover:scale-[1.02] group"
              >
                <span>ENTER POLARSPHERE</span>
                <span className="material-symbols-outlined !text-base transition-transform duration-200 group-hover:translate-x-1">
                  arrow_forward
                </span>
              </a>

              <button
                onClick={() => onNavigate('stations')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded bg-surface-container-high hover:bg-surface-bright text-on-surface border border-outline-variant/40 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-all"
              >
                <span className="material-symbols-outlined !text-base text-primary">domain</span>
                <span>STATION TELEMETRY</span>
              </button>

              <button
                onClick={() => onNavigate('expeditions')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded bg-surface-container-high hover:bg-surface-bright text-on-surface border border-outline-variant/40 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-all"
              >
                <span className="material-symbols-outlined !text-base text-primary">directions_boat</span>
                <span>EXPLORE EXPEDITIONS</span>
              </button>
            </div>
          </div>

          {/* Live Station Meteorological Capsule Strip */}
          <div className="mt-12 pt-8 border-t border-outline-variant/30">
            <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-outline">
              <span>LIVE POLAR OBSERVATION NETWORK // AUTO-REFRESH 60s</span>
              <span className="text-primary font-semibold">ALL 4 OUTPOSTS ONLINE</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 font-mono">
              {STATIONS.map((station) => (
                <div
                  key={station.id}
                  onClick={() => onNavigate('stations', station.id)}
                  className="p-3 sm:p-4 rounded-xl bg-surface-container-low/90 border border-outline-variant/30 hover:border-primary/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-['Space_Grotesk'] font-bold text-on-surface group-hover:text-primary transition-colors">
                      {station.shortName}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-primary mt-1">
                    {station.liveWeather.temp}{station.liveWeather.tempUnit}
                  </div>
                  <div className="text-[11px] text-outline flex items-center justify-between mt-1">
                    <span>{station.region}</span>
                    <span>{station.liveWeather.windSpeed} kt</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Interactive Polar Geosphere */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 space-y-1">
          <div className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
            TERRESTRIAL TELEMETRY & SPATIAL HUBS
          </div>
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-on-surface tracking-tight uppercase">
            Interactive Polar Geosphere
          </h2>
          <p className="text-sm text-on-surface-variant font-['Inter']">
            Explore India's research outposts in Antarctica, Svalbard, and the Himalaya with real-time multi-angle planetary projections.
          </p>
        </div>

        <InteractiveGeosphere onSelectStation={(stationId) => onNavigate('stations', stationId)} />
      </section>

      {/* Section 2: India's Four High-Latitude Bastions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
              YEAR-ROUND SCIENTIFIC PRESENCE
            </span>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-on-surface tracking-tight uppercase mt-1">
              India’s Four High-Latitude Bastions
            </h2>
            <p className="text-sm text-on-surface-variant font-['Inter'] max-w-2xl mt-1">
              From the sea-ice frontiers of Antarctica to the High Arctic and alpine Himalayan glaciers, discover our permanent observatories.
            </p>
          </div>

          <button
            onClick={() => onNavigate('stations')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-surface-container-high hover:bg-surface-bright text-xs font-['Space_Grotesk'] font-bold text-primary border border-outline-variant/30 tracking-wider"
          >
            <span>VIEW ALL STATION TELEMETRY</span>
            <span className="material-symbols-outlined !text-base">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATIONS.map((station) => (
            <div
              key={station.id}
              onClick={() => onNavigate('stations', station.id)}
              className="rounded-2xl bg-surface-container-low border border-outline-variant/30 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 flex flex-col justify-between cursor-pointer group"
            >
              {/* Station Image */}
              <div className="relative h-48 w-full overflow-hidden bg-surface-container">
                <img
                  src={station.image}
                  alt={station.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-[10px] font-mono text-primary border border-outline-variant/40">
                  {station.region}
                </div>
                <div className="absolute bottom-3 left-3 text-xs font-mono text-on-surface font-semibold">
                  EST. {station.establishedYear} • {station.altitude}
                </div>
              </div>

              {/* Station Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-['Space_Grotesk'] text-lg font-bold text-on-surface group-hover:text-primary transition-colors leading-tight">
                    {station.name}
                  </h3>
                  <p className="text-xs font-mono text-outline">
                    {station.coordinates}
                  </p>
                  <p className="text-xs text-on-surface-variant font-['Inter'] line-clamp-3 leading-relaxed">
                    {station.description}
                  </p>
                </div>

                {/* Card Footer Live Stats */}
                <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-outline text-[10px] block">AMBIENT TEMP</span>
                    <span className="text-primary font-bold text-sm">
                      {station.liveWeather.temp}{station.liveWeather.tempUnit}
                    </span>
                  </div>
                  <div>
                    <span className="text-outline text-[10px] block">WINTER CREW</span>
                    <span className="text-on-surface font-semibold text-sm">
                      {station.personnel.winter} Scientists
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Live Polar Meteorological Conditions Sensor Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-surface-container-low border border-outline-variant/30 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
            <div>
              <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
                SURFACE SENSOR TELEMETRY
              </span>
              <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-on-surface tracking-tight uppercase mt-0.5">
                Live Polar Meteorological Conditions
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-outline">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>CALIBRATED IMD & NCPOR AUTOMATED WEATHER STATIONS (AWS)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            {STATIONS.map((station) => (
              <div key={station.id} className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-['Space_Grotesk'] font-bold text-sm text-on-surface">{station.shortName}</span>
                  <span className="text-[10px] text-primary font-medium">{station.region}</span>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {station.liveWeather.temp}°C
                </div>
                <div className="space-y-1 text-[11px] text-on-surface-variant">
                  <div className="flex justify-between">
                    <span className="text-outline">Wind Velocity:</span>
                    <span>{station.liveWeather.windSpeed} kt ({station.liveWeather.windDirection})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-outline">Wind Chill:</span>
                    <span>{station.liveWeather.windChill}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-outline">Pressure:</span>
                    <span>{station.liveWeather.pressure} hPa</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-outline">Solar Radiation:</span>
                    <span>{station.liveWeather.solarRadiation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Featured Active Field Expedition (ISEA-44) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
              FIELDWORK & MARITIME OPERATIONS
            </span>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-on-surface tracking-tight uppercase mt-1">
              Active Field Expeditions
            </h2>
            <p className="text-sm text-on-surface-variant font-['Inter'] max-w-2xl mt-1">
              Track vessel transits, scientific teams, and dispatch logs across ongoing Indian polar deployments.
            </p>
          </div>

          <button
            onClick={() => onNavigate('expeditions')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-surface-container-high hover:bg-surface-bright text-xs font-['Space_Grotesk'] font-bold text-primary border border-outline-variant/30 tracking-wider"
          >
            <span>MISSION CONTROL CENTER</span>
            <span className="material-symbols-outlined !text-base">arrow_forward</span>
          </button>
        </div>

        {/* Featured ISEA-44 Mission Banner */}
        <div className="rounded-2xl bg-surface-container-low border border-outline-variant/40 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-5 relative min-h-[260px] bg-surface-container">
            <img
              src={featuredExpedition.heroImage}
              alt={featuredExpedition.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-surface-container-low"></div>
            <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/60 backdrop-blur-md text-xs font-mono text-emerald-400 border border-emerald-500/30 font-semibold">
              {featuredExpedition.status}
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-mono text-outline uppercase tracking-wider">
                FLAGSHIP SCIENTIFIC VOYAGE // 2025–2026
              </div>
              <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-on-surface leading-tight">
                {featuredExpedition.name}
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant font-['Inter'] leading-relaxed">
                Aboard polar chartered vessel <span className="text-on-surface font-semibold">{featuredExpedition.vessel}</span> carrying 54 wintering scientists, glaciologists, and logistical personnel across the Roaring Forties to Prydz Bay.
              </p>

              {/* Waypoint Coordinates Pill Box */}
              <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 font-mono text-xs space-y-1.5">
                <div className="flex items-center justify-between text-primary font-semibold">
                  <span>CURRENT POSITION:</span>
                  <span>{featuredExpedition.currentTelemetry.lat}, {featuredExpedition.currentTelemetry.lng}</span>
                </div>
                <div className="flex items-center justify-between text-outline text-[11px]">
                  <span>TRANSIT SPEED: {featuredExpedition.currentTelemetry.speed}</span>
                  <span>ICE COVER: {featuredExpedition.currentTelemetry.seaIceCover}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-outline-variant/30">
              <div className="text-xs font-mono text-outline">
                VOYAGE LEADER: <span className="text-on-surface font-semibold">{featuredExpedition.leader}</span>
              </div>
              <button
                onClick={() => onNavigate('expeditions', featuredExpedition.id)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded bg-primary text-on-primary hover:bg-primary-fixed font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-primary/20"
              >
                <span>LIVE MISSION CONTROL HUD</span>
                <span className="material-symbols-outlined !text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Understand the Polar World (Science Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
            GLOBAL SCIENCE CONVERGENCE
          </span>
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-on-surface tracking-tight uppercase">
            Understand the Polar World
          </h2>
          <p className="text-sm text-on-surface-variant font-['Inter']">
            Discover the critical scientific domains investigated by Indian researchers across the cryosphere and oceans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Cryosphere & Sea Ice',
              icon: 'ac_unit',
              desc: 'Monitoring ice sheet thickness, calving rates, and high-altitude Himalayan glacier melt to safeguard downstream freshwater resources.',
              metric: '69% Freshwater Stored'
            },
            {
              title: 'Monsoon Teleconnections',
              icon: 'air',
              desc: 'Unraveling the deep atmospheric coupling between Arctic amplification, Antarctic sea-ice fluctuations, and Indian summer rainfall patterns.',
              metric: 'Southern Annular Mode'
            },
            {
              title: 'Ocean Acidification',
              icon: 'water',
              desc: 'Profiling Southern Ocean carbon sink capacity and aragonite under-saturation levels affecting calcifying marine organisms.',
              metric: '40°S to 68°S Transects'
            },
            {
              title: 'Paleoclimate Deep Cores',
              icon: 'history_edu',
              desc: 'Drilling ice and lake sediment cores to reconstruct greenhouse gas concentrations and solar variations over the last 100,000 years.',
              metric: '800,000 yr Archives'
            }
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-4 hover:border-primary/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined !text-2xl">{pillar.icon}</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-['Space_Grotesk'] text-base font-bold text-on-surface">
                  {pillar.title}
                </h3>
                <span className="text-[10px] font-mono text-primary font-semibold block uppercase">
                  {pillar.metric}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-['Inter'] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: Open Science Data & Telemetry Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-surface-container-low to-surface-container border border-outline-variant/40 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
              NATIONAL POLAR DATA CENTER (NPDC)
            </span>
            <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-on-surface">
              FAIR-Compliant Polar Data Explorer
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant font-['Inter'] leading-relaxed">
              Access calibrated time-series, LiDAR point clouds, sediment cores, and GNSS datasets with DOIs, metadata standards, and programmatic Python/cURL APIs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('data')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-primary text-on-primary hover:bg-primary-fixed font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-primary/20"
            >
              <span>EXPLORE DATASETS</span>
              <span className="material-symbols-outlined !text-base">arrow_forward</span>
            </button>
            <button
              onClick={onOpenGuide}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-surface-container-high hover:bg-surface-bright text-xs font-['Space_Grotesk'] font-bold text-primary border border-outline-variant/30 tracking-wider"
            >
              <span className="material-symbols-outlined !text-base text-primary">smart_toy</span>
              <span>ASK POLAR GUIDE</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
