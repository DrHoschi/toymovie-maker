# SM-02 – Functional Specification V0.1

## Status

`V0.1 DRAFT / PASS / 0 BLOCKER / 106/106 REQUIREMENTS COVERED`

- `SM-02A – Functional Requirement Inventory`: COMPLETE
- `SM-02B – Behavior Contracts`: COMPLETE / INTERNALLY CONSISTENT
- `SM-02C – Specification Assembly`: COMPLETE
- `SM-02D – Verification Gate`: PASS / 0 BLOCKER

## Requirement inventory

Total: **106 atomic V1 REQUIRED requirements**.

### PRJ – Project Management (9)
- `PRJ-001` Create project
- `PRJ-002` Project name
- `PRJ-003` Portrait project format
- `PRJ-004` Landscape project format
- `PRJ-005` Square project format
- `PRJ-006` List projects
- `PRJ-007` Open project
- `PRJ-008` Duplicate project
- `PRJ-009` Delete project

### CAP – Camera/Capture (20)
- `CAP-001` Live preview
- `CAP-002` Capture photo frame
- `CAP-003` Add capture to project sequence
- `CAP-004` Rear camera support
- `CAP-005` Select supported rear cameras/lenses
- `CAP-006` Zoom
- `CAP-007` Visible zoom value
- `CAP-008` Autofocus
- `CAP-009` Tap-to-focus
- `CAP-010` Focus Lock
- `CAP-011` Visible Focus Lock state
- `CAP-012` Auto Exposure
- `CAP-013` Exposure Compensation
- `CAP-014` Exposure Lock
- `CAP-015` Visible Exposure Lock state
- `CAP-016` Auto White Balance
- `CAP-017` White Balance Lock
- `CAP-018` Visible White Balance Lock state
- `CAP-019` Compare effective camera state with expected project state
- `CAP-020` Warn on camera-state deviation

### ONS – Onion Skin (5)
- `ONS-001` Onion on/off
- `ONS-002` Previous frames as overlay
- `ONS-003` Select 1–5 previous frames
- `ONS-004` Base opacity configurable
- `ONS-005` Older previous frames progressively weaker

### AST – Capture Assistance (5)
- `AST-001` Grid
- `AST-002` Horizon
- `AST-003` Rule-of-thirds
- `AST-004` Camera stability assessed
- `AST-005` Stability result visible

### TML – Timeline (6)
- `TML-001` Visible timeline
- `TML-002` Current authoritative order represented
- `TML-003` Select frame
- `TML-004` Current selected frame determinable
- `TML-005` Move frame
- `TML-006` Reorder preserves stable frame identity

### PLY – Playback (10)
- `PLY-001` Play
- `PLY-002` Pause
- `PLY-003` Stop
- `PLY-004` Return to defined playback start
- `PLY-005` Loop
- `PLY-006` Timeline navigation/scrubbing
- `PLY-007` Current playback frame visible/determinable
- `PLY-008` Frame counter
- `PLY-009` Configurable project-wide FPS
- `PLY-010` Playback uses project FPS

### EDT – Frame Editing (14)
- `EDT-001` Select frame
- `EDT-002` Delete frame
- `EDT-003` Duplicate frame
- `EDT-004` Insert Empty Frame
- `EDT-005` Move/reorder
- `EDT-006` Undo supported operations
- `EDT-007` Add text
- `EDT-008` Edit text
- `EDT-009` Text position
- `EDT-010` Font size
- `EDT-011` Text color
- `EDT-012` Regular/Bold
- `EDT-013` Delete annotation
- `EDT-014` Non-destructive editing

### RCV – Autosave/Recovery (14)
- `RCV-001` Frame-first durable save
- `RCV-002` Autosave project mutations
- `RCV-003` Protected/atomic project metadata update
- `RCV-004` Detect inconsistent state
- `RCV-005` Detect orphan frames
- `RCV-006` Recover orphan frames
- `RCV-007` Retain previous valid state/recovery snapshot
- `RCV-008` Pre-capture storage check
- `RCV-009` Prevent/abort low-storage capture safely
- `RCV-010` Never silently delete damaged project data
- `RCV-011` Project remains openable despite one missing/damaged frame where possible
- `RCV-012` Problem frame is recognizable
- `RCV-013` Distinguish recovery level
- `RCV-014` Visible save/recovery status

