import React from 'react';

/**
 * ==============================================================================
 * POLARSPHERE BRANDED SECURITY GATEWAY LOADER
 * "The Polar World, Through India's Eyes"
 * ==============================================================================
 * Displayed while validating cryptographic session credentials and establishing
 * connection to the National Polar Data Center security gateway.
 * Prevents any brief flash of protected internal content.
 */
export default function PolarLoadingScreen() {
  return (
    <div 
      className="min-h-screen bg-[#0B1420] text-[#BAC8D3] flex flex-col items-center justify-center font-['Inter'] relative overflow-hidden select-none"
      role="status"
      aria-live="polite"
      aria-label="Validating session credentials"
    >
      {/* Background Cartographic Coordinate Grid */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #34414D 1px, transparent 1px), linear-gradient(to bottom, #34414D 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      {/* Radial Polar Glow Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-radial from-[#9CCFE3]/10 via-transparent to-transparent pointer-events-none blur-3xl" />

      {/* Central Identity & Telemetry Container */}
      <div className="relative z-10 flex flex-col items-center space-y-6 text-center max-w-sm px-6 animate-fadeIn">
        {/* Animated Gyroscope Ring */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#34414D]" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#9CCFE3] border-r-[#70B6C9] animate-spin" />
          <div className="w-12 h-12 rounded-full bg-[#111820] border border-[#34414D] flex items-center justify-center shadow-lg shadow-[#0B1420]">
            <svg 
              className="w-6 h-6 text-[#9CCFE3]" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.8"
            >
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.4" />
              <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeOpacity="0.8" />
              <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" />
              <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" />
            </svg>
          </div>
        </div>

        {/* Textual Hierarchy */}
        <div className="space-y-2">
          <div className="font-['Space_Grotesk'] text-xl font-bold tracking-[0.25em] text-[#F3F6F8] uppercase">
            POLARSPHERE
          </div>
          <div className="font-['IBM_Plex_Mono'] text-[11px] text-[#70B6C9] tracking-[0.2em] uppercase font-semibold">
            VALIDATING ACCREDITATION...
          </div>
          <p className="text-xs text-[#869397] font-['Inter'] leading-relaxed pt-1">
            Establishing secure connection to National Polar Data Center Gateway
          </p>
        </div>

        {/* Discreet Environment Footprint */}
        <div className="pt-2 flex items-center gap-2 font-['IBM_Plex_Mono'] text-[10px] text-[#667481]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#70B6C9] animate-pulse" />
          <span>NCPOR // EXPEDITION INTELLIGENCE DIRECTORY</span>
        </div>
      </div>
    </div>
  );
}
