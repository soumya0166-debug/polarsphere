import React, { useState } from 'react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenSearch, 
  onOpenGuide, 
  currentUser, 
  onOpenAuthModal, 
  onLogout,
  onOpenDesignTokens 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME', icon: 'home' },
    { id: 'explore', label: 'EXPLORE', icon: 'travel_explore' },
    { id: 'stations', label: 'STATIONS', icon: 'domain' },
    { id: 'expeditions', label: 'EXPEDITIONS', icon: 'directions_boat' },
    { id: 'data', label: 'DATA', icon: 'database' },
    { id: 'auth', label: currentUser ? 'MY DOSSIER' : 'PORTAL SIGN IN', icon: 'key', isSpecial: true },
    { id: 'architecture', label: 'SIH ARCHITECTURE', icon: 'account_tree', isFeatured: true },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/90 backdrop-blur-md border-b border-outline-variant/30">
      {/* Topmost Institutional Banner */}
      <div className="bg-surface-container-lowest/80 border-b border-outline-variant/20 px-4 sm:px-8 py-1 flex items-center justify-between text-[11px] font-mono tracking-wider text-on-surface-variant">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="hidden sm:inline text-primary font-medium">MINISTRY OF EARTH SCIENCES // GOVT. OF INDIA</span>
          <span className="sm:hidden text-primary font-medium">MoES // NCPOR</span>
          <span className="text-outline-variant">|</span>
          <span>NCPOR POLAR REPOSITORY</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          {currentUser ? (
            <span className="text-emerald-400 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              AUTH: {currentUser.name.toUpperCase()} [{currentUser.station?.split(' ')[0] || 'NCPOR'}]
            </span>
          ) : (
            <span className="hidden md:inline text-tertiary">SYS: ONLINE // 4 BASES ACTIVE</span>
          )}
          <span className="text-primary-container font-mono">TEL-PING: 18ms</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <img 
            src="https://lh3.googleusercontent.com/aida/AEtjO1X8AdMd5RbcnkFT3Peu1c6aAIDJqd-b6vaG-zYGWiTfXxVWyK83d-vrEjBWTlIOuvAvhUxuF4AOFw_c350kvr-9iwiJvL-Q5B5gdnUdxK6l_E7c_z0rK5d72LIqVc0Goi9RvYnmkY7Kd86bLDHmszPdc60zZAkQLARMVe7H-BiagBn6rF1X8CFwHlMBNfzfEr3PQ1NvivR06RS3qTMU7wrqvRPo4c6q9WYEqiWROwo61xlcmyqRoXbzbjQ" 
            alt="POLARSPHERE Logo" 
            className="h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-['Space_Grotesk'] text-lg font-bold tracking-wider text-on-surface uppercase leading-none group-hover:text-primary transition-colors">
              POLARSPHERE
            </span>
            <span className="font-['Space_Grotesk'] text-[10px] text-on-surface-variant uppercase tracking-widest mt-0.5 font-medium">
              India Polar Observation Suite
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1.5 rounded text-xs font-['Space_Grotesk'] font-medium tracking-wider transition-all duration-150 flex items-center gap-1.5 ${
                activeTab === item.id
                  ? 'bg-surface-container-high text-primary border border-primary/40 shadow-sm shadow-primary/20'
                  : item.isFeatured
                  ? 'text-primary/90 bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:text-primary shadow-sm shadow-primary/10'
                  : item.isSpecial
                  ? 'text-secondary bg-secondary/10 border border-secondary/30 hover:bg-secondary/20 hover:text-white'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              {item.isFeatured && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              )}
              {item.isSpecial && (
                <span className="material-symbols-outlined !text-sm">
                  {currentUser ? 'verified' : 'vpn_key'}
                </span>
              )}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions: Search, Design Tokens, Polar Guide, Auth Button */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Design Tokens Palette Button */}
          {onOpenDesignTokens && (
            <button
              onClick={onOpenDesignTokens}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/30 text-on-surface-variant hover:text-primary text-xs font-mono transition-colors"
              title="View Polar Climate Design Tokens (Figma Spec)"
            >
              <span className="material-symbols-outlined !text-base text-primary">palette</span>
              <span className="hidden xl:inline text-[11px]">TOKENS</span>
            </button>
          )}

          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/40 text-on-surface-variant hover:text-on-surface text-xs font-mono transition-colors"
            title="Search PolarSphere (Ctrl+K)"
          >
            <span className="material-symbols-outlined !text-base text-primary">search</span>
            <span className="hidden md:inline">SEARCH</span>
            <kbd className="hidden lg:inline text-[10px] bg-surface-container px-1 py-0.5 rounded text-outline border border-outline-variant/30">
              ⌘K
            </kbd>
          </button>

          {/* Polar Guide AI Trigger */}
          <button
            onClick={onOpenGuide}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary-container/20 hover:bg-primary-container/30 border border-primary-container/60 text-primary hover:text-primary-fixed text-xs font-['Space_Grotesk'] font-semibold tracking-wider transition-all duration-200 hover:shadow-md hover:shadow-primary/20"
          >
            <span className="material-symbols-outlined !text-base text-primary animate-pulse">smart_toy</span>
            <span className="hidden md:inline">POLAR GUIDE</span>
          </button>

          {/* User Profile / Sign In Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest border border-primary/40 transition-all shadow-sm shadow-primary/20"
              >
                <div className="relative">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-7 h-7 rounded-full object-cover border border-primary/50"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-surface" />
                </div>
                <div className="hidden md:flex flex-col text-left leading-none">
                  <span className="font-['Space_Grotesk'] text-xs font-bold text-on-surface truncate max-w-[100px]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] font-mono text-primary truncate max-w-[100px]">
                    {currentUser.station?.split(' ')[0] || 'BHARATI'}
                  </span>
                </div>
                <span className="material-symbols-outlined !text-sm text-outline">
                  {userDropdownOpen ? 'arrow_drop_up' : 'arrow_drop_down'}
                </span>
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-surface-container-low border border-outline-variant/40 shadow-2xl p-3 z-50 animate-scaleUp">
                  <div className="flex items-center gap-3 pb-3 border-b border-outline-variant/30">
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      className="w-10 h-10 rounded-full object-cover border border-primary/50"
                    />
                    <div className="min-w-0">
                      <div className="font-['Space_Grotesk'] text-xs font-bold text-on-surface truncate">
                        {currentUser.name}
                      </div>
                      <div className="text-[10px] font-mono text-on-surface-variant truncate">
                        {currentUser.email}
                      </div>
                      <div className="text-[9px] font-mono text-primary font-semibold truncate mt-0.5">
                        {currentUser.clearance}
                      </div>
                    </div>
                  </div>

                  <div className="py-2 space-y-1">
                    <button
                      onClick={() => handleNavClick('auth')}
                      className="w-full text-left px-2.5 py-1.5 rounded text-xs font-['Space_Grotesk'] text-on-surface hover:bg-surface-container flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined !text-sm text-primary">account_box</span>
                      <span>Portal Dossier & Keys</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('data')}
                      className="w-full text-left px-2.5 py-1.5 rounded text-xs font-['Space_Grotesk'] text-on-surface hover:bg-surface-container flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined !text-sm text-secondary">database</span>
                      <span>My Scientific Datasets</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('stations')}
                      className="w-full text-left px-2.5 py-1.5 rounded text-xs font-['Space_Grotesk'] text-on-surface hover:bg-surface-container flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined !text-sm text-tertiary">sensors</span>
                      <span>Station Telemetry Live</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-outline-variant/30">
                    <button
                      onClick={() => { setUserDropdownOpen(false); onLogout(); }}
                      className="w-full text-left px-2.5 py-1.5 rounded text-xs font-['Space_Grotesk'] text-rose-300 hover:bg-rose-500/10 flex items-center gap-2 font-medium"
                    >
                      <span className="material-symbols-outlined !text-sm">logout</span>
                      <span>Disconnect Session</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('auth')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container text-on-primary-container hover:brightness-110 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(53,200,232,0.35)] shrink-0"
              title="Sign in to PolarSphere"
            >
              <span className="material-symbols-outlined !text-base">lock_open</span>
              <span>SIGN IN</span>
            </button>
          )}

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined !text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-b border-outline-variant/40 px-4 py-3 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2 rounded text-sm font-['Space_Grotesk'] font-medium tracking-wide flex items-center justify-between ${
                activeTab === item.id
                  ? 'bg-surface-container-high text-primary border border-primary/30 font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined !text-lg text-primary">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              <span className="material-symbols-outlined !text-sm text-outline">arrow_forward</span>
            </button>
          ))}
          <div className="pt-2 border-t border-outline-variant/20 grid grid-cols-2 gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenSearch(); }}
              className="py-2 rounded bg-surface-container text-xs text-center text-on-surface flex items-center justify-center gap-2 border border-outline-variant/40"
            >
              <span className="material-symbols-outlined !text-sm text-primary">search</span>
              <span>Search</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenGuide(); }}
              className="py-2 rounded bg-primary-container/20 text-xs text-center text-primary font-semibold flex items-center justify-center gap-2 border border-primary-container/50"
            >
              <span className="material-symbols-outlined !text-sm text-primary">smart_toy</span>
              <span>Polar Guide</span>
            </button>
            {onOpenDesignTokens && (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenDesignTokens(); }}
                className="col-span-2 py-2 rounded bg-surface-container-high text-xs text-center text-tertiary flex items-center justify-center gap-2 border border-outline-variant/40"
              >
                <span className="material-symbols-outlined !text-sm text-primary">palette</span>
                <span>View Design Tokens & Colors</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
