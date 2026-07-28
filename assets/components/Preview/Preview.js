// Objetivo: controlador do componente Preview.
// Responsabilidade: gerenciar ciclo de vida do Preview utilizando Store,
// Signature Engine e Renderer, sem regras de negócio locais.
// Dependências: ../../js/constants.js, ../../js/events.js e ../../js/services/signature-engine.js.

import { EVENTS } from '../../js/constants.js';
import { eventBus } from '../../js/events.js';
import { PreviewRenderer } from '../../js/services/preview-renderer.js';


export class PreviewComponent {

  constructor(
    root = document.querySelector('[data-component="Preview"]')
  ) {

    this.name = 'Preview';

    this.root = root;

    this.unsubscribe = null;

    this.renderer = new PreviewRenderer({
      root
    });

  }


  init() {

    if (!this.renderer) {
      return;
    }


    this.unsubscribe =
      this.renderer.start();


    if (this.root) {

      this.root.dataset.ready = 'true';

    }


    eventBus.emit(
      EVENTS.COMPONENT_READY,
      {
        name: this.name
      }
    );

  }


  destroy() {

    if (this.unsubscribe) {

      this.unsubscribe();

      this.unsubscribe = null;

    }

  }

}


const instance = new PreviewComponent();

instance.init();


export default instance;