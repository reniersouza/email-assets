// Objetivo: logger padronizado.
// Responsabilidade:
// - Publicar mensagens nos níveis debug, info, warn e error.
// - Centralizar diagnóstico da aplicação.
// - Facilitar rastreamento de eventos e falhas.
//
// Dependências:
// constants.js


import { APP_NAME } from './constants.js';


const LEVEL_PRIORITY = Object.freeze({

  debug: 10,

  info: 20,

  warn: 30,

  error: 40,

});


export class Logger {


  constructor({

    enabled = true,

    level = 'debug',

  } = {}) {


    this.enabled = enabled;

    this.level =
      Object.hasOwn(
        LEVEL_PRIORITY,
        level
      )
        ? level
        : 'debug';


  }



  setLevel(level) {


    if (
      Object.hasOwn(
        LEVEL_PRIORITY,
        level
      )
    ) {


      this.level = level;


    }


  }


  enable() {


    this.enabled = true;


  }


  disable() {


    this.enabled = false;


  }



  shouldWrite(level) {


    return (

      this.enabled &&

      Object.hasOwn(
        LEVEL_PRIORITY,
        level
      ) &&

      LEVEL_PRIORITY[level] >=
      LEVEL_PRIORITY[this.level]

    );


  }


  write(level, message, context) {


    if (
      !this.shouldWrite(level)
    ) {

      return;

    }



    const timestamp =
      new Date()
        .toISOString();



    const prefix =
      `[${APP_NAME}]`;



    const meta =
      `${timestamp} ${prefix} ${message}`;



    const payload =
      context === undefined
        ? ''
        : context;



    const method =
      console[level]
      ??
      console.log;



    method.call(
      console,
      meta,
      payload
    );


  }



  debug(message, context) {


    this.write(
      'debug',
      message,
      context
    );


  }


  info(message, context) {


    this.write(
      'info',
      message,
      context
    );


  }


  warn(message, context) {


    this.write(
      'warn',
      message,
      context
    );


  }


  error(message, context) {


    this.write(
      'error',
      message,
      context
    );


  }


}

export const logger =
  new Logger();