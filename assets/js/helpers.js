// Objetivo: helpers para DOM e carregamento preguiçoso.
// Responsabilidade: reduzir repetição em consultas, criação de regiões e imports dinâmicos.
// Dependências: logger.js.

import { logger } from './logger.js';

export function $(selector, scope = document) {
  return scope.querySelector(selector);
}

export function $$(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

export async function lazyImport(modulePath) {
  logger.debug(`Carregando módulo sob demanda: ${modulePath}`);
  return import(modulePath);
}

export function setBusy(element, busy) {
  if (element) {
    element.setAttribute('aria-busy', String(Boolean(busy)));
  }
}
