# SM-07 – Import & Export V0.1

## Status

`COMPLETE / FINAL-VERIFIED / FROZEN`

This document records the frozen SM-07 contract from the V1 specification process. It is a documentation transfer only; it introduces no new product decision.

## Authority

SM-07 owns external Import/Export recognition, validation, eligibility, transformation/output and Import/Export success/failure semantics. It does not own UI/navigation (SM-03), camera/capture (SM-04), Sequence/playback/editor/Undo (SM-05), or persistence/recovery (SM-06).

# Import

## V1 scope

Required V1 import: external individual images, PNG and JPEG/JPG.

Portable/editable Project File / Project Data Import was deferred in the SM-07 line and is not silently reintroduced by this document. Its relationship to the authoritative SM-02A ARC requirements is intentionally left for the V1 total audit.

## Pipeline

`External Image Input -> Recognition -> Candidate -> Validation/Decode -> Registration Eligibility -> Registration -> Import Success -> SM-05 -> SM-06 Pending Persistence`

Candidate != Imported Frame. Only successful registration creates an Imported Frame.

External image import receives a new stable `frameId`. A Recovered Orphan retains an existing recoverable `frameId` and belongs to SM-06 recovery semantics.

Import Failure != Missing/Damaged/Empty/Recovered Orphan.

Import Success != Persistence Success. A later persistence failure does not retroactively turn a successful import into Import Failure.

## Multi-image import

A multi-image input is an ordered batch of individual image candidates, not a group entity and not a group Sequence mutation. External supplied order is preserved.

Each successful candidate consumes the frozen SM-05 imported-frame placement/selection semantics. Importing the same external file multiple times creates distinct frames/new stable IDs; no deduplication is required.

Failure policy:

`FIRST IMPORT FAILURE -> STOP CURRENT MULTI-IMAGE PROCESSING`

Prior successful registrations remain. The failed candidate is FAILED. Later candidates are NOT PROCESSED. There is no rollback, skip-and-continue or automatic retry.

Invariant: successful registrations form an ordered prefix of the input batch.

Selection remains SM-05-owned. Failure does not restore pre-batch selection or invent a new selection. Prior successful imports remain pending persistence under SM-06.

# Export

## V1 output classes

- MP4 video.
- PNG/JPG/JPEG rendered frame images packaged as one ZIP artifact.

ZIP packaging is not project serialization or a project-exchange archive.

## Export source and eligibility

`EXPORT SOURCE = CURRENT VALID AUTHORITATIVE PROJECT STATE`

Pending Persistence does not by itself prevent export. Recovery Completion Pending or `RECOVERY_FAILED` is not export eligible. Structurally invalid/ambiguous state is not export eligible.

Empty Sequence is not export eligible. Any Missing or Damaged frame in the Sequence makes the project ineligible for both V1 export classes.

Eligibility requires a supported V1 class, coherent authoritative state, completed/non-failed recovery, at least one real Sequence frame, and no Missing/Damaged Sequence frame.

## Non-mutating consumer

Export is a non-mutating consumer of project state. It must not reorder/delete/create project frames, change `frameId`, mutate annotations, mutate project selection/playhead, or perform recovery.

Export Success != Persistence Success. Export Output != Durable Project State.

## Render composition

Normal export frame result = Original Frame Content + current visible Editable Annotation State.

Editor chrome, Onion Skin, camera guides and other workspace-only overlays are not part of the export composition.

Empty Frame export canvas = opaque black canvas. Current visible annotations are rendered on top. This black canvas is a render basis, not persisted new Original Frame Content.

## MP4 timing

MP4 uses the authoritative SM-05 Sequence and authoritative project-wide `projectFPS`.

For N frames at F FPS, each Sequence frame contributes exactly one interval of `1/F`, in Sequence order, with nominal total duration `N/F`. The full eligible Sequence is exported exactly once. Selection, playhead, loop and current playback state do not alter export coverage. Empty Frames consume a normal frame interval.

## Output completeness

MP4 success requires one complete MP4 artifact containing every source Sequence Frame exactly once and in order. Partial, truncated, skipped or duplicated output is not success.

Image export success requires one rendered PNG or JPG/JPEG image per Sequence Frame in one complete ZIP artifact. A run uses one corresponding supported image representation across all positions. Sequence-order correspondence must be deterministically reconstructable; concrete filenames/layout/manifest are implementation details.

## OD status

Resolved V1 Import ODs: 4.

- `SM-07B-OD-003`
- `SM-07B-OD-005`
- `SM-07C-OD-001`
- `SM-07E-OD-001`

Resolved V1 Export ODs: 6.

- `SM-07F-OD-001`
- `SM-07F-OD-002`
- `SM-07F-OD-003`
- `SM-07F-OD-004`
- `SM-07F-OD-005`
- `SM-07K-OD-001`

Deferred/non-V1 in the SM-07 line:

- `SM-07B-OD-001`
- `SM-07B-OD-002`
- `SM-07B-OD-004`

The total audit must prove that a deferred item does not hide an authoritative V1 requirement.

## Intentionally unfrozen implementation details

MP4 codec/bitrate/profile, JPEG quality, compression parameters, filenames, ZIP layout, storage destination and share workflow remain implementation details.

## Freeze guard

Later work may consume/reference/implement/test SM-07 but may not silently reinterpret, extend, weaken, contradict or replace the frozen contract. Changes require explicit reconciliation, impact analysis, authorization, verification and an updated normative baseline.
