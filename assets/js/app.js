// Objetivo: bootstrap principal da aplicação.
// Responsabilidade: inicializar tema, roteador, configurações, componentes e service worker.
// Dependências: constants.js, config.js, events.js, helpers.js, logger.js, router.js e storage.js.

import { APP_VERSION, COMPONENTS, EVENTS } from './constants.js';
import { configLoader } from './config.js';
import { eventBus } from './events.js';
import { $, lazyImport, setBusy } from './helpers.js';
import { logger } from './logger.js';
import { router } from './router.js';
import { storage } from './storage.js';

export class ThemeManager {
  constructor() {
    this.preference = 'auto';
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  }

  init() {
    const savedTheme = storage.load().settings.theme ?? 'auto';
    this.apply(savedTheme);
    this.bindSystemThemeListener();
    this.bindToggle();
  }

  bindSystemThemeListener() {
    this.mediaQuery.addEventListener('change', () => {
      if (this.preference === 'auto') {
        this.apply('auto', { persist: false });
      }
    });
  }

  bindToggle() {
    $('#theme-toggle')?.addEventListener('click', () => this.cycle());
  }

  cycle() {
    const nextTheme = { auto: 'light', light: 'dark', dark: 'auto' }[this.preference] ?? 'auto';
    this.apply(nextTheme);
  }

  apply(preference, { persist = true } = {}) {
    this.preference = preference;
    document.documentElement.dataset.theme = preference;
    document.documentElement.style.colorScheme = this.resolveColorScheme(preference);

    if (persist) {
      storage.save({ theme: preference });
    }

    document.querySelector('#theme-toggle')?.replaceChildren(document.createTextNode(`Tema: ${preference.charAt(0).toUpperCase()}${preference.slice(1)}`));
    eventBus.emit(EVENTS.THEME_CHANGED, { theme: preference });
  }

  resolveColorScheme(preference) {
    if (preference === 'auto') {
      return this.mediaQuery.matches ? 'dark' : 'light';
    }

    return preference;
  }
}

export class App {
  constructor({ root = $('#app') } = {}) {
    this.root = root;
    this.themeManager = new ThemeManager();
  }

  async start() {
    logger.info(`Inicializando versão ${APP_VERSION}`);
    setBusy(this.root, true);

    this.themeManager.init();
    router.start();
    await configLoader.loadAll();
    await this.loadComponents();
    this.registerServiceWorker();

    this.root?.setAttribute('data-state', 'ready');
    setBusy(this.root, false);
    eventBus.emit(EVENTS.APP_READY, { version: APP_VERSION });
  }

  async loadComponents() {
    await Promise.all(
      COMPONENTS.map((componentName) =>
        lazyImport(`../components/${componentName}/${componentName}.js`)
      )
    );
  }

  registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      logger.warn('Service worker não suportado neste navegador');
      return;
    }

    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => logger.info('Service worker registrado', registration.scope))
      .catch((error) => logger.warn('Falha ao registrar service worker', error));
  }
}

new App().start().catch((error) => logger.error('Falha no bootstrap', error));
