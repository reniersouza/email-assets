// Objetivo: controlador do componente Editor.
// Responsabilidade: conectar campos da interface ao Store, renderizar elementos dinâmicos
// do editor e controlar interações de templates/redes sociais sem regras de negócio.
// Dependências: ../../js/constants.js, ../../js/events.js e ../../js/store.js.

import { EVENTS } from '../../js/constants.js';
import { eventBus } from '../../js/events.js';
import { store } from '../../js/store.js';


const SOCIAL_NETWORKS = [
  'LinkedIn',
  'GitHub',
  'Instagram',
  'Facebook',
  'Threads',
  'X',
  'TikTok',
  'YouTube',
  'Discord',
  'Telegram',
  'Behance',
  'Dribbble',
  'Pinterest',
  'Medium',
  'Mastodon',
  'WhatsApp'
];


const TEMPLATES = [
  'Gravatar',
  'ObjetivoNET',
  'Google',
  'Microsoft',
  'Apple',
  'Executivo',
  'Dark'
];


export class EditorComponent {

  constructor(
    root = document.querySelector('[data-component="Editor"]')
  ) {

    this.name = 'Editor';

    this.root = root;

    this.listeners = [];

  }



  init() {

    if (!this.root) {
      return;
    }


    this.bindFields();

    this.renderSocialNetworks();

    this.renderTemplates();


    this.root.dataset.ready = 'true';


    eventBus.emit(
      EVENTS.COMPONENT_READY,
      {
        name: this.name
      }
    );

  }

  bindFields() {

    const fields =
      this.root.querySelectorAll('[data-field]');


    fields.forEach((field) => {


      const handler = () => {

        const path = field.dataset.field;


        let value = field.value;


        if (field.type === 'checkbox') {
          value = field.checked;
        }


        store.dispatch(
          'updateField',
          {
            path,
            value
          }
        );

      };



      field.addEventListener(
        'input',
        handler
      );


      field.addEventListener(
        'change',
        handler
      );



      this.listeners.push(
        {
          element: field,
          handler
        }
      );


    });

  }


  renderSocialNetworks() {


    const container =
      this.root?.querySelector('.social-grid');



    if (!container) {
      return;
    }



    if (container.children.length) {
      return;
    }



    container.innerHTML =
      SOCIAL_NETWORKS
      .map(
        (network, index) => `

<div
  class="social-item"
  draggable="true"
>


<span
  class="drag-handle"
  aria-hidden="true"
>
⋮⋮
</span>



<label>

<input
  type="checkbox"
  data-field="signature.socials.items.${index}.enabled"
/>


<span
  class="social-icon"
  aria-hidden="true"
>
${network.charAt(0)}
</span>


${network}


</label>




<input
  type="hidden"
  data-field="signature.socials.items.${index}.network"
  value="${network}"
/>




<input
  type="url"
  data-field="signature.socials.items.${index}.url"
  aria-label="URL ${network}"
  placeholder="https://${network.toLowerCase()}.com/usuario"
/>




<button
  type="button"
  data-social-action="${network}"
  aria-pressed="false"
>
Ativar
</button>


<span
  class="order-badge"
  aria-label="Ordem ${index + 1}"
>
${index + 1}
</span>



</div>

`
      )
      .join('');



    this.bindFields();


    this.bindSocialButtons();

  }


  bindSocialButtons() {


    const buttons =
      this.root.querySelectorAll(
        '[data-social-action]'
      );



    buttons.forEach((button) => {


      const handler = () => {


        const active =
          button.getAttribute('aria-pressed') === 'true';



        button.setAttribute(
          'aria-pressed',
          String(!active)
        );



        const checkbox =
          button
          .closest('.social-item')
          ?.querySelector(
            'input[type="checkbox"]'
          );



        if (checkbox) {

          checkbox.checked = !active;


          checkbox.dispatchEvent(
            new Event(
              'change',
              {
                bubbles: true
              }
            )
          );

        }


      };



      button.addEventListener(
        'click',
        handler
      );


      this.listeners.push(
        {
          element: button,
          handler
        }
      );


    });


  }

  renderTemplates() {


    const container =
      this.root?.querySelector(
        '.template-grid'
      );



    if (!container) {
      return;
    }



    if (container.children.length) {
      return;
    }



    container.innerHTML =
      TEMPLATES
      .map(
        (template) => `


<button
  type="button"
  class="template-card"
  data-template="${template}"
>

<span
  class="template-thumb"
>

<span></span>

<span></span>

<span></span>

</span>


<strong>
Template ${template}
</strong>



<small>
Miniatura demonstrativa
</small>



</button>


`
      )
      .join('');



    this.bindTemplates();

  }

  bindTemplates() {


    const buttons =
      this.root.querySelectorAll(
        '[data-template]'
      );



    buttons.forEach((button) => {


      const handler = () => {


        eventBus.emit(
          EVENTS.TEMPLATE_SELECTED,
          {
            template:
              button.dataset.template
          }
        );


      };



      button.addEventListener(
        'click',
        handler
      );



      this.listeners.push(
        {
          element: button,
          handler
        }
      );


    });


  }

  destroy() {


    this.listeners.forEach(
      ({
        element,
        handler
      }) => {

        element.removeEventListener(
          'input',
          handler
        );


        element.removeEventListener(
          'change',
          handler
        );


        element.removeEventListener(
          'click',
          handler
        );

      }
    );



    this.listeners = [];

  }


}






const instance =
  new EditorComponent();



instance.init();



export default instance;