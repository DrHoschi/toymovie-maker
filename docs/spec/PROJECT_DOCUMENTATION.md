# StopMotion App – Projektdokumentation (Rebaseline)

## Zweck

Dieses Dokument ist die konsolidierte Projektübersicht für den neu geplanten StopMotion-V1-Stand. Es verweist auf die detaillierten SM-Dokumente und hält die Gesamtstruktur zusammen.

## Projektziel

Eine offline-first Stop-Motion-App für Smartphones mit zuverlässiger Frame-by-Frame-Aufnahme, Onion Skin, Capture Assistance, sichtbarer Timeline, Playback, nicht-destruktiver Frame-/Textbearbeitung, Autosave/Recovery sowie Import/Export einschließlich portierbarem editierbarem Projektarchiv.

## Spezifikationskette

1. `SM-00 – Project Master & Scope`
2. `SM-01 – Decision & Change Log`
3. `SM-02 – Functional Specification`
4. `SM-03 – UI/UX & Navigation`
5. `SM-04 – Camera & Capture Engine`
6. `SM-05 – Timeline, Playback & Frame Editing`
7. `SM-06 – Project Data, Storage & Recovery`
8. `SM-07 – Import, Export & Media Pipeline`
9. `SM-08 – Technical Architecture & Platform`
10. `SM-09 – Validation & Test Specification`
11. `SM-CA-01 – Gesamt-Cross-Audit`

## Aktueller Stand

- SM-00: V0.1 DRAFT / INTERNALLY CONSISTENT
- SM-01: V0.1 DRAFT / PASS / 0 BLOCKER
- SM-02: V0.1 DRAFT / 106/106 / PASS / 0 BLOCKER
- SM-03: FROZEN / CROSS-AUDIT PASS / 0 BLOCKER
- SM-04: FROZEN / CAP 20/20 / ONS 5/5 / AST 5/5 / 0 BLOCKER
- SM-05: bis SM-05K vollständig reconciliert und geprüft / TML 6/6 / PLY 10/10 / EDT 14/14 / 30/30 / 0 BLOCKER / ASSEMBLY-READY / NOT FROZEN

## Wichtige Produktinvarianten

- Stable Frame Identity ist getrennt von Sequence Position.
- Requested Camera State ist nicht automatisch Effective Camera State.
- Preview ist nicht Capture Output.
- Capture Output ist nicht automatisch ein durable Frame.
- Ein akzeptierter Capture Trigger erzeugt höchstens einen gültigen Capture Output.
- Onion/Assistenz/UI werden nicht in das Capture Output eingebrannt.
- Sequence ist die einzige autoritative Frame-Reihenfolge.
- Selection und Playback Playhead sind getrennte Zustände.
- Playback verwendet einen projektweiten FPS-Wert; keine per-frame duration ist V1-Pflicht.
- Editor arbeitet nicht-destruktiv: Original + Annotation State = Rendered Result.
- Undo ist nicht Recovery.
- Recovery ist nicht Undo-History.
- Empty Frame ist ein valider Frame-Typ und kein Missing/Damaged-Placeholder.
- Smartphone und Tablet dürfen unterschiedliche Layoutgeometrie besitzen, aber keine unterschiedlichen fachlichen Capabilities.

## V1 UI-Struktur

Frozen Primary Screens:
- SCR-01 Home / Project Library
- SCR-02 Capture Workspace
- SCR-03 Sequence Workspace
- SCR-04 Frame Editor
- SCR-05 Settings

Contextual Surfaces:
- New Project
- Camera Controls
- Image Import
- Media Export
- Project Archive Transfer

Recovery Surfaces:
- Inline Status
- Attention Overlay
- Recovery Review

## Requirement-Gesamtbestand

SM-02 umfasst 106 atomare V1-Required-Anforderungen:
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

## Aktuelle Cross-Boundary-Handoffs

### SM-04 → Persistence/Registration → SM-05

SM-04 endet grundsätzlich bei einem validen `Capture Output Ready`.
Ein Frame wird erst nach Persistence/Registration zum autoritativen Sequence Member.

### SM-05 → SM-06

SM-06 muss durable storage, atomic metadata writes, recovery, orphan handling und Recovery Status Semantics konkretisieren.

`RCV-OD-001` ist an SM-06 weitergereicht: vor normaler Sequence-Registrierung eines recovered orphan muss SM-06 eine deterministische Position bestimmen.

`RCV-OD-002 – Recovered status lifetime` bleibt OPEN/NON-BLOCKING für SM-06.

### SM-05 → SM-07

SM-07 besitzt Import/Export-Pipeline, Formate, Validierung und Encoding.

Nach erfolgreicher Einzelbild-Registrierung gilt die in SM-05J definierte Sequence-Insertionsregel.

MP4 Export verwendet standardmäßig den Project FPS.

## Freeze-Regel

Einzelne Dokumente dürfen nur nach explizitem Freeze Gate eingefroren werden.
Frozen Contracts dürfen nicht stillschweigend durch Mockups oder Implementation geändert werden.

Der finale Snapshot `STOPMOTION_V1_SPEC_SNAPSHOT_001` darf erst nach SM-00…SM-09 und `SM-CA-01 = PASS / 0 BLOCKER` erstellt werden.

## Nächster zulässiger Schritt

`SM-05L – Specification Assembly V0.1`

Dabei wird nur SM-05A…K zu einem konsolidierten formalen SM-05-V0.1-Dokument assembled. Kein Final Verification Gate und kein Freeze im selben Schritt.