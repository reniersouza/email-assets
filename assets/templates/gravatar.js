// ==========================================================
// Objetivo: Template Gravatar.
// Responsabilidade:
// - Definir as configurações visuais do template.
// - Registrar automaticamente o template no Registry.
//
// Dependências:
// - base-template.js
// - template-registry.js
// ==========================================================

import { BaseTemplate } from './base-template.js';
import { templateRegistry } from './template-registry.js';

const gravatarTemplate = new BaseTemplate({

  id: 'gravatar',

  name: 'Gravatar',

  description:
    'Template inspirado no layout clássico do Gravatar.',

  author: 'ObjetivoNET',

  version: '1.0.0',

  layout: 'horizontal',

  styles: {

    colors: {

      primary: '#2563eb',

      secondary: '#64748b',

      background: '#ffffff',

      text: '#0f172a',

      muted: '#64748b',

      border: '#dbe3ef'

    },

    typography: {

      fontFamily:
        'Arial, Helvetica, sans-serif',

      nameWeight: 700,

      textWeight: 400

    },

    spacing: {

      padding: 16,

      gap: 12,

      borderRadius: 8

    }

  },

  assets: {

    profilePlaceholder:
      'assets/placeholders/profile-placeholder.svg',

    logoPlaceholder:
      'assets/placeholders/logo-placeholder.svg'

  },

  options: {

    showPhoto: true,

    showLogo: true,

    roundedPhoto: true,

    roundedLogo: false,

    showSocialIcons: true,

    divider: true

  }

});

templateRegistry.register(
  gravatarTemplate
);

export default gravatarTemplate;