// ==========================================================
// Objetivo: Serviço de gerenciamento de Templates.
// Responsabilidade:
// - Controlar template ativo.
// - Integrar Template Registry.
// - Validar templates disponíveis.
// - Emitir eventos de alteração.
//
// Dependências:
// - ../constants.js
// - ../events.js
// - ../templates/template-registry.js
// ==========================================================


import { EVENTS } from '../constants.js';

import { eventBus } from '../events.js';

import {
  getTemplate,
  hasTemplate,
  getDefaultTemplate
} from '../templates/template-registry.js';



class TemplateService {


  constructor() {


    this.activeTemplate =
      getDefaultTemplate();


  }



  getActiveTemplate() {

    return this.activeTemplate;

  }



  getActiveTemplateId() {

    return (
      this.activeTemplate?.id
      ??
      null
    );

  }



  selectTemplate(id) {


    if (
      !hasTemplate(id)
    ) {

      throw new Error(
        `Template não encontrado: ${id}`
      );

    }



    const template =
      getTemplate(id);



    this.activeTemplate =
      template;



    eventBus.emit(

      EVENTS.TEMPLATE_SELECTED,

      {

        id:
          template.id,


        template

      }

    );



    return template;


  }



  getDefault() {

    return getDefaultTemplate();

  }



  getTemplate(id) {

    return getTemplate(id);

  }



}



export const templateService =
  new TemplateService();



export default templateService;