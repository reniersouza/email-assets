// Objetivo: modelos de domínio da assinatura.
// Responsabilidade:
// - Prover valores padrão
// - Validar dados do domínio
// - Serializar e desserializar modelos
//
// Dependências:
// nenhuma.

const clone = (value) => {

  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value));

};



const merge = (defaults, value = {}) => {

  return {
    ...clone(defaults),
    ...(value ?? {}),
  };

};

export class BaseModel {

  static defaults = {};



  static from(data = {}) {

    return merge(
      this.defaults,
      data
    );

  }



  static serialize(data = {}) {

    return clone(
      this.from(data)
    );

  }



  static deserialize(data = {}) {

    return this.from(data);

  }



  static validate() {

    return [];

  }

}

export class PersonModel extends BaseModel {


  static defaults = {

    name: '',

    role: '',

    department: '',

    email: '',

    phone: '',

    whatsapp: '',

  };



  static validate(data = {}) {

    const errors = [];



    if (!data.name?.trim()) {

      errors.push({

        field:
          'signature.person.name',

        message:
          'Nome é obrigatório.',

      });

    }



    if (!data.email?.trim()) {

      errors.push({

        field:
          'signature.person.email',

        message:
          'Email é obrigatório.',

      });

    }



    return errors;

  }

}

export class CompanyModel extends BaseModel {


  static defaults = {

    name:
      'ObjetivoNET',

    website:
      '',

    address:
      '',

    city:
      '',

    country:
      'Brasil',

  };

}

export class PhotoModel extends BaseModel {


  static defaults = {

    url:
      '',

    alt:
      '',

    enabled:
      false,

    size:
      96,

  };

}

export class SocialModel extends BaseModel {


  static defaults = {

    items:
      [],

  };



  static from(data = {}) {

    return {

      items:
        Array.isArray(data.items)

          ? clone(data.items)

          : [],

    };

  }

}

export class ThemeModel extends BaseModel {


  static defaults = {

    preference:
      'auto',

    resolved:
      'light',

  };



  static validate(data = {}) {

    const allowed = [

      'light',

      'dark',

      'auto',

    ];



    if (
      allowed.includes(
        data.preference
      )
    ) {

      return [];

    }



    return [

      {

        field:
          'theme.preference',

        message:
          'Tema inválido.',

      },

    ];

  }

}

export class StyleModel extends BaseModel {


  static defaults = {

    primaryColor:
      '#0f62fe',

    textColor:
      '#1f2937',

    mutedColor:
      '#4b5563',

    fontFamily:
      'Arial, sans-serif',

    fontSize:
      14,

    spacing:
      8,

    alignment:
      'left',

    borderColor:
      '#e5e7eb',

    separator:
      '•',

    iconColor:
      '#0f62fe',

    photoRadius:
      48,

  };

}

export class LayoutModel extends BaseModel {


  static defaults = {

    variant:
      'horizontal',

    spacing:
      'normal',

    photoPosition:
      'left',

  };

}

export class SettingsModel extends BaseModel {


  static defaults = {

    autoSave:
      true,

    autoSaveDelay:
      350,

    historyLimit:
      50,

    locale:
      'pt-BR',

  };

}

export class ValidationModel extends BaseModel {


  static defaults = {

    valid:
      false,

    errors:
      [],

    warnings:
      [],

    touched:
      {},

  };

}

export class ApplicationModel extends BaseModel {


  static defaults = {

    ready:
      false,

    busy:
      false,

    route:
      'dados-pessoais',

    lastError:
      null,

    updatedAt:
      null,

  };

}

export const MODEL_REGISTRY = Object.freeze({

  PersonModel,

  CompanyModel,

  PhotoModel,

  SocialModel,

  ThemeModel,

  StyleModel,

  LayoutModel,

  SettingsModel,

  ValidationModel,

  ApplicationModel,

});