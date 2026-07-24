// Objetivo: controlador do componente CodeViewer.
// Responsabilidade: registrar inicialização no Event Bus sem acessar outros componentes diretamente.
// Dependências: ../../js/constants.js e ../../js/events.js.

import { EVENTS } from '../../js/constants.js';
import { eventBus } from '../../js/events.js';

export class CodeViewerComponent {
  constructor(root = document.querySelector('[data-component="CodeViewer"]')) {
    this.name = 'CodeViewer';
    this.root = root;
  }

  init() {
    if (this.root) {
      this.root.dataset.ready = 'true';
    }

    eventBus.emit(EVENTS.COMPONENT_READY, { name: this.name });
  }
}

const instance = new CodeViewerComponent();
instance.init();

export default instance;
