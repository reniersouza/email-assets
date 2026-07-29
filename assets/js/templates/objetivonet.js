// ==========================================================
// Objetivo: Template ObjetivoNET.
// Responsabilidade:
// - Definir a identidade visual oficial.
// - Registrar automaticamente o template.
//
// Dependências:
// - base-template.js
// ==========================================================

import BaseTemplate from './base-template.js';

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
    
      textWeight: 400,
    
      nameSize: 18,
    
      roleSize: 14,
    
      departmentSize: 13,
    
      companySize: 15,
    
      companyWeight: 700,
    
      locationSize: 13
    
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
  
    divider: true,
  
    photoPosition: 'left',
  
    socialStyle: 'icons-only',
  
    contactStyle: 'icons',
  
    companyHighlight: true
  
  }

});

export default objetivoNetTemplate;