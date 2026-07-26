// Objetivo: motor de assinatura da Fase 4B.
// Responsabilidade: transformar Store em assinatura renderizável,
// aplicar layout/estilo, gerar HTML e preparar exportação.
// Dependências: constants.js, events.js, store.js, utils.js e core-services.js.

import { EVENTS } from '../constants.js';
import { eventBus } from '../events.js';
import { store as defaultStore } from '../store.js';
import { escapeHtml, sanitizeUrl, debounce } from '../utils.js';
import { ClipboardService, ValidationService } from './core-services.js';
import { templateService } from './template-service.js';
import { templateRenderer} from './template-renderer.js';

const clone = (value) =>
  value === undefined || value === null
    ? value
    : JSON.parse(JSON.stringify(value));


const isFilled = (value) =>
  value !== undefined &&
  value !== null &&
  String(value).trim() !== '';


const fieldErrorSet = (validation) =>
  new Set(
    validation?.errors?.map(
      (error) => error.field
    ) ?? []
  );


const validField = (errors, field) =>
  !errors.has(field);


const CONTACT_ORDER = Object.freeze([
  'email',
  'phone',
  'whatsapp',
  'website',
  'address'
]);


const SUPPORTED_LAYOUTS = Object.freeze([
  'horizontal',
  'vertical',
  'compact'
]);


export class SignatureEngine {

