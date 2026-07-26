// ==========================================================
// Objetivo: Template ObjetivoNET.
// Responsabilidade:
// - Definir a identidade visual oficial.
// - Registrar automaticamente o template.
//
// Dependências:
// - base-template.js
// - template-registry.js
// ==========================================================

import { BaseTemplate } from './base-template.js';
import { templateRegistry } from './template-registry.js';

const objetivoNetTemplate = new BaseTemplate({

  id: 'objetivonet',

  name: 'ObjetivoNET',

  description:
    'Template oficial da ObjetivoNET.',

  author: 'ObjetivoNET',

  version: '1.0.0',

  layout: 'horizontal',

  styles: {

    colors: {

      primary: '#0057B8',

      secondary: '#1E293B',

      background: '#FFFFFF',

      text: '#0F172A',

      muted: '#64748B',

      border: '#DCE5F2'

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
  objetivoNetTemplate
);

export default objetivoNetTemplate;