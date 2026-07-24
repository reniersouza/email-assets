// Objetivo: logger padronizado.
// Responsabilidade: publicar mensagens nos níveis debug, info, warn e error.
// Dependências: constants.js.

import { APP_NAME } from './constants.js';

const LEVEL_PRIORITY = Object.freeze({ debug: 10, info: 20, warn: 30, error: 40 });

export class Logger {
  constructor({ enabled = true, level = 'debug' } = {}) {
    this.enabled = enabled;
    this.level = level;
  }

  setLevel(level) {
    if (Object.hasOwn(LEVEL_PRIORITY, level)) {
      this.level = level;
    }
  }

  shouldWrite(level) {
    return this.enabled && LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[this.level];
  }

  write(level, message, context) {
    if (!this.shouldWrite(level)) {
      return;
    }

    const payload = context === undefined ? '' : context;
    console[level](`[${APP_NAME}] ${message}`, payload);
  }

  debug(message, context) {
    this.write('debug', message, context);
  }

  info(message, context) {
    this.write('info', message, context);
  }

  warn(message, context) {
    this.write('warn', message, context);
  }

  error(message, context) {
    this.write('error', message, context);
  }
}

export const logger = new Logger();
