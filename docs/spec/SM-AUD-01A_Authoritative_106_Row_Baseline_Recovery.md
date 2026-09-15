# SM-AUD-01A – Authoritative 106-Row Baseline Recovery

## Status

`PASS / AUTHORITATIVE BASELINE RECOVERED FROM REPOSITORY`

This step recovers the original SM-02A requirement inventory as audit evidence. It does not rewrite requirements and does not perform SM-AUD-01 coverage assessment.

## Recovered source

Repository: `DrHoschi/toymovie-maker`

Branch: `feature/stopmotion-v1-spec-rebaseline`

Authoritative file: `docs/spec/SM-02_Functional_Specification.md`

The repository file explicitly states:

- `SM-02A – Functional Requirement Inventory: COMPLETE`
- total `106 atomic V1 REQUIRED requirements`
- the complete row inventory from `PRJ-001` through `SET-006`
- `SM-02D = PASS / 106/106 / 0 BLOCKER`

## Row-count verification

- PRJ: 9
- CAP: 20
- ONS: 5
- AST: 5
- TML: 6
- PLY: 10
- EDT: 14
- RCV: 14
- IMG: 2
- EXP: 5
- ARC: 10
- SET: 6

Total: `106`.

## Integrity guard

The audit will consume the row IDs and wording exactly as stored in `SM-02_Functional_Specification.md`. No row is to be reconstructed from older concept documentation or inferred from later block gates.

No requirement text was newly invented by SM-AUD-01A.

## Important audit observation

The recovered authoritative SM-02A baseline includes ten `ARC – Portable Project Archive` V1 requirements (`ARC-001…ARC-010`). SM-07 later deferred Project File / Project Data Import in its own local scope. This is not resolved here. It must be tested explicitly in SM-AUD-01 and later cross-boundary audit rather than silently treating the SM-07 deferral as proof that ARC is non-V1.

## Blocker disposition

`SM-AUD-01-EG-001 – Authoritative SM-02A 106-row requirement text unavailable`

`= RESOLVED BY REPOSITORY EVIDENCE`

## Result

`SM-AUD-01A = PASS`

- authoritative source identified: YES
- 106-row inventory recovered: YES
- count verified: 106/106
- invented/rephrased rows: 0
- coverage assessment performed: NO
- frozen-contract changes: 0

SM-AUD-01 may now resume against this exact repository baseline.
