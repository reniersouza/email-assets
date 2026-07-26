// Objetivo: Store central da aplicação.
// Responsabilidade: orquestrar state, getters, actions, mutations, observers, histórico, validação e persistência.
// Dependências: constants.js, events.js, models/signature-models.js e services/core-services.js.

import { EVENTS } from './constants.js';
import { eventBus } from './events.js';
import { ApplicationModel, CompanyModel, LayoutModel, PersonModel, PhotoModel, SettingsModel, SocialModel, StyleModel, ThemeModel, TemplateModel, ValidationModel } from './models/signature-models.js';
import { HistoryService, ImageService, StorageService, ThemeService, ValidationService, createAutoSave } from './services/core-services.js';

const clone = (value) => JSON.parse(JSON.stringify(value));
const pathParts = (path) => String(path).split('.').filter(Boolean);
const getByPath = (source, path) => pathParts(path).reduce((value, key) => value?.[key], source);
const setByPath = (target, path, value) => { const parts = pathParts(path); const last = parts.pop(); const parent = parts.reduce((node, key) => { node[key] ??= {}; return node[key]; }, target); parent[last] = value; };

export const createDefaultState = () => ({
  signature: { person: PersonModel.from(), company: CompanyModel.from(), photo: PhotoModel.from(), socials: SocialModel.from(), style: StyleModel.from(), layout: LayoutModel.from(), template: TemplateModel.from(), preferences: SettingsModel.from() },
  application: ApplicationModel.from(),
  history: { canUndo: false, canRedo: false, limit: SettingsModel.defaults.historyLimit },
  storage: { status: 'idle', version: 1, updatedAt: null },
  theme: ThemeModel.from(),
  validation: ValidationModel.from(),
  preview: { dirty: true, state: null },
});

export class Store {
  constructor({ initialState = createDefaultState(), storageService = new StorageService(), validationService = new ValidationService(), historyService = new HistoryService(initialState.signature.preferences.historyLimit), themeService = new ThemeService(), imageService = new ImageService() } = {}) {
    this.state = clone(initialState);
    this.storageService = storageService;
    this.validationService = validationService;
    this.historyService = historyService;
    this.themeService = themeService;
    this.imageService = imageService;
    this.subscribers = new Set();
    this.watchers = new Map();
    this.actions = new Map(Object.entries({ updateField: ({ path, value }) => this.commit('SET_FIELD', { path, value }), undo: () => this.restoreHistory('undo'), redo: () => this.restoreHistory('redo'), hydrate: async () => this.restore((await this.storageService.load()) ?? this.state, { silent: false, history: false }) }));
    this.mutations = new Map(Object.entries({ SET_FIELD: (state, { path, value }) => setByPath(state, path, value), RESTORE: (state, payload) => Object.assign(state, clone(payload)), SET_VALIDATION: (state, validation) => { state.validation = validation; }, SET_STORAGE_STATUS: (state, status) => { state.storage = { ...state.storage, ...status }; } }));
    this.autoSave = createAutoSave(() => this.persist(), this.state.signature.preferences.autoSaveDelay);
    this.validate();
  }

  getters = { signature: () => this.state.signature, theme: () => this.state.theme, validation: () => this.state.validation, preview: () => this.state.preview, canUndo: () => this.historyService.undoStack.length > 0, canRedo: () => this.historyService.redoStack.length > 0 };
  get(path) { return path ? getByPath(this.state, path) : this.state; }
  snapshot() { return clone(this.state); }
  subscribe(handler) { this.subscribers.add(handler); return () => this.unsubscribe(handler); }
  unsubscribe(handler) { this.subscribers.delete(handler); }
  watch(path, handler) { const handlers = this.watchers.get(path) ?? new Set(); handlers.add(handler); this.watchers.set(path, handlers); return () => handlers.delete(handler); }
  notify(change) { this.subscribers.forEach((handler) => handler(this.snapshot(), change)); this.watchers.get(change.path)?.forEach((handler) => handler(getByPath(this.state, change.path), change)); }
  dispatch(type, payload) { const action = this.actions.get(type); if (!action) throw new Error(`Action desconhecida: ${type}`); return action(payload); }
  commit(type, payload = {}, options = {}) { const mutation = this.mutations.get(type); if (!mutation) throw new Error(`Mutation desconhecida: ${type}`); const before = this.snapshot(); if (options.history !== false) this.historyService.checkpoint(before); mutation(this.state, payload); this.afterChange({ type, ...payload }, before, options); return this.snapshot(); }
  restore(snapshot, options = {}) { this.mutations.get('RESTORE')(this.state, snapshot); this.afterChange({ type: 'RESTORE', path: '*' }, null, options); return this.snapshot(); }
  restoreHistory(direction) { const snapshot = this.historyService[direction](this.snapshot()); if (!snapshot) return null; return this.restore(snapshot, { history: false }); }
  validate() { this.state.validation = this.validationService.validate(this.state); return this.state.validation; }
  async persist() { this.state.storage.status = 'saving'; const payload = await this.storageService.save(this.snapshot()); this.state.storage = { status: 'saved', version: payload.version, updatedAt: payload.updatedAt }; return payload; }
  afterChange(change, before, options = {}) {
    this.state.signature.photo = this.imageService.normalize(this.state.signature.photo);
    this.state.theme.resolved = this.themeService.resolve(this.state.theme.preference);
    this.validate();
    this.state.preview = { dirty: true, state: clone(this.state.signature) };
    this.state.history = { canUndo: this.getters.canUndo(), canRedo: this.getters.canRedo(), limit: this.historyService.limit };
    this.state.application.updatedAt = new Date().toISOString();
    this.themeService.apply(this.state.theme);
    if (options.silent !== true) {
      eventBus.emit(EVENTS.STATE_UPDATED, { change, state: this.snapshot() });
      if (change.path) eventBus.emit(EVENTS.FIELD_CHANGED, change);
      eventBus.emit(EVENTS.VALIDATION_UPDATED, this.state.validation);
      if (change.path?.startsWith('signature.layout')) eventBus.emit(EVENTS.LAYOUT_CHANGED, { change, layout: clone(this.state.signature.layout) });
      if (change.path?.startsWith('signature.style')) eventBus.emit(EVENTS.STYLE_CHANGED, { change, style: clone(this.state.signature.style) });
      this.notify(change);
    }
    if (this.state.signature.preferences.autoSave && options.persist !== false) this.autoSave();
  }
}

export const store = new Store();
