// Objetivo: serviços centrais desacoplados da aplicação.
// Responsabilidade:
// persistência, validação, histórico, eventos, tema, imagem,
// clipboard e notificações.
//
// Dependências:
// constants.js
// events.js
// logger.js
// utils.js
// models/signature-models.js

import {
    APP_VERSION,
    EVENTS,
    STORAGE_KEY,
    STORAGE_VERSION
  } from '../constants.js';
  
  import {
    eventBus
  } from '../events.js';
  
  import {
    logger
  } from '../logger.js';
  
  import {
    debounce
  } from '../utils.js';
  
  import {
    PersonModel,
    ThemeModel
  } from '../models/signature-models.js';
  
  
  const DATABASE_NAME =
    'objetivonet-signature-db';
  
  
  const STATE_STORE =
    'application-state';
  
  
  const STATE_ID =
    'current';
  
  const clone = (value) => {
  
    if (
      typeof structuredClone === 'function'
    ) {
  
      return structuredClone(value);
  
    }
  
  
    return JSON.parse(
      JSON.stringify(value)
    );
  
  };
  
  export class LoggerService {
  
  
    debug(message, context) {
  
      logger.debug(
        message,
        context
      );
  
    }
  
  
  
    info(message, context) {
  
      logger.info(
        message,
        context
      );
  
    }
  
  
  
    warn(message, context) {
  
      logger.warn(
        message,
        context
      );
  
    }
  
  
  
    error(message, context) {
  
      logger.error(
        message,
        context
      );
  
    }
  
  
  
    performance(
      label,
      start = performance.now()
    ) {
  
      logger.info(
  
        `Performance: ${label}`,
  
        {
          duration:
            performance.now() - start
        }
  
      );
  
    }
  
  
  
    event(name, payload) {
  
      logger.debug(
  
        `Evento: ${name}`,
  
        payload
  
      );
  
    }
  
  
  }
  
  export class EventService {
  
  
    on(...args) {
  
      return eventBus.on(
        ...args
      );
  
    }
  
  
  
    once(...args) {
  
      return eventBus.once(
        ...args
      );
  
    }
  
  
  
    off(...args) {
  
      return eventBus.off(
        ...args
      );
  
    }
  
  
  
    emit(...args) {
  
      return eventBus.emit(
        ...args
      );
  
    }
  
  
  }
  
  export class ConfigService {
  
  
    constructor(configLoader) {
  
      this.configLoader =
        configLoader;
  
    }
  
  
  
    loadAll() {
  
      return this
        .configLoader
        ?.loadAll
        ?.();
  
    }
  
  
  }
  
  
  export class ValidationService {
  
  
    validate(state = {}) {
  
  
      const signature =
        state.signature ?? {};
  
      const person =
        signature.person ?? {};
  
      const socials =
        signature.socials ?? {
          items: []
        };
  
  
      const errors = [
  
        ...PersonModel.validate(
          person
        ),
  
        ...ThemeModel.validate(
          state.theme ?? {}
        )
  
      ];
  
  
      const warnings = [];
  
  
      this.validatePattern(
  
        errors,
  
        'signature.person.email',
  
        person.email,
  
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
        'Email inválido.'
  
      );
  
      this.validatePattern(
  
        errors,
  
        'signature.person.phone',
  
        person.phone,
  
        /^[+()\d\s-]{8,}$/,
  
        'Telefone inválido.',
  
        false
  
      );
  
      this.validatePattern(
  
        errors,
  
        'signature.person.whatsapp',
  
        person.whatsapp,
  
        /^[+()\d\s-]{8,}$/,
  
        'WhatsApp inválido.',
  
        false
  
      );
  
      socials.items?.forEach(
  
        (item, index) => {
  
          this.validateUrl(
  
            errors,
  
            `signature.socials.items.${index}.url`,
  
            item.url,
  
            item.network
  
          );
  
        }
  
      );
  
      return {
  
        valid:
          errors.length === 0,
  
        errors,
  
        warnings,
  
        touched:
          state.validation?.touched ?? {}
  
      };
  
  
    }
  
    validatePattern(
  
      errors,
  
      field,
  
      value,
  
      pattern,
  
      message,
  
      required = true
  
    ) {
  
  
      if (
        !value &&
        !required
      ) {
  
        return;
  
      }
  
      if (
        !pattern.test(
          value ?? ''
        )
      ) {
  
  
        errors.push({
  
          field,
  
          message
  
        });
  
  
      }
  
  
    }
  
    validateUrl(
  
      errors,
  
      field,
  
      value,
  
      label = 'URL'
  
    ) {
  
  
      if (!value) {
  
        return;
  
      }
  
  
  
      try {
  
  
        const url =
          new URL(value);
  
  
  
        if (
  
          ![
            'http:',
            'https:'
          ]
  
          .includes(
            url.protocol
          )
  
        ) {
  
          throw new Error();
  
        }
  
        const name =
          label
            ?.toLowerCase();
  
        if (
  
          name === 'github' &&
  
          !url.hostname.includes(
            'github.com'
          )
  
        ) {
  
  
          errors.push({
  
            field,
  
            message:
              'URL do GitHub deve apontar para github.com.'
  
          });
  
  
        }
  
        if (
  
          name === 'linkedin' &&
  
          !url.hostname.includes(
            'linkedin.com'
          )
  
        ) {
  
  
          errors.push({
  
            field,
  
            message:
              'URL do LinkedIn deve apontar para linkedin.com.'
  
          });
  
  
        }
  
  
  
      }
  
      catch {
  
  
        errors.push({
  
          field,
  
          message:
            `${label} inválida.`
  
        });
  
  
      }
  
  
    }
  
  
  }
  
  export class HistoryService {
  
  
    constructor(limit = 50) {
  
      this.limit =
        limit;
  
      this.undoStack =
        [];
  
      this.redoStack =
        [];
  
    }
  
  
    checkpoint(snapshot) {
  
  
      this.undoStack.push(
  
        clone(snapshot)
  
      );
  
  
  
      if (
  
        this.undoStack.length >
        this.limit
  
      ) {
  
        this.undoStack.shift();
  
      }
  
  
  
      this.redoStack =
        [];
  
  
    }
  
    undo(current) {
  
  
      if (
        !this.undoStack.length
      ) {
  
        return null;
  
      }
  
  
  
      this.redoStack.push(
  
        clone(current)
  
      );
  
  
  
      return this.undoStack.pop();
  
  
    }
  
  
    redo(current) {
  
  
      if (
        !this.redoStack.length
      ) {
  
        return null;
  
      }
  
  
  
      this.undoStack.push(
  
        clone(current)
  
      );
  
  
  
      return this.redoStack.pop();
  
  
    }
  
    serialize() {
  
  
      return {
  
        undo:
          this.undoStack,
  
        redo:
          this.redoStack,
  
        limit:
          this.limit
  
      };
  
  
    }
  
  
  }
  
  export class StorageService {
  
  
    constructor({
  
      fallbackKey =
        STORAGE_KEY
  
    } = {}) {
  
  
      this.fallbackKey =
        fallbackKey;
  
  
      this.dbPromise =
        null;
  
  
    }
  
    open() {
  
  
      if (
        !('indexedDB' in globalThis)
      ) {
  
        return Promise.resolve(
          null
        );
  
      }
  
  
  
  
  
      if (
        this.dbPromise
      ) {
  
        return this.dbPromise;
  
      }
  
      this.dbPromise =
        new Promise(
  
          (resolve) => {
  
  
            const request =
              indexedDB.open(
  
                DATABASE_NAME,
  
                STORAGE_VERSION
  
              );
  
  
  
            request.onupgradeneeded =
              () => {
  
  
                const db =
                  request.result;
  
  
  
                if (
                  !db.objectStoreNames.contains(
                    STATE_STORE
                  )
                ) {
  
  
                  db.createObjectStore(
  
                    STATE_STORE,
  
                    {
                      keyPath:
                        'id'
                    }
  
                  );
  
  
                }
  
  
              };
  
  
  
  
  
            request.onsuccess =
              () =>
                resolve(
                  request.result
                );
  
  
  
  
  
            request.onerror =
              () =>
                resolve(
                  null
                );
  
  
          }
  
        );
  
  
  
      return this.dbPromise;
  
  
    }
  
    async save(state) {
  
  
      const payload = {
  
  
        id:
          STATE_ID,
  
  
        version:
          STORAGE_VERSION,
  
  
        appVersion:
          APP_VERSION,
  
  
        updatedAt:
          new Date()
            .toISOString(),
  
  
        state
  
  
      };
  
      localStorage.setItem(
  
        this.fallbackKey,
  
        JSON.stringify(
          payload
        )
  
      );
  
      const db =
        await this.open();
  
  
      if (db) {
  
  
        await new Promise(
  
          (resolve) => {
  
  
            const transaction =
              db.transaction(
  
                STATE_STORE,
  
                'readwrite'
  
              );
  
  
  
            transaction
              .objectStore(
                STATE_STORE
              )
              .put(
                payload
              );
  
  
  
            transaction.oncomplete =
              resolve;
  
  
  
            transaction.onerror =
              resolve;
  
  
          }
  
        );
  
  
      }
  
  
      eventBus.emit(
  
        EVENTS.STORAGE_CHANGED,
  
        payload
  
      );
  
  
  
      return payload;
  
  
    }
  
    async load() {
  
  
      const db =
        await this.open();
  
      if (db) {
  
  
        const indexed =
          await new Promise(
  
            (resolve) => {
  
  
              const transaction =
                db.transaction(
  
                  STATE_STORE,
  
                  'readonly'
  
                );
  
  
  
              const request =
                transaction
                .objectStore(
                  STATE_STORE
                )
                .get(
                  STATE_ID
                );
  
  
  
              request.onsuccess =
                () =>
                  resolve(
                    request.result
                  );
  
  
  
              request.onerror =
                () =>
                  resolve(
                    null
                  );
  
  
            }
  
          );
  
  
  
  
  
        if (
          indexed?.state
        ) {
  
          return indexed.state;
  
        }
  
  
      }
  
  
  
  
  
  
  
      try {
  
  
        return JSON.parse(
  
          localStorage.getItem(
            this.fallbackKey
          )
  
        )
        ?.state ?? null;
  
  
  
      }
  
      catch {
  
  
        return null;
  
  
      }
  
  
    }
  
  
  }
  
  export class ThemeService {
  
  
    resolve(
      preference = 'auto'
    ) {
  
  
      if (
        preference === 'auto'
      ) {
  
  
        return globalThis
          .matchMedia
          ? globalThis
            .matchMedia(
              '(prefers-color-scheme: dark)'
            )
            .matches
              ? 'dark'
              : 'light'
  
          : 'light';
  
  
      }
  
      return preference;
  
  
    }
  
  
    apply(theme = {}) {
  
  
      document.documentElement.dataset.theme =
        theme.preference;
  
  
  
      document.documentElement.style.colorScheme =
        theme.resolved;
  
  
  
      eventBus.emit(
  
        EVENTS.THEME_CHANGED,
  
        theme
  
      );
  
  
    }
  
  
  }
  
  export class ImageService {
  
  
    normalize(photo = {}) {
  
  
      return {
  
        ...photo,
  
        enabled:
          Boolean(
            photo.url &&
            photo.enabled
          )
  
      };
  
  
    }
  
  
  }
  
  export class ClipboardService {
  
  
    async writeText(text) {
  
  
      if (
        !navigator.clipboard
      ) {
  
        throw new Error(
          'Clipboard indisponível.'
        );
  
      }
  
  
  
      return navigator.clipboard.writeText(
        text
      );
  
  
    }
  
  
  }
  
  export class NotificationService {
  
  
    notify(
  
      message,
  
      type = 'info'
  
    ) {
  
  
      eventBus.emit(
  
        EVENTS.NOTIFICATION_PUSHED,
  
        {
          message,
          type
        }
  
      );
  
  
    }
  
  
  }
  
  export const createAutoSave = (
  
    callback,
  
    delay
  
  ) => debounce(
  
    callback,
  
    delay
  
  );