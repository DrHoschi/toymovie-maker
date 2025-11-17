/* ============================================================================
 * Datei   : settings.js
 * Projekt : ToyMovie Maker – Einstellungen
 * Version : v0.3
 *
 * Aufgaben:
 *  - Verwaltet Theme (pink / blau)
 *  - Verwaltet Modus (light / pro)
 *  - Verwaltet Spielzeug-Typ (LEGO / Playmobil / Barbie / Auto)
 *  - Verwaltet Sprache (de / en – aktuell nur gespeichert)
 *  - Baut die UI im <div id="settings_root"> auf
 *  - Stellt AppSettings.* API für app.js bereit
 * ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'tmm_settings_v1';

  const DEFAULTS = {
    theme: 'pink',     // 'pink' oder 'blue'
    mode: 'light',     // 'light' oder 'pro'
    toyType: 'auto',   // 'auto' | 'lego' | 'playmobil' | 'barbie'
    language: 'de'     // 'de' | 'en'
  };

  /* -----------------------------------------------------------------------
   * Storage-Helpers
   * -------------------------------------------------------------------- */

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULTS };
      const data = JSON.parse(raw);
      return { ...DEFAULTS, ...data };
    } catch (e) {
      console.warn('[Settings] Konnte Settings nicht laden:', e);
      return { ...DEFAULTS };
    }
  }

  function saveSettings(partial) {
    const current = loadSettings();
    const merged = { ...current, ...partial };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch (e) {
      console.warn('[Settings] Konnte Settings nicht speichern:', e);
    }
    applyTheme(merged);
    applyMode(merged);
    return merged;
  }

  /* -----------------------------------------------------------------------
   * Theme / Mode anwenden
   * -------------------------------------------------------------------- */

  function applyTheme(settings) {
    const s = settings || loadSettings();
    document.body.classList.remove('theme-pink', 'theme-blue');
    document.body.classList.add(s.theme === 'blue' ? 'theme-blue' : 'theme-pink');
  }

  function applyMode(settings) {
    const s = settings || loadSettings();
    document.body.classList.remove('mode-light', 'mode-pro');
    document.body.classList.add(s.mode === 'pro' ? 'mode-pro' : 'mode-light');
  }

  /* -----------------------------------------------------------------------
   * UI aufbauen
   * -------------------------------------------------------------------- */

  function init(containerId) {
    const root = document.getElementById(containerId);
    if (!root) {
      console.warn('[Settings] Root-Container nicht gefunden:', containerId);
      return;
    }

    const s = loadSettings();
    applyTheme(s);
    applyMode(s);

    root.innerHTML = '';

    const section = document.createElement('div');
    section.className = 'settings-section';

    section.innerHTML = `
      <h2>Allgemein</h2>

      <div class="settings-row">
        <label for="settings_theme">Farb-Theme</label>
        <select id="settings_theme">
          <option value="pink">Pink (Barbie)</option>
          <option value="blue">Blau (LEGO/Playmobil)</option>
        </select>
      </div>

      <div class="settings-row">
        <label for="settings_mode">Version</label>
        <select id="settings_mode">
          <option value="light">Light – kinderfreundlich</option>
          <option value="pro">Pro – alle Tools</option>
        </select>
      </div>

      <div class="settings-row">
        <label for="settings_toy">Spielzeug-Typ</label>
        <select id="settings_toy">
          <option value="auto">Automatisch</option>
          <option value="lego">LEGO</option>
          <option value="playmobil">Playmobil</option>
          <option value="barbie">Barbie</option>
        </select>
      </div>

      <div class="settings-row">
        <label for="settings_lang">Sprache</label>
        <select id="settings_lang">
          <option value="de">Deutsch</option>
          <option value="en">Englisch</option>
        </select>
      </div>

      <div class="settings-row">
        <button id="settings_reset" class="btn-secondary btn-full">
          🔄 Einstellungen zurücksetzen
        </button>
      </div>
    `;

    root.appendChild(section);

    // aktuelle Werte setzen
    root.querySelector('#settings_theme').value = s.theme;
    root.querySelector('#settings_mode').value  = s.mode;
    root.querySelector('#settings_toy').value   = s.toyType;
    root.querySelector('#settings_lang').value  = s.language;

    // Events
    root.querySelector('#settings_theme').addEventListener('change', (ev) => {
      saveSettings({ theme: ev.target.value });
    });

    root.querySelector('#settings_mode').addEventListener('change', (ev) => {
      saveSettings({ mode: ev.target.value });
    });

    root.querySelector('#settings_toy').addEventListener('change', (ev) => {
      saveSettings({ toyType: ev.target.value });
    });

    root.querySelector('#settings_lang').addEventListener('change', (ev) => {
      saveSettings({ language: ev.target.value });
      // später können wir hier Texte übersetzen
    });

    root.querySelector('#settings_reset').addEventListener('click', () => {
      if (!confirm('Alle Einstellungen zurücksetzen?')) return;
      localStorage.removeItem(STORAGE_KEY);
      const fresh = loadSettings();
      root.querySelector('#settings_theme').value = fresh.theme;
      root.querySelector('#settings_mode').value  = fresh.mode;
      root.querySelector('#settings_toy').value   = fresh.toyType;
      root.querySelector('#settings_lang').value  = fresh.language;
      applyTheme(fresh);
      applyMode(fresh);
    });
  }

  /* -----------------------------------------------------------------------
   * API für app.js
   * -------------------------------------------------------------------- */

  window.AppSettings = {
    init,
    loadMode:   () => loadSettings().mode,
    saveMode:   (mode) => saveSettings({ mode }),
    loadTheme:  () => loadSettings().theme,
    saveTheme:  (theme) => saveSettings({ theme }),
    loadToyType: () => loadSettings().toyType,
    saveToyType: (toyType) => saveSettings({ toyType }),
    loadLanguage: () => loadSettings().language,
    saveLanguage: (lang) => saveSettings({ language: lang })
  };

  // Beim ersten Laden Theme/Mode anwenden, auch ohne Settings-Screen
  document.addEventListener('DOMContentLoaded', () => {
    try {
      const s = loadSettings();
      applyTheme(s);
      applyMode(s);
    } catch (e) {
      console.warn('[Settings] Initial apply failed:', e);
    }
  });

})();
