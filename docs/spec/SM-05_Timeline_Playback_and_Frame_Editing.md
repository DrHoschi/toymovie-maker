# SM-05 – Timeline, Playback & Frame Editing

## Current status

`SM-05A…J COMPLETE / SM-05K PASS / TML 6/6 / PLY 10/10 / EDT 14/14 / 30/30 / 0 BLOCKER / ASSEMBLY-READY / NOT FROZEN`

This document records all contracts and reconciliations completed through `SM-05K – Functional Coverage & Internal Consistency Gate`.

The next allowed step is `SM-05L – Specification Assembly V0.1`. No freeze has occurred yet.

---

# SM-05A – Scope / Responsibility Reconciliation

Status: `COMPLETE / TML 6/6 IN SCOPE / PLY 10/10 IN SCOPE / EDT 14/14 IN SCOPE / SM-03 & SM-04 FROZEN BOUNDARIES PRESERVED / 0 BLOCKER`.

SM-05 owns fachliche work on already existing registered frames:
- visible order
- selection
- navigation
- playback
- V1 non-destructive frame/text operations

SM-05 does not own:
- camera capture
- durable storage
- recovery
- import/export pipeline

Boundary:
`SM-04 Capture → valid Capture Output → Persistence/Registration → authoritative Frame exists → SM-05 Sequence/Playback/Editing`.

Sequence authority owns current order, current sequence position, selection, navigation and reorder.

Stable identity invariant:
`frameId ≠ sequencePosition`.

Timeline is a projection of authoritative Sequence, never a second data store.

Selection conceptually uses `selectedFrameId`; current position is derived.

Playback owns Play/Pause/Stop, loop, playhead, playback start point, navigation and project FPS use. Selection and playback playhead are distinct.

Editor owns V1 frame operations and non-destructive text annotation, but SEQUENCE remains authoritative for delete/duplicate/move/empty insertion.

---

# SM-05B – Sequence & Selection State Contract

Status: `COMPLETE / INTERNALLY CONSISTENT / STABLE IDENTITY & MUTABLE POSITION DEFINED / SEQUENCE + SELECTION AUTHORITY DEFINED / 0 BLOCKER`.

## Sequence contract

Sequence = authoritative ordered set of currently active project frames.

Invariants:
1. each active frameId appears at most once
2. each sequence position holds at most one frame
3. order is uniquely determinable
4. reorder does not change frame identity
5. delete removes an active member
6. duplicate creates a new identity
7. Empty Frame creates a new identity
8. selection references identity, not durable position

## Selection

Conceptual authority: `selectedFrameId`.

- valid selection must reference an active Sequence member
- `NONE` is valid
- empty Sequence implies `selectedFrameId = NONE`
- unknown/non-member IDs cannot become a valid selection
- reorder of selected frame preserves selected identity even if its position changes
- deleting a non-selected frame preserves selected identity if that frame remains active

## Move/Reorder

`MOVE(frameId,targetPosition)` changes order only.

Frame count and identity set remain unchanged.

## Delete

`DELETE(frameId)` removes that active member.

Physical file deletion is not SM-05 authority.

## Duplicate

Creates `duplicateFrameId ≠ sourceFrameId`.

Source remains present.

## Empty Frame

Creates a new stable frame identity with type `EMPTY`.

`EMPTY` is not a missing frame, damaged frame or failed capture.

## Persistence boundary

Sequence mutation success is not the same as durable-save success. Persistence belongs SM-06.

---

# SM-05C – Playback State & Playhead Contract

Status: `COMPLETE / INTERNALLY CONSISTENT / PLY 10/10 COVERED / SELECTION-PLAYHEAD SEPARATED / PROJECT FPS CONTRACT DEFINED / PLY-OD-001 RESOLVED / 0 BLOCKER`.

Playback states:
- `STOPPED`
- `PLAYING`
- `PAUSED`

Independent flag: `loopEnabled`.

Conceptual playback identities:
- `playheadFrameId`
- `playbackStartFrameId`

