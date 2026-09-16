# SM-07 – Import & Export V0.1

## Status

`CORRECTED UNDER SM-CHG-0001 / VERIFICATION PENDING / NOT RE-FROZEN`

This document contains the SM-07 contract after the authorized `SM-CHG-0001` correction. The correction restores the already-authoritative V1 Portable Project Archive capability from `SM-D00-007` and `ARC-001…ARC-010`. It introduces no new product capability beyond that authority.

Final verification and re-freeze are separate later steps and are not performed by this correction.

## Authority

SM-07 owns external Import/Export recognition, validation, eligibility, transformation/output and Import/Export success/failure semantics. It does not own UI/navigation (SM-03), camera/capture (SM-04), Sequence/playback/editor/Undo (SM-05), or persistence/recovery (SM-06).

SM-07 also owns the transfer-format boundary for the V1 Portable Project Archive. Project semantics remain owned by their existing blocks, and durable persistence/recovery remains SM-06 authority.

# Import

## V1 scope

Required V1 import classes:

- external individual images, PNG and JPEG/JPG;
- portable editable Project Archive.

Image Import and Project Archive Import are distinct transfer classes. Project Archive Import is not image import, Recovery, Undo, or project merge.

## Individual image import pipeline

`External Image Input -> Recognition -> Candidate -> Validation/Decode -> Registration Eligibility -> Registration -> Import Success -> SM-05 -> SM-06 Pending Persistence`

Candidate != Imported Frame. Only successful registration creates an Imported Frame.

External image import receives a new stable `frameId`. A Recovered Orphan retains an existing recoverable `frameId` and belongs to SM-06 recovery semantics.

Import Failure != Missing/Damaged/Empty/Recovered Orphan.

Image Import Success != Persistence Success. A later persistence failure does not retroactively turn a successful image import into Import Failure.

## Multi-image import

A multi-image input is an ordered batch of individual image candidates, not a group entity and not a group Sequence mutation. External supplied order is preserved.

Each successful candidate consumes the frozen SM-05 imported-frame placement/selection semantics. Importing the same external file multiple times creates distinct frames/new stable IDs; no deduplication is required.

Failure policy:

`FIRST IMPORT FAILURE -> STOP CURRENT MULTI-IMAGE PROCESSING`

Prior successful registrations remain. The failed candidate is FAILED. Later candidates are NOT PROCESSED. There is no rollback, skip-and-continue or automatic retry.

Invariant: successful registrations form an ordered prefix of the input batch.

Selection remains SM-05-owned. Failure does not restore pre-batch selection or invent a new selection. Prior successful imports remain pending persistence under SM-06.

# Portable Project Archive

## V1 archive contract

The Portable Project Archive is a distinct V1 project-transfer artifact whose purpose is editable project roundtrip:

`Authoritative Editable Project State -> Archive Export -> Portable Project Archive -> Archive Validation -> Archive Import -> New Local Project Instance -> Editable Project State`

A successful roundtrip must restore a functionally editable project, not merely rendered media.

## Archive export – ARC-001

SM-07 must support export of an editable project archive.

Archive export is a non-mutating consumer of the authoritative project state. It does not become persistence, Recovery, Undo, or a mutation of the source project.

Archive Export Success means that one complete archive artifact sufficient for the V1 archive contract has been produced. Archive Export Success != Persistence Success.

## Required archive content – ARC-003 / ARC-004

The archive must contain or portably reference all project components required to reconstruct the exported project as a functionally editable project under the existing V1 authorities.

At the functional contract level this includes the project state required by the existing owners, including:

- project identity-bearing project data required for reconstruction,
- project metadata and project settings required for the editable project,
- authoritative Sequence membership and order,
- stable frame identities and frame types/states required for reconstruction,
- frame content/references required to reconstruct the frames,
- editable annotation ownership/order/properties required by SM-05,
- authoritative project-wide FPS,
- other durable project values already required by the V1 project contract.

This section does not transfer ownership of those semantics to SM-07. SM-05 remains authority for Sequence/editor semantics; SM-06 remains authority for Durable Project State/persistence/recovery.

