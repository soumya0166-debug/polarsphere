import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 text-on-surface-variant">
      {/* Upper Footer: Institutional Identity & Telemetry */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1 & 2: Institutional Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://lh3.googleusercontent.com/aida/AEtjO1X8AdMd5RbcnkFT3Peu1c6aAIDJqd-b6vaG-zYGWiTfXxVWyK83d-vrEjBWTlIOuvAvhUxuF4AOFw_c350kvr-9iwiJvL-Q5B5gdnUdxK6l_E7c_z0rK5d72LIqVc0Goi9RvYnmkY7Kd86bLDHmszPdc60zZAkQLARMVe7H-BiagBn6rF1X8CFwHlMBNfzfEr3PQ1NvivR06RS3qTMU7wrqvRPo4c6q9WYEqiWROwo61xlcmyqRoXbzbjQ" 
                alt="POLARSPHERE" 
                className="h-10 w-auto object-contain"
              />
              <div>
                <h3 className="font-['Space_Grotesk'] text-lg font-bold text-on-surface tracking-wider uppercase leading-none">
                  POLARSPHERE
                </h3>
                <p className="font-['Space_Grotesk'] text-xs text-primary font-medium tracking-widest mt-0.5">
                  The Polar World, Through India's Eyes
                </p>
              </div>
            </div>

            <p className="text-sm text-on-surface-variant leading-relaxed max-w-md">
              A high-precision scientific digital suite stewarded under the Ministry of Earth Sciences (MoES), Government of India, interconnecting telemetry, cryospheric archives, and field expeditions across Antarctica, the Arctic, the Southern Ocean, and the Himalaya.
            </p>

            {/* Live Operational Status Capsule */}
            <div className="p-3 rounded bg-surface-container-low border border-outline-variant/30 font-mono text-xs space-y-1.5 max-w-md">
              <div className="flex items-center justify-between text-on-surface">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>GLOBAL GRID TELEMETRY</span>
                </span>
                <span className="text-primary font-semibold">ALL 4 BASES SYNCED</span>
              </div>
              <div className="flex justify-between text-[11px] text-outline">
                <span>NCPOR HEADLAND SADA, GOA</span>
                <span>LAT: 15.40°N | LON: 73.80°E</span>
              </div>
            </div>
          </div>

          {/* Col 3: Polar Stations */}
          <div className="space-y-3">
            <h4 className="font-['Space_Grotesk'] text-xs font-bold text-on-surface tracking-widest uppercase text-primary">
              High-Latitude Outposts
            </h4>
            <ul className="space-y-2 text-sm font-['Space_Grotesk']">
              <li>
                <button onClick={() => onNavigate('stations')} className="hover:text-primary transition-colors text-left">
                  Bharati Station <span className="text-[11px] font-mono text-outline block">Larsemann Hills, Antarctica</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('stations')} className="hover:text-primary transition-colors text-left">
                  Maitri Station <span className="text-[11px] font-mono text-outline block">Schirmacher Oasis, Antarctica</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('stations')} className="hover:text-primary transition-colors text-left">
                  Himadri Base <span className="text-[11px] font-mono text-outline block">Ny-Ålesund, Svalbard, Arctic</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('stations')} className="hover:text-primary transition-colors text-left">
                  Himansh Station <span className="text-[11px] font-mono text-outline block">Spiti, Western Himalaya (4080m)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Active Expeditions */}
          <div className="space-y-3">
            <h4 className="font-['Space_Grotesk'] text-xs font-bold text-on-surface tracking-widest uppercase text-primary">
              Scientific Expeditions
            </h4>
            <ul className="space-y-2 text-sm font-['Space_Grotesk']">
              <li>
                <button onClick={() => onNavigate('expeditions')} className="hover:text-primary transition-colors text-left">
                  44th ISEA Antarctica <span className="text-[11px] font-mono text-emerald-400 block">● ACTIVE AT SEA (MV Golovnin)</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('expeditions')} className="hover:text-primary transition-colors text-left">
                  Ny-Ålesund Arctic Fjord <span className="text-[11px] font-mono text-outline block">Kongsfjorden Biogeochemistry</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('expeditions')} className="hover:text-primary transition-colors text-left">
                  Southern Ocean Cruise <span className="text-[11px] font-mono text-outline block">ORV Sagar Nidhi SO-13</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('expeditions')} className="hover:text-primary transition-colors text-left">
                  Chandra Basin Glaciology <span className="text-[11px] font-mono text-outline block">Chhota Shigri Mass Balance</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Open Science & Data */}
          <div className="space-y-3">
            <h4 className="font-['Space_Grotesk'] text-xs font-bold text-on-surface tracking-widest uppercase text-primary">
              Data & Governance
            </h4>
            <ul className="space-y-2 text-sm font-['Space_Grotesk']">
              <li>
                <button onClick={() => onNavigate('data')} className="hover:text-primary transition-colors text-left">
                  NPDC Open Data Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('data')} className="hover:text-primary transition-colors text-left">
                  FAIR Implementation Matrix
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-primary transition-colors text-left">
                  Polar Geosphere HUD
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('architecture')} className="text-primary hover:text-primary-fixed transition-colors text-left flex items-center gap-1.5 font-medium">
                  <span className="material-symbols-outlined !text-sm text-primary">account_tree</span>
                  <span>SIH Solution Architecture</span>
                  <span className="text-[9px] font-mono uppercase px-1 py-0.2 bg-primary/20 text-primary rounded border border-primary/40">NEW</span>
                </button>
              </li>
              <li>
                <a 
                  href="/architecture_presentation.html" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary transition-colors text-left flex items-center gap-1.5 text-xs text-on-surface-variant"
                >
                  <span className="material-symbols-outlined !text-xs text-outline">slideshow</span>
                  <span>16:9 Presentation Slide (Pitch Mode)</span>
                </a>
              </li>
              <li>
                <span className="text-outline text-xs block pt-1">
                  Compliance:
                </span>
                <span className="text-[11px] font-mono text-on-surface block">
                  Antarctic Treaty Protocol on Environmental Protection
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower Institutional Bar */}
        <div className="mt-12 pt-6 border-t border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-outline">
          <div>
            © {new Date().getFullYear()} National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences.
          </div>
          <div className="flex items-center gap-6">
            <span>FAIR DATA COMPLIANT</span>
            <span>WMO CORE EXCHANGE</span>
            <span>CC-BY 4.0 OPEN SCIENCE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
