/* ============================================================================
 * Datei   : player.js
 * Projekt : StopMotion / ToyMovie Maker
 * Version : v1.1.0
 * Zweck   : Player-Tab (Film anschauen + Vollbildmodus)
 *
 * Erwartete HTML-Elemente (im Player-Tab):
 *
 *   <div id="tab-player" style="display:none">
 *     <div id="player_root">
 *       <div id="player_info"></div>
 *       <div class="player-view">
 *         <img id="player_img" alt="Player Frame">
 *       </div>
 *       <div class="player-controls">
 *         <button id="player_prev">◀︎</button>
 *         <button id="player_playPause">▶︎</button>
 *         <button id="player_next">▶︎</button>
 *         <button id="player_fullscreen">⛶</button>
 *       </div>
 *     </div>
 *   </div>
 *
 * Die echte HTML-Struktur liefern wir später in index.html final nach –
 * wichtig sind nur die IDs, damit das hier funktioniert.
 *
 * Öffentliche API (von app.js aufgerufen):
 *   PlayerTab.init()
 *   PlayerTab.show()
 *   PlayerTab.hide()
 *   PlayerTab.onProjectLoaded(project)
 * ========================================================================== */

(function () {
  'use strict';

  // ------------------------------------------------------------
  // Öffentliche API
  // ------------------------------------------------------------

  window.PlayerTab = {
    init,
    show,
    hide,
    onProjectLoaded
  };

  // ------------------------------------------------------------
  // Modul-weiter Zustand
  // ------------------------------------------------------------

  let rootEl;
  let imgEl;
  let infoEl;

  let btnPrev;
  let btnPlayPause;
  let btnNext;
  let btnFullscreen;

  let currentProject = null;
  let currentIndex = 0;
  let isPlaying = false;
  let fps = 4;          // Standard-Geschwindigkeit
  let timerId = null;   // Interval für Playback

  // ------------------------------------------------------------
  // Initialisierung (einmal beim App-Start)
  // ------------------------------------------------------------

  function init() {
    rootEl        = document.getElementById('player_root');
    imgEl         = document.getElementById('player_img');
    infoEl        = document.getElementById('player_info');

    btnPrev       = document.getElementById('player_prev');
    btnPlayPause  = document.getElementById('player_playPause');
    btnNext       = document.getElementById('player_next');
    btnFullscreen = document.getElementById('player_fullscreen');

    // Event-Handler für die Buttons
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        pause();             // beim manuellen Sprung pausieren
        step(-1);            // ein Frame zurück
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        pause();
        step(1);             // ein Frame vor
      });
    }

    if (btnPlayPause) {
      btnPlayPause.addEventListener('click', () => {
        if (isPlaying) {
          pause();
        } else {
          play();
        }
      });
    }

    if (btnFullscreen) {
      btnFullscreen.addEventListener('click', toggleFullscreen);
    }

    console.log('[PlayerTab] init ✓');
  }

  // ------------------------------------------------------------
  // Sichtbarkeit (wird von app.js gesteuert)
  // ------------------------------------------------------------

  function show() {
    const tab = document.getElementById('tab-player');
    if (tab) tab.style.display = 'block';
  }

  function hide() {
    const tab = document.getElementById('tab-player');
    if (tab) tab.style.display = 'none';
    // Optional: beim Verlassen des Tabs Playback stoppen
    pause();
  }

  // ------------------------------------------------------------
  // Project-Loading (von app.js aufgerufen)
  // ------------------------------------------------------------

  /**
   * Wird aufgerufen, sobald ein Projekt im Player angezeigt werden soll.
   * Erwartet ein Objekt in der Form:
   *   { id, name, frames: [dataUrl1, dataUrl2, ...], ... }
   */
  function onProjectLoaded(project) {
    currentProject = project || null;
    currentIndex = 0;
    pause(); // sicherheitshalber

    updateInfoAndImage();

    console.log(
      '[PlayerTab] Projekt geladen:',
      currentProject ? currentProject.name : '(kein Projekt)'
    );
  }

  // ------------------------------------------------------------
  // Player-Logik
  // ------------------------------------------------------------

  function getFrameCount() {
    if (!currentProject || !Array.isArray(currentProject.frames)) return 0;
    return currentProject.frames.length;
  }

  function updateInfoAndImage() {
    const count = getFrameCount();

    if (!currentProject || !count) {
      // Kein Projekt oder keine Frames
      if (infoEl) {
        infoEl.textContent = 'Kein Projekt oder keine Bilder vorhanden.';
      }
      if (imgEl) {
        imgEl.src = '';
        imgEl.style.visibility = 'hidden';
      }
      updatePlayButton();
      return;
    }

    // Index im gültigen Bereich halten
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= count) currentIndex = count - 1;

    const frameUrl = currentProject.frames[currentIndex];

    if (imgEl) {
      imgEl.src = frameUrl;
      imgEl.style.visibility = 'visible';
    }

    if (infoEl) {
      infoEl.textContent =
        `${currentProject.name} – Frame ${currentIndex + 1} / ${count}`;
    }

    updatePlayButton();
  }

  function updatePlayButton() {
    if (!btnPlayPause) return;
    // Wir nehmen bewusst nur Symbole, damit wir unabhängig von i18n bleiben
    btnPlayPause.textContent = isPlaying ? '⏸' : '▶︎';
  }

  function step(delta) {
    const count = getFrameCount();
    if (!count) return;

    // zyklisch vor/zurück
    currentIndex = (currentIndex + delta + count) % count;
    updateInfoAndImage();
  }

  function play() {
    const count = getFrameCount();
    if (!count) return;

    if (isPlaying) return; // schon am Laufen
    isPlaying = true;
    updatePlayButton();

    const intervalMs = 1000 / fps;
    stopTimer();

    timerId = window.setInterval(() => {
      step(1);
    }, intervalMs);
  }

  function pause() {
    if (!isPlaying) return;
    isPlaying = false;
    updatePlayButton();
    stopTimer();
  }

  function stopTimer() {
    if (timerId != null) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }

  // ------------------------------------------------------------
  // Vollbild-Logik
  // ------------------------------------------------------------

  /**
   * Schaltet den Player zwischen normal und Vollbild um.
   * Nutzt, wenn verfügbar, die Fullscreen-API des Browsers.
   */
  function toggleFullscreen() {
    if (!rootEl) return;

    // Wenn bereits irgendwas im Fullscreen ist → wieder raus
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {
        // Ignorieren, wenn das z.B. im iOS-Safari nicht geht
      });
      rootEl.classList.remove('is-fullscreen');
      return;
    }

    // Sonst: diesen Player in Vollbild setzen
    if (rootEl.requestFullscreen) {
      rootEl.requestFullscreen().then(() => {
        rootEl.classList.add('is-fullscreen');
      }).catch(() => {
        // Fehler ignorieren, ggf. alternative Lösung später
      });
    } else {
      // Fallback: Nur CSS-Klasse setzen, falls Fullscreen-API nicht vorhanden
      rootEl.classList.toggle('is-fullscreen');
    }
  }

})();
