// Objetivo: template Microsoft.
// Responsabilidade:
// - Definir identificação do template.
// - Preparar estrutura para renderização futura.
// Dependências:
// - ./base-template.js


import BaseTemplate from './base-template.js';



export default class MicrosoftTemplate
  extends BaseTemplate {


  constructor() {

    super({

      id:
        'microsoft',


      name:
        'Microsoft',


      description:
        'Modelo inspirado no padrão corporativo Microsoft.',


      category:
        'corporate'


    });

  }


}