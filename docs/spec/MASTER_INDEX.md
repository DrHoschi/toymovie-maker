# StopMotion V1 – Master Specification Index

## Repository role of this branch

Branch: `feature/stopmotion-v1-spec-rebaseline`

This branch captures the newly planned StopMotion product as a specification baseline. The old implementation on `main` is retained only as repository history and is not treated as authoritative for the new product contracts documented here.

## Document authority order

1. SM-00 decisions and product scope
2. SM-02 functional requirements/contracts, including the authoritative 106-row SM-02A inventory
3. frozen textual contracts in SM-03…SM-07
4. visual low-fi/mockups
5. later implementation details

Implementation must conform upward; it must not silently redefine product behavior.

## Current document map

- `SM-00_Project_Master_and_Scope.md`
- `SM-01_Decision_and_Change_Log.md`
- `SM-02_Functional_Specification.md`
- `SM-03_UI_UX_and_Navigation.md`
- `SM-04_Camera_and_Capture_Engine.md`
- `SM-05_Timeline_Playback_and_Frame_Editing.md`
- `SM-06_Persistence_Autosave_and_Recovery.md`
- `SM-07_Import_and_Export.md`
- `SM-AUD-00_V1_Total_Audit_Scope_and_Evidence.md`
- `SM-AUD-01A_Authoritative_106_Row_Baseline_Recovery.md`
- `OPEN_DETAILS_AND_HANDOFFS.md` – current SM-AUD-02 OD Master Register & Handoffs
- `STATUS.md`

## V1 total-audit line

- `SM-AUD-00` – V1 Total Audit Scope / Evidence Reconciliation: COMPLETE
- `SM-AUD-01` – 106-Requirement Master Coverage Matrix: COMPLETE / PASS / 106 COVERED / 0 CONTRADICTED
- `SM-AUD-01A` – Authoritative 106-Row Baseline Recovery: PASS
- `SM-AUD-02` – OD Master Register Reconciliation: COMPLETE / PASS / 58/58 ACCOUNTED / 0 STATUS CONFLICT
- `SM-AUD-03` – Cross-Boundary Contract Audit: COMPLETE / PASS / 18/18 PASS / 0 CONFLICT / 0 EVIDENCE GAP

The repository itself provides the authoritative SM-02A 106-row inventory in `SM-02_Functional_Specification.md`. The prior evidence blocker `SM-AUD-01-EG-001` is resolved.

The current OD master register in `OPEN_DETAILS_AND_HANDOFFS.md` accounts for 58 unique OD identities exactly once:
`46 RESOLVED/FROZEN + 9 OPEN/NON-BLOCKING + 3 DEFERRED + 0 STATUS CONFLICT = 58`.

## Critical audit guard

No local block PASS or FROZEN status was promoted automatically to V1 total PASS. SM-AUD-01 individually accounted for all 106 authoritative SM-02A rows. Its original `ARC-001…ARC-010` contradiction was resolved only through the separately authorized `SM-AUD-01R` / `SM-CHG-0001` correction, verification, provenance recovery and SM-07 re-freeze chain.

Current requirement result: `SM-AUD-01-FND-001 = RESOLVED / CLOSED`; `SM-AUD-01 = COMPLETE / PASS / 106 COVERED / 0 CONTRADICTED / 0 EVIDENCE GAP`.

SM-AUD-02 did not silently resolve open ODs or reinterpret deferred ODs. Its current master result is `58/58 ACCOUNTED / 46 RESOLVED-FROZEN / 9 OPEN-NON-BLOCKING / 3 DEFERRED / 0 STATUS CONFLICT`.

## SM-AUD-03 cross-boundary audit

The frozen SM-AUD-03 audit matrix contains 18 concrete cross-boundary contracts spanning SM-00…SM-07 and the SM-AUD-02 OD/handoff lifecycle. All 18 were audited against their existing authority evidence.

Result: `18/18 PASS / 0 CONFLICT / 0 EVIDENCE GAP`.

The audit introduced 0 corrections, 0 OD re-decisions and 0 new product semantics. The 9 `OPEN / NON-BLOCKING` and 3 `DEFERRED` OD classifications remain unchanged.

## Future documents after the V1 specification audit

Technical architecture, implementation planning and validation/test specification are not authorized merely by this documentation sync. They require their own later scope/authorization.

## Final specification freeze target

Only after the V1 total audit reaches its authorized completion gate with no unresolved V1 blockers may a final project-wide specification snapshot be considered.

## Current authoritative endpoint

`SM-AUD-03 = COMPLETE / PASS / 18/18 CROSS-BOUNDARY CONTRACTS PASS / 0 CONFLICT / 0 EVIDENCE GAP`.

This endpoint preserves the SM-AUD-02 master classification of 46 `RESOLVED / FROZEN`, 9 `OPEN / NON-BLOCKING`, 3 `DEFERRED` and 0 `STATUS CONFLICT`; SM-AUD-03 did not re-decide them.

No SM-AUD-04 work is performed or authorized by this SM-AUD-03 completion/evidence/status backfill.
