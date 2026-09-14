# StopMotion V1 – Open Details & Handoffs

This file is the consolidated registry of unresolved or deferred details that remain after the work completed through SM-05K.

## SM-04 frozen open details

These remain `OPEN / NON-BLOCKING / PRESERVED IN FROZEN BASELINE` and may not be silently resolved by later implementation.

### Capture Operation
- `SM-04C-OD-001 – Capture Output Handoff Lifetime`
- `SM-04C-OD-002 – User-visible Capture Cancellation`
- `SM-04C-OD-003 – Exact Persistence Acknowledgement Boundary`

### Camera State Guard
- `SM-04D-OD-001 – Zoom Comparison Tolerance`
- `SM-04D-OD-002 – Exposure Compensation Comparison Tolerance`
- `SM-04D-OD-003 – Expected Camera State Establishment Lifecycle`

### Onion / Capture Assistance
- `SM-04E-OD-001 – Onion Progressive Opacity Function`
- `SM-04E-OD-002 – Horizon Measurement Semantics`
- `SM-04E-OD-003 – Stability Evaluation Threshold`

### Capture Session
- `SM-04F-OD-001 – Capture Workspace Leave Policy`
- `SM-04F-OD-002 – Camera/Lens Switch Session Transition Strategy`

## Resolved SM-05-related original ODs

- `PLY-OD-001 – Playback Starting Point Semantics` → RESOLVED in SM-05C
- `EDT-OD-001 – Selection after deleting selected frame` → RESOLVED in SM-05F
- `EDT-OD-002 – Duplicate insertion position` → RESOLVED in SM-05F
- `EDT-OD-003 – Empty Frame insertion position` → RESOLVED in SM-05F
- `EDT-OD-004 – Concrete Undo coverage/depth` → RESOLVED in SM-05E
- `IMG-OD-001 – Imported Frame insertion position` → RESOLVED in SM-05J

## SM-05 generated ODs – all resolved

### SM-05B
- `SM-05B-OD-001 – Selection after Duplicate` → RESOLVED
- `SM-05B-OD-002 – Selection after Empty Frame Creation` → RESOLVED

### SM-05C
- `SM-05C-OD-001 – Runtime FPS Change Application` → RESOLVED
- `SM-05C-OD-002 – Timeline Navigation / Scrub Semantics During Paused Playback` → RESOLVED
- `SM-05C-OD-003 – User Navigation During Active Playback` → RESOLVED
- `SM-05C-OD-004 – Sequence Mutation During Active/Pause Playback` → RESOLVED
- `SM-05C-OD-005 – Playback Behavior for Missing/Damaged Frame` → RESOLVED

### SM-05D
- `SM-05D-OD-001 – Annotation Editing on Missing/Damaged Frame` → RESOLVED
- `SM-05D-OD-002 – Multiple Annotation Overlap / Rendering Order` → RESOLVED
- `SM-05D-OD-003 – Annotation Position Bounds Policy` → RESOLVED
- `SM-05D-OD-004 – Text Wrapping / Bounds Semantics` → RESOLVED
- `SM-05D-OD-005 – Empty Text Annotation Semantics` → RESOLVED
- `SM-05D-OD-006 – Editor Context After Active Frame Removal` → RESOLVED
- `SM-05D-OD-007 – Annotation State on Frame Duplicate` → RESOLVED

### SM-05E
- `SM-05E-OD-001 – Selection after Undo Restore` → RESOLVED
- `SM-05E-OD-002 – Undo History Lifetime Across Project Close/Reopen` → RESOLVED
- `SM-05E-OD-003 – Undo History Persistence Across App Restart` → RESOLVED
- `SM-05E-OD-004 – Text Editing Undo Grouping` → RESOLVED
- `SM-05E-OD-005 – Continuous Property Edit Undo Grouping` → RESOLVED

## Recovery handoffs to SM-06

### RCV-OD-001 – Recovered orphan sequence position

Status:
`DEFERRED TO SM-06 / NON-BLOCKING FOR SM-05`

Binding SM-05 handoff requirement:
> SM-06 must determine a deterministic recovery registration position before a recovered orphan becomes a normal Sequence member. After registration, SM-05 owns it as a normal frame with stable identity and definite position.

Do not assume current selection, detection order or append-at-end is correct without SM-06 evidence/fallback rules.

### RCV-OD-002 – Recovered status lifetime

Status:
`OPEN / NON-BLOCKING / SM-06`

SM-05 does not decide when visible `Recovered` status transitions back to `Normal`.

## Import handoff to SM-07

`IMG-OD-001` is resolved for Sequence placement after successful registration:
- valid selection → insert after selected frame
- no selection + non-empty Sequence → append
- empty Sequence → first frame
- imported frame becomes selected

SM-07 still owns:
- supported image formats
- file selection/input
- decoding
- validation
- error handling
- creation/registration success boundary

## Export handoff to SM-07

SM-05 provides:
- authoritative Sequence order
- project FPS
- non-destructive rendered frame state/annotations

SM-07 owns:
- MP4 encoding
- PNG/JPG frame export
- media pipeline details

MP4 defaults to project FPS.

## Persistence/Recovery handoff to SM-06

SM-05 mutations are autosave-relevant, but:
- mutation success ≠ durable persistence success
- physical deletion/copy strategy is not SM-05 authority
- Undo is not Recovery
- Recovery snapshot is not Undo history
- Undo history does not survive project close/reopen or app restart in V1

## Future freeze rule

No deferred/open detail may become an implementation assumption and then be treated as frozen behavior without explicit reconciliation through the appropriate document and, where required, SM-01 change control.