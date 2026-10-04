# V1 Implementation and Test Readiness Roadmap

## Purpose

This roadmap connects the verified functional baseline to a testable V1 product. It is a sequencing guide, not an implementation authorization. Each following work block still needs its own scope and gate.

## Current position

- SM-AUD-04: V1 Functional Completeness VERIFIED.
- SM-AUD-05: BLOCKED because implementation and implementation-verification evidence are not established.
- SM-05: assembly-ready, not frozen.
- No V1 implementation baseline or V1-mapped test suite is evidenced at audited head `821c39592bdf5ebdd99cb5475720024988907740`.

The 9 OPEN/NON-BLOCKING and 3 DEFERRED OD identities remain as recorded in `OPEN_DETAILS_AND_HANDOFFS.md`. Their classifications are not a reason to invent behavior.

## Gate sequence before implementation

| Order | Work | Exit evidence |
|---:|---|---|
| 1 | SM-05L – assemble SM-05A…K into formal SM-05 V0.1 | Complete assembled contract with traceability preserved |
| 2 | SM-05 Final Verification | Explicit verification result against assembled SM-05 |
| 3 | SM-05 Freeze Gate | Separate freeze evidence; update status/index consistently |
| 4 | SM-08 – Technical Architecture & Platform | Approved architecture/platform decisions mapped to existing requirements and contracts |
| 5 | SM-09 – Validation & Test Specification | Requirements-based test strategy, test environments, device matrix, evidence format and exit criteria |
| 6 | SM-CA-01 – project-wide cross-audit | SM-00…SM-09 consistent, required contracts and handoffs accounted |
| 7 | V1 specification snapshot | Consider `STOPMOTION_V1_SPEC_SNAPSHOT_001` only after the authorized gates pass |

The old `STATUS.md` label that SM-05 was frozen was inconsistent with SM-05K and its own current-status section. The repository status is reconciled to **ASSEMBLY-READY / NOT FROZEN**; no product contract is changed by this correction.

## Implementation work order

After specification readiness, implementation can be split into independently scoped blocks:

1. **Project model, settings, persistence and recovery** — PRJ 9, SET 6, RCV 14.
2. **Capture and capture assistance** — CAP 20, ONS 5, AST 5.
3. **Sequence, timeline and frame editing** — TML 6, EDT 14.
4. **Playback** — PLY 10.
5. **Image import, media export and portable project archive** — IMG 2, EXP 5, ARC 10.

This order reflects dependencies: capture output is not a Sequence frame until persistence/registration; editing and playback depend on authoritative project/frame identity and Sequence state; import/export depend on the resulting canonical project model.

For each block, record the exact requirements and contract boundaries, implementation files, persistence behavior, allowed OD assumptions, focused automated tests, regression tests and any manual device evidence. Keep implementation and verification changes reviewable and traceable to the V1 baseline.

## Test evidence required for a testable V1

SM-09 should define the exact test plan. At minimum, the eventual evidence must cover:

- **Requirement traceability:** every one of the 106 V1 requirements maps to implementation and a suitable verification method, including justified non-runtime accounting.
- **Unit and contract tests:** project/frame identity, Sequence mutations, FPS/playback rules, annotation/Undo behavior, persistence/recovery transitions, import/export validation and archive round-trip invariants.
- **Integration tests:** capture-to-durable-frame registration; mutation-to-autosave; close/reopen and recovery; import-to-Sequence; project state-to-export.
- **Build/runtime checks:** reproducible test build and supported browser/native runtime checks chosen by SM-08/09.
- **Real-device verification:** camera capabilities and failure states, capture, orientation/layout, storage/recovery and import/export on the agreed target devices. Each result must name the tested build and device/OS configuration.
- **Regression evidence:** rerun affected suites for each implementation block and retain results tied to its commit/head.
- **Test data and evidence:** deterministic fixtures, expected results, logs/screenshots or recordings where useful, and explicit PASS/FAIL/BLOCKED criteria.

This roadmap does not decide target platforms, frameworks, camera APIs, storage technology, test libraries or release requirements. SM-08 and SM-09 own those decisions.

## Definition of “ready for V1 testing”

V1 is ready for the planned verification phase only when:

1. The required specification gates and project-wide audit are complete.
2. An executable V1 build exists on the implementation branch.
3. The implementation is traceable across the full authoritative 106-row baseline.
4. The SM-09 test strategy, target-device matrix and acceptance criteria are in place.
5. Focused, integration and regression tests can run against the build.
6. Device results are tied to specific builds/configurations, with failures and gaps recorded.
7. SM-AUD-05 is rerun against the concrete implementation and verification evidence.

This is test readiness, not release readiness or App Store approval.
