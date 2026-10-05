# SM-MIG-01 – V1 Implementation Baseline and Migration Scope

## Status

**READ-ONLY ASSESSMENT COMPLETE**

- Repository: `DrHoschi/toymovie-maker`
- Branch: `feature/stopmotion-v1-spec-rebaseline`
- Audited head: `821c39592bdf5ebdd99cb5475720024988907740`
- Product or documentation changes made by the assessment: none

This record captures the migration-scope assessment completed after SM-AUD-05. It does not authorize implementation or settle platform/technology choices.

## Baseline finding

The rebaseline branch is a specification baseline, not a V1 runtime implementation branch. It is 40 commits ahead of `main`, with all branch-specific changes limited to README and `docs/spec/*`. The inherited prototype files remain present but were not changed by the rebaseline.

Examples of the inherited prototype state noted in the assessment:

- `app.js` couples project/frame state to local browser storage and prototype navigation.
- Camera and editor code do not establish the full camera-control, capture, timeline or non-destructive editing contracts.
- `player.js` is a simple image-list player, not evidence for the complete Sequence and project-FPS contracts.
- Existing JSON/image-series helpers and the MP4 placeholder do not establish the complete SM-07 import/export and portable archive contracts.
- No modern V1-specific test harness or mapped device-verification evidence was identified in the audited tree.

The branch's V1 authority remains SM-00, SM-02 and applicable SM-03…SM-07 contracts. Legacy behavior is reference material only.

## Migration recommendation

| Area | Migration treatment |
|---|---|
| HTML, CSS and interaction ideas | Use as UX reference; reconcile against SM-03 before reuse. |
| Project and frame state in `app.js` | Replace as the V1 product core; establish stable identity, project boundaries and durable persistence. |
| Camera and capture | Build against SM-04; reuse prototype only as a capability reference after isolated review. |
| Timeline, frame editor, Undo and annotations | Build against SM-05; the prototype is not a conforming implementation. |
| Library and settings | Reuse interaction ideas selectively; rebuild state and persistence against the contracts. |
| Image import, media export and project archive | Treat as separate SM-07 pipelines; inspect isolated helpers before any reuse. |
| Historical version files and `web-prototype` | Keep as historical references, not as the V1 implementation baseline. |

## Dependency-ordered implementation blocks

1. **Complete specification readiness first:** SM-05L is assembled; perform SM-05 Final Verification and its separate freeze gate, then SM-08 architecture/platform, SM-09 validation/test specification and SM-CA-01.
2. **Project model, settings and persistence/recovery:** PRJ 9, SET 6, RCV 14. Establish stable project/frame identity, durable writes and recovery semantics.
3. **Capture and assistance:** CAP 20, ONS 5, AST 5. Preserve the boundary between capture output and a durably registered Sequence frame.
4. **Sequence, timeline and frame editing:** TML 6, EDT 14. Keep stable identity, mutable order, mutation rules, Undo and non-destructive annotations aligned.
5. **Playback:** PLY 10 on the authoritative Sequence and project-FPS model.
6. **Image/project import and export:** IMG 2, EXP 5, ARC 10. Keep image import, media export and editable project archive as distinct pipelines.

The order identifies dependencies, not implementation authorization. Each block needs a separately defined scope, branch, requirement mapping, verification plan and completion evidence.

## Open documentation boundary

SM-08 must define architecture/platform decisions from the approved contracts. SM-09 must define automated, integration, build/device and evidence requirements. Neither is authored by this migration assessment. Existing open and deferred ODs remain governed by their authority documents and cannot be silently converted to implementation assumptions.