  constructor({

    store = defaultStore,
  
    validationService =
      new ValidationService(),
  
    templates =
      templateService,
  
    renderer =
      templateRenderer
  
  } = {}) {
    
    this.store =
    store;
  
  this.validationService =
    validationService;
  
  this.templates =
    templates;
  
  this.templateRenderer =
    renderer;
  
  this.cacheKey =
    null;
  
  this.cacheValue =
    null;

  build() {

    const state = this.store.snapshot();

    const cacheKey =
      this.createCacheKey(state);


    if (
      cacheKey === this.cacheKey &&
      this.cacheValue
    ) {
      return clone(this.cacheValue);
    }


    const validation =
      this.validationService.validate(state);


    const errors =
      fieldErrorSet(validation);


    const signature =
      state.signature ?? {};

    const template =
  this.templateRenderer.resolve(
    this.templates.getActiveTemplate()
  );

      const model = {

        meta: {      
          valid:
            validation.valid,      
          generatedAt:
            new Date().toISOString()
          },
            
          template,
      
      person:
        this.buildPerson(
          signature.person,
          errors
        ),

      company:
        this.buildCompany(
          signature.company
        ),

      photo:
        this.buildPhoto(
          signature.photo
        ),

      socials:
        this.buildSocials(
          signature.socials,
          errors
        ),

        layout:
        LayoutEngine.resolve({
      
          variant:
            template.layout
            ??
            signature.layout.variant,
      
          spacing:
            signature.layout.spacing,
      
          photoPosition:
            signature.layout.photoPosition
      
        }),

      style:
        StyleEngine.resolve(
          signature.style
        ),

      contacts: []

    };


    model.contacts =
      this.buildContacts(model);


    const cleaned =
      this.removeEmpty(model);


    this.cacheKey = cacheKey;
    this.cacheValue = cleaned;


    eventBus.emit(
      EVENTS.SIGNATURE_UPDATED,
      {
        signature: clone(cleaned),
        validation
      }
    );


    return clone(cleaned);

  }


  createCacheKey(state) {

    return JSON.stringify({
   
      signature:
        state.signature,
   
      theme:
        state.theme,
   
        template:
        this.templates.getActiveTemplateId()
   
    });
   
   }


  buildPerson(person = {}, errors) {

    return {

      name:
        validField(
          errors,
          'signature.person.name'
        )
          ? person.name?.trim()
          : '',


      role:
        person.role?.trim() ?? '',


      department:
        person.department?.trim() ?? '',


      email:
        validField(
          errors,
          'signature.person.email'
        )
          ? person.email?.trim()
          : '',


      phone:
        validField(
          errors,
          'signature.person.phone'
        )
          ? person.phone?.trim()
          : '',


      whatsapp:
        validField(
          errors,
          'signature.person.whatsapp'
        )
          ? person.whatsapp?.trim()
          : ''

    };

  }


  buildCompany(company = {}) {

    return {

      name:
        company.name?.trim() ?? '',


      website:
        company.website?.trim() ?? '',


      address:
        company.address?.trim() ?? '',


      city:
        company.city?.trim() ?? '',


      country:
        company.country?.trim() ?? ''

    };

  }


  buildPhoto(photo = {}) {

    if (
      !photo.enabled ||
      !isFilled(photo.url)
    ) {

      return null;

    }


    return {

      url:
        photo.url,


      alt:
        photo.alt ||
        'Foto do perfil',


      size:
        Number(photo.size) || 96

    };

  }


  buildSocials(
    socials = {},
    errors
  ) {

    return (

      socials.items ?? []

    )

      .map(
        (item, index) => ({

          network:
            item.network?.trim(),


          url:
            item.url?.trim(),


          order:
            item.order ?? index,


          index

        })
      )


      .filter(
        (item) =>

          isFilled(item.network) &&
          isFilled(item.url) &&
          validField(
            errors,
            `signature.socials.items.${item.index}.url`
          )

      )


      .sort(
        (a,b)=>
          a.order-b.order
      )


      .map(
        ({
          network,
          url,
          order
        })=>({

          network,
          url,
          order

        })
      );

  }


  buildContacts(model) {

    const person =
      model.person ?? {};


    const company =
      model.company ?? {};


    const contacts = {

      email:
        person.email
          ? {

              type:'email',
              label:'Email',
              value:person.email,
              href:`mailto:${person.email}`

            }
          : null,


      phone:
        person.phone
          ? {

              type:'phone',
              label:'Telefone',
              value:person.phone,
              href:`tel:${person.phone}`

            }
          : null,


      whatsapp:
        person.whatsapp
          ? {

              type:'whatsapp',
              label:'WhatsApp',
              value:person.whatsapp,
              href:
                `https://wa.me/${person.whatsapp.replace(/\D/g,'')}`

            }
          : null,


      website:
        company.website
          ? {

              type:'website',
              label:'Website',
              value:company.website,
              href:company.website

            }
          : null,


      address:
        (
          company.address ||
          company.city ||
          company.country
        )
          ? {

              type:'address',
              label:'Endereço',
              value:[
                company.address,
                company.city,
                company.country
              ]
              .filter(Boolean)
              .join(', ')

            }
          : null

    };


    return CONTACT_ORDER
      .map(
        key=>contacts[key]
      )
      .filter(Boolean);

  }
  removeEmpty(value, isRoot = true) {

    const protectedKeys = [
      'person',
      'company',
      'socials',
      'layout',
      'style',
      'meta'
    ];


    if (
      isRoot &&
      value &&
      typeof value === 'object' &&
      !Array.isArray(value)
    ) {

      return Object.entries(value)

        .reduce(
          (result, [key, item]) => {

            const cleaned =
              this.removeEmpty(
                item,
                false
              );


            if (
              protectedKeys.includes(key)
            ) {

              result[key] =
                cleaned ?? {};

              return result;

            }


            if (
              cleaned !== null &&
              cleaned !== undefined
            ) {

              result[key] =
                cleaned;

            }


            return result;

          },
          {}
        );

    }


    if (Array.isArray(value)) {

      return value

        .map(
          item =>
            this.removeEmpty(
              item,
              false
            )
        )

        .filter(
          item =>
            item !== null &&
            item !== undefined
        );

    }


    if (
      value &&
      typeof value === 'object'
    ) {

      const entries =
        Object.entries(value)

          .map(
            ([key,item]) => [

              key,

              this.removeEmpty(
                item,
                false
              )

            ]
          )

          .filter(
            ([,item]) =>
              item !== null &&
              item !== undefined &&
              item !== ''
          );


      return entries.length
        ? Object.fromEntries(entries)
        : null;

    }


    return isFilled(value)
      ? value
      : null;

  }

}



export class LayoutEngine {


  static resolve(layout = {}) {

    const variant =
      SUPPORTED_LAYOUTS.includes(
        layout.variant
      )
        ? layout.variant
        : 'horizontal';


    return {

      variant,


      spacing:
        layout.spacing ||
        'normal',


      photoPosition:
        layout.photoPosition ||
        'left',


      sections:
        this.sectionsFor(
          variant
        )

    };

  }


  static sectionsFor(variant) {

    const sections = {


      horizontal: [

        'photo',
        'identity',
        'contacts',
        'socials'

      ],


      vertical: [

        'photo',
        'identity',
        'contacts',
        'socials'

      ],


      compact: [

        'identity',
        'contacts',
        'socials'

      ]

    };


    return (
      sections[variant] ??
      sections.horizontal
    );

  }

}



export class StyleEngine {


