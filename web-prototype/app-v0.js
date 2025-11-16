/* ============================================================================
 * ToyMovie Maker – Web-Prototyp
 * Datei   : app.js
 * Zweck   : Kamera starten, Frames aufnehmen, Onion-Skin-Overlay zeichnen
 * Hinweis : Läuft nur über https oder auf localhost mit Kamera-Berechtigung.
 * ========================================================================== */

(() => {
  // ----------------------------- DOM-Elemente ------------------------------
  const screenStart = document.getElementById("screen-start");
  const screenCamera = document.getElementById("screen-camera");

  const btnStartCamera = document.getElementById("btn-start-camera");
  const btnBack = document.getElementById("btn-back");
  const btnCapture = document.getElementById("btn-capture");

  const video = document.getElementById("camera-preview");
  const overlayCanvas = document.getElementById("overlay-canvas");
  const overlayCtx = overlayCanvas.getContext("2d");

  const sliderOverlayCount = document.getElementById("slider-overlay-count");
  const labelOverlayCount = document.getElementById("label-overlay-count");

  const sliderOpacity = document.getElementById("slider-opacity");
  const labelOpacity = document.getElementById("label-opacity");

  const errorMessage = document.getElementById("error-message");

  // ----------------------------- State / Settings --------------------------
  const state = {
    stream: null,          // MediaStream der Kamera
    frames: [],            // Array von Canvas-Elementen (letzte Frames)
    maxStoredFrames: 20,   // Sicherheitslimit
    overlayCount: 3,       // wie viele Frames als Ghost anzeigen
    overlayOpacity: 0.5,   // Basis-Transparenz
    overlayLoopRunning: false
  };

  // Hilfsfunktion: Screens umschalten
  function showScreen(name) {
    screenStart.classList.remove("screen--active");
    screenCamera.classList.remove("screen--active");

    if (name === "start") {
      screenStart.classList.add("screen--active");
    } else if (name === "camera") {
      screenCamera.classList.add("screen--active");
    }
  }

  // ----------------------------- Kamera-Setup ------------------------------

  async function startCamera() {
    errorMessage.hidden = true;
    errorMessage.textContent = "";

    try {
      // Versuchen, die Hauptkamera (Rückkamera) zu benutzen
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" }
        },
        audio: false
      });

      state.stream = stream;
      video.srcObject = stream;

      // Sobald wir die Videogröße kennen, passen wir das Overlay-Canvas an.
      video.addEventListener(
        "loadedmetadata",
        () => {
          resizeOverlayToVideo();
          startOverlayLoop();
        },
        { once: true }
      );
    } catch (err) {
      console.error("Kamera konnte nicht gestartet werden:", err);
      errorMessage.textContent =
        "Kamera konnte nicht gestartet werden. Bitte Berechtigungen prüfen oder im Handy-Browser mit HTTPS öffnen.";
      errorMessage.hidden = false;
    }
  }

  function stopCamera() {
    if (state.stream) {
      state.stream.getTracks().forEach((track) => track.stop());
      state.stream = null;
    }
    state.frames = [];
    state.overlayLoopRunning = false;
  }

  function resizeOverlayToVideo() {
    // Video-Dimensionen auslesen
    const w = video.videoWidth;
    const h = video.videoHeight;

    if (!w || !h) return;

    overlayCanvas.width = w;
    overlayCanvas.height = h;
  }

  // ----------------------------- Frames aufnehmen --------------------------

  function captureFrame() {
    if (!state.stream || !video.videoWidth || !video.videoHeight) {
      console.warn("Kamera noch nicht bereit.");
      return;
    }

    // Temporäres Canvas in Videogröße
    const tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = video.videoWidth;
    tmpCanvas.height = video.videoHeight;
    const tmpCtx = tmpCanvas.getContext("2d");

    // Aktuellen Videoframe hineinzeichnen
    tmpCtx.drawImage(video, 0, 0, tmpCanvas.width, tmpCanvas.height);

    // Canvas in Array speichern
    state.frames.push(tmpCanvas);

    // Ältere Frames auf maxStoredFrames begrenzen
    if (state.frames.length > state.maxStoredFrames) {
      state.frames.splice(0, state.frames.length - state.maxStoredFrames);
    }
  }

  // ----------------------------- Overlay-Loop ------------------------------

  function startOverlayLoop() {
    if (state.overlayLoopRunning) return;
    state.overlayLoopRunning = true;

    function loop() {
      if (!state.overlayLoopRunning) return;

      drawOverlay();
      requestAnimationFrame(loop);
    }
    loop();
  }

  function drawOverlay() {
    const w = overlayCanvas.width;
    const h = overlayCanvas.height;
    if (!w || !h) return;

    overlayCtx.clearRect(0, 0, w, h);

    // Wenn keine Frames vorhanden sind → nichts zeichnen
    if (state.frames.length === 0) return;

    // nur die letzten N Frames anzeigen
    const count = Math.min(state.overlayCount, state.frames.length);
    const startIndex = state.frames.length - count;
    const subset = state.frames.slice(startIndex);

    subset.forEach((frameCanvas, index) => {
      // einfache Falloff-Formel:
      // neuere Frames sind stärker sichtbar als ältere
      const factor = (index + 1) / subset.length; // 0..1
      overlayCtx.globalAlpha = state.overlayOpacity * factor;
      overlayCtx.drawImage(frameCanvas, 0, 0, w, h);
    });

    overlayCtx.globalAlpha = 1.0;
  }

  // ----------------------------- Event-Handler -----------------------------

  // Startscreen → Kamera
  btnStartCamera.addEventListener("click", () => {
    showScreen("camera");
    startCamera();
  });

  // Zurück zum Start
  btnBack.addEventListener("click", () => {
    stopCamera();
    showScreen("start");
  });

  // Foto aufnehmen
  btnCapture.addEventListener("click", () => {
    captureFrame();
  });

  // Slider Overlay-Count
  sliderOverlayCount.addEventListener("input", () => {
    const value = Number(sliderOverlayCount.value);
    state.overlayCount = value;
    labelOverlayCount.textContent = value;
  });

  // Slider Opacity
  sliderOpacity.addEventListener("input", () => {
    const value = Number(sliderOpacity.value);
    state.overlayOpacity = value;
    labelOpacity.textContent = value.toFixed(2);
  });

  // Beim Resize (z. B. Device Rotation) das Overlay-Canvas aktualisieren
  window.addEventListener("resize", () => {
    resizeOverlayToVideo();
  });

  // Initial: Startscreen anzeigen
  showScreen("start");
})();
