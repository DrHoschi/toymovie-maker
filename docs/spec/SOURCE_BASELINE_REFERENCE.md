# StopMotion – Source Baseline Reference

This file preserves the product/source material that originally informed the V1 specification work. It is **reference material**, not a replacement for the formal SM-00…SM-09 contracts.

## Original product concept

Smartphone StopMotion app for frame-by-frame capture.

Source capabilities/reference ideas included:
- Onion Skin using 1–5 previous frames with graduated opacity
- Capture assistance such as contour detection, horizon/ruler, optional grid and camera stability indication
- Portrait/Landscape support
- Project/library operations: list/open/delete/duplicate/import/export
- MP4 export and PNG/JPG frame export
- Project/image/project-data import using ZIP or own format concepts
- New project setup including name, Portrait/Landscape/Square, onion count 0–5, default opacity and storage location
- Settings concepts for DE/EN, onion count, opacity, contour detection and guides
- Frame editor concepts for text, frames/markers, delete/duplicate and Empty Frames
- Capture overlay with live camera, previous-frame overlays, capture control, menu and opacity slider

## Original technical concept

The source concept proposed an offline-first architecture with layers such as:
- Presentation
- Domain
- Data
- optional Cloud

Logical modules referenced:
- ProjectManager
- CaptureEngine
- OverlayEngine
- FrameEditor
- ExportService
- ImportService
- SettingsManager
- optional AI

## Original draft data model concepts

Project-level concepts included:
- UUID
- name
- creation/update dates
- aspectRatio
- overlaySettings
- frames
- optional thumbnailFrameId
- optional totalDurationMs
- optional fps

FrameMeta concepts included:
- UUID
- projectId
- index
- type: photo / empty / imported
- imagePath
- annotations

Other draft concepts:
- Annotation(text/drawing/marker)
- OverlaySettings
- AppSettings
- ExportJob

## Original storage sketch

Reference paths included ideas such as:
- `/app_data/settings.json`
- `projects/<id>/project.json`
- `frames/<frameId>.jpg`
- `exports/`

These paths are **not frozen implementation requirements**. Storage/persistence details are intentionally deferred to SM-06/SM-08.

## Original screen/module references

The source named screens/modules such as:
- StartScreen
- LibraryScreen
- NewProjectDialog
- CaptureScreen
- FrameEditorScreen
- SettingsScreen
- ImportDialog
- ExportDialog

SM-03 later replaced this with the frozen semantic screen/surface model documented in `SM-03_UI_UX_and_Navigation.md`.

## Later/deferred ideas from source

Reference-only later ideas included:
- AI edge/horizon support
- Cloud sync/login
- Sound tracks
- Community sharing/templates
- Tablet optimization

Platform choice remained unresolved in the source concept:
- iOS SwiftUI
- Android Kotlin
- Flutter

The V1 specification intentionally defers platform/architecture selection to SM-08.

## Authority note

Where this source-reference file differs from a formal SM contract, the formal SM contract wins.