# ObjetivoNET Email Signature Generator

# ARCHITECTURE

**Versão:** 1.2.0

**Última atualização:** 2026-07-25

---

# Objetivo

Este documento descreve a arquitetura oficial do projeto.

Seu objetivo é registrar as decisões arquiteturais permanentes, definir responsabilidades entre módulos e orientar futuras implementações.

Este documento complementa:

* PROJECT_CONTEXT.md
* ROADMAP.md
* AI_RULES.md

Em caso de conflito, alterações arquiteturais somente poderão ocorrer mediante uma Architectural Decision Record (ADR).

---

# Princípios Arquiteturais

O projeto foi desenvolvido seguindo os princípios:

* SOLID
* DRY
* KISS
* Separation of Concerns
* Clean Code

Toda implementação deverá preservar esses princípios.

---

# Arquitetura Geral

A aplicação utiliza arquitetura modular baseada em JavaScript ES Modules.

Não são utilizados frameworks.

Todo módulo possui responsabilidade única.

Toda comunicação ocorre através do Event Bus.

Todo estado da aplicação permanece centralizado no Store.

Toda renderização é derivada do estado da aplicação.

---

# Estrutura Oficial

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

A pasta `models` concentra os modelos de domínio da aplicação.

A pasta `services` concentra serviços desacoplados utilizados pela aplicação.

Os serviços podem ser agrupados quando possuem responsabilidades relacionadas, mantendo baixo acoplamento entre os módulos.

O arquivo `core-services.js` concentra os serviços fundamentais da aplicação, incluindo:

- StorageService
- ValidationService
- HistoryService
- ThemeService
- ImageService
- ClipboardService
- NotificationService
- LoggerService
- EventService
- ConfigService

O arquivo `signature-engine.js` concentra a infraestrutura de geração da assinatura HTML, incluindo:

- Signature Engine
- Layout Engine
- Style Engine
- HTML Renderer
- Preview Renderer
- Pipeline de renderização

Novos módulos devem respeitar o princípio da responsabilidade única (SRP), permanecer desacoplados da interface e reutilizar a infraestrutura existente.

Esta estrutura é considerada oficial.

Novos módulos deverão integrar-se a esta organização.

Nunca reorganizar diretórios existentes sem aprovação por meio de uma Architectural Decision Record (ADR).

---

# Camadas da Aplicação

A arquitetura está organizada nas seguintes camadas:

## Interface Layer

Responsável apenas pela interação com o usuário.

Não contém regras de negócio.

Não realiza persistência.

Não armazena estado permanente.

---

## Core Application Layer

Responsável por todo o funcionamento interno da aplicação.

Inclui:

* Store
* Models
* Services
* Validation Engine
* History Engine
* Theme Engine
* Storage Engine
* Event Bus

Esta camada foi implementada na Fase 4A.

---

## Signature Engine Layer

Responsável por transformar o Application State em uma representação normalizada da assinatura.

Inclui:

* Signature Engine
* Layout Engine
* Style Engine

Esta camada foi implementada na Fase 4B.

---

## Rendering Layer

Responsável pela geração dos resultados derivados da assinatura.

Inclui:

* Preview Renderer
* HTML Renderer

Ambos utilizam exclusivamente a saída do Signature Engine.

---

## Assets Layer

Implementada na Fase 5.

Responsável por:

* favicon
* ícones PWA
* ícones sociais
* placeholders
* imagens
* fontes
* integração com Manifest
* integração com Service Worker
* Responsável pela infraestrutura de recursos estáticos reutilizados por toda a aplicação.

Todos os Assets são consumidos exclusivamente pelos Renderers e Templates.

Nenhum Asset deve conter lógica de negócio.

---

## Templates Layer

Próxima camada arquitetural.

Será responsável por definir exclusivamente a apresentação visual das assinaturas.

Cada Template deverá:

- consumir apenas a saída do Signature Engine;
- não acessar diretamente o Store;
- não implementar regras de negócio;
- reutilizar Layout Engine e Style Engine;
- gerar HTML compatível com clientes de e-mail.

---

# Responsabilidades

## Store

Responsável pelo estado global da aplicação.

Todo dado permanente deve permanecer centralizado no Store.

Nenhum componente pode armazenar estado próprio referente aos dados da assinatura.

---

## Models

Representam os domínios da aplicação.

Cada Model possui responsabilidade única.

São responsáveis por:

* valores padrão
* serialização
* desserialização
* validação estrutural

---

## Services

Implementam regras reutilizáveis da aplicação.

Não manipulam interface diretamente.

Toda persistência deve ocorrer através dos Services.

---

## Event Bus

Toda comunicação entre módulos ocorre através do Event Bus.

É proibido acoplamento direto entre componentes.

Fluxo:

```text
Interface
    ↓
Store
    ↓
Event Bus
    ↓
Subscribers
```

---

## Signature Engine

Responsável por transformar o estado da aplicação em uma assinatura normalizada.

Regras obrigatórias:

* consumir dados exclusivamente do Store;
* utilizar os Models e Validation Engine;
* remover campos vazios;
* remover dados inválidos;
* não acessar componentes da interface;
* disponibilizar estrutura única para Preview e HTML Renderer.

---

## Layout Engine

Resolve exclusivamente a estrutura lógica da assinatura.

Layouts suportados:

* Horizontal
* Vertical
* Compacto

Novos layouts deverão ser adicionados sem alterar os existentes.

---

## Style Engine

Resolve os tokens visuais reutilizados por toda a aplicação.

Inclui:

* cores
* tipografia
* espaçamentos
* alinhamentos
* bordas
* separadores
* foto
* ícones

Toda lógica visual permanece desacoplada do Signature Engine.

---

## Preview Renderer

Responsável apenas pela renderização do Preview.

Nunca modifica o estado da aplicação.

Nunca realiza persistência.

---

## HTML Renderer

Responsável pela geração do HTML compatível com clientes de e-mail.

Regras obrigatórias:

* HTML sem JavaScript
* escape de caracteres
* remoção de campos vazios
* preparado para CSS inline
* sem dependências externas

---

## Persistência

A persistência utiliza:

* IndexedDB
* LocalStorage (fallback)

O acesso ocorre exclusivamente através dos Services.

---

# Fluxo Principal da Aplicação

```text
Usuário
      ↓
Interface
      ↓
Store
      ↓
Validation Engine
      ↓
Event Bus
      ↓
Signature Engine
      ↓
Layout Engine
      ↓
Style Engine
      ↓
      ├──────────────┐
      ▼              ▼
Preview Renderer   HTML Renderer
```

Toda alteração deve obrigatoriamente passar pelo Store.

---

# Arquitetura Consolidada (v0.6.0)

Ao término da Fase 5 foi realizada uma auditoria técnica completa da arquitetura.

Resultado:

- nenhuma alteração estrutural foi necessária;
- a arquitetura originalmente definida permaneceu válida;
- apenas ajustes internos de implementação foram realizados;
- todos os módulos centrais passaram a ser considerados estáveis.

Os módulos auditados incluem:

* Config Loader
* Store
* Storage
* Models
* Core Services
* Signature Engine
* HTML Renderer
* Preview Renderer
* Theme Engine
* Service Worker

---

# Fluxo de Renderização

```text
Application State
        ↓
Signature Engine
      ↙     ↘
Preview     HTML Renderer
Renderer
```

O Preview Renderer e o HTML Renderer utilizam exatamente a mesma representação da assinatura.

Isso garante consistência entre Preview e HTML exportado.

---

# Eventos Padronizados

## Application State

* STATE_UPDATED
* FIELD_CHANGED
* CONFIG_UPDATED
* VALIDATION_UPDATED
* THEME_CHANGED

## Signature Engine

* SIGNATURE_UPDATED
* LAYOUT_CHANGED
* STYLE_CHANGED

## Rendering

* PREVIEW_UPDATED
* HTML_RENDERED
* RENDER_COMPLETED

---

# Convenções

* ES Modules
* Uma responsabilidade por arquivo
* Componentes reutilizáveis
* Nomes descritivos
* Comentários apenas quando agregarem valor
* Evitar duplicação de código
* Reutilizar implementações existentes sempre que possível

---

# Restrições

É proibido:

* adicionar frameworks;
* reorganizar diretórios;
* substituir módulos existentes;
* criar dependências externas sem aprovação;
* duplicar funcionalidades existentes;
* acessar diretamente o estado fora do Store;
* criar comunicação direta entre módulos sem o Event Bus.

---

# Evolução Arquitetural

```text
Fase 1
Documentação
        │
        ▼
Fase 2
Foundation
        │
        ▼
Fase 3
UI
        │
        ▼
Fase 4A
Core Application Layer
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
        │
        ▼
Fase 9
Testing
        │
        ▼
Fase 10
Deploy
```

Cada fase deve reutilizar integralmente a infraestrutura construída nas fases anteriores.

---

# Estado Arquitetural

Arquitetura considerada estável.

Os próximos incrementos do projeto deverão reutilizar integralmente a infraestrutura existente.

Não há previsão de novas camadas arquiteturais além das já definidas.

As próximas fases adicionarão funcionalidades sem modificar a arquitetura principal.

----

# Architectural Decision Records (ADR)

Qualquer alteração estrutural deverá ser registrada através de uma ADR antes da implementação.

Enquanto não existir uma ADR aprovada, esta arquitetura deve ser considerada definitiva.
