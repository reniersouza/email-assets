// Objetivo: controlador do componente Editor.
// Responsabilidade: renderizar listas estáticas da Fase 3 sem executar regras de negócio.
// Dependências: ../../js/constants.js e ../../js/events.js.

import { EVENTS } from '../../js/constants.js';
import { eventBus } from '../../js/events.js';

const SOCIAL_NETWORKS = ['LinkedIn', 'GitHub', 'Instagram', 'Facebook', 'Threads', 'X', 'TikTok', 'YouTube', 'Discord', 'Telegram', 'Behance', 'Dribbble', 'Pinterest', 'Medium', 'Mastodon', 'WhatsApp'];
const TEMPLATES = ['Gravatar', 'ObjetivoNET', 'Google', 'Microsoft', 'Apple', 'Executivo', 'Dark'];

export class EditorComponent {
  constructor(root = document.querySelector('[data-component="Editor"]')) {
    this.name = 'Editor';
    this.root = root;
  }

  init() {
    this.renderSocialNetworks();
    this.renderTemplates();

    if (this.root) {
      this.root.dataset.ready = 'true';
    }

    eventBus.emit(EVENTS.COMPONENT_READY, { name: this.name });
  }

  renderSocialNetworks() {
    const container = this.root?.querySelector('.social-grid');
    if (!container || container.children.length) return;

    container.innerHTML = SOCIAL_NETWORKS.map((network, index) => `
      <div class="social-item" draggable="true">
        <span class="drag-handle" aria-hidden="true">⋮⋮</span>
        <label><input type="checkbox" /> <span class="social-icon" aria-hidden="true">${network.charAt(0)}</span>${network}</label>
        <input type="url" aria-label="URL ${network}" placeholder="https://${network.toLowerCase()}.com/usuario" />
        <button type="button" aria-pressed="false">Ativar</button>
        <span class="order-badge" aria-label="Ordem ${index + 1}">${index + 1}</span>
      </div>`).join('');
  }

  renderTemplates() {
    const container = this.root?.querySelector('.template-grid');
    if (!container || container.children.length) return;

    container.innerHTML = TEMPLATES.map((template) => `
      <button type="button" class="template-card" aria-label="Selecionar template ${template}">
        <span class="template-thumb"><span></span><span></span><span></span></span>
        <strong>Template ${template}</strong>
        <small>Miniatura demonstrativa</small>
      </button>`).join('');
  }
}

const instance = new EditorComponent();
instance.init();

export default instance;
