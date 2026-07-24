// Objetivo: carregador de configurações JSON.
// Responsabilidade: carregar settings, themes, templates e icons de forma dinâmica e cacheada.
// Dependências: constants.js e events.js.

import { EVENTS } from './constants.js';
import { eventBus } from './events.js';

const CONFIG_FILES = Object.freeze({
  settings: 'assets/config/settings.json',
  themes: 'assets/config/themes.json',
  templates: 'assets/config/templates.json',
  icons: 'assets/config/icons.json',
});

export class ConfigLoader {
  constructor() {
    this.cache = new Map();
  }

  async load(name) {
    if (!Object.hasOwn(CONFIG_FILES, name)) {
      throw new Error(`Configuração desconhecida: ${name}`);
    }

    if (this.cache.has(name)) {
      return this.cache.get(name);
    }

    const response = await window.fetch(CONFIG_FILES[name], { cache: 'no-cache' });

    if (!response.ok) {
      throw new Error(`Configuração indisponível: ${name}`);
    }

    const data = await response.json();
    this.cache.set(name, data);

    return data;
  }

  async loadAll() {
    const entries = await Promise.all(
      Object.keys(CONFIG_FILES).map(async (name) => [name, await this.load(name)])
    );
    const config = Object.fromEntries(entries);

    eventBus.emit(EVENTS.CONFIG_LOADED, config);

    return config;
  }
}

export const configLoader = new ConfigLoader();
