# StopMotion – V1 Specification Rebaseline

This branch contains the newly structured StopMotion V1 product specification. The legacy prototype currently present on `main` is **not** treated as the authoritative product baseline for the new project plan.

## Current specification status

- `SM-00 – Project Master & Scope`: V0.1 DRAFT / internally consistent
- `SM-01 – Decision & Change Log`: V0.1 DRAFT / PASS / 0 blocker
- `SM-02 – Functional Specification`: V0.1 DRAFT / PASS / 106/106 requirements covered / 0 blocker
- `SM-03 – UI/UX & Navigation V0.1`: **FROZEN** / cross-audit PASS / 106/106 / smartphone + tablet low-fi baselines frozen / 0 blocker
- `SM-04 – Camera & Capture Engine V0.1`: **FROZEN** / CAP 20/20 / ONS 5/5 / AST 5/5 / 0 blocker
- `SM-05 – Timeline, Playback & Frame Editing`: through `SM-05K` / **FUNCTIONAL COVERAGE & INTERNAL CONSISTENCY PASS** / TML 6/6 / PLY 10/10 / EDT 14/14 / 30/30 / 0 blocker / ASSEMBLY-READY, not yet frozen

## Specification map

- [`docs/spec/SM-00_Project_Master_and_Scope.md`](docs/spec/SM-00_Project_Master_and_Scope.md)
- [`docs/spec/SM-01_Decision_and_Change_Log.md`](docs/spec/SM-01_Decision_and_Change_Log.md)
- [`docs/spec/SM-02_Functional_Specification.md`](docs/spec/SM-02_Functional_Specification.md)
- [`docs/spec/SM-03_UI_UX_and_Navigation.md`](docs/spec/SM-03_UI_UX_and_Navigation.md)
- [`docs/spec/SM-04_Camera_and_Capture_Engine.md`](docs/spec/SM-04_Camera_and_Capture_Engine.md)
- [`docs/spec/SM-05_Timeline_Playback_and_Frame_Editing.md`](docs/spec/SM-05_Timeline_Playback_and_Frame_Editing.md)
- [`docs/spec/OPEN_DETAILS_AND_HANDOFFS.md`](docs/spec/OPEN_DETAILS_AND_HANDOFFS.md)
- [`docs/spec/STATUS.md`](docs/spec/STATUS.md)

## Planned document sequence

1. SM-00 – Project Master & Scope
2. SM-01 – Decision & Change Log
3. SM-02 – Functional Specification
4. SM-03 – UI/UX & Navigation
5. SM-04 – Camera & Capture Engine
6. SM-05 – Timeline, Playback & Frame Editing
7. SM-06 – Project Data, Storage & Recovery
8. SM-07 – Import, Export & Media Pipeline
9. SM-08 – Technical Architecture & Platform
10. SM-09 – Validation & Test Specification
11. SM-CA-01 – Gesamt-Cross-Audit

Only after the final cross-audit reaches `PASS / 0 blocker` may `STOPMOTION_V1_SPEC_SNAPSHOT_001` be frozen.

## Authority rule

The specification authority order is:

`SM-00 Decisions → SM-02 Functional Specification → textual SM-03+ contracts → visual low-fi/mockups`.

Visual mockups must never silently override a textual requirement or a frozen contract.

## Important project rule

This branch is a **documentation/specification rebaseline** for the newly planned StopMotion product. It intentionally does not attempt to reconcile the old prototype implementation with the new contracts yet. Implementation work must follow later, explicitly authorized implementation scopes and gates.