# StopMotion V1 – Master Specification Index

## Repository role and authority

Branch: `feature/stopmotion-v1-spec-rebaseline`

This development branch is the working specification baseline for the rebuilt StopMotion V1. The prototype inherited from `main` is not authoritative for the new V1 contracts.

Authority order:
1. SM-00 decisions and product scope
2. SM-02 functional requirements, including the authoritative 106-row inventory
3. Applicable textual contracts in SM-03…SM-07, with each document's current freeze state shown in `STATUS.md`
4. Visual low-fi/mockups
5. Later implementation details

SM-05 V0.1 is assembled; Final Verification has not started and the document is not frozen. No implementation may use an open or deferred OD as an unstated product decision.

## Current document map

- SM-00 through SM-07: product scope and functional contracts
- SM-AUD-00 through SM-AUD-05: V1 scope, specification and implementation-evidence audits
- SM-MIG-01: read-only legacy migration assessment
- V1_IMPLEMENTATION_AND_TEST_ROADMAP.md: remaining gates and path to product testing
- OPEN_DETAILS_AND_HANDOFFS.md: OD master register and cross-document handoffs
- STATUS.md: current gate state and immediate next step

## V1 specification audit chain

- SM-AUD-00: COMPLETE / inventory only
- SM-AUD-01: COMPLETE / PASS / 106 requirements covered / 0 contradicted
- SM-AUD-01A: PASS / authoritative 106-row baseline recovered
- SM-AUD-02: COMPLETE / PASS / 58 of 58 OD identities accounted / 0 status conflicts
- SM-AUD-03: COMPLETE / PASS / 18 of 18 cross-boundary contracts / 0 conflict / 0 evidence gap
- SM-AUD-04: COMPLETE / PASS / V1 Functional Completeness VERIFIED
- SM-AUD-05: COMPLETE / BLOCKED – EXPECTED IMPLEMENTATION GAP

SM-AUD-04 closes the functional completeness question for the audited V1 baseline. SM-AUD-05 is a separate product-evidence audit: the current branch contains no implementation reconciled to the new V1 contracts, so implementation completeness and its verification remain unestablished. Neither audit establishes release or app-store readiness.

## Specification baseline details

The authoritative SM-02A inventory contains 106 requirements:
`PRJ 9 + CAP 20 + ONS 5 + AST 5 + TML 6 + PLY 10 + EDT 14 + RCV 14 + IMG 2 + EXP 5 + ARC 10 + SET 6 = 106`.

The current OD master classifies 58 unique identities:
`46 RESOLVED / FROZEN + 9 OPEN / NON-BLOCKING + 3 DEFERRED + 0 STATUS CONFLICT = 58`.
The open and deferred identities retain their current classifications; this index does not resolve them or treat them as hidden implementation assumptions.

SM-AUD-03's 18/18 result records the cross-boundary audit result. The separate SM-05 status is V0.1 ASSEMBLED / NOT FROZEN; its Final Verification and freeze remain open.

## Implementation baseline and migration

The migration assessment found that the 40 commits from `main` to the audited branch head changed README and `docs/spec/*`, not runtime product files. The inherited prototype therefore is not evidence of implementation against the rebuilt V1 contracts.

The migration recommendation and dependency-ordered implementation blocks are recorded in `SM-MIG-01_V1_Implementation_Baseline_and_Migration_Scope.md`. The complete remaining documentation, implementation and test sequence is in `V1_IMPLEMENTATION_AND_TEST_ROADMAP.md`.

## Remaining specification gates

1. SM-05 final verification.
2. SM-05 freeze.
3. SM-08 Technical Architecture & Platform.
5. SM-09 Validation & Test Specification.
6. SM-CA-01 project-wide cross-audit.
7. Final V1 specification snapshot, only after required gates pass.

These are distinct work steps. This status/index update does not execute them or change product requirements.

## Current authoritative endpoint

- Functional baseline: SM-AUD-04 COMPLETE / V1 FUNCTIONAL COMPLETENESS VERIFIED.
- Product implementation baseline: SM-AUD-05 BLOCKED / implementation and verification not established.
- Specification readiness: not final; SM-05L and the later gates above remain open.

Next separate gate: SM-05 – Final Verification. A passing verification result and any freeze remain separate subsequent gates.
