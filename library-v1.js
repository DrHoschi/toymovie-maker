/* ============================================================================
 * Datei   : library.js
 * Projekt : ToyMovie Maker – StopMotion Kids
 * Version : v0.2.0 (Bibliothek mit Bild-Export)
 * Zweck   : Verwaltung der Projekt-Bibliothek (Liste, Öffnen, Import/Export)
 *
 * Ziel:
 *  - Projekte übersichtlich anzeigen (Name, Frames, Modus)
 *  - Projekt auswählen/öffnen (Callback an app.js)
 *  - Gesamte Daten als JSON exportieren & importieren
 *  - Export eines Projekts als Einzelbild (JPEG/PNG)
 *  - MP4-Export ist als Hook vorbereitet, aktuell aber noch Platzhalter.
 *
 * WICHTIG:
 *  - Datenhaltung (localStorage, Projekte etc.) bleibt in app.js.
 *  - app.js ruft Library.init(...) auf und übergibt Callbacks + Projektdaten.
 * ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------ */
  /* Öffentliche API-Definition auf window.Library                            */
  /* ------------------------------------------------------------------------ */

  window.Library = {
    init,
    show,
    hide,
    setProjects,
    setDataExportHandler,
    setDataImportHandler,
    setProjectOpenHandler,
    setProjectDeleteHandler,
    setProjectExportHandlerJPEG,
    setProjectExportHandlerPNG,
    setProjectExportHandlerMP4
  };

  /* ------------------------------------------------------------------------ */
  /* Modul-Zustand                                                            */
  /* ------------------------------------------------------------------------ */

  // DOM-Referenzen
  let screenLibrary = null;
  let btnClose = null;
  let btnExportJson = null;
  let btnImportJson = null;
  let inputImportFile = null;
  let projectListEl = null;
  let emptyHintEl = null;

  // Projektdaten (reine Ansicht – Quelle ist app.js)
  /** @type {Array<{id:string,name:string,frames:string[],mode?:string,toyType?:string}>} */
  let projects = [];

  // Callback-Funktionen, die von app.js gesetzt werden
  const callbacks = {
    onExportAllJson: null,   // () => void
    onImportAllJson: null,   // (file: File) => void
    onOpenProject: null,     // (projectId: string) => void
    onDeleteProject: null,   // (projectId: string) => void

    // OPTIONALE Hooks – falls app.js eigene Exportlogik haben soll.
    // Wenn NICHT gesetzt, nutzt Library ihre eigenen Standard-Exporte.
    onExportProjectJPEG: null, // (projectId: string) => void
    onExportProjectPNG: null,  // (projectId: string) => void
    onExportProjectMP4: null   // (projectId: string) => void
  };

  /* ------------------------------------------------------------------------ */
  /* Init / Setup                                                             */
  /* ------------------------------------------------------------------------ */

  function init(options) {
    options = options || {};

    // Callbacks aus Optionen übernehmen (können später auch via Setter geändert werden)
    callbacks.onExportAllJson = options.onExportAllJson || null;
    callbacks.onImportAllJson = options.onImportAllJson || null;
    callbacks.onOpenProject = options.onOpenProject || null;
    callbacks.onDeleteProject = options.onDeleteProject || null;

    // DOM-Elemente suchen (falls screen-library schon im HTML existiert)
    screenLibrary   = document.getElementById('screen-library');
    btnClose        = document.getElementById('lib_close');
    btnExportJson   = document.getElementById('lib_export_json');
    btnImportJson   = document.getElementById('lib_import_json');
    inputImportFile = document.getElementById('lib_import_file');
    projectListEl   = document.getElementById('lib_projectList');
    emptyHintEl     = document.getElementById('lib_emptyHint');

    if (!screenLibrary) {
      console.warn('[Library] Kein #screen-library gefunden – Bibliothek ist aktuell unsichtbar.');
      return;
    }

    bindEvents();
    renderProjectList();

    console.log('[Library] init ✓');
  }

  /* ------------------------------------------------------------------------ */
  /* Event-Handler                                                            */
  /* ------------------------------------------------------------------------ */

  function bindEvents() {
    if (btnClose) {
      btnClose.addEventListener('click', () => {
        hide();
      });
    }

    if (btnExportJson) {
      btnExportJson.addEventListener('click', () => {
        if (typeof callbacks.onExportAllJson === 'function') {
          callbacks.onExportAllJson();
        } else {
          console.warn('[Library] onExportAllJson ist nicht gesetzt.');
        }
      });
    }

    if (btnImportJson && inputImportFile) {
      btnImportJson.addEventListener('click', () => {
        inputImportFile.click();
      });

      inputImportFile.addEventListener('change', () => {
        const file = inputImportFile.files && inputImportFile.files[0];
        if (!file) return;

        if (typeof callbacks.onImportAllJson === 'function') {
          callbacks.onImportAllJson(file);
        } else {
          console.warn('[Library] onImportAllJson ist nicht gesetzt.');
        }

        // Auswahl zurücksetzen
        inputImportFile.value = '';
      });
    }
  }

  /* ------------------------------------------------------------------------ */
  /* Anzeige / Sichtbarkeit                                                   */
  /* ------------------------------------------------------------------------ */

  function show() {
    if (!screenLibrary) return;
    screenLibrary.style.display = 'block';
  }

  function hide() {
    if (!screenLibrary) return;
    screenLibrary.style.display = 'none';
  }

  /* ------------------------------------------------------------------------ */
  /* Projektdaten setzen + Rendern                                            */
  /* ------------------------------------------------------------------------ */

  function setProjects(list) {
    projects = Array.isArray(list) ? list.slice() : [];
    renderProjectList();
  }

  function renderProjectList() {
    if (!projectListEl || !emptyHintEl) return;

    projectListEl.innerHTML = '';

    if (!projects.length) {
      emptyHintEl.style.display = 'block';
      return;
    }

    emptyHintEl.style.display = 'none';

    projects.forEach((p) => {
      const card = document.createElement('div');
      card.className = 'lib-project-card';

      const meta = document.createElement('div');
      meta.className = 'lib-project-meta';

      const nameEl = document.createElement('div');
      nameEl.className = 'lib-project-name';
      nameEl.textContent = p.name || 'Unbenanntes Projekt';

      const infoEl = document.createElement('div');
      infoEl.className = 'lib-project-info';
      const frameCount = Array.isArray(p.frames) ? p.frames.length : 0;
      const modeLabel  = p.mode === 'pro' ? 'Pro' : 'Light';
      const toyLabel   = p.toyType ? ` · ${p.toyType}` : '';
      infoEl.textContent = `${frameCount} Bild${frameCount === 1 ? '' : 'er'} · ${modeLabel}${toyLabel}`;

      meta.appendChild(nameEl);
      meta.appendChild(infoEl);

      const actions = document.createElement('div');
      actions.className = 'lib-project-actions';

      // Öffnen-Button
      const openBtn = document.createElement('button');
      openBtn.className = 'lib-btn lib-btn--primary';
      openBtn.type = 'button';
      openBtn.textContent = 'Öffnen';
      openBtn.addEventListener('click', () => {
        if (typeof callbacks.onOpenProject === 'function') {
          callbacks.onOpenProject(p.id);
        } else {
          console.warn('[Library] onOpenProject ist nicht gesetzt.');
        }
      });
      actions.appendChild(openBtn);

      // Export-Menü (JPEG/PNG/MP4)
      const exportMenu = document.createElement('div');
      exportMenu.className = 'lib-export-menu';

      // JPEG
      const btnJpeg = document.createElement('button');
      btnJpeg.className = 'lib-btn lib-btn--small';
      btnJpeg.type = 'button';
      btnJpeg.textContent = 'JPEG';
      btnJpeg.title = 'Projekt als Bild (JPEG) exportieren';
      btnJpeg.addEventListener('click', () => {
        if (typeof callbacks.onExportProjectJPEG === 'function') {
          // Falls app.js eine eigene Logik setzen will
          callbacks.onExportProjectJPEG(p.id);
        } else {
          // Standard-Export direkt in der Bibliothek
          exportProjectImage(p, 'jpeg');
        }
      });

      // PNG
      const btnPng = document.createElement('button');
      btnPng.className = 'lib-btn lib-btn--small';
      btnPng.type = 'button';
      btnPng.textContent = 'PNG';
      btnPng.title = 'Projekt als Bild (PNG) exportieren';
      btnPng.addEventListener('click', () => {
        if (typeof callbacks.onExportProjectPNG === 'function') {
          callbacks.onExportProjectPNG(p.id);
        } else {
          exportProjectImage(p, 'png');
        }
      });

      // MP4 (Platzhalter, aber kein "nicht implementiert" mehr)
      const btnMp4 = document.createElement('button');
      btnMp4.className = 'lib-btn lib-btn--small';
      btnMp4.type = 'button';
      btnMp4.textContent = 'MP4';
      btnMp4.title = 'Projekt als Video exportieren (später)';
      btnMp4.addEventListener('click', () => {
        if (typeof callbacks.onExportProjectMP4 === 'function') {
          callbacks.onExportProjectMP4(p.id);
        } else {
          alert('Videoexport (MP4) ist in Vorbereitung.\nAktuell kannst du Bilder als JPEG/PNG exportieren oder alles als JSON sichern.');
        }
      });

      exportMenu.appendChild(btnJpeg);
      exportMenu.appendChild(btnPng);
      exportMenu.appendChild(btnMp4);

      actions.appendChild(exportMenu);

      // Löschen-Button
      const delBtn = document.createElement('button');
      delBtn.className = 'lib-btn lib-btn--icon';
      delBtn.type = 'button';
      delBtn.textContent = '🗑';
      delBtn.title = 'Projekt löschen';
      delBtn.addEventListener('click', () => {
        if (typeof callbacks.onDeleteProject === 'function') {
          const ok = confirm(`Projekt "${p.name}" wirklich löschen?`);
          if (ok) callbacks.onDeleteProject(p.id);
        } else {
          console.warn('[Library] onDeleteProject ist nicht gesetzt.');
        }
      });
      actions.appendChild(delBtn);

      card.appendChild(meta);
      card.appendChild(actions);

      projectListEl.appendChild(card);
    });
  }

  /* ------------------------------------------------------------------------ */
  /* Export-Helfer: JPEG / PNG                                                */
  /* ------------------------------------------------------------------------ */

  /**
   * Exportiert das ERSTE Frame eines Projektes als Bild (JPEG/PNG).
   * Wenn du später alle Frames als ZIP oder ähnliches willst, bauen wir das
   * an dieser Stelle weiter aus.
   *
   * @param {Object} project
   * @param {'jpeg'|'png'} format
   */
  function exportProjectImage(project, format) {
    if (!project || !Array.isArray(project.frames) || !project.frames.length) {
      alert('Dieses Projekt enthält noch keine Bilder.');
      return;
    }

    const firstFrame = project.frames[0];
    if (typeof firstFrame !== 'string' || !firstFrame.startsWith('data:image')) {
      alert('Das erste Bild dieses Projekts ist kein gültiges Bild.');
      return;
    }

    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const mime = format === 'png' ? 'image/png' : 'image/jpeg';
        const ext  = format === 'png' ? 'png' : 'jpg';

        const dataUrl = canvas.toDataURL(mime, 0.92);

        const link = document.createElement('a');
        link.href = dataUrl;
        const safeName = (project.name || 'projekt').replace(/[^\w\-]+/g, '_');
        link.download = `${safeName}.${ext}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log(`[Library] Projekt "${project.name}" als ${ext.toUpperCase()} exportiert.`);
      } catch (err) {
        console.error('[Library] Fehler beim Bild-Export:', err);
        alert('Beim Export ist ein Fehler aufgetreten.');
      }
    };
    img.onerror = () => {
      alert('Bild konnte nicht geladen werden.');
    };
    img.src = firstFrame;
  }

  /* ------------------------------------------------------------------------ */
  /* Callback-Setter                                                          */
  /* ------------------------------------------------------------------------ */

  function setDataExportHandler(fn) {
    callbacks.onExportAllJson = typeof fn === 'function' ? fn : null;
  }

  function setDataImportHandler(fn) {
    callbacks.onImportAllJson = typeof fn === 'function' ? fn : null;
  }

  function setProjectOpenHandler(fn) {
    callbacks.onOpenProject = typeof fn === 'function' ? fn : null;
  }

  function setProjectDeleteHandler(fn) {
    callbacks.onDeleteProject = typeof fn === 'function' ? fn : null;
  }

  function setProjectExportHandlerJPEG(fn) {
    callbacks.onExportProjectJPEG = typeof fn === 'function' ? fn : null;
  }

  function setProjectExportHandlerPNG(fn) {
    callbacks.onExportProjectPNG = typeof fn === 'function' ? fn : null;
  }

  function setProjectExportHandlerMP4(fn) {
    callbacks.onExportProjectMP4 = typeof fn === 'function' ? fn : null;
  }

})();