Undo history, transient playback state, capture-session state and other state not required by the existing durable/editable V1 project contract are not silently promoted into archive requirements.

## Schema/version information – ARC-005

The archive must carry sufficient schema/version information for SM-07 to determine whether the archive can be validated and interpreted under a supported project-archive contract.

The exact schema encoding and concrete version representation remain implementation details.

## Portable references – ARC-006

A valid Portable Project Archive must not depend on absolute device-specific paths for successful transfer and reconstruction.

Required archive components/references must therefore be portable across supported local environments. The exact container layout and reference representation remain implementation details.

## Archive validation – ARC-007 / ARC-008

Archive validation occurs before any destructive import effect on an existing project.

Validation must establish, at minimum, that the candidate is recognizable as a supported archive contract and that its required schema/version and required project data/references are sufficiently valid and coherent for import eligibility.

`ARCHIVE CANDIDATE != IMPORTED PROJECT`

An invalid, corrupt, unsupported or insufficient archive is not Archive Import Success and must not overwrite an existing project.

Validation failure must not be converted into Recovery of an existing project and must not invent replacement project data.

## Default archive import instance – ARC-002 / ARC-009

Default successful archive import creates a **new local project instance**.

The imported project is reconstructed from the validated archive into a project state conforming to the existing SM-05 semantic contracts and then enters the SM-06 persistence boundary as a new local project instance.

The source archive's project identity data may be used as project content/provenance where required for reconstruction, but the default import must not silently overwrite or merge into an existing local project.

Project merge/replacement semantics are outside this authorized V1 correction.

## Editable restoration – ARC-003

Archive Import Success requires that the validated archive has produced a coherent new local project instance that can be handed into the existing editable project model.

A result that only yields rendered images/video, loses required editable annotations, loses required Sequence/frame identity semantics, or otherwise cannot satisfy the existing editable project contract is not a successful editable project-archive roundtrip.

Archive Import Success != durable Persistence Success. Durable persistence of the new local project belongs to SM-06. A later persistence failure does not retroactively redefine whether the archive itself passed SM-07 recognition/validation/import transformation, but the project must not be represented as durably saved until SM-06 establishes Persistence Success.

## Offline invariant – ARC-010

Portable Project Archive export/import must function without a cloud-login dependency.

This does not prohibit ordinary local platform/file access required to select, create or store an archive artifact. Cloud sync/login is not introduced by this contract.

## Cross-boundary authority

The archive transfer boundary is:

`SM-03 TRANSFER UI -> SM-07 archive recognition/validation/import/export -> reconstructed project-state handoff -> SM-05 semantic project/Sequence/editor authority + SM-06 durable persistence/recovery authority`

SM-03 continues to own UI/navigation, including the existing Project Archive Transfer surface. SM-07 must not invent a competing navigation owner.

Archive transfer is not Recovery. SM-06 Recovery does not become archive import, and archive validation does not become recovery validation of an existing project.

# Media Export

## V1 output classes

V1 media-export classes remain:

- MP4 video;
- PNG/JPG/JPEG rendered frame images packaged as one ZIP artifact.

The Portable Project Archive is a separate project-transfer/export class and is not this image ZIP.

ZIP image packaging is not project serialization or a project-exchange archive.

## Media export source and eligibility

`EXPORT SOURCE = CURRENT VALID AUTHORITATIVE PROJECT STATE`

Pending Persistence does not by itself prevent media export. Recovery Completion Pending or `RECOVERY_FAILED` is not media-export eligible. Structurally invalid/ambiguous state is not media-export eligible.

Empty Sequence is not media-export eligible. Any Missing or Damaged frame in the Sequence makes the project ineligible for both V1 media-export classes.

Eligibility requires a supported V1 media class, coherent authoritative state, completed/non-failed recovery, at least one real Sequence frame, and no Missing/Damaged Sequence frame.

These media-export eligibility rules are not silently generalized into additional archive-transfer restrictions beyond `ARC-001…ARC-010`.

## Non-mutating media-export consumer

Media export is a non-mutating consumer of project state. It must not reorder/delete/create project frames, change `frameId`, mutate annotations, mutate project selection/playhead, or perform recovery.

