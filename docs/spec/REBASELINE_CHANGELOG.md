# Rebaseline Changelog

## Branch

`feature/stopmotion-v1-spec-rebaseline`

## Purpose

Capture the newly structured StopMotion V1 specification independently from the legacy prototype code on `main`.

## Baseline documentation transferred

- README and specification navigation
- MASTER_INDEX
- STATUS
- consolidated PROJECT_DOCUMENTATION
- SOURCE_BASELINE_REFERENCE
- SM-00 Project Master & Scope
- SM-01 Decision & Change Log
- SM-02 Functional Specification with the authoritative 106-row SM-02A inventory
- SM-03 frozen UI/UX & Navigation contract
- SM-04 frozen Camera & Capture Engine contract
- SM-05 Timeline, Playback & Frame Editing contract
- SM-06 frozen Persistence, Autosave & Recovery contract
- SM-07 frozen Import & Export contract
- OPEN_DETAILS_AND_HANDOFFS

## V1 total-audit documentation added

- `SM-AUD-00_V1_Total_Audit_Scope_and_Evidence.md`
- `SM-AUD-01A_Authoritative_106_Row_Baseline_Recovery.md`

Repository inspection recovered the exact authoritative SM-02A requirement inventory from `SM-02_Functional_Specification.md`.

`SM-AUD-01-EG-001` is therefore resolved as an evidence blocker.

## Important audit observation

The recovered SM-02A inventory contains ten V1 REQUIRED Portable Project Archive requirements (`ARC-001…ARC-010`). The later SM-07 contract locally deferred Project File / Project Data Import. This has deliberately not been reconciled or rewritten during the documentation sync; it is an explicit SM-AUD-01 audit target.

## Current authoritative endpoint

`SM-AUD-01A = PASS / 106-ROW BASELINE RECOVERED / SM-AUD-01 READY TO RESUME`.

## Explicitly not done by this documentation sync

- no legacy implementation reconciliation
- no merge to `main`
- no modification of frozen product contracts
- no invented/rephrased SM-02A requirements
- no SM-AUD-01 coverage verdict
- no SM-AUD-02+ work

This changelog exists so the documentation transfer itself can be audited without confusing it with product implementation or a new specification decision.
