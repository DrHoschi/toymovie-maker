# SM-AUD-01 – 106-Requirement Master Coverage Matrix

## Status

`COMPLETE / 106 COVERED / 0 CONTRADICTED / 0 EVIDENCE GAP / PASS`

Audit basis: authoritative SM-02A inventory in `SM-02_Functional_Specification.md`, checked individually against SM-00…SM-07. No requirement text was reconstructed and no coverage was inferred merely from earlier block gate totals.

## Result summary

| Area | Total | Covered | Contradicted | Missing/Evidence Gap |
|---|---:|---:|---:|---:|
| PRJ | 9 | 9 | 0 | 0 |
| CAP | 20 | 20 | 0 | 0 |
| ONS | 5 | 5 | 0 | 0 |
| AST | 5 | 5 | 0 | 0 |
| TML | 6 | 6 | 0 | 0 |
| PLY | 10 | 10 | 0 | 0 |
| EDT | 14 | 14 | 0 | 0 |
| RCV | 14 | 14 | 0 | 0 |
| IMG | 2 | 2 | 0 | 0 |
| EXP | 5 | 5 | 0 | 0 |
| ARC | 10 | 10 | 0 | 0 |
| SET | 6 | 6 | 0 | 0 |
| **TOTAL** | **106** | **106** | **0** | **0** |

## Row-by-row matrix

Coverage meanings:
- `COVERED`: an SM-00…07 contract supports the authoritative requirement.
- `CONTRADICTED`: the requirement is authoritative V1, but a later frozen contract explicitly excludes/defers that capability.

### PRJ – Project Management

| Requirement | Authoritative text | Owner/evidence | Result |
|---|---|---|---|
| PRJ-001 | Create project | SM-03 New Project surface / PROJECT owner | COVERED |
| PRJ-002 | Project name | SM-00 product/project baseline + SM-03 New Project | COVERED |
| PRJ-003 | Portrait project format | SM-00/SM-03 project-format contract | COVERED |
| PRJ-004 | Landscape project format | SM-00/SM-03 project-format contract | COVERED |
| PRJ-005 | Square project format | SM-00/SM-03 project-format contract | COVERED |
| PRJ-006 | List projects | SM-03 SCR-01 Home / Project Library | COVERED |
| PRJ-007 | Open project | SM-03 SCR-01 → open → SCR-02 subject to recovery | COVERED |
| PRJ-008 | Duplicate project | SM-00/SM-02 project-management baseline; SM-03 PROJECT authority path | COVERED |
| PRJ-009 | Delete project | SM-00/SM-02 project-management baseline; SM-03 PROJECT authority path | COVERED |

### CAP – Camera/Capture

| Requirement | Authoritative text | Owner/evidence | Result |
|---|---|---|---|
| CAP-001 | Live preview | SM-04E live preview | COVERED |
| CAP-002 | Capture photo frame | SM-04C capture operation | COVERED |
| CAP-003 | Add capture to project sequence | SM-04→SM-06 persistence/registration→SM-05 Sequence handoff | COVERED |
| CAP-004 | Rear camera support | SM-00 D00-005 / SM-04B | COVERED |
| CAP-005 | Select supported rear cameras/lenses | SM-00 D00-005 / SM-04B | COVERED |
| CAP-006 | Zoom | SM-00 D00-005 / SM-04B | COVERED |
| CAP-007 | Visible zoom value | SM-00 D00-005 / SM-03 capture exposure / SM-04 | COVERED |
| CAP-008 | Autofocus | SM-00 D00-005 / SM-04 | COVERED |
| CAP-009 | Tap-to-focus | SM-00 D00-005 / SM-04 | COVERED |
| CAP-010 | Focus Lock | SM-00 D00-005 / SM-04B | COVERED |
| CAP-011 | Visible Focus Lock state | SM-00 D00-005 / SM-03+04 | COVERED |
| CAP-012 | Auto Exposure | SM-00 D00-005 / SM-04B | COVERED |
| CAP-013 | Exposure Compensation | SM-00 D00-005 / SM-04B | COVERED |
| CAP-014 | Exposure Lock | SM-00 D00-005 / SM-04B | COVERED |
| CAP-015 | Visible Exposure Lock state | SM-00 D00-005 / SM-03+04 | COVERED |
| CAP-016 | Auto White Balance | SM-00 D00-005 / SM-04B | COVERED |
| CAP-017 | White Balance Lock | SM-00 D00-005 / SM-04B | COVERED |
| CAP-018 | Visible White Balance Lock state | SM-00 D00-005 / SM-03+04 | COVERED |
| CAP-019 | Compare effective camera state with expected project state | SM-04D Camera State Guard | COVERED |
| CAP-020 | Warn on camera-state deviation | SM-04D DEVIATION warning | COVERED |

