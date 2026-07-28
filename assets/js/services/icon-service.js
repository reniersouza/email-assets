// ==========================================================
// Objetivo: Serviço de resolução de ícones.
// Responsabilidade:
// - Localizar assets de ícones.
// - Fornecer caminho padronizado para renderizadores.
// - Não manipular DOM.
// - Não acessar Store.
//
// Dependências:
// nenhuma.
// ==========================================================


class IconService {


    constructor() {
  
      this.basePath =
        'assets/icons/';
  
    }
  
  
  
    getIcon(network) {
  
  
      const icons = {
  
  
        linkedin:
          'linkedin.png',
  
  
        github:
          'github.png'
  
  
      };
  
  
  
      const file =
        icons[
          String(network)
            .toLowerCase()
        ];
  
  
  
      if (!file) {
  
        return null;
  
      }
  
  
  
      return (
        this.basePath +
        file
      );
  
  
    }
  
  
  }
  
  
  
  export const iconService =
    new IconService();
  
  
  
  export default iconService;