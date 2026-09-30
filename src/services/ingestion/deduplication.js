/**
 * ==============================================================================
 * POLARSPHERE DEDUPLICATION ENGINE
 * "The Polar World, Through India's Eyes"
 * ==============================================================================
 * Detects duplicate or near-identical polar records across incoming source feeds.
 */

export class DeduplicationEngine {
  static normalizeString(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  static checkDuplicate(candidate, existingList, entityType) {
    const candidateNormTitle = this.normalizeString(candidate.title || candidate.name);

    for (const existing of existingList) {
      // 1. Exact ID / Code match
      if (candidate.doi && existing.doi && candidate.doi.toLowerCase() === existing.doi.toLowerCase()) {
        return { isDuplicate: true, matchedOn: 'DOI', existingId: existing.dataset_id || existing.publication_id };
      }

      if (candidate.code && existing.code && candidate.code.toUpperCase() === existing.code.toUpperCase()) {
        return { isDuplicate: true, matchedOn: 'CODE', existingId: existing.expedition_id || existing.project_id };
      }

      if (candidate.orcid && existing.orcid && candidate.orcid === existing.orcid) {
        return { isDuplicate: true, matchedOn: 'ORCID', existingId: existing.researcher_id };
      }

      // 2. Normalized Title match
      const existingNormTitle = this.normalizeString(existing.title || existing.name);
      if (candidateNormTitle && candidateNormTitle === existingNormTitle) {
        return {
          isDuplicate: true,
          matchedOn: 'TITLE_EXACT',
          existingId: existing.dataset_id || existing.project_id || existing.expedition_id || existing.publication_id || existing.media_id
        };
      }
    }

    return { isDuplicate: false };
  }
}
