// ==========================================================
// Objetivo: Template Google.
// Responsabilidade:
// - Definir a identidade visual inspirada no Google.
// - Disponibilizar configuração do template para o Registry.
//
// Dependências:
// - base-template.js
// - template-registry.js
// ==========================================================

import BaseTemplate from './base-template.js';

const googleTemplate = new BaseTemplate({

  id: 'google',

  name: 'Google',

  description:
    'Template inspirado nas assinaturas do Google Workspace.',

  author: 'ObjetivoNET',

  version: '1.0.0',

  layout: 'horizontal',

  styles: {

    colors: {

      primary: '#1A73E8',

      secondary: '#5F6368',

      background: '#FFFFFF',

      text: '#202124',

      muted: '#5F6368',

      border: '#DADCE0'

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

      borderRadius: 6

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

export default googleTemplate;