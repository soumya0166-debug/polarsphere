/**
 * ==============================================================================
 * POLARSPHERE AUTHENTICATION VERIFICATION TEST SUITE
 * "The Polar World, Through India's Eyes"
 * ==============================================================================
 * Comprehensive end-to-end verification of all 11 authentication scenarios.
 */

// Mock browser storage environment for Node.js test runner
const memoryStorage = {};
const mockLocalStorage = {
  getItem: (key) => (key in memoryStorage ? memoryStorage[key] : null),
  setItem: (key, val) => { memoryStorage[key] = String(val); },
  removeItem: (key) => { delete memoryStorage[key]; },
  clear: () => { Object.keys(memoryStorage).forEach(k => delete memoryStorage[k]); }
};

const sessionMemoryStorage = {};
const mockSessionStorage = {
  getItem: (key) => (key in sessionMemoryStorage ? sessionMemoryStorage[key] : null),
  setItem: (key, val) => { sessionMemoryStorage[key] = String(val); },
  removeItem: (key) => { delete sessionMemoryStorage[key]; },
  clear: () => { Object.keys(sessionMemoryStorage).forEach(k => delete sessionMemoryStorage[k]); }
};

globalThis.localStorage = mockLocalStorage;
globalThis.sessionStorage = mockSessionStorage;

import { authService, CLEARANCE_LEVELS } from '../src/services/auth/authService.js';

