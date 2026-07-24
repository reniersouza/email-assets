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

  settings: 'assets/config/settings.json',

  themes: 'assets/config/themes.json',

  templates: 'assets/config/templates.json',

  icons: 'assets/config/icons.json',

});


export class ConfigLoader {

  constructor() {

    this.cache = new Map();

    this.version = APP_VERSION;

  }


  async load(name) {


    if (!Object.hasOwn(CONFIG_FILES, name)) {

      throw new Error(
        `Configuração desconhecida: ${name}`
      );

    }


    const cacheKey = `${this.version}:${name}`;


    if (this.cache.has(cacheKey)) {

      return this.cache.get(cacheKey);

    }


    const response = await window.fetch(
      CONFIG_FILES[name],
      {
        cache: 'no-cache',
      }
    );


    if (!response.ok) {

      throw new Error(
        `Configuração indisponível: ${name}`
      );

    }


    const data = await response.json();


    this.cache.set(
      cacheKey,
      data
    );


    return data;

  }



  async loadAll() {


    const entries = await Promise.all(

      Object.keys(CONFIG_FILES)
        .map(
          async (name) => [
            name,
            await this.load(name),
          ]
        )

    );


    const config = Object.fromEntries(entries);


    eventBus.emit(
      EVENTS.CONFIG_LOADED,
      {
        version: this.version,
        config,
      }
    );


    return config;

  }

}


export const configLoader = new ConfigLoader();
