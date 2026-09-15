# SM-AUD-01R – Portable Project Archive Contract Reconciliation

## Status

`COMPLETE / RECONCILIATION PASS / CHANGE REQUIRED / NO CONTRACT CHANGE PERFORMED`

This block analyzes and bounds `SM-AUD-01-FND-001` only. It does not modify SM-07, does not resolve the finding, and does not authorize implementation.

## 1. Authority chain

The normative authority chain is unambiguous:

1. `SM-00 / SM-D00-007 – Portable Project Archive` marks complete portable editable project archive import/export as V1 REQUIRED.
2. `SM-02A` decomposes that decision into ten atomic V1 REQUIRED requirements: `ARC-001…ARC-010`.
3. `SM-03` already reserves `SURF-TR03 – Project Archive Transfer` and a navigation path `SCR-01 -> SURF-TR03`.
4. Frozen `SM-07` later defers Project File / Project Data Import and explicitly says its image ZIP is not project serialization/project exchange.

No evidence in SM-01 records an authorized change that removed or downgraded `SM-D00-007` or `ARC-001…ARC-010`. SM-01 states that later documents remain traceable to SM-00/SM-02 and that frozen semantic changes require change control.

Conclusion: the SM-07 deferral is not supported by an authorized upstream V1 scope change. It is a downstream cross-boundary divergence.

## 2. ARC row reconciliation

| Requirement | Upstream V1 authority | Current SM-07 state | Reconciliation result |
|---|---|---|---|
| ARC-001 Export editable project archive | SM-D00-007 / SM-02A | No project-archive export contract; image ZIP explicitly not project serialization | SM-07 GAP / CHANGE REQUIRED |
| ARC-002 Import editable project archive | SM-D00-007 / SM-02A | Project File / Project Data Import explicitly deferred | DIRECT CONTRADICTION / CHANGE REQUIRED |
| ARC-003 Imported archive restores an editable project | SM-D00-007 / SM-02A | No archive roundtrip contract | SM-07 GAP / CHANGE REQUIRED |
| ARC-004 Archive contains all required project components | SM-D00-007 / SM-02A | No archive composition contract | SM-07 GAP / CHANGE REQUIRED |
| ARC-005 Schema/version information | SM-D00-007 / SM-02A | No archive schema/version contract | SM-07 GAP / CHANGE REQUIRED |
| ARC-006 No dependency on absolute device paths | SM-D00-007 / SM-02A | No portable-reference archive contract | SM-07 GAP / CHANGE REQUIRED |
| ARC-007 Validate archive before destructive import effects | SM-D00-007 / SM-02A | Archive import deferred; no validation boundary | SM-07 GAP / CHANGE REQUIRED |
| ARC-008 Invalid archive must not overwrite existing project | SM-D00-007 / SM-02A | Archive import deferred; no non-destructive failure contract | SM-07 GAP / CHANGE REQUIRED |
| ARC-009 Default import creates new local project instance | SM-D00-007 / SM-02A | Archive import deferred; no instance-creation contract | SM-07 GAP / CHANGE REQUIRED |
| ARC-010 Offline/no cloud-login dependency | SM-D00-007 / SM-02A | No V1 archive transfer contract | SM-07 GAP / CHANGE REQUIRED |

All ten requirements remain V1 REQUIRED. None may be reclassified as non-V1 by this reconciliation.

## 3. Exact conflicting SM-07 statements

The minimum conflicting/failing SM-07 surface is:

### 3.1 Import V1 scope
Current SM-07 says required V1 import is external individual images and that portable/editable Project File / Project Data Import was deferred.

Required reconciliation direction: image import remains V1, but portable editable project-archive import must also exist as a distinct V1 transfer class.

### 3.2 Export V1 output classes
Current SM-07 defines only MP4 and PNG/JPG/JPEG frame ZIP as V1 output classes.

Required reconciliation direction: portable editable project-archive export must be added as a distinct V1 output/transfer class. It must remain semantically separate from image ZIP.

### 3.3 ZIP non-project-serialization statement
The statement that image ZIP is not project serialization/project exchange is not itself wrong and should be preserved for the image-export class. The conflict is that no separate project archive exists alongside it.

### 3.4 Deferred SM-07 ODs
The SM-07 line preserves `SM-07B-OD-001`, `SM-07B-OD-002`, and `SM-07B-OD-004` as deferred/non-V1 project-import details. Their exact semantic contents are not reproduced in the transferred SM-07 document, so this reconciliation does not guess them. They must be recovered/identified before any change may close, supersede, or reclassify them.

## 4. Minimal required correction scope

A later authorized SM-07 correction must be limited to restoring the already-authoritative archive capability. At minimum it must define contracts sufficient for `ARC-001…ARC-010`:

- a distinct portable editable project-archive export class,
- a distinct portable editable project-archive import class,
- functional editable roundtrip restoration,
- required archive content sufficient to reconstruct the project,
- schema/version awareness,
- portable references without absolute-device-path dependency,
- archive/manifest/version/required-data/reference validation before destructive effects,
- invalid/corrupt archive cannot overwrite an existing project,
- default import creates a new local project instance,
- offline operation without cloud-login dependency.

The exact archive extension, container layout, compression format, file naming and implementation technology remain implementation/detail decisions unless an existing authority says otherwise.

No new capability beyond `SM-D00-007` / `ARC-001…010` is authorized by this scope.

## 5. Frozen-contract impact

### SM-07 – DIRECT IMPACT

SM-07 is the directly conflicting frozen contract and is the only contract that necessarily requires semantic correction to resolve `SM-AUD-01-FND-001`.

Affected conceptual sections:
- Import V1 scope
- Import recognition/validation/eligibility/success/failure for archive input
- Export V1 output/transfer classes
- archive export source/completeness semantics
- OD classification for project-import/archive details
- freeze verification/coverage status

A separate SM-01 change-control authorization is required before modifying SM-07.

### SM-03 – IMPACT CHECK / NO CORRECTION CURRENTLY IDENTIFIED

SM-03 already contains `SURF-TR03 – Project Archive Transfer` and `SCR-01 -> SURF-TR03`. Therefore the archive capability has a frozen UI ownership/navigation path. No SM-03 contradiction is identified in this reconciliation.

A later corrected SM-07 must consume that existing TRANSFER surface/authority rather than invent a new navigation owner.

### SM-05 – HANDOFF IMPACT / NO CORRECTION CURRENTLY IDENTIFIED

SM-05 owns authoritative Sequence, frame identities/order, project FPS use, and editable annotation state. Those are archive payload inputs/outputs, but SM-05 must not become archive codec/validation authority.

On archive import, restoration must yield a coherent project whose Sequence/frame/annotation semantics conform to SM-05. No current SM-05 semantic change is required by the evidence reviewed here.

### SM-06 – HANDOFF IMPACT / NO CORRECTION CURRENTLY IDENTIFIED

SM-06 owns Durable Project State, persistence and recovery. Archive export must consume a coherent authoritative project state without becoming recovery. Archive import must not bypass persistence validity or overwrite an existing project on invalid input.

Default archive import creates a new local project instance, after which durable persistence belongs to SM-06. No current SM-06 semantic correction is identified by this reconciliation, but its persistence boundary must be explicitly preserved in the corrected SM-07 contract.

## 6. Authority and ownership boundary after correction

The intended boundary can be restored without moving existing owners:

`SM-03 TRANSFER UI -> SM-07 archive recognition/validation/import/export -> project-state handoff -> SM-05 semantic project/Sequence state + SM-06 durable persistence`

Archive transfer is not Recovery, not Undo, not image import, and not image ZIP export.

## 7. Change-control necessity

Because SM-07 is `COMPLETE / FINAL-VERIFIED / FROZEN`, this reconciliation cannot alter it directly.

The next correction phase must use SM-01 change control and must identify:
- affected frozen SM-07 contract,
- previous conflicting state,
- requested restored state,
- reason: `SM-AUD-01-FND-001`,
- traceability: `SM-D00-007` + `ARC-001…ARC-010`,
- cross-boundary impact on SM-03/05/06,
- verification required before any re-freeze.

## 8. Explicit non-actions

This block performs:

- 0 changes to SM-07,
- 0 changes to SM-00/01/02/03/04/05/06,
- 0 new V1 requirements,
- 0 ARC requirement rewording,
- 0 OD closure/reclassification,
- 0 implementation decisions,
- 0 freeze/unfreeze action.

## 9. Gate result

`SM-AUD-01R = COMPLETE / RECONCILIATION PASS / CHANGE REQUIRED`

Findings:
- `ARC-001…ARC-010 = V1 REQUIRED` remains authoritative.
- `SM-AUD-01-FND-001 = CONFIRMED / OPEN / V1-BLOCKING`.
- No authorized upstream scope change supporting the SM-07 deferral was found.
- Direct correction target = frozen SM-07.
- SM-03 already exposes the required archive-transfer surface and currently needs no identified semantic correction.
- SM-05 and SM-06 require boundary preservation/handoff verification, but no semantic correction is currently identified.
- Deferred SM-07 project-import OD identities are known, but their exact original contents require recovery before they can be changed.

## 10. Next-step boundary

No correction is authorized by this document.

The next permissible step, only after explicit authorization, is a separate SM-01 change-control / SM-07 correction-scope authorization block based exactly on this reconciliation. It must not silently add capabilities beyond `ARC-001…ARC-010` and must not change SM-03/05/06 unless a later evidence-backed impact check proves such a change necessary.