  static resolve(style = {}) {

    return {


      primaryColor:
        style.primaryColor ||
        '#0f62fe',


      textColor:
        style.textColor ||
        '#1f2937',


      mutedColor:
        style.mutedColor ||
        '#4b5563',


      backgroundColor:
        style.backgroundColor ||
        '#ffffff',


      fontFamily:
        style.fontFamily ||
        'Arial, sans-serif',


      fontSize:
        Number(style.fontSize) ||
        14,


      spacing:
        Number(style.spacing) ||
        8,


      alignment:
        style.alignment ||
        'left',


      borderColor:
        style.borderColor ||
        '#e5e7eb',


      separator:
        style.separator ??
        '•',


      iconColor:
        style.iconColor ||
        style.primaryColor ||
        '#0f62fe',


      photoRadius:
        style.photoRadius ??
        48

    };

  }



  static inline(style) {

    return [

      `font-family:${style.fontFamily};`,

      `font-size:${style.fontSize}px;`,

      `color:${style.textColor};`,

      'line-height:1.4;',

      `text-align:${style.alignment};`

    ].join('');

  }

}



export class HtmlRenderer {


  render(signature) {

    const style =
      signature.style;


    const layout =
      signature.layout;


    const textStyle =
      StyleEngine.inline(style);


    const html = [];


    html.push(

      `<div class="signature-mock" ` +

      `style="` +

      `padding:20px;` +

      `border-radius:8px;` +

      `background-color:${style.backgroundColor};` +

      `border:1px solid ${style.borderColor};` +

      `margin-top:15px;` +

      `text-align:${style.alignment};">`

    );


    html.push(

      `<table role="presentation" ` +

      `cellpadding="0" ` +

      `cellspacing="0" ` +

      `border="0" ` +

      `style="${textStyle}` +

      `border-collapse:collapse;` +

      `width:100%;">`

    );


    html.push('<tr>');


    if (
      signature.photo &&
      layout.sections.includes('photo')
    ) {

      html.push(

        this.photoCell(
          signature.photo,
          style
        )

      );

    }


    html.push(

      '<td style="vertical-align:top;">'

    );


    html.push(
      this.identity(signature)
    );


    html.push(
      this.contacts(signature)
    );


    html.push(
      this.socials(signature)
    );


    html.push(

      `<div class="mock-bar" ` +

      `style="` +

      `height:4px;` +

      `width:120px;` +

      `background:${style.primaryColor};` +

      `border-radius:2px;` +

      `margin-top:${style.spacing * 2}px;` +

      `display:block;">` +

      `</div>`

    );


    html.push(

      '</td>',
      '</tr>',
      '</table>',
      '</div>'

    );


    const output =
      html.join('');


    eventBus.emit(
      EVENTS.HTML_RENDERED,
      {
        html: output,
        signature
      }
    );


    eventBus.emit(
      EVENTS.RENDER_COMPLETED,
      {
        target:'html'
      }
    );


    return output;

  }
  photoCell(photo, style) {

    return (

      `<td ` +

      `style="padding:0 ${style.spacing * 2}px 0 0;vertical-align:top;">` +

      `<img ` +

      `src="${sanitizeUrl(photo.url)}" ` +

      `alt="${escapeHtml(photo.alt)}" ` +

      `width="${photo.size}" ` +

      `height="${photo.size}" ` +

      `style="` +

      `display:block;` +

      `border:0;` +

      `border-radius:${style.photoRadius}px;` +

      `max-width:${photo.size}px;">` +

      `</td>`

    );

  }



  identity(signature) {

    const person =
      signature.person ?? {};

    const style =
      signature.style;


    const name =
      person.name ||
      'Ana Silva';


    const role =
      person.role ||
      'Head de Operações';


    const department =
      person.department ||
      'Atendimento';


    return (

      `<div ` +

      `style="` +

      `font-weight:bold;` +

      `color:${style.primaryColor};` +

      `font-size:${style.fontSize + 2}px;` +

      `margin-bottom:4px;` +

      `text-align:${style.alignment};">` +

      `${escapeHtml(name)}` +

      `</div>` +


      `<div ` +

      `style="` +

      `color:${style.mutedColor};` +

      `font-size:${style.fontSize - 1}px;` +

      `margin-bottom:${style.spacing}px;` +

      `text-align:${style.alignment};">` +

      `${escapeHtml(role)}` +

      ` · ` +

      `${escapeHtml(department)}` +

      `</div>`

    );

  }



