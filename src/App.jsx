import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import StationsPage from './pages/StationsPage';
import ExpeditionsPage from './pages/ExpeditionsPage';
import DataExplorerPage from './pages/DataExplorerPage';
import GeosphereMonitorPage from './pages/GeosphereMonitorPage';
import ArchitectureFlowchartPage from './pages/ArchitectureFlowchartPage';
import AuthPage from './pages/AuthPage';
import GlobalSearchModal from './components/GlobalSearchModal';
import PolarGuideDrawer from './components/PolarGuideDrawer';
import AuthModal from './components/AuthModal';
import BottomNav from './components/BottomNav';
import DesignTokensModal from './components/DesignTokensModal';
import PolarLoadingScreen from './components/PolarLoadingScreen';
import { authService } from './services/auth/authService';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedSubId, setSelectedSubId] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDesignTokensOpen, setIsDesignTokensOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Global authentication states
  const [isSessionChecking, setIsSessionChecking] = useState(true);
  const [intendedDestination, setIntendedDestination] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
    const session = authService.getSession();
    return session?.user || null;
  });

  // Centralized session verification and state synchronizer
  useEffect(() => {
    let isMounted = true;

    async function initAuthSession() {
      try {
        const session = await authService.getSession();
        if (isMounted) {
          if (session?.user) {
            setCurrentUser(session.user);
          } else {
            setCurrentUser(null);
          }
        }
      } catch (err) {
        console.warn('[PolarSphere Auth Guard] Session verification failed:', err);
        if (isMounted) setCurrentUser(null);
      } finally {
        if (isMounted) {
          setIsSessionChecking(false);
        }
      }
    }

    initAuthSession();

    const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
      if (!isMounted) return;
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED' || event === 'TOKEN_REFRESHED') {
        setCurrentUser(session?.user || null);
      } else if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
      }
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe?.();
    };
  }, []);

  // Global route guardian and deep-link synchronizer
  useEffect(() => {
    if (isSessionChecking) return;

    const handleHashSync = () => {
      const hash = window.location.hash.replace('#', '');

      // 1. Unauthenticated Visitor Handling
      if (!currentUser) {
        // Deep-linked token routes are allowed for unauthenticated visitors
        if (
          hash.startsWith('reset-token=') || 
          hash.startsWith('verify-token=') ||
          hash.startsWith('type=recovery') ||
          hash.startsWith('type=signup') ||
          hash === 'auth' ||
          hash === 'login' ||
          hash === 'register'
        ) {
          setActiveTab('auth');
          return;
        }

        // Intercept internal page access attempt and preserve target
        if (hash && hash !== 'auth') {
          setIntendedDestination(hash);
        }
        setActiveTab('auth');
        window.location.hash = '#auth';
        return;
      }

      // 2. Authenticated User Handling
      if (!hash || hash === 'auth' || hash === 'login') {
        setActiveTab('home');
        window.location.hash = '#home';
        return;
      }

      const validTabs = ['home', 'explore', 'stations', 'expeditions', 'data', 'architecture'];
      const parts = hash.split('/');
      const tabName = parts[0];
      const subId = parts[1];

      if (validTabs.includes(tabName)) {
        setActiveTab(tabName);
        if (subId) setSelectedSubId(subId);
      } else {
        setActiveTab('home');
        window.location.hash = '#home';
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, [currentUser, isSessionChecking]);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    showToast(`Authenticated: ${user.name || user.email} (${user.clearance || 'RESEARCHER'})`, 'success');

    // Restore originally intended destination if preserved
    if (intendedDestination) {
      const parts = intendedDestination.split('/');
      const destTab = parts[0];
      const destSub = parts[1];
      setIntendedDestination(null);
      handleNavigate(destTab, destSub);
    } else {
      handleNavigate('home');
    }
  };

  const handleLogout = async () => {
    try {
      await authService.signOut();
    } catch (e) {
      console.warn('Auth signout warning:', e);
    }
    setCurrentUser(null);
    setIntendedDestination(null);
    setActiveTab('auth');
    window.location.hash = '#auth';
    showToast('Session terminated. PolarSphere portal locked.', 'info');
  };

  const showToast = (text, type = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Global navigation handler with route security & history hash management
  const handleNavigate = (tab, subId) => {
    // If not authenticated, force auth and remember destination
    if (!currentUser) {
      if (tab !== 'auth') {
        setIntendedDestination(subId ? `${tab}/${subId}` : tab);
      }
      setActiveTab('auth');
      window.location.hash = '#auth';
      return;
    }

    if (tab) {
      setActiveTab(tab);
      setSelectedSubId(subId || null);
      window.location.hash = subId ? `#${tab}/${subId}` : `#${tab}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (subId === 'openSearch') {
      setIsSearchOpen(true);
    }
    if (subId === 'openAuth') {
      setIsAuthModalOpen(true);
    }
  };

  // Keyboard shortcut listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (currentUser) {
          setIsSearchOpen(prev => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentUser]);

  // ==========================================================================
  // VIEW RENDERER WITH GLOBAL ACCESS CONTROL
  // ==========================================================================

  // 1. Session verification loading state (Zero flash of protected content)
  if (isSessionChecking) {
    return <PolarLoadingScreen />;
  }

  // 2. Unauthenticated Visitor Guard (MANDATORY LOGIN FIRST)
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#0B1420] text-on-surface flex flex-col font-['Inter'] antialiased">
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 animate-bounce duration-300">
            <div className={`px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-mono border backdrop-blur-md ${
              toastMessage.type === 'success' 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-950/50' 
                : 'bg-primary/20 text-primary border-primary/40 shadow-primary-950/50'
            }`}>
              <span className="material-symbols-outlined !text-base text-primary">
                {toastMessage.type === 'success' ? 'verified' : 'info'}
              </span>
              <span>{toastMessage.text}</span>
            </div>
          </div>
        )}
        <AuthPage
          onNavigate={handleNavigate}
          onLoginSuccess={handleLoginSuccess}
          currentUser={null}
          onLogout={handleLogout}
          intendedDestination={intendedDestination}
        />
      </div>
    );
  }

  // 3. Authenticated Researcher: Full PolarSphere Suite
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-['Inter'] antialiased selection:bg-primary/20 selection:text-primary pb-16 lg:pb-0">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 animate-bounce duration-300">
          <div className={`px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-mono border backdrop-blur-md ${
            toastMessage.type === 'success' 
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-950/50' 
              : 'bg-primary/20 text-primary border-primary/40 shadow-primary-950/50'
          }`}>
            <span className="material-symbols-outlined !text-base text-primary">
              {toastMessage.type === 'success' ? 'verified' : 'info'}
            </span>
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Global Shared Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => handleNavigate(tab, null)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenDesignTokens={() => setIsDesignTokensOpen(true)}
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
          <DataExplorerPage
            currentUser={currentUser}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureFlowchartPage onNavigate={handleNavigate} />
        )}

        {activeTab === 'auth' && (
          <AuthPage
            onNavigate={handleNavigate}
            onLoginSuccess={handleLoginSuccess}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Global Shared Institutional Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Sticky Bottom Navigation (Matches Figma Mobile Artboards) */}
      <BottomNav
        activeTab={activeTab}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

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

      {/* Auth Modal Triggerable from Anywhere */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        currentUser={currentUser}
        onLogout={handleLogout}
        onExpandToPage={() => handleNavigate('auth')}
      />

      {/* Polar Climate Design Tokens Modal (Figma Spec) */}
      <DesignTokensModal
        isOpen={isDesignTokensOpen}
        onClose={() => setIsDesignTokensOpen(false)}
      />
    </div>
  );
}