`selectedFrameId` and `playheadFrameId` are separate authorities.

## Playback start semantics – PLY-OD-001 RESOLVED

PLAY from STOPPED:
- valid selection exists → selected frame becomes playback start and playhead
- no valid selection but non-empty Sequence → first Sequence frame becomes start/playhead
- empty Sequence → playback cannot start

PAUSED → PLAY resumes from current playhead and does not redefine playback start.

Explicit STOP returns playhead to `playbackStartFrameId`; selection is unchanged.

## Progression/end/loop

Playback traverses authoritative Sequence order.

Timing is based on one project-wide `projectFPS`; no required per-frame duration.

Natural end with loop OFF:
- state → STOPPED
- playhead remains final frame

Loop ON:
- after Sequence end, continue at `playbackStartFrameId`
- no separate loop range in V1

Frame counter derives from playhead position and total sequence count.

Empty Frames participate at normal project FPS.

---

# SM-05D – Frame Editor & Non-Destructive Annotation Contract

Status: `COMPLETE / INTERNALLY CONSISTENT / TEXT EDITOR V1 CONTRACT DEFINED / NON-DESTRUCTIVE SEPARATION DEFINED / EDT-007…014 COVERED / 0 BLOCKER`.

Editor context conceptually uses `editorFrameId = existing frameId`; it is not a copied editor identity.

Sequence remains authoritative for frame identity/order/delete/duplicate/move/empty.

## V1 text annotation

Required editable properties:
- add text
- edit text
- position
- font size
- color
- regular/bold
- delete annotation

Annotation uses stable editable `annotationId` and belongs exactly one frame.

Multiple text annotations per frame are allowed.

Editing preserves annotationId.

Delete annotation does not delete frame.

## Non-destructive model

`Original Frame Content + Editable Annotation State = Rendered Editor Result`.

The original image is never destructively overwritten by annotation editing.

Rendered result is not an authoritative replacement of the original.

Annotation state remains separately reconstructable/editable for portable project archive.

Annotation position is frame-relative/reproducible, not absolute device-screen coordinates.

Captured, imported and Empty Frames can carry text annotations.

---

# SM-05E – Undo & Edit Mutation Contract

Status: `COMPLETE / INTERNALLY CONSISTENT / EDT-006 COVERED / EDT-OD-004 RESOLVED / MULTI-STEP LIFO UNDO DEFINED / 0 BLOCKER`.

Undo = user-initiated reversal of a successfully completed supported mutation to the prior valid project state.

`UNDO ≠ RECOVERY`.
`UNDO ≠ storage transaction rollback`.

Undo itself is a normal autosave-relevant mutation.

One completed logical user operation = one Undo Unit.
Internal implementation substeps are not separate units.
Failed/cancelled/no-op operations produce no Undo entry.

History order is LIFO.
Multi-step Undo is required; V1 must not be limited to one level.
No fixed numerical maximum depth is frozen.

Undo history is project-bound and cannot mix projects.
Autosave does not automatically clear Undo.
Recovery snapshot is not Undo history.
No Redo requirement in V1.

## Required Sequence Undo coverage
- Move/Reorder Frame
- Delete Frame
- Duplicate Frame
- Insert Empty Frame

Undo Delete restores the same original `frameId`, content/state and prior sequence position.

Undo Duplicate removes exactly the created duplicate identity.
Undo Empty removes exactly the inserted empty identity.

## Required Annotation Undo coverage
- Add Text
- Edit Text
- Move Text
- Font Size
- Color
- Regular/Bold
- Delete Annotation

Undo Delete Annotation restores the same `annotationId` and prior properties.

Selection-only and playback-only operations are not required Undo mutations.

`EDT-OD-004 – Concrete Undo Coverage / Depth = RESOLVED` by the rules above.

---

# SM-05F – Sequence Mutation Edge Cases & Open-Detail Reconciliation

Status: `COMPLETE / INTERNALLY CONSISTENT / 5 ODs RESOLVED / 0 NEW ODs / 0 BLOCKER`.

