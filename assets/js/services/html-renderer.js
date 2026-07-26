// ==========================================================
// Objetivo: Gerador de HTML da assinatura.
// Responsabilidade:
// - Transformar o modelo produzido pelo SignatureEngine
//   em HTML compatível com clientes de e-mail.
// - Não acessar Store.
// - Não manipular DOM.
// - Não emitir eventos.
//
// Dependências:
// nenhuma.
// ==========================================================

export class HtmlRenderer {

    constructor() {
  
      this.cacheKey = null;
  
      this.cacheValue = null;
  
    }
  
  
  
    render(signature = {}) {
  
      const cacheKey =
        JSON.stringify(signature);
  
  
  
      if (
        cacheKey === this.cacheKey &&
        this.cacheValue
      ) {
  
        return this.cacheValue;
  
      }
  
  
  
      const html =
        this.renderTable(signature);
  
  
  
      this.cacheKey =
        cacheKey;
  
  
  
      this.cacheValue =
        html;
  
  
  
      return html;
  
    }
  
  
  
    renderTable(signature = {}) {
  
      return `
  <table
    role="presentation"
    cellpadding="0"
    cellspacing="0"
    border="0">
  
    <tr>
  
      ${this.renderPhoto(signature)}
  
      <td>
  
        ${this.renderPerson(signature)}
  
        ${this.renderCompany(signature)}
  
        ${this.renderContacts(signature)}
  
        ${this.renderSocials(signature)}
  
      </td>
  
    </tr>
  
  </table>
  `;
  
    }
  
  
  
    renderPhoto(signature = {}) {
  
      return '';
  
    }
  
  
  
    renderPerson(signature = {}) {
  
      return '';
  
    }
  
  
  
    renderCompany(signature = {}) {
  
      return '';
  
    }
  
  
  
    renderContacts(signature = {}) {
  
      return '';
  
    }
  
  
  
    renderSocials(signature = {}) {
  
      return '';
  
    }
  
  
  
    escape(value) {
  
      return String(value ?? '')
  
        .replace(/&/g, '&amp;')
  
        .replace(/</g, '&lt;')
  
        .replace(/>/g, '&gt;')
  
        .replace(/"/g, '&quot;')
  
        .replace(/'/g, '&#39;');
  
    }
  
  }
  
  
  
  export const htmlRenderer =
    new HtmlRenderer();
  
  
  
  export default htmlRenderer;