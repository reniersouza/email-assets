// Objetivo: barramento de eventos da aplicação.
// Responsabilidade: permitir comunicação desacoplada entre módulos e componentes.
// Dependências: logger.js.

import { logger } from './logger.js';

export class EventBus {
  constructor() {
    this.listeners = new Map();
  }

  on(eventName, handler) {
    const handlers = this.listeners.get(eventName) ?? new Set();
    handlers.add(handler);
    this.listeners.set(eventName, handlers);

    return () => this.off(eventName, handler);
  }

  once(eventName, handler) {
    const unsubscribe = this.on(eventName, (payload) => {
      unsubscribe();
      handler(payload);
    });

    return unsubscribe;
  }

  off(eventName, handler) {
    this.listeners.get(eventName)?.delete(handler);
  }

  emit(eventName, payload = {}) {
    logger.debug(`Evento emitido: ${eventName}`, payload);
    this.listeners.get(eventName)?.forEach((handler) => handler(payload));
  }

  clear(eventName) {
    if (eventName) {
      this.listeners.delete(eventName);
      return;
    }

    this.listeners.clear();
  }
}

export const eventBus = new EventBus();
