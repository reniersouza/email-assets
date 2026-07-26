// ==========================================================
// Objetivo: Template Dark.
// Responsabilidade:
// - Definir identidade visual do template escuro.
// - Fornecer configuração para o Template Registry.
// - Preparar dados para utilização pelo Signature Engine.
//
// Dependências:
// - ./base-template.js
// ==========================================================


import BaseTemplate from './base-template.js';

const darkTemplate = new BaseTemplate({

  id:
    'dark',


  name:
    'Dark',


  description:
    'Template com identidade visual escura para assinaturas modernas.',


  author:
    'ObjetivoNET',


  version:
    '1.0.0',


  layout:
    'horizontal',



  styles: {


    colors: {


      primary:
        '#38BDF8',


      secondary:
        '#94A3B8',


      background:
        '#0F172A',


      text:
        '#F8FAFC',


      muted:
        '#CBD5E1',


      border:
        '#334155'


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
        8


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



export default darkTemplate;