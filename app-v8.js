/* ============================================================================
 * Datei   : app.js
 * Projekt : ToyMovie Maker – StopMotion Kids
 * Version : v1.6 final
 *
 * Verantwortlich für:
 *  - Screens: Home, Project, Library, Settings
 *  - Projekt-Verwaltung (Liste, aktuelles Projekt)
 *  - Kamera-Steuerung (start/stop, Foto aufnehmen)
 *  - Tabs (Kamera / Editor / Player)
 *  - Anbindung von Library.js (Projektliste + JSON Export/Import)
 *  - Anbindung von Settings.js (Mode speichern/laden)
 * ========================================================================== */

(function () {
  'use strict';

  /* -----------------------------------------------------------------------
   * Konstanten & State
   * -------------------------------------------------------------------- */

  const STORAGE_KEY_PROJECTS = 'tmm_projects';

  // Screens
  let screenHome;
  let screenProject;
  let screenLibrary;
  let screenSettings;

  // Home Buttons
  let btnHomeLight;
  let btnHomePro;
  let btnHomeNewProject;
  let btnHomeLibrary;
  let btnHomeSettings;

  // Settings
  let btnSettingsBack;

  // Tabs
  const TABS = {
    camera: 'tab-camera',
    editor: 'tab-editor',
    player: 'tab-player'
  };

  let btnTabCamera;
  let btnTabEditor;
  let btnTabPlayer;
  let btnBackHome;

  // Kamera-Elemente (mit Fallback-IDs)
  let camVideo;
  let camOverlay;
  let btnCamCapture;

  // Library-Buttons (werden in Library.init auch benutzt)
  let btnLibClose;

  // Zustand
  /** @type {Array<{id:string,name:string,frames:string[],mode:string,createdAt:string,updatedAt?:string,toyType?:string}>} */
  let projects = [];
  let currentProject = null;
  let currentTab = null;
  let currentMode = 'light'; // 'light' oder 'pro'

  // Kamera-Stream
  let cameraStream = null;

  /* -----------------------------------------------------------------------
   * Init
   * -------------------------------------------------------------------- */

  document.addEventListener('DOMContentLoaded', () => {
    cacheDom();
    loadProjects();

    // Mode evtl. aus Settings laden
    if (window.AppSettings && typeof AppSettings.loadMode === 'function') {
      const stored = AppSettings.loadMode();
      if (stored === 'light' || stored === 'pro') {
        currentMode = stored;
      }
    }
    applyModeToBody();

    bindHomeEvents();
    bindTabEvents();
    bindCameraEvents();

    // Module initialisieren
    if (window.CameraTab && typeof CameraTab.init === 'function') {
      CameraTab.init();
    }
    if (window.EditorTab && typeof EditorTab.init === 'function') {
      EditorTab.init();
    }
    if (window.PlayerTab && typeof PlayerTab.init === 'function') {
      PlayerTab.init();
    }

    // Library-Modul initialisieren (falls vorhanden)
    if (window.Library && typeof Library.init === 'function') {
      Library.init({
        onExportAllJson: exportAllData,
        onImportAllJson: importAllData,
        onOpenProject: openProjectFromLibrary,
        onDeleteProject: deleteProject
      });

      // Projekte in die Bibliothek spiegeln
      if (typeof Library.setProjects === 'function') {
        Library.setProjects(projects);
      }
    }

    showScreen('home');

    console.log('[App] Initialisierung abgeschlossen ✓');
  });

  /* -----------------------------------------------------------------------
   * DOM Caching
   * -------------------------------------------------------------------- */

  function cacheDom() {
    // Screens
    screenHome     = document.getElementById('screen-home')     || null;
    screenProject  = document.getElementById('screen-project')  || null;
    screenLibrary  = document.getElementById('screen-library')  || null;
    screenSettings = document.getElementById('screen-settings') || null;

    // Home Buttons
    btnHomeLight      = document.getElementById('home_light')      || null;
    btnHomePro        = document.getElementById('home_pro')        || null;
    btnHomeNewProject = document.getElementById('home_newProject') || null;
    btnHomeLibrary    = document.getElementById('home_library')    || null;
    btnHomeSettings   = document.getElementById('home_settings')   || null;

    // Settings
    btnSettingsBack   = document.getElementById('settings_back')   || null;

    // Tabs
    btnTabCamera = document.getElementById('btn_tab_camera') || null;
    btnTabEditor = document.getElementById('btn_tab_editor') || null;
    btnTabPlayer = document.getElementById('btn_tab_player') || null;
    btnBackHome  = document.getElementById('btn_back_home')  || null;

    // Kamera (mit Fallback auf alte IDs)
    camVideo =
      document.getElementById('cam_video') ||
      document.getElementById('cameraVideo') ||
      null;

    camOverlay =
      document.getElementById('cam_overlay') ||
      document.getElementById('overlayCanvas') ||
      null;

    btnCamCapture =
      document.getElementById('cam_capture') ||
      document.getElementById('btnCapture') ||
      null;

    // Library
    btnLibClose = document.getElementById('lib_close') || null;

    console.log('[App] cacheDom:', {
      camVideo: !!camVideo,
      camOverlay: !!camOverlay,
      btnCamCapture: !!btnCamCapture
    });
  }

  /* -----------------------------------------------------------------------
   * Storage (Projekte)
   * -------------------------------------------------------------------- */

  function loadProjects() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (!raw) {
        projects = [];
        return;
      }
      const parsed = JSON.parse(raw);
      projects = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn('[App] Konnte Projekte nicht laden:', e);
      projects = [];
    }
  }

  function saveProjects() {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.warn('[App] Konnte Projekte nicht speichern:', e);
    }
    if (window.Library && typeof Library.setProjects === 'function') {
      Library.setProjects(projects);
    }
  }

  function findProjectById(id) {
    return projects.find(p => p.id === id) || null;
  }

  /* -----------------------------------------------------------------------
   * Screens / Navigation
   * -------------------------------------------------------------------- */

  function showScreen(name) {
    if (screenHome)     screenHome.style.display     = (name === 'home'     ? 'block' : 'none');
    if (screenProject)  screenProject.style.display  = (name === 'project'  ? 'block' : 'none');
    if (screenLibrary)  screenLibrary.style.display  = (name === 'library'  ? 'block' : 'none');
    if (screenSettings) screenSettings.style.display = (name === 'settings' ? 'block' : 'none');

    console.log('[App] Screen →', name);
  }

  /* -----------------------------------------------------------------------
   * Mode / Theme
   * -------------------------------------------------------------------- */

  function applyModeToBody() {
    document.body.classList.remove('mode-light', 'mode-pro');
    document.body.classList.add(currentMode === 'pro' ? 'mode-pro' : 'mode-light');
  }

  /* -----------------------------------------------------------------------
   * Home-Events
   * -------------------------------------------------------------------- */

  function bindHomeEvents() {
    if (btnHomeLight) {
      btnHomeLight.addEventListener('click', () => {
        currentMode = 'light';
        console.log('[App] Light-Version gewählt');
        if (window.AppSettings && AppSettings.saveMode) {
          AppSettings.saveMode('light');
        }
        applyModeToBody();
      });
    }

    if (btnHomePro) {
      btnHomePro.addEventListener('click', () => {
        currentMode = 'pro';
        console.log('[App] Pro-Version gewählt');
        if (window.AppSettings && AppSettings.saveMode) {
          AppSettings.saveMode('pro');
        }
        applyModeToBody();
      });
    }

    if (btnHomeNewProject) {
      btnHomeNewProject.addEventListener('click', startNewProjectFlow);
    }

    if (btnHomeLibrary) {
      btnHomeLibrary.addEventListener('click', () => {
        // Projektliste in Bibliothek spiegeln
        if (window.Library && Library.setProjects) {
          Library.setProjects(projects);
        }
        showScreen('library');
      });
    }

    if (btnHomeSettings) {
      btnHomeSettings.addEventListener('click', () => {
        showScreen('settings');
        // Settings-UI initialisieren (falls vorhanden)
        if (window.AppSettings && typeof AppSettings.init === 'function') {
          AppSettings.init('settings_root');
        }
      });
    }

    if (btnSettingsBack) {
      btnSettingsBack.addEventListener('click', () => {
        showScreen('home');
      });
    }

    if (btnLibClose) {
      btnLibClose.addEventListener('click', () => {
        showScreen('home');
      });
    }
  }

  /* -----------------------------------------------------------------------
   * Tabs / Projekt-Screen
   * -------------------------------------------------------------------- */

  function bindTabEvents() {
    if (btnTabCamera) {
      btnTabCamera.addEventListener('click', () => showTab('camera'));
    }
    if (btnTabEditor) {
      btnTabEditor.addEventListener('click', () => showTab('editor'));
    }
    if (btnTabPlayer) {
      btnTabPlayer.addEventListener('click', () => showTab('player'));
    }
    if (btnBackHome) {
      btnBackHome.addEventListener('click', () => {
        stopCamera();
        currentProject = null;
        showScreen('home');
      });
    }
  }

  function showTab(name) {
    currentTab = name;

    Object.keys(TABS).forEach(tabName => {
      const el = document.getElementById(TABS[tabName]);
      if (!el) return;
      el.style.display = (tabName === name ? 'block' : 'none');
    });

    // Module informieren
    if (window.CameraTab) {
      if (name === 'camera' && CameraTab.show) CameraTab.show();
      else if (CameraTab.hide) CameraTab.hide();
    }
    if (window.EditorTab) {
      if (name === 'editor' && EditorTab.show) EditorTab.show();
      else if (EditorTab.hide) EditorTab.hide();
    }
    if (window.PlayerTab) {
      if (name === 'player' && PlayerTab.show) PlayerTab.show();
      else if (PlayerTab.hide) PlayerTab.hide();
    }

    console.log('[App] Tab →', name);
  }

  /* -----------------------------------------------------------------------
   * Kamera / Aufnahme
   * -------------------------------------------------------------------- */

  function bindCameraEvents() {
    if (btnCamCapture) {
      btnCamCapture.addEventListener('click', onCaptureClick);
    } else {
      console.warn('[App] Kein Capture-Button gefunden (cam_capture / btnCapture).');
    }
  }

  async function startCamera() {
    if (!camVideo) {
      console.warn('[App] Kein Kamera-Videoelement gefunden.');
      return;
    }
    if (cameraStream) {
      console.log('[App] Kamera läuft bereits.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      cameraStream = stream;
      camVideo.srcObject = stream;

      // iOS Autoplay-Workaround
      try {
        await camVideo.play();
      } catch (e) {
        console.warn('[App] video.play() konnte nicht automatisch gestartet werden:', e);
      }

      console.log('[App] Kamera gestartet ✓');
    } catch (err) {
      console.error('[App] Kamera-Fehler:', err);
      alert('Kamera konnte nicht gestartet werden: ' + err.message);
    }
  }

  function stopCamera() {
    if (!cameraStream) return;
    cameraStream.getTracks().forEach(t => t.stop());
    cameraStream = null;
    if (camVideo) camVideo.srcObject = null;
    console.log('[App] Kamera gestoppt');
  }

  function onCaptureClick() {
    if (!currentProject) {
      alert('Es ist kein Projekt geöffnet.');
      return;
    }
    if (!camVideo || !camVideo.videoWidth || !camVideo.videoHeight) {
      alert('Kamera noch nicht bereit. Bitte kurz warten.');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = camVideo.videoWidth;
    canvas.height = camVideo.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(camVideo, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

    currentProject.frames.push(dataUrl);
    currentProject.updatedAt = new Date().toISOString();
    saveProjects();

    console.log('[App] Frame aufgenommen. Gesamt:', currentProject.frames.length);

    // Editor & Player updaten
    if (window.EditorTab && EditorTab.onProjectLoaded) {
      EditorTab.onProjectLoaded(currentProject);
    }
    if (window.PlayerTab && PlayerTab.onProjectLoaded) {
      PlayerTab.onProjectLoaded(currentProject);
    }
  }

  /* -----------------------------------------------------------------------
   * Projekte: Neu, Öffnen, Löschen
   * -------------------------------------------------------------------- */

  function startNewProjectFlow() {
    const defaultName = 'Projekt ' + (projects.length + 1);
    const name = prompt('Name für das neue Projekt:', defaultName) || defaultName;

    const project = {
      id: 'p-' + Date.now() + '-' + Math.random().toString(16).slice(2),
      name,
      frames: [],
      mode: currentMode,
      createdAt: new Date().toISOString()
    };

    projects.unshift(project);
    saveProjects();

    openProject(project);
  }

  function openProject(project) {
    currentProject = project;

    // Screens
    showScreen('project');
    // Kamera aktivieren
    startCamera();
    // Projekt an Tabs weiterreichen
    if (window.CameraTab && CameraTab.onProjectLoaded) {
      CameraTab.onProjectLoaded(currentProject);
    }
    if (window.EditorTab && EditorTab.onProjectLoaded) {
      EditorTab.onProjectLoaded(currentProject);
    }
    if (window.PlayerTab && PlayerTab.onProjectLoaded) {
      PlayerTab.onProjectLoaded(currentProject);
    }

    // Standard-Tab: Kamera
    showTab('camera');

    console.log('[App] Projekt geöffnet:', project.name);
  }

  function openProjectFromLibrary(projectId) {
    const project = findProjectById(projectId);
    if (!project) {
      alert('Projekt nicht gefunden.');
      return;
    }
    showScreen('project');
    openProject(project);
  }

  function deleteProject(projectId) {
    const idx = projects.findIndex(p => p.id === projectId);
    if (idx === -1) return;

    const proj = projects[idx];
    const ok = confirm(`Projekt "${proj.name}" wirklich löschen?`);
    if (!ok) return;

    projects.splice(idx, 1);
    saveProjects();

    if (currentProject && currentProject.id === projectId) {
      currentProject = null;
      // Falls wir gerade im Projekt-Screen sind → zurück nach Home
      showScreen('home');
      stopCamera();
    }

    console.log('[App] Projekt gelöscht:', proj.name);
  }

  /* -----------------------------------------------------------------------
   * Export / Import (gesamte Daten – JSON)
   * -------------------------------------------------------------------- */

  function exportAllData() {
    const payload = {
      version: 'tmm-0.5.0',
      projects: projects
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'toymovie-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log('[App] Daten exportiert (JSON).');
  }

  function importAllData(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data || !Array.isArray(data.projects)) {
          throw new Error('Ungültiges Format');
        }
        projects = data.projects;
        saveProjects();

        // Library updaten
        if (window.Library && Library.setProjects) {
          Library.setProjects(projects);
        }

        alert('Daten wurden importiert.');
        console.log('[App] Daten importiert:', projects.length, 'Projekte');
      } catch (e) {
        console.error(e);
        alert('Import fehlgeschlagen. Bitte gültige JSON-Datei wählen.');
      }
    };
    reader.readAsText(file);
  }

  /* -----------------------------------------------------------------------
   * Global für Debug
   * -------------------------------------------------------------------- */

  window.App = {
    startNewProjectFlow,
    showScreen,
    showTab,
    getProjects: () => projects,
    getCurrentProject: () => currentProject,
    exportAllData,
    importAllData
  };

})();
