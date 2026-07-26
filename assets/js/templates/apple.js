// Objetivo: template Apple.
// Responsabilidade:
//description:
//Template inspirado no design minimalista da Apple.
//Preparar estrutura para renderização futura.
// Dependências:
// - ./base-template.js


import BaseTemplate from './base-template.js';

const appleTemplate = new BaseTemplate({

  id: 'apple',

  name: 'Apple',

  description:
    'Descrição do template.',

  author:
    'ObjetivoNET',

  version:
    '1.0.0',

  layout:
    'horizontal',

  styles: {

    colors: {},

    typography: {},

    spacing: {}

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


export default appleTemplate;