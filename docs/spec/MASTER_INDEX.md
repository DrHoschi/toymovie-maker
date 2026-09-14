# StopMotion V1 – Master Specification Index

## Repository role of this branch

Branch: `feature/stopmotion-v1-spec-rebaseline`

This branch captures the newly planned StopMotion product as a specification baseline. The old implementation on `main` is retained only as repository history and is not treated as authoritative for the new product contracts documented here.

## Document authority order

1. SM-00 decisions and product scope
2. SM-02 functional requirements/contracts
3. frozen textual contracts in SM-03/SM-04 and later documents
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
- `OPEN_DETAILS_AND_HANDOFFS.md`
- `STATUS.md`

## Planned next documents

- `SM-06 – Project Data, Storage & Recovery`
- `SM-07 – Import, Export & Media Pipeline`
- `SM-08 – Technical Architecture & Platform`
- `SM-09 – Validation & Test Specification`
- `SM-CA-01 – Gesamt-Cross-Audit`

## Final specification freeze target

Only after all documents and the final cross-audit reach `PASS / 0 BLOCKER` may the project create:

`STOPMOTION_V1_SPEC_SNAPSHOT_001`

## Current authoritative milestone

`SM-05K = PASS / TML 6/6 / PLY 10/10 / EDT 14/14 / 30/30 / 0 BLOCKER`.

SM-05 is currently `ASSEMBLY-READY`, not frozen.

Next allowed step:
`SM-05L – Specification Assembly V0.1`.

No final verification or freeze is authorized in the same step.