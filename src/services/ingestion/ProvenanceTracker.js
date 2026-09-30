/**
 * ==============================================================================
 * POLARSPHERE PROVENANCE TRACKER
 * "The Polar World, Through India's Eyes"
 * ==============================================================================
 * Ensures every ingested polar record tracks its exact origin, source system,
 * timestamp, checksum, and verification confidence.
 */

export class ProvenanceTracker {
  static create({
    sourceSystem = 'NCPOR_NPDC',
    originalUrl = '',
    externalSourceId = '',
    confidence = 1.0,
    notes = '',
    checksum = ''
  } = {}) {
    if (!sourceSystem) {
      throw new Error('Provenance requires a non-empty sourceSystem identifier.');
    }

    return {
      sourceSystem,
      originalUrl,
      externalSourceId,
      ingestionTimestamp: new Date().toISOString(),
      checksum: checksum || this.generateSimpleChecksum(externalSourceId + originalUrl),
      processingStatus: 'verified',
      processingVersion: (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_INGESTION_VERSION : undefined) || 'v1.0.0-phase1',
      confidence: Math.max(0, Math.min(1.0, confidence)),
      notes
    };
  }

  static generateSimpleChecksum(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return 'chk_' + Math.abs(hash).toString(16);
  }

  static verify(provenance) {
    if (!provenance || typeof provenance !== 'object') return false;
    return Boolean(
      provenance.sourceSystem &&
      provenance.ingestionTimestamp &&
      provenance.processingVersion
    );
  }
}
