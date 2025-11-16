/* ============================================================================
 * Datei   : editor.js
 * Zweck   : Editor-Tab (Timeline, Frames bearbeiten)
 * Tabs    : Wird durch app.js angezeigt/versteckt
 * Stand   : v1.0 – Basisstruktur, Funktionen anpassbar
 * ============================================================================
 */

(function () {
  'use strict';

  window.EditorTab = {
    init,
    show,
    hide,
    onProjectLoaded,
  };

  let timelineEl;

  function init() {
    timelineEl = document.getElementById('editor_timeline');
    console.log('[EditorTab] init ✓');
  }

  function show() {
    const el = document.getElementById('tab-editor');
    if (el) el.style.display = 'block';
  }

  function hide() {
    const el = document.getElementById('tab-editor');
    if (el) el.style.display = 'none';
  }

  function onProjectLoaded(project) {
    console.log('[EditorTab] Projekt geladen:', project.name);

    // Timeline leeren
    if (timelineEl) {
      timelineEl.innerHTML = '';
    }

    // Später Timeline füllen (Frames anzeigen)
    // Hier noch neutral – app.js übernimmt später die eigentliche Logik
  }

})();
