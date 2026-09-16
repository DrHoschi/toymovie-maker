# SM-CHG-0001 – SM-07 Portable Project Archive Correction Scope & Authorization

## Status

`AUTHORIZED / SCOPE-LOCKED / NOT YET IMPLEMENTED / SM-07 STILL FROZEN`

This is the formal SM-01 change-control authorization for the correction identified by `SM-AUD-01-FND-001` and bounded by `SM-AUD-01R`.

It authorizes a later correction of the affected SM-07 specification contract. It does **not** perform that correction in this step.

## 1. Change-control identity

- Change ID: `SM-CHG-0001`
- Affected contract: `SM-07 – Import & Export V0.1`
- Current affected status: `COMPLETE / FINAL-VERIFIED / FROZEN`
- Finding: `SM-AUD-01-FND-001 – Portable Project Archive V1 Contract Contradiction`
- Reconciliation basis: `SM-AUD-01R – COMPLETE / RECONCILIATION PASS / CHANGE REQUIRED`
- Upstream authority: `SM-D00-007` + `ARC-001…ARC-010`

## 2. Previous state

Frozen SM-07 currently:

- requires external individual PNG/JPEG image import,
- defines MP4 and PNG/JPG/JPEG frame ZIP as V1 export classes,
- defers portable/editable Project File / Project Data Import,
- correctly states that image ZIP is not project serialization/project exchange,
- does not contain a complete portable editable project-archive import/export contract.

This state conflicts with the already-authoritative V1 archive capability in SM-00 and SM-02A.

## 3. Requested corrected state

The authorized correction shall restore, inside SM-07, the existing upstream V1 requirement that portable editable project archive import/export is part of V1.

The corrected SM-07 must define only what is necessary to satisfy the existing `ARC-001…ARC-010` authority:

1. distinct portable editable project-archive export,
2. distinct portable editable project-archive import,
3. functional editable restoration after export -> import,
4. archive content sufficient to reconstruct the required project state,
5. schema/version information,
6. no dependency on absolute device paths,
7. validation before destructive import effects,
8. invalid/corrupt archive must not overwrite an existing project,
9. default import creates a new local project instance,
10. archive transfer works offline without cloud-login dependency.

Individual image import remains a separate V1 capability. MP4 export and PNG/JPG image ZIP export remain separate V1 media-export capabilities. Image ZIP remains explicitly non-project-serialization.

## 4. Scope lock

### IN SCOPE

Only the SM-07 semantic surfaces required for the ten existing ARC requirements:

- V1 transfer/import scope,
- V1 export/transfer classes,
- archive recognition and validation boundary,
- archive import eligibility/success/failure boundary,
- archive export source/completeness boundary,
- editable roundtrip contract,
- archive project-content contract at the functional level,
- schema/version and portable-reference requirements,
- safe invalid-import behavior,
- new-local-project default import semantics,
- offline/no-cloud-login invariant,
- project-import/archive OD reconciliation where original OD evidence supports it,
- SM-07 coverage/final-verification status after correction.

### OUT OF SCOPE

This authorization does not permit:

- new capabilities beyond `ARC-001…ARC-010`,
- cloud sync/login,
- collaboration/community sharing,
- project merge,
- archive history/version-control features,
- encryption/password-protected archives,
- automatic cloud backup,
- new media types,
- new editor capabilities,
- implementation architecture or code,
- final archive extension,
- final container/compression format,
- concrete filenames/directory layout,
- UI redesign,
- changes to SM-03, SM-05 or SM-06 unless separately reconciled and authorized.

## 5. Frozen-boundary protection

### SM-03

No change authorized. Existing `SURF-TR03 – Project Archive Transfer`, TRANSFER ownership and frozen navigation path are to be consumed as-is.

### SM-05

No change authorized. Sequence, stable frame identity, project FPS and editable annotation semantics remain SM-05 authority. Archive restoration must conform to them.

### SM-06

No change authorized. Durable Project State, persistence and recovery remain SM-06 authority. Archive import/export must preserve the distinction between transfer success and durable persistence/recovery.

### SM-07

Semantic correction is authorized only within the Scope Lock above. Until the correction is actually executed and reverified, the existing frozen document remains unchanged and `SM-AUD-01-FND-001` remains open.

## 6. Deferred OD guard

`SM-07B-OD-001`, `SM-07B-OD-002` and `SM-07B-OD-004` are known as deferred project-import/archive-related ODs, but their exact original semantic text has not yet been recovered in the transferred evidence.

Therefore this authorization does **not** authorize guessing, silently closing, renaming or reclassifying them.

Before a correction step changes their status, their original evidence must be recovered or the correction must explicitly leave them unchanged while defining only what the authoritative ARC requirements themselves prove.

## 7. Required verification after correction

A later correction is not sufficient by itself. Before SM-07 can be treated as corrected/frozen again, verification must prove:

- ARC-001…ARC-010 each have an explicit SM-07 contract path,
- IMG-001…002 remain intact,
- EXP-001…005 remain intact,
- image ZIP remains distinct from editable project archive,
- SM-03 TRANSFER ownership/navigation is preserved,
- SM-05 Sequence/editor authority is preserved,
- SM-06 persistence/recovery authority is preserved,
- archive import failure cannot destructively overwrite an existing project,
- no cloud/login dependency was introduced,
- no unauthorized V1 capability expansion occurred,
- all affected archive/project-import ODs are either evidence-backed reconciled or explicitly preserved,
- `SM-AUD-01-FND-001` may only be resolved after this verification passes.

## 8. Authorization decision

`SM-CHG-0001 = AUTHORIZED / SCOPE-LOCKED`

Authorized future action:

> Correct frozen SM-07 only within the boundaries defined in this document so that its V1 contract again conforms to `SM-D00-007` and `ARC-001…ARC-010`.

Not authorized in this step:

- actual SM-07 text modification,
- OD closure/reclassification,
- re-freeze,
- SM-AUD-01 PASS conversion,
- SM-AUD-02,
- implementation/code work.

## 9. Current state after authorization

- `SM-AUD-01-FND-001 = OPEN / V1-BLOCKING`
- `SM-AUD-01R = COMPLETE / RECONCILIATION PASS`
- `SM-CHG-0001 = AUTHORIZED / SCOPE-LOCKED / NOT YET IMPLEMENTED`
- `SM-07 = FROZEN / UNCHANGED`
- `SM-03 = FROZEN / UNCHANGED`
- `SM-05 = UNCHANGED`
- `SM-06 = FROZEN / UNCHANGED`
- `SM-AUD-02 = NOT AUTHORIZED`

## 10. Next-step boundary

The next permissible step is exclusively the separately executed `SM-CHG-0001 / SM-07 Portable Project Archive Contract Correction` against this exact authorized scope.

That correction must not expand scope and must not combine correction, final verification and re-freeze into one silent step.
