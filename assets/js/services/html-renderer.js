import iconService from './icon-service.js';

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
// - icon-service.js
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

    const template =
      signature.template ?? {};
  
    const styles =
      template.styles ?? {};
  
    const legacyStyle =
      signature.style ?? {};
  
    const options =
      template.options ?? {};
  
    const assets =
      template.assets ?? {};
  
    const colors =
      styles.colors ?? {};
  
    const spacing =
      styles.spacing ?? {};
  
    const typography =
      styles.typography ?? {};
  
    const border =
      legacyStyle.borderColor ??
      colors.border ??
      '#e5e7eb';
  
    const background =
      legacyStyle.backgroundColor ??
      colors.background ??
      '#ffffff';
  
    const radius =
      spacing.borderRadius ?? 8;
  
    const padding =
      spacing.padding ?? 16;
  
    const fontFamily =
      legacyStyle.fontFamily ??
      typography.fontFamily ??
      'Arial, Helvetica, sans-serif';
  
    const photoPosition =
      options.photoPosition ?? 'left';
  
    const content = `
  
  ${this.renderPerson(signature, styles)}
  
  ${this.renderDivider(signature)}
  
  ${this.renderCompany(signature, styles)}
  
  ${this.renderDivider(signature)}
  
  ${this.renderContacts(signature, styles)}
  
  ${this.renderDivider(signature)}
  
  ${this.renderSocials(signature)}
  
  `;
  
    let body = '';
  
    switch (photoPosition) {
  
      case 'right':
  
        body = `
  
  <tr>
  
  <td valign="top">
  
  ${content}
  
  </td>
  
  ${this.renderPhoto(
    signature,
    options,
    assets
  )}
  
  </tr>
  
  `;
  
        break;
  
      case 'top':
  
        body = `
  
  <tr>
  
  <td
  align="center"
  colspan="2"
  >
  
  ${this.renderPhoto(
    signature,
    options,
    assets
  )}
  
  </td>
  
  </tr>
  
  <tr>
  
  <td colspan="2">
  
  ${content}
  
  </td>
  
  </tr>
  
  `;
  
        break;
  
      default:
  
        body = `
  
  <tr>
  
  ${this.renderPhoto(
    signature,
    options,
    assets
  )}
  
  <td valign="top">
  
  ${content}
  
  </td>
  
  </tr>
  
  `;
  
    }
  
    return `
  
  <table
  role="presentation"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
  background:${background};
  border:1px solid ${border};
  border-radius:${radius}px;
  border-collapse:separate;
  padding:${padding}px;
  font-family:${fontFamily};
  color:${colors.text ?? '#1f2937'};
  ">
  
  ${body}
  
  </table>
  
  `;
  
  }

  renderPhoto(
    signature = {},
    options = {},
    assets = {}
  ) {
  
    const photo =
      signature.photo ?? {};
  
  
    const templatePhoto =
      signature.template?.photo ?? {};
  
  
    const photoSize =
      templatePhoto.size ?? photo.size ?? 96;
  
  
    const photoRadius =
      templatePhoto.radius ?? '50%';
  
  
    if (
      options.showPhoto === false
    ) {
  
      return '';
  
    }
  
  
    if (
      !photo.url
    ) {
  
      return '';
  
    }
  
  
    return `
  
  <td
  valign="top"
  style="
  padding-right:${signature.template?.styles?.spacing?.gap ?? 12}px;
  ">
  
  <img
  src="${this.escape(photo.url)}"
  alt="${this.escape(photo.alt ?? 'Foto do perfil')}"
  width="${photoSize}"
  height="${photoSize}"
  style="
  display:block;
  width:${photoSize}px;
  height:${photoSize}px;
  max-width:${photoSize}px;
  max-height:${photoSize}px;
  border-radius:${photoRadius};
  object-fit:cover;
  "
  />
  
  </td>
  
  `;
  
  }

  renderDivider(signature = {}) {

    const options =
      signature.template?.options ?? {};
  
    if (!options.divider) {
  
      return '';
  
    }
  
    const colors =
      signature.template?.styles?.colors ?? {};
  
    const spacing =
      signature.template?.styles?.spacing ?? {};
  
    const gap =
      spacing.gap ?? 12;
  
    return `
  
    <div
      style="
        margin:${gap}px 0;
        border-top:1px solid ${colors.border ?? '#e5e7eb'};
        height:0;
        line-height:0;
        font-size:0;
      "
    ></div>
  
    `;
  
  }

  renderPerson(
    signature = {},
    styles = {}
  ) {
  
    const person =
      signature.person ?? {};
  
    const colors =
      styles.colors ?? {};
  
    const typography =
      signature.template?.styles?.typography ?? {};
  
    const spacing =
      signature.template?.styles?.spacing ?? {};
  
    const gap =
      spacing.gap ?? 12;
  
    const nameWeight =
      typography.nameWeight ?? 700;
  
    const textWeight =
      typography.textWeight ?? 400;
  
    const nameSize =
      typography.nameSize ?? 16;
  
    const roleSize =
      typography.roleSize ?? 14;
  
    const departmentSize =
      typography.departmentSize ?? 13;
  
    return `
  
  <div
  class="signature-person"
  style="
  color:${colors.text ?? '#1f2937'};
  ">
  
  <strong
  style="
  display:block;
  font-size:${nameSize}px;
  font-weight:${nameWeight};
  line-height:1.3;
  color:${colors.primary ?? '#0f62fe'};
  ">
  
  ${this.escape(person.name ?? '')}
  
  </strong>
  
  <div
  style="
  font-size:${roleSize}px;
  font-weight:${textWeight};
  margin-top:${Math.round(gap / 6)}px;
  ">
  
  ${this.escape(person.role ?? '')}
  
  </div>
  
  <div
  style="
  font-size:${departmentSize}px;
  font-weight:${textWeight};
  opacity:.75;
  margin-top:${Math.round(gap / 6)}px;
  ">
  
  ${this.escape(person.department ?? '')}
  
  </div>
  
  </div>
  
  `;
  
  }
  
  renderCompany(
    signature = {},
    styles = {}
  ) {
  
  
    const company =
      signature.company ?? {};
  
  
    const typography =
      signature.template?.styles?.typography ?? {};
  
  
    const spacing =
      signature.template?.styles?.spacing ?? {};
  
  
    const gap =
      spacing.gap ?? 12;
  
  
    const textWeight =
      typography.textWeight ?? 400;
  
  
    const companyWeight =
      typography.companyWeight ?? textWeight;
  
  
    const companySize =
      typography.companySize ?? 14;
  
  
    const locationSize =
      typography.locationSize ?? 13;
  
  
    const colors =
      styles.colors ?? {};
  
  
    const options =
      signature.template?.options ?? {};
  
  
    const highlight =
      options.companyHighlight === true;
  
  
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
  
    .map(
      value =>
        this.escape(value)
    )
  
    .join(', ');
  
  
  
    return `
  
  <div
  class="signature-company"
  style="
  margin-top:${gap}px;
  ">
  
  
  ${
  company.name
  ?
  `
  
  <div
  style="
  font-size:${companySize}px;
  font-weight:${companyWeight};
  color:${
  highlight
    ? (colors.primary ?? '#2563eb')
    : (colors.text ?? '#1f2937')
  };
  ">
  
  ${this.escape(company.name)}
  
  </div>
  
  `
  :
  ''
  }
  
  
  ${
  location
  ?
  `
  
  <div
  style="
  font-size:${locationSize}px;
  font-weight:${textWeight};
  margin-top:${Math.round(gap / 6)}px;
  color:${colors.muted ?? '#64748b'};
  ">
  
  ${location}
  
  </div>
  
  `
  :
  ''
  }
  
  
  </div>
  
  `;
  
  }

  renderContacts(
    signature = {},
    styles = {}
  ) {
  
    const spacing =
      signature.template?.styles?.spacing ?? {};
  
    const gap =
      spacing.gap ?? 12;
  
    const contacts =
      signature.contacts ?? [];
  
    if (!contacts.length) {
  
      return '';
  
    }
  
    const colors =
      styles.colors ?? {};
  
    const options =
      signature.template?.options ?? {};
  
    const contactStyle =
      options.contactStyle ?? 'default';
  
    const minimal =
      contactStyle === 'minimal';
  
    const showIcons =
      contactStyle === 'icons';
  
    const labeled =
      contactStyle === 'default';
  
    const icons = {
  
      email: '✉',
  
      phone: '☎',
  
      website: '🌐'
  
    };
  
    return `
  
  <div
  class="signature-contacts"
  style="
  margin-top:${gap}px;
  ">
  
  ${contacts.map(contact => `
  
  <div
  style="
  margin-top:${Math.round(gap / 4)}px;
  font-size:13px;
  color:${colors.text ?? '#1f2937'};
  ">
  
  <a
  href="${this.escape(contact.href ?? '#')}"
  style="
  color:${colors.primary ?? '#2563eb'};
  text-decoration:none;
  ">
  
  ${
  showIcons
  ?
  
  `${icons[contact.type] ?? '•'} ${this.escape(contact.value)}`
  
  :
  
  minimal
  ?
  
  this.escape(contact.value)
  
  :
  
  labeled
  ?
  
  `
  <strong>
  ${this.escape(contact.label)}
  </strong>:
  ${this.escape(contact.value)}
  `
  
  :
  
  this.escape(contact.value)
  }
  
  </a>
  
  </div>
  
  `).join('')}
  
  </div>
  
  `;
  
  }

  renderSocialIcon(social = {}, signature = {}) {

    const options =
      signature.template?.options ?? {};
  
  
    if (!options.showSocialIcons) {
  
      return null;
  
    }
  
  
    return iconService.getIcon(
      social.network
    );
  
  }

  renderSocials(signature = {}) {

    const socials =
      signature.socials ?? [];
  
  
    const options =
      signature.template?.options ?? {};
  
  
    if (!socials.length) {
  
      return '';
  
    }
  
  
    if (!options.showSocialIcons) {
  
      return '';
  
    }
  
  
    const typography =
      signature.template?.styles?.typography ?? {};
  
  
    const spacing =
      signature.template?.styles?.spacing ?? {};
  
  
    const iconSize =
      typography.socialIconSize ?? 18;
  
  
    const iconGap =
      typography.socialGap ?? 8;
  
  
    const gap =
      spacing.gap ?? 12;
  
  
    return `
  
  <table
  role="presentation"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
  margin-top:${gap}px;
  "
  >
  
  <tr>
  
  ${socials.map((social) => {
  
  
    const icon =
      iconService.getIcon(
        social.network
      );
  
  
    if (!icon) {
  
      return '';
  
    }
  
  
    return `
  
  <td
  style="
  padding-right:${iconGap}px;
  "
  >
  
  <a
  href="${this.escape(social.url ?? '#')}"
  target="_blank"
  style="
  text-decoration:none;
  "
  >
  
  <img
  src="${this.escape(icon.path)}"
  alt="${this.escape(icon.name)}"
  width="${iconSize}"
  height="${iconSize}"
  style="
  display:block;
  width:${iconSize}px;
  height:${iconSize}px;
  border:0;
  "
  />
  
  </a>
  
  </td>
  
  `;
  
  }).join('')}
  
  
  </tr>
  
  </table>
  
  `;
  
  }
  
  escape(value) {

    return String(value ?? '')

      .replace(/&/g,'&amp;')

      .replace(/</g,'&lt;')

      .replace(/>/g,'&gt;')

      .replace(/"/g,'&quot;')

      .replace(/'/g,'&#39;');

  }


}

export const htmlRenderer =
  new HtmlRenderer();



export default htmlRenderer;