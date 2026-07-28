// ==========================================================
// Objetivo: Interpretador de configuração dos Templates.
// Responsabilidade:
// - Resolver configurações visuais do template ativo.
// - Normalizar estilos, assets e opções.
// - Preparar dados para o HTML Renderer.
//
// Dependências:
// - nenhuma.
// ==========================================================


export class TemplateRenderer {


    constructor() {
  
      this.cacheKey =
        null;
  
  
      this.cacheValue =
        null;
  
    }
  
  
  
    resolve(template = {}) {
  
  
      const cacheKey =
        JSON.stringify(template);
  
  
  
      if (
        cacheKey === this.cacheKey &&
        this.cacheValue
      ) {
  
        return this.cacheValue;
  
      }
  
  
  
      const resolved = {
  
  
        id:
          template.id ?? 'gravatar',
  
  
  
        layout:
          template.layout ?? 'horizontal',
  
  
  
        styles:
          this.resolveStyles(
            template.styles
          ),
  
  
  
        assets:
          this.resolveAssets(
            template.assets
          ),
  
  
  
        options:
          this.resolveOptions(
            template.options
          )
  
  
      };
  
  
  
      this.cacheKey =
        cacheKey;
  
  
  
      this.cacheValue =
        resolved;
  
  
  
      return resolved;
  
  
    }
  
  
  
    resolveStyles(styles = {}) {
  
  
      return {
  
  
        colors: {
  
          ...(styles.colors ?? {})
  
        },
  
  
        typography: {
  
          ...(styles.typography ?? {})
  
        },
  
  
        spacing: {
  
          ...(styles.spacing ?? {})
  
        }
  
  
      };
  
  
    }
  
  
  
  
    resolveAssets(assets = {}) {
  
  
      return {
  
  
        profilePlaceholder:
          assets.profilePlaceholder
          ?? null,
  
  
  
        logoPlaceholder:
          assets.logoPlaceholder
          ?? null
  
  
      };
  
  
    }
  
  
  
  
  
    resolveOptions(options = {}) {

      return {
    
        showPhoto:
          options.showPhoto !== false,
    
    
        showLogo:
          options.showLogo !== false,
    
    
        roundedPhoto:
          options.roundedPhoto !== false,
    
    
        roundedLogo:
          options.roundedLogo === true,
    
    
        showSocialIcons:
          options.showSocialIcons !== false,
    
    
        divider:
          options.divider !== false,
    
    
        photoPosition:
          options.photoPosition ?? 'left',
    
    
        socialStyle:
          options.socialStyle ?? 'default',
    
    
        contactStyle:
          options.contactStyle ?? 'default',
    
    
        companyHighlight:
          options.companyHighlight === true
    
      };
    
    }
  
  
  }
  
  export const templateRenderer =
    new TemplateRenderer();
  
  
  
  export default templateRenderer;