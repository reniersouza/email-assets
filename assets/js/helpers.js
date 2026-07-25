// Objetivo: helpers para DOM e carregamento preguiçoso.
// Responsabilidade:
// - Reduzir repetição em consultas DOM.
// - Criar pontos comuns de acesso.
// - Gerenciar imports dinâmicos.
// - Controlar estados simples de interface.
//
// Dependências:
// logger.js.


import { logger } from './logger.js';

export function $(
  selector,
  scope = globalThis.document
) {


  if (
    !scope ||
    typeof scope.querySelector !== 'function'
  ) {

    return null;

  }



  try {


    return scope.querySelector(
      selector
    );


  }

  catch(error) {


    logger.warn(
      `Seletor inválido: ${selector}`,
      error
    );


    return null;


  }


}

export function $$(
  selector,
  scope = globalThis.document
) {


  if (
    !scope ||
    typeof scope.querySelectorAll !== 'function'
  ) {

    return [];

  }



  try {


    return Array.from(
      scope.querySelectorAll(
        selector
      )
    );


  }

  catch(error) {


    logger.warn(
      `Seletor inválido: ${selector}`,
      error
    );


    return [];


  }


}

export async function lazyImport(
  modulePath
) {


  logger.debug(
    `Carregando módulo sob demanda: ${modulePath}`
  );



  try {


    return await import(
      modulePath
    );


  }

  catch(error) {


    logger.error(
      `Falha ao carregar módulo: ${modulePath}`,
      error
    );


    throw error;


  }


}

export function setBusy(
  element,
  busy
) {


  if (
    !element ||
    typeof element.setAttribute !== 'function'
  ) {

    return;

  }

  element.setAttribute(

    'aria-busy',

    String(
      Boolean(busy)
    )

  );


}