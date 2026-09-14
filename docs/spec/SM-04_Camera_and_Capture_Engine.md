# SM-04 – Camera & Capture Engine V0.1

## Status

`FROZEN / CAP 20/20 / ONS 5/5 / AST 5/5 / RCV BOUNDARIES PASS / 11 OPEN NON-BLOCKING DETAILS PRESERVED / 0 BLOCKER`

Freeze basis: `SM-04A…I`.

## Core responsibility

SM-04 owns camera access, effective camera state and the actual capture operation up to a valid Capture Output.

It does **not** own:
- durable project persistence
- frame order
- recovery
- import/export
- UI geometry

Boundary:
`User Capture → Camera Capture → Capture Output Ready → Durable Frame Persistence → Sequence/Project Registration`

SM-04 generally ends at `Capture Output Ready`.

`Capture success ≠ durable project-frame success`.

## SM-04A – Scope / Responsibility Reconciliation

COMPLETE / 0 BLOCKER.

- Storage/Recovery decides whether capture may start when low storage blocks it.
- Onion Skin composites prior registered frames over live preview; it does not alter camera output.
- Camera Guard compares expected project state with effective camera state.
- Capture atomicity: `1 accepted trigger → 0 or 1 valid output`.
- Preview is not Capture Output.
- Project format is not device/camera orientation.

## SM-04B – Camera State & Capability Contract

COMPLETE / INTERNALLY CONSISTENT / 0 BLOCKER.

Four semantic layers:
1. `CAPABILITY`
2. `AVAILABILITY`
3. `REQUESTED STATE`
4. `EFFECTIVE STATE`

The effective state is authoritative.

Capability: `SUPPORTED / UNSUPPORTED / UNKNOWN`.
Availability: `AVAILABLE / TEMPORARILY_UNAVAILABLE / UNKNOWN`.

Camera/lens uses a stable engine reference independent of display label.

Effective Camera State Snapshot includes at least:
- cameraRef
- zoom
- focusMode
- exposureMode
- exposureCompensation
- whiteBalanceMode

Camera State Guard minimum fields:
- Camera/Lens identity
- Zoom
- Focus Lock
- Exposure Lock
- White Balance Lock
- Exposure Compensation

Resolved:
- `SM-04B-OD-001` Exposure Compensation Guard Membership → RESOLVED / INCLUDED
- `SM-04B-OD-002` Focus Target Guard Membership → RESOLVED / EXCLUDED

## SM-04C – Capture Operation & Result Contract

States:
- `ELIGIBILITY_CHECK`
- `READY`
- `IN_PROGRESS`
- `OUTPUT_READY`
- `FAILED`
- `CANCELLED`

Terminal states:
- OUTPUT_READY
- FAILED
- CANCELLED

Eligibility includes a usable session/camera, no incompatible active capture, no external inhibit and non-blocking storage preflight.

Invariants:
- `1 accepted trigger → 0 or 1 valid Capture Output`
- no queue/burst requirement
- active capture attempts ≤ 1
- `captureAttemptId ≠ frameId`
- OUTPUT_READY means complete/usable output, not saved frame
- late events cannot resurrect a terminal attempt
- preview/onion/grid/status/UI are not baked into output
- sequence count changes only after persistence/registration

Open / non-blocking:
- `SM-04C-OD-001 – Capture Output Handoff Lifetime`
- `SM-04C-OD-002 – User-visible Capture Cancellation`
- `SM-04C-OD-003 – Exact Persistence Acknowledgement Boundary`

## SM-04D – Camera State Guard

Guard result:
- `MATCH`
- `DEVIATION`
- `UNKNOWN`

Field result:
- `FIELD_MATCH`
- `FIELD_DEVIATION`
- `FIELD_UNKNOWN`

Aggregation:
- any deviation → DEVIATION
- else any unknown → UNKNOWN
- else MATCH

Missing expected/effective values → UNKNOWN.
Expected-required but definitely unsupported → DEVIATION.

