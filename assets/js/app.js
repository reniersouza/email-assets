// Objetivo: bootstrap principal da aplicação.
// Responsabilidade:
// - Inicializar Store
// - Restaurar estado persistido
// - Inicializar tema
// - Carregar configurações
// - Inicializar componentes
// - Registrar Service Worker
// - Preparar integração entre Core Layer e Interface
//
// Dependências:
// constants.js
// config.js
// events.js
// helpers.js
// logger.js
// router.js
// store.js


import { APP_VERSION, COMPONENTS, EVENTS } from './constants.js';
import { configLoader } from './config.js';
import { eventBus } from './events.js';
import { $, lazyImport, setBusy } from './helpers.js';
import { logger } from './logger.js';
import { router } from './router.js';
import { store } from './store.js';
import previewRenderer from './services/preview-renderer.js';


export class ThemeManager {


  constructor() {

    this.preference = 'auto';

    this.mediaQuery =
      window.matchMedia(
        '(prefers-color-scheme: dark)'
      );

    this.boundSystemTheme = null;

  }






  init() {


    const savedTheme =
      store.get(
        'theme.preference'
      ) ?? 'auto';



    this.apply(
      savedTheme,
      {
        persist: false
      }
    );



    this.bindSystemThemeListener();

    this.bindToggle();


  }







  bindSystemThemeListener() {


    if (!this.mediaQuery) {
      return;
    }



    this.boundSystemTheme = () => {


      if (
        this.preference === 'auto'
      ) {

        this.apply(
          'auto',
          {
            persist: false
          }
        );

      }


    };



    this.mediaQuery.addEventListener(
      'change',
      this.boundSystemTheme
    );


  }








  bindToggle() {


    $('#theme-toggle')
      ?.addEventListener(
        'click',
        () => this.cycle()
      );


  }







  cycle() {


    const nextTheme =
      {
        auto: 'light',
        light: 'dark',
        dark: 'auto'
      }[
        this.preference
      ] ?? 'auto';



    this.apply(
      nextTheme
    );


  }







  apply(
    preference,
    {
      persist = true
    } = {}
  ) {


    this.preference =
      preference;



    document.documentElement.dataset.theme =
      preference;



    document.documentElement.style.colorScheme =
      this.resolveColorScheme(
        preference
      );




    if (persist) {


      store.dispatch(
        'updateField',
        {
          path:
            'theme.preference',

          value:
            preference
        }
      );


    }






    const button =
      document.querySelector(
        '#theme-toggle'
      );



    if (button) {


      button.replaceChildren(
        document.createTextNode(
          `Tema: ${
            preference.charAt(0).toUpperCase()
          }${
            preference.slice(1)
          }`
        )
      );


    }






    eventBus.emit(
      EVENTS.THEME_CHANGED,
      {
        theme:
          preference
      }
    );


  }







  resolveColorScheme(
    preference
  ) {


    if (
      preference === 'auto'
    ) {


      return this.mediaQuery.matches
        ? 'dark'
        : 'light';


    }



    return preference;


  }


}









export class App {



  constructor(
    {
      root = $('#app')
    } = {}
  ) {


    this.root =
      root;


    this.themeManager =
      new ThemeManager();



    this.started =
      false;


  }








  async start() {


    if (
      this.started
    ) {


      logger.warn(
        'Aplicação já inicializada.'
      );


      return;


    }




    this.started =
      true;






    try {


      logger.info(
        `Inicializando versão ${APP_VERSION}`
      );



      setBusy(
        this.root,
        true
      );






      await this.restoreState();




      this.themeManager.init();




      router.start();




      await this.loadConfig();




      await this.loadComponents();


// Inicializa sistema de Preview
  previewRenderer.registerEvents();

  previewRenderer.render();


  this.registerServiceWorker();


  this.finishStartup();


    }

    catch(error) {


      logger.error(
        'Falha no bootstrap',
        error
      );



      this.root?.setAttribute(
        'data-state',
        'error'
      );


    }

    finally {


      setBusy(
        this.root,
        false
      );


    }


  }








  async restoreState() {


    try {


      await store.dispatch(
        'hydrate'
      );


      logger.info(
        'Estado restaurado.'
      );


    }

    catch(error) {


      logger.warn(
        'Falha ao restaurar estado.',
        error
      );


    }


  }








  async loadConfig() {


    try {


      await configLoader.loadAll();



      logger.info(
        'Configurações carregadas.'
      );


    }

    catch(error) {


      logger.warn(
        'Falha ao carregar configurações.',
        error
      );


    }


  }








  async loadComponents() {



    const components =
      [
        ...COMPONENTS
      ];




    for (
      const componentName of components
    ) {


      try {


        await lazyImport(
          `../components/${componentName}/${componentName}.js`
        );



        logger.info(
          `Componente carregado: ${componentName}`
        );


      }

      catch(error) {


        logger.error(
          `Falha ao carregar componente ${componentName}`,
          error
        );


      }


    }


  }








  registerServiceWorker() {


    if (
      !('serviceWorker' in navigator)
    ) {


      logger.warn(
        'Service Worker não suportado.'
      );


      return;


    }






    navigator.serviceWorker
      .register(
        './service-worker.js'
      )

      .then(
        registration => {


          logger.info(
            'Service Worker registrado.',
            registration.scope
          );


        }

      )

      .catch(
        error => {


          logger.warn(
            'Falha ao registrar Service Worker.',
            error
          );


        }

      );


  }

  

  finishStartup() {


    this.root?.setAttribute(
      'data-state',
      'ready'
    );




    store.commit(
      'SET_FIELD',
      {
        path:
          'application.ready',

        value:
          true
      },
      {
        persist:
          false
      }
    );






    eventBus.emit(
      EVENTS.APP_READY,
      {
        version:
          APP_VERSION
      }
    );



    eventBus.emit(
      EVENTS.APPLICATION_READY,
      {
        version:
          APP_VERSION
      }
    );


  }


}







export const app =
  new App();




app.start();