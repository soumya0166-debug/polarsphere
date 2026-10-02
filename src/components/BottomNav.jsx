import React from 'react';

export default function BottomNav({ activeTab, onNavigate, currentUser }) {
  const navTabs = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'explore', label: 'Explore', icon: 'travel_explore' },
    { id: 'expeditions', label: 'Expeditions', icon: 'directions_boat' },
    { id: 'data', label: 'Data', icon: 'database' },
    { id: 'auth', label: currentUser ? 'Profile' : 'Portal', icon: currentUser ? 'account_circle' : 'person' }
  ];

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-outline-variant/30 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-all relative ${
                isActive 
                  ? 'text-primary' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {/* Active glow pill */}
              {isActive && (
                <span className="absolute -top-1 w-6 h-1 rounded-full bg-primary shadow-[0_0_8px_#35c8e8]" />
              )}
              
              <div className="relative">
                <span className={`material-symbols-outlined !text-2xl transition-transform ${
                  isActive ? 'scale-110 font-bold' : ''
                }`}>
                  {tab.icon}
                </span>
                {/* Active user status badge */}
                {tab.id === 'auth' && currentUser && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-surface animate-pulse" />
                )}
              </div>
              <span className={`text-[10px] font-['Space_Grotesk'] font-medium tracking-tight mt-0.5 ${
                isActive ? 'text-primary font-bold' : 'text-on-surface-variant'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
