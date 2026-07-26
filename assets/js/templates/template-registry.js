// Objetivo: registro central dos templates.
// Responsabilidade:
// - Registrar templates disponíveis.
// - Localizar templates.
// - Expor template padrão.
// Dependências:
// - ./base-template.js
// - ./gravatar.js
// - ./objetivonet.js
// - ./google.js
// - ./microsoft.js
// - ./apple.js
// - ./executive.js
// - ./dark.js

import BaseTemplate from './base-template.js';
import GravatarTemplate from './gravatar.js';
import ObjetivoNETTemplate from './objetivonet.js';
import GoogleTemplate from './google.js';
import MicrosoftTemplate from './microsoft.js';
import AppleTemplate from './apple.js';
import ExecutiveTemplate from './executive.js';
import DarkTemplate from './dark.js';

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

register(GravatarTemplate);
register(ObjetivoNETTemplate);
register(GoogleTemplate);
register(MicrosoftTemplate);
register(AppleTemplate);
register(ExecutiveTemplate);
register(DarkTemplate);

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