### ONS – Onion Skin

| Requirement | Authoritative text | Owner/evidence | Result |
|---|---|---|---|
| ONS-001 | Onion on/off | SM-04E / SM-03 Capture | COVERED |
| ONS-002 | Previous frames as overlay | SM-04E | COVERED |
| ONS-003 | Select 1–5 previous frames | SM-04E count 0–5; SM-02 requires 1–5 selection | COVERED |
| ONS-004 | Base opacity configurable | SM-02 + SM-03 Settings/Capture exposure | COVERED |
| ONS-005 | Older previous frames progressively weaker | SM-04E graduated opacity | COVERED |

### AST – Capture Assistance

| Requirement | Authoritative text | Owner/evidence | Result |
|---|---|---|---|
| AST-001 | Grid | SM-00 D00-001 / SM-04E | COVERED |
| AST-002 | Horizon | SM-00 D00-001 / SM-04E | COVERED |
| AST-003 | Rule-of-thirds | SM-00 D00-001 / SM-04E | COVERED |
| AST-004 | Camera stability assessed | SM-00 D00-001 / SM-04E | COVERED |
| AST-005 | Stability result visible | SM-03 Capture / SM-04E states | COVERED |

### TML – Timeline

| Requirement | Authoritative text | Owner/evidence | Result |
|---|---|---|---|
| TML-001 | Visible timeline | SM-00 D00-002 / SM-03 / SM-05 | COVERED |
| TML-002 | Current authoritative order represented | SM-05B Sequence/timeline projection | COVERED |
| TML-003 | Select frame | SM-05B | COVERED |
| TML-004 | Current selected frame determinable | SM-05B selectedFrameId | COVERED |
| TML-005 | Move frame | SM-05B MOVE | COVERED |
| TML-006 | Reorder preserves stable frame identity | SM-00 D00-003 / SM-05B | COVERED |

### PLY – Playback

| Requirement | Authoritative text | Owner/evidence | Result |
|---|---|---|---|
| PLY-001 | Play | SM-05C | COVERED |
| PLY-002 | Pause | SM-05C | COVERED |
| PLY-003 | Stop | SM-05C | COVERED |
| PLY-004 | Return to defined playback start | SM-05C explicit STOP | COVERED |
| PLY-005 | Loop | SM-05C loopEnabled | COVERED |
| PLY-006 | Timeline navigation/scrubbing | SM-05C/G | COVERED |
| PLY-007 | Current playback frame visible/determinable | SM-05C playheadFrameId + SM-03 | COVERED |
| PLY-008 | Frame counter | SM-05C | COVERED |
| PLY-009 | Configurable project-wide FPS | SM-00 D00-004 / SM-05C | COVERED |
| PLY-010 | Playback uses project FPS | SM-05C | COVERED |

### EDT – Frame Editing

