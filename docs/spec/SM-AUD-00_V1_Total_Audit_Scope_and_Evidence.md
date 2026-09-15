# SM-AUD-00 – V1 Total Audit Scope / Evidence Reconciliation

## Status

`COMPLETE / INVENTORY ONLY / NO COVERAGE VERDICT`

SM-AUD-00 inventories the evidence required for the V1 total audit. It declares no individual requirement PASS/FAIL and changes no frozen contract.

## Audit authority stack

A. Requirement Authority: SM-02A authoritative 106 atomic V1 requirements.

B. Specification/Frozen Contracts: SM-00 through SM-07, with frozen authority boundaries preserved.

C. OD Register: all resolved, open/non-blocking and deferred/non-V1 ODs, including origin and target handoff.

D. Cross-Boundary Contracts: handoffs between specification blocks.

Early project/concept documentation is source/origin evidence only and cannot override SM-02A or later frozen contracts.

## Authoritative requirement inventory

Total: `106`.

- PRJ 9
- CAP 20
- ONS 5
- AST 5
- TML 6
- PLY 10
- EDT 14
- RCV 14
- IMG 2
- EXP 5
- ARC 10
- SET 6

The authoritative row list is stored in `SM-02_Functional_Specification.md`.

## Specification evidence set

- SM-00 Product/Scope
- SM-01 Decisions
- SM-02 Functional Specification / 106 requirements
- SM-03 UI/UX & Navigation
- SM-04 Camera & Capture
- SM-05 Timeline, Playback & Frame Editing
- SM-06 Persistence, Autosave & Recovery
- SM-07 Import & Export

## Cross-boundary audit targets

- SM-00/01 -> SM-02: Scope/decisions to requirements
- SM-02 -> SM-03…07: requirement ownership
- SM-03 <-> SM-04: UI/navigation and Capture
- SM-04 -> SM-05: Capture Output to Frame/Sequence
- SM-04 -> SM-06: Capture Output persistence lifetime
- SM-05 -> SM-06: Sequence/editing/Undo to persistence
- SM-06 -> SM-05: Recovery to Sequence registration
- SM-07 -> SM-05: imported frame to Sequence/selection
- SM-07 -> SM-06: Import Success to Pending Persistence
- SM-05 + SM-06 -> SM-07: authoritative project state to Export

## Audit row schema

Each SM-AUD-01 row will record:

- Requirement ID
- normative SM-02A text
- owning block
- supporting normative contract
- cross-boundary dependency
- related OD
- coverage result
- conflict result
- evidence

Allowed later coverage states: `COVERED`, `COVERED / DELEGATED`, `DEFERRED / PROVEN NON-V1`, `MISSING`, `CONTRADICTED`, `BLOCKED`.

`DEFERRED` must never be used to hide a genuine one of the 106 V1 requirements.

## Anti-false-PASS guard

Local PASS/FROZEN results for SM-03…07 do not automatically imply V1 total PASS. Total audit requires 106/106 row accounting, OD accounting, cross-boundary consistency and scope consistency.

## Result

`SM-AUD-00 = COMPLETE`

- new requirements: 0
- new decisions: 0
- OD changes: 0
- frozen-contract changes: 0
- V1 total verdict: not yet performed
