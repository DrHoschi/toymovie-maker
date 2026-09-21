# StopMotion V1 – Specification Status

## Current gate status

| ID | Document | Status |
|---|---|---|
| SM-00 | Project Master & Scope | specification baseline present |
| SM-01 | Decision & Change Log | specification baseline present |
| SM-02 | Functional Specification | V0.1 DRAFT / 106/106 / PASS / 0 BLOCKER; authoritative SM-02A rows present |
| SM-03 | UI/UX & Navigation V0.1 | **FROZEN** |
| SM-04 | Camera & Capture Engine V0.1 | **FROZEN** / CAP 20/20 / ONS 5/5 / AST 5/5 |
| SM-05 | Timeline, Playback & Frame Editing | **FROZEN** / TML 6/6 / PLY 10/10 / EDT 14/14 |
| SM-06 | Persistence, Autosave & Recovery | **COMPLETE / FINAL-VERIFIED / FROZEN** |
| SM-07 | Import & Export | **CORRECTED / FINAL-VERIFIED / RE-FROZEN** |
| SM-AUD-00 | V1 Total Audit Scope / Evidence | COMPLETE |
| SM-AUD-01 | 106-Requirement Master Coverage Matrix | **COMPLETE / PASS / 106 COVERED / 0 CONTRADICTED** |
| SM-AUD-01A | Authoritative 106-Row Baseline Recovery | **PASS** |
| SM-AUD-02+ | later audit stages | NOT AUTHORIZED |

## Recovered audit authority

`docs/spec/SM-02_Functional_Specification.md` contains the authoritative SM-02A inventory of 106 atomic V1 REQUIRED requirements.

Verified category counts:

`PRJ 9 + CAP 20 + ONS 5 + AST 5 + TML 6 + PLY 10 + EDT 14 + RCV 14 + IMG 2 + EXP 5 + ARC 10 + SET 6 = 106`

`SM-AUD-01-EG-001 = RESOLVED BY REPOSITORY EVIDENCE`.

## Frozen baselines

SM-03 through SM-07 are treated as frozen specification contracts according to the completed specification process. Documentation sync does not reopen or modify their product decisions.

## Closed SM-AUD-01 archive finding

The original SM-AUD-01 contradiction for `ARC-001…ARC-010` was resolved through the authorized `SM-AUD-01R` / `SM-CHG-0001` change-control chain. Corrected SM-07 passed final verification, the affected original SM-07B OD provenance was recovered and verified, and SM-07 was formally re-frozen.

`SM-AUD-01-FND-001 = RESOLVED / CLOSED`.

## Current audit state

- SM-AUD-00: COMPLETE
- SM-AUD-01: COMPLETE / PASS
- SM-AUD-01A: PASS; exact 106-row baseline recovered
- 106/106 authoritative V1 requirements: COVERED
- contradicted requirements: 0
- missing/evidence-gap requirements: 0
- SM-AUD-01-FND-001: RESOLVED / CLOSED
- SM-AUD-02+: status/history must be reconciled from the already existing audit chain before any new SM-AUD-02 work is defined or started

## Next allowed specification step

Reconcile the already existing `SM-AUD-02` audit history/status against this completed SM-AUD-01 post-correction state before defining or starting any new SM-AUD-02 work.
