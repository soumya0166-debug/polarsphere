import React from 'react';

export default function DesignTokensModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const colorPalettes = [
    {
      name: 'Primary Polar Aqua & Cyan',
      shades: [
        { code: '#adecff', name: 'Primary Fixed', textDark: true },
        { code: '#74e2ff', name: 'Primary Core', textDark: true },
        { code: '#35c8e8', name: 'Primary Container', textDark: true },
        { code: '#00505f', name: 'On Primary Container', textDark: false },
        { code: '#003641', name: 'On Primary Core', textDark: false },
      ]
    },
    {
      name: 'Secondary Glacial Deep Blue',
      shades: [
        { code: '#cee5ff', name: 'Secondary Fixed', textDark: true },
        { code: '#96ccff', name: 'Secondary Bright', textDark: true },
        { code: '#005688', name: 'Secondary Container', textDark: false },
        { code: '#003353', name: 'On Secondary', textDark: false },
        { code: '#001d32', name: 'Secondary Dark', textDark: false },
      ]
    },
    {
      name: 'Cryosphere Amber Alert & Aurora',
      shades: [
        { code: '#fef3c7', name: 'Warning Light', textDark: true },
        { code: '#fbbf24', name: 'Warning Amber', textDark: true },
        { code: '#f59e0b', name: 'Warning Core', textDark: true },
        { code: '#d97706', name: 'Warning Deep', textDark: false },
        { code: '#78350f', name: 'On Warning', textDark: false },
      ]
    },
    {
      name: 'Surface & Atmospheric Slate',
      shades: [
        { code: '#2f3a47', name: 'Surface Bright', textDark: false },
        { code: '#202b37', name: 'Container High', textDark: false },
        { code: '#16202c', name: 'Container Base', textDark: false },
        { code: '#111c28', name: 'Container Low', textDark: false },
        { code: '#09141f', name: 'Surface Void', textDark: false },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/85 backdrop-blur-md animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface-container-low border border-outline-variant/40 rounded-2xl shadow-2xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-[10px] font-mono text-primary uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              FIGMA SPECIFICATION: POLAR CLIMATE // DESIGN SYSTEM
            </div>
            <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-on-surface mt-1">
              PolarSphere Design System & Tokens
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded transition-colors"
          >
            <span className="material-symbols-outlined !text-xl">close</span>
          </button>
        </div>

        {/* Section 1: Color Palettes */}
        <div className="space-y-6 mb-8">
          <h3 className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
            <span className="material-symbols-outlined !text-base">palette</span>
            <span>COLOR PALETTES & HUE RAMPS (AS DISPLAYED IN FIGMA CANVAS)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {colorPalettes.map((palette, pIdx) => (
              <div key={pIdx} className="p-4 rounded-xl bg-surface-container border border-outline-variant/30">
                <span className="text-xs font-['Space_Grotesk'] font-semibold text-on-surface block mb-3">
                  {palette.name}
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {palette.shades.map((shade, sIdx) => (
                    <div key={sIdx} className="flex flex-col items-center">
                      <div 
                        className="w-full h-12 rounded-md shadow-inner flex items-center justify-center border border-white/10"
                        style={{ backgroundColor: shade.code }}
                      >
                        <span className={`text-[9px] font-mono font-bold ${shade.textDark ? 'text-slate-900' : 'text-slate-100'}`}>
                          {shade.code}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-on-surface-variant truncate w-full text-center mt-1">
                        {shade.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Typography Hierarchy */}
        <div className="space-y-4 mb-8">
          <h3 className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
            <span className="material-symbols-outlined !text-base">text_fields</span>
            <span>TYPOGRAPHY HIERARCHY (Aa SAMPLES)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
              <div>
                <span className="text-3xl font-bold font-['Space_Grotesk'] text-primary">Aa</span>
                <div className="text-xs font-['Space_Grotesk'] font-bold text-on-surface mt-2">Space Grotesk</div>
                <div className="text-[10px] font-mono text-on-surface-variant">Display & Headlines</div>
              </div>
              <p className="text-xs font-['Space_Grotesk'] text-on-surface mt-3 leading-tight uppercase font-bold">
                THE POLAR WORLD, THROUGH INDIA'S EYES.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
              <div>
                <span className="text-3xl font-normal font-['Inter'] text-secondary">Aa</span>
                <div className="text-xs font-['Inter'] font-semibold text-on-surface mt-2">Inter</div>
                <div className="text-[10px] font-mono text-on-surface-variant">Body & Descriptive Text</div>
              </div>
              <p className="text-xs font-['Inter'] text-on-surface-variant mt-3 leading-relaxed">
                Autonomous cryospheric telemetry, deep-ice core research, and polar marine observation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
              <div>
                <span className="text-3xl font-medium font-mono text-tertiary">Aa</span>
                <div className="text-xs font-mono font-semibold text-on-surface mt-2">JetBrains Mono</div>
                <div className="text-[10px] font-mono text-on-surface-variant">Telemetry, Lat/Long & Diagnostics</div>
              </div>
              <p className="text-xs font-mono text-tertiary mt-3">
                LAT: 70°45′S // ORBIT #18,491 // PING: 18ms
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Component Controls */}
        <div className="space-y-4">
          <h3 className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
            <span className="material-symbols-outlined !text-base">smart_button</span>
            <span>FORM CONTROLS & BUTTON SPECIFICATIONS</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button className="py-2.5 px-4 rounded-md bg-primary-container text-on-primary-container font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-[0_0_15px_rgba(53,200,232,0.35)] flex items-center justify-center gap-2">
              <span>Primary Cyan</span>
              <span className="material-symbols-outlined !text-sm">arrow_forward</span>
            </button>

            <button className="py-2.5 px-4 rounded-md bg-surface-container-high hover:bg-surface-container-highest text-tertiary font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider border border-outline-variant/30 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined !text-sm text-primary">sensors</span>
              <span>Secondary Ghost</span>
            </button>

            <button className="py-2.5 px-4 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-['Space_Grotesk'] text-xs font-semibold uppercase tracking-wider border border-amber-500/30 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined !text-sm">warning</span>
              <span>Amber Warning</span>
            </button>

            <div className="flex items-center justify-center gap-1.5">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-primary/10 text-primary border border-primary/30">
                ACTIVE
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                ONLINE
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-surface-container text-on-surface-variant border border-outline-variant/30">
                LEVEL 4
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
