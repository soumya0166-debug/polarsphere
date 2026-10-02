import React, { useState } from 'react';
import { authService } from '../services/auth/authService';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onLoginSuccess, 
  currentUser, 
  onLogout,
  onExpandToPage
}) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [jurisdiction, setJurisdiction] = useState('antarctica');
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  if (!isOpen) return null;

  const demoScientists = [
    {
      name: 'Dr. Thamban Meloth',
      role: 'Director & Chief Scientist',
      email: 'tmeloth@ncpor.res.in',
      station: 'Bharati Station (Larsemann Hills)',
      clearance: 'LEVEL 5 - CHIEF SCIENTIST',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Dr. B. L. Redkar',
      role: 'Senior Scientist (Atmospheric)',
      email: 'blredkar@ncpor.res.in',
      station: 'Maitri Station (Schirmacher Oasis)',
      clearance: 'LEVEL 4 - EXPEDITION LEAD',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const handleDemoSignIn = async (scientist) => {
    setIsLoading(true);
    setAlert({ type: 'info', msg: `Authenticating as ${scientist.name}...` });
    try {
      const res = await authService.signInWithPassword({
        email: scientist.email,
        password: 'Polar@2026!',
        rememberMe: true
      });
      setIsLoading(false);
      onLoginSuccess(res.user);
      onClose();
    } catch (err) {
      setIsLoading(false);
      setAlert({ type: 'error', msg: err.message || 'Authentication failed' });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setAlert({ type: 'error', msg: 'Please provide your institutional email.' });
      return;
    }
    if (!password) {
      setAlert({ type: 'error', msg: 'Password is required.' });
      return;
    }

    setIsLoading(true);
    setAlert({ type: 'info', msg: 'Validating credentials with polar research identity provider...' });

    try {
      if (authMode === 'login') {
        const res = await authService.signInWithPassword({
          email,
          password,
          rememberMe
        });
        setIsLoading(false);
        onLoginSuccess(res.user);
        onClose();
      } else {
        const res = await authService.signUp({
          email,
          password,
          fullName: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          station: jurisdiction.toUpperCase(),
          jurisdiction
        });
        setIsLoading(false);
        if (res.user && res.session) {
          onLoginSuccess(res.user);
          onClose();
        } else {
          setAlert({
            type: 'success',
            msg: `Registration successful! Verification token generated for ${email}. You can sign in after verifying.`
          });
          setAuthMode('login');
        }
      }
    } catch (err) {
      setIsLoading(false);
      setAlert({ type: 'error', msg: err.message || 'Authentication transaction failed.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/80 backdrop-blur-md animate-fadeIn">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-lg bg-surface-container-low border border-outline-variant/40 rounded-2xl shadow-2xl overflow-hidden animate-scaleUp">
        
        {/* Top Header Banner */}
        <div className="relative bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-container/20 border border-primary-container/40 flex items-center justify-center">
              <span className="material-symbols-outlined !text-lg text-primary">lock</span>
            </div>
            <div>
              <h3 className="font-['Space_Grotesk'] text-sm font-bold tracking-wider text-on-surface uppercase">
                POLARSPHERE SECURE PORTAL
              </h3>
              <p className="text-[10px] font-mono text-primary">
                National Polar & Ocean Research Gateway
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {onExpandToPage && (
              <button
                onClick={() => { onClose(); onExpandToPage(); }}
                className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded transition-colors"
                title="Expand to Full Split Page View"
              >
                <span className="material-symbols-outlined !text-base">open_in_full</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded transition-colors"
              title="Close Modal"
            >
              <span className="material-symbols-outlined !text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {alert && (
            <div className={`mb-4 p-3 rounded-lg text-xs font-mono flex items-center gap-2 border ${
              alert.type === 'error' 
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' 
                : 'bg-primary/10 border-primary/30 text-primary'
            }`}>
              <span className="material-symbols-outlined !text-sm">
                {alert.type === 'error' ? 'error' : 'info'}
              </span>
              <span>{alert.msg}</span>
            </div>
          )}

          {currentUser ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-surface-container-high border border-outline-variant/30">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-12 h-12 rounded-full object-cover border border-primary/50"
                />
                <div>
                  <div className="font-['Space_Grotesk'] text-base font-bold text-on-surface">
                    {currentUser.name}
                  </div>
                  <div className="text-xs text-on-surface-variant font-mono">
                    {currentUser.email}
                  </div>
                  <div className="text-[10px] font-mono text-primary mt-0.5">
                    {currentUser.clearance}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => { onClose(); if (onExpandToPage) onExpandToPage(); }}
                  className="flex-1 py-2.5 rounded bg-primary-container text-on-primary-container font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all text-center"
                >
                  VIEW PROFILE DOSSIER
                </button>
                <button
                  onClick={() => { onLogout(); setAlert(null); }}
                  className="px-4 py-2.5 rounded bg-surface-container hover:bg-surface-container-high text-rose-300 border border-rose-500/20 font-['Space_Grotesk'] text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  SIGN OUT
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex border-b border-outline-variant/30 mb-5">
                <button
                  onClick={() => setAuthMode('login')}
                  className={`pb-2.5 px-4 text-xs font-['Space_Grotesk'] font-bold uppercase tracking-wider transition-all border-b-2 ${
                    authMode === 'login'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Researcher Sign In
                </button>
                <button
                  onClick={() => setAuthMode('register')}
                  className={`pb-2.5 px-4 text-xs font-['Space_Grotesk'] font-bold uppercase tracking-wider transition-all border-b-2 ${
                    authMode === 'register'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Request Clearance
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-['Space_Grotesk'] font-medium text-on-surface mb-1.5 uppercase tracking-wider">
                    Institutional Email / Researcher ID
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined !text-base absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                      mail
                    </span>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="scientist@ncpor.res.in"
                      className="w-full bg-surface-container-high border border-outline-variant/40 rounded-lg pl-9 pr-3 py-2 text-xs text-on-surface font-mono placeholder:text-outline focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-['Space_Grotesk'] font-medium text-on-surface uppercase tracking-wider">
                      Security Key / Password
                    </label>
                    <span 
                      onClick={() => {
                        onClose();
                        if (onExpandToPage) onExpandToPage();
                        window.location.hash = '#reset-token=request';
                      }}
                      className="text-[10px] font-mono text-primary cursor-pointer hover:underline"
                    >
                      Forgot key?
                    </span>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined !text-base absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                      lock
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-surface-container-high border border-outline-variant/40 rounded-lg pl-9 pr-10 py-2 text-xs text-on-surface font-mono placeholder:text-outline focus:outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                    >
                      <span className="material-symbols-outlined !text-base">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-outline-variant bg-surface-container text-primary"
                    />
                    <span>Remember device</span>
                  </label>
                  <span className="text-[10px] font-mono text-tertiary">TLS 1.3 SECURE</span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-lg bg-primary-container text-on-primary-container font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(53,200,232,0.35)] disabled:opacity-50"
                >
                  {isLoading ? 'AUTHENTICATING...' : 'SIGN IN TO POLARSPHERE'}
                </button>
              </form>

              {/* Fast 1-Click Demo Logins */}
              <div className="mt-5 pt-4 border-t border-outline-variant/30">
                <span className="text-[10px] font-mono text-outline uppercase tracking-wider block mb-2">
                  OR FAST 1-CLICK DEMO AUTHENTICATION:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {demoScientists.map((sc, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleDemoSignIn(sc)}
                      className="p-2 rounded bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-left transition-all flex items-center gap-2 group"
                    >
                      <img 
                        src={sc.avatar} 
                        alt={sc.name} 
                        className="w-6 h-6 rounded-full object-cover group-hover:ring-1 group-hover:ring-primary"
                      />
                      <div className="min-w-0">
                        <div className="text-[11px] font-['Space_Grotesk'] font-bold text-on-surface truncate group-hover:text-primary">
                          {sc.name.split(' ')[1] || sc.name}
                        </div>
                        <div className="text-[9px] font-mono text-outline truncate">
                          {sc.role.split(' ')[0]}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
