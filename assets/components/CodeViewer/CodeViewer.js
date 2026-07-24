// Objetivo: controlador do componente CodeViewer.
// Responsabilidade: exibir HTML mock com numeração de linhas para a interface da Fase 3.
// Dependências: ../../js/constants.js e ../../js/events.js.

import { EVENTS } from '../../js/constants.js';
import { eventBus } from '../../js/events.js';

const MOCK_HTML = `<table role="presentation" cellpadding="0" cellspacing="0">
  <tr>
    <td><strong>Ana Silva</strong></td>
  </tr>
  <tr>
    <td>Head de Operações · ObjetivoNET</td>
  </tr>
</table>`;

export class CodeViewerComponent {
  constructor(root = document.querySelector('[data-component="CodeViewer"]')) {
    this.name = 'CodeViewer';
    this.root = root;
  }

  init() {
    this.renderMockCode();

    if (this.root) {
      this.root.dataset.ready = 'true';
    }

    eventBus.emit(EVENTS.COMPONENT_READY, { name: this.name });
  }

  renderMockCode() {
    const code = this.root?.querySelector('code');
    if (!code) return;

    code.innerHTML = MOCK_HTML.split('\n')
      .map((line, index) => `<span><em>${String(index + 1).padStart(2, '0')}</em>${this.escape(line)}</span>`)
      .join('');
  }

  escape(value) {
    return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  }
}

const instance = new CodeViewerComponent();
instance.init();

export default instance;
