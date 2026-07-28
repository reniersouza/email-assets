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
  
  
    this.renderer =
      renderer;
  
  
    this.cacheKey =
      null;
  
  
    this.cacheValue =
      null;
  
  }

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
      this.renderer.resolve(
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
        StyleEngine.resolve({
      
          ...signature.style,
      
          template:
            template.styles
      
        }),

      contacts: []

    };


    model.contacts =
      this.buildContacts(model);

    const cleaned =
      this.removeEmpty(model);

      console.log(
        'MODELO FINAL ANTES DO HTML:',
        JSON.stringify(
          cleaned,
          null,
          2
        )
      );


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
          isFilled(item.url)
  
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


    if (
      value?.id &&
      value?.name &&
      value?.version
    ) {
  
      return value;
  
    }
  
  
    const protectedKeys = [
      'person',
      'company',
      'socials',
      'layout',
      'style',
      'meta',
      'template'
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

    const template =
      style.template ?? {};
  
    const colors =
      template.colors ?? {};
  
    const typography =
      template.typography ?? {};
  
    const spacing =
      template.spacing ?? {};
  
  
    return {
  
  
      primaryColor:
        style.primaryColor
        ??
        colors.primary
        ??
        '#0f62fe',
  
  
      textColor:
        style.textColor
        ??
        colors.text
        ??
        '#1f2937',
  
  
      mutedColor:
        style.mutedColor
        ??
        colors.muted
        ??
        '#4b5563',
  
  
      backgroundColor:
        style.backgroundColor
        ??
        colors.background
        ??
        '#ffffff',
  
  
      fontFamily:
        style.fontFamily
        ??
        typography.fontFamily
        ??
        'Arial, sans-serif',
  
  
      fontSize:
        Number(style.fontSize)
        ||
        14,
  
  
      spacing:
        Number(style.spacing)
        ||
        spacing.gap
        ||
        8,
  
  
      alignment:
        style.alignment
        ??
        'left',
  
  
      borderColor:
        style.borderColor
        ??
        colors.border
        ??
        '#e5e7eb',
  
  
      separator:
        style.separator
        ??
        '•',
  
  
      iconColor:
        style.iconColor
        ??
        colors.primary
        ??
        '#0f62fe',
  
  
      photoRadius:
        style.photoRadius
        ??
        (
          template.options?.roundedPhoto
            ? 48
            : 0
        )
  
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