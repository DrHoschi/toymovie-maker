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
- `OPEN_DETAILS_AND_HANDOFFS.md`
- `STATUS.md`

## V1 total-audit line

- `SM-AUD-00` – V1 Total Audit Scope / Evidence Reconciliation: COMPLETE
- `SM-AUD-01` – 106-Requirement Master Coverage Matrix: STARTED / previously evidence-blocked
- `SM-AUD-01A` – Authoritative 106-Row Baseline Recovery: PASS

The repository itself now provides the authoritative SM-02A 106-row inventory in `SM-02_Functional_Specification.md`. The prior evidence blocker `SM-AUD-01-EG-001` is resolved.

## Critical audit guard

No local block PASS or FROZEN status may be promoted automatically to V1 total PASS. SM-AUD-01 must evaluate all 106 rows individually against SM-00…SM-07.

The recovered baseline contains `ARC-001…ARC-010 – Portable Project Archive` as V1 REQUIRED. SM-07's later local deferral of Project File / Project Data Import therefore requires explicit audit treatment and may not be silently classified non-V1.

## Future documents after the V1 specification audit

Technical architecture, implementation planning and validation/test specification are not authorized merely by this documentation sync. They require their own later scope/authorization.

## Final specification freeze target

Only after the V1 total audit reaches its authorized completion gate with no unresolved V1 blockers may a final project-wide specification snapshot be considered.

## Current authoritative endpoint

`SM-AUD-01A = PASS / AUTHORITATIVE 106-ROW BASELINE RECOVERED / SM-AUD-01-EG-001 RESOLVED`.

Next permissible audit action: resume `SM-AUD-01 – 106-Requirement Master Coverage Matrix` against the exact rows in `SM-02_Functional_Specification.md`. No SM-AUD-02 work is implied by this status.
