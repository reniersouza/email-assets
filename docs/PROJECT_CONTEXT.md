# ObjetivoNET Email Signature Generator

## Project Context

**Versão do Documento:** 1.3.0

**Última Atualização:** 2026-07-24

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

---

# Estrutura Principal

```text
/
assets/
config/
docs/
tests/

index.html
manifest.json
service-worker.js
README.md
CHANGELOG.md
PROJECT_CONTEXT.md
ROADMAP.md
AI_RULES.md
ARCHITECTURE.md
```

## Estrutura JavaScript

```text
assets/js/

models/
signature-models.js
services/
core-services.js

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

## ⏳ Próxima Fase

### Fase 5 — Assets

Responsável pela implementação da biblioteca oficial de recursos estáticos da aplicação, incluindo favicon, ícones PWA, ícones sociais, logos, imagens, placeholders e fontes oficiais.

---

# Roadmap Atual

* ✅ Fase 1 — Documentação
* ✅ Fase 2 — Foundation
* ✅ Fase 3 — UI
* ✅ Fase 4A — Application State
* ✅ Fase 4B — Signature Engine
* ⏳ Fase 5 — Assets
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

**v0.5.0**

Status atual:

**Signature Engine concluído.**

Próximo marco:

**v0.6.0**

**Fase 5 — Assets**

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
