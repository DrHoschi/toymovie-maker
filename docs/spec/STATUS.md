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
| SM-07 | Import & Export | **COMPLETE / FINAL-VERIFIED / FROZEN** |
| SM-AUD-00 | V1 Total Audit Scope / Evidence | COMPLETE |
| SM-AUD-01 | 106-Requirement Master Coverage Matrix | STARTED / READY TO RESUME |
| SM-AUD-01A | Authoritative 106-Row Baseline Recovery | **PASS** |
| SM-AUD-02+ | later audit stages | NOT AUTHORIZED |

## Recovered audit authority

`docs/spec/SM-02_Functional_Specification.md` contains the authoritative SM-02A inventory of 106 atomic V1 REQUIRED requirements.

Verified category counts:

`PRJ 9 + CAP 20 + ONS 5 + AST 5 + TML 6 + PLY 10 + EDT 14 + RCV 14 + IMG 2 + EXP 5 + ARC 10 + SET 6 = 106`

`SM-AUD-01-EG-001 = RESOLVED BY REPOSITORY EVIDENCE`.

## Frozen baselines

SM-03 through SM-07 are treated as frozen specification contracts according to the completed specification process. Documentation sync does not reopen or modify their product decisions.

## Critical total-audit issue to evaluate, not resolve here

The authoritative SM-02A inventory explicitly contains ten V1 REQUIRED `ARC – Portable Project Archive` requirements (`ARC-001…ARC-010`). The later SM-07 local contract deferred Project File / Project Data Import. This creates a mandatory SM-AUD-01 coverage/reconciliation question.

No conclusion is recorded here about whether this is ultimately a missing contract, contradiction, ownership gap or another auditable disposition. It must be determined by the authorized audit rather than fixed during documentation sync.

## Current audit state

- SM-AUD-00: COMPLETE
- SM-AUD-01: matrix structure started; coverage verdict not yet complete
- SM-AUD-01A: PASS; exact 106-row baseline recovered
- 106/106 total V1 coverage: NOT YET VERIFIED
- cross-boundary completeness: NOT YET VERIFIED
- V1 FULLY DEFINED: NOT YET CLAIMED

## Next allowed specification step

Resume only `SM-AUD-01 – 106-Requirement Master Coverage Matrix` against the exact SM-02A rows now recovered from the repository.

No SM-AUD-02 work and no frozen-contract modification is authorized by this status update.
