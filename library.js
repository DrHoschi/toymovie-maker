/* ============================================================================
 * Datei   : library.js
 * Projekt : ToyMovie Maker – StopMotion Kids
 * Version : v0.3.0
 * Zweck   : Projekt-Bibliothek (Liste, Öffnen, JSON-Export/Import, Bild-Export)
 *
 * Features:
 *  - Liste aller Projekte (Name, Frames, Mode, ToyType)
 *  - Projekt öffnen / löschen
 *  - Alle Daten als JSON exportieren / importieren (Callbacks von app.js)
 *  - Ganze Bild-Serie als ZIP exportieren (JPEG oder PNG)
 *  - MP4-Export bleibt vorerst Platzhalter mit ehrlicher Meldung
 *
 * Abhängigkeit:
 *  - JSZip (global) – in index.html z.B.:
 *    <script src="https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"></script>
 * ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------ */
  /* Public API                                                               */
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
  /* State                                                                    */
  /* ------------------------------------------------------------------------ */

  let screenLibrary = null;
  let btnClose = null;
  let btnExportJson = null;
  let btnImportJson = null;
  let inputImportFile = null;
  let projectListEl = null;
  let emptyHintEl = null;

  /** @type {Array<{id:string,name:string,frames:string[],mode?:string,toyType?:string}>} */
  let projects = [];

  const callbacks = {
    onExportAllJson: null,
    onImportAllJson: null,
    onOpenProject: null,
    onDeleteProject: null,
    // optional – wenn app.js eigene Exportlogik registrieren möchte:
    onExportProjectJPEG: null,
    onExportProjectPNG: null,
    onExportProjectMP4: null
  };

  /* ------------------------------------------------------------------------ */
  /* Init                                                                     */
  /* ------------------------------------------------------------------------ */

  function init(options) {
    options = options || {};

    callbacks.onExportAllJson  = options.onExportAllJson  || null;
    callbacks.onImportAllJson  = options.onImportAllJson  || null;
    callbacks.onOpenProject    = options.onOpenProject    || null;
    callbacks.onDeleteProject  = options.onDeleteProject  || null;

    screenLibrary   = document.getElementById('screen-library');
    btnClose        = document.getElementById('lib_close');
    btnExportJson   = document.getElementById('lib_export_json');
    btnImportJson   = document.getElementById('lib_import_json');
    inputImportFile = document.getElementById('lib_import_file');
    projectListEl   = document.getElementById('lib_projectList');
    emptyHintEl     = document.getElementById('lib_emptyHint');

    if (!screenLibrary) {
      console.warn('[Library] #screen-library nicht gefunden.');
      return;
    }

    bindEvents();
    renderProjectList();

    console.log('[Library] init ✓');
  }

  function bindEvents() {
    if (btnClose) {
      btnClose.addEventListener('click', () => hide());
    }

    if (btnExportJson) {
      btnExportJson.addEventListener('click', () => {
        if (typeof callbacks.onExportAllJson === 'function') {
          callbacks.onExportAllJson();
        } else {
          console.warn('[Library] onExportAllJson nicht gesetzt.');
        }
      });
    }

    if (btnImportJson && inputImportFile) {
      btnImportJson.addEventListener('click', () => inputImportFile.click());

      inputImportFile.addEventListener('change', () => {
        const file = inputImportFile.files && inputImportFile.files[0];
        if (!file) return;
        if (typeof callbacks.onImportAllJson === 'function') {
          callbacks.onImportAllJson(file);
        } else {
          console.warn('[Library] onImportAllJson nicht gesetzt.');
        }
        inputImportFile.value = '';
      });
    }
  }

  /* ------------------------------------------------------------------------ */
  /* Sichtbarkeit                                                             */
  /* ------------------------------------------------------------------------ */

  function show() {
    if (screenLibrary) screenLibrary.style.display = 'block';
  }

  function hide() {
    if (screenLibrary) screenLibrary.style.display = 'none';
  }

  /* ------------------------------------------------------------------------ */
  /* Projekte                                                                 */
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

      // Linke Spalte: Name, Info
      const metaCol = document.createElement('div');
      metaCol.className = 'lib-project-meta';

      const nameEl = document.createElement('div');
      nameEl.className = 'lib-project-name';
      nameEl.textContent = p.name || 'Unbenanntes Projekt';

      const infoEl = document.createElement('div');
      infoEl.className = 'lib-project-info';
      const frameCount = Array.isArray(p.frames) ? p.frames.length : 0;
      const modeLabel  = p.mode === 'pro' ? 'Pro' : 'Light';
      const toyLabel   = p.toyType ? ` · ${p.toyType}` : '';
      infoEl.textContent = `${frameCount} Bild${frameCount === 1 ? '' : 'er'} · ${modeLabel}${toyLabel}`;

      const openLink = document.createElement('button');
      openLink.type = 'button';
      openLink.className = 'lib-btn lib-btn--link';
      openLink.textContent = 'Öffnen';
      openLink.addEventListener('click', () => {
        if (typeof callbacks.onOpenProject === 'function') {
          callbacks.onOpenProject(p.id);
        }
      });

      metaCol.appendChild(nameEl);
      metaCol.appendChild(infoEl);
      metaCol.appendChild(openLink);

      // Rechte Spalte: Buttons untereinander
      const actionCol = document.createElement('div');
      actionCol.className = 'lib-project-actions';

      const exportLabel = document.createElement('div');
      exportLabel.className = 'lib-project-actions-label';
      exportLabel.textContent = 'Export:';
      actionCol.appendChild(exportLabel);

      const exportMenu = document.createElement('div');
      exportMenu.className = 'lib-export-menu';

      // JPEG (Serie als ZIP)
      const btnJpeg = document.createElement('button');
      btnJpeg.className = 'lib-btn lib-btn--small';
      btnJpeg.type = 'button';
      btnJpeg.textContent = 'JPEG (ZIP)';
      btnJpeg.title = 'Alle Bilder als JPEG in einer ZIP-Datei exportieren';
      btnJpeg.addEventListener('click', () => {
        if (typeof callbacks.onExportProjectJPEG === 'function') {
          callbacks.onExportProjectJPEG(p.id);
        } else {
          exportProjectImageSeries(p, 'jpeg');
        }
      });

      // PNG (Serie als ZIP)
      const btnPng = document.createElement('button');
      btnPng.className = 'lib-btn lib-btn--small';
      btnPng.type = 'button';
      btnPng.textContent = 'PNG (ZIP)';
      btnPng.title = 'Alle Bilder als PNG in einer ZIP-Datei exportieren';
      btnPng.addEventListener('click', () => {
        if (typeof callbacks.onExportProjectPNG === 'function') {
          callbacks.onExportProjectPNG(p.id);
        } else {
          exportProjectImageSeries(p, 'png');
        }
      });

      // MP4 – Platzhalter
      const btnMp4 = document.createElement('button');
      btnMp4.className = 'lib-btn lib-btn--small';
      btnMp4.type = 'button';
      btnMp4.textContent = 'MP4';
      btnMp4.title = 'Video-Export (später)';
      btnMp4.addEventListener('click', () => {
        if (typeof callbacks.onExportProjectMP4 === 'function') {
          callbacks.onExportProjectMP4(p.id);
        } else {
          alert('Videoexport (MP4) ist noch nicht fertig.\nDerzeit kannst du alle Bilder als JPEG- oder PNG-ZIP exportieren oder die Projekte als JSON sichern.');
        }
      });

      exportMenu.appendChild(btnJpeg);
      exportMenu.appendChild(btnPng);
      exportMenu.appendChild(btnMp4);

      actionCol.appendChild(exportMenu);

      // Löschen
      const delBtn = document.createElement('button');
      delBtn.className = 'lib-btn lib-btn--icon';
      delBtn.type = 'button';
      delBtn.textContent = '🗑';
      delBtn.title = 'Projekt löschen';
      delBtn.addEventListener('click', () => {
        if (typeof callbacks.onDeleteProject === 'function') {
          const ok = confirm(`Projekt "${p.name}" wirklich löschen?`);
          if (ok) callbacks.onDeleteProject(p.id);
        }
      });
      actionCol.appendChild(delBtn);

      card.appendChild(metaCol);
      card.appendChild(actionCol);

      projectListEl.appendChild(card);
    });
  }

  /* ------------------------------------------------------------------------ */
  /* Serien-Export (JPEG / PNG)                                               */
  /* ------------------------------------------------------------------------ */

  /**
   * Exportiert ALLE Frames eines Projekts als ZIP (JPEG oder PNG).
   * Für PNG werden die Frames über ein Canvas neu kodiert.
   */
  function exportProjectImageSeries(project, format) {
    if (!project || !Array.isArray(project.frames) || !project.frames.length) {
      alert('Dieses Projekt enthält noch keine Bilder.');
      return;
    }

    if (typeof JSZip === 'undefined') {
      alert('JSZip ist nicht geladen.\nBitte die JSZip-Bibliothek in index.html einbinden.');
      return;
    }

    const safeName = sanitizeFileName(project.name || 'projekt');
    const zip = new JSZip();
    const folder = zip.folder(safeName) || zip;

    const usePng = (format === 'png');

    let index = 0;

    function processNext() {
      if (index >= project.frames.length) {
        // fertig → ZIP ausgeben
        zip.generateAsync({ type: 'blob' }).then((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${safeName}_${format}_frames.zip`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          console.log(`[Library] Serie (${project.frames.length} Bilder) als ${format.toUpperCase()}-ZIP exportiert.`);
        });
        return;
      }

      const src = project.frames[index];
      const frameNo = String(index + 1).padStart(3, '0');

      if (!usePng && src.startsWith('data:image/jpeg')) {
        // Direkt als JPEG in ZIP übernehmen (ohne Canvas)
        const base64 = src.split(',')[1];
        folder.file(`frame_${frameNo}.jpg`, base64, { base64: true });
        index++;
        processNext();
        return;
      }

      // Per Canvas neu als PNG (oder JPEG) kodieren
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const mime = usePng ? 'image/png' : 'image/jpeg';
        const ext  = usePng ? 'png' : 'jpg';
        const dataUrl = canvas.toDataURL(mime, 0.92);
        const base64  = dataUrl.split(',')[1];

        folder.file(`frame_${frameNo}.${ext}`, base64, { base64: true });
        index++;
        processNext();
      };
      img.onerror = () => {
        console.warn('[Library] Frame konnte nicht geladen werden, überspringe:', index);
        index++;
        processNext();
      };
      img.src = src;
    }

    processNext();
  }

  function sanitizeFileName(name) {
    return String(name).trim().replace(/[^\w\-]+/g, '_');
  }

  /* ------------------------------------------------------------------------ */
  /* Callback-Setter                                                          */
  /* ------------------------------------------------------------------------ */

  function setDataExportHandler(fn) {
    callbacks.onExportAllJson = (typeof fn === 'function') ? fn : null;
  }

  function setDataImportHandler(fn) {
    callbacks.onImportAllJson = (typeof fn === 'function') ? fn : null;
  }

  function setProjectOpenHandler(fn) {
    callbacks.onOpenProject = (typeof fn === 'function') ? fn : null;
  }

  function setProjectDeleteHandler(fn) {
    callbacks.onDeleteProject = (typeof fn === 'function') ? fn : null;
  }

  function setProjectExportHandlerJPEG(fn) {
    callbacks.onExportProjectJPEG = (typeof fn === 'function') ? fn : null;
  }

  function setProjectExportHandlerPNG(fn) {
    callbacks.onExportProjectPNG = (typeof fn === 'function') ? fn : null;
  }

  function setProjectExportHandlerMP4(fn) {
    callbacks.onExportProjectMP4 = (typeof fn === 'function') ? fn : null;
  }

})();