## Post-delete selection – EDT-OD-001 RESOLVED

When deleting the selected frame:
1. select the frame now occupying the deleted frame's previous position, if one exists
2. otherwise select the new last/previous frame
3. if Sequence becomes empty → `NONE`

Deleting a non-selected frame preserves current selected identity if it remains active.

## Duplicate insertion – EDT-OD-002 RESOLVED

Duplicate is inserted immediately after source.

## Selection after Duplicate – SM-05B-OD-001 RESOLVED

The new duplicate is selected:
`selectedFrameId = duplicateFrameId`.

## Empty Frame insertion – EDT-OD-003 RESOLVED

- valid selection → insert immediately after selected frame
- no selection + non-empty Sequence → append at end
- empty Sequence → first frame

## Selection after Empty – SM-05B-OD-002 RESOLVED

New Empty Frame is selected.

These rules implement local continuity and new-object focus without changing Sequence authority.

`SM-05E-OD-001 – Selection after Undo Restore` was intentionally left for SM-05I at this stage.

---

# SM-05G – Playback Interaction Edge Cases & Open-Detail Reconciliation

Status: `COMPLETE / INTERNALLY CONSISTENT / 5 PLAYBACK ODs RESOLVED / 0 NEW PLAYBACK ODs / PLY 10/10 DETERMINISTIC / 0 BLOCKER`.

## SM-05C-OD-001 – Runtime FPS Change Application – RESOLVED

A confirmed projectFPS change applies from the next frame interval that has not yet started.

The currently running interval is not retroactively shortened/extended.

When PAUSED, the new FPS applies on next resume.

## SM-05C-OD-002 – Scrub during PAUSED – RESOLVED

Scrubbing moves `playheadFrameId` to the chosen valid frame, leaves `playbackStartFrameId` unchanged and does not require Selection to synchronize with playhead.

Resume continues from current playhead. STOP still returns to original playback start.

## SM-05C-OD-003 – Navigation during PLAYING – RESOLVED

Explicit user timeline/scrub navigation during PLAYING first transitions playback to PAUSED, then moves playhead.

The playback start point remains unchanged.

## SM-05C-OD-004 – Sequence Mutation during PLAYING/PAUSED – RESOLVED

Structural Sequence mutation is not directly executed while PLAYING.

Flow:
`PLAYING → mutation request → PAUSED → mutation`.

During PAUSED, mutations are permitted, followed by revalidation of `playheadFrameId` and `playbackStartFrameId`.

Reorder preserves their stable identities.
Duplicate/Empty do not invalidate them.
Delete of unrelated frame leaves them unchanged.

Delete of playhead or playback-start frame applies the same local-continuity replacement rule as post-delete selection.

If Sequence becomes empty:
- `playheadFrameId = NONE`
- `playbackStartFrameId = NONE`
- playback state = STOPPED

## SM-05C-OD-005 – Missing/Damaged Frame Playback – RESOLVED

A missing/damaged frame remains part of Sequence position but must not masquerade as a valid rendered frame.

When reached during playback:
- transition to PAUSED
- playhead remains on problem frame
- problem state is visible
- no automatic skip

Manual navigation remains possible. Repair/recovery is SM-06 authority.

---

# SM-05H – Annotation Edge Cases & Open-Detail Reconciliation

Status: `COMPLETE / INTERNALLY CONSISTENT / 7 SM-05D ODs RESOLVED / 0 NEW ANNOTATION ODs / 0 BLOCKER`.

## SM-05D-OD-001 – Missing/Damaged Frame Editing – RESOLVED

Existing annotation state is retained, but normal annotation editing is locked while no reliably renderable frame basis is available.

Missing/damaged base content does not delete annotations.

## SM-05D-OD-002 – Annotation Overlap / Rendering Order – RESOLVED

Annotations have deterministic stable rendering order. Later-created annotations render in front of earlier-created annotations.

No V1 layer editor or manual Z-order controls are introduced.

## SM-05D-OD-003 – Position Bounds – RESOLVED

Annotation anchor must remain within logical frame bounds, not device-screen bounds.

