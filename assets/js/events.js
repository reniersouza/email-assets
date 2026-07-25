// Objetivo: barramento de eventos da aplicação.
// Responsabilidade:
// - Permitir comunicação desacoplada entre módulos e componentes.
// - Garantir isolamento entre listeners.
// - Centralizar fluxo de eventos globais.
//
// Dependências:
// logger.js


import { logger } from './logger.js';


export class EventBus {


  constructor() {

    this.listeners = new Map();

  }


  on(eventName, handler) {


    if (
      !eventName ||
      typeof handler !== 'function'
    ) {

      return () => {};

    }



    const handlers =
      this.listeners.get(eventName)
      ??
      new Set();



    handlers.add(handler);



    this.listeners.set(
      eventName,
      handlers
    );



    return () =>
      this.off(
        eventName,
        handler
      );


  }


  once(eventName, handler) {


    if (
      !eventName ||
      typeof handler !== 'function'
    ) {

      return () => {};

    }



    const wrapper =
      (payload) => {


        this.off(
          eventName,
          wrapper
        );


        handler(payload);


      };



    return this.on(
      eventName,
      wrapper
    );


  }

  off(eventName, handler) {


    const handlers =
      this.listeners.get(
        eventName
      );



    if (!handlers) {

      return;

    }



    handlers.delete(handler);



    if (
      handlers.size === 0
    ) {

      this.listeners.delete(
        eventName
      );

    }


  }


  emit(eventName, payload = {}) {


    if (!eventName) {

      logger.warn(
        'Tentativa de emitir evento sem nome',
        payload
      );


      return 0;

    }



    const handlers =
      this.listeners.get(
        eventName
      );



    logger.debug(
      `Evento emitido: ${eventName}`,
      payload
    );



    if (!handlers?.size) {

      return 0;

    }



    let executed = 0;



    [
      ...handlers
    ]
    .forEach(
      (handler) => {


        try {


          handler(payload);

          executed++;


        }

        catch(error) {


          logger.error(
            `Erro no listener do evento ${eventName}`,
            error
          );


        }


      }
    );



    return executed;


  }


  has(eventName) {


    return Boolean(
      this.listeners.get(eventName)?.size
    );


  }



  clear(eventName) {


    if (eventName) {


      this.listeners.delete(
        eventName
      );


      return;


    }



    this.listeners.clear();


  }


}


export const eventBus =
  new EventBus();