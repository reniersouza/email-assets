// Objetivo: carregador de configurações JSON.
// Responsabilidade:
// - Carregar configurações da aplicação
// - Manter cache em memória
// - Controlar versão das configurações
// - Comunicar carregamento via Event Bus
//
// Dependências:
// constants.js
// events.js



import { APP_VERSION, EVENTS } from './constants.js';
import { eventBus } from './events.js';


const CONFIG_FILES = Object.freeze({

  settings:
    'assets/config/settings.json',


  themes:
    'assets/config/themes.json',


  templates:
    'assets/config/templates.json',


  icons:
    'assets/config/icons.json',

});

export class ConfigLoader {


  constructor() {


    this.cache =
      new Map();


    this.version =
      APP_VERSION;


  }


  getCacheKey(name) {


    return `${this.version}:${name}`;


  }

  getUrl(path) {


    return new URL(
      `../${path}`,
      import.meta.url
    ).href;


  }

  async load(name) {


    if (
      !Object.hasOwn(
        CONFIG_FILES,
        name
      )
    ) {


      throw new Error(
        `Configuração desconhecida: ${name}`
      );


    }

    const cacheKey =
      this.getCacheKey(
        name
      );



    if (
      this.cache.has(cacheKey)
    ) {


      return this.cache.get(
        cacheKey
      );


    }


    const response =
      await globalThis.fetch(

        this.getUrl(
          CONFIG_FILES[name]
        ),

        {
          cache:
            'no-cache',
        }

      );





    if (
      !response.ok
    ) {


      throw new Error(

        `Configuração indisponível: ${name} (${response.status})`

      );


    }

    const data =
      await response.json();


    this.cache.set(

      cacheKey,

      data

    );


    return data;


  }

  async loadAll() {


    const results =
      await Promise.allSettled(

        Object.keys(
          CONFIG_FILES
        )
        .map(

          async (name) => ({

            name,

            data:
              await this.load(
                name
              ),

          })

        )

      );


    const config =
      {};



    const errors =
      [];

    results.forEach(

      (result) => {


        if (
          result.status === 'fulfilled'
        ) {


          config[result.value.name] =
            result.value.data;


        }

        else {


          errors.push(
            result.reason
          );


        }


      }

    );

    eventBus.emit(

      EVENTS.CONFIG_LOADED,

      {

        version:
          this.version,


        config,


        errors,

      }

    );


    if (
      errors.length
    ) {


      throw new Error(

        `Falha ao carregar ${errors.length} configuração(ões).`

      );


    }

    return config;


  }

  clear() {


    this.cache.clear();


  }

  remove(name) {


    this.cache.delete(

      this.getCacheKey(
        name
      )

    );


  }


}

export const configLoader =
  new ConfigLoader();