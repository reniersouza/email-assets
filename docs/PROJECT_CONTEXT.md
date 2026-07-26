# ObjetivoNET Email Signature Generator

## Project Context

**Versão do Documento:** 1.4.0

**Última Atualização:** 2026-07-25

---

# Visão Geral

ObjetivoNET Email Signature Generator é uma Progressive Web App (PWA) desenvolvida para gerar assinaturas HTML profissionais compatíveis com os principais clientes de e-mail do mercado.

O projeto é destinado à produção e será publicado no domínio oficial da ObjetivoNET.

---

# Objetivos

* Gerar assinaturas HTML compatíveis com clientes de e-mail.
* Permitir personalização completa.
* Oferecer preview em tempo real.
* Gerar HTML limpo com CSS inline.
* Compatibilidade máxima com Gmail, Outlook, Microsoft 365, Apple Mail, Zoho Mail e demais clientes.
* Ser uma Progressive Web App instalável.
* Funcionar offline após o primeiro acesso.
* Possuir arquitetura escalável, modular e de fácil manutenção.

---

# Tecnologias

* HTML5
* CSS3
* JavaScript ES2023
* Progressive Web App (PWA)
* LocalStorage
* IndexedDB
* Service Worker

## Não utilizar

* React
* Vue
* Angular
* Bootstrap
* Tailwind CSS
* jQuery
* Dependências externas sem aprovação.

---

# Arquitetura

A arquitetura aprovada na Fase 1 é definitiva e não deve ser alterada sem uma Architectural Decision Record (ADR).

O projeto utiliza arquitetura modular baseada em componentes independentes e responsabilidades bem definidas.

Todos os módulos devem respeitar os princípios:

* SOLID
* DRY
* KISS
* Separation of Concerns
* Clean Code

# Estado da Arquitetura

Arquitetura considerada estável.

Todos os módulos centrais foram auditados e aprovados para evolução do projeto.

Módulos consolidados:

* Store
* Event Bus
* Config Loader
* Storage
* Validation
* Signature Engine
* Layout Engine
* Style Engine
* HTML Renderer
* Preview Renderer
* Export Service
* Asset Pipeline
* Service Worker

As próximas fases deverão concentrar-se apenas em adicionar funcionalidades sobre esta base, evitando alterações estruturais.

---

# Estrutura Principal

```text
/
assets/
├── components/
├── config/
├── css/
├── fonts/
├── icons/
├── images/
├── js/
├── placeholders/
└── social/

config/
docs/
├── adr/

signatures/
tests/

404.html
favicon.ico
index.html
LICENSE
manifest.json
package.json
README.md
robots.txt
service-worker.js
```

## Estrutura JavaScript

```text
assets/js/

models/
└── signature-models.js

services/
├── core-services.js
└── signature-engine.js

app.js
config.js
constants.js
events.js
helpers.js
logger.js
router.js
storage.js
store.js
utils.js
```

Os serviços principais da aplicação permanecem centralizados no módulo `core-services.js`, mantendo baixo acoplamento e separação de responsabilidades.

Esta estrutura é considerada oficial.

Novos módulos deverão integrar-se a ela.

Nunca reorganizar diretórios existentes.

---

# Estado Atual do Projeto

## ✅ Fase 1 — Planejamento e Arquitetura

Concluída.

---

## ✅ Fase 2 — Fundação

Concluída.

Inclui:

* Bootstrap
* Configuração
* Manifest
* Service Worker
* Event Bus
* Logger
* LocalStorage
* IndexedDB

---

## ✅ Fase 3 — Interface

Concluída.

Inclui:

* Header
* Sidebar
* Editor
* Preview estrutural
* Footer
* Responsividade
* Dark Mode

---

## ✅ Fase 4A — Application State

Concluída.

Inclui:

* Store central
* Models
* Services
* Validation Engine
* Persistência
* Histórico
* Undo / Redo
* Auto Save
* Event Bus integrado
* Sincronização automática do estado

---

## ✅ Fase 4B — Signature Engine

Concluída.

Inclui:

* Signature Engine
* Layout Engine
* Style Engine
* HTML Renderer
* Preview Renderer
* Integração completa com Store
* Integração completa com Event Bus
* Infraestrutura de Exportação HTML
* Infraestrutura de Clipboard

---

## ✅ Fase 5 — Assets

Concluída.

Inclui:

* Ícones PWA (`icon-192.svg`, `icon-512.svg`)
* Favicon (`favicon.ico`)
* Ícones sociais (GitHub, LinkedIn)
* Placeholders (foto de perfil, logo)
* Estrutura preparada para imagens e fontes
* Integração completa com Manifest, Config Loader e Service Worker.
* Deploy automático via GitHub.

---

# ✅ Auditoria Técnica (v0.6.0)

Concluída.

Ao término da Fase 5 foi realizada uma auditoria completa da base de código com foco em arquitetura, organização dos módulos, consistência visual e preparação para a Fase 6.

Principais resultados:

* Revisão da arquitetura dos serviços centrais.
* Padronização dos Models.
* Revisão completa do Signature Engine.
* Revisão do sistema de Config Loader.
* Revisão do Storage.
* Revisão do sistema de temas (Light / Dark / Auto).
* Revisão dos arquivos CSS principais.
* Correção do Service Worker.
* Correção de caminhos de assets.
* Eliminação de inconsistências encontradas durante os testes.

A auditoria não alterou a arquitetura definida na Fase 1, apenas consolidou e refinou sua implementação.

---

## ⏳ Próxima Fase

### Fase 6 — Templates

Responsável pela implementação dos templates oficiais reutilizando integralmente o Signature Engine, Layout Engine, Style Engine, HTML Renderer e Asset Pipeline.

Cada template deverá possuir:

* Estrutura HTML própria.
* Estilo visual independente.
* Compatibilidade máxima com clientes de e-mail.
* Reutilização integral do estado da aplicação.
* Zero duplicação de lógica.

---

# Roadmap Atual

* ✅ Fase 1 — Documentação
* ✅ Fase 2 — Foundation
* ✅ Fase 3 — UI
* ✅ Fase 4A — Application State
* ✅ Fase 4B — Signature Engine
* ✅ Fase 5 — Assets
* ⏳ Fase 6 — Templates
* ⏳ Fase 7 — Advanced Features
* ⏳ Fase 8 — PWA Final
* ⏳ Fase 9 — Testing
* ⏳ Fase 10 — Deploy

---

# Decisões Arquiteturais

* Nunca alterar a arquitetura sem ADR.
* Reutilizar componentes sempre que possível.
* Evitar duplicação de código.
* Toda comunicação entre módulos deve ocorrer através do Event Bus.
* Todo estado da aplicação deve permanecer centralizado no Store.
* Componentes não devem armazenar dados permanentes da assinatura.

---

# Compatibilidade

O HTML produzido deverá ser compatível com:

* Gmail
* Google Workspace
* Outlook Desktop
* Outlook Web
* Microsoft 365
* Apple Mail
* Zoho Mail
* Yahoo Mail
* Thunderbird
* Proton Mail
* Fastmail
* Roundcube

Nunca utilizar recursos incompatíveis com clientes de e-mail.

---

# Fluxo de Desenvolvimento

Toda nova fase deverá:

1. Reutilizar código existente.
2. Atualizar apenas os arquivos necessários.
3. Preservar compatibilidade.
4. Não quebrar funcionalidades anteriores.
5. Manter a documentação sincronizada com a implementação.

---

# Controle de Versões

Versão atual:

**v0.6.0**

Status atual:

**Fase 5 concluída.**

**Arquitetura auditada e consolidada.**

**Pronto para início da Fase 6 — Templates.**

Próximo marco:

**v0.7.0**

**Fase 6 — Templates**

---

# Hospedagem

Cloudflare Pages

Domínio oficial:

assinatura.objetivonet.com.br

Deploy automático via GitHub.

---

# Metas de Qualidade

Lighthouse:

* Performance ≥ 95
* Accessibility ≥ 95
* Best Practices ≥ 95
* SEO ≥ 95
* PWA ≥ 95

---

# Objetivo Final

Entregar uma solução SaaS profissional para geração de assinaturas HTML, com arquitetura escalável, documentação completa, alta compatibilidade entre clientes de e-mail e preparada para evolução contínua sem necessidade de reestruturação da base do projeto.
