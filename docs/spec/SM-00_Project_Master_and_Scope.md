# SM-00 – Project Master & Scope

## Status

`SM-00 V0.1 DRAFT / INTERNALLY CONSISTENT`

Sub-blocks:
- `SM-00A – V1 Scope Extraction & Classification`: COMPLETE
- `SM-00B – Project Master Assembly`: COMPLETE
- `SM-00C – Internal Consistency Gate`: PASS / 0 BLOCKER

## Purpose

SM-00 defines the V1 product boundary, records the first required product decisions and establishes what belongs to V1 versus later releases.

## Scope classification model

Every extracted feature is classified as one of:
- `SOURCE-FIXED`
- `V1-DECISION-REQUIRED`
- `POST-V1 / DEFERRED`

## Product baseline

StopMotion is a smartphone-first stop-motion application centered on frame-by-frame capture, onion skin assistance, timeline/playback, non-destructive frame editing, reliable autosave/recovery, image/project import, video/image export and a portable editable project archive.

## SM-D00-001 – Capture Assistance Scope

Status: `DECIDED`

V1 REQUIRED:
- Grid
- Horizon line
- Rule-of-thirds
- Simple camera stability indicator, provided no complex AI is required

V1 OPTIONAL / non-release blocker:
- Contour / edge detection

POST-V1:
- Real AI object/figure recognition

All are grouped under `Capture Assistance`. V1 is not positioned as requiring AI.

## SM-D00-002 – Visible Frame Timeline

Status: `DECIDED`

A visible frame timeline is V1 REQUIRED. At minimum it exposes thumbnails/current selection and is the common basis for capture, editing and playback.

## SM-D00-003 – Frame Reordering

Status: `DECIDED`

Free frame reordering is V1 REQUIRED.

Core invariant:
`Frame UUID = stable identity` and `sequence position/index = mutable order`.

An index must never be treated as immutable identity.

## SM-D00-004 – Playback & Project FPS

Status: `DECIDED`

V1 REQUIRED:
- Play
- Pause
- Stop / return to playback starting frame
- Loop on/off
- Timeline navigation / scrubbing / frame selection
- Current frame visible
- Frame counter
- Project-wide configurable FPS
- Playback uses project FPS
- MP4 export defaults to the same project FPS

Not mandatory for V1:
- Individual per-frame duration

The exact FPS preset list is not frozen here.

## SM-D00-005 – Camera Controls & Locks

Status: `DECIDED`

V1 REQUIRED:
- Autofocus
- Tap-to-focus
- Focus Lock + visible state
- Auto Exposure
- Exposure Compensation
- Exposure Lock + visible state
- Auto White Balance
- White Balance Lock + visible state
- Rear camera/lens selection where supported
- Zoom with visible value
- Camera State Guard: save/compare relevant camera state for a project and warn if camera/lens/zoom/locks differ

The Camera State Guard is a state check/warning mechanism, not automatic hardware restoration.

V1 OPTIONAL:
- Torch / continuous light

POST-V1:
- Front camera mandatory support
- RAW
- Manual ISO/shutter/Kelvin
- Broader pro controls

## SM-D00-006 – Autosave & Recovery

Status: `DECIDED`

Principle:
> A successfully captured frame must not be lost because of a later crash, battery loss or metadata-write failure.

V1 REQUIRED:
- Frame-first durable save
- Atomic project metadata/index update afterward
- Autosave after capture/delete/duplicate/reorder/editor/FPS/project-setting mutations
- Atomic project writes (`temp + validation + replace` concept)
- Recovery on app start
- Orphan-frame detection and recovery
- No silent deletion of damaged data
- At least one previous valid project state/recovery snapshot
- Storage-space check before capture
- Visible project status: `Normal`, `Saving`, `Recovered`, `Attention Required`

Required failure behavior:
- Crash after image save but before metadata update → orphan can be recovered
- Crash during image write → incomplete file is not a valid frame
- Crash during project write → previous valid project state retained
- Battery loss after fully saved capture → frame retained
- Storage full → capture prevented or cleanly aborted
- Damaged project file → restore last valid state + inspect frame inventory
- Missing/damaged single frame → project remains openable and frame is marked
- Normal exit → no manual save required

Recovery levels:
- `LEVEL 0 – Normal`
- `LEVEL 1 – Automatic Recovery`
- `LEVEL 2 – User Review Required`

## SM-D00-007 – Portable Project Archive

Status: `DECIDED`

V1 requires:
- MP4 video export
- PNG/JPG frame export
- Complete portable editable project archive import/export

The archive must enable functionally equivalent editable restoration after export → import.

It includes originals/order/metadata/FPS/onion settings/aspect ratio/annotations/edits/resources, is versioned/schema-aware, portable/offline and does not depend on absolute device paths.

Import validates archive/manifest/version/required data/references. A corrupt archive must not overwrite an existing project. Default import creates a new local project instance.

Exact archive extension and container layout are deferred to SM-06/07.

## SM-D00-008 – Frame Editor V1 Scope

Status: `DECIDED`

V1 REQUIRED:
- Select frame
- Delete
- Duplicate
- Insert Empty Frame
- Move/reorder
- Undo for technically defined operations
- Non-destructive text annotation
- Text position
- Font size
- Color
- Regular/Bold
- Edit/delete annotation

V1 OPTIONAL:
- Simple markers
- Simple frames/borders

POST-V1:
- Drawing/brush
- Complex shapes
- Stickers
- Filters
- Image correction
- Layers
- Advanced typography

Empty Frames are real frame types, not fake photos. Annotation state is stored separately and composed non-destructively with the frame.

## SM-00C notes

`C-01`: suitable camera/lens selection is required; exact behavior belongs SM-04.

`C-02`: Stop/return to playback starting point is required; exact starting semantics belong SM-05.

`C-03`: explicit individual image import is V1 REQUIRED; supported formats and pipeline details belong SM-07.

## Gate result

`SM-00C = PASS / 0 BLOCKER`

SM-00 is internally consistent but is not marked FROZEN.