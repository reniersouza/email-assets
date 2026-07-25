// Objetivo: motor de assinatura da Fase 4B.
// Responsabilidade: transformar o Store em uma assinatura renderizável, aplicar layout/estilo, gerar HTML e preparar exportação.
// Dependências: constants.js, events.js, store.js, utils.js e services/core-services.js.

import { EVENTS } from '../constants.js';
import { eventBus } from '../events.js';
import { store as defaultStore } from '../store.js';
import { escapeHtml, sanitizeUrl, debounce } from '../utils.js';
import { ClipboardService, ValidationService } from './core-services.js';

const clone = (value) => JSON.parse(JSON.stringify(value));
const isFilled = (value) => value !== undefined && value !== null && String(value).trim() !== '';
const fieldErrorSet = (validation) => new Set((validation?.errors ?? []).map((error) => error.field));
const validField = (errors, field) => !errors.has(field);

const CONTACT_ORDER = ['email', 'phone', 'whatsapp', 'website', 'address'];
const SUPPORTED_LAYOUTS = Object.freeze(['horizontal', 'vertical', 'compact']);

export class SignatureEngine {
  constructor({ store = defaultStore, validationService = new ValidationService() } = {}) {
    this.store = store;
    this.validationService = validationService;
    this.cacheKey = '';
    this.cacheValue = null;
  }

  build() {
    const state = this.store.snapshot();
    const cacheKey = JSON.stringify({ signature: state.signature, theme: state.theme, validation: state.validation });
    if (cacheKey === this.cacheKey && this.cacheValue) return clone(this.cacheValue);

    const validation = this.validationService.validate(state);
    const errors = fieldErrorSet(validation);
    const signature = state.signature;
    const model = {
      meta: { valid: validation.valid, generatedAt: new Date().toISOString() },
      person: this.buildPerson(signature.person, errors),
      company: this.buildCompany(signature.company),
      photo: this.buildPhoto(signature.photo),
      socials: this.buildSocials(signature.socials, errors),
      layout: LayoutEngine.resolve(signature.layout),
      style: StyleEngine.resolve(signature.style),
      contacts: [],
    };

    model.contacts = this.buildContacts(model, errors);
    const cleaned = this.removeEmpty(model);
    console.log("MODEL =", model);
    console.log("CLEANED =", cleaned);
    this.cacheKey = cacheKey;
    this.cacheValue = cleaned;
    eventBus.emit(EVENTS.SIGNATURE_UPDATED, { signature: clone(cleaned), validation });
    return clone(cleaned);
  }

  buildPerson(person = {}, errors) {
    return this.removeEmpty({
      name: validField(errors, 'signature.person.name') ? person.name?.trim() : '',
      role: person.role?.trim(),
      department: person.department?.trim(),
      email: validField(errors, 'signature.person.email') ? person.email?.trim() : '',
      phone: validField(errors, 'signature.person.phone') ? person.phone?.trim() : '',
      whatsapp: validField(errors, 'signature.person.whatsapp') ? person.whatsapp?.trim() : '',
    });
  }

  buildCompany(company = {}) {
    return this.removeEmpty({ name: company.name?.trim(), website: company.website?.trim(), address: company.address?.trim(), city: company.city?.trim(), country: company.country?.trim() });
  }

  buildPhoto(photo = {}) {
    if (!photo.enabled || !isFilled(photo.url)) return null;
    return { url: photo.url, alt: photo.alt || 'Foto do perfil', size: Number(photo.size) || 96 };
  }

  buildSocials(socials = {}, errors) {
    return (socials.items ?? [])
      .map((item, index) => ({ network: item.network?.trim(), url: item.url?.trim(), order: item.order ?? index }))
      .filter((item, index) => isFilled(item.network) && isFilled(item.url) && validField(errors, `signature.socials.items.${index}.url`))
      .sort((a, b) => a.order - b.order);
  }

  buildContacts(model) {
    const contactMap = {
      email: model.person.email && { type: 'email', label: 'Email', value: model.person.email, href: `mailto:${model.person.email}` },
      phone: model.person.phone && { type: 'phone', label: 'Telefone', value: model.person.phone, href: `tel:${model.person.phone}` },
      whatsapp: model.person.whatsapp && { type: 'whatsapp', label: 'WhatsApp', value: model.person.whatsapp, href: `tel:${model.person.whatsapp}` },
      website: model.company.website && { type: 'website', label: 'Website', value: model.company.website, href: model.company.website },
      address: (model.company.address || model.company.city || model.company.country) && { type: 'address', label: 'Endereço', value: [model.company.address, model.company.city, model.company.country].filter(Boolean).join(', ') },
    };
    return CONTACT_ORDER.map((key) => contactMap[key]).filter(Boolean);
  }

  removeEmpty(value, isRoot = true) {
    // Lista de nós do modelo raiz que NUNCA devem ser deletados, mesmo vazios
    const protectedKeys = ['person', 'company', 'socials', 'layout', 'style', 'meta'];

    if (Array.isArray(value)) {
      return value
        .map((item) => this.removeEmpty(item, false))
        .filter((item) => item !== null && item !== undefined && !(typeof item === 'object' && !Array.isArray(item) && !Object.keys(item).length));
    }

    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value)
          .map(([key, item]) => [key, this.removeEmpty(item, false)])
          .filter(([key, item]) => {
            // Se for uma chave protegida na raiz do modelo, NUNCA removemos ela
            if (isRoot && protectedKeys.includes(key)) {
              return true;
            }
            return item !== '' && item !== null && item !== undefined && !(Array.isArray(item) && !item.length) && !(typeof item === 'object' && !Array.isArray(item) && !Object.keys(item).length);
          })
      );
    }

    return isFilled(value) ? value : '';
  }

}

