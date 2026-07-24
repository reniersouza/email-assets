// Objetivo: roteamento por hash.
// Responsabilidade: controlar navegação local, foco e estado ARIA sem acoplar componentes.
// Dependências: constants.js, events.js e helpers.js.

import { EVENTS, ROUTES } from './constants.js';
import { eventBus } from './events.js';
import { $$ } from './helpers.js';

export class Router {
  start() {
    window.addEventListener('hashchange', () => this.resolve());
    this.resolve();
  }

  resolve() {
    const requestedRoute = window.location.hash.replace('#', '') || 'dados-pessoais';
    const route = ROUTES.includes(requestedRoute) ? requestedRoute : 'dados-pessoais';

    $$('[data-route]').forEach((link) => {
      link.setAttribute('aria-current', link.dataset.route === route ? 'page' : 'false');
    });

    document.getElementById(route)?.scrollIntoView({ block: 'nearest' });
    eventBus.emit(EVENTS.ROUTE_CHANGED, { route });
  }
}

export const router = new Router();
