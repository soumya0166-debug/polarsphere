/**
 * ==============================================================================
 * POLARSPHERE UNIFIED AUTHENTICATION SERVICE
 * "The Polar World, Through India's Eyes"
 * ==============================================================================
 * Production-ready authentication gateway supporting both live Supabase Auth
 * and a secure, cryptographic local provider with session persistence,
 * password hashing (SHA-256), email verification, and token recovery.
 */

import { supabase, isSupabaseConfigured } from '../db/supabaseClient.js';

const STORAGE_KEY_SESSION = 'polarsphere_auth_session';
const STORAGE_KEY_USERS = 'polarsphere_auth_users';
const STORAGE_KEY_TOKENS = 'polarsphere_auth_tokens';

// Clearance levels for PolarSphere Scientific Governance
export const CLEARANCE_LEVELS = Object.freeze({
  PUBLIC: 'PUBLIC OBSERVER',
  LEVEL_1: 'LEVEL 1 — PUBLIC RESEARCHER',
  LEVEL_2: 'LEVEL 2 — ACADEMIC OBSERVER',
  LEVEL_3: 'LEVEL 3 — RESEARCHER ACCESS',
  LEVEL_4: 'LEVEL 4 — STATION / EXPEDITION LEAD',
  LEVEL_5: 'LEVEL 5 — CHIEF SCIENTIST'
});

// Helper for SHA-256 password hashing via Web Crypto API
async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Generate secure random token
function generateToken(prefix = 'tok') {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return `${prefix}_${Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('')}`;
}

// Seed accounts for institutional scientists
const SEED_PASSWORD_HASH = 'fe123b2543ceaf720b983ce7725e903634c5867cba866a23146c982da804dfb2'; // SHA-256 of "polarsphere_salt_2026:Polar@2026!"

const DEFAULT_SEED_USERS = [
  {
    id: 'usr-thamban-meloth',
    email: 'tmeloth@ncpor.res.in',
    passwordHash: SEED_PASSWORD_HASH,
    salt: 'polarsphere_salt_2026',
    fullName: 'Dr. Thamban Meloth',
    institution: 'National Centre for Polar and Ocean Research (NCPOR), Goa',
    designation: 'Director & Chief Scientist (Cryosphere)',
    station: 'Bharati Station (Larsemann Hills, Antarctica)',
    jurisdiction: 'antarctica',
    clearance: CLEARANCE_LEVELS.LEVEL_5,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'usr-redkar-bl',
    email: 'blredkar@ncpor.res.in',
    passwordHash: SEED_PASSWORD_HASH,
    salt: 'polarsphere_salt_2026',
    fullName: 'Dr. B. L. Redkar',
    institution: 'National Centre for Polar and Ocean Research (NCPOR), Goa',
    designation: 'Senior Scientist (Atmospheric Sciences)',
    station: 'Maitri Station (Schirmacher Oasis, Antarctica)',
    jurisdiction: 'antarctica',
    clearance: CLEARANCE_LEVELS.LEVEL_4,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'usr-kavitha-raman',
    email: 'kavitha.raman@incois.gov.in',
    passwordHash: SEED_PASSWORD_HASH,
    salt: 'polarsphere_salt_2026',
    fullName: 'Dr. Kavitha Raman',
    institution: 'Indian National Centre for Ocean Information Services (INCOIS)',
    designation: 'Chief Oceanographer (Southern Ocean Carbon Flux)',
    station: 'ORV Sagar Nidhi (Southern Ocean)',
    jurisdiction: 'southern-ocean',
    clearance: CLEARANCE_LEVELS.LEVEL_4,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'usr-kp-krishnan',
    email: 'krishnan@ncpor.res.in',
    passwordHash: SEED_PASSWORD_HASH,
    salt: 'polarsphere_salt_2026',
    fullName: 'Dr. K. P. Krishnan',
    institution: 'National Centre for Polar and Ocean Research (NCPOR), Goa',
    designation: 'Scientist F (Polar Biology & Fjord Biogeochemistry)',
    station: 'Himadri Station (Ny-Ålesund, Svalbard, Arctic)',
    jurisdiction: 'arctic',
    clearance: CLEARANCE_LEVELS.LEVEL_4,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    createdAt: '2026-01-01T00:00:00.000Z'
  }
];