export class LayoutEngine {
  static resolve(layout = {}) {
    const variant = SUPPORTED_LAYOUTS.includes(layout.variant) ? layout.variant : 'horizontal';
    return { variant, spacing: layout.spacing || 'normal', photoPosition: layout.photoPosition || 'left', sections: this.sectionsFor(variant) };
  }
  static sectionsFor(variant) {
    const sections = { horizontal: ['photo', 'identity', 'contacts', 'socials'], vertical: ['photo', 'identity', 'contacts', 'socials'], compact: ['identity', 'contacts', 'socials'] };
    return sections[variant] ?? sections.horizontal;
  }
}

export class StyleEngine {
  static resolve(style = {}) {
    return {
      primaryColor: style.primaryColor || '#0f62fe', textColor: style.textColor || '#1f2937', mutedColor: style.mutedColor || '#4b5563',
      fontFamily: style.fontFamily || 'Arial, sans-serif', fontSize: Number(style.fontSize) || 14, spacing: style.spacing || 8,
      alignment: style.alignment || 'left', borderColor: style.borderColor || '#e5e7eb', separator: style.separator ?? '•', iconColor: style.iconColor || style.primaryColor || '#0f62fe', photoRadius: style.photoRadius ?? 48,
    };
  }
  static inline(style) {
    return `font-family:${style.fontFamily};font-size:${style.fontSize}px;color:${style.textColor};line-height:1.4;text-align:${style.alignment};`;
  }
}

export class HtmlRenderer {
  render(signature) {
    const style = signature.style;
    const layout = signature.layout;
    const html = [`<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="${StyleEngine.inline(style)}border-collapse:collapse;">`, '<tr>'];
    if (signature.photo && layout.sections.includes('photo')) html.push(this.photoCell(signature.photo, style));
    html.push(`<td style="padding:0 0 0 ${layout.variant === 'horizontal' && signature.photo ? style.spacing * 2 : 0}px;vertical-align:top;">`);
    html.push(this.identity(signature), this.contacts(signature), this.socials(signature));
    html.push('</td></tr></table>');
    const output = html.join('');
    eventBus.emit(EVENTS.HTML_RENDERED, { html: output, signature });
    eventBus.emit(EVENTS.RENDER_COMPLETED, { target: 'html' });
    return output;
  }
  photoCell(photo, style) { return `<td style="padding:0 ${style.spacing * 2}px 0 0;vertical-align:top;"><img src="${sanitizeUrl(photo.url)}" alt="${escapeHtml(photo.alt)}" width="${photo.size}" height="${photo.size}" style="display:block;border:0;border-radius:${style.photoRadius}px;max-width:${photo.size}px;"></td>`; }
  identity(signature) { console.log("IDENTITY RECEIVED =", signature); const person = signature?.person ?? {}; const company = signature?.company ?? {}; const name = person.name || ''; return `<div style="font-weight:bold;color:${signature.style.primaryColor};font-size:${signature.style.fontSize}px;">${name}</div>`; }
  contacts(signature) { return (signature.contacts ?? []).map((contact) => `<div>${escapeHtml(contact.label)}: ${contact.href ? `<a href="${sanitizeUrl(contact.href)}" style="color:${signature.style.primaryColor};text-decoration:none;">${escapeHtml(contact.value)}</a>` : escapeHtml(contact.value)}</div>`).join(''); }
  socials(signature) { if (!signature.socials?.length) return ''; return `<div style="padding-top:${signature.style.spacing}px;">${signature.socials.map((social) => `<a href="${sanitizeUrl(social.url)}" style="color:${signature.style.primaryColor};text-decoration:none;">${escapeHtml(social.network)}</a>`).join(` <span aria-hidden="true">${escapeHtml(signature.style.separator)}</span> `)}</div>`; }
}

export class PreviewRenderer {
  constructor({ root, signatureEngine = new SignatureEngine(), htmlRenderer = new HtmlRenderer(), delay = 100 } = {}) {
    this.root = root;
    this.signatureEngine = signatureEngine;
    this.htmlRenderer = htmlRenderer;
    this.lastHtml = '';
    this.renderDebounced = debounce(() => this.render(), delay);
  }
  start() { this.render(); return eventBus.on(EVENTS.STATE_UPDATED, () => this.renderDebounced()); }
  render() { if (!this.root) return ''; const signature = this.signatureEngine.build(); const html = this.htmlRenderer.render(signature); if (html !== this.lastHtml) { this.root.innerHTML = html; this.lastHtml = html; eventBus.emit(EVENTS.PREVIEW_UPDATED, { html, signature }); } eventBus.emit(EVENTS.RENDER_COMPLETED, { target: 'preview' }); return html; }
}

export class ExportService {
  constructor({ signatureEngine = new SignatureEngine(), htmlRenderer = new HtmlRenderer(), clipboardService = new ClipboardService() } = {}) { this.signatureEngine = signatureEngine; this.htmlRenderer = htmlRenderer; this.clipboardService = clipboardService; }
  getHtml() { return this.htmlRenderer.render(this.signatureEngine.build()); }
  async copyHtml() { const html = this.getHtml(); await this.clipboardService.writeText(html); return html; }
}
