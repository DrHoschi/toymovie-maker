/* ============================================================
 * Datei   : settings.js
 * Projekt : ToyMovie Maker
 * Version : v0.1.0
 * Zweck   : Zentrale Verwaltung von App-Einstellungen
 *          - Theme (Pink/Blau)
 *          - Sprache (DE/EN)
 *          - Modus (Light/Pro)
 *
 * Verwendung:
 *   const cfg = AppSettings.loadAll();
 *   AppSettings.saveTheme('blue');
 *   AppSettings.saveLang('en');
 *   AppSettings.saveMode('pro');
 *   AppSettings.clearAll(); // löscht nur Settings-Keys
 * ========================================================== */
(function () {
  'use strict';

  /* -------------------- Storage-Keys -------------------- */

  const STORAGE_KEY_THEME = 'tmm_theme';
  const STORAGE_KEY_LANG  = 'tmm_lang';
  const STORAGE_KEY_MODE  = 'tmm_mode';

  const DEFAULTS = {
    theme: 'pink',
    lang:  'de',
    mode:  'light'
  };

  /* -------------------- Intern: Helfer -------------------- */

  function safeGetItem(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      console.warn('[AppSettings] localStorage getItem Fehler für', key, e);
      return null;
    }
  }

  function safeSetItem(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.warn('[AppSettings] localStorage setItem Fehler für', key, e);
    }
  }

  function safeRemoveItem(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.warn('[AppSettings] localStorage removeItem Fehler für', key, e);
    }
  }

  /* -------------------- Public API -------------------- */

  /**
   * Alle Settings aus localStorage laden.
   * Fällt auf Default-Werte zurück, wenn nichts gespeichert ist.
   */
  function loadAll() {
    let theme = safeGetItem(STORAGE_KEY_THEME);
    let lang  = safeGetItem(STORAGE_KEY_LANG);
    let mode  = safeGetItem(STORAGE_KEY_MODE);

    // Theme
    if (theme !== 'blue') {
      theme = DEFAULTS.theme; // pink
    }

    // Sprache
    if (lang !== 'en') {
      lang = DEFAULTS.lang; // de
    }

    // Modus
    if (mode !== 'pro') {
      mode = DEFAULTS.mode; // light
    }

    return { theme, lang, mode };
  }

  function saveTheme(theme) {
    if (theme !== 'blue') theme = 'pink';
    safeSetItem(STORAGE_KEY_THEME, theme);
  }

  function saveLang(lang) {
    if (lang !== 'en') lang = 'de';
    safeSetItem(STORAGE_KEY_LANG, lang);
  }

  function saveMode(mode) {
    if (mode !== 'pro') mode = 'light';
    safeSetItem(STORAGE_KEY_MODE, mode);
  }

  /**
   * Nur die Settings-Keys aus localStorage löschen
   * (Projekte bleiben unangetastet).
   */
  function clearAll() {
    safeRemoveItem(STORAGE_KEY_THEME);
    safeRemoveItem(STORAGE_KEY_LANG);
    safeRemoveItem(STORAGE_KEY_MODE);
  }

  // Globale API bereitstellen
  window.AppSettings = {
    DEFAULTS,
    loadAll,
    saveTheme,
    saveLang,
    saveMode,
    clearAll
  };
})();