### IMG – Individual Image Import (2)
- `IMG-001` Import individual image
- `IMG-002` Imported image becomes a frame

### EXP – Media Export (5)
- `EXP-001` Video export
- `EXP-002` MP4
- `EXP-003` MP4 defaults to project FPS
- `EXP-004` Individual frame/image export
- `EXP-005` PNG/JPG

### ARC – Portable Project Archive (10)
- `ARC-001` Export editable project archive
- `ARC-002` Import editable project archive
- `ARC-003` Imported archive restores an editable project
- `ARC-004` Archive contains all required project components
- `ARC-005` Schema/version information
- `ARC-006` No dependency on absolute device paths
- `ARC-007` Validate archive before destructive import effects
- `ARC-008` Invalid archive must not overwrite an existing project
- `ARC-009` Default import creates a new local project instance
- `ARC-010` Offline/no cloud-login dependency

### SET – Settings (6)
- `SET-001` German language
- `SET-002` English language
- `SET-003` Default onion frame count
- `SET-004` Default onion opacity
- `SET-005` Relevant capture-assistance defaults
- `SET-006` Default project format

## Explicitly excluded from required V1

Optional V1:
- Contour/edge detection
- Simple markers
- Simple frames/borders
- Torch

Post-V1 / deferred:
- AI object recognition
- Audio tracks
- Cloud sync/login
- Community sharing
- Templates/packs
- RAW
- Manual ISO/shutter/Kelvin
- Advanced editor capabilities
- Per-frame duration
- Tablet optimization as a separate feature set
- Web editor

## Core behavior invariants from SM-02B

- One accepted capture produces at most one valid frame result; no phantom frames.
- Camera state truth is the effective state, not merely requested state.
- Camera State Guard result is `MATCH`, `DEVIATION` or `UNKNOWN`; it is observational, not automatic restoration.
- Onion Skin uses previous frames only, maximum 5, graduated opacity, non-destructive.
- Stability result uses `STABLE`, `UNSTABLE`, `UNKNOWN` or `NOT ASSESSABLE` semantics.
- Stable frame identity is distinct from mutable sequence position.
- One project-wide FPS; no required per-frame duration.
- Editor text annotations are non-destructive.
- Recovery uses frame-first durable save, protected metadata update, orphan recovery, previous valid state and low-storage protection.
- Recovery levels are LEVEL 0/1/2 and are distinct from visible statuses `Normal`, `Saving`, `Recovered`, `Attention Required`.
- Individual image import creates a stable imported frame.
- Portable archive roundtrip must restore functional editability.
- DE/EN language modes provide equivalent functionality; user content is not translated.
- Settings defaults initialize new projects; existing project values are independent rather than live-bound to later default changes.

## Open-detail set produced by SM-02B

Originally preserved as OPEN / NON-BLOCKING:
1. `PLY-OD-001 – Playback Starting Point Semantics`
2. `EDT-OD-001 – Selection after deleting selected frame`
3. `EDT-OD-002 – Duplicate insertion position`
4. `EDT-OD-003 – Empty Frame insertion position`
5. `EDT-OD-004 – Concrete Undo coverage/depth`
6. `RCV-OD-001 – Recovered orphan sequence position`
7. `RCV-OD-002 – Recovered status lifetime`
8. `IMG-OD-001 – Imported frame insertion position`

Later status after SM-05 reconciliation:
- PLY-OD-001: RESOLVED in SM-05C
- EDT-OD-001: RESOLVED in SM-05F
- EDT-OD-002: RESOLVED in SM-05F
- EDT-OD-003: RESOLVED in SM-05F
- EDT-OD-004: RESOLVED in SM-05E
- IMG-OD-001: RESOLVED in SM-05J
- RCV-OD-001: DEFERRED TO SM-06 with explicit handoff contract
- RCV-OD-002: OPEN / NON-BLOCKING / remains SM-06 territory

## Gate result

`SM-02D = PASS / 106/106 / 0 BLOCKER`

SM-02 remains a V0.1 draft and is not frozen.