| Requirement | Authoritative text | Owner/evidence | Result |
|---|---|---|---|
| EDT-001 | Select frame | SM-05B/D | COVERED |
| EDT-002 | Delete frame | SM-05B/F | COVERED |
| EDT-003 | Duplicate frame | SM-05B/F | COVERED |
| EDT-004 | Insert Empty Frame | SM-05B/F | COVERED |
| EDT-005 | Move/reorder | SM-05B | COVERED |
| EDT-006 | Undo supported operations | SM-05E/I | COVERED |
| EDT-007 | Add text | SM-05D | COVERED |
| EDT-008 | Edit text | SM-05D | COVERED |
| EDT-009 | Text position | SM-05D | COVERED |
| EDT-010 | Font size | SM-05D | COVERED |
| EDT-011 | Text color | SM-05D | COVERED |
| EDT-012 | Regular/Bold | SM-05D | COVERED |
| EDT-013 | Delete annotation | SM-05D | COVERED |
| EDT-014 | Non-destructive editing | SM-05D | COVERED |

### RCV – Autosave/Recovery

| Requirement | Authoritative text | Owner/evidence | Result |
|---|---|---|---|
| RCV-001 | Frame-first durable save | SM-00 D00-006 / SM-06 persistence + capture-output lifetime | COVERED |
| RCV-002 | Autosave project mutations | SM-06 Autosave | COVERED |
| RCV-003 | Protected/atomic project metadata update | SM-00 D00-006 + SM-06 Persistence | COVERED |
| RCV-004 | Detect inconsistent state | SM-06 Recovery validation/coherence | COVERED |
| RCV-005 | Detect orphan frames | SM-00 D00-006 / SM-06 Recovered Orphans | COVERED |
| RCV-006 | Recover orphan frames | SM-06 Recovered Orphans | COVERED |
| RCV-007 | Retain previous valid state/recovery snapshot | SM-00 D00-006 / SM-06 previous durable state | COVERED |
| RCV-008 | Pre-capture storage check | SM-00 D00-006 / SM-04 eligibility boundary | COVERED |
| RCV-009 | Prevent/abort low-storage capture safely | SM-00 D00-006 / SM-04 external inhibit/storage preflight | COVERED |
| RCV-010 | Never silently delete damaged project data | SM-00 D00-006 / SM-06 | COVERED |
| RCV-011 | Project remains openable despite one missing/damaged frame where possible | SM-06 explicit Missing/Damaged coherent state | COVERED |
| RCV-012 | Problem frame is recognizable | SM-05G problem state visible + SM-03 recovery exposure | COVERED |
| RCV-013 | Distinguish recovery level | SM-00 D00-006 / SM-03 FG06 | COVERED |
| RCV-014 | Visible save/recovery status | SM-00 D00-006 / SM-03 recovery surfaces | COVERED |

### IMG – Individual Image Import

| Requirement | Authoritative text | Owner/evidence | Result |
|---|---|---|---|
| IMG-001 | Import individual image | SM-07 required external PNG/JPEG import | COVERED |
| IMG-002 | Imported image becomes a frame | SM-07 registration + SM-05 imported-frame handoff | COVERED |

### EXP – Media Export

| Requirement | Authoritative text | Owner/evidence | Result |
|---|---|---|---|
| EXP-001 | Video export | SM-07 MP4 output class | COVERED |
| EXP-002 | MP4 | SM-07 MP4 | COVERED |
| EXP-003 | MP4 defaults to project FPS | SM-07 MP4 uses authoritative projectFPS | COVERED |
| EXP-004 | Individual frame/image export | SM-07 one rendered image per Sequence Frame / ZIP artifact | COVERED |
| EXP-005 | PNG/JPG | SM-07 PNG/JPG/JPEG | COVERED |

### ARC – Portable Project Archive

The original SM-AUD-01 run identified ARC-001…ARC-010 as `CONTRADICTED` because the then-frozen SM-07 deferred Project File / Project Data Import. That historical finding triggered `SM-AUD-01-FND-001`, the authorized reconciliation/change-control chain, `SM-CHG-0001`, final verification, provenance recovery for the affected SM-07B ODs, and the corrected SM-07 re-freeze.

