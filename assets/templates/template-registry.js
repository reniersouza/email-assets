// Objetivo: registro central dos templates.
// Responsabilidade:
// - Registrar templates disponíveis.
// - Localizar templates.
// - Expor template padrão.
// Dependências:
// - ./base-template.js
// - ./gravatar-template.js
// - ./objetivonet-template.js
// - ./google-template.js
// - ./microsoft-template.js
// - ./apple-template.js
// - ./executive-template.js
// - ./dark-template.js

import BaseTemplate from './base-template.js';

import GravatarTemplate from './gravatar-template.js';
import ObjetivoNETTemplate from './objetivonet-template.js';
import GoogleTemplate from './google-template.js';
import MicrosoftTemplate from './microsoft-template.js';
import AppleTemplate from './apple-template.js';
import ExecutiveTemplate from './executive-template.js';
import DarkTemplate from './dark-template.js';

const registry = new Map();

function register(template) {

  if (!(template instanceof BaseTemplate)) {
    throw new Error(
      'Template inválido.'
    );
  }

  registry.set(
    template.id,
    template
  );

}

register(new GravatarTemplate());
register(new ObjetivoNETTemplate());
register(new GoogleTemplate());
register(new MicrosoftTemplate());
register(new AppleTemplate());
register(new ExecutiveTemplate());
register(new DarkTemplate());

export function getTemplate(id) {

  return (
    registry.get(id)
    ??
    registry.get('gravatar')
  );

}

export function hasTemplate(id) {

  return registry.has(id);

}

export function getAllTemplates() {

  return Array.from(
    registry.values()
  );

}

export function getTemplateIds() {

  return Array.from(
    registry.keys()
  );

}

export function getDefaultTemplate() {

  return registry.get('gravatar');

}