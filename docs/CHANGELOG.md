# CHANGELOG

Todas as alterações relevantes deste projeto serão documentadas neste arquivo.

O projeto segue Semantic Versioning (SemVer).

---

## [0.7.0] - 2026-07-25

### 🎉 Em desenvolvimento

* ⏳ Fase 6 — Templates

### ✨ Implementado

* Infraestrutura inicial de Templates.
* Criação do BaseTemplate.
* Criação do Template Registry.
* Registro centralizado dos templates disponíveis.
* Templates configuracionais:
  * Gravatar
  * ObjetivoNET
  * Google
  * Microsoft
  * Apple
  * Executivo
  * Dark

### 🧪 Testes

* Validação do carregamento dos módulos ES.
* Validação do Template Registry.
* Validação da recuperação dos IDs dos templates.

### 🏗️ Arquitetura

- Documentada oficialmente a camada `Templates`.
- Documentada a estrutura `assets/js/templates/`.
- Adicionada a definição arquitetural do `Template Service`.
- Atualizada a arquitetura para suportar seleção dinâmica de templates.

### 🔧 Melhorias de Infraestrutura

- Correção do caminho do favicon para compatibilidade com hospedagem em subdiretórios (GitHub Pages).
- Aprimoramento do Service Worker para ignorar requisições com protocolos não suportados (`chrome-extension://`, entre outros).
- Validação das respostas da rede antes do armazenamento em cache.
- Armazenamento em cache restrito a respostas da própria origem da aplicação (`networkResponse.type === 'basic'`).

## [0.7.1] - 2026-07-28

Correções realizadas durante a estabilização da Fase 6.

Concluído

- Correção da integração entre Store e Signature Engine.
- Criação do modelo demo inicial para Preview.
- HtmlRenderer ajustado para utilizar exclusivamente o modelo normalizado.
- Correção da aplicação de estilos provenientes do Template.
- Correção da renderização dos contatos.
- Correção da renderização das redes sociais.
- Correção do Preview inicial.
- Remoção de valores padrão hardcoded do HtmlRenderer.

---

## [0.6.0] - 2026-07-24

### 🎉 Concluído

* ✅ Fase 5 — Assets

### ✨ Implementado

* Estrutura oficial de assets.
* Ícones PWA (`assets/icons/icon-192.svg`, `assets/icons/icon-512.svg`).
* Favicon (`favicon.ico`).
* Ícones sociais (`assets/social/github.svg`, `assets/social/linkedin.svg`).
* Placeholders (`assets/placeholders/profile-placeholder.svg`, `assets/placeholders/logo-placeholder.svg`).
* Preparação para imagens (`assets/images/`) e fontes (`assets/fonts/`).
* Integração dos assets com Manifest e Service Worker.

### 🧪 Testes

* Validação dos arquivos estáticos.
* Validação PWA.
* Verificação de carregamento dos assets.

### 🔧 Auditoria Técnica Pós-Implementação

Foi realizada uma auditoria completa da arquitetura após a conclusão da Fase 5, contemplando revisão, padronização e correção dos principais módulos da aplicação.

#### Correções realizadas

* Revisão do bootstrap da aplicação (`app.js`).
* Revisão da arquitetura do Event Bus.
* Revisão do sistema de configuração (`config.js`).
* Revisão do roteador interno (`router.js`).
* Revisão dos componentes principais da interface.
* Revisão do Signature Engine.
* Revisão dos Core Services.
* Revisão do sistema de persistência.
* Correção dos caminhos relativos para compatibilidade com GitHub Pages.
* Correção do carregamento dos arquivos de configuração JSON.
* Correção do sistema de temas (Light, Dark e Auto).
* Correção do Service Worker e da estratégia de cache.
* Padronização da estrutura dos componentes.
* Ajustes de consistência entre Store, Preview e Code Viewer.
* Eliminação de erros identificados no Console durante a inicialização.

#### Resultado

* Aplicação inicializando sem erros.
* Sistema de temas estabilizado.
* Service Worker funcional.
* Estrutura preparada para a implementação da Fase 6 (Templates).