The post-correction closure gate checks the same ten authoritative SM-02A rows against the corrected, final-verified and re-frozen SM-07. `SM-CHG-0001` independently verified ARC-001…ARC-010 as `10/10 PASS`.

| Requirement | Authoritative text | Post-correction owner/evidence | Result |
|---|---|---|---|
| ARC-001 | Export editable project archive | SM-07 `Archive export – ARC-001`; complete editable archive artifact required | COVERED |
| ARC-002 | Import editable project archive | SM-07 Portable Project Archive is a required V1 import class; validated import creates a local project instance | COVERED |
| ARC-003 | Imported archive restores an editable project | SM-07 editable roundtrip + `Editable restoration – ARC-003` | COVERED |
| ARC-004 | Archive contains all required project components | SM-07 required archive content covers reconstructable project data/state required by existing V1 owners | COVERED |
| ARC-005 | Schema/version information | SM-07 explicit schema/version information required for validation/interpretation | COVERED |
| ARC-006 | No dependency on absolute device paths | SM-07 portable-reference invariant prohibits absolute device-specific path dependency | COVERED |
| ARC-007 | Validate archive before destructive import effects | SM-07 validation explicitly precedes destructive import effect | COVERED |
| ARC-008 | Invalid archive must not overwrite an existing project | SM-07 invalid/corrupt/unsupported/insufficient archive must not overwrite existing project | COVERED |
| ARC-009 | Default import creates a new local project instance | SM-07 default successful archive import explicitly creates a new local project instance | COVERED |
| ARC-010 | Offline/no cloud-login dependency | SM-07 explicit offline/no-cloud-login invariant | COVERED |

Post-correction ARC result: `10/10 COVERED`.

### SET – Settings

| Requirement | Authoritative text | Owner/evidence | Result |
|---|---|---|---|
| SET-001 | German language | SM-02 invariant + SM-03 Settings | COVERED |
| SET-002 | English language | SM-02 invariant + SM-03 Settings | COVERED |
| SET-003 | Default onion frame count | SM-03 FG03 Settings scope | COVERED |
| SET-004 | Default onion opacity | SM-03 FG03 Settings scope | COVERED |
| SET-005 | Relevant capture-assistance defaults | SM-03 FG03 Settings scope | COVERED |
| SET-006 | Default project format | SM-03 FG03 Settings scope | COVERED |

## Audit finding

`SM-AUD-01-FND-001 – Portable Project Archive V1 Contract Contradiction`

Historical finding basis: SM-00 D00-007 and SM-02A required ARC-001…ARC-010 as V1 REQUIRED, while the pre-correction frozen SM-07 deferred Project File / Project Data Import. The original SM-AUD-01 result was therefore `96 COVERED / 10 CONTRADICTED / NOT PASS`.

Authorized resolution chain: `SM-AUD-01R` reconciled the contradiction; `SM-CHG-0001` corrected SM-07; final verification established `ARC 10/10 PASS`; original semantics for `SM-07B-OD-001 / 002 / 004` were recovered and verified `3/3 PASS / COMPATIBLE`; `SM-CHG-0001-VFY-BLK-001` was closed; corrected SM-07 was formally re-frozen.

Post-correction closure result:

`SM-AUD-01-FND-001 = RESOLVED / CLOSED`

The historical finding remains traceable; its factual contradiction no longer exists in the current frozen contract stack.

## Gate

`SM-AUD-01 = COMPLETE / PASS`

- 106/106 authoritative rows individually accounted for.
- 106 COVERED.
- 0 CONTRADICTED.
- 0 MISSING.
- 0 EVIDENCE GAP.
- `SM-AUD-01-FND-001 = RESOLVED / CLOSED`.
- 0 new requirements.
- 0 requirement text reconstruction.
- 0 silent contract changes.

This is the post-correction audit state after the authorized SM-CHG-0001 correction, final verification and SM-07 re-freeze. It does not begin or define SM-AUD-02.
