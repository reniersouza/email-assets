// Objetivo: persistência local versionada.
// Responsabilidade: salvar, restaurar, resetar e versionar configurações da aplicação.
// Dependências: constants.js e events.js.

import { EVENTS, STORAGE_KEY, STORAGE_VERSION } from './constants.js';
import { eventBus } from './events.js';

const DEFAULT_STATE = Object.freeze({
  version: STORAGE_VERSION,
  updatedAt: null,
  settings: {
    theme: 'auto',
  },
});

export class StorageManager {
  load() {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return structuredClone(DEFAULT_STATE);
    }

    try {
      return this.migrate(JSON.parse(rawValue));
    } catch {
      return this.reset();
    }
  }

  save(settings) {
    const current = this.load();
    const payload = {
      version: STORAGE_VERSION,
      updatedAt: new Date().toISOString(),
      settings: {
        ...current.settings,
        ...settings,
      },
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    eventBus.emit(EVENTS.STORAGE_CHANGED, payload);

    return payload;
  }

  reset() {
    window.localStorage.removeItem(STORAGE_KEY);
    const state = structuredClone(DEFAULT_STATE);
    eventBus.emit(EVENTS.STORAGE_CHANGED, state);

    return state;
  }

  migrate(data) {
    if (data?.version === STORAGE_VERSION) {
      return data;
    }

    return {
      ...structuredClone(DEFAULT_STATE),
      settings: {
        ...DEFAULT_STATE.settings,
        ...data?.settings,
      },
    };
  }
}

export const storage = new StorageManager();
