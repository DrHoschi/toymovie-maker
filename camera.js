/* ============================================================================
 * Datei   : camera.js
 * Zweck   : Kamera-Tab (Aufnahmemodul)
 * Tabs    : Wird durch app.js angezeigt/versteckt
 * Stand   : v1.0 – Basisstruktur, keine Logik entfernt
 * ============================================================================
 */

(function () {
  'use strict';

  // Öffentliche API des Kamera-Moduls
  window.CameraTab = {
    init,
    show,
    hide,
    onProjectLoaded,
  };

  let videoEl;
  let overlayCanvas;

  function init() {
    videoEl = document.getElementById('cam_video');
    overlayCanvas = document.getElementById('cam_overlay');

    console.log('[CameraTab] init ✓');
  }

  function show() {
    const el = document.getElementById('tab-camera');
    if (el) el.style.display = 'block';
  }

  function hide() {
    const el = document.getElementById('tab-camera');
    if (el) el.style.display = 'none';
  }

  // Wird von app.js aufgerufen, sobald ein Projekt geöffnet wurde
  function onProjectLoaded(project) {
    console.log('[CameraTab] Projekt geladen:', project.name);
    // Hier später: Kamera starten, Overlay initialisieren usw.
  }

})();
