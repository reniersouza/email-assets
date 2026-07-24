# ObjetivoNET Email Signature Generator

# ARCHITECTURE

**Versão:** 1.0.0

**Última atualização:** 2026-07-24

---

# Objetivo

Este documento descreve a arquitetura oficial do projeto.

Seu objetivo é registrar as decisões arquiteturais permanentes, definir responsabilidades entre módulos e orientar futuras implementações.

Este documento complementa:

- PROJECT_CONTEXT.md
- ROADMAP.md
- AI_RULES.md

Em caso de conflito, alterações arquiteturais somente poderão ocorrer mediante uma Architectural Decision Record (ADR).

---

# Princípios Arquiteturais

O projeto foi desenvolvido seguindo os princípios:

- SOLID
- DRY
- KISS
- Separation of Concerns
- Clean Code

Toda implementação deverá preservar esses princípios.

---

# Arquitetura Geral

A aplicação utiliza arquitetura modular baseada em JavaScript ES Modules.

Não são utilizados frameworks.

Todo módulo possui responsabilidade única.

A comunicação ocorre através do Event Bus.

O estado da aplicação permanece centralizado no Store.

---

# Estrutura Oficial

```
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

```
assets/js/

models/
services/

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

Esta estrutura é considerada oficial.

Não reorganizar diretórios existentes.

---

# Responsabilidades

## Store

Responsável pelo estado global da aplicação.

Todo dado permanente deve permanecer centralizado no Store.

Nenhum componente pode armazenar estado próprio referente aos dados da assinatura.

---

## Models

Representam os domínios da aplicação.

Cada Model deve possuir responsabilidade única.

---

## Services

Implementam regras de negócio reutilizáveis.

Não devem manipular interface diretamente.

---

## Event Bus

Toda comunicação entre módulos deve ocorrer através do Event Bus.

É proibido acoplamento direto entre componentes.

Fluxo:

```
Componente
    ↓
Store
    ↓
Event Bus
    ↓
Subscribers
```

---


## Signature Engine

Responsável por transformar o Application State em uma representação normalizada da assinatura.

Regras obrigatórias:

- Consumir dados exclusivamente do Store.
- Utilizar os Models e a Validation Engine existentes.
- Remover campos vazios e campos inválidos antes da renderização.
- Não acessar componentes da interface.
- Disponibilizar a mesma estrutura para Preview, HTML Renderer e infraestrutura de exportação.

## Layout Engine

Responsável por resolver a estrutura lógica de layout da assinatura.

Layouts suportados nesta fase:

- horizontal
- vertical
- compacto

Novos layouts deverão ser adicionados sem alterar os layouts existentes.

## Style Engine

Responsável por resolver tokens visuais reutilizáveis, incluindo cores, tipografia, espaçamentos, alinhamentos, bordas, separadores, ícones e foto.

A lógica visual permanece desacoplada do Signature Engine.

## HTML Renderer e Preview Renderer

O HTML Renderer gera HTML sem JavaScript, sem dependências externas, com caracteres escapados e preparado para CSS inline.

O Preview Renderer consome obrigatoriamente o fluxo:

```
Store
↓
Signature Engine
↓
Renderer
↓
Preview
```

## Eventos da Fase 4B

- SIGNATURE_UPDATED: assinatura normalizada atualizada.
- PREVIEW_UPDATED: preview atualizado com HTML renderizado.
- HTML_RENDERED: HTML da assinatura gerado.
- LAYOUT_CHANGED: reservado para alterações de layout.
- STYLE_CHANGED: reservado para alterações de estilo.
- RENDER_COMPLETED: ciclo de renderização concluído.

## Interface

A interface deve apenas consumir dados.

Não deve conter regras de negócio.

Não deve realizar persistência.

---

## Persistência

A persistência utiliza:

- IndexedDB
- LocalStorage (fallback)

O acesso deve ocorrer exclusivamente através dos serviços responsáveis.

---

# Fluxo da Aplicação

```
Usuário

↓

Interface

↓

Store

↓

Services

↓

Event Bus

↓

Renderização
```

Toda alteração deve passar pelo Store.

---

# Fluxo de Renderização

```
Application State

↓

Signature Engine

↓

Preview

↓

HTML Renderer
```

O Signature Engine será responsável por transformar o estado da aplicação em uma representação da assinatura.

---

# Convenções

- ES Modules
- Uma responsabilidade por arquivo
- Componentes reutilizáveis
- Nomes descritivos
- Comentários apenas quando agregarem valor
- Evitar duplicação de código

---

# Restrições

É proibido:

- adicionar frameworks
- reorganizar diretórios
- substituir módulos existentes
- criar dependências externas sem aprovação
- duplicar funcionalidades existentes

---

# Evolução Arquitetural

A evolução prevista é:

```
Fase 4A
Application State
        │
        ▼
Fase 4B
Signature Engine
        │
        ▼
Fase 5
Assets
        │
        ▼
Fase 6
Templates
        │
        ▼
Fase 7
Advanced Features
        │
        ▼
Fase 8
PWA Final
```

Novas fases deverão reutilizar integralmente a infraestrutura construída nas fases anteriores.

---

# Architectural Decision Records (ADR)

Qualquer alteração estrutural deverá ser registrada através de uma ADR antes da implementação.

Enquanto não existir uma ADR aprovada, esta arquitetura deve ser considerada definitiva.
