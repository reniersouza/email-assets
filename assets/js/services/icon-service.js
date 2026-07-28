// ==========================================================
// Objetivo: Serviço de resolução de ícones.
// Responsabilidade:
// - Localizar assets de ícones.
// - Fornecer caminho padronizado.
// - Preparar integração futura com exportação.
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



    const key =
      String(network)
        .toLowerCase();



    const file =
      icons[key];



    if (!file) {

      return null;

    }



    return {

      type:
        'asset',


      path:
        this.basePath + file,


      name:
        key


    };


  }


}



export const iconService =
  new IconService();



export default iconService;