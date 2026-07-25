A FASE 1 DO PROJETO FOI CONCLUÍDA.

Toda a documentação, arquitetura, roadmap, especificações técnicas, requisitos funcionais e não funcionais, estrutura de módulos e regras de negócio já foram aprovados.

A partir deste momento NÃO gere mais documentação.

Você deverá iniciar a implementação do projeto.

======================================================================

PAPEL

======================================================================

Você atuará como Tech Lead responsável por iniciar a construção da aplicação.

Todo código deverá seguir rigorosamente a documentação criada anteriormente.

Nunca altere a arquitetura.

Nunca simplifique requisitos.

Nunca utilize pseudo-código.

Nunca omita arquivos.

Todo código deverá ser funcional.

======================================================================

OBJETIVO DA FASE 2

======================================================================

Criar toda a fundação do projeto.

Ao final desta fase o projeto deverá estar totalmente estruturado e pronto para iniciar o desenvolvimento das funcionalidades.

Esta fase NÃO deverá implementar ainda:

Gerador HTML

Preview

Templates

Assinaturas

Exportações

Essas funcionalidades pertencem às próximas fases.

======================================================================

IMPLEMENTAR

======================================================================

Criar toda a estrutura do projeto.

Criar todas as pastas.

Criar todos os arquivos.

Criar toda a arquitetura.

Criar todas as configurações iniciais.

Criar todo o sistema base.

======================================================================

ESTRUTURA

======================================================================

/

index.html

manifest.json

service-worker.js

robots.txt

404.html

favicon.ico

README.md

LICENSE

CHANGELOG.md

package.json

.gitignore

/editorconfig

.prettierrc

.eslintrc

/assets

/css

base.css

layout.css

components.css

themes.css

utilities.css

animations.css

responsive.css

/js

app.js

router.js

config.js

constants.js

storage.js

events.js

helpers.js

utils.js

logger.js

/components

Header

Sidebar

Editor

Preview

CodeViewer

Toolbar

Footer

Modal

Notification

Loader

Toast

ThemeSwitcher

ColorPicker

Button

Input

Card

Accordion

Tabs

Dialog

/templates

/data

/icons

/images

/fonts

/config

settings.json

themes.json

templates.json

icons.json

======================================================================

HTML

======================================================================

Criar o index.html completo.

Utilizar HTML5 semântico.

Adicionar:

Header

Sidebar

Editor

Preview

Code Viewer

Footer

Todas as áreas vazias porém totalmente funcionais.

Utilizar landmarks.

Adicionar ARIA.

Adicionar Meta Tags.

Adicionar favicon.

Adicionar Manifest.

Adicionar Theme Color.

Adicionar Viewport.

Adicionar OpenGraph.

Adicionar Twitter Cards.

======================================================================

CSS

======================================================================

Criar toda a base CSS.

Reset.

Normalize.

Variáveis CSS.

Sistema de cores.

Sistema tipográfico.

Sistema de espaçamento.

Grid da aplicação.

Dark Mode.

Light Mode.

Responsividade.

Transições.

Animações leves.

======================================================================

JAVASCRIPT

======================================================================

Criar o bootstrap da aplicação.

Criar:

App

Router

Storage

Logger

Utilities

Config

Theme Manager

Event Bus

Todos deverão funcionar.

Mesmo que ainda não possuam regras de negócio.

======================================================================

LOCAL STORAGE

======================================================================

Implementar módulo responsável por:

Salvar

Restaurar

Resetar

Versionar configurações.

======================================================================

THEME MANAGER

======================================================================

Criar sistema completo.

Light

Dark

Auto

Salvar preferência.

Ler preferência.

Alterar automaticamente conforme sistema operacional.

======================================================================

SERVICE WORKER

======================================================================

Criar completamente.

Cache First.

Offline.

Atualização.

Versionamento.

Estrutura pronta para futuras funcionalidades.

======================================================================

MANIFEST

======================================================================

Criar completo.

Nome.

Short Name.

Theme Color.

Background Color.

Standalone.

Ícones.

Atalhos.

Categorias.

======================================================================

COMPONENTES

======================================================================

Criar todos os componentes.

Mesmo vazios.

Cada componente deverá possuir:

HTML

CSS

JS

Organização.

======================================================================

SISTEMA DE CONFIGURAÇÕES

======================================================================

Criar módulo responsável por carregar:

themes.json

settings.json

templates.json

icons.json

Preparar para carregamento dinâmico.

======================================================================

LOG

======================================================================

Criar Logger.

Níveis:

Info

Warn

Error

Debug

======================================================================

EVENT BUS

======================================================================

Criar sistema de comunicação entre módulos.

Nenhum componente deverá acessar outro diretamente.

Toda comunicação deverá ocorrer através do Event Bus.

======================================================================

PADRÕES

======================================================================

ES Modules.

SOLID.

DRY.

KISS.

Clean Code.

Separation of Concerns.

======================================================================

PERFORMANCE

======================================================================

Lazy Loading.

Code Splitting.

Modules.

Debounce.

Throttle.

======================================================================

SEGURANÇA

======================================================================

Preparar:

Content Security Policy.

Referrer Policy.

Permissions Policy.

Escapar HTML.

Sanitização.

======================================================================

ACESSIBILIDADE

======================================================================

WCAG AA.

ARIA.

Focus Ring.

Keyboard Navigation.

Screen Readers.

======================================================================

QUALIDADE

======================================================================

Todo arquivo deverá conter comentários.

Explicando:

Objetivo.

Responsabilidade.

Dependências.

======================================================================

ENTREGA

======================================================================

Entregar TODOS os arquivos completos.

Nunca omitir arquivos.

Nunca resumir.

Nunca dizer "continua".

Ao final desta fase o projeto deverá abrir normalmente no navegador.

A estrutura deverá estar pronta para iniciar imediatamente a Fase 3.

Nenhuma funcionalidade da Fase 3 deverá ser implementada agora.

Caso a quantidade de código seja muito grande, divida automaticamente a entrega em partes sequenciais mantendo a continuidade, sem repetir código e sem omitir arquivos.

Cada parte deve resultar em um projeto funcional ao ser combinada com as anteriores.
