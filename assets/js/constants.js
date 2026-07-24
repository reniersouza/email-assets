// Objetivo: constantes compartilhadas da aplicação.
// Responsabilidade: centralizar versões, chaves, rotas e nomes de eventos.
// Dependências: nenhuma.

export const APP_NAME = 'OBJETIVONET Email Signature Generator';
export const APP_VERSION = '0.1.0';
export const STORAGE_VERSION = 1;
export const STORAGE_KEY = 'objetivonet.signature.settings';
export const THEME_KEY = 'objetivonet.theme.preference';

export const ROUTES = Object.freeze(['dados-pessoais', 'foto', 'redes-sociais', 'personalizacao', 'templates', 'preview', 'exportacao', 'configuracoes', 'sobre', 'code']);

export const EVENTS = Object.freeze({
  APP_READY: 'app:ready',
  COMPONENT_READY: 'component:ready',
  CONFIG_LOADED: 'config:loaded',
  ROUTE_CHANGED: 'route:changed',
  STORAGE_CHANGED: 'storage:changed',
  THEME_CHANGED: 'theme:changed',
});

export const COMPONENTS = Object.freeze([
  'Header',
  'Sidebar',
  'Editor',
  'Preview',
  'CodeViewer',
  'Toolbar',
  'Footer',
  'Modal',
  'Notification',
  'Loader',
  'Toast',
  'ThemeSwitcher',
  'ColorPicker',
  'Button',
  'Input',
  'Card',
  'Accordion',
  'Tabs',
  'Dialog',
]);
