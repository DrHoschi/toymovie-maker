# StopMotion – V1 Specification Rebaseline

This development branch contains the newly structured StopMotion V1 product specification. The legacy prototype inherited from `main` is historical material and is not the authority for the new V1 contracts.

## Start here

- [Project overview](docs/spec/PROJECT_DOCUMENTATION.md)
- [Master index and authority order](docs/spec/MASTER_INDEX.md)
- [Current status and next documentation step](docs/spec/STATUS.md)
- [Implementation and test readiness roadmap](docs/spec/V1_IMPLEMENTATION_AND_TEST_ROADMAP.md)
- [Migration assessment](docs/spec/SM-MIG-01_V1_Implementation_Baseline_and_Migration_Scope.md)
- [Open details and handoffs](docs/spec/OPEN_DETAILS_AND_HANDOFFS.md)
- [Original documentation source reference](docs/spec/SOURCE_BASELINE_REFERENCE.md)

## Current specification and audit status

- SM-00: V0.1 DRAFT / internally consistent
- SM-01: V0.1 DRAFT / PASS / 0 blocker
- SM-02: V0.1 DRAFT / 106/106 requirements covered / PASS / 0 blocker
- SM-03: FROZEN
- SM-04: FROZEN / CAP 20/20 / ONS 5/5 / AST 5/5
- SM-05: **V0.1 ASSEMBLED** / 30/30 / Final Verification not started / not frozen
- SM-06: COMPLETE / FINAL-VERIFIED / FROZEN
- SM-07: CORRECTED / FINAL-VERIFIED / RE-FROZEN
- SM-AUD-01: COMPLETE / PASS / 106/106 covered
- SM-AUD-02: COMPLETE / PASS / 58/58 OD identities accounted
- SM-AUD-03: COMPLETE / PASS / 18/18 cross-boundary contracts
- SM-AUD-04: COMPLETE / V1 Functional Completeness VERIFIED
- SM-AUD-05: COMPLETE / **BLOCKED – EXPECTED IMPLEMENTATION GAP**

SM-AUD-04 verifies the defined functional baseline. It does not establish implementation completeness, implementation verification, release readiness, or a final project-wide specification freeze. SM-AUD-05 records that V1 implementation and verification are not yet established.

## Specification map

- [SM-00 Project Master & Scope](docs/spec/SM-00_Project_Master_and_Scope.md)
- [SM-01 Decision & Change Log](docs/spec/SM-01_Decision_and_Change_Log.md)
- [SM-02 Functional Specification](docs/spec/SM-02_Functional_Specification.md)
- [SM-03 UI/UX & Navigation](docs/spec/SM-03_UI_UX_and_Navigation.md)
- [SM-04 Camera & Capture Engine](docs/spec/SM-04_Camera_and_Capture_Engine.md)
- [SM-05 Timeline, Playback & Frame Editing](docs/spec/SM-05_Timeline_Playback_and_Frame_Editing.md)
- [SM-06 Persistence, Autosave & Recovery](docs/spec/SM-06_Persistence_Autosave_and_Recovery.md)
- [SM-07 Import & Export](docs/spec/SM-07_Import_and_Export.md)
- [SM-AUD-04 Functional Completeness Gate](docs/spec/SM-AUD-04_V1_Functional_Completeness_Gate.md)
- [SM-AUD-05 Implementation / Verification Completeness](docs/spec/SM-AUD-05_V1_Implementation_Verification_Completeness.md)
- [V1 implementation and test readiness roadmap](docs/spec/V1_IMPLEMENTATION_AND_TEST_ROADMAP.md)

## Remaining specification sequence

1. Perform SM-05 Final Verification.
2. Perform the SM-05 Freeze Gate as a separate step.
3. Define SM-08 – Technical Architecture & Platform.
4. Define SM-09 – Validation & Test Specification.
5. Run SM-CA-01 – project-wide specification cross-audit.
6. Consider `STOPMOTION_V1_SPEC_SNAPSHOT_001` only after the authorized final gates pass.

After the specification baseline is ready, V1 implementation proceeds in scoped blocks and each block receives its own verification evidence. The full V1 baseline must then be mapped to implementation and tests; this is the condition for clearing SM-AUD-05. See the roadmap for dependencies and completion evidence.

## Authority rule

The authority order is: SM-00 decisions and scope → SM-02 requirements → applicable textual SM-03…SM-07 contracts → visual low-fi/mockups → implementation details. Each document's freeze status is stated in [STATUS.md](docs/spec/STATUS.md); SM-05 is assembled as V0.1; it remains not frozen until Final Verification and the separate freeze gate complete.

Implementation must conform to the approved contracts. Legacy prototype behavior and visual mockups do not silently redefine V1.
