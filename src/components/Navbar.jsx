import React, { useState } from 'react';

export default function Navbar({ activeTab, setActiveTab, onOpenSearch, onOpenGuide }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME', icon: 'home' },
    { id: 'explore', label: 'EXPLORE', icon: 'travel_explore' },
    { id: 'stations', label: 'STATIONS', icon: 'domain' },
    { id: 'expeditions', label: 'EXPEDITIONS', icon: 'directions_boat' },
    { id: 'data', label: 'DATA', icon: 'database' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
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
          <span className="hidden md:inline text-tertiary">SYS: ONLINE // 4 BASES ACTIVE</span>
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
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions: Search, Polar Guide, Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/40 text-on-surface-variant hover:text-on-surface text-xs font-mono transition-colors"
            title="Search PolarSphere (Ctrl+K)"
          >
            <span className="material-symbols-outlined !text-base text-primary">search</span>
            <span className="hidden md:inline">SEARCH</span>
            <kbd className="hidden lg:inline text-[10px] bg-surface-container px-1.5 py-0.5 rounded text-outline border border-outline-variant/30">
              ⌘K
            </kbd>
          </button>

          {/* Polar Guide AI Trigger */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary-container/20 hover:bg-primary-container/30 border border-primary-container/60 text-primary hover:text-primary-fixed text-xs font-['Space_Grotesk'] font-semibold tracking-wider transition-all duration-200 hover:shadow-md hover:shadow-primary/20"
          >
            <span className="material-symbols-outlined !text-base text-primary animate-pulse">smart_toy</span>
            <span>POLAR GUIDE</span>
          </button>

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
              <span>{item.label}</span>
              <span className="material-symbols-outlined !text-sm text-outline">arrow_forward</span>
            </button>
          ))}
          <div className="pt-2 border-t border-outline-variant/20 flex gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenSearch(); }}
              className="flex-1 py-2 rounded bg-surface-container text-xs text-center text-on-surface flex items-center justify-center gap-2 border border-outline-variant/40"
            >
              <span className="material-symbols-outlined !text-sm text-primary">search</span>
              <span>Search Archive</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenGuide(); }}
              className="flex-1 py-2 rounded bg-primary-container/20 text-xs text-center text-primary font-semibold flex items-center justify-center gap-2 border border-primary-container/50"
            >
              <span className="material-symbols-outlined !text-sm text-primary">smart_toy</span>
              <span>Polar Guide AI</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
