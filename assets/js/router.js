// Objetivo: roteamento por hash.
// Responsabilidade:
// - Controlar navegação local
// - Atualizar estado visual dos links
// - Gerenciar foco e acessibilidade
// - Emitir mudanças de rota pelo EventBus
//
// Dependências:
// constants.js
// events.js
// helpers.js


import { EVENTS, ROUTES } from './constants.js';
import { eventBus } from './events.js';
import { $$ } from './helpers.js';


export class Router {


  constructor() {

    this.started = false;

    this.currentRoute = null;

    this.hashListener = null;

  }


  start() {


    if (this.started) {
      return;
    }



    this.started = true;



    this.hashListener =
      () => this.resolve();



    window.addEventListener(
      'hashchange',
      this.hashListener
    );



    this.resolve();


  }


  resolve() {


    const requestedRoute =
      window.location.hash
        .replace(/^#/, '')
        .split('?')[0]
        .trim();



    const route =
      ROUTES.includes(requestedRoute)
        ? requestedRoute
        : 'dados-pessoais';



    const previousRoute =
      this.currentRoute;



    this.currentRoute =
      route;



    this.updateNavigation(route);



    this.focusRoute(route);



    eventBus.emit(
      EVENTS.ROUTE_CHANGED,
      {
        route,
        previousRoute
      }
    );



    return route;


  }


  updateNavigation(route) {


    $$('[data-route]')
      .forEach((link) => {


        if (
          link.dataset.route === route
        ) {


          link.setAttribute(
            'aria-current',
            'page'
          );


        }

        else {


          link.removeAttribute(
            'aria-current'
          );


        }


      });


  }


  focusRoute(route) {


    const target =
      document.getElementById(
        route
      );



    if (!target) {
      return;
    }



    target.scrollIntoView({

      behavior:
        'smooth',

      block:
        'start'

    });


  }


  destroy() {


    if (
      this.hashListener
    ) {


      window.removeEventListener(
        'hashchange',
        this.hashListener
      );


    }



    this.hashListener = null;

    this.started = false;


  }


}








export const router =
  new Router();