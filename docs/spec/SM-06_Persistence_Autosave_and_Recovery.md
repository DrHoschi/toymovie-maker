# SM-06 – Persistence, Autosave & Recovery V0.1

## Status

`COMPLETE / FINAL-VERIFIED / FROZEN`

This document records the frozen SM-06 contract from the V1 specification process. It is a documentation transfer only; it introduces no new product decision.

## Authority

SM-06 owns Durable Project State, Persistence, Autosave and Recovery. It does not own UI/navigation (SM-03), camera/capture semantics (SM-04), Sequence/playback/editor/Undo semantics (SM-05), or Import/Export semantics (SM-07).

## Core invariants

- Runtime State != automatically Durable State.
- Persistence Attempt != Persistence Success.
- Capture Output != Durable Frame.
- Autosave != Undo Boundary.
- Recovery != Undo.
- Session Resume != Project Recovery.
- Recovery Result != Recovery Complete.
- Coherence has priority over recency.
- Stable `frameId` has priority over mutable `sequencePosition` for identity.
- Unknown recovered-orphan position does not permit normal Sequence registration.
- Recovered Orphan != Missing/Damaged.
- Recovered Orphan != Imported.
- `RECOVERY_FAILED` must not invent editable project state.

## Durable project state

Durable state includes, where applicable:

- project identity and metadata,
- project settings and `projectFPS`,
- Sequence membership and order,
- stable frame identities,
- frame type/state and reconstructable content/reference,
- annotation ownership and order.

Undo history, playback state and transient capture state are not required durable project state.

## Persistence

Persistence Success exists only when a complete, reconstructable and valid durable state has been committed. Until success, the previous valid Durable Project State remains authoritative.

## Autosave

A successful persistent mutation creates pending persistence work. Autosave-relevant mutations include Sequence move/reorder/delete/duplicate, Empty Frame insertion, successful imported-frame registration, annotation mutations, successful Undo of persistent mutations, project FPS/settings mutations and valid capture integration.

Selection, playback/scrubbing, navigation and opening/closing the editor without mutation are not themselves persistent mutations.

Autosave may coalesce work, but must not lose updates, must persist a coherent logical state, and a stale completion must not regress a newer state.

## Recovery

Recovery evaluates Previous Durable State, incomplete candidates and recovery evidence. Coherence wins over recency. A newer invalid candidate falls back to a previous valid durable state. If no valid state exists, result is `RECOVERY_FAILED`; no project state may be invented.

Missing/Damaged frames may remain part of a coherent project when represented explicitly.

## Recovered orphans

Recoverable orphan material requires deterministic project ownership, an existing stable `frameId`, absence from normal Sequence membership, and evidence of interrupted persistence.

An arbitrary image is not a recovered orphan. Normal registration requires deterministic intended Sequence position. Unknown position means no normal registration. Multi-orphan ordering may only follow recovery evidence. Registration preserves existing frame/annotation identities where reconstructable. Recovery must not invent selection/playhead placement.

## Recovery completion

`Accepted Recovery Result -> Recovery Completion Pending -> Persistence -> Persistence Success -> Recovery Complete`

Normal mutating work resumes only after recovery completion/success. A regular close with pending persistence requires final persistence success. Backgrounding with pending persistence requires a persistence attempt but not guaranteed success.

## Capture-output lifetime handoff

An accepted valid SM-04 Capture Output remains relevant until the resulting frame is durably reconstructable or recovery deterministically excludes it. Persistence failure, close/background or session end alone do not release this responsibility.

## OD closure

Resolved/frozen through SM-06:

- `SM-04C-OD-001`
- `SM-04C-OD-003`
- `RCV-OD-001`
- `RCV-OD-002`
- `SM-06C-OD-001`
- `SM-06C-OD-002`
- `SM-06E-OD-001`
- `SM-06F-OD-001`
- `SM-06F-OD-002`

`9/9 = RESOLVED / FROZEN`

## Freeze guard

Later work may consume, implement and test this contract, but may not silently reinterpret, weaken, extend or replace its authority boundaries or invariants.
