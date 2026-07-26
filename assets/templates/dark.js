// Objetivo: template Dark.
// Responsabilidade:
// - Definir identificação do template.
// - Preparar estrutura para renderização futura.
// Dependências:
// - ./base-template.js


import BaseTemplate from './base-template.js';



export default class DarkTemplate
  extends BaseTemplate {


  constructor() {

    super({

      id:
        'dark',


      name:
        'Dark',


      description:
        'Modelo com identidade visual escura para assinaturas modernas.',


      category:
        'dark'


    });

  }


}