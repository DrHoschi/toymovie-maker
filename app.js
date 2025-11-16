/* ============================================================================
 * Datei : app.js
 * Zweck : Zentrale App-Logik – Startscreen + Tabs + Projekte + Kamera
 * Version: v1.3 final (ID-Fallbacks + iOS-Safari-Fix)
 *
 * WICHTIGE PUNKTE
 * - Unterstützt alte IDs aus deinem Prototyp:
 *     cameraVideo / overlayCanvas / btnCapture
 *   UND die neuen:
 *     cam_video / cam_overlay / cam_capture
 * - Startet Kamera mit getUserMedia + video.play()
 * - Button "Foto aufnehmen" speichert Frames ins Projekt
 * - PlayerTab.onProjectLoaded(project) bekommt immer den aktuellen Stand
 * ============================================================================ */

(function () {
  "use strict";

  /* -------------------------------------------------------------------------
   * Globale Variablen / Referenzen
   * ---------------------------------------------------------------------- */

  // Screens
  let screenHome;
  let screenProject;

  // Home-Buttons
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
  let camVideo;       // <video>
  let camOverlay;     // <canvas> für Ghost / später
  let btnCamCapture;  // Button "Foto aufnehmen"

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

    // Externe Module initialisieren (wenn vorhanden)
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
   * DOM-Caching (mit Fallback auf alte IDs)
   * ---------------------------------------------------------------------- */

  function cacheDom() {
    // Screens
    screenHome = document.getElementById("screen-home") || null;
    screenProject = document.getElementById("screen-project") || null;

    // Home-Buttons
    btnHomeLight = document.getElementById("home_light") || null;
    btnHomePro = document.getElementById("home_pro") || null;
    btnHomeNewProject = document.getElementById("home_newProject") || null;
    btnHomeLibrary = document.getElementById("home_library") || null;
    btnHomeSettings = document.getElementById("home_settings") || null;

    // Tab-Buttons
    btnTabCamera = document.getElementById("btn_tab_camera") || null;
    btnTabEditor = document.getElementById("btn_tab_editor") || null;
    btnTabPlayer = document.getElementById("btn_tab_player") || null;
    btnBackHome = document.getElementById("btn_back_home") || null;

    // Kamera-Elemente:
    // Neue IDs (cam_video / cam_overlay / cam_capture) ODER alte IDs (cameraVideo / overlayCanvas / btnCapture)
    camVideo =
      document.getElementById("cam_video") ||
      document.getElementById("cameraVideo") ||
      null;

    camOverlay =
      document.getElementById("cam_overlay") ||
      document.getElementById("overlayCanvas") ||
      null;

    btnCamCapture =
      document.getElementById("cam_capture") ||
      document.getElementById("btnCapture") ||
      null;

    console.log("[App] cacheDom:", {
      camVideo: !!camVideo,
      camOverlay: !!camOverlay,
      btnCamCapture: !!btnCamCapture,
    });
  }

  /* -------------------------------------------------------------------------
   * Event-Bindings – Home-Screen
   * ---------------------------------------------------------------------- */

  function bindHomeEvents() {
    if (btnHomeLight) {
      btnHomeLight.addEventListener("click", () => {
        currentMode = "light";
        console.log("[App] Light-Version ausgewählt");
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
        alert(
          "Bibliothek ist noch Platzhalter.\nHier kommen später Import / Export und Projekt-Auswahl hinein."
        );
      });
    }

    if (btnHomeSettings) {
      btnHomeSettings.addEventListener("click", () => {
        alert(
          "Einstellungen-Screen kommt später.\nDort kannst du dann Theme, Sprache, usw. einstellen."
        );
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
    } else {
      console.warn(
        "[App] Kein 'Foto aufnehmen'-Button gefunden (cam_capture / btnCapture)."
      );
    }
  }

  /* -------------------------------------------------------------------------
   * Neues Projekt starten
   * ---------------------------------------------------------------------- */

  function startNewProject() {
    console.log("[App] Neues Projekt gestartet (Mode:", currentMode, ")");

    currentProject = {
      name: "Neues Projekt",
      frames: [],
      mode: currentMode,
      createdAt: new Date().toISOString(),
    };

    // Projekt an Module weiterreichen
    if (window.CameraTab && typeof CameraTab.onProjectLoaded === "function") {
      CameraTab.onProjectLoaded(currentProject);
    }
    if (window.EditorTab && typeof EditorTab.onProjectLoaded === "function") {
      EditorTab.onProjectLoaded(currentProject);
    }
    if (window.PlayerTab && typeof PlayerTab.onProjectLoaded === "function") {
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

    // Module über Sichtbarkeit informieren
    if (window.CameraTab) {
      if (name === "camera" && typeof CameraTab.show === "function")
        CameraTab.show();
      else if (typeof CameraTab.hide === "function") CameraTab.hide();
    }

    if (window.EditorTab) {
      if (name === "editor" && typeof EditorTab.show === "function")
        EditorTab.show();
      else if (typeof EditorTab.hide === "function") EditorTab.hide();
    }

    if (window.PlayerTab) {
      if (name === "player" && typeof PlayerTab.show === "function")
        PlayerTab.show();
      else if (typeof PlayerTab.hide === "function") PlayerTab.hide();
    }

    console.log("[App] Tab gewechselt zu:", name);
  }

  /* -------------------------------------------------------------------------
   * Zurück zur Startseite
   * ---------------------------------------------------------------------- */

  function backToHome() {
    stopCamera();

    if (screenProject) screenProject.style.display = "none";
    if (screenHome) screenHome.style.display = "block";

    Object.values(TABS).forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });

    console.log("[App] zurück zu Startscreen");
  }

  /* -------------------------------------------------------------------------
   * Kamera-Logik (getUserMedia + iOS-Fix)
   * ---------------------------------------------------------------------- */

  async function startCamera() {
    if (!camVideo) {
      console.warn(
        "[App] Kein Video-Element für Kamera gefunden (cam_video / cameraVideo)."
      );
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

      // iOS-Safari / Autoplay: explizit play() aufrufen
      try {
        await camVideo.play();
      } catch (playErr) {
        console.warn(
          "[App] video.play() konnte nicht automatisch gestartet werden:",
          playErr
        );
      }

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
      alert("Kamera noch nicht bereit. Bitte einen Moment warten.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = camVideo.videoWidth;
    canvas.height = camVideo.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(camVideo, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    currentProject.frames.push(dataUrl);

    console.log(
      "[App] Frame aufgenommen. Anzahl Frames:",
      currentProject.frames.length
    );

    // Editor und Player über neuen Stand informieren
    if (window.EditorTab && typeof EditorTab.onProjectLoaded === "function") {
      EditorTab.onProjectLoaded(currentProject);
    }
    if (window.PlayerTab && typeof PlayerTab.onProjectLoaded === "function") {
      PlayerTab.onProjectLoaded(currentProject);
    }
  }

  /* -------------------------------------------------------------------------
   * Debug-/Global-API
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