  contacts(signature) {

    const style =
      signature.style;


    return (

      signature.contacts ?? []

    )

      .map(

        (contact) => {

          const value =
            escapeHtml(
              contact.value
            );


          const label =
            escapeHtml(
              contact.label
            );


          const content =
            contact.href

              ? (

                `<a ` +

                `href="${sanitizeUrl(contact.href)}" ` +

                `style="` +

                `color:${style.primaryColor};` +

                `text-decoration:none;">` +

                value +

                `</a>`

              )

              : value;



          return (

            `<div ` +

            `style="` +

            `margin-bottom:2px;` +

            `color:${style.textColor};` +

            `font-size:${style.fontSize - 1}px;` +

            `text-align:${style.alignment};">` +

            `${label}: ${content}` +

            `</div>`

          );

        }

      )

      .join('');

  }



  socials(signature) {

    if (
      !signature.socials ||
      !signature.socials.length
    ) {

      return '';

    }


    const style =
      signature.style;


    return (

      `<div ` +

      `style="` +

      `padding-top:${style.spacing}px;` +

      `text-align:${style.alignment};">` +


      signature.socials

        .map(

          (social) => (

            `<a ` +

            `href="${sanitizeUrl(social.url)}" ` +

            `style="` +

            `color:${style.primaryColor};` +

            `text-decoration:none;">` +

            `${escapeHtml(social.network)}` +

            `</a>`

          )

        )

        .join(

          ` <span aria-hidden="true" ` +

          `style="color:${style.mutedColor};">` +

          `${escapeHtml(style.separator)}` +

          `</span> `

        )


      +

      `</div>`

    );

  }

}



export class PreviewRenderer {


  constructor({

    root,

    signatureEngine =
      new SignatureEngine(),


    htmlRenderer =
      new HtmlRenderer(),


    delay = 100

  } = {}) {


    this.root =
      root;


    this.signatureEngine =
      signatureEngine;


    this.htmlRenderer =
      htmlRenderer;


    this.lastHtml =
      '';


    this.target =
      this.resolveTarget();


    this.renderDebounced =
      debounce(
        () => this.render(),
        delay
      );

  }



  resolveTarget() {

    if (!this.root) {

      return null;

    }


    return this.root.querySelector(
      '#signature-render-target'
    );

  }



  start() {

    this.render();


    const unsubscribeState =
      eventBus.on(
        EVENTS.STATE_UPDATED,
        () =>
          this.renderDebounced()
      );


    const unsubscribeSignature =
      eventBus.on(
        EVENTS.SIGNATURE_UPDATED,
        () =>
          this.renderDebounced()
      );


    return () => {

      unsubscribeState();

      unsubscribeSignature();

    };

  }



  render() {

    if (!this.root) {

      return '';

    }


    const signature =
      this.signatureEngine.build();


    const html =
      this.getPlaceholderOrHtml(
        signature
      );


    if (

      html !== this.lastHtml &&

      this.target

    ) {


      this.target.innerHTML =
        html;


      this.lastHtml =
        html;


      eventBus.emit(
        EVENTS.PREVIEW_UPDATED,
        {
          html,
          signature
        }
      );

    }


    eventBus.emit(
      EVENTS.RENDER_COMPLETED,
      {
        target:'preview'
      }
    );


    return html;

  }



  getPlaceholderOrHtml(signature) {

    const hasData = (

      signature?.person?.name

      ||

      signature?.person?.email

      ||

      signature?.company?.name

    );


    if (!hasData) {


      const placeholder =
        clone(signature);


      placeholder.person = {


        name:
          'Ana Silva',


        role:
          'Head de Operações',


        department:
          'Atendimento'


      };


      return this.htmlRenderer.render(
        placeholder
      );

    }


    return this.htmlRenderer.render(
      signature
    );

  }

}




export class ExportService {


  constructor({

    signatureEngine =
      new SignatureEngine(),


    htmlRenderer =
      new HtmlRenderer(),


    clipboardService =
      new ClipboardService()


  } = {}) {


    this.signatureEngine =
      signatureEngine;


    this.htmlRenderer =
      htmlRenderer;


    this.clipboardService =
      clipboardService;


  }



  getHtml() {

    const signature =
      this.signatureEngine.build();


    return this.htmlRenderer.render(
      signature
    );

  }



  async copyHtml() {

    const html =
      this.getHtml();


    await this.clipboardService.writeText(
      html
    );


    return html;

  }

}