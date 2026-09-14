# SM-01 – Decision & Change Log

## Status

`SM-01 V0.1 DRAFT / PASS / 0 BLOCKER`

Sub-blocks:
- `SM-01A`: COMPLETE
- `SM-01B`: COMPLETE
- `SM-01C`: COMPLETE
- `SM-01D`: PASS / 0 BLOCKER

## Purpose

SM-01 defines how product decisions and later specification changes are recorded, traced and reviewed.

## Decision lifecycle

Decision IDs use document namespaces such as:
- `SM-D00-xxx`
- `SM-D02-xxx`
- `SM-D03-xxx`
- … through `SM-D09-xxx`

A decision must keep a distinct lifecycle/status. `DECIDED` is not the same as `APPROVED` or `FROZEN`.

The eight initial SM-00 decisions are recorded as `DECIDED`:
1. `SM-D00-001 – Capture Assistance Scope`
2. `SM-D00-002 – Visible Frame Timeline`
3. `SM-D00-003 – Frame Reordering`
4. `SM-D00-004 – Playback & Project FPS`
5. `SM-D00-005 – Camera Controls & Locks`
6. `SM-D00-006 – Autosave & Recovery`
7. `SM-D00-007 – Portable Project Archive`
8. `SM-D00-008 – Frame Editor V1 Scope`

## Change control

Change IDs use:
`SM-CHG-0001`, `SM-CHG-0002`, ...

A change record must identify:
- affected contract/document
- previous state
- requested new state
- reason
- scope impact
- traceability to requirements/decisions
- verification required
- resulting status

Frozen documents may not be silently edited. A later change to a frozen contract requires the SM-01 change process.

## Traceability principle

Every later document must be traceable back to:
- the V1 scope in SM-00
- decisions in SM-00/SM-01
- atomic requirements in SM-02

UI mockups, implementation choices and technical convenience cannot silently replace product requirements.

## Current log state

At SM-01C:
- 8 decisions recorded
- 0 change records

## Gate result

`SM-01D = PASS / 0 BLOCKER`

SM-01 is not frozen.