/* ============================================================================
 * Datei   : app.js
 * Zweck   : Zentrales App-Management (Tabs, Projekte laden, Init)
 * Version : v1.0
 * ============================================================================
 */

(function () {
    'use strict';

    // ---------------------------
    // Welche Tabs wir haben
    // ---------------------------

    const TABS = {
        camera: 'tab-camera',
        editor: 'tab-editor',
        player: 'tab-player'
    };

    let currentTab = null;

    // ---------------------------------------------------------------
    // Initialisierung nach DOM-Load
    // ---------------------------------------------------------------

    document.addEventListener('DOMContentLoaded', () => {

        console.log('[App] Initialisiere Module …');

        // Module initialisieren
        if (window.CameraTab) CameraTab.init();
        if (window.EditorTab) EditorTab.init();
        if (window.PlayerTab) PlayerTab.init();

        console.log('[App] Module bereit ✓');

        // Standard-Starttab
        showTab('camera');

        console.log('[App] Start-Tab: Kamera');

        // Beispiel: Ein Fake-Projekt laden
        // (später ersetzt durch echte Projektlogik)
        const dummyProject = {
            name: "Demo Projekt",
            frames: []
        };

        onProjectLoaded(dummyProject);
    });


    // ---------------------------------------------------------------
    // Tab-Wechsel
    // ---------------------------------------------------------------

    function showTab(tabName) {
        currentTab = tabName;

        Object.keys(TABS).forEach(name => {
            const el = document.getElementById(TABS[name]);
            if (el) el.style.display = (name === tabName ? 'block' : 'none');
        });

        console.log('[App] Tab geöffnet:', tabName);

        // Modul-Hooks
        if (tabName === 'camera' && window.CameraTab) CameraTab.show();
        if (tabName === 'editor' && window.EditorTab) EditorTab.show();
        if (tabName === 'player' && window.PlayerTab) PlayerTab.show();

        if (tabName !== 'camera' && window.CameraTab) CameraTab.hide();
        if (tabName !== 'editor' && window.EditorTab) EditorTab.hide();
        if (tabName !== 'player' && window.PlayerTab) PlayerTab.hide();
    }

    // ---------------------------------------------------------------
    // Projekt laden → an alle Module übergeben
    // ---------------------------------------------------------------

    function onProjectLoaded(project) {
        console.log('[App] Projekt geladen → weiterreichen an Tabs …');

        if (window.CameraTab) CameraTab.onProjectLoaded(project);
        if (window.EditorTab) EditorTab.onProjectLoaded(project);
        if (window.PlayerTab) PlayerTab.onProjectLoaded(project);
    }

    // ---------------------------------------------------------------
    // Globale API (falls du später Switch-Buttons baust)
    // ---------------------------------------------------------------

    window.App = {
        showTab,
        onProjectLoaded
    };

})();