## SM-05D-OD-004 – Text Wrapping – RESOLVED

Text may render multi-line and must wrap reproducibly within frame presentation. No advanced text-box/paragraph typography capability is implied.

## SM-05D-OD-005 – Empty Text – RESOLVED

A newly started text annotation with no confirmed non-empty text produces no valid annotation.

An existing annotation committed to empty text is treated as deleted.

## SM-05D-OD-006 – Editor Context after Active Frame Removal – RESOLVED

Deleting `editorFrameId` ends that editor context and returns to `SCR-03 – Sequence Workspace`.

The replacement selected frame from SM-05F is not silently opened as new editorFrameId.

## SM-05D-OD-007 – Annotation State on Frame Duplicate – RESOLVED

Frame Duplicate copies the complete editable frame state at duplication time, including annotations.

However duplicate annotations receive new identities:
- source frame identity ≠ duplicate frame identity
- source annotation identity ≠ duplicate annotation identity

Copied annotation values include text, position, font size, color, regular/bold and relative render order.

Source and duplicate remain independently editable.

Physical copy/reference strategy is deferred to storage/architecture.

---

# SM-05I – Undo Lifecycle & Grouping Edge Cases Reconciliation

Status: `COMPLETE / INTERNALLY CONSISTENT / 5 SM-05E ODs RESOLVED / 0 NEW UNDO ODs / 0 BLOCKER`.

## SM-05E-OD-001 – Selection after Undo Restore – RESOLVED

Undo restores the valid Selection context associated with the mutation when required for correct reversal.

Example: deleting selected B selects C according to post-delete rule; Undo Delete restores B with the same identity and restores the pre-delete selection B.

Undo Duplicate/Empty creation removes the created frame and restores the valid selection context from before that creation mutation.

Pure Selection itself still does not become a required Undo Unit.

## SM-05E-OD-002 – History across Project Close/Reopen – RESOLVED

The active Undo History ends when the project is closed/left.

Reopening the project begins a new Undo History for new mutations.

Undo histories from different projects never mix.

## SM-05E-OD-003 – History across App Restart – RESOLVED

Undo History is not persisted across a full app restart.

Persistence/Recovery restores project state, not an old Undo stack.

## SM-05E-OD-004 – Text Editing Undo Grouping – RESOLVED

One connected text-edit session up to a semantic commit is one Undo Unit.

Multiple character events inside the same edit session do not create separate required Undo Units.

If an existing annotation is committed to empty text and therefore deleted, that logical edit/delete is one Undo Unit.

## SM-05E-OD-005 – Continuous Property Edit Grouping – RESOLVED

A continuous gesture from begin to end is one Undo Unit, for example:
- drag position A → B
- font size slider 20 → 30
- continuous color preview → final color

Intermediate UI events do not create required Undo units.

Separate gestures create separate units.

A gesture ending at exactly the original state creates no required effective Undo entry.

Autosave does not define Undo boundaries.

---

# SM-05J – Cross-Boundary Import / Recovery Sequence Reconciliation

Status: `COMPLETE / INTERNALLY CONSISTENT / IMG-OD-001 RESOLVED / RCV-OD-001 DEFERRED TO SM-06 WITH HANDOFF CONTRACT / RCV-OD-002 UNCHANGED / 0 NEW ODs / 0 BLOCKER`.

## IMG-OD-001 – Imported Frame insertion position – RESOLVED

After SM-07 has successfully produced/registered an Imported Frame:
- valid selection → insert immediately after selected frame
- no selection + non-empty Sequence → append at end
- empty Sequence → first frame
- imported frame is selected after successful insertion

The imported frame has its own stable frameId.

SM-05 does not define import decoding/formats/validation/error handling; those remain SM-07 authority.

Import is not silently added to required Undo coverage by this rule.

## RCV-OD-001 – Recovered orphan sequence position – DEFERRED TO SM-06

Recovery is not a normal user insertion operation.

SM-05 therefore does not invent an orphan insertion position based on current Selection or detection order.

