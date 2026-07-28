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


    console.log(
      'HTML RENDERER EXTERNO'
    );

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
      spacing.borderRadius ??
      8;


    const padding =
      spacing.padding ??
      16;


    const fontFamily =
      legacyStyle.fontFamily ??
      typography.fontFamily ??
      'Arial, Helvetica, sans-serif';



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

<tr>


${this.renderPhoto(
  signature,
  options,
  assets
)}


<td>

${this.renderPerson(
  signature,
  styles
)}

${this.renderCompany(
  signature,
  styles
)}

${this.renderContacts(
  signature,
  styles
)}


${this.renderSocials(
  signature,
  options
)}


</td>


</tr>


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
padding-right:16px;
">

<img
src="${this.escape(photo.url)}"
alt="${this.escape(photo.alt ?? 'Foto do perfil')}"
width="${photo.size ?? 96}"
height="${photo.size ?? 96}"
style="
display:block;
width:${photo.size ?? 96}px;
height:${photo.size ?? 96}px;
border-radius:50%;
"
/>

</td>

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

    const name =
      person.name ?? '';

    const role =
      person.role ?? '';

    const department =
      person.department ?? '';

    const legacy =
      signature.style ?? {};

    return `

<div
class="signature-person"
style="
color:${colors.text ?? legacy.textColor ?? '#1f2937'};
">


<strong
style="
display:block;
font-size:${(legacy.fontSize ?? 14) + 2}px;
font-weight:700;
line-height:1.3;
color:${legacy.primaryColor ?? colors.primary ?? '#2563eb'};
">

${this.escape(name)}

</strong>


<div
style="
font-size:14px;
margin-top:2px;
color:${colors.text ?? '#1f2937'};
">

${this.escape(role)}

</div>

<div
style="
font-size:13px;
margin-top:2px;
color:${colors.muted ?? '#64748b'};
">

${this.escape(department)}

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



    const colors =
      styles.colors ?? {};

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
margin-top:10px;
">


${
company.name
?
`

<div
style="
font-weight:600;
color:${colors.text ?? '#1f2937'};
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
font-size:13px;
margin-top:2px;
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


    const contacts =
      signature.contacts ?? [];



    if (
      !contacts.length
    ) {

      return '';

    }



    const colors =
      styles.colors ?? {};



    return `

<div
class="signature-contacts"
style="
margin-top:10px;
">

${contacts.map(contact => `


<div
style="
margin-top:3px;
font-size:13px;
color:${colors.text ?? '#1f2937'};
">

<a
href="${this.escape(contact.href ?? '#')}"
style="
color:${colors.primary ?? '#2563eb'};
text-decoration:none;
">

<strong>
${this.escape(contact.label)}
</strong>

:
${this.escape(contact.value)}

</a>


</div>


`).join('')}


</div>

`;

  }


  renderSocials(signature = {}) {

    const socials =
      signature.socials ?? [];
  
    if (!socials.length) {
  
      return '';
  
    }
  
    return `
  
  <div
    class="signature-socials"
    style="
      margin-top:10px;
      font-size:13px;
      color:${signature.style?.primaryColor || '#2563eb'};
    "
  >
  
  ${socials.map((social, index) => `
  
  <a
    href="${this.escape(social.url)}"
    target="_blank"
    style="
      color:${signature.style?.primaryColor || '#2563eb'};
      text-decoration:none;
    "
  >
  
  ${this.escape(social.network)}
  
  </a>
  
  ${index < socials.length - 1 ? '&nbsp;&bull;&nbsp;' : ''}
  
  `).join('')}
  
  </div>
  
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