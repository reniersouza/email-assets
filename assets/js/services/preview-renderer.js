// ==========================================================
// Objetivo: Renderização do preview em tempo real.
// Responsabilidade:
// - Escutar alterações do sistema.
// - Atualizar preview automaticamente.
// - Integrar Signature Engine.
// - Integrar Template Renderer.
// - Renderizar DOM.
//
// Dependências:
// - constants.js
// - events.js
// - signature-engine.js
// ==========================================================

import { EVENTS } from '../constants.js';
import { eventBus } from '../events.js';

import {
  SignatureEngine
} from './signature-engine.js';

export class PreviewRenderer {

  constructor({

    engine =
      new SignatureEngine(),

    container =
      null

  } = {}) {

    this.engine =
      engine;

    this.container =
      container;

    this.lastHtml =
      '';

    this.registerEvents();

  }



  registerEvents() {

    eventBus.on(
      EVENTS.STATE_UPDATED,
      () => this.render()
    );

    eventBus.on(
      EVENTS.TEMPLATE_SELECTED,
      () => this.render()
    );

    eventBus.on(
      EVENTS.STYLE_CHANGED,
      () => this.render()
    );

    eventBus.on(
      EVENTS.LAYOUT_CHANGED,
      () => this.render()
    );

  }



  setContainer(element) {

    this.container =
      element;

  }



  render() {

    if (!this.container) {
      return;
    }

    const model =
      this.engine.build();

    const html =
      this.buildPreviewHtml(model);

    if (
      html === this.lastHtml
    ) {
      return;
    }

    this.lastHtml =
      html;

    this.container.innerHTML =
      html;

  }



  buildPreviewHtml(model) {

    const template =
      model.template ?? {};

    const style =
      model.style ?? {};

    const person =
      model.person ?? {};

    const company =
      model.company ?? {};

    const contacts =
      model.contacts ?? [];

    const colors =
      template.styles?.colors ?? {};

    return `
      <div
        style="
          background:${colors.background || '#ffffff'};
          color:${colors.text || '#111827'};
          border:1px solid ${colors.border || '#e5e7eb'};
          border-radius:8px;
          padding:16px;
          font-family:${style.fontFamily};
        "
      >

        <div style="font-size:18px;font-weight:700;">
          ${person.name ?? ''}
        </div>

        <div style="margin-top:4px;color:${colors.muted || '#6b7280'};">
          ${person.role ?? ''}
        </div>

        <div style="margin-top:8px;">
          ${company.name ?? ''}
        </div>

        <div style="margin-top:12px;">

          ${contacts.map(contact => `
            <div style="margin-bottom:4px;">
              ${contact.value}
            </div>
          `).join('')}

        </div>

      </div>
    `;

  }

}

export const previewRenderer =
  new PreviewRenderer();

export default previewRenderer;