Guard is READ-ONLY:
- no camera changes
- no automatic restoration
- no silent `Expected ← Effective`

DEVIATION warns but does not automatically block capture.

Open / non-blocking:
- `SM-04D-OD-001 – Zoom Comparison Tolerance`
- `SM-04D-OD-002 – Exposure Compensation Comparison Tolerance`
- `SM-04D-OD-003 – Expected Camera State Establishment Lifecycle`

## SM-04E – Onion Skin & Capture Assistance Integration

Layer order bottom → top:
1. LIVE_PREVIEW
2. ONION_OVERLAY
3. ASSISTANCE_OVERLAY
4. STATUS/WARNING
5. UI CONTROLS

Live Preview is temporary, not persisted, not a timeline frame and not Capture Output.

Onion Skin:
- previous registered frames only
- count 0–5
- graduated opacity
- non-destructive
- follows authoritative Sequence order
- unsaved OUTPUT_READY is not a normal onion source

Capture Assistance:
- Grid = visual only
- Rule-of-thirds = visual only
- Horizon separates measurement input from visualization
- Stability states: `STABLE / UNSTABLE / UNKNOWN / NOT ASSESSABLE`
- UNSTABLE does not automatically block capture

All overlays are excluded from Capture Output.

Open / non-blocking:
- `SM-04E-OD-001 – Onion Progressive Opacity Function`
- `SM-04E-OD-002 – Horizon Measurement Semantics`
- `SM-04E-OD-003 – Stability Evaluation Threshold`

## SM-04F – Capture Session Lifecycle

Session states:
- `UNAVAILABLE`
- `INITIALIZING`
- `READY`
- `ACTIVE`
- `BUSY`
- `SUSPENDED`
- `INTERRUPTED`
- `CLOSED`
- `FAILED`

Normal path:
`UNAVAILABLE → INITIALIZING → READY → ACTIVE ↔ BUSY`

Only READY/ACTIVE are potentially capture-ready.
BUSY is exclusive.
SUSPENDED is a controlled lifecycle pause.
INTERRUPTED is external/system interruption.
CLOSED and FAILED are terminal per sessionId.

Preview availability is separate: `AVAILABLE / UNAVAILABLE / UNKNOWN`.

Interruption during BUSY still terminates the capture attempt deterministically.
Resume requires revalidation.
No background capture.

Identity separation:
`sessionId ≠ captureAttemptId ≠ frameId`.

Stale events from old sessions cannot mutate the new session.

Open / non-blocking:
- `SM-04F-OD-001 – Capture Workspace Leave Policy`
- `SM-04F-OD-002 – Camera/Lens Switch Session Transition Strategy`

## Verification and freeze

`SM-04G = PASS`
- CAP 20/20
- ONS 5/5
- AST 5/5
- RCV boundaries PASS
- 11 ODs preserved
- 0 blocker

`SM-04H` assembled V0.1 draft/freeze candidate.

`SM-04I = Final Verification PASS / 0 blocker / FREEZE-READY`.

Then explicitly frozen.

## Freeze invariants

- Requested State ≠ Effective State
- Preview ≠ Capture Output
- Capture Output ≠ Durable Frame
- 1 accepted trigger → max 1 valid output
- Guard DEVIATION ≠ automatic Capture Block
- UNSTABLE ≠ automatic Capture Block
- Session Resume ≠ Project Recovery

## Freeze guards

No later work may silently:
- change Camera/Capture authority
- add new Required V1 camera capabilities
- introduce automatic Camera State restoration
- change the one-trigger/max-one-output invariant
- merge Capture Success with Persistence Success
- move Sequence/Recovery/UI authority into SM-04
- bake overlays into Capture Output
- weaken session lifecycle/eligibility semantics
- silently resolve the 11 preserved ODs
- create different semantic behavior for smartphone vs tablet
- freeze deferred implementation details as product requirements

Any semantic change to SM-04 requires SM-01 change control.