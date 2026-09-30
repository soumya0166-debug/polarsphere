/**
 * Command-line runner for PolarSphere Phase 1 Verification Suite
 */

import { runPhase1VerificationSuite } from '../src/tests/phase1Verification.js';

async function main() {
  try {
    const res = await runPhase1VerificationSuite();
    console.log(res.logs.join('\n'));
    if (res.failed > 0) {
      console.error('\nTests failed with errors:', res.errors);
      process.exit(1);
    } else {
      console.log('\nAll tests passed successfully!');
      process.exit(0);
    }
  } catch (err) {
    console.error('Fatal test runner exception:', err);
    process.exit(1);
  }
}

main();
