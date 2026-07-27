// Objetivo: controlador do componente ValidationFeedback.
// Responsabilidade:
// exibir erros de validação associados aos campos.
// Dependências:
// constants.js
// events.js


import {
    EVENTS
  } from '../../js/constants.js';
  
  
  import {
    eventBus
  } from '../../js/events.js';
  
  
  
  export class ValidationFeedback {
  
  
    constructor(
      root = document.querySelector(
        '[data-component="ValidationFeedback"]'
      )
    ) {
    
      this.name =
        'ValidationFeedback';
    
      this.root =
        root;
    
      this.errors =
        [];
    
    }
  
  
  
    init() {


      if (this.root) {
    
        this.root.dataset.ready =
          'true';
    
      }
       
      eventBus.on(
    
        EVENTS.VALIDATION_UPDATED,
    
        (validation) => {
    
          this.render(
            validation
          );
    
        }
    
      );
    
    }
  
  
  
  
    render(
      validation = {}
    ) {
  
  
      this.clear();
  
  
  
      const errors =
        validation.errors ?? [];
  
  
  
      errors.forEach(
  
        error => {
  
  
          const field =
            document.querySelector(
              `[data-field="${error.field}"]`
            );
  
  
  
          if (!field) {
            return;
          }
  
  
  
          this.showError(
            field,
            error.message
          );
  
  
        }
  
      );
  
  
    }
  
  
  
  
    showError(
      field,
      message
    ) {
  
  
      const existing =
        field.parentElement
        ?.querySelector(
          '.validation-feedback'
        );
  
  
  
      if (existing) {
  
        existing.remove();
  
      }
  
  
  
  
      const element =
        document.createElement(
          'div'
        );
  
  
  
      element.className =
        'validation-feedback';
  
  
  
      element.textContent =
        message;
  
  
  
      field.parentElement
        ?.appendChild(
          element
        );
  
  
  
    }
  
  
  
  
    clear() {
  
  
      document
        .querySelectorAll(
          '.validation-feedback'
        )
        .forEach(
          element =>
            element.remove()
        );
  
  
    }
  
  
  }
  
  
  
  const instance =
    new ValidationFeedback();
  
  
  
  instance.init();
  
  
  
  export default instance;