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

      const person =
        signature.person ?? {};
    
    
    
      if (
        !person.name &&
        !person.role &&
        !person.department
      ) {
    
        return '';
    
      }
    
    
    
      return `
    
    <div
      class="signature-person"
    >
    
      ${
        person.name
          ? `
    <strong
      style="
        display:block;
        font-size:16px;
        font-weight:700;
        line-height:1.3;
      "
    >
      ${this.escape(person.name)}
    </strong>
    `
          : ''
      }
    
      ${
        person.role
          ? `
    <div
      style="
        font-size:14px;
        margin-top:2px;
      "
    >
      ${this.escape(person.role)}
    </div>
    `
          : ''
      }
    
      ${
        person.department
          ? `
    <div
      style="
        font-size:13px;
        opacity:.75;
        margin-top:2px;
      "
    >
      ${this.escape(person.department)}
    </div>
    `
          : ''
      }
    
    </div>
    
    `;
    
    }
  
  
  
    renderCompany(signature = {}) {

      const company =
        signature.company ?? {};
    
    
    
      if (
    
        !company.name &&
        !company.address &&
        !company.city &&
        !company.country
    
      ) {
    
        return '';
    
      }
    
    
    
      const location = [
    
        company.address,
    
        company.city,
    
        company.country
    
      ]
    
        .filter(Boolean)
    
        .map(value => this.escape(value))
    
        .join(', ');
    
    
    
      return `
    
    <div
      class="signature-company"
      style="
        margin-top:10px;
      "
    >
    
      ${
        company.name
          ? `
    <div
      style="
        font-weight:600;
      "
    >
      ${this.escape(company.name)}
    </div>
    `
          : ''
      }
    
      ${
        location
          ? `
    <div
      style="
        font-size:13px;
        opacity:.75;
        margin-top:2px;
      "
    >
      ${location}
    </div>
    `
          : ''
      }
    
    </div>
    
    `;
    
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