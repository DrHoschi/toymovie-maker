# StopMotion V1 – OD Master Register & Handoffs

## Status

`SM-AUD-02 OD MASTER INVENTORY & CLASSIFICATION / VERIFIED / 58 UNIQUE OD IDS`

This file supersedes its earlier role as a registry only through SM-05K. Historical handoff states are preserved below where relevant, but the current classification is reconciled against the latest applicable authorities through corrected/final-verified/re-frozen SM-07.

This reconciliation introduces no new product decision and resolves no previously open OD.

## Verified master count

| Classification | Count |
|---|---:|
| `RESOLVED / FROZEN` | 46 |
| `OPEN / NON-BLOCKING` | 9 |
| `DEFERRED` | 3 |
| `STATUS CONFLICT` | 0 |
| **TOTAL UNIQUE OD IDS** | **58** |

Control equation: `46 + 9 + 3 + 0 = 58`.

## OPEN / NON-BLOCKING – 9

These remain open under the latest applicable authority. They may not become implementation assumptions or be silently treated as frozen behavior.

### SM-04 Capture Operation
- `SM-04C-OD-002 – User-visible Capture Cancellation`

### SM-04 Camera State Guard
- `SM-04D-OD-001 – Zoom Comparison Tolerance`
- `SM-04D-OD-002 – Exposure Compensation Comparison Tolerance`
- `SM-04D-OD-003 – Expected Camera State Establishment Lifecycle`

### SM-04 Onion / Capture Assistance
- `SM-04E-OD-001 – Onion Progressive Opacity Function`
- `SM-04E-OD-002 – Horizon Measurement Semantics`
- `SM-04E-OD-003 – Stability Evaluation Threshold`

### SM-04 Capture Session
- `SM-04F-OD-001 – Capture Workspace Leave Policy`
- `SM-04F-OD-002 – Camera/Lens Switch Session Transition Strategy`

## DEFERRED – 3

The following SM-07B project-import/archive-related OD identities retain their historical deferred classification:

- `SM-07B-OD-001 – Imported Project Identity Collision Policy`
- `SM-07B-OD-002 – Supported Project Import Format / Version Contract`
- `SM-07B-OD-004 – Imported Project Partial/Damaged Content Acceptance`

Their original SM-07B semantics were subsequently recovered by `SM-07-PROV-01` as provenance Class A and backfilled by `SM-07-PROV-02`. The SM-CHG-0001 blocker re-verification found the corrected Portable Project Archive contract compatible with all three recovered semantic subjects (`3/3 PASS`). Therefore `DEFERRED` here is not an evidence gap and not a status conflict. This register does not re-decide those OD identities.

## RESOLVED / FROZEN – 46

### Original SM-02 / SM-05 ODs – 6
- `PLY-OD-001 – Playback Starting Point Semantics`
- `EDT-OD-001 – Selection after deleting selected frame`
- `EDT-OD-002 – Duplicate insertion position`
- `EDT-OD-003 – Empty Frame insertion position`
- `EDT-OD-004 – Concrete Undo coverage/depth`
- `IMG-OD-001 – Imported Frame insertion position`

### SM-04B – 2
- `SM-04B-OD-001 – Exposure Compensation Guard Membership`
- `SM-04B-OD-002 – Focus Target Guard Membership`

### SM-04C resolved later by SM-06 – 2
- `SM-04C-OD-001 – Capture Output Handoff Lifetime`
- `SM-04C-OD-003 – Exact Persistence Acknowledgement Boundary`

These two were historically OPEN / NON-BLOCKING in frozen SM-04 and were subsequently explicitly closed by SM-06. Their earlier SM-04 state remains historical evidence, not the current master status.

### SM-05B – 2
- `SM-05B-OD-001 – Selection after Duplicate`
- `SM-05B-OD-002 – Selection after Empty Frame Creation`

