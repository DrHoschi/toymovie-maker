/* ============================================================
 * ToyMovie Maker – App-Logik
 * Version: v0.4.0 (Light/Pro-Modus + Matrix-Startseite)
 *
 * Features:
 *  - Light/Pro Modus (global, per Startseite wählbar, persistent)
 *  - Theme-Umschaltung (Pink/Blau) über Settings
 *  - Sprache DE/EN (i18n)
 *  - Projektliste mit Spielzeug-Typ
 *  - Kamera + Frames + Ghosting-Overlay
 *  - Player/Editor light (Play/Pause, Scrub, FPS)
 *  - Export/Import aller Daten als JSON + Clear-All
 * ========================================================== */

(function () {
  'use strict';

  /* -------------------- Konstanten -------------------- */

  const STORAGE_KEY_PROJECTS = 'tmm_projects';
  const STORAGE_KEY_THEME = 'tmm_theme';
  const STORAGE_KEY_LANG = 'tmm_lang';
  const STORAGE_KEY_MODE = 'tmm_mode'; // 'light' | 'pro'

  const TOY_LABELS = {
    lego: '🧱 LEGO',
    playmobil: '🏰 Playmobil',
    barbie: '👧 Barbie'
  };

  /* i18n-Basistexte für DE/EN */
  const I18N = {
    de: {
      appTitle: 'ToyMovie Maker',
      heroTitle: 'ToyMovie Maker',
      heroSub: 'Stop-Motion mit LEGO, Playmobil & Barbie',
      heroText: 'Dieser Prototyp läuft im Browser und nutzt die Handy-Kamera.\nAuf dem Smartphone bitte im Hochformat testen.',
      // Home-Grid
      homeModeLightTitle: 'Light Version',
      homeModeLightDesc: 'Einfach & kinderfreundlich',
      homeModeProTitle: 'Pro Version',
      homeModeProDesc: 'Alle Werkzeuge für Profis',
      homeLibraryTitle: 'Bibliothek',
      homeLibraryDesc: 'Alle Projekte anzeigen',
      homeNewProjectTitle: 'Neues Projekt',
      homeNewProjectDesc: 'Neues Stop-Motion starten',
      homeSettingsTitle: 'Einstellungen',
      homeSettingsDesc: 'Sprache, Modus & Design',
      btnNewProject: '🎬 Neues Projekt starten',
      projectsHeading: 'Meine Projekte',
      projectsEmpty: 'Noch keine Projekte. Starte oben ein neues Stop-Motion-Projekt.',
      btnBackHome: '⬅︎ Zur Übersicht',
      btnCapture: '⭕ Foto aufnehmen',
      overlayCountLabel: 'Overlay-Bilder:',
      overlayAlphaLabel: 'Transparenz:',
      btnUndoFrame: '↩︎ Letztes Bild löschen',
      framesHeading: 'Aufgenommene Bilder',
      playerHeading: 'Vorschau / Player',
      playerNoFrame: 'Noch keine Bilder. Nimm zuerst Fotos auf.',
      btnPlayerPrev: '◀︎',
      btnPlayerNext: '▶︎',
      btnPlayerPlay: '▶︎ Abspielen',
      btnPlayerPause: '⏸ Pause',
      playerPositionLabel: 'Position:',
      playerFpsLabel: 'Geschwindigkeit (FPS):',
      btnSettingsBack: '⬅︎ Zurück',
      settingsHeading: 'Einstellungen',
      settingsAppHeading: 'App-Einstellungen',
      settingThemeLabel: 'Farbschema',
      settingLangLabel: 'Sprache',
      themePink: 'Pink (Standard)',
      themeBlue: 'Blau',
      langDe: 'Deutsch',
      langEn: 'English',
      settingsProjectHeading: 'Projekt-Einstellungen',
      settingsProjectInfo: 'Aktives Projekt:',
      settingsProjectNameLabel: 'Projektname',
      settingToyTypeLabel: 'Spielzeug-Typ',
      toyLego: '🧱 LEGO',
      toyPlaymobil: '🏰 Playmobil',
      toyBarbie: '👧 Barbie',
      settingsDataHeading: 'Daten',
      btnExportData: '⬇︎ Daten exportieren (Download)',
      btnImportData: '⬆︎ Daten importieren (JSON)',
      btnClearData: '🗑 Alle lokalen Daten löschen',
      footerText: 'drhoschi.github.io – ToyMovie Maker Prototyp',
      noActiveProject: 'Kein Projekt geöffnet.',
      confirmDeleteProject: 'Projekt "%NAME%" wirklich löschen?',
      confirmClearData: 'Wirklich alle lokalen Daten (Projekte & Einstellungen) löschen?',
      importError: 'Import fehlgeschlagen. Bitte gültige JSON-Datei wählen.',
      importOk: 'Daten wurden importiert.',
      cameraNotReady: 'Kamera noch nicht bereit. Bitte einen Moment warten.',
      cameraError: 'Kamera-Zugriff nicht möglich: ',
      newProjectPrompt: 'Name für das neue Projekt:'
    },
    en: {
      appTitle: 'ToyMovie Maker',
      heroTitle: 'ToyMovie Maker',
      heroSub: 'Stop-motion with LEGO, Playmobil & Barbie',
      heroText: 'This prototype runs in the browser and uses the phone camera.\nOn smartphones please test in portrait mode.',
      homeModeLightTitle: 'Light Version',
      homeModeLightDesc: 'Simple & kid-friendly',
      homeModeProTitle: 'Pro Version',
      homeModeProDesc: 'All tools for pros',
      homeLibraryTitle: 'Library',
      homeLibraryDesc: 'Show all projects',
      homeNewProjectTitle: 'New project',
      homeNewProjectDesc: 'Start a new stop-motion',
      homeSettingsTitle: 'Settings',
      homeSettingsDesc: 'Language, mode & design',
      btnNewProject: '🎬 Start new project',
      projectsHeading: 'My projects',
      projectsEmpty: 'No projects yet. Start a new stop-motion project above.',
      btnBackHome: '⬅︎ Back to list',
      btnCapture: '⭕ Capture photo',
      overlayCountLabel: 'Overlay images:',
      overlayAlphaLabel: 'Transparency:',
      btnUndoFrame: '↩︎ Delete last image',
      framesHeading: 'Captured images',
      playerHeading: 'Preview / Player',
      playerNoFrame: 'No images yet. Capture some frames first.',
      btnPlayerPrev: '◀︎',
      btnPlayerNext: '▶︎',
      btnPlayerPlay: '▶︎ Play',
      btnPlayerPause: '⏸ Pause',
      playerPositionLabel: 'Position:',
      playerFpsLabel: 'Speed (FPS):',
      btnSettingsBack: '⬅︎ Back',
      settingsHeading: 'Settings',
      settingsAppHeading: 'App settings',
      settingThemeLabel: 'Color theme',
      settingLangLabel: 'Language',
      themePink: 'Pink (default)',
      themeBlue: 'Blue',
      langDe: 'German',
      langEn: 'English',
      settingsProjectHeading: 'Project settings',
      settingsProjectInfo: 'Active project:',
      settingsProjectNameLabel: 'Project name',
      settingToyTypeLabel: 'Toy type',
      toyLego: '🧱 LEGO',
      toyPlaymobil: '🏰 Playmobil',
      toyBarbie: '👧 Barbie',
      settingsDataHeading: 'Data',
      btnExportData: '⬇︎ Export data (download)',
      btnImportData: '⬆︎ Import data (JSON)',
      btnClearData: '🗑 Delete all local data',
      footerText: 'drhoschi.github.io – ToyMovie Maker prototype',
      noActiveProject: 'No project currently open.',
      confirmDeleteProject: 'Really delete project "%NAME%"?',
      confirmClearData: 'Really delete all local data (projects & settings)?',
      importError: 'Import failed. Please select a valid JSON file.',
      importOk: 'Data imported successfully.',
      cameraNotReady: 'Camera not ready yet. Please wait a moment.',
      cameraError: 'Unable to access camera: ',
      newProjectPrompt: 'Name for the new project:'
    }
  };

  /* -------------------- State -------------------- */

  const state = {
    projects: [],
    currentProjectId: null,
    theme: 'pink',
    lang: 'de',
    mode: 'light', // 'light' oder 'pro'
    stream: null,
    overlayCount: 3,
    overlayAlpha: 0.5,
    activeScreen: 'home',
    prevScreenBeforeSettings: 'home',
    player: {
      index: 0,
      isPlaying: false,
      fps: 4,
      timerId: null
    }
  };

  /* -------------------- DOM-Elemente -------------------- */

  const els = {};

  function cacheDom() {
    // Screens
    els.screenHome = document.getElementById('screen-home');
    els.screenCamera = document.getElementById('screen-camera');
    els.screenSettings = document.getElementById('screen-settings');

    // Global
    els.btnOpenSettings = document.getElementById('btnOpenSettings');
    els.btnOpenSettingsCam = document.getElementById('btnOpenSettingsCam');

    // Home: Mode-Grid
    els.btnModeLight = document.getElementById('btnModeLight');
    els.btnModePro = document.getElementById('btnModePro');
    els.btnHomeLibrary = document.getElementById('btnHomeLibrary');
    els.btnHomeNewProjectTile = document.getElementById('btnHomeNewProjectTile');
    els.btnHomeSettings = document.getElementById('btnHomeSettings');

    // Hero / Projects
    els.heroTitle = document.getElementById('heroTitle');
    els.heroSub = document.getElementById('heroSub');
    els.heroText = document.getElementById('heroText');
    els.btnNewProject = document.getElementById('btnNewProject');
    els.projectList = document.getElementById('projectList');
    els.projectsEmptyHint = document.getElementById('projectsEmptyHint');
    els.projectsHeading = document.getElementById('projectsHeading');

    // Camera
    els.btnBackHome = document.getElementById('btnBackHome');
    els.currentProjectName = document.getElementById('currentProjectName');
    els.currentProjectToy = document.getElementById('currentProjectToy');
    els.currentFrameInfo = document.getElementById('currentFrameInfo');

    els.cameraVideo = document.getElementById('cameraVideo');
    els.overlayCanvas = document.getElementById('overlayCanvas');

    els.btnCapture = document.getElementById('btnCapture');
    els.btnUndoFrame = document.getElementById('btnUndoFrame');
    els.frameList = document.getElementById('frameList');

    els.overlayCount = document.getElementById('overlayCount');
    els.overlayCountLabel = document.getElementById('overlayCountLabel');
    els.overlayAlpha = document.getElementById('overlayAlpha');
    els.overlayAlphaLabel = document.getElementById('overlayAlphaLabel');

    // Player
    els.playerImage = document.getElementById('playerImage');
    els.playerNoFrameHint = document.getElementById('playerNoFrameHint');
    els.btnPlayerPrev = document.getElementById('btnPlayerPrev');
    els.btnPlayerPlayPause = document.getElementById('btnPlayerPlayPause');
    els.btnPlayerNext = document.getElementById('btnPlayerNext');
    els.playerPosition = document.getElementById('playerPosition');
    els.playerPositionLabel = document.getElementById('playerPositionLabel');
    els.playerFps = document.getElementById('playerFps');
    els.playerFpsLabel = document.getElementById('playerFpsLabel');

    // Settings
    els.btnSettingsBack = document.getElementById('btnSettingsBack');
    els.settingTheme = document.getElementById('settingTheme');
    els.settingLang = document.getElementById('settingLang');
    els.settingToyType = document.getElementById('settingToyType');
    els.settingProjectName = document.getElementById('settingProjectName');
    els.settingsProjectInfo = document.getElementById('settingsProjectInfo');
    els.btnExportData = document.getElementById('btnExportData');
    els.btnImportData = document.getElementById('btnImportData');
    els.inputImportData = document.getElementById('inputImportData');
    els.btnClearData = document.getElementById('btnClearData');

    // Footer / Topbar (für i18n)
    els.appTitle = document.getElementById('appTitle');
    els.footerText = document.getElementById('footerText');
  }

  /* -------------------- Helper: i18n -------------------- */

  function t(key) {
    const dict = I18N[state.lang] || I18N.de;
    return dict[key] || key;
  }

  function applyLanguage() {
    const dict = I18N[state.lang] || I18N.de;

    function setText(id, key) {
      const el = document.getElementById(id);
      if (el && dict[key]) {
        el.textContent = dict[key];
      }
    }

    // Grundtexte
    setText('appTitle', 'appTitle');
    setText('heroTitle', 'heroTitle');
    setText('heroSub', 'heroSub');

    // Hero-Text mit Zeilenumbruch
    const heroTextEl = document.getElementById('heroText');
    if (heroTextEl) {
      heroTextEl.innerHTML = (dict.heroText || '').replace(/\n/g, '<br>');
    }

    // Home-Grid
    setText('homeModeLightTitle', 'homeModeLightTitle');
    setText('homeModeLightDesc', 'homeModeLightDesc');
    setText('homeModeProTitle', 'homeModeProTitle');
    setText('homeModeProDesc', 'homeModeProDesc');
    setText('homeLibraryTitle', 'homeLibraryTitle');
    setText('homeLibraryDesc', 'homeLibraryDesc');
    setText('homeNewProjectTitle', 'homeNewProjectTitle');
    setText('homeNewProjectDesc', 'homeNewProjectDesc');
    setText('homeSettingsTitle', 'homeSettingsTitle');
    setText('homeSettingsDesc', 'homeSettingsDesc');

    // Buttons / Labels
    setText('btnNewProject', 'btnNewProject');
    setText('projectsHeading', 'projectsHeading');
    setText('projectsEmptyHint', 'projectsEmpty');

    setText('btnBackHome', 'btnBackHome');
    setText('btnCapture', 'btnCapture');
    setText('btnUndoFrame', 'btnUndoFrame');
    setText('framesHeading', 'framesHeading');
    setText('playerHeading', 'playerHeading');
    setText('playerNoFrameHint', 'playerNoFrame');
    setText('playerPositionLabel', 'playerPositionLabel');
    setText('playerFpsLabel', 'playerFpsLabel');
    setText('btnSettingsBack', 'btnSettingsBack');
    setText('footerText', 'footerText');
    setText('settingsProjectInfo', 'settingsProjectInfo');

    // Play/Pause-Button
    if (els.btnPlayerPlayPause) {
      els.btnPlayerPlayPause.textContent = state.player.isPlaying
        ? dict.btnPlayerPause
        : dict.btnPlayerPlay;
    }
    if (els.btnPlayerPrev) els.btnPlayerPrev.textContent = dict.btnPlayerPrev;
    if (els.btnPlayerNext) els.btnPlayerNext.textContent = dict.btnPlayerNext;

    // Label-Texte
    const overlayCountLabelText = document.querySelector('[data-i18n="overlayCountLabel"]');
    if (overlayCountLabelText) overlayCountLabelText.textContent = dict.overlayCountLabel;
    const overlayAlphaLabelText = document.querySelector('[data-i18n="overlayAlphaLabel"]');
    if (overlayAlphaLabelText) overlayAlphaLabelText.textContent = dict.overlayAlphaLabel;

    const playerPosLabelText = document.querySelector('[data-i18n="playerPositionLabel"]');
    if (playerPosLabelText) playerPosLabelText.textContent = dict.playerPositionLabel;
    const playerFpsLabelText = document.querySelector('[data-i18n="playerFpsLabel"]');
    if (playerFpsLabelText) playerFpsLabelText.textContent = dict.playerFpsLabel;

    // Settings-Überschriften & Labels
    const map = [
      ['settingsHeading', 'settingsHeading'],
      ['settingsAppHeading', 'settingsAppHeading'],
      ['settingThemeLabel', 'settingThemeLabel'],
      ['settingLangLabel', 'settingLangLabel'],
      ['settingsProjectHeading', 'settingsProjectHeading'],
      ['settingsProjectNameLabel', 'settingsProjectNameLabel'],
      ['settingToyTypeLabel', 'settingToyTypeLabel'],
      ['settingsDataHeading', 'settingsDataHeading'],
      ['btnExportData', 'btnExportData'],
      ['btnImportData', 'btnImportData'],
      ['btnClearData', 'btnClearData']
    ];
    map.forEach(([id, key]) => setText(id, key));

    // Optionen in Selects
    if (els.settingTheme) {
      els.settingTheme.options[0].textContent = dict.themePink;
      els.settingTheme.options[1].textContent = dict.themeBlue;
    }
    if (els.settingLang) {
      els.settingLang.options[0].textContent = dict.langDe;
      els.settingLang.options[1].textContent = dict.langEn;
    }
    if (els.settingToyType) {
      els.settingToyType.options[0].textContent = dict.toyLego;
      els.settingToyType.options[1].textContent = dict.toyPlaymobil;
      els.settingToyType.options[2].textContent = dict.toyBarbie;
    }
  }

  /* -------------------- Helper: Theme & Mode -------------------- */

  function applyTheme() {
    const body = document.body;
    body.classList.remove('theme-pink', 'theme-blue');
    body.classList.add(state.theme === 'blue' ? 'theme-blue' : 'theme-pink');

    if (els.settingTheme) {
      els.settingTheme.value = state.theme;
    }
  }

  function applyMode() {
    const body = document.body;
    body.classList.remove('mode-light', 'mode-pro');
    body.classList.add(state.mode === 'pro' ? 'mode-pro' : 'mode-light');

    // Active-Highlight auf Startseiten-Karten
    if (els.btnModeLight && els.btnModePro) {
      els.btnModeLight.classList.toggle('home-card--active', state.mode === 'light');
      els.btnModePro.classList.toggle('home-card--active', state.mode === 'pro');
    }
  }

  /* -------------------- Helper: Storage -------------------- */

  function loadProjects() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PROJECTS);
      state.projects = raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn('Konnte Projekte nicht laden:', e);
      state.projects = [];
    }
  }

  function saveProjects() {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(state.projects));
    } catch (e) {
      console.warn('Konnte Projekte nicht speichern:', e);
    }
  }

  function loadSettings() {
    const theme = localStorage.getItem(STORAGE_KEY_THEME);
    state.theme = theme === 'blue' ? 'blue' : 'pink';

    const lang = localStorage.getItem(STORAGE_KEY_LANG);
    state.lang = lang === 'en' ? 'en' : 'de';

    const mode = localStorage.getItem(STORAGE_KEY_MODE);
    state.mode = mode === 'pro' ? 'pro' : 'light';
  }

  function saveTheme() {
    try {
      localStorage.setItem(STORAGE_KEY_THEME, state.theme);
    } catch {}
  }

  function saveLang() {
    try {
      localStorage.setItem(STORAGE_KEY_LANG, state.lang);
    } catch {}
  }

  function saveMode() {
    try {
      localStorage.setItem(STORAGE_KEY_MODE, state.mode);
    } catch {}
  }

  function findProject(id) {
    return state.projects.find(p => p.id === id) || null;
  }

  function createProject(name) {
    const now = new Date().toISOString();
    const project = {
      id: 'p-' + Date.now() + '-' + Math.random().toString(16).slice(2),
      name: name || 'Neues Projekt',
      createdAt: now,
      updatedAt: now,
      toyType: 'lego', // default
      frames: []
    };
    state.projects.unshift(project);
    saveProjects();
    return project;
  }

  function deleteProject(id) {
    state.projects = state.projects.filter(p => p.id !== id);
    saveProjects();
  }

  /* -------------------- UI: Screens -------------------- */

  function updateScreenVisibility() {
    els.screenHome.classList.toggle('screen--active', state.activeScreen === 'home');
    els.screenCamera.classList.toggle('screen--active', state.activeScreen === 'camera');
    els.screenSettings.classList.toggle('screen--active', state.activeScreen === 'settings');
  }

  function showScreen(name) {
    state.activeScreen = name;
    updateScreenVisibility();
  }

  /* -------------------- UI: Projektliste -------------------- */

  function renderProjects() {
    const list = state.projects;
    els.projectList.innerHTML = '';

    if (!list.length) {
      els.projectsEmptyHint.style.display = 'block';
      return;
    }

    els.projectsEmptyHint.style.display = 'block';

    list.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.dataset.id = project.id;

      const meta = document.createElement('div');
      meta.className = 'project-meta';

      const nameEl = document.createElement('div');
      nameEl.className = 'project-name';
      nameEl.textContent = project.name;

      const infoEl = document.createElement('div');
      infoEl.className = 'project-info';
      const frameCount = project.frames.length;
      const toyLabel = TOY_LABELS[project.toyType] || '';
      infoEl.textContent =
        `${toyLabel ? toyLabel + ' · ' : ''}${frameCount} Bild${frameCount === 1 ? '' : 'er'}`;

      meta.appendChild(nameEl);
      meta.appendChild(infoEl);

      const actions = document.createElement('div');
      actions.className = 'project-actions';

      const openBtn = document.createElement('button');
      openBtn.className = 'btn-secondary';
      openBtn.type = 'button';
      openBtn.textContent = state.lang === 'en' ? 'Open' : 'Öffnen';
      openBtn.addEventListener('click', () => {
        openProject(project.id);
      });

      const delBtn = document.createElement('button');
      delBtn.className = 'btn-icon';
      delBtn.type = 'button';
      delBtn.textContent = '🗑';
      delBtn.addEventListener('click', () => {
        const msg = t('confirmDeleteProject').replace('%NAME%', project.name);
        if (confirm(msg)) {
          if (state.currentProjectId === project.id) {
            state.currentProjectId = null;
          }
          deleteProject(project.id);
          renderProjects();
        }
      });

      actions.appendChild(openBtn);
      actions.appendChild(delBtn);

      card.appendChild(meta);
      card.appendChild(actions);

      els.projectList.appendChild(card);
    });

    if (state.projects.length) {
      els.projectsEmptyHint.style.display = 'none';
    }
  }

  /* -------------------- Kamera / Frames -------------------- */

  async function startCamera() {
    if (state.stream) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      state.stream = stream;
      els.cameraVideo.srcObject = stream;
    } catch (err) {
      alert(t('cameraError') + err.message);
    }
  }

  function stopCamera() {
    if (!state.stream) return;
    state.stream.getTracks().forEach(t => t.stop());
    state.stream = null;
    els.cameraVideo.srcObject = null;
  }

  function getCurrentProject() {
    return findProject(state.currentProjectId);
  }

  function updateFrameInfo() {
    const project = getCurrentProject();
    if (!project) {
      els.currentFrameInfo.textContent = '0';
      return;
    }
    const count = project.frames.length;
    const label = state.lang === 'en'
      ? `${count} frame${count === 1 ? '' : 's'}`
      : `${count} Bild${count === 1 ? '' : 'er'}`;
    els.currentFrameInfo.textContent = label;
  }

  function renderFrameThumbnails() {
    const project = getCurrentProject();
    els.frameList.innerHTML = '';
    if (!project || !project.frames.length) return;

    project.frames.forEach((dataUrl, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'frame-thumb';
      wrapper.dataset.index = String(index);

      const img = document.createElement('img');
      img.src = dataUrl;

      const label = document.createElement('span');
      label.textContent = index + 1;

      wrapper.appendChild(img);
      wrapper.appendChild(label);

      wrapper.addEventListener('click', () => {
        selectPlayerFrame(index);
      });

      els.frameList.appendChild(wrapper);
    });
  }

  function captureFrame() {
    const project = getCurrentProject();
    if (!project) return;

    const video = els.cameraVideo;
    if (!video.videoWidth || !video.videoHeight) {
      alert(t('cameraNotReady'));
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    project.frames.push(dataUrl);
    project.updatedAt = new Date().toISOString();
    saveProjects();

    updateFrameInfo();
    renderFrameThumbnails();
    updateOverlayFromProject();
    updatePlayerFromProject(true);
  }

  function undoLastFrame() {
    const project = getCurrentProject();
    if (!project || !project.frames.length) return;
    project.frames.pop();
    project.updatedAt = new Date().toISOString();
    saveProjects();

    updateFrameInfo();
    renderFrameThumbnails();
    updateOverlayFromProject();
    updatePlayerFromProject(false);
  }

  function updateOverlayFromProject() {
    const project = getCurrentProject();
    const frames = project ? project.frames : [];
    const count = Math.min(state.overlayCount, frames.length);
    const lastFrames = frames.slice(-count);

    const canvas = els.overlayCanvas;
    const video = els.cameraVideo;
    const ctx = canvas.getContext('2d');

    const width = video.clientWidth || 300;
    const height = video.clientHeight || 400;
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    if (!count) return;

    const alphaPerImage = state.overlayAlpha / count;

    lastFrames.forEach(src => {
      const img = new Image();
      img.onload = () => {
        ctx.globalAlpha = alphaPerImage;
        ctx.drawImage(img, 0, 0, width, height);
      };
      img.src = src;
    });
  }

  /* -------------------- Player / Editor -------------------- */

  function stopPlayerTimer() {
    if (state.player.timerId) {
      clearInterval(state.player.timerId);
      state.player.timerId = null;
    }
  }

  function updatePlayerPlayButtonLabel() {
    if (!els.btnPlayerPlayPause) return;
    els.btnPlayerPlayPause.textContent = state.player.isPlaying
      ? t('btnPlayerPause')
      : t('btnPlayerPlay');
  }

  function updatePlayerFromProject(jumpToLast) {
    const project = getCurrentProject();
    const frames = project ? project.frames : [];
    const count = frames.length;

    els.playerPosition.max = String(Math.max(count - 1, 0));
    els.playerPosition.value = String(
      Math.min(state.player.index, Math.max(count - 1, 0))
    );
    els.playerPositionLabel.textContent = `${count ? state.player.index + 1 : 0} / ${count}`;

    if (!count) {
      state.player.index = 0;
      els.playerImage.style.display = 'none';
      els.playerNoFrameHint.style.display = 'block';
      stopPlayerTimer();
      state.player.isPlaying = false;
      updatePlayerPlayButtonLabel();
      return;
    }

    if (jumpToLast) {
      state.player.index = count - 1;
      els.playerPosition.value = String(state.player.index);
      els.playerPositionLabel.textContent = `${state.player.index + 1} / ${count}`;
    }

    els.playerNoFrameHint.style.display = 'none';
    els.playerImage.style.display = 'block';
    els.playerImage.src = frames[state.player.index];
  }

  function selectPlayerFrame(index) {
    const project = getCurrentProject();
    if (!project || !project.frames.length) return;
    state.player.index = Math.max(0, Math.min(index, project.frames.length - 1));
    state.player.isPlaying = false;
    stopPlayerTimer();
    updatePlayerPlayButtonLabel();
    updatePlayerFromProject(false);
  }

  function playerStep(delta) {
    const project = getCurrentProject();
    if (!project || !project.frames.length) return;
    const count = project.frames.length;
    state.player.index = (state.player.index + delta + count) % count;
    updatePlayerFromProject(false);
  }

  function playerPlay() {
    const project = getCurrentProject();
    if (!project || !project.frames.length) return;
    state.player.isPlaying = true;
    updatePlayerPlayButtonLabel();

    stopPlayerTimer();
    const intervalMs = 1000 / state.player.fps;
    state.player.timerId = setInterval(() => {
      playerStep(1);
    }, intervalMs);
  }

  function playerPause() {
    state.player.isPlaying = false;
    stopPlayerTimer();
    updatePlayerPlayButtonLabel();
  }

  /* -------------------- Projekt öffnen / Settings-View -------------------- */

  function openProject(id) {
    state.currentProjectId = id;
    const project = getCurrentProject();
    if (!project) return;

    els.currentProjectName.textContent = project.name;
    els.currentProjectToy.textContent = TOY_LABELS[project.toyType] || '';
    updateFrameInfo();
    renderFrameThumbnails();
    showScreen('camera');
    startCamera().then(() => {
      updateOverlayFromProject();
      updatePlayerFromProject(true);
    });
    updateSettingsView();
  }

  function openNewProjectFlow() {
    const defaultName = state.lang === 'en'
      ? 'Project ' + (state.projects.length + 1)
      : 'Projekt ' + (state.projects.length + 1);
    const name = prompt(t('newProjectPrompt'), defaultName) || defaultName;
    const project = createProject(name);
    renderProjects();
    openProject(project.id);
  }

  function updateSettingsView() {
    const project = getCurrentProject();
    if (!project) {
      els.settingProjectName.textContent = t('noActiveProject');
      els.settingsProjectInfo.textContent = t('settingsProjectInfo') + ' ' + t('noActiveProject');
      els.settingToyType.disabled = true;
    } else {
      els.settingProjectName.textContent = project.name;
      els.settingsProjectInfo.textContent = t('settingsProjectInfo') + ' ' + project.name;
      els.settingToyType.disabled = false;
      els.settingToyType.value = project.toyType || 'lego';
    }

    // Theme + Sprache-Select korrekt setzen
    if (els.settingTheme) els.settingTheme.value = state.theme;
    if (els.settingLang) els.settingLang.value = state.lang;
  }

  /* -------------------- Export / Import / Clear -------------------- */

  function exportData() {
    const payload = {
      version: 'tmm-0.4.0',
      theme: state.theme,
      lang: state.lang,
      mode: state.mode,
      projects: state.projects
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'toymovie-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function importData(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data || !Array.isArray(data.projects)) {
          throw new Error('Invalid format');
        }
        state.projects = data.projects;
        state.theme = data.theme === 'blue' ? 'blue' : 'pink';
        state.lang = data.lang === 'en' ? 'en' : 'de';
        state.mode = data.mode === 'pro' ? 'pro' : 'light';
        saveProjects();
        saveTheme();
        saveLang();
        saveMode();
        applyTheme();
        applyMode();
        applyLanguage();
        renderProjects();
        updateSettingsView();
        alert(t('importOk'));
      } catch (e) {
        console.error(e);
        alert(t('importError'));
      }
    };
    reader.readAsText(file);
  }

  function clearAllData() {
    if (!confirm(t('confirmClearData'))) return;
    try {
      localStorage.removeItem(STORAGE_KEY_PROJECTS);
      localStorage.removeItem(STORAGE_KEY_THEME);
      localStorage.removeItem(STORAGE_KEY_LANG);
      localStorage.removeItem(STORAGE_KEY_MODE);
    } catch {}
    state.projects = [];
    state.currentProjectId = null;
    state.theme = 'pink';
    state.lang = 'de';
    state.mode = 'light';
    applyTheme();
    applyMode();
    applyLanguage();
    renderProjects();
    updateSettingsView();
    stopCamera();
    showScreen('home');
  }

  /* -------------------- Events binden -------------------- */

  function bindEvents() {
    // Global Settings öffnen
    els.btnOpenSettings.addEventListener('click', () => {
      state.prevScreenBeforeSettings = state.activeScreen;
      showScreen('settings');
      updateSettingsView();
    });
    els.btnOpenSettingsCam.addEventListener('click', () => {
      state.prevScreenBeforeSettings = state.activeScreen;
      showScreen('settings');
      updateSettingsView();
    });

    // Settings zurück
    els.btnSettingsBack.addEventListener('click', () => {
      showScreen(state.prevScreenBeforeSettings || 'home');
    });

    // Home: Mode-Karten
    els.btnModeLight.addEventListener('click', () => {
      state.mode = 'light';
      saveMode();
      applyMode();
    });

    els.btnModePro.addEventListener('click', () => {
      state.mode = 'pro';
      saveMode();
      applyMode();
    });

    // Home: Kacheln
    els.btnHomeLibrary.addEventListener('click', () => {
      // Zu Projektliste scrollen
      if (els.projectsHeading) {
        els.projectsHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    els.btnHomeNewProjectTile.addEventListener('click', openNewProjectFlow);
    els.btnNewProject.addEventListener('click', openNewProjectFlow);

    els.btnHomeSettings.addEventListener('click', () => {
      state.prevScreenBeforeSettings = 'home';
      showScreen('settings');
      updateSettingsView();
    });

    // Kamera
    els.btnBackHome.addEventListener('click', () => {
      stopCamera();
      showScreen('home');
      state.currentProjectId = null;
      renderProjects();
      updateSettingsView();
    });

    els.btnCapture.addEventListener('click', captureFrame);
    els.btnUndoFrame.addEventListener('click', undoLastFrame);

    els.overlayCount.addEventListener('input', () => {
      state.overlayCount = parseInt(els.overlayCount.value, 10) || 1;
      els.overlayCountLabel.textContent = String(state.overlayCount);
      updateOverlayFromProject();
    });

    els.overlayAlpha.addEventListener('input', () => {
      state.overlayAlpha = parseFloat(els.overlayAlpha.value) || 0;
      els.overlayAlphaLabel.textContent = state.overlayAlpha.toFixed(2);
      updateOverlayFromProject();
    });

    window.addEventListener('resize', () => {
      updateOverlayFromProject();
    });

    // Player
    els.btnPlayerPrev.addEventListener('click', () => {
      playerPause();
      playerStep(-1);
    });

    els.btnPlayerNext.addEventListener('click', () => {
      playerPause();
      playerStep(1);
    });

    els.btnPlayerPlayPause.addEventListener('click', () => {
      if (state.player.isPlaying) {
        playerPause();
      } else {
        playerPlay();
      }
    });

    els.playerPosition.addEventListener('input', () => {
      const project = getCurrentProject();
      if (!project || !project.frames.length) return;
      state.player.index = parseInt(els.playerPosition.value, 10) || 0;
      state.player.index = Math.max(0, Math.min(state.player.index, project.frames.length - 1));
      playerPause();
      updatePlayerFromProject(false);
    });

    els.playerFps.addEventListener('input', () => {
      state.player.fps = parseInt(els.playerFps.value, 10) || 4;
      els.playerFpsLabel.textContent = String(state.player.fps);
      if (state.player.isPlaying) {
        playerPause();
        playerPlay();
      }
    });

    // Settings
    els.settingTheme.addEventListener('change', () => {
      state.theme = els.settingTheme.value === 'blue' ? 'blue' : 'pink';
      saveTheme();
      applyTheme();
    });

    els.settingLang.addEventListener('change', () => {
      state.lang = els.settingLang.value === 'en' ? 'en' : 'de';
      saveLang();
      applyLanguage();
      renderProjects(); // Labels "Open/Öffnen" etc.
      updateSettingsView();
    });

    els.settingToyType.addEventListener('change', () => {
      const project = getCurrentProject();
      if (!project) return;
      project.toyType = els.settingToyType.value || 'lego';
      project.updatedAt = new Date().toISOString();
      saveProjects();
      els.currentProjectToy.textContent = TOY_LABELS[project.toyType] || '';
      renderProjects();
    });

    els.btnExportData.addEventListener('click', exportData);

    els.btnImportData.addEventListener('click', () => {
      els.inputImportData.click();
    });

    els.inputImportData.addEventListener('change', () => {
      const file = els.inputImportData.files[0];
      if (file) {
        importData(file);
        els.inputImportData.value = '';
      }
    });

    els.btnClearData.addEventListener('click', clearAllData);
  }

  /* -------------------- Init -------------------- */

  function init() {
    cacheDom();
    loadSettings();
    loadProjects();
    applyTheme();
    applyMode();
    applyLanguage();
    renderProjects();
    updateSettingsView();

    // Player-Defaults
    els.overlayCountLabel.textContent = String(state.overlayCount);
    els.overlayAlphaLabel.textContent = state.overlayAlpha.toFixed(2);
    els.playerFpsLabel.textContent = String(state.player.fps);

    bindEvents();
    updateScreenVisibility();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
