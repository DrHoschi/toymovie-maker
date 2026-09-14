# StopMotion V1 – Specification Status

## Current gate status

| ID | Document | Status |
|---|---|---|
| SM-00 | Project Master & Scope | V0.1 DRAFT / INTERNALLY CONSISTENT |
| SM-01 | Decision & Change Log | V0.1 DRAFT / PASS / 0 BLOCKER |
| SM-02 | Functional Specification | V0.1 DRAFT / 106/106 / PASS / 0 BLOCKER |
| SM-03 | UI/UX & Navigation V0.1 | **FROZEN** / CROSS-AUDIT PASS / 106/106 / 0 BLOCKER |
| SM-04 | Camera & Capture Engine V0.1 | **FROZEN** / CAP 20/20 / ONS 5/5 / AST 5/5 / 0 BLOCKER |
| SM-05 | Timeline, Playback & Frame Editing | A…K COMPLETE/PASS / TML 6/6 / PLY 10/10 / EDT 14/14 / 30/30 / ASSEMBLY-READY / NOT FROZEN |
| SM-06 | Project Data, Storage & Recovery | NOT STARTED |
| SM-07 | Import, Export & Media Pipeline | NOT STARTED |
| SM-08 | Technical Architecture & Platform | NOT STARTED |
| SM-09 | Validation & Test Specification | NOT STARTED |
| SM-CA-01 | Gesamt-Cross-Audit | NOT STARTED |

## Frozen baselines

### SM-03
`FROZEN / CROSS-AUDIT PASS / 106/106 REQUIREMENT COVERAGE / SMARTPHONE + TABLET LOW-FI BASELINES FROZEN / 8 OPEN BEHAVIOR DETAILS PRESERVED / 0 BLOCKER`

### SM-04
`FROZEN / CAP 20/20 / ONS 5/5 / AST 5/5 / RCV BOUNDARIES PASS / 11 OPEN NON-BLOCKING DETAILS PRESERVED / 0 BLOCKER`

## SM-05 current milestone

`SM-05K – Functional Coverage & Internal Consistency Gate = PASS`

- TML 6/6 PASS
- PLY 10/10 PASS
- EDT 14/14 PASS
- 30/30 functional requirements covered
- SM-05A…J internally consistent
- SM-03 freeze guards 7/7 preserved
- SM-04 frozen boundary preserved
- IMG-OD-001 resolved
- RCV-OD-001 correctly deferred to SM-06
- RCV-OD-002 outside SM-05 and unchanged
- 0 internal contradictions
- 0 unauthorized scope expansions
- 0 blocker

SM-05 is therefore **ASSEMBLY-READY**, but it is not assembled/finalized/frozen yet.

## Next allowed specification step

`SM-05L – Specification Assembly V0.1`

Scope: consolidate SM-05A…K into one formal SM-05 V0.1 draft while preserving all status, invariants, resolved ODs and cross-boundary handoffs. No freeze in the same step.