### SM-05C – 5
- `SM-05C-OD-001 – Runtime FPS Change Application`
- `SM-05C-OD-002 – Timeline Navigation / Scrub Semantics During Paused Playback`
- `SM-05C-OD-003 – User Navigation During Active Playback`
- `SM-05C-OD-004 – Sequence Mutation During Active/Pause Playback`
- `SM-05C-OD-005 – Playback Behavior for Missing/Damaged Frame`

### SM-05D – 7
- `SM-05D-OD-001 – Annotation Editing on Missing/Damaged Frame`
- `SM-05D-OD-002 – Multiple Annotation Overlap / Rendering Order`
- `SM-05D-OD-003 – Annotation Position Bounds Policy`
- `SM-05D-OD-004 – Text Wrapping / Bounds Semantics`
- `SM-05D-OD-005 – Empty Text Annotation Semantics`
- `SM-05D-OD-006 – Editor Context After Active Frame Removal`
- `SM-05D-OD-007 – Annotation State on Frame Duplicate`

### SM-05E – 5
- `SM-05E-OD-001 – Selection after Undo Restore`
- `SM-05E-OD-002 – Undo History Lifetime Across Project Close/Reopen`
- `SM-05E-OD-003 – Undo History Persistence Across App Restart`
- `SM-05E-OD-004 – Text Editing Undo Grouping`
- `SM-05E-OD-005 – Continuous Property Edit Undo Grouping`

### Recovery handoffs resolved by SM-06 – 2
- `RCV-OD-001 – Recovered orphan sequence position`
- `RCV-OD-002 – Recovered status lifetime`

Historical state before SM-06:
- `RCV-OD-001 = DEFERRED TO SM-06 / NON-BLOCKING FOR SM-05`
- `RCV-OD-002 = OPEN / NON-BLOCKING / SM-06`

Current master state: both are `RESOLVED / FROZEN` by SM-06.

### SM-06 generated ODs – 5
- `SM-06C-OD-001`
- `SM-06C-OD-002`
- `SM-06E-OD-001`
- `SM-06F-OD-001`
- `SM-06F-OD-002`

Together with `SM-04C-OD-001`, `SM-04C-OD-003`, `RCV-OD-001` and `RCV-OD-002`, SM-06 records `9/9 = RESOLVED / FROZEN`.

### SM-07 V1 Image Import – 4
- `SM-07B-OD-003`
- `SM-07B-OD-005`
- `SM-07C-OD-001`
- `SM-07E-OD-001`

### SM-07 V1 Media Export – 6
- `SM-07F-OD-001`
- `SM-07F-OD-002`
- `SM-07F-OD-003`
- `SM-07F-OD-004`
- `SM-07F-OD-005`
- `SM-07K-OD-001`

## STATUS CONFLICT – 0

No OD has two incompatible current statuses after applying the latest applicable authority.

Earlier states in this file are historical handoff/provenance states where a later authority explicitly completed the reconciliation. They are not current-status conflicts.

## Handoff summary

### Import
`IMG-OD-001` is resolved for Sequence placement after successful registration. SM-07 owns recognition/input/validation/import success semantics; SM-05 owns resulting Sequence semantics; SM-06 owns durable persistence.

### Export
SM-05 provides authoritative Sequence order, project FPS and editable rendered frame state. SM-07 owns transfer/export semantics. The Portable Project Archive is distinct from media image-ZIP export.

### Persistence / Recovery
SM-05 mutation success is not durable persistence success. Undo is not Recovery. SM-06 is authoritative for the resolved recovery/persistence handoffs listed above.

## Audit boundary

This SM-AUD-02 inventory/classification pass:
- inventories each known OD identity exactly once;
- applies the latest applicable authority for current classification;
- preserves historical handoff/deferred states where necessary for provenance;
- creates no new OD;
- resolves no open OD;
- changes no frozen product semantics;
- begins no SM-AUD-03 work.

`SM-AUD-02 OD MASTER INVENTORY & CLASSIFICATION VERIFICATION = PASS`

## Future freeze rule

No deferred/open detail may become an implementation assumption and then be treated as frozen behavior without explicit reconciliation through the appropriate authority and, where required, SM-01 change control.
