import assert from 'node:assert/strict';
import { EVENTS } from '../assets/js/constants.js';
import { eventBus } from '../assets/js/events.js';
import { Store } from '../assets/js/store.js';
import { ValidationService, HistoryService, StorageService } from '../assets/js/services/core-services.js';
import { ExportService, HtmlRenderer, LayoutEngine, PreviewRenderer, SignatureEngine, StyleEngine } from '../assets/js/services/signature-engine.js';

const memory = new Map();
globalThis.localStorage = { getItem: (k) => memory.get(k) ?? null, setItem: (k, v) => memory.set(k, v), removeItem: (k) => memory.delete(k) };
globalThis.document = { documentElement: { dataset: {}, style: {} }, createElement: () => ({ setAttribute() {}, textContent: '' }) };
globalThis.matchMedia = () => ({ matches: false });
globalThis.performance = { now: () => 0 };
globalThis.window = { clearTimeout, setTimeout, location: { origin: 'https://example.com' } };
Object.defineProperty(globalThis, 'navigator', { value: { clipboard: { async writeText(value) { memory.set('clipboard', value); } } }, configurable: true });

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

store.dispatch('updateField', { path: 'signature.company.website', value: 'https://objetivonet.com.br' });
store.dispatch('updateField', { path: 'signature.layout.variant', value: 'vertical' });
store.dispatch('updateField', { path: 'signature.style.primaryColor', value: '#123456' });
store.dispatch('updateField', { path: 'signature.socials.items', value: [{ network: 'LinkedIn', url: 'https://linkedin.com/company/objetivonet', order: 1 }] });

let signatureUpdated = false;
let previewUpdated = false;
let htmlRendered = false;
eventBus.on(EVENTS.SIGNATURE_UPDATED, () => { signatureUpdated = true; });
eventBus.on(EVENTS.PREVIEW_UPDATED, () => { previewUpdated = true; });
eventBus.on(EVENTS.HTML_RENDERED, () => { htmlRendered = true; });

const signatureEngine = new SignatureEngine({ store });
const signature = signatureEngine.build();
assert.equal(signature.person.name, 'Maria');
assert.equal(signature.layout.variant, 'vertical');
assert.equal(signature.socials[0].network, 'LinkedIn');
assert.equal(signatureUpdated, true);

assert.deepEqual(LayoutEngine.resolve({ variant: 'compact' }).sections, ['identity', 'contacts', 'socials']);
assert.equal(LayoutEngine.resolve({ variant: 'unknown' }).variant, 'horizontal');
assert.equal(StyleEngine.resolve({ primaryColor: '#abcdef', fontSize: 16 }).primaryColor, '#abcdef');

const htmlRenderer = new HtmlRenderer();
const html = htmlRenderer.render(signature);
assert.match(html, /role="presentation"/);
assert.match(html, /Maria/);
assert.match(html, /mailto:maria@example.com/);
assert.equal(html.includes('<script'), false);
assert.equal(htmlRendered, true);

const root = { innerHTML: '' };
const previewRenderer = new PreviewRenderer({ root, signatureEngine, htmlRenderer, delay: 0 });
const previewHtml = previewRenderer.render();
assert.equal(root.innerHTML, previewHtml);
assert.equal(previewUpdated, true);

const exportService = new ExportService({ signatureEngine, htmlRenderer });
assert.equal(exportService.getHtml(), htmlRenderer.render(signatureEngine.build()));
await exportService.copyHtml();
assert.equal(memory.get('clipboard'), exportService.getHtml());

console.log('Core Application Layer and Signature Engine tests passed');
