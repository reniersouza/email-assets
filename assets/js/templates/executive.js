// ==========================================================
// Objetivo: Template Executivo.
// Responsabilidade:
// - Definir identidade visual do template.
// - Fornecer configuração para o Template Registry.
// - Preparar dados para utilização pelo Signature Engine.
//
// Dependências:
// - ./base-template.js
// ==========================================================


import BaseTemplate from './base-template.js';

const executiveTemplate = new BaseTemplate({

  id:
    'executive',


  name:
    'Executivo',


  description:
    'Template profissional voltado para assinaturas corporativas e executivas.',


  author:
    'ObjetivoNET',


  version:
    '1.0.0',


  layout:
    'horizontal',



  styles: {


    colors: {


      primary:
        '#111827',


      secondary:
        '#475569',


      background:
        '#FFFFFF',


      text:
        '#0F172A',


      muted:
        '#64748B',


      border:
        '#CBD5E1'


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
        20,


      gap:
        14,


      borderRadius:
        4


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
      false,


    roundedLogo:
      false,


    showSocialIcons:
      true,


    divider:
      true


  }


});



export default executiveTemplate;