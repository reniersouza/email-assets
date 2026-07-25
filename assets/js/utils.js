// Objetivo: utilidades puras compartilhadas.
// Responsabilidade:
// - Helpers de performance
// - Segurança de conteúdo
// - Manipulação comum sem acoplamento de negócio.
//
// Dependências:
// nenhuma.


const HTML_ESCAPE_MAP = Object.freeze({

  '&': '&amp;',

  '<': '&lt;',

  '>': '&gt;',

  '"': '&quot;',

  "'": '&#39;',

});

export function debounce(
  callback,
  delay = 250
) {


  let timerId = null;



  const debounced =
    (...args) => {


      if (timerId) {

        globalThis.clearTimeout(
          timerId
        );

      }



      timerId =
        globalThis.setTimeout(
          () => {

            timerId = null;

            callback(...args);

          },
          delay
        );


    };



  debounced.cancel =
    () => {


      if (timerId) {


        globalThis.clearTimeout(
          timerId
        );


        timerId = null;


      }


    };



  return debounced;


}


export function throttle(
  callback,
  limit = 250
) {


  let waiting = false;

  let timeoutId = null;



  const throttled =
    (...args) => {


      if (waiting) {

        return;

      }



      callback(...args);



      waiting = true;



      timeoutId =
        globalThis.setTimeout(
          () => {

            waiting = false;

            timeoutId = null;

          },
          limit
        );


    };



  throttled.cancel =
    () => {


      if (timeoutId) {


        globalThis.clearTimeout(
          timeoutId
        );


        timeoutId = null;


      }



      waiting = false;


    };



  return throttled;


}

export function escapeHtml(
  value = ''
) {


  return String(value)
    .replace(
      /[&<>'"]/g,
      (character) =>
        HTML_ESCAPE_MAP[character]
    );


}


export function sanitizeUrl(
  value = ''
) {


  try {


    const url =
      new URL(
        value,
        globalThis.location?.origin
      );



    const allowedProtocols = [

      'http:',

      'https:',

      'mailto:',

      'tel:',

    ];



    if (
      !allowedProtocols.includes(
        url.protocol
      )
    ) {

      return '#';

    }



    return url.href;


  }

  catch {


    return '#';


  }


}


export function createElement(
  tagName,
  attributes = {},
  textContent = ''
) {


  if (
    !globalThis.document
  ) {

    return null;

  }



  const element =
    document.createElement(
      tagName
    );



  Object.entries(attributes)
    .forEach(
      ([name, value]) => {


        if (
          value !== undefined &&
          value !== null
        ) {


          element.setAttribute(
            name,
            String(value)
          );


        }


      }
    );



  if (
    textContent !== ''
  ) {


    element.textContent =
      textContent;


  }



  return element;


}