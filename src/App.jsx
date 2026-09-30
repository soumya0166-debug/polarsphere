import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import StationsPage from './pages/StationsPage';
import ExpeditionsPage from './pages/ExpeditionsPage';
import DataExplorerPage from './pages/DataExplorerPage';
import GeosphereMonitorPage from './pages/GeosphereMonitorPage';
import ArchitectureFlowchartPage from './pages/ArchitectureFlowchartPage';
import GlobalSearchModal from './components/GlobalSearchModal';
import PolarGuideDrawer from './components/PolarGuideDrawer';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedSubId, setSelectedSubId] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Global navigation handler
  const handleNavigate = (tab, subId) => {
    if (tab) {
      setActiveTab(tab);
      setSelectedSubId(subId || null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (subId === 'openSearch') {
      setIsSearchOpen(true);
    }
  };

  // Keyboard shortcut listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-['Inter'] antialiased selection:bg-primary/20 selection:text-primary">
      {/* Global Shared Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => handleNavigate(tab, null)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenGuide={() => setIsGuideOpen(true)}
          />
        )}

        {activeTab === 'explore' && (
          <GeosphereMonitorPage
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'stations' && (
          <StationsPage
            selectedStationId={selectedSubId}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'expeditions' && (
          <ExpeditionsPage
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'data' && (
          <DataExplorerPage />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureFlowchartPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Shared Institutional Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Polar Guide AI Drawer */}
      <PolarGuideDrawer
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
