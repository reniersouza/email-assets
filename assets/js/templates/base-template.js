// ==========================================================
// Objetivo: Classe base para todos os Templates.
// Responsabilidade:
// - Definir estrutura comum dos templates.
// - Validar propriedades mínimas.
// - Fornecer valores padrão reutilizáveis.
//
// Dependências: nenhuma.
// ==========================================================


export default class BaseTemplate {


  constructor(config = {}) {


    this.id =
      config.id ?? '';


    this.name =
      config.name ?? '';


    this.description =
      config.description ?? '';


    this.author =
      config.author ?? 'ObjetivoNET';


    this.version =
      config.version ?? '1.0.0';


    this.layout =
      config.layout ?? 'horizontal';


    this.styles =
      Object.freeze({
        ...(config.styles ?? {})
      });


    this.assets =
      Object.freeze({
        ...(config.assets ?? {})
      });


      this.options =
      Object.freeze({
    
        showPhoto: true,
    
        showLogo: true,
    
        roundedPhoto: true,
    
        roundedLogo: false,
    
        showSocialIcons: true,
    
        divider: true,
    
        photoPosition: 'left',
    
        socialStyle: 'icons-only',
    
        contactStyle: 'minimal',
    
        companyHighlight: false,
    
        ...(config.options ?? {})
    
      });


    Object.freeze(this);

  }


  getId() {
    return this.id;
  }


  getName() {
    return this.name;
  }


  getDescription() {
    return this.description;
  }


  getAuthor() {
    return this.author;
  }


  getVersion() {
    return this.version;
  }


  getLayout() {
    return this.layout;
  }


  getStyles() {
    return this.styles;
  }


  getAssets() {
    return this.assets;
  }


  getOptions() {
    return this.options;
  }


  toJSON() {

    return {

      id: this.id,

      name: this.name,

      description: this.description,

      author: this.author,

      version: this.version,

      layout: this.layout,

      styles: this.styles,

      assets: this.assets,

      options: this.options

    };

  }

}