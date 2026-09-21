# SM-CHG-0001 – SM-07 Portable Project Archive Correction – Final Verification Gate

## Status

`VERIFICATION COMPLETE / PASS / BLOCKER CLOSED / NO RE-FREEZE`

This gate verifies only the corrected SM-07 contract produced under `SM-CHG-0001`. It does not modify SM-07, does not re-freeze SM-07, and does not close `SM-AUD-01-FND-001`.

## 1. Evidence basis

Verified against:

- authoritative `SM-02A` requirement rows `ARC-001…ARC-010`, `IMG-001…IMG-002`, `EXP-001…EXP-005`;
- corrected `SM-07 – Import & Export V0.1` at the SM-CHG-0001 correction state;
- frozen SM-03 transfer/navigation authority;
- SM-05 Sequence/editor/import handoff contracts available in the repository evidence;
- frozen SM-06 persistence/recovery authority;
- recovered original SM-07B semantics and provenance for `SM-07B-OD-001`, `SM-07B-OD-002`, `SM-07B-OD-004`, as backfilled by `SM-07-PROV-01` / `SM-07-PROV-02`.

No OD semantics are reconstructed from IDs or guessed. The re-verification uses the recovered primary-source semantics.

## 2. ARC-001…ARC-010 verification

| Requirement | Corrected contract evidence | Result |
|---|---|---|
| ARC-001 Export editable project archive | Explicit `Archive export – ARC-001`; complete editable archive artifact required | PASS |
| ARC-002 Import editable project archive | Portable Project Archive is a required V1 import class; validated archive import produces local project instance | PASS |
| ARC-003 Imported archive restores an editable project | Explicit editable roundtrip and `Editable restoration – ARC-003`; rendered-only/lossy result is not success | PASS |
| ARC-004 Archive contains all required project components | Required archive content includes reconstructable project metadata/settings, Sequence/order, stable frame identities/types/states, content/references, annotations, FPS and other required durable values | PASS |
| ARC-005 Schema/version information | Explicit schema/version information required for validation/interpretation | PASS |
| ARC-006 No dependency on absolute device paths | Explicit prohibition of absolute device-specific path dependency; portable references required | PASS |
| ARC-007 Validate archive before destructive import effects | Validation explicitly occurs before any destructive import effect | PASS |
| ARC-008 Invalid archive must not overwrite an existing project | Invalid/corrupt/unsupported/insufficient archive explicitly must not overwrite existing project | PASS |
| ARC-009 Default import creates a new local project instance | Explicit default successful archive import = new local project instance; no silent overwrite/merge | PASS |
| ARC-010 Offline/no cloud-login dependency | Explicit offline/no-cloud-login invariant | PASS |

ARC result: `10/10 PASS`.

## 3. IMG preservation verification

### IMG-001 – Import individual image

Corrected SM-07 still requires external individual image import with PNG and JPEG/JPG and retains the original recognition/validation/registration pipeline.

Result: `PASS`.

### IMG-002 – Imported image becomes a frame

Corrected SM-07 preserves Candidate != Imported Frame, successful registration as the frame-producing boundary, new stable `frameId`, and handoff to SM-05 placement/selection plus SM-06 pending persistence.

Result: `PASS`.

IMG result: `2/2 PASS`.

The corrected archive path is explicitly distinct from image import and does not replace or reinterpret it.

## 4. EXP preservation verification

### EXP-001 / EXP-002 – Video export / MP4

MP4 remains an explicit V1 media-export class.

Result: `PASS`.

### EXP-003 – MP4 defaults to project FPS

The corrected contract preserves MP4 timing from authoritative project-wide `projectFPS`, with one interval `1/F` per Sequence frame.

Result: `PASS`.

### EXP-004 / EXP-005 – Individual frame/image export / PNG/JPG

The corrected contract preserves PNG/JPG/JPEG rendered frame-image export and the pre-existing complete image-ZIP behavior: one rendered image per Sequence frame in one complete ZIP artifact.

For this SM-CHG-0001 regression gate, the correction did not remove or weaken that pre-existing SM-07 contract. Therefore preservation relative to the pre-change SM-07 baseline is `PASS`.

However, this gate does **not** independently settle the broader SM-AUD interpretation question of whether the existing full-sequence image-ZIP contract alone fully satisfies the exact wording `EXP-004 – Individual frame/image export`. That question is outside this correction scope and remains available to the total audit.

EXP preservation result for this correction: `5/5 PASS / PRE-EXISTING EXP-004 AUDIT INTERPRETATION NOT REDECIDED`.

## 5. SM-03 authority boundary

Frozen SM-03 already owns `SURF-TR03 – Project Archive Transfer`, the `TRANSFER` semantic owner, and navigation `SCR-01 -> SURF-TR03`.

Corrected SM-07 explicitly consumes that existing transfer UI/navigation authority and states that SM-07 must not invent a competing navigation owner.

No SM-03 semantic modification is introduced.

Result: `PASS / AUTHORITY PRESERVED`.

## 6. SM-05 authority boundary

SM-05 owns Sequence/order/stable frame identity, editor/annotation semantics, and the successful individual-image import placement/selection handoff. It explicitly does not own the import/export pipeline.

Corrected SM-07 preserves those boundaries. Archive content/restoration references SM-05 semantics but does not claim ownership of Sequence/editor behavior. Individual image import continues to hand successful registered frames to SM-05.

Result: `PASS / AUTHORITY PRESERVED`.

Repository status wording for SM-05 is historically stale relative to later process history, but the semantic contracts used by this verification are present. This gate does not change SM-05 status.

## 7. SM-06 authority boundary

Frozen SM-06 owns Durable Project State, persistence, autosave and recovery. Its durable state includes project metadata/settings/FPS, Sequence/order, stable frame identities, reconstructable frame content/reference and annotation ownership/order.

