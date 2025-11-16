/* ============================================================================
 * Datei : app.js
 * Zweck : Zentrale App-Logik – Startscreen + Tabs + Projekte + Kamera
 * Version: v1.2 final
 *
 * Features:
 *  - Startscreen mit Light/Pro-Auswahl, Neues Projekt, Bibliothek, Settings
 *  - Projekt-Screen mit Tabs (Kamera / Editor / Player)
 *  - Kamera-Start über getUserMedia
 *  - Foto aufnehmen → Frame im Projekt speichern
 *  - PlayerTab aktualisieren, damit man die Bilder anschauen kann
 * ============================================================================ */

(function () {
  "use strict";

  /* -------------------------------------------------------------------------
   * Globale Variablen / Referenzen
   * ---------------------------------------------------------------------- */

  // Screens
  let screenHome;
  let screenProject;

  // Buttons Home
  let btnHomeLight;
  let btnHomePro;
  let btnHomeNewProject;
  let btnHomeLibrary;
  let btnHomeSettings;

  // Tabs / Tab-Buttons
  const TABS = {
    camera: "tab-camera",
    editor: "tab-editor",
    player: "tab-player",
  };

  let btnTabCamera;
  let btnTabEditor;
  let btnTabPlayer;
  let btnBackHome;

  // Kamera-Elemente
  let camVideo;
  let camOverlay;
  let btnCamCapture;

  // Zustand
  let currentProject = null;
  let currentTab = null;
  let currentMode = "light"; // "light" oder "pro"

  // Kamera-Stream
  let cameraStream = null;

  /* -------------------------------------------------------------------------
   * Initialisierung nach DOM-Load
   * ---------------------------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", () => {
    cacheDom();
    bindHomeEvents();
    bindTabEvents();
    bindCameraEvents();

    // Externe Module initialisieren (falls vorhanden)
    if (window.CameraTab && typeof CameraTab.init === "function") {
      CameraTab.init();
    }
    if (window.EditorTab && typeof EditorTab.init === "function") {
      EditorTab.init();
    }
    if (window.PlayerTab && typeof PlayerTab.init === "function") {
      PlayerTab.init();
    }

    console.log("[App] Initialisierung abgeschlossen – Startscreen aktiv");
  });

  /* -------------------------------------------------------------------------
   * DOM-Caching
   * ---------------------------------------------------------------------- */

  function cacheDom() {
    // Screens
    screenHome = document.getElementById("screen-home");
    screenProject = document.getElementById("screen-project");

    // Home-Buttons
    btnHomeLight = document.getElementById("home_light");
    btnHomePro = document.getElementById("home_pro");
    btnHomeNewProject = document.getElementById("home_newProject");
    btnHomeLibrary = document.getElementById("home_library");
    btnHomeSettings = document.getElementById("home_settings");

    // Tab-Buttons
    btnTabCamera = document.getElementById("btn_tab_camera");
    btnTabEditor = document.getElementById("btn_tab_editor");
    btnTabPlayer = document.getElementById("btn_tab_player");
    btnBackHome = document.getElementById("btn_back_home");

    // Kamera
    camVideo = document.getElementById("cam_video");
    camOverlay = document.getElementById("cam_overlay");
    btnCamCapture = document.getElementById("cam_capture");
  }

  /* -------------------------------------------------------------------------
   * Event-Bindings – Home-Screen
   * ---------------------------------------------------------------------- */

  function bindHomeEvents() {
    if (btnHomeLight) {
      btnHomeLight.addEventListener("click", () => {
        currentMode = "light";
        console.log("[App] Light-Version ausgewählt");
        // Wenn du später Settings.js wieder nutzen willst:
        if (window.AppSettings && AppSettings.saveMode) {
          AppSettings.saveMode("light");
        }
      });
    }

    if (btnHomePro) {
      btnHomePro.addEventListener("click", () => {
        currentMode = "pro";
        console.log("[App] Pro-Version ausgewählt");
        if (window.AppSettings && AppSettings.saveMode) {
          AppSettings.saveMode("pro");
        }
      });
    }

    if (btnHomeNewProject) {
      btnHomeNewProject.addEventListener("click", startNewProject);
    }

    if (btnHomeLibrary) {
      btnHomeLibrary.addEventListener("click", () => {
        // TODO: Echte Bibliothek später
        alert("Bibliothek kommt später – hier sollen Import/Export & Projektauswahl hin.");
      });
    }

    if (btnHomeSettings) {
      btnHomeSettings.addEventListener("click", () => {
        // TODO: Settings-Screen später wieder anbinden
        alert("Einstellungen kommen später – Theme, Sprache, Mode etc.");
      });
    }
  }

  /* -------------------------------------------------------------------------
   * Event-Bindings – Tabs / Projekt-Screen
   * ---------------------------------------------------------------------- */

  function bindTabEvents() {
    if (btnTabCamera) {
      btnTabCamera.addEventListener("click", () => showTab("camera"));
    }
    if (btnTabEditor) {
      btnTabEditor.addEventListener("click", () => showTab("editor"));
    }
    if (btnTabPlayer) {
      btnTabPlayer.addEventListener("click", () => showTab("player"));
    }
    if (btnBackHome) {
      btnBackHome.addEventListener("click", backToHome);
    }
  }

  /* -------------------------------------------------------------------------
   * Event-Bindings – Kamera
   * ---------------------------------------------------------------------- */

  function bindCameraEvents() {
    if (btnCamCapture) {
      btnCamCapture.addEventListener("click", onCaptureClick);
    }
  }

  /* -------------------------------------------------------------------------
   * Neues Projekt starten
   * ---------------------------------------------------------------------- */

  function startNewProject() {
    console.log("[App] Neues Projekt gestartet (Mode:", currentMode, ")");

    currentProject = {
      name: "Neues Projekt",
      frames: [], // hier speichern wir alle aufgenommenen Frames (data URLs)
      mode: currentMode,
      createdAt: new Date().toISOString(),
    };

    // Projekt an Module weiterreichen
    if (window.CameraTab && CameraTab.onProjectLoaded) {
      CameraTab.onProjectLoaded(currentProject);
    }
    if (window.EditorTab && EditorTab.onProjectLoaded) {
      EditorTab.onProjectLoaded(currentProject);
    }
    if (window.PlayerTab && PlayerTab.onProjectLoaded) {
      PlayerTab.onProjectLoaded(currentProject);
    }

    // UI: Auf Projekt-Screen schalten
    if (screenHome) screenHome.style.display = "none";
    if (screenProject) screenProject.style.display = "block";

    // Kamera starten und Kamera-Tab anzeigen
    startCamera();
    showTab("camera");
  }

  /* -------------------------------------------------------------------------
   * Tabs zeigen / verstecken
   * ---------------------------------------------------------------------- */

  function showTab(name) {
    currentTab = name;

    Object.keys(TABS).forEach((tabName) => {
      const el = document.getElementById(TABS[tabName]);
      if (!el) return;
      el.style.display = tabName === name ? "block" : "none";
    });

    // Module über Sichtbarkeit informieren (falls sie das nutzen)
    if (window.CameraTab) {
      if (name === "camera" && CameraTab.show) CameraTab.show();
      else if (CameraTab.hide) CameraTab.hide();
    }

    if (window.EditorTab) {
      if (name === "editor" && EditorTab.show) EditorTab.show();
      else if (EditorTab.hide) EditorTab.hide();
    }

    if (window.PlayerTab) {
      if (name === "player" && PlayerTab.show) PlayerTab.show();
      else if (PlayerTab.hide) PlayerTab.hide();
    }

    console.log("[App] Tab gewechselt zu:", name);
  }

  /* -------------------------------------------------------------------------
   * Zurück zur Startseite
   * ---------------------------------------------------------------------- */

  function backToHome() {
    // Kamera stoppen
    stopCamera();

    if (screenProject) screenProject.style.display = "none";
    if (screenHome) screenHome.style.display = "block";

    // Tabs verstecken
    Object.values(TABS).forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });

    console.log("[App] zurück zu Startscreen");
  }

  /* -------------------------------------------------------------------------
   * Kamera-Logik (getUserMedia)
   * ---------------------------------------------------------------------- */

  async function startCamera() {
    if (!camVideo) {
      console.warn("[App] Kein camVideo-Element gefunden.");
      return;
    }
    if (cameraStream) {
      console.log("[App] Kamera läuft bereits.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      cameraStream = stream;
      camVideo.srcObject = stream;
      console.log("[App] Kamera gestartet ✓");
    } catch (err) {
      console.error("[App] Kamera-Fehler:", err);
      alert("Kamera konnte nicht gestartet werden: " + err.message);
    }
  }

  function stopCamera() {
    if (!cameraStream) return;
    cameraStream.getTracks().forEach((t) => t.stop());
    cameraStream = null;
    if (camVideo) camVideo.srcObject = null;
    console.log("[App] Kamera gestoppt");
  }

  /* -------------------------------------------------------------------------
   * Foto aufnehmen
   * ---------------------------------------------------------------------- */

  function onCaptureClick() {
    if (!currentProject) {
      alert("Es ist kein Projekt geöffnet.");
      return;
    }
    if (!camVideo || !camVideo.videoWidth || !camVideo.videoHeight) {
      alert("Kamera noch nicht bereit.");
      return;
    }

    // Canvas in Video-Auflösung anlegen
    const canvas = document.createElement("canvas");
    canvas.width = camVideo.videoWidth;
    canvas.height = camVideo.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(camVideo, 0, 0, canvas.width, canvas.height);

    // Bild als JPEG-DataURL speichern
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);

    currentProject.frames.push(dataUrl);
    console.log("[App] Frame aufgenommen. Gesamt:", currentProject.frames.length);

    // Player und Editor über neues Projekt (mit mehr Frames) informieren
    if (window.EditorTab && EditorTab.onProjectLoaded) {
      EditorTab.onProjectLoaded(currentProject);
    }
    if (window.PlayerTab && PlayerTab.onProjectLoaded) {
      PlayerTab.onProjectLoaded(currentProject);
    }
  }

  /* -------------------------------------------------------------------------
   * Debug-/Global-API, falls du manuell testen willst
   * ---------------------------------------------------------------------- */

  window.App = {
    startNewProject,
    showTab,
    backToHome,
    startCamera,
    stopCamera,
    getCurrentProject: () => currentProject,
  };
})();