---

## [0.5.0] - 2026-07-24

### 🎉 Concluído

* ✅ Fase 4B – Signature Engine

### ✨ Implementado

* Signature Engine desacoplado da interface consumindo exclusivamente o Store e a Validation Engine.
* Layout Engine com suporte inicial aos layouts Horizontal, Vertical e Compacto.
* Style Engine para gerenciamento centralizado de estilos reutilizados pelo Preview e HTML Renderer.
* HTML Renderer compatível com clientes de e-mail, sem JavaScript, com escape de caracteres especiais, remoção automática de campos vazios e estrutura preparada para CSS inline.
* Preview integrado ao fluxo Store → Signature Engine → Renderer → Preview com debounce, cache interno e prevenção de renderizações desnecessárias.
* Infraestrutura de exportação HTML e Clipboard reutilizando integralmente o HTML Renderer.
* Integração completa com o Event Bus utilizando eventos padronizados:

  * SIGNATURE_UPDATED
  * PREVIEW_UPDATED
  * HTML_RENDERED
  * LAYOUT_CHANGED
  * STYLE_CHANGED
  * RENDER_COMPLETED

### 🧪 Testes

* Testes básicos para:

  * Signature Engine
  * Layout Engine
  * Style Engine
  * HTML Renderer
  * Preview Renderer
  * Integração com Store
  * Integração com Event Bus
  * Infraestrutura de Exportação

---

## [0.4.0] - 2026-07-24

### 🎉 Concluído

* ✅ Fase 4A – Application State (Core Application Layer)

### ✨ Implementado

* Store central sem dependências externas com State, Getters, Actions, Mutations, Subscribers, Observers, Dispatch, Commit, Watch, Snapshot e Restore.
* Modelos independentes para Pessoa, Empresa, Foto, Redes Sociais, Tema, Estilo, Layout, Configurações, Validação e Aplicação.
* Serviços desacoplados para Persistência, Validação, Tema, Histórico, Eventos, Configuração, Logger, Imagem, Clipboard e Notificações.
* Sincronização automática entre estado, validação, Preview State, Event Bus, Observers, Histórico e Persistência.
* Undo/Redo, Checkpoint, Snapshot e Restore com limite configurável.
* Persistência utilizando IndexedDB com fallback para LocalStorage.
* Validação em tempo real para e-mail, telefone, WhatsApp, URLs, GitHub, LinkedIn e campos obrigatórios.

### 🧪 Testes

* Testes básicos para Store, Validation, History, Storage, Theme, Observers e Event Bus.

---

## [0.3.0] - 2026-07-24

### 🎉 Concluído

* ✅ Fase 1 – Documentação e Arquitetura
* ✅ Fase 2 – Fundação da Aplicação
* ✅ Fase 3 – Interface do Usuário

### ✨ Implementado

* Estrutura completa da Progressive Web App (PWA).
* Interface responsiva.
* Layout principal.
* Sistema de componentes.
* Header.
* Sidebar.
* Editor.
* Preview estrutural.
* Code Viewer.
* Footer.
* Sistema de temas.
* Responsividade.
* Estrutura de navegação.
* Base para Event Bus.
* Base para LocalStorage.
* Base para IndexedDB.
* Service Worker.
* Manifest.
* Bootstrap da aplicação.

### 🔄 Alterações Arquiteturais

* Reorganização do Roadmap.
* Criação da Fase exclusiva para Assets.
* Divisão da antiga Fase 4 em:

  * Fase 4A – Application State
  * Fase 4B – Signature Engine
* Remoção dos arquivos binários da Fase 2.
* Adiamento dos Assets para a Fase 5.
* Inclusão da documentação técnica oficial.

### 📚 Documentação

Atualizados:

* ROADMAP.md
* PROJECT_CONTEXT.md
* AI_RULES.md
* CHANGELOG.md

---

# Próxima Versão

## [0.8.0]

### Fase 7 — Recursos avançados

Objetivos:

* QR Code.
* vCard.
* Favoritos.
* Histórico avançado.
* Importação.
* Exportação estendida.
* Recursos adicionais.