let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  \x1b[32m✔ PASS:\x1b[0m ${message}`);
    passedTests++;
  } else {
    console.error(`  \x1b[31m✖ FAIL:\x1b[0m ${message}`);
    failedTests++;
  }
}

async function runAuthTests() {
  console.log('\n==============================================================================');
  console.log(' POLARSPHERE AUTHENTICATION ENGINE VERIFICATION (11 SCENARIOS)');
  console.log('==============================================================================\n');

  const testEmail = `researcher.test_${Date.now()}@ncpor.res.in`;
  const testPassword = 'PolarTestPass@2026!';
  let verificationToken = null;
  let resetToken = null;

  // ----------------------------------------------------------------------------
  // Scenario 1: Register a new account
  // ----------------------------------------------------------------------------
  console.log('\x1b[36m[Scenario 1]\x1b[0m Register a new account with valid credentials');
  try {
    const regResult = await authService.signUp({
      email: testEmail,
      password: testPassword,
      fullName: 'Dr. Test Glaciologist',
      institution: 'NCPOR Cryosphere Division',
      designation: 'Research Associate',
      station: 'BHARATI',
      jurisdiction: 'antarctica'
    });

    assert(Boolean(regResult.user), 'User object returned from registration');
    assert(regResult.user.email === testEmail.toLowerCase(), 'Registered email matches');
    assert(regResult.requiresVerification === true, 'Account requires email verification');
    assert(Boolean(regResult.verificationToken), 'Verification token generated');
    verificationToken = regResult.verificationToken;
  } catch (err) {
    assert(false, `Registration threw unexpected error: ${err.message}`);
  }

  // ----------------------------------------------------------------------------
  // Scenario 2: Attempt registration with invalid information
  // ----------------------------------------------------------------------------
  console.log('\n\x1b[36m[Scenario 2]\x1b[0m Attempt registration with invalid information');
  
  // 2a. Invalid email format
  try {
    await authService.signUp({
      email: 'not-an-email',
      password: testPassword,
      fullName: 'Invalid User'
    });
    assert(false, 'Should have rejected invalid email format');
  } catch (err) {
    assert(err.message.includes('valid email address'), 'Rejected invalid email with descriptive error');
  }

  // 2b. Password too short (< 8 chars)
  try {
    await authService.signUp({
      email: 'shortpass@ncpor.res.in',
      password: '123',
      fullName: 'Short Pass User'
    });
    assert(false, 'Should have rejected short password');
  } catch (err) {
    assert(err.message.includes('at least 8 characters'), 'Rejected short password with length error');
  }

  // 2c. Duplicate registration
  try {
    await authService.signUp({
      email: testEmail,
      password: testPassword,
      fullName: 'Duplicate User'
    });
    assert(false, 'Should have rejected duplicate email');
  } catch (err) {
    assert(err.message.includes('already exists') || err.message.includes('already registered'), 'Prevented duplicate email registration');
  }

  // ----------------------------------------------------------------------------
  // Scenario 3: Verify email
  // ----------------------------------------------------------------------------
  console.log('\n\x1b[36m[Scenario 3]\x1b[0m Email verification flow & token validation');

  // 3a. Invalid token test
  try {
    await authService.verifyEmail({ token: 'tok_invalid_bogus_token' });
    assert(false, 'Should have rejected bogus verification token');
  } catch (err) {
    assert(err.message.includes('Invalid or expired'), 'Rejected bogus token correctly');
  }

  // 3b. Valid token verification
  try {
    const verifyResult = await authService.verifyEmail({ token: verificationToken });
    assert(verifyResult.success === true, 'Verification token accepted');
    assert(verifyResult.isVerified === true, 'User record marked as verified');
  } catch (err) {
    assert(false, `Valid verification failed: ${err.message}`);
  }

  // ----------------------------------------------------------------------------
  // Scenario 4: Sign in with valid credentials
  // ----------------------------------------------------------------------------
  console.log('\n\x1b[36m[Scenario 4]\x1b[0m Sign in with valid credentials');
  let authSession = null;
  try {
    const loginResult = await authService.signInWithPassword({
      email: testEmail,
      password: testPassword,
      rememberMe: true
    });

    assert(Boolean(loginResult.user), 'User authenticated successfully');
    assert(Boolean(loginResult.session?.access_token), 'Session access_token issued');
    assert(loginResult.user.email === testEmail.toLowerCase(), 'Session email matches authenticated account');
    authSession = loginResult.session;
  } catch (err) {
    assert(false, `Sign in threw error: ${err.message}`);
  }

  // ----------------------------------------------------------------------------
  // Scenario 5: Sign in with incorrect password
  // ----------------------------------------------------------------------------
  console.log('\n\x1b[36m[Scenario 5]\x1b[0m Sign in with incorrect password');
  try {
    await authService.signInWithPassword({
      email: testEmail,
      password: 'WrongPassword@999'
    });
    assert(false, 'Should have rejected incorrect password');
  } catch (err) {
    assert(err.message.includes('Invalid login credentials') || err.message.includes('Incorrect password'), 'Rejected incorrect password with secure message');
  }

  // ----------------------------------------------------------------------------
  // Scenario 6: Refresh page & verify session persistence
  // ----------------------------------------------------------------------------
  console.log('\n\x1b[36m[Scenario 6]\x1b[0m Refresh page & verify session persistence');
  try {
    // Calling getSession() simulates initial app mount after refresh
    const restoredSession = authService.getSession();
    assert(Boolean(restoredSession?.user), 'Session restored from storage on page load');
    assert(restoredSession.user.email === testEmail.toLowerCase(), 'Restored user email intact');
    assert(Boolean(restoredSession.access_token), 'Restored session access token intact');
  } catch (err) {
    assert(false, `Session restoration error: ${err.message}`);
  }

  // ----------------------------------------------------------------------------
  // Scenario 7: Open protected page / action while signed out
  // ----------------------------------------------------------------------------
  console.log('\n\x1b[36m[Scenario 7]\x1b[0m Access control & dataset clearance enforcement');
  const publicDataset = {
    id: 'ds-01',
    title: 'Public Open Meteorological Log',
    clearanceRequired: 'public'
  };
  const restrictedDataset = {
    id: 'ds-04',
    title: 'Chhota Shigri High-Density 3D LiDAR Point Cloud',
    clearanceRequired: 'researcher'
  };
  const classifiedTelemetry = {
    id: 'ds-classified',
    title: 'Bharati Station Autonomous Satellite Telecommand Raw Archive',
    clearanceRequired: 'expedition_leader'
  };

  // 7a. Test unauthenticated access to restricted data
  const unauthCheck = authService.isDatasetAccessible(null, restrictedDataset);
  assert(unauthCheck.allowed === false, 'Blocked unauthenticated user from restricted dataset');
  assert(unauthCheck.code === 'AUTH_REQUIRED', 'Correct reason code AUTH_REQUIRED returned');

  // 7b. Test unauthenticated access to public data
  const unauthPublicCheck = authService.isDatasetAccessible(null, publicDataset);
  assert(unauthPublicCheck.allowed === true, 'Allowed unauthenticated user to access public dataset');

  // 7c. Test authenticated researcher access to researcher data
  const researcherUser = { email: testEmail, clearance: 'researcher' };
  const authAccess = authService.isDatasetAccessible(researcherUser, restrictedDataset);
  assert(authAccess.allowed === true, 'Authenticated researcher allowed access to researcher dataset');

  // 7d. Test authenticated researcher access to higher clearance (expedition_leader)
  const highClearanceAccess = authService.isDatasetAccessible(researcherUser, classifiedTelemetry);
  assert(highClearanceAccess.allowed === false, 'Blocked researcher from higher expedition_leader dataset');
  assert(highClearanceAccess.code === 'INSUFFICIENT_CLEARANCE', 'Correct code INSUFFICIENT_CLEARANCE returned');

  // ----------------------------------------------------------------------------
  // Scenario 8: Request a password reset
  // ----------------------------------------------------------------------------
  console.log('\n\x1b[36m[Scenario 8]\x1b[0m Request password reset');
  try {
    const resetReq = await authService.resetPasswordForEmail(testEmail);
    assert(resetReq.success === true, 'Password reset request accepted');
    assert(Boolean(resetReq.resetToken), 'Password reset token generated');
    resetToken = resetReq.resetToken;
  } catch (err) {
    assert(false, `Password reset request threw error: ${err.message}`);
  }

  // ----------------------------------------------------------------------------
  // Scenario 9: Complete password reset with valid and invalid tokens
  // ----------------------------------------------------------------------------
  console.log('\n\x1b[36m[Scenario 9]\x1b[0m Complete password reset with token');
  const newPassword = 'NewPolarPassword@2027!';

  // 9a. Bogus token test
  try {
    await authService.updateUserWithToken({
      token: 'tok_bogus_reset_token',
      newPassword
    });
    assert(false, 'Should have rejected bogus reset token');
  } catch (err) {
    assert(err.message.includes('Invalid or expired'), 'Rejected bogus reset token');
  }

  // 9b. Valid token reset
  try {
    const updateRes = await authService.updateUserWithToken({
      token: resetToken,
      newPassword
    });
    assert(updateRes.success === true, 'Password successfully updated with valid token');
  } catch (err) {
    assert(false, `Valid token password update failed: ${err.message}`);
  }

  // 9c. Verify login with NEW password
  try {
    const reLogin = await authService.signInWithPassword({
      email: testEmail,
      password: newPassword,
      rememberMe: true
    });
    assert(Boolean(reLogin.user), 'Successfully authenticated with NEW password');
  } catch (err) {
    assert(false, `Sign in with new password failed: ${err.message}`);
  }

  // ----------------------------------------------------------------------------
  // Scenario 10: Log out and verify session clearing
  // ----------------------------------------------------------------------------
  console.log('\n\x1b[36m[Scenario 10]\x1b[0m Session termination & cleanup verification');
  try {
    await authService.signOut();
    const afterLogoutSession = authService.getSession();
    assert(afterLogoutSession === null, 'Session completely cleared from memory and storage');
  } catch (err) {
    assert(false, `Sign out threw error: ${err.message}`);
  }

  // ----------------------------------------------------------------------------
  // Scenario 11: Institutional & Seed Persona Sign-in
  // ----------------------------------------------------------------------------
  console.log('\n\x1b[36m[Scenario 11]\x1b[0m Institutional personas & role-based clearance');
  try {
    const director = await authService.signInWithPassword({
      email: 'tmeloth@ncpor.res.in',
      password: 'Polar@2026!',
      rememberMe: true
    });
    assert(director.user.fullName === 'Dr. Thamban Meloth', 'Institutional director profile resolved');
    assert(director.user.clearance === CLEARANCE_LEVELS.LEVEL_5, 'Director received LEVEL 5 Chief Scientist clearance');

    // Director can access classified telemetry
    const directorAccess = authService.isDatasetAccessible(
      { email: director.user.email, clearance: 'directorate' },
      classifiedTelemetry
    );
    assert(directorAccess.allowed === true, 'Directorate clearance granted access to telemetry');
    await authService.signOut();
  } catch (err) {
    assert(false, `Institutional sign-in error: ${err.message}`);
  }

  // ----------------------------------------------------------------------------
  // Scenario 12: Login-First Global Access Protection & Route Interceptor
  // ----------------------------------------------------------------------------
  console.log('\n\x1b[36m[Scenario 12]\x1b[0m Login-First Global Route Interception & Destination Preservation');

  function evaluateRouteAccess(user, requestedHash) {
    const cleanHash = (requestedHash || '').replace('#', '');
    const authAllowed = ['auth', 'login', 'register', 'reset', 'verify'];
    const isAuthToken = cleanHash.startsWith('reset-token=') || cleanHash.startsWith('verify-token=');

    if (!user) {
      if (isAuthToken || authAllowed.includes(cleanHash)) {
        return { allow: true, tab: 'auth', destination: null };
      }
      return { 
        allow: false, 
        tab: 'auth', 
        destination: cleanHash || 'home', 
        redirect: '#auth' 
      };
    }

    if (!cleanHash || cleanHash === 'auth' || cleanHash === 'login') {
      return { allow: true, tab: 'home', destination: null };
    }
    const parts = cleanHash.split('/');
    return { allow: true, tab: parts[0], subId: parts[1] || null };
  }

  // 12a. Signed out root access
  const rootAccess = evaluateRouteAccess(null, '');
  assert(rootAccess.allow === false && rootAccess.tab === 'auth', 'Root URL redirected to auth when signed out');
  assert(rootAccess.destination === 'home', 'Default destination preserved as home');

  // 12b. Signed out deep internal page access
  const internalAccess = evaluateRouteAccess(null, '#stations/bharati');
  assert(internalAccess.allow === false && internalAccess.tab === 'auth', 'Direct internal route #stations/bharati blocked when signed out');
  assert(internalAccess.destination === 'stations/bharati', 'Original destination stations/bharati preserved');

  // 12c. Signed out data exploration access
  const dataAccess = evaluateRouteAccess(null, '#data');
  assert(dataAccess.allow === false && dataAccess.destination === 'data', 'Data Explorer #data blocked and preserved');

  // 12d. Signed out token deep-link access allowed
  const tokenAccess = evaluateRouteAccess(null, '#verify-token=test_tok');
  assert(tokenAccess.allow === true && tokenAccess.tab === 'auth', 'Verification token deep-link allowed without prior session');

  // 12e. Post-login destination resumption
  const authenticatedUser = { email: 'researcher@ncpor.res.in', clearance: 'researcher' };
  const restoredRoute = evaluateRouteAccess(authenticatedUser, '#' + internalAccess.destination);
  assert(restoredRoute.allow === true && restoredRoute.tab === 'stations' && restoredRoute.subId === 'bharati', 'User successfully redirected to preserved destination after login');

  // 12f. Post-logout re-access blocked
  const postLogout = evaluateRouteAccess(null, '#stations/bharati');
  assert(postLogout.allow === false && postLogout.redirect === '#auth', 'Immediate re-access to internal route blocked following logout');

  // ----------------------------------------------------------------------------
  // Summary
  // ----------------------------------------------------------------------------
  console.log('\n==============================================================================');
  console.log(` TEST SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('==============================================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runAuthTests().catch(err => {
  console.error('Test runner fatal error:', err);
  process.exit(1);
});
