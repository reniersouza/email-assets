// Objetivo: controlador do componente Preview.
// Responsabilidade: renderizar assinatura real via Store, Signature Engine e Renderer, sem regras de negócio locais.
// Dependências: ../../js/constants.js, ../../js/events.js e ../../js/services/signature-engine.js.

import { EVENTS } from '../../js/constants.js';
import { eventBus } from '../../js/events.js';
import { PreviewRenderer } from '../../js/services/signature-engine.js';

export class PreviewComponent {
  constructor(root = document.querySelector('[data-component="Preview"]')) {
    this.name = 'Preview';
    this.root = root;
    this.unsubscribe = null;
    this.renderer = new PreviewRenderer({ root });
  }

  init() {
    this.unsubscribe = this.renderer.start();

    if (this.root) {
      this.root.dataset.ready = 'true';
    }

    eventBus.emit(EVENTS.COMPONENT_READY, { name: this.name });
  }

  destroy() {
    this.unsubscribe?.();
  }
}

const instance = new PreviewComponent();
instance.init();

export default instance;
