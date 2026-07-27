// Objetivo: constantes compartilhadas da aplicação.
// Responsabilidade:
// - Centralizar versões
// - Chaves de armazenamento
// - Rotas
// - Eventos globais
// - Componentes registrados
//
// Dependências: nenhuma.



export const APP_NAME =
  'OBJETIVONET Email Signature Generator';



export const APP_VERSION =
  '0.6.0';

export const STORAGE_VERSION =
  2;

export const STORAGE_KEY =
  'objetivonet.signature.settings';

export const THEME_KEY =
  'objetivonet.theme.preference';


export const ROUTES = Object.freeze([

  'dados-pessoais',

  'foto',

  'redes-sociais',

  'personalizacao',

  'templates',

  'preview',

  'exportacao',

  'configuracoes',

  'sobre',

  'code',

]);


export const EVENTS = Object.freeze({



  // Application

  APP_READY:
    'app:ready',


  APPLICATION_READY:
    'application:ready',


  // Components

  COMPONENT_READY:
    'component:ready',


  // Configuration

  CONFIG_LOADED:
    'config:loaded',


  CONFIG_UPDATED:
    'config:updated',


  // Navigation

  ROUTE_CHANGED:
    'route:changed',


  // Storage

  STORAGE_CHANGED:
    'storage:changed',


  // Theme

  THEME_CHANGED:
    'theme:changed',


  // State

  STATE_UPDATED:
    'state:updated',


  FIELD_CHANGED:
    'field:changed',


  // Validation

  VALIDATION_UPDATED:
    'validation:updated',


  // Media

  IMAGE_CHANGED:
    'image:changed',


  // Signature Engine

  SIGNATURE_UPDATED:
    'signature:updated',



  // Rendering

  PREVIEW_UPDATED:
    'preview:updated',


  HTML_RENDERED:
    'html:rendered',


  RENDER_COMPLETED:
    'render:completed',


  // Layout / Style

  LAYOUT_CHANGED:
    'layout:changed',


  STYLE_CHANGED:
    'style:changed',


  // Templates

  TEMPLATE_SELECTED:
    'template:selected',



  // Export

  EXPORT_STARTED:
    'export:started',


  EXPORT_COMPLETED:
    'export:completed',


  EXPORT_FAILED:
    'export:failed',


  // History

  HISTORY_CHANGED:
    'history:changed',


  UNDO_AVAILABLE:
    'undo:available',


  REDO_AVAILABLE:
    'redo:available',


  // Notifications

  NOTIFICATION_PUSHED:
    'notification:pushed',


});


// Componentes carregados automaticamente pelo App bootstrap.
//
// Caminho esperado:
//
// assets/js/components/
// └── NomeComponente/
//     └── NomeComponente.js
//
// Componentes futuros podem permanecer registrados,
// desde que o arquivo exista.

export const COMPONENTS = Object.freeze([

  'Header',

  'Sidebar',

  'Editor',

  'ValidationFeedback',

  'Preview',

  'CodeViewer',

  'Footer',

]);