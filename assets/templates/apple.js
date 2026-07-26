// Objetivo: template Apple.
// Responsabilidade:
// - Definir identificação do template.
// - Preparar estrutura para renderização futura.
// Dependências:
// - ./base-template.js


import BaseTemplate from './base-template.js';



export default class AppleTemplate
  extends BaseTemplate {


  constructor() {

    super({

      id:
        'apple',


      name:
        'Apple',


      description:
        'Modelo inspirado no padrão visual Apple.',


      category:
        'minimal'


    });

  }


}