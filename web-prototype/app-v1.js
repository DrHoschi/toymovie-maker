/* ============================================================
 * ToyMovie Maker – App-Logik
 * Version: v0.2.0
 *
 * Features:
 *  - Theme-Umschaltung Pink / Blau (persistiert in localStorage)
 *  - Projektliste (Workspace) mit mehreren Projekten
 *  - Kamera-Ansicht mit Bildsequenz pro Projekt (Frames)
 *  - Overlay-Ghosting der letzten N Frames
 * ========================================================== */

(function () {
  'use strict';

  /* -------------------- Konstanten -------------------- */

  const STORAGE_KEY_PROJECTS = 'tmm_projects';
  const STORAGE_KEY_THEME = 'tmm_theme';

  /* -------------------- State -------------------- */

  const state = {
    projects: [],
    currentProjectId: null,
    stream: null,
    overlayCount: 3,
    overlayAlpha: 0.5
  };

  /* -------------------- DOM-Elemente -------------------- */

  const els = {};

  function cacheDom() {
    els.screenHome = document.getElementById('screen-home');
    els.screenCamera = document.getElementById('screen-camera');

    els.themeToggle = document.getElementById('themeToggle');

    els.btnNewProject = document.getElementById('btnNewProject');
    els.projectList = document.getElementById('projectList');
    els.projectsEmptyHint = document.getElementById('projectsEmptyHint');

    els.btnBackHome = document.getElementById('btnBackHome');
    els.currentProjectName = document.getElementById('currentProjectName');
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

  /* -------------------- Helper: Theme -------------------- */

  function loadTheme() {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    const body = document.body;
    if (saved === 'blue') {
      body.classList.remove('theme-pink');
      body.classList.add('theme-blue');
      els.themeToggle.textContent = '🎨 Blau';
    } else {
      body.classList.remove('theme-blue');
      body.classList.add('theme-pink');
      els.themeToggle.textContent = '🎨 Pink';
    }
  }

  function toggleTheme() {
    const body = document.body;
    const isPink = body.classList.contains('theme-pink');
    if (isPink) {
      body.classList.remove('theme-pink');
      body.classList.add('theme-blue');
      els.themeToggle.textContent = '🎨 Blau';
      localStorage.setItem(STORAGE_KEY_THEME, 'blue');
    } else {
      body.classList.remove('theme-blue');
      body.classList.add('theme-pink');
      els.themeToggle.textContent = '🎨 Pink';
      localStorage.setItem(STORAGE_KEY_THEME, 'pink');
    }
  }

  /* -------------------- UI: Screens -------------------- */

  function showScreen(name) {
    if (name === 'home') {
      els.screenHome.classList.add('screen--active');
      els.screenCamera.classList.remove('screen--active');
    } else {
      els.screenHome.classList.remove('screen--active');
      els.screenCamera.classList.add('screen--active');
    }
  }

  /* -------------------- UI: Projektliste -------------------- */

  function renderProjects() {
    const list = state.projects;
    els.projectList.innerHTML = '';

    if (!list.length) {
      els.projectsEmptyHint.style.display = 'block';
      return;
    }

    els.projectsEmptyHint.style.display = 'none';

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
      infoEl.textContent = `${frameCount} Bild${frameCount === 1 ? '' : 'er'}`;

      meta.appendChild(nameEl);
      meta.appendChild(infoEl);

      const actions = document.createElement('div');
      actions.className = 'project-actions';

      const openBtn = document.createElement('button');
      openBtn.className = 'btn-secondary';
      openBtn.type = 'button';
      openBtn.textContent = 'Öffnen';
      openBtn.addEventListener('click', () => {
        openProject(project.id);
      });

      const delBtn = document.createElement('button');
      delBtn.className = 'btn-icon';
      delBtn.type = 'button';
      delBtn.textContent = '🗑';
      delBtn.addEventListener('click', () => {
        if (confirm(`Projekt "${project.name}" wirklich löschen?`)) {
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
  }

  /* -------------------- Kamera / Frames -------------------- */

  async function startCamera() {
    if (state.stream) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment'
        },
        audio: false
      });
      state.stream = stream;
      els.cameraVideo.srcObject = stream;
    } catch (err) {
      alert('Kamera-Zugriff nicht möglich: ' + err.message);
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
      els.currentFrameInfo.textContent = '0 Bilder';
      return;
    }
    const count = project.frames.length;
    els.currentFrameInfo.textContent = `${count} Bild${count === 1 ? '' : 'er'}`;
  }

  function renderFrameThumbnails() {
    const project = getCurrentProject();
    els.frameList.innerHTML = '';
    if (!project || !project.frames.length) return;

    project.frames.forEach((dataUrl, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'frame-thumb';

      const img = document.createElement('img');
      img.src = dataUrl;

      const label = document.createElement('span');
      label.textContent = index + 1;

      wrapper.appendChild(img);
      wrapper.appendChild(label);
      els.frameList.appendChild(wrapper);
    });
  }

  function captureFrame() {
    const project = getCurrentProject();
    if (!project) return;

    const video = els.cameraVideo;
    if (!video.videoWidth || !video.videoHeight) {
      alert('Kamera noch nicht bereit. Bitte einen Moment warten.');
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
  }

  function updateOverlayFromProject() {
    const project = getCurrentProject();
    const frames = project ? project.frames : [];
    const count = Math.min(state.overlayCount, frames.length);
    const lastFrames = frames.slice(-count); // letzte N Frames

    const canvas = els.overlayCanvas;
    const video = els.cameraVideo;
    const ctx = canvas.getContext('2d');

    // Canvas auf Video-Größe anpassen
    const width = video.clientWidth || 300;
    const height = video.clientHeight || 400;
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    if (!count) return;

    // Jedes Bild halbtransparent übereinander zeichnen
    const alphaPerImage = state.overlayAlpha / count;

    let loaded = 0;
    lastFrames.forEach(src => {
      const img = new Image();
      img.onload = () => {
        ctx.globalAlpha = alphaPerImage;
        ctx.drawImage(img, 0, 0, width, height);
        loaded++;
      };
      img.src = src;
    });
  }

  /* -------------------- Projekt öffnen / schließen -------------------- */

  function openProject(id) {
    state.currentProjectId = id;
    const project = getCurrentProject();
    if (!project) return;

    els.currentProjectName.textContent = project.name || 'ToyMovie Maker – Kamera';
    updateFrameInfo();
    renderFrameThumbnails();
    showScreen('camera');
    startCamera().then(() => {
      updateOverlayFromProject();
    });
  }

  function openNewProjectFlow() {
    const defaultName = 'Projekt ' + (state.projects.length + 1);
    const name = prompt('Name für das neue Projekt:', defaultName) || defaultName;
    const project = createProject(name);
    renderProjects();
    openProject(project.id);
  }

  /* -------------------- Events binden -------------------- */

  function bindEvents() {
    els.themeToggle.addEventListener('click', toggleTheme);
    els.btnNewProject.addEventListener('click', openNewProjectFlow);

    els.btnBackHome.addEventListener('click', () => {
      stopCamera();
      showScreen('home');
      state.currentProjectId = null;
      renderProjects();
    });

    els.btnCapture.addEventListener('click', captureFrame);
    els.btnUndoFrame.addEventListener('click', undoLastFrame);

    // Slider Overlay-Anzahl
    els.overlayCount.addEventListener('input', () => {
      state.overlayCount = parseInt(els.overlayCount.value, 10) || 1;
      els.overlayCountLabel.textContent = String(state.overlayCount);
      updateOverlayFromProject();
    });

    // Slider Transparenz
    els.overlayAlpha.addEventListener('input', () => {
      state.overlayAlpha = parseFloat(els.overlayAlpha.value) || 0;
      els.overlayAlphaLabel.textContent = state.overlayAlpha.toFixed(2);
      updateOverlayFromProject();
    });

    // Bei Größenänderung neu zeichnen (Rotation etc.)
    window.addEventListener('resize', () => {
      updateOverlayFromProject();
    });
  }

  /* -------------------- Init -------------------- */

  function init() {
    cacheDom();
    loadTheme();
    loadProjects();
    renderProjects();
    bindEvents();

    // Labels initial setzen
    els.overlayCountLabel.textContent = String(state.overlayCount);
    els.overlayAlphaLabel.textContent = state.overlayAlpha.toFixed(2);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