Corrected SM-07 uses those values as archive reconstruction content without transferring persistence/recovery ownership. It explicitly distinguishes Archive Import/Export Success from Persistence Success and Archive Transfer from Recovery.

Default archive import enters the SM-06 persistence boundary as a new local project instance; it is not represented as durably saved until SM-06 establishes Persistence Success.

Result: `PASS / AUTHORITY PRESERVED`.

## 8. Project-import/archive OD verification

Recovered original semantics:

- `SM-07B-OD-001 – Imported Project Identity Collision Policy`
- `SM-07B-OD-002 – Supported Project Import Format / Version Contract`
- `SM-07B-OD-004 – Imported Project Partial/Damaged Content Acceptance`

`SM-07-PROV-01` recovered all three directly from the original SM-07B primary-source chat evidence; `SM-07-PROV-02` backfilled that provenance into the repository. All three are provenance `Class A`.

### SM-07B-OD-001 compatibility

Original semantic subject: handling imported Project-/Frame-/Annotation-ID collisions. The later original SM-07 reconciliation distinguished external identity from the new local registered project identity and required deterministic/referentially consistent remapping where necessary.

The corrected archive contract requires default successful archive import to create a **new local project instance**, prohibits silent overwrite/merge, and reconstructs the archive's required identity-bearing project/frame relationships.

Result: `PASS / COMPATIBLE`.

No contradiction with the recovered OD-001 semantics is identified.

### SM-07B-OD-002 compatibility

Original semantic subject: which project versions / external project representations are accepted. The original wording `ZIP oder eigenes App-Format` was conceptual only and did not establish a binding ZIP/JSON/schema choice.

The corrected archive contract requires sufficient schema/version information to determine whether a candidate is supported and interpretable, while explicitly leaving concrete archive extension, container/compression format and schema encoding as implementation details.

Result: `PASS / COMPATIBLE`.

The correction supplies the functional version/validation boundary required by `ARC-005` without contradicting an earlier concrete format commitment, because no such commitment existed.

### SM-07B-OD-004 compatibility

Original semantic subject: acceptance boundary between a structurally damaged/ambiguous project representation and an otherwise valid project containing known Missing/Damaged states. The original semantics did not authorize automatic partial-success, best-effort import, or a new generic Partial-Project-Import capability.

The corrected archive contract requires validation before destructive import effects. An invalid, corrupt, unsupported or insufficient archive is not Archive Import Success, cannot overwrite an existing project, and cannot invent replacement project data. Required frame types/states remain part of reconstructable project state under the existing semantic owners.

Result: `PASS / COMPATIBLE`.

No automatic partial-success or best-effort archive-import behavior is introduced.

### Verification blocker re-verification

Previous blocker:

`SM-CHG-0001-VFY-BLK-001 – Original semantic evidence for SM-07B-OD-001 / 002 / 004 unavailable`

The factual evidence condition is no longer true. Original semantics are recovered and repository-backed, and comparison against the corrected archive contract yields:

- OD-001: `PASS / COMPATIBLE`
- OD-002: `PASS / COMPATIBLE`
- OD-004: `PASS / COMPATIBLE`

No new contradiction, missing V1 rule, or replacement verification blocker is identified from these three recovered ODs.

Therefore:

`SM-CHG-0001-VFY-BLK-001 = CLOSED / ORIGINAL EVIDENCE RECOVERED / 3 OF 3 OD COMPATIBILITY PASS`

This closure is a verification result only. It does not re-freeze SM-07 and does not close `SM-AUD-01-FND-001`.

## 9. Scope-regression check

No evidence was found in the corrected SM-07 of unauthorized introduction of:

- cloud sync/login,
- collaboration/community sharing,
- project merge,
- archive history/version-control,
- encryption/password-protected archives,
- automatic cloud backup,
- new media types,
- new editor capabilities.

Implementation-level archive extension/container/compression/layout/schema encoding/reference representation remain unfrozen.

Result: `PASS / NO SCOPE EXPANSION DETECTED`.

## 10. Verification totals

- ARC: `10/10 PASS`
- IMG preservation: `2/2 PASS`
- EXP preservation: `5/5 PASS` for correction regression; EXP-004 broader audit interpretation not redecided
- SM-03 authority: `PASS`
- SM-05 authority: `PASS`
- SM-06 authority: `PASS`
- Unauthorized scope expansion: `0 detected`
- Archive OD provenance: `3/3 original semantics recovered / Class A`
- Archive OD compatibility: `3/3 PASS`
- Verification blockers: `0 OPEN`

## 11. Gate result

`SM-CHG-0001 / SM-07 PORTABLE PROJECT ARCHIVE CORRECTION – FINAL VERIFICATION = PASS`

The corrected contract passes the ARC, IMG/EXP-regression, cross-boundary, scope-regression and recovered archive/project-import OD compatibility checks.

The former evidence blocker is closed by recovered primary-source evidence plus 3/3 compatibility PASS.

Therefore:

- `SM-07 = CORRECTED / FINAL-VERIFIED / NOT RE-FROZEN`
- `SM-CHG-0001 FINAL VERIFICATION = PASS`
- `SM-CHG-0001-VFY-BLK-001 = CLOSED`
- `SM-AUD-01-FND-001 = OPEN / NOT CLOSED`
- `RE-FREEZE = NOT PERFORMED`
- `SM-AUD-02 = NOT AUTHORIZED`

This completion does not itself modify the corrected SM-07 contract.

## 12. Next-step boundary

The next permissible step is exclusively a separately authorized `SM-07 Re-Freeze` of the corrected, final-verified SM-07 contract.

That step must not silently close `SM-AUD-01-FND-001` and must not begin `SM-AUD-02` in the same step.