Media Export Success != Persistence Success. Media Export Output != Durable Project State.

## Render composition

Normal media-export frame result = Original Frame Content + current visible Editable Annotation State.

Editor chrome, Onion Skin, camera guides and other workspace-only overlays are not part of the media-export composition.

Empty Frame export canvas = opaque black canvas. Current visible annotations are rendered on top. This black canvas is a render basis, not persisted new Original Frame Content.

## MP4 timing

MP4 uses the authoritative SM-05 Sequence and authoritative project-wide `projectFPS`.

For N frames at F FPS, each Sequence frame contributes exactly one interval of `1/F`, in Sequence order, with nominal total duration `N/F`. The full eligible Sequence is exported exactly once. Selection, playhead, loop and current playback state do not alter export coverage. Empty Frames consume a normal frame interval.

## Media output completeness

MP4 success requires one complete MP4 artifact containing every source Sequence Frame exactly once and in order. Partial, truncated, skipped or duplicated output is not success.

Image export success requires one rendered PNG or JPG/JPEG image per Sequence Frame in one complete ZIP artifact. A run uses one corresponding supported image representation across all positions. Sequence-order correspondence must be deterministically reconstructable; concrete filenames/layout/manifest are implementation details.

# Requirement traceability after correction

| Requirement | Corrected SM-07 contract path |
|---|---|
| ARC-001 | Archive export |
| ARC-002 | Default archive import instance |
| ARC-003 | Required archive content + Editable restoration |
| ARC-004 | Required archive content |
| ARC-005 | Schema/version information |
| ARC-006 | Portable references |
| ARC-007 | Archive validation |
| ARC-008 | Archive validation / no overwrite |
| ARC-009 | Default archive import creates new local project instance |
| ARC-010 | Offline invariant |

This traceability table is part of the correction only. It is not the final verification gate.

# OD status

Resolved V1 Image Import ODs remain unchanged:

- `SM-07B-OD-003`
- `SM-07B-OD-005`
- `SM-07C-OD-001`
- `SM-07E-OD-001`

Resolved V1 Media Export ODs remain unchanged:

- `SM-07F-OD-001`
- `SM-07F-OD-002`
- `SM-07F-OD-003`
- `SM-07F-OD-004`
- `SM-07F-OD-005`
- `SM-07K-OD-001`

Previously deferred project-import/archive-related OD identities:

- `SM-07B-OD-001`
- `SM-07B-OD-002`
- `SM-07B-OD-004`

Their exact original semantic text has not been recovered in the transferred evidence. Under `SM-CHG-0001` they are therefore **not guessed, closed, renamed or reclassified by this correction**. Their evidence/status reconciliation remains pending and must be completed before final SM-07 verification can pass if they materially affect the corrected archive contract.

# Intentionally unfrozen implementation details

The following remain implementation details unless another existing authority says otherwise:

- MP4 codec/bitrate/profile,
- JPEG quality,
- media compression parameters,
- media filenames and image-ZIP layout,
- storage destination/share workflow,
- project-archive file extension,
- project-archive concrete container/compression format,
- concrete archive filenames/directory layout,
- concrete schema encoding/version representation,
- concrete portable-reference representation.

# Correction boundary

This correction performs no change to SM-03, SM-04, SM-05 or SM-06 and introduces no capability beyond `SM-D00-007` / `ARC-001…ARC-010`.

It does not introduce cloud sync/login, collaboration/community sharing, project merge, archive history/version-control features, encryption/password-protected archives, automatic cloud backup, new media types or new editor capabilities.

# Verification state

`SM-CHG-0001 CONTRACT CORRECTION = APPLIED`

`FINAL VERIFICATION = NOT YET PERFORMED`

`RE-FREEZE = NOT AUTHORIZED / NOT PERFORMED`

`SM-AUD-01-FND-001 = NOT YET CLOSED`

The corrected contract must now be verified separately against `ARC-001…ARC-010`, preserved IMG/EXP behavior, SM-03/05/06 authority boundaries and the unresolved evidence status of the three project-import/archive OD identities before any re-freeze or audit finding closure.