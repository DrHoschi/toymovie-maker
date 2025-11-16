/* ============================================================================
 * Datei   : player.js
 * Zweck   : Player-Tab (Film anschauen)
 * Tabs    : Wird durch app.js angezeigt/versteckt
 * Stand   : v1.0 – Basisstruktur
 * ============================================================================
 */

(function () {
  'use strict';

  window.PlayerTab = {
    init,
    show,
    hide,
    onProjectLoaded,
  };

  let imgEl;
  let infoEl;

  function init() {
    imgEl = document.getElementById('player_img');
    infoEl = document.getElementById('player_info');

    console.log('[PlayerTab] init ✓');
  }

  function show() {
    const el = document.getElementById('tab-player');
    if (el) el.style.display = 'block';
  }

  function hide() {
    const el = document.getElementById('tab-player');
    if (el) el.style.display = 'none';
  }

  function onProjectLoaded(project) {
    console.log('[PlayerTab] Projekt geladen:', project.name);

    if (infoEl) {
      infoEl.textContent = `Projekt: ${project.name} – ${project.frames.length} Frames`;
    }

    // Erstes Bild anzeigen (wenn vorhanden)
    if (imgEl && project.frames.length > 0) {
      imgEl.src = project.frames[0];
    }
  }

})();
