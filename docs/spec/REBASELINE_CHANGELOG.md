# Rebaseline Changelog

## Branch

`feature/stopmotion-v1-spec-rebaseline`

## Purpose

Capture the newly structured StopMotion V1 specification independently from the legacy prototype code on `main`.

## Baseline documentation transferred

- README and specification navigation
- MASTER_INDEX
- STATUS
- consolidated PROJECT_DOCUMENTATION
- SOURCE_BASELINE_REFERENCE
- SM-00 Project Master & Scope
- SM-01 Decision & Change Log
- SM-02 Functional Specification with the authoritative 106-row SM-02A inventory
- SM-03 frozen UI/UX & Navigation contract
- SM-04 frozen Camera & Capture Engine contract
- SM-05 Timeline, Playback & Frame Editing contract
- SM-06 frozen Persistence, Autosave & Recovery contract
- SM-07 frozen Import & Export contract
- OPEN_DETAILS_AND_HANDOFFS

## V1 total-audit documentation added

- `SM-AUD-00_V1_Total_Audit_Scope_and_Evidence.md`
- `SM-AUD-01A_Authoritative_106_Row_Baseline_Recovery.md`

Repository inspection recovered the exact authoritative SM-02A requirement inventory from `SM-02_Functional_Specification.md`.

`SM-AUD-01-EG-001` is therefore resolved as an evidence blocker.

## Historical documentation-sync observation

At the original rebaseline documentation-sync point, the recovered SM-02A inventory contained ten V1 REQUIRED Portable Project Archive requirements (`ARC-001…ARC-010`) while the then-later SM-07 contract locally deferred Project File / Project Data Import. That sync deliberately did not reconcile or rewrite the contradiction; it became the SM-AUD-01 audit target.

The later authorized `SM-AUD-01R` / `SM-CHG-0001` chain corrected and verified the archive contract, recovered the affected SM-07B OD provenance, re-froze SM-07, and closed `SM-AUD-01-FND-001`. SM-AUD-01 subsequently reached `COMPLETE / PASS / 106 COVERED / 0 CONTRADICTED / 0 EVIDENCE GAP`.

## SM-AUD-02 OD Master Register Reconciliation

After the SM-AUD-01 post-correction endpoint, the already planned SM-AUD-02 OD Master Register Reconciliation was authorized and performed.

The former `OPEN_DETAILS_AND_HANDOFFS.md` registry, which explicitly represented only the state through SM-05K, was reconciled against the latest applicable authorities through corrected/final-verified/re-frozen SM-07 and updated as the current OD Master Register & Handoffs.

Verified master inventory:

- unique OD identities: 58
- `RESOLVED / FROZEN`: 46
- `OPEN / NON-BLOCKING`: 9
- `DEFERRED`: 3
- `STATUS CONFLICT`: 0

`46 + 9 + 3 + 0 = 58`.

The reconciliation preserved historical handoff states, did not silently resolve the nine open ODs, did not re-decide the three deferred SM-07B OD identities, introduced no new OD or product semantic change, and began no SM-AUD-03 work.

`SM-AUD-02 OD MASTER INVENTORY & CLASSIFICATION VERIFICATION = PASS`.

`SM-AUD-02 COMPLETION / CONSISTENCY GATE = PASS`.

`SM-AUD-02 = COMPLETE / PASS`.

## Current authoritative endpoint

`SM-AUD-02 = COMPLETE / PASS / 58/58 OD IDENTITIES ACCOUNTED / 0 STATUS CONFLICT`.

## Explicitly not done by this SM-AUD-02 completion/status backfill

- no legacy implementation reconciliation
- no merge to `main`
- no modification of frozen product contracts
- no new or re-decided OD semantics
- no SM-AUD-03 work

The earlier changelog statement `no SM-AUD-02+ work` described the original documentation-sync boundary and is superseded by the later explicitly authorized SM-AUD-02 audit chain recorded above.
