# StopMotion App – Project Documentation (V1 Rebaseline)

## Purpose

This is the overview for the rebuilt StopMotion V1. The active working baseline is the development branch `feature/stopmotion-v1-spec-rebaseline`. The older prototype inherited from `main` is historical input, not the authority for the new product contracts.

## Product goal

An offline-first, smartphone-first stop-motion app with frame-by-frame capture, onion skin and capture assistance, a visible timeline, playback, non-destructive frame/text editing, autosave and recovery, image/project import, and media plus editable-project export.

## Authority

1. SM-00 decisions and scope
2. SM-02 functional requirements (106 authoritative atomic V1 requirements)
3. Applicable textual contracts SM-03…SM-07, respecting each document's freeze state
4. Visual references
5. Implementation details

The nine OPEN/NON-BLOCKING and three DEFERRED OD identities remain governed by `OPEN_DETAILS_AND_HANDOFFS.md`; they are not implicit implementation decisions. SM-05 is ASSEMBLY-READY / NOT FROZEN pending SM-05L and separate verification/freeze gates.

## Specification sequence

1. SM-00 – Project Master & Scope
2. SM-01 – Decision & Change Log
3. SM-02 – Functional Specification
4. SM-03 – UI/UX & Navigation
5. SM-04 – Camera & Capture Engine
6. SM-05 – Timeline, Playback & Frame Editing
7. SM-06 – Persistence, Autosave & Recovery
8. SM-07 – Import & Export
9. SM-08 – Technical Architecture & Platform
10. SM-09 – Validation & Test Specification
11. SM-CA-01 – Project-wide cross-audit and final specification closure

## Current status

- SM-00: V0.1 DRAFT / internally consistent
- SM-01: V0.1 DRAFT / PASS / 0 blocker
- SM-02: V0.1 DRAFT / 106/106 / PASS / 0 blocker
- SM-03: FROZEN
- SM-04: FROZEN / CAP 20/20 / ONS 5/5 / AST 5/5
- SM-05: V0.1 assembled / 30/30 / Final Verification not started / NOT FROZEN
- SM-06: COMPLETE / FINAL-VERIFIED / FROZEN
- SM-07: CORRECTED / FINAL-VERIFIED / RE-FROZEN
- SM-AUD-00…03: COMPLETE; see MASTER_INDEX.md for results
- SM-AUD-04: COMPLETE / V1 Functional Completeness VERIFIED
- SM-AUD-05: COMPLETE / BLOCKED – EXPECTED IMPLEMENTATION GAP

SM-AUD-04 establishes functional completeness of the audited V1 baseline. SM-AUD-05 separately records that implementation and implementation verification remain unestablished. Neither result establishes release readiness.

## Product invariants

- Stable frame identity is separate from sequence position.
- Requested Camera State is separate from Effective Camera State.
- Preview is not Capture Output.
- Capture Output is not a durable Frame until successful persistence/registration.
- Onion skin, assistance and UI are not baked into captured originals.
- Sequence is the sole authority for frame order.
- Selection and Playback Playhead are separate states.
- Playback uses project-wide FPS; per-frame duration is not a V1 requirement.
- Editing is non-destructive: original content plus annotation state yields the rendered result.
- Undo is not Recovery; Recovery is not Undo History.
- Empty Frame is valid and distinct from Missing/Damaged.
- Phone and tablet layouts may differ, while functional capabilities remain consistent.

## Requirement baseline

SM-02 contains 106 V1 REQUIRED requirements:
PRJ 9, CAP 20, ONS 5, AST 5, TML 6, PLY 10, EDT 14, RCV 14, IMG 2, EXP 5, ARC 10 and SET 6.

## Open handoffs

- SM-04 capture output becomes a sequence frame only after persistence/registration.
- SM-05 editing and sequence mutations hand off durable storage and recovery behavior to SM-06.
- SM-07 owns import/export pipelines; SM-05 owns sequence semantics after successful registration.
- The current OD handoffs and classifications remain in `OPEN_DETAILS_AND_HANDOFFS.md`.

## Path to implementation and testing

SM-05L assembly is complete. The next separate gate is SM-05 Final Verification, followed only if separately authorized by the SM-05 Freeze Gate. Then SM-08 defines the architecture/platform boundary, SM-09 defines validation and test evidence, and SM-CA-01 closes the complete specification baseline.

After those gates pass, implementation proceeds in dependency-ordered, requirement-traceable blocks. Each block gets scoped implementation and verification evidence. The complete 106-requirement baseline is then re-evaluated for implementation/verification completeness; device/build evidence is mapped to the target platform and concrete tested build. The detailed exit conditions and work order are in `V1_IMPLEMENTATION_AND_TEST_ROADMAP.md`.

## Freeze rule

A contract freezes only through its explicit freeze gate. The project snapshot `STOPMOTION_V1_SPEC_SNAPSHOT_001` is considered only after SM-00…SM-09 and SM-CA-01 reach their required completion status. Functional completeness alone is not implementation completion, test completion or release readiness.
