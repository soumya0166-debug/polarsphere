import React, { useState, useEffect, useRef } from 'react';
import { STATIONS } from '../data/stationsData';

export default function InteractiveGeosphere({ onSelectStation }) {
  const [activeStationId, setActiveStationId] = useState('bharati');
  const [activeProjection, setActiveProjection] = useState('south-polar'); // 'south-polar', 'north-polar', 'global'
  const canvasRef = useRef(null);

  const selectedStation = STATIONS.find(s => s.id === activeStationId) || STATIONS[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.38;

      // Dark space / atmosphere background glow
      const bgGrad = ctx.createRadialGradient(centerX, centerY, radius * 0.2, centerX, centerY, radius * 1.3);
      bgGrad.addColorStop(0, 'rgba(53, 200, 232, 0.15)');
      bgGrad.addColorStop(0.5, 'rgba(0, 80, 95, 0.08)');
      bgGrad.addColorStop(1, 'rgba(9, 20, 31, 0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Outer HUD Ring with tick marks
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle * 0.1);
      ctx.strokeStyle = 'rgba(116, 226, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.15, 0, Math.PI * 2);
      ctx.stroke();

      // Outer ticks
      for (let i = 0; i < 36; i++) {
        const rad = (i * Math.PI) / 18;
        const innerR = radius * 1.12;
        const outerR = i % 3 === 0 ? radius * 1.18 : radius * 1.15;
        ctx.beginPath();
        ctx.moveTo(Math.cos(rad) * innerR, Math.sin(rad) * innerR);
        ctx.lineTo(Math.cos(rad) * outerR, Math.sin(rad) * outerR);
        ctx.strokeStyle = i % 3 === 0 ? 'rgba(116, 226, 255, 0.6)' : 'rgba(116, 226, 255, 0.2)';
        ctx.stroke();
      }
      ctx.restore();

      // Globe Outline & Base Shading
      const globeGrad = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      globeGrad.addColorStop(0, '#16283d');
      globeGrad.addColorStop(0.7, '#0f1a26');
      globeGrad.addColorStop(1, '#060c14');
      ctx.fillStyle = globeGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Globe Rim Glow
      ctx.strokeStyle = '#35c8e8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Latitudinal Circles
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.lineWidth = 0.75;
      ctx.strokeStyle = 'rgba(116, 226, 255, 0.2)';
      [0.25, 0.5, 0.75, 0.9].forEach(factor => {
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * factor, radius * factor * 0.85, 0, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Longitude radial rays rotating
      for (let i = 0; i < 8; i++) {
        const rayAngle = (i * Math.PI) / 4 + angle * 0.05;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(rayAngle) * radius, Math.sin(rayAngle) * radius);
        ctx.strokeStyle = 'rgba(75, 215, 247, 0.12)';
        ctx.stroke();
      }

      // Radar Sweep Effect
      const sweepAngle = angle * 0.8;
      const sweepGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      sweepGrad.addColorStop(0, 'rgba(116, 226, 255, 0.35)');
      sweepGrad.addColorStop(1, 'rgba(116, 226, 255, 0)');
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, sweepAngle, sweepAngle + 0.3);
      ctx.closePath();
      ctx.fillStyle = sweepGrad;
      ctx.fill();
      ctx.restore();

      // Station Pins on Globe
      STATIONS.forEach((st) => {
        let pinX = 0;
        let pinY = 0;

        if (activeProjection === 'south-polar') {
          // Centered on South Pole
          if (st.region === 'Antarctica') {
            const rad = ((st.lng - 60) * Math.PI) / 180 + angle * 0.02;
            const dist = radius * (0.35 + (st.lat + 70) * 0.02);
            pinX = Math.cos(rad) * dist;
            pinY = Math.sin(rad) * dist;
          } else if (st.region === 'Himalaya') {
            const rad = (30 * Math.PI) / 180;
            pinX = Math.cos(rad) * radius * 0.78;
            pinY = Math.sin(rad) * radius * 0.78;
          } else {
            pinX = -radius * 0.82;
            pinY = -radius * 0.25;
          }
        } else if (activeProjection === 'north-polar') {
          if (st.region === 'Arctic') {
            const rad = ((st.lng - 10) * Math.PI) / 180 + angle * 0.02;
            pinX = Math.cos(rad) * radius * 0.35;
            pinY = Math.sin(rad) * radius * 0.35;
          } else {
            pinX = radius * 0.65;
            pinY = radius * 0.55;
          }
        } else {
          // Global Projection
          const normLng = ((st.lng + 180) / 360) * 2 - 1;
          const normLat = -(st.lat / 90);
          pinX = normLng * radius * 0.75;
          pinY = normLat * radius * 0.75;
        }

        const isSelected = st.id === activeStationId;

        // Draw Pin Pulse
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(pinX, pinY, 14 + Math.sin(angle * 3) * 4, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(116, 226, 255, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Draw Pin Center
        ctx.beginPath();
        ctx.arc(pinX, pinY, isSelected ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#74e2ff' : '#35c8e8';
        ctx.fill();
        ctx.strokeStyle = '#09141f';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Pin Label
        ctx.font = isSelected ? '600 11px "Space Grotesk"' : '400 9px "JetBrains Mono"';
        ctx.fillStyle = isSelected ? '#ffffff' : '#bcc9cd';
        ctx.fillText(st.shortName.toUpperCase(), pinX + 8, pinY + 3);
      });

      ctx.restore();

      angle += 0.015;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeStationId, activeProjection]);

  return (
    <div id="interactive-globe" className="relative w-full rounded-2xl bg-surface-container-low border border-outline-variant/30 overflow-hidden shadow-2xl">
      {/* HUD Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-outline-variant/30 bg-surface-container/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
          <div>
            <h3 className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wider text-on-surface">
              Interactive Polar Geosphere & Station Array
            </h3>
            <p className="font-mono text-[11px] text-outline">
              REAL-TIME GEOSPATIAL PROJECTION // SYS: SYNCHRONIZED
            </p>
          </div>
        </div>

        {/* Projection Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-surface-container-lowest border border-outline-variant/30 font-['Space_Grotesk'] text-xs">
          <button
            onClick={() => setActiveProjection('south-polar')}
            className={`px-3 py-1 rounded transition-colors ${
              activeProjection === 'south-polar'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            South Polar (Antarctica)
          </button>
          <button
            onClick={() => setActiveProjection('north-polar')}
            className={`px-3 py-1 rounded transition-colors ${
              activeProjection === 'north-polar'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            North Polar (Arctic)
          </button>
          <button
            onClick={() => setActiveProjection('global')}
            className={`px-3 py-1 rounded transition-colors ${
              activeProjection === 'global'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Tri-Polar Grid
          </button>
        </div>
      </div>

      {/* Main Geosphere Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: Interactive Canvas Map */}
        <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center p-4 bg-polar-grid">
          <canvas
            ref={canvasRef}
            width={580}
            height={460}
            className="w-full max-w-[580px] h-auto object-contain cursor-crosshair"
          />

          {/* Canvas Overlays & Reticles */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-outline space-y-0.5 pointer-events-none">
            <div>FOV: 120° ORTHOGRAPHIC</div>
            <div>PROJ: {activeProjection.toUpperCase()}</div>
            <div>COORDS: 89°59′S / 00°00′W</div>
          </div>

          <div className="absolute bottom-4 left-4 font-mono text-[10px] text-primary flex items-center gap-2 pointer-events-none bg-surface-container-lowest/80 px-2.5 py-1 rounded border border-outline-variant/30">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
            <span>BEACON: {selectedStation.shortName.toUpperCase()} ACTIVE</span>
          </div>
        </div>

        {/* Right: Station Telemetry Card */}
        <div className="lg:col-span-5 p-6 border-t lg:border-t-0 lg:border-l border-outline-variant/30 bg-surface-container/40 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Station Selector Pills */}
            <div>
              <label className="block text-[11px] font-mono text-outline uppercase tracking-wider mb-2">
                Select High-Latitude Station:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {STATIONS.map((station) => (
                  <button
                    key={station.id}
                    onClick={() => setActiveStationId(station.id)}
                    className={`p-2.5 rounded text-left border transition-all ${
                      activeStationId === station.id
                        ? 'bg-surface-container-high border-primary text-on-surface shadow-md shadow-primary/10'
                        : 'bg-surface-container-low border-outline-variant/30 text-on-surface-variant hover:border-outline hover:text-on-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-['Space_Grotesk'] text-xs font-bold uppercase">
                        {station.shortName}
                      </span>
                      <span className={`text-[10px] font-mono px-1 rounded ${activeStationId === station.id ? 'bg-primary/20 text-primary' : 'text-outline'}`}>
                        {station.region}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-primary font-medium mt-1">
                      {station.liveWeather.temp}{station.liveWeather.tempUnit}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Station Telemetry Card */}
            <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/40 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-semibold">
                    {selectedStation.code} // {selectedStation.region}
                  </span>
                  <h4 className="font-['Space_Grotesk'] text-lg font-bold text-on-surface leading-tight mt-0.5">
                    {selectedStation.name}
                  </h4>
                  <p className="text-xs font-mono text-outline mt-0.5">
                    {selectedStation.coordinates} • Elev: {selectedStation.altitude}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {selectedStation.statusBadge}
                </span>
              </div>

              {/* Weather Telemetry Matrix */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-outline-variant/30 font-mono">
                <div className="p-2 rounded bg-surface-container-low/60 border border-outline-variant/20">
                  <div className="text-[10px] text-outline">TEMP</div>
                  <div className="text-base font-bold text-primary">
                    {selectedStation.liveWeather.temp}°C
                  </div>
                  <div className="text-[9px] text-outline-variant">Chill: {selectedStation.liveWeather.windChill}°C</div>
                </div>

                <div className="p-2 rounded bg-surface-container-low/60 border border-outline-variant/20">
                  <div className="text-[10px] text-outline">WIND</div>
                  <div className="text-base font-bold text-on-surface">
                    {selectedStation.liveWeather.windSpeed} kt
                  </div>
                  <div className="text-[9px] text-outline-variant">{selectedStation.liveWeather.windDirection}</div>
                </div>

                <div className="p-2 rounded bg-surface-container-low/60 border border-outline-variant/20">
                  <div className="text-[10px] text-outline">PRESSURE</div>
                  <div className="text-base font-bold text-on-surface">
                    {selectedStation.liveWeather.pressure}
                  </div>
                  <div className="text-[9px] text-outline-variant">hPa</div>
                </div>
              </div>

              {/* Station Summary */}
              <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2 font-['Inter']">
                {selectedStation.description}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-4 pt-4 border-t border-outline-variant/30 flex items-center justify-between gap-3">
            <div className="text-[11px] font-mono text-outline">
              CREW: <span className="text-on-surface font-semibold">{selectedStation.personnel.current} wintering scientists</span>
            </div>
            <button
              onClick={() => onSelectStation && onSelectStation(selectedStation.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-primary text-on-primary hover:bg-primary-fixed font-['Space_Grotesk'] text-xs font-bold tracking-wider transition-all duration-200 shadow-md shadow-primary/20 hover:scale-[1.02]"
            >
              <span>STATION CONSOLE</span>
              <span className="material-symbols-outlined !text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
