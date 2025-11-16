/* ============================================================================
 * Datei : app.js
 * Zweck : Zentrale App-Logik – Startscreen + Tabs + Projekte
 * Version: v1.1 final
 * ============================================================================
 */

(function () {
    "use strict";

    // Screens
    const screenHome = document.getElementById("screen-home");
    const screenProject = document.getElementById("screen-project");

    // Tabs
    const TABS = {
        camera: "tab-camera",
        editor: "tab-editor",
        player: "tab-player"
    };

    let currentProject = null;
    let currentTab = null;

    // ---------------------------------------------------------------------
    // INITIALISIERUNG
    // ---------------------------------------------------------------------

    document.addEventListener("DOMContentLoaded", () => {

        // Module initialisieren
        CameraTab.init();
        EditorTab.init();
        PlayerTab.init();

        console.log("[App] Module initialisiert ✓");

        // HOME-BUTTONS
        document.getElementById("home_light").addEventListener("click", () => {
            console.log("[App] Light-Version ausgewählt");
        });

        document.getElementById("home_pro").addEventListener("click", () => {
            console.log("[App] Pro-Version ausgewählt");
        });

        document.getElementById("home_newProject")
            .addEventListener("click", startNewProject);

        document.getElementById("home_library")
            .addEventListener("click", () => alert("Bibliothek kommt später 🙌"));

        document.getElementById("home_settings")
            .addEventListener("click", () => alert("Einstellungen kommen später ⚙️"));

        // TAB-BUTTONS
        document.getElementById("btn_tab_camera").addEventListener("click", () => showTab("camera"));
        document.getElementById("btn_tab_editor").addEventListener("click", () => showTab("editor"));
        document.getElementById("btn_tab_player").addEventListener("click", () => showTab("player"));
        document.getElementById("btn_back_home").addEventListener("click", backToHome);

        console.log("[App] Startscreen aktiv");
    });

    // ---------------------------------------------------------------------
    // NEUES PROJEKT
    // ---------------------------------------------------------------------

    function startNewProject() {
        console.log("[App] Neues Projekt gestartet");

        currentProject = {
            name: "Neues Projekt",
            frames: []
        };

        // An alle Module weiterreichen
        CameraTab.onProjectLoaded(currentProject);
        EditorTab.onProjectLoaded(currentProject);
        PlayerTab.onProjectLoaded(currentProject);

        // Switchen auf Projekt-Screen
        screenHome.style.display = "none";
        screenProject.style.display = "block";

        // Start-Tab: Kamera
        showTab("camera");
    }

    // ---------------------------------------------------------------------
    // TAB-WECHSEL
    // ---------------------------------------------------------------------

    function showTab(name) {
        currentTab = name;

        Object.keys(TABS).forEach(tabName => {
            const el = document.getElementById(TABS[tabName]);
            el.style.display = (tabName === name ? "block" : "none");
        });

        // Module informieren
        if (name === "camera") CameraTab.show();
        else CameraTab.hide();

        if (name === "editor") EditorTab.show();
        else EditorTab.hide();

        if (name === "player") PlayerTab.show();
        else PlayerTab.hide();

        console.log("[App] Tab gewechselt zu:", name);
    }

    // ---------------------------------------------------------------------
    // ZURÜCK ZUM STARTSCREEN
    // ---------------------------------------------------------------------

    function backToHome() {
        screenProject.style.display = "none";
        screenHome.style.display = "block";

        console.log("[App] zurück zu Startscreen");

        // Tabs deaktivieren
        Object.values(TABS).forEach(id => {
            document.getElementById(id).style.display = "none";
        });
    }

    // Global für Debug
    window.App = {
        startNewProject,
        showTab,
        backToHome
    };

})();
