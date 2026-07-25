// Objetivo: persistência local versionada.
// Responsabilidade:
// - Salvar configurações locais
// - Restaurar estado persistido
// - Resetar armazenamento
// - Controlar migrações de versão
//
// Dependências:
// constants.js
// events.js.

import {
  EVENTS,
  STORAGE_KEY,
  STORAGE_VERSION
} from './constants.js';

import {
  eventBus
} from './events.js';

const DEFAULT_STATE = Object.freeze({

  version:
    STORAGE_VERSION,


  updatedAt:
    null,


  settings: {

    theme:
      'auto',

  },

});

const clone = (value) => {


  if (
    typeof structuredClone === 'function'
  ) {


    return structuredClone(
      value
    );


  }



  return JSON.parse(
    JSON.stringify(value)
  );


};

export class StorageManager {


  constructor() {

    this.key =
      STORAGE_KEY;

    this.version =
      STORAGE_VERSION;

  }

  load() {


    const storage =
      globalThis.localStorage;



    if (!storage) {


      return clone(
        DEFAULT_STATE
      );


    }

    const rawValue =
      storage.getItem(
        this.key
      );

    if (!rawValue) {


      return clone(
        DEFAULT_STATE
      );


    }

    try {


      const parsed =
        JSON.parse(
          rawValue
        );



      return this.migrate(
        parsed
      );



    }

    catch(error) {


      return this.reset();


    }


  }


  save(settings = {}) {


    const current =
      this.load();


    const payload = {


      version:
        this.version,


      updatedAt:
        new Date()
          .toISOString(),



      settings: {


        ...DEFAULT_STATE.settings,


        ...current.settings,


        ...settings,


      },


    };

    const storage =
      globalThis.localStorage;

    if (storage) {


      storage.setItem(

        this.key,

        JSON.stringify(
          payload
        )

      );


    }


    eventBus.emit(

      EVENTS.STORAGE_CHANGED,

      payload

    );

    return payload;


  }

  reset() {


    const storage =
      globalThis.localStorage;


    if (storage) {


      storage.removeItem(
        this.key
      );


    }

    const state =
      clone(
        DEFAULT_STATE
      );


    eventBus.emit(

      EVENTS.STORAGE_CHANGED,

      state

    );

    return state;


  }

  migrate(data = {}) {


    if (

      data?.version ===
      this.version

    ) {


      return {


        ...clone(
          DEFAULT_STATE
        ),


        ...data,


        settings: {


          ...DEFAULT_STATE.settings,


          ...(data.settings ?? {}),


        },


      };


    }

    return this.runMigration(
      data
    );


  }

  runMigration(data = {}) {


    return {


      ...clone(
        DEFAULT_STATE
      ),



      settings: {


        ...DEFAULT_STATE.settings,


        ...(data?.settings ?? {}),


      },


    };


  }


}

export const storage =
  new StorageManager();