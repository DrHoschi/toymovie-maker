# SM-03 – UI/UX & Navigation V0.1

## Status

`FROZEN / CROSS-AUDIT PASS / 106/106 REQUIREMENT COVERAGE / SMARTPHONE + TABLET LOW-FI BASELINES FROZEN / 8 OPEN BEHAVIOR DETAILS PRESERVED / 0 BLOCKER`

SM-03 includes completed blocks A–N:
- A Surface & State Inventory
- B Ownership
- C Owner Relationships
- D Navigation Transitions
- E Screen Architecture
- F Screen Responsibility Contract
- G Smartphone Structural Wireframe
- H Interaction Priority/Exposure
- I Smartphone Low-Fi Specification
- J Pre-Visual Reconciliation
- K Smartphone Visual Low-Fi
- L Responsive Device-Class Contract
- M Tablet Structural Wireframe
- N Tablet Visual Low-Fi

## Primary screens

Five primary screens are frozen:
1. `SCR-01 – Home / Project Library`
2. `SCR-02 – Capture Workspace`
3. `SCR-03 – Sequence Workspace`
4. `SCR-04 – Frame Editor`
5. `SCR-05 – Settings`

Contextual surfaces:
- `SURF-NP01 – New Project`
- `SURF-CAM01 – Camera Controls`
- `SURF-TR01 – Image Import`
- `SURF-TR02 – Media Export`
- `SURF-TR03 – Project Archive Transfer`

Recovery surfaces:
- `REC-S01 – Inline Status`
- `REC-S02 – Attention Overlay`
- `REC-S03 – Recovery Review`

## Frozen semantic owners

Seven authority owners:
- `PROJECT`
- `CAPTURE`
- `SEQUENCE`
- `EDITOR`
- `TRANSFER`
- `SETTINGS`
- `RECOVERY`

Rule:
> One semantic state has one primary owner.

## Frozen navigation core

- App start → `SCR-01`
- `SCR-01` → New/Open → `SCR-02`, subject to recovery state
- `SCR-02 ↔ SCR-03`
- `SCR-03 → SCR-04 → SCR-03`
- `SCR-01 ↔ SCR-05`
- `SCR-03 → SURF-TR01/SURF-TR02`
- `SCR-01 → SURF-TR03`

There is no global five-tab navigation model.

## Smartphone baseline

`SM-03K – Smartphone Visual Low-Fi Baseline`

5/5 screens PASS.

The Settings screen is constrained to the approved V1 settings scope; illustrative visual extras are not authoritative product scope.

## Responsive device-class contract

Core principle:
> Same function, same authority and same state semantics; different layout geometry.

Tablet may use master-detail, inspectors or parallel regions, but may not gain product capabilities that do not exist on smartphone.

`SM-03N – Tablet Visual Low-Fi Baseline`

5/5 screens PASS.

## Frozen requirement coverage

`106/106` V1 requirements have a valid UI exposure/ownership path across the frozen smartphone/tablet contract.

## Freeze Guards

### FG01 – Open Behavior Preservation
Open behavior details remain OPEN/NON-BLOCKING until explicitly reconciled. Visuals cannot silently decide them.

### FG02 – Specification Authority
Authority order:
`SM-00 Decisions → SM-02 Functional Specification → textual SM-03 Contracts → Visual Low-Fi`.

### FG03 – Settings Scope
Settings may expose only required V1 settings:
- DE/EN
- Default Project Format
- Default Onion Count
- Default Onion Opacity
- Capture Assistance Defaults

No unauthorized settings such as iCloud/storage/autosave interval/default FPS/default zoom/focus/analytics are implied by mockups.

### FG04 – Camera State Guard
Camera State Guard is observational. UI copy must not imply automatic hardware restoration.

### FG05 – Sequence Authority
Editor may trigger duplicate/delete/empty/move, but `SEQUENCE` remains authoritative.

### FG06 – Recovery Semantics
`LEVEL 0/1/2` are distinct from visible statuses `Normal/Saving/Recovered/Attention Required`. `Saving` is not a recovery level.

### FG07 – Device Layout vs Project Format
Project format (`Portrait/Landscape/Square`) is distinct from smartphone/tablet/orientation geometry.

## Not frozen by SM-03

- Final colors
- Typography
- Final icons
- Exact pixel values/breakpoints
- Tablet column widths
- Exact iPad orientation geometry
- Split View/Stage Manager behavior
- Keyboard/mouse/Pencil behavior
- High-fidelity visuals
- Animations/transitions
- Behavior ODs intentionally left open at freeze time

## Change rule

SM-03 is frozen. Any later semantic change requires the SM-01 Decision/Change process.