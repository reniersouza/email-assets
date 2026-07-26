// Objetivo: Template Microsoft.
// Responsabilidade:
// - Definir identidade visual do template.
// - Fornecer configuração para o Template Registry.
// - Preparar dados para o Signature Engine.
//
// Dependências:
// - ./base-template.js


import { BaseTemplate } from './base-template.js';

const microsoftTemplate = new BaseTemplate({

  id: 'microsoft',

  name: 'Microsoft',

  description:
    'Modelo inspirado no padrão corporativo Microsoft.',

  author:
    'ObjetivoNET',

  version:
    '1.0.0',

  layout:
    'horizontal',

  styles: {

    colors: {

      primary: '#0078D4',

      secondary: '#5E5E5E',

      background: '#FFFFFF',

      text: '#323130',

      muted: '#605E5C',

      border: '#D2D0CE'

    },

    typography: {

      fontFamily:
        'Arial, Helvetica, sans-serif',

      nameWeight:
        700,

      textWeight:
        400

    },

    spacing: {

      padding:
        16,

      gap:
        12,

      borderRadius:
        6

    }

  },

  assets: {

    profilePlaceholder:
      'assets/placeholders/profile-placeholder.svg',

    logoPlaceholder:
      'assets/placeholders/logo-placeholder.svg'

  },

  options: {

    showPhoto:
      true,

    showLogo:
      true,

    roundedPhoto:
      true,

    roundedLogo:
      false,

    showSocialIcons:
      true,

    divider:
      true

  }

});


export default microsoftTemplate;
