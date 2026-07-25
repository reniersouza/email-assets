# OBJETIVONET Email Signature Generator — Plano Mestre do Projeto

Este documento estabelece a visão de longo prazo do **OBJETIVONET Email Signature Generator**, definindo seus objetivos, arquitetura, organização do código, princípios de desenvolvimento e critérios globais de qualidade.

Diferentemente do **ROADMAP.md**, este documento não acompanha o andamento das fases. Seu objetivo é registrar a arquitetura oficial e servir como referência permanente para a evolução do projeto.

---

# 1. Visão Geral

O OBJETIVONET Email Signature Generator é uma Progressive Web App (PWA) desenvolvida para criar assinaturas HTML profissionais compatíveis com os principais clientes de e-mail do mercado.

A aplicação foi projetada para ser totalmente estática, modular, escalável e independente de frameworks, utilizando exclusivamente tecnologias nativas da Web.

Seu desenvolvimento ocorre por fases incrementais, garantindo que cada etapa seja funcional, testável e documentada antes do avanço para a próxima.

---

# 2. Objetivos do Projeto

O projeto possui como objetivos principais:

* gerar assinaturas HTML compatíveis com clientes de e-mail;
* oferecer preview em tempo real;
* permitir personalização completa do layout;
* utilizar arquitetura modular desacoplada;
* funcionar como Progressive Web App;
* possuir suporte offline;
* permitir futura expansão para recursos premium;
* manter alta compatibilidade entre navegadores e plataformas.

---

# 3. Princípios Arquiteturais

O projeto segue os seguintes princípios:

* Arquitetura modular.
* Responsabilidade única por módulo.
* Baixo acoplamento.
* Alta coesão.
* Código reutilizável.
* Componentização.
* Evolução incremental.
* Documentação sincronizada.
* Compatibilidade com clientes de e-mail.
* Ausência de frameworks JavaScript.

Toda nova funcionalidade deverá respeitar estes princípios.

---

# 4. Arquitetura da Aplicação

A aplicação está organizada em camadas independentes.

## Shell PWA

Responsável por:

* inicialização da aplicação;
* instalação da PWA;
* manifest;
* Service Worker;
* cache offline;
* versionamento dos assets.

---

## Interface

Responsável por:

* componentes HTML;
* formulários;
* preview;
* navegação;
* layout responsivo;
* temas;
* acessibilidade.

---

## Estado Global

Responsável por:

* Store central;
* gerenciamento do estado;
* histórico;
* persistência;
* validações;
* sincronização entre módulos.

---

## Domínio

Responsável por:

* modelos da aplicação;
* motor de geração da assinatura;
* templates;
* regras de negócio.

---

## Serviços

Responsáveis por:

* persistência;
* validações;
* histórico;
* tema;
* clipboard;
* notificações;
* imagens;
* configuração;
* eventos;
* logging.

---

## Qualidade

Responsável por:

* testes;
* validações;
* compatibilidade;
* acessibilidade;
* segurança;
* documentação.

---

# 5. Estrutura Oficial do Projeto

```text
/
assets/
config/
docs/
signatures/
tests/

404.html
favicon.ico
index.html
LICENSE
manifest.json
package.json
PROJECT_PLAN.md
README.md
robots.txt
service-worker.js
```

---

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

A pasta **models** concentra os modelos de domínio da aplicação.

A pasta **services** concentra serviços reutilizáveis desacoplados da interface.

O arquivo **core-services.js** reúne os serviços fundamentais do projeto:

* StorageService
* ValidationService
* HistoryService
* ThemeService
* ImageService
* ClipboardService
* NotificationService
* LoggerService
* EventService
* ConfigService

Novos serviços devem seguir o princípio da responsabilidade única.

---

## Estrutura de Assets

```text
assets/

components/
config/
css/
fonts/
icons/
images/
js/
placeholders/
social/
```

Toda expansão futura deverá preservar esta organização.

---

# 6. Tecnologias Utilizadas

## Linguagens

* HTML5
* CSS3
* JavaScript ES2023

## APIs

* LocalStorage
* IndexedDB
* Service Worker
* Cache API
* Clipboard API
* Fetch API

## Progressive Web App

* Manifest
* Offline Cache
* Instalação
* Atualização controlada

---

# 7. Compatibilidade

O HTML produzido deverá permanecer compatível com:

* Gmail
* Outlook
* Outlook Web
* Apple Mail
* Thunderbird
* Yahoo Mail
* Zoho Mail

A assinatura gerada deverá utilizar:

* tabelas HTML;
* CSS inline;
* imagens compatíveis;
* estrutura compatível com clientes tradicionais.

Não será permitido utilizar no HTML exportado:

* JavaScript;
* CSS externo;
* Flexbox;
* CSS Grid;
* Position Absolute.

---

# 8. Segurança

O projeto deverá manter:

* escape HTML;
* sanitização de URLs;
* validação dos dados;
* políticas de segurança do navegador;
* armazenamento controlado;
* prevenção de XSS sempre que aplicável.

---

# 9. Estratégia de Evolução

O desenvolvimento é incremental.

Cada fase somente poderá ser considerada concluída quando:

* estiver funcional;
* possuir documentação atualizada;
* possuir testes compatíveis com a fase;
* preservar compatibilidade com fases anteriores.

O andamento detalhado das entregas encontra-se exclusivamente em:

* ROADMAP.md
* CHANGELOG.md
* PROJECT_CONTEXT.md

---

# 10. Critérios Globais de Qualidade

Todo código deverá seguir os seguintes critérios:

* arquitetura modular;
* responsabilidade única;
* documentação sincronizada;
* nomenclatura consistente;
* baixo acoplamento;
* alta legibilidade;
* ausência de duplicação;
* comentários apenas quando agregarem valor;
* componentes reutilizáveis;
* compatibilidade entre módulos.

---

# 11. Governança da Arquitetura

Alterações estruturais deverão obedecer às seguintes regras:

* não reorganizar diretórios existentes sem justificativa arquitetural;
* não introduzir dependências externas sem aprovação;
* não duplicar funcionalidades já existentes;
* preservar compatibilidade entre versões;
* registrar decisões arquiteturais relevantes por meio de ADRs quando necessário.

---

# 12. Documentação Oficial

A documentação oficial do projeto é composta pelos seguintes arquivos:

* README.md
* PROJECT_CONTEXT.md
* ROADMAP.md
* CHANGELOG.md
* ARCHITECTURE.md
* AI_RULES.md
* PROJECT_PLAN.md

Cada documento possui uma responsabilidade específica e deve permanecer sincronizado com os demais.

---

# 13. Visão de Longo Prazo

O objetivo final do projeto é entregar uma plataforma profissional para geração de assinaturas HTML, preparada para crescimento contínuo, alta compatibilidade com clientes de e-mail, arquitetura sustentável e manutenção de longo prazo.

Toda evolução futura deverá preservar os princípios estabelecidos neste documento.