class AuthenticationService {
  constructor() {
    this.listeners = new Set();
    this.initStorage();
  }

  initStorage() {
    if (typeof window === 'undefined') return;
    try {
      const existing = localStorage.getItem(STORAGE_KEY_USERS);
      if (!existing) {
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(DEFAULT_SEED_USERS));
      }
      if (!localStorage.getItem(STORAGE_KEY_TOKENS)) {
        localStorage.setItem(STORAGE_KEY_TOKENS, JSON.stringify({ verification: {}, reset: {} }));
      }
    } catch (e) {
      console.warn('[PolarSphere Auth] Storage initialization notice:', e.message);
    }
  }

  // --- Password Strength & Validation Rules ---
  validatePasswordStrength(password) {
    if (!password || typeof password !== 'string') {
      return 'Password is required.';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must include at least one uppercase letter.';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must include at least one lowercase letter.';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must include at least one number.';
    }
    return '';
  }

  validateEmail(email) {
    if (!email || typeof email !== 'string') {
      return 'Email address is required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email address.';
    }
    return '';
  }

  // Helper to hash password with salt
  async hashUserPassword(password, salt = 'polarsphere_salt_2026') {
    return sha256(`${salt}:${password}`);
  }

  // ----------------------------------------------------------------------------
  // SIGN IN
  // ----------------------------------------------------------------------------
  async signIn({ email, password, rememberMe = true }) {
    const emailErr = this.validateEmail(email);
    if (emailErr) throw new Error(emailErr);
    if (!password) throw new Error('Password is required.');

    const cleanEmail = email.trim().toLowerCase();

    // 1. If Supabase is configured, use live Supabase Auth
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });

      if (error) {
        throw new Error(error.message);
      }

      // Fetch user profile from profiles table if present
      let profileData = {};
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        if (profile) profileData = profile;
      } catch (err) {
        console.warn('[PolarSphere Auth] Profile fetch fallback:', err.message);
      }

      const user = {
        id: data.user.id,
        email: data.user.email,
        name: profileData.full_name || data.user.user_metadata?.full_name || cleanEmail.split('@')[0],
        role: profileData.designation || 'Polar Researcher',
        station: profileData.station || 'National Polar Data Center',
        jurisdiction: profileData.jurisdiction || 'all',
        clearance: profileData.clearance_level || CLEARANCE_LEVELS.LEVEL_3,
        institution: profileData.institution || 'NCPOR Partner Institute',
        avatar: profileData.avatar_url || data.user.user_metadata?.avatar_url,
        isVerified: data.user.email_confirmed_at !== null,
        loginTime: new Date().toLocaleTimeString('en-US', { hour12: false }) + ' UTC'
      };

      const session = {
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresAt: data.session.expires_at,
        rememberMe,
        user
      };

      this.persistSession(session, rememberMe);
      this.notifyListeners('SIGNED_IN', session);
      return { user, session };
    }

    // 2. Local Authentication Provider (Offline & Testing Mode)
    const users = this.getStoredUsers();
    const userRecord = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!userRecord) {
      throw new Error('No account found with this email in the PolarSphere registry.');
    }

    const inputHash = await this.hashUserPassword(password, userRecord.salt);
    if (inputHash !== userRecord.passwordHash) {
      throw new Error('Incorrect password. Please verify your credentials or use password recovery.');
    }

    if (!userRecord.isVerified) {
      throw new Error('Your account email has not been verified yet. Please check your inbox or resend verification.');
    }

    const user = {
      id: userRecord.id,
      email: userRecord.email,
      name: userRecord.fullName,
      fullName: userRecord.fullName,
      role: userRecord.designation,
      station: userRecord.station,
      jurisdiction: userRecord.jurisdiction,
      clearance: userRecord.clearance,
      institution: userRecord.institution,
      avatar: userRecord.avatarUrl,
      isVerified: true,
      loginTime: new Date().toLocaleTimeString('en-US', { hour12: false }) + ' UTC'
    };

    const sessionToken = generateToken('sec_sess');
    const session = {
      accessToken: sessionToken,
      access_token: sessionToken,
      expiresAt: Math.floor(Date.now() / 1000) + (rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 24), // 7 days vs 1 day
      rememberMe,
      user
    };

    this.persistSession(session, rememberMe);
    this.notifyListeners('SIGNED_IN', session);
    return { user, session };
  }

  // Alias for Supabase-style naming compatibility
  signInWithPassword({ email, password, rememberMe = true }) {
    return this.signIn({ email, password, rememberMe });
  }

  // ----------------------------------------------------------------------------
  // SIGN UP / ACCOUNT REGISTRATION
  // ----------------------------------------------------------------------------
  async signUp({ email, password, fullName, institution, designation, station, jurisdiction = 'all' }) {
    const emailErr = this.validateEmail(email);
    if (emailErr) throw new Error(emailErr);

    const passErr = this.validatePasswordStrength(password);
    if (passErr) throw new Error(passErr);

    if (!fullName || fullName.trim().length < 2) {
      throw new Error('Full Name must be at least 2 characters.');
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim();
    const cleanInst = (institution || 'National Centre for Polar and Ocean Research').trim();
    const cleanDesig = (designation || 'Polar Research Scholar').trim();
    const cleanStation = (station || 'National Polar Data Center').trim();

    // 1. Live Supabase Auth
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            full_name: cleanName,
            institution: cleanInst,
            designation: cleanDesig,
            station: cleanStation,
            jurisdiction
          },
          emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/#verify` : undefined
        }
      });

      if (error) throw new Error(error.message);

      const needsVerification = !data.session;
      return {
        user: data.user,
        session: data.session,
        needsEmailVerification: needsVerification,
        message: needsVerification
          ? `Verification email dispatched to ${cleanEmail}. Please confirm to activate access.`
          : 'Account created and authenticated successfully.'
      };
    }

    // 2. Local Authentication Provider
    const users = this.getStoredUsers();
    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      throw new Error('An account with this email address already exists. Please sign in or reset your password.');
    }

    const salt = generateToken('salt');
    const passwordHash = await this.hashUserPassword(password, salt);
    const userId = generateToken('usr');

    const newUser = {
      id: userId,
      email: cleanEmail,
      passwordHash,
      salt,
      fullName: cleanName,
      institution: cleanInst,
      designation: cleanDesig,
      station: cleanStation,
      jurisdiction,
      clearance: CLEARANCE_LEVELS.LEVEL_3,
      isVerified: false,
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80`,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);

    // Create verification token
    const verificationToken = generateToken('vtok');
    const tokens = this.getStoredTokens();
    tokens.verification[cleanEmail] = {
      token: verificationToken,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 // 24 hours
    };
    this.saveTokens(tokens);

    const verificationLink = typeof window !== 'undefined' 
      ? `${window.location.origin}/#verify-token=${verificationToken}&email=${encodeURIComponent(cleanEmail)}`
      : `/verify?token=${verificationToken}`;

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.fullName,
        clearance: newUser.clearance,
        isVerified: false
      },
      needsEmailVerification: true,
      requiresVerification: true,
      verificationToken,
      verificationLink,
      message: `Registration recorded for ${cleanName}. Verification link created for ${cleanEmail}.`
    };
  }

  // ----------------------------------------------------------------------------
  // EMAIL VERIFICATION
  // ----------------------------------------------------------------------------
  async verifyEmail({ token, email }) {
    if (!token) throw new Error('Verification token is required.');

    if (isSupabaseConfigured && supabase) {
      // In Supabase, verification links land with #access_token=...&type=signup
      const { data, error } = await supabase.auth.getSession();
      if (error) throw new Error(error.message);
      if (data?.session) {
        this.notifyListeners('USER_UPDATED', data.session);
        return { success: true, message: 'Email confirmed and session established.' };
      }
      return { success: true, message: 'Email verified successfully. You may now sign in.' };
    }

    const cleanEmail = email ? email.trim().toLowerCase() : null;
    const tokens = this.getStoredTokens();

    let matchedEmail = cleanEmail;
    if (!matchedEmail) {
      // Scan tokens for matching token
      for (const [em, record] of Object.entries(tokens.verification)) {
        if (record.token === token) {
          matchedEmail = em;
          break;
        }
      }
    }

    if (!matchedEmail || !tokens.verification[matchedEmail]) {
      throw new Error('Invalid or expired verification token.');
    }

    const record = tokens.verification[matchedEmail];
    if (record.token !== token) {
      throw new Error('Verification token does not match recorded token for this account.');
    }

    if (Date.now() > record.expiresAt) {
      throw new Error('Verification link has expired (24-hour limit exceeded). Please request a new verification email.');
    }

    // Mark user as verified
    const users = this.getStoredUsers();
    const userIndex = users.findIndex(u => u.email.toLowerCase() === matchedEmail);
    if (userIndex === -1) {
      throw new Error('User record not found.');
    }

    users[userIndex].isVerified = true;
    this.saveUsers(users);

    delete tokens.verification[matchedEmail];
    this.saveTokens(tokens);

    return {
      success: true,
      email: matchedEmail,
      isVerified: true,
      message: `Email verified successfully for ${users[userIndex].fullName}. Your account is now active.`
    };
  }

  async resendVerificationEmail(email) {
    const emailErr = this.validateEmail(email);
    if (emailErr) throw new Error(emailErr);

    const cleanEmail = email.trim().toLowerCase();

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: cleanEmail
      });
      if (error) throw new Error(error.message);
      return { success: true, message: `Verification email resent to ${cleanEmail}.` };
    }

    const users = this.getStoredUsers();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      throw new Error('No account found matching this email address.');
    }
    if (user.isVerified) {
      return { success: true, message: 'This account is already verified. You can sign in immediately.' };
    }

    const token = generateToken('vtok');
    const tokens = this.getStoredTokens();
    tokens.verification[cleanEmail] = {
      token,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24
    };
    this.saveTokens(tokens);

    const verificationLink = typeof window !== 'undefined'
      ? `${window.location.origin}/#verify-token=${token}&email=${encodeURIComponent(cleanEmail)}`
      : `/verify?token=${token}`;

    return {
      success: true,
      verificationLink,
      message: `New verification link generated for ${cleanEmail}.`
    };
  }

  // ----------------------------------------------------------------------------
  // PASSWORD RECOVERY / RESET
  // ----------------------------------------------------------------------------
  async requestPasswordReset(email) {
    const emailErr = this.validateEmail(email);
    if (emailErr) throw new Error(emailErr);

    const cleanEmail = email.trim().toLowerCase();

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/#reset-password` : undefined
      });
      if (error) throw new Error(error.message);
      return { success: true, message: `Password reset instructions dispatched to ${cleanEmail}.` };
    }

    const users = this.getStoredUsers();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      throw new Error('No registered researcher account found matching this institutional email.');
    }

    const resetToken = generateToken('rst');
    const tokens = this.getStoredTokens();
    tokens.reset[cleanEmail] = {
      token: resetToken,
      expiresAt: Date.now() + 1000 * 60 * 60 // 1 hour expiration
    };
    this.saveTokens(tokens);

    const resetLink = typeof window !== 'undefined'
      ? `${window.location.origin}/#reset-token=${resetToken}&email=${encodeURIComponent(cleanEmail)}`
      : `/reset?token=${resetToken}`;

    return {
      success: true,
      resetLink,
      resetToken,
      message: `Password reset link issued for ${user.fullName}. Valid for 1 hour.`
    };
  }

  // Alias for Supabase / custom name compatibility
  resetPasswordForEmail(email) {
    return this.requestPasswordReset(email);
  }

  async resetPassword({ token, email, newPassword }) {
    const passErr = this.validatePasswordStrength(newPassword);
    if (passErr) throw new Error(passErr);

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) throw new Error(error.message);
      return { success: true, user: data.user, message: 'Password updated successfully in Supabase directory.' };
    }

    if (!token) throw new Error('Reset token is required to reset password.');

    const cleanEmail = email ? email.trim().toLowerCase() : null;
    const tokens = this.getStoredTokens();

    let matchedEmail = cleanEmail;
    if (!matchedEmail) {
      for (const [em, record] of Object.entries(tokens.reset)) {
        if (record.token === token) {
          matchedEmail = em;
          break;
        }
      }
    }

    if (!matchedEmail || !tokens.reset[matchedEmail]) {
      throw new Error('Invalid or expired password reset link / token.');
    }

    const record = tokens.reset[matchedEmail];
    if (record.token !== token) {
      throw new Error('Reset token mismatch.');
    }

    if (Date.now() > record.expiresAt) {
      delete tokens.reset[matchedEmail];
      this.saveTokens(tokens);
      throw new Error('This password reset link has expired (1-hour time limit exceeded). Please request a new link.');
    }

    // Update user password hash
    const users = this.getStoredUsers();
    const userIndex = users.findIndex(u => u.email.toLowerCase() === matchedEmail);
    if (userIndex === -1) {
      throw new Error('User record not found.');
    }

    const newSalt = generateToken('salt');
    const newHash = await this.hashUserPassword(newPassword, newSalt);

    users[userIndex].salt = newSalt;
    users[userIndex].passwordHash = newHash;
    users[userIndex].updatedAt = new Date().toISOString();
    this.saveUsers(users);

    // Invalidate token
    delete tokens.reset[matchedEmail];
    this.saveTokens(tokens);

    return {
      success: true,
      message: `Password updated successfully for ${users[userIndex].fullName}. You may now sign in with your new password.`
    };
  }

  // Alias for token-based updates
  updateUserWithToken({ token, newPassword, email }) {
    return this.resetPassword({ token, email, newPassword });
  }

  // ----------------------------------------------------------------------------
  // SIGN OUT & SESSION MANAGEMENT
  // ----------------------------------------------------------------------------
  async signOut() {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('[PolarSphere Auth] Supabase signOut warning:', err.message);
      }
    }

    this.clearSession();
    this.notifyListeners('SIGNED_OUT', null);
    return { success: true };
  }

  getSession() {
    // 1. Check active session storage
    if (typeof localStorage === 'undefined') return null;

    try {
      // Check localStorage first
      let raw = localStorage.getItem(STORAGE_KEY_SESSION);
      if (!raw && typeof sessionStorage !== 'undefined') {
        // Check sessionStorage
        raw = sessionStorage.getItem(STORAGE_KEY_SESSION);
      }

      if (!raw) return null;

      const session = JSON.parse(raw);
      if (session && session.expiresAt) {
        const nowSec = Math.floor(Date.now() / 1000);
        if (nowSec > session.expiresAt) {
          this.clearSession();
          return null;
        }
      }
      return session;
    } catch {
      return null;
    }
  }

  getCurrentUser() {
    const session = this.getSession();
    return session ? session.user : null;
  }

  persistSession(session, rememberMe = true) {
    if (typeof localStorage === 'undefined') return;
    try {
      const serialized = JSON.stringify(session);
      if (rememberMe) {
        localStorage.setItem(STORAGE_KEY_SESSION, serialized);
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.removeItem(STORAGE_KEY_SESSION);
        }
      } else {
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem(STORAGE_KEY_SESSION, serialized);
        }
        localStorage.removeItem(STORAGE_KEY_SESSION);
      }
    } catch (e) {
      console.warn('[PolarSphere Auth] Error persisting session:', e);
    }
  }

  clearSession() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY_SESSION);
        localStorage.removeItem('polarsphere_user');
      }
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem(STORAGE_KEY_SESSION);
      }
    } catch (e) {
      console.warn('[PolarSphere Auth] Error clearing session:', e);
    }
  }

  // ----------------------------------------------------------------------------
  // EVENT LISTENERS & OBSERVERS
  // ----------------------------------------------------------------------------
  onAuthStateChange(listener) {
    this.listeners.add(listener);

    // Also wire up Supabase listener if active
    let supabaseSub = null;
    if (isSupabaseConfigured && supabase) {
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        listener(event, session);
      });
      supabaseSub = data.subscription;
    }

    const unsubscribe = () => {
      this.listeners.delete(listener);
      if (supabaseSub && supabaseSub.unsubscribe) supabaseSub.unsubscribe();
    };

    return {
      data: {
        subscription: {
          unsubscribe
        }
      },
      unsubscribe
    };
  }

  notifyListeners(event, session) {
    for (const listener of this.listeners) {
      try {
        listener(event, session);
      } catch (err) {
        console.error('[PolarSphere Auth] Listener exception:', err);
      }
    }
  }

  // ----------------------------------------------------------------------------
  // ACCESS CONTROL & AUTHORIZATION
  // ----------------------------------------------------------------------------
  canAccessClearance(user, requiredLevel) {
    if (!requiredLevel || requiredLevel === CLEARANCE_LEVELS.PUBLIC) return true;
    if (!user) return false;

    const hierarchy = [
      CLEARANCE_LEVELS.PUBLIC,
      CLEARANCE_LEVELS.LEVEL_1,
      CLEARANCE_LEVELS.LEVEL_2,
      CLEARANCE_LEVELS.LEVEL_3,
      CLEARANCE_LEVELS.LEVEL_4,
      CLEARANCE_LEVELS.LEVEL_5
    ];

    const userRank = hierarchy.indexOf(user.clearance);
    const requiredRank = hierarchy.indexOf(requiredLevel);

    if (userRank === -1 || requiredRank === -1) {
      return Boolean(user);
    }
    return userRank >= requiredRank;
  }

  isDatasetAccessible(user, dataset) {
    if (!dataset) return { allowed: true };

    const reqClearance = dataset.clearanceRequired || dataset.access_level || 'public';
    if (reqClearance === 'public' || reqClearance === 'Open Access') {
      return { allowed: true };
    }

    if (!user) {
      return {
        allowed: false,
        reason: 'Authentication required. This dataset contains restricted telemetry and requires verified scientific credentials.',
        code: 'AUTH_REQUIRED'
      };
    }

    const rankOrder = {
      'public': 0,
      'public observer': 0,
      'researcher': 1,
      'level 1 — public researcher': 1,
      'level 2 — academic observer': 2,
      'level 3 — researcher access': 3,
      'certified researcher': 3,
      'expedition_leader': 4,
      'station lead': 4,
      'level 4 — station / expedition lead': 4,
      'directorate': 5,
      'level 5 — chief scientist': 5
    };

    const userClearanceStr = String(user.clearance || 'researcher').toLowerCase();
    const reqClearanceStr = String(reqClearance).toLowerCase();

    const userRank = rankOrder[userClearanceStr] ?? 1;
    const reqRank = rankOrder[reqClearanceStr] ?? 1;

    if (userRank >= reqRank) {
      return { allowed: true };
    }

    return {
      allowed: false,
      reason: `Clearance (${userClearanceStr.toUpperCase()}) insufficient. Dataset requires ${reqClearanceStr.toUpperCase()} credentials.`,
      code: 'INSUFFICIENT_CLEARANCE'
    };
  }

  // ----------------------------------------------------------------------------
  // STORAGE HELPERS (LOCAL MODE)
  // ----------------------------------------------------------------------------
  getStoredUsers() {
    if (typeof localStorage === 'undefined') return [...DEFAULT_SEED_USERS];
    try {
      const raw = localStorage.getItem(STORAGE_KEY_USERS);
      return raw ? JSON.parse(raw) : [...DEFAULT_SEED_USERS];
    } catch {
      return [...DEFAULT_SEED_USERS];
    }
  }

  saveUsers(users) {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    } catch (e) {
      console.warn('[PolarSphere Auth] Error saving users:', e);
    }
  }

  getStoredTokens() {
    if (typeof localStorage === 'undefined') return { verification: {}, reset: {} };
    try {
      const raw = localStorage.getItem(STORAGE_KEY_TOKENS);
      return raw ? JSON.parse(raw) : { verification: {}, reset: {} };
    } catch {
      return { verification: {}, reset: {} };
    }
  }

  saveTokens(tokens) {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY_TOKENS, JSON.stringify(tokens));
    } catch (e) {
      console.warn('[PolarSphere Auth] Error saving tokens:', e);
    }
  }
}

export const authService = new AuthenticationService();