Binding handoff contract:
> SM-06 must determine a deterministic recovery registration position before the recovered orphan becomes a normal Sequence member. After registration, SM-05 owns it as a normal frame with stable identity and definite position.

SM-06 may later define evidence and fallback rules using prior project state, capture context, predecessor/successor information, snapshots or user review.

No permanent shadow recovery sequence is allowed.

Selection behavior for recovered orphan remains for SM-06 recovery flow.

## RCV-OD-002

`Recovered status lifetime` is not a Sequence concern and remains OPEN / NON-BLOCKING for SM-06. SM-05J does not alter it.

---

# SM-05K – Functional Coverage & Internal Consistency Gate

Status: **PASS**.

## Requirement coverage

| Group | Required | Covered | Result |
|---|---:|---:|---|
| TML | 6 | 6 | PASS |
| PLY | 10 | 10 | PASS |
| EDT | 14 | 14 | PASS |
| TOTAL | 30 | 30 | PASS |

## Timeline gate

TML 6/6 PASS:
- visible timeline
- current order
- select frame
- current selected frame determinable
- move frame
- reorder preserves stable identity

## Playback gate

PLY 10/10 PASS:
- Play
- Pause
- Stop
- return to defined start
- Loop
- navigation/scrubbing
- current playback frame
- frame counter
- configurable project FPS
- playback uses project FPS

All five SM-05C-generated ODs are resolved.

## Editor gate

EDT 14/14 PASS:
- select
- delete
- duplicate
- empty frame
- move/reorder
- Undo
- add/edit text
- position
- font size
- color
- regular/bold
- delete annotation
- non-destructive editing

## Consistency checks

PASS:
- stable frame identity vs mutable position
- one authoritative Sequence
- selectedFrameId vs playheadFrameId separation
- playheadFrameId vs playbackStartFrameId separation
- editorFrameId vs selection separation
- duplicate frame/annotation identity separation
- Undo restores original frame/annotation identities where applicable
- Undo vs Recovery separation
- Undo vs Autosave separation
- Missing/Damaged vs Empty distinction
- Imported Frame cross-boundary behavior
- recovered orphan handoff to SM-06

## SM-03 frozen boundary check

Freeze guards 7/7 preserved:
- FG01 Open Behavior Preservation
- FG02 Specification Authority
- FG03 Settings Scope
- FG04 Camera State Guard remains observational
- FG05 Sequence Authority retained
- FG06 Recovery semantics preserved
- FG07 Device layout vs project format preserved

## SM-04 frozen boundary check

SM-05 does not claim camera session/state/capture output/onion/capture-assistance authority.

Boundary remains:
`SM-04 valid Capture Output → Persistence/Registration → authoritative Frame → SM-05`.

## Open-detail accounting

Resolved in SM-05:
- PLY-OD-001
- EDT-OD-001
- EDT-OD-002
- EDT-OD-003
- EDT-OD-004
- IMG-OD-001
- SM-05B-OD-001/002
- SM-05C-OD-001…005
- SM-05D-OD-001…007
- SM-05E-OD-001…005

Deferred/unchanged:
- `RCV-OD-001` → SM-06, explicit handoff contract
- `RCV-OD-002` → SM-06, unchanged

## Scope-expansion audit

No unauthorized V1 requirements were added for:
- Redo
- per-frame duration
- reverse playback
- playback-speed multiplier
- loop ranges
- drawing/brush
- shapes/stickers/filters
- layer editor/manual Z-order
- advanced typography
- audio
- persistent Undo History
- automatic damaged-frame repair
- camera functionality
- export encoding
- recovery engine

## Gate result

`SM-05K – Functional Coverage & Internal Consistency Gate = PASS / 30/30 / 0 BLOCKER`.

SM-05 is **ASSEMBLY-READY**, but explicitly **NOT FROZEN**.

## Next allowed step

`SM-05L – Specification Assembly V0.1`

Only assemble/consolidate SM-05A…K into the formal V0.1 document. Do not perform Final Verification or Freeze in the same step.