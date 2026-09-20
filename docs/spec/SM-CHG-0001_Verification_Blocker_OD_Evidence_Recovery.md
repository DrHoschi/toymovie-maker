# SM-CHG-0001 – Verification Blocker Evidence Recovery / OD Reconciliation

## Status

`COMPLETE / ORIGINAL SM-07B OD SEMANTICS RECOVERED BY SM-07-PROV-01 / PROVENANCE BACKFILLED / BLOCKER RE-VERIFICATION REQUIRED / NO CONTRACT CHANGE`

This document records the evidence state for:

- `SM-07B-OD-001`
- `SM-07B-OD-002`
- `SM-07B-OD-004`

The earlier execution of this recovery block exhausted the evidence then available in the transferred repository/project sources and therefore correctly recorded the three original meanings as unrecovered at that time.

A later dedicated provenance audit, `SM-07-PROV-01`, recovered the original SM-07 chat chain from primary-source chat evidence. `SM-07-PROV-02` backfills that recovered provenance here.

This is an evidence/provenance update only. It does not modify the corrected SM-07 contract, does not re-freeze SM-07, does not close `SM-AUD-01-FND-001`, and does not itself convert the prior SM-CHG-0001 Final Verification Gate to PASS.

## 1. Earlier evidence state

The earlier recovery attempt checked:

1. repository code/spec search for each exact OD ID;
2. repository search for Project File / Project Data Import and project-import terminology;
3. available project documentation for project/archive/import statements;
4. available prior-conversation retrieval.

At that time the exact original SM-07B source statements were not available in the transferred evidence. Consequently the prior classification was:

```text
SM-07B-OD-001 = IDENTITY KNOWN / ORIGINAL SEMANTICS UNRECOVERED
SM-07B-OD-002 = IDENTITY KNOWN / ORIGINAL SEMANTICS UNRECOVERED
SM-07B-OD-004 = IDENTITY KNOWN / ORIGINAL SEMANTICS UNRECOVERED
```

That historical result is superseded only as an evidence-availability statement by the later primary-source recovery below. It is not treated as a product-contract error.

## 2. Later primary-source recovery

`SM-07-PROV-01 – Complete SM-07 Chat Provenance & OD Origin Audit` recovered the original SM-07 chain from primary-source chat text, including the complete original `SM-07B – Import Contract Reconciliation`.

The three target ODs are present directly in that original SM-07B work with their concepts, OD formulations, IDs and semantic labels. Therefore their origin is not reconstructed from later summaries.

Provenance class used by SM-07-PROV-01:

- `Class A` = defined in original SM-07B work;
- `Class B` = concept arose in SM-07B but was numbered later;
- `Class C` = arose in a later SM-07 step;
- `Class D` = arose during Completion/Verification/Freeze or documentation transfer;
- `Class E` = first appeared during SM-AUD/SM-CHG or a later summary.

All three target ODs are `Class A`.

## 3. SM-07B-OD-001 provenance

### Original SM-07B evidence

The original SM-07B project-import reconciliation asks what happens when imported Project-, Frame- or Annotation-IDs already exist locally.

Original ID and semantic label:

`SM-07B-OD-001 – Imported Project Identity Collision Policy`

Original status:

`OPEN / NON-BLOCKING FOR SM-07B CONTRACT STRUCTURE`

Recovered provenance:

- FIRST CONCEPT OCCURRENCE: SM-07B §§15–18;
- FIRST OD-LIKE FORMULATION: SM-07B §18, imported-ID collision question;
- FIRST ID ASSIGNMENT: SM-07B §18;
- FIRST SEMANTIC LABEL: `Imported Project Identity Collision Policy`;
- FIRST LATER REFERENCE: SM-07C;
- ORIGINAL SEMANTICS RECOVERED: YES;
- PROVENANCE CLASS: A.

### Later SM-07 disposition

SM-07C reconciled the issue by distinguishing external project identity from the new local registered project identity and requiring deterministic/referentially consistent remapping where needed.

SM-07D carried the OD as resolved.

SM-07E later exposed the separate V1 Project Import scope-classification issue.

SM-07E.1 reclassified Project File / Project Data Import outside the normative V1 scope then being assembled and therefore carried OD-001 as deferred/out of V1.

That later `DEFERRED / NON-V1` disposition is not the OD's original meaning or origin.

## 4. SM-07B-OD-002 provenance

### Original SM-07B evidence

The original SM-07B asks which project versions / external project representations V1 accepts.

Original ID and semantic label:

`SM-07B-OD-002 – Supported Project Import Format / Version Contract`

Original status:

`OPEN`

Recovered provenance:

- FIRST CONCEPT OCCURRENCE: SM-07B §4/§15, concretely §19;
- FIRST OD-LIKE FORMULATION: SM-07B §19, accepted project versions/external representations;
- FIRST ID ASSIGNMENT: SM-07B §19;
- FIRST SEMANTIC LABEL: `Supported Project Import Format / Version Contract`;
- FIRST LATER REFERENCE: SM-07C;
- ORIGINAL SEMANTICS RECOVERED: YES;
- PROVENANCE CLASS: A.

Important original nuance: the earlier wording `ZIP oder eigenes App-Format` was treated as a conceptual example, not as a binding V1 ZIP/JSON/schema commitment.

### Later SM-07 disposition

SM-07C recognized the Project Import concept but did not invent a concrete exchange format. It deferred implementation of that path to an explicit Project Exchange Format Contract.

SM-07D preserved that boundary.

SM-07E later exposed the V1 scope-classification issue.

SM-07E.1 classified Project File / Project Data Import outside the normative V1 scope then being assembled and therefore carried OD-002 outside V1, with no V1 Project Exchange Contract required in that baseline.

That later scope disposition is distinct from the original OD semantics.

## 5. SM-07B-OD-004 provenance

### Original SM-07B evidence

The original SM-07B distinguishes a structurally damaged/ambiguous project representation from an otherwise valid project containing known Missing/Damaged project states. It explicitly does not introduce automatic successful partial import or a new general Partial-Project-Import capability.

Original ID and semantic label:

`SM-07B-OD-004 – Imported Project Partial/Damaged Content Acceptance`

Original status:

`OPEN`

Recovered provenance:

- FIRST CONCEPT OCCURRENCE: SM-07B §§16–17;
- FIRST OD-LIKE FORMULATION: SM-07B §31;
- FIRST ID ASSIGNMENT: SM-07B §31;
- FIRST SEMANTIC LABEL: `Imported Project Partial/Damaged Content Acceptance`;
- FIRST LATER REFERENCE: SM-07C;
- ORIGINAL SEMANTICS RECOVERED: YES;
- PROVENANCE CLASS: A.

Original semantic boundary: no automatic partial-success rule and no new generic partial-import capability; the open question concerned whether certain known problem states inside an otherwise valid project import could be accepted consistently with the already frozen Missing/Damaged semantics.

### Later SM-07 disposition

SM-07C reconciled structurally ambiguous candidates as Import Failure while distinguishing them from a coherent project containing explicit valid Missing/Damaged state.

SM-07D carried the OD as resolved.

SM-07E later exposed the V1 Project Import scope-classification issue.

SM-07E.1 then deferred OD-004 together with Project Import outside the normative V1 scope then being assembled.

Again, the later deferral is a scope disposition, not the original OD definition.

## 6. Recovered chronology through the original SM-07 freeze

The recovered primary-source chain establishes the following chronology relevant to these ODs:

```text
SM-07B
  OD-001 / OD-002 / OD-004 originate as explicit OPEN ODs
  all three = Class A

SM-07C
  all three are explicitly treated/reconciled

SM-07D
  all three are carried in the resolved OD accounting

SM-07E
  V1 Project Import scope classification becomes a gate issue

SM-07E.1
  Project File / Project Data Import = OUT OF V1 normative scope
  OD-001 / OD-002 / OD-004 = DEFERRED with Project Import

SM-07E first re-run
  deferred classification confirmed; separate multi-image blocker found

SM-07E.2
  multi-image blocker resolved

SM-07E second re-run
  PASS
  IMPORT SIDE = GATE-COMPLETE
  three Project-Import ODs remain DEFERRED OUTSIDE V1

SM-07F…SM-07K
  Export contract reconciled and verified
  EXPORT SIDE = GATE-COMPLETE

SM-07L
  SM-07 V0.1 assembled
  three Project-Import ODs explicitly preserved as deferred outside V1

SM-07M
  final assembly verification / freeze-readiness gate passed

SM-07N
  formal specification freeze
  SM-07 V0.1 = COMPLETE / FINAL-VERIFIED / FROZEN
  OD-001 / OD-002 / OD-004 remain DEFERRED / NON-V1
  freeze does not resolve them
```

This chronology proves that the three IDs and their original semantic subjects existed in original SM-07B. They did not first arise in SM-AUD, SM-CHG, repository transfer or a later summary.

## 7. Provenance completion table

| OD | First concept | First OD formulation / ID | Original semantic label | First later reference | Original semantics recovered | Provenance |
|---|---|---|---|---|---|---|
| SM-07B-OD-001 | SM-07B §§15–18 | SM-07B §18 | Imported Project Identity Collision Policy | SM-07C | YES | Class A |
| SM-07B-OD-002 | SM-07B §4/§15; concrete §19 | SM-07B §19 | Supported Project Import Format / Version Contract | SM-07C | YES | Class A |
| SM-07B-OD-004 | SM-07B §§16–17 | SM-07B §31 | Imported Project Partial/Damaged Content Acceptance | SM-07C | YES | Class A |

Classes B/C/D/E are excluded as origin classes because concept, OD-like formulation, ID assignment and semantic label are all recovered directly from original SM-07B primary evidence.

## 8. Effect on SM-CHG-0001 verification blocker

The factual evidence premise of `SM-CHG-0001-VFY-BLK-001` has changed:

```text
PREVIOUS EVIDENCE CONDITION
= original semantic evidence unavailable in transferred sources

CURRENT EVIDENCE CONDITION
= original SM-07B semantic evidence recovered by SM-07-PROV-01
= provenance backfilled by SM-07-PROV-02
```

However, this provenance backfill does **not** itself close the verification blocker.

The prior SM-CHG-0001 Final Verification Gate was blocked because it could not compare the corrected Portable Project Archive contract against the original semantics of OD-001 / OD-002 / OD-004. That comparison is now possible, but it belongs to a separate Blocker Re-Verification Gate.

Therefore:

`SM-CHG-0001-VFY-BLK-001 = EVIDENCE RECOVERED / RE-VERIFICATION PENDING / NOT CLOSED BY PROV-02`

No compatibility verdict between the recovered original OD semantics and the corrected archive contract is made in this document.

## 9. Explicit non-actions

- corrected SM-07 contract changes: 0
- SM-03 changes: 0
- SM-04 changes: 0
- SM-05 changes: 0
- SM-06 changes: 0
- new product decisions: 0
- new capabilities: 0
- OD semantic invention: 0
- SM-CHG-0001 final verification conversion to PASS: 0
- blocker closure: 0
- re-freeze actions: 0
- `SM-AUD-01-FND-001` closure: 0
- SM-AUD-02 work: 0

## 10. Backfill result

```text
SM-07-PROV-02
Repository Provenance Backfill

= EVIDENCE DOCUMENT UPDATED
= ORIGINAL SM-07B SEMANTICS RECOVERED
= TARGET ODs 3/3 CLASS A
= NO CONTRACT CHANGE
= NO BLOCKER CLOSURE
= NO RE-FREEZE

SM-07B-OD-001
= ORIGINAL SEMANTICS RECOVERED
= CLASS A

SM-07B-OD-002
= ORIGINAL SEMANTICS RECOVERED
= CLASS A

SM-07B-OD-004
= ORIGINAL SEMANTICS RECOVERED
= CLASS A

SM-CHG-0001-VFY-BLK-001
= EVIDENCE RECOVERED
= RE-VERIFICATION PENDING
= NOT CLOSED

SM-AUD-01-FND-001
= OPEN / NOT CLOSED

SM-AUD-02
= NOT AUTHORIZED
```

## 11. Boundary after this backfill

The next permissible action after commit verification is a separately authorized `SM-CHG-0001 Verification Blocker Re-Verification Gate`.

That gate may compare the corrected Portable Project Archive contract against the now-recovered original semantics of `SM-07B-OD-001`, `SM-07B-OD-002` and `SM-07B-OD-004` and determine the effect on `SM-CHG-0001-VFY-BLK-001`.

This backfill does not pre-decide that result and does not authorize SM-AUD-02.
