// ==========================================================
// Objetivo: Template Apple.
// Responsabilidade:
// - Definir identidade visual do template.
// - Fornecer configuração para o Template Registry.
// - Preparar dados para o Signature Engine.
//
// Dependências:
// - ./base-template.js
// ==========================================================


import BaseTemplate from './base-template.js';



const appleTemplate = new BaseTemplate({


  id: 'apple',


  name: 'Apple',


  description:
    'Template inspirado no design minimalista da Apple.',


  author:
    'ObjetivoNET',


  version:
    '1.0.0',


  layout:
    'horizontal',



  styles: {


    colors: {


      primary:
        '#000000',


      secondary:
        '#6E6E73',


      background:
        '#FFFFFF',


      text:
        '#1D1D1F',


      muted:
        '#6E6E73',


      border:
        '#D2D2D7'


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



export default appleTemplate;