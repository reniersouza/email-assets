import assert from 'node:assert/strict';
import { Store } from '../assets/js/store.js';
import { ValidationService, HistoryService, StorageService } from '../assets/js/services/core-services.js';

const memory = new Map();
globalThis.localStorage = { getItem: (k) => memory.get(k) ?? null, setItem: (k, v) => memory.set(k, v), removeItem: (k) => memory.delete(k) };
globalThis.document = { documentElement: { dataset: {}, style: {} } };
globalThis.matchMedia = () => ({ matches: false });
globalThis.performance = { now: () => 0 };
globalThis.window = { clearTimeout, setTimeout };

const store = new Store({ storageService: new StorageService({ fallbackKey: 'test-state' }) });
let observed = false;
const unsubscribe = store.subscribe(() => { observed = true; });
let watched = '';
store.watch('signature.person.name', (value) => { watched = value; });

store.dispatch('updateField', { path: 'signature.person.name', value: 'Maria' });
assert.equal(store.get('signature.person.name'), 'Maria');
assert.equal(observed, true);
assert.equal(watched, 'Maria');
assert.equal(store.getters.canUndo(), true);

store.dispatch('undo');
assert.equal(store.get('signature.person.name'), '');
assert.equal(store.getters.canRedo(), true);
store.dispatch('redo');
assert.equal(store.get('signature.person.name'), 'Maria');
unsubscribe();

store.dispatch('updateField', { path: 'signature.person.email', value: 'maria@example.com' });
assert.equal(new ValidationService().validate(store.snapshot()).valid, true);
store.dispatch('updateField', { path: 'theme.preference', value: 'dark' });
assert.equal(store.get('theme.resolved'), 'dark');

await store.persist();
const restored = await new StorageService({ fallbackKey: 'test-state' }).load();
assert.equal(restored.signature.person.name, 'Maria');
assert.deepEqual(new HistoryService(2).serialize(), { undo: [], redo: [], limit: 2 });
console.log('Core Application Layer tests passed');
