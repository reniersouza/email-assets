# ObjetivoNET Email Signature Generator

## Project Context

**Versão do Documento:** 1.1.0

**Última Atualização:** 2026

---

# Visão Geral

ObjetivoNET Email Signature Generator é uma Progressive Web App (PWA) desenvolvida para gerar assinaturas HTML profissionais compatíveis com os principais clientes de e-mail do mercado.

O projeto é destinado à produção e será publicado no domínio oficial da ObjetivoNET.

---

# Objetivos

- Gerar assinaturas HTML compatíveis com clientes de e-mail.
- Permitir personalização completa.
- Oferecer preview em tempo real.
- Gerar HTML limpo com CSS inline.
- Compatibilidade máxima com Gmail, Outlook, Zoho, Apple Mail e demais clientes.
- Ser uma Progressive Web App instalável.
- Funcionar offline após o primeiro acesso.
- Possuir arquitetura escalável e modular.

---

# Tecnologias

- HTML5
- CSS3
- JavaScript ES2023
- Progressive Web App
- LocalStorage
- IndexedDB
- Service Worker

Não utilizar:

- React
- Vue
- Angular
- Bootstrap
- Tailwind
- jQuery

---

# Arquitetura

A arquitetura definida na Fase 1 NÃO deve ser alterada.

O projeto utiliza arquitetura modular baseada em componentes.

Separação de responsabilidades obrigatória.

Estrutura baseada em módulos independentes.

Cada módulo possui responsabilidade única.

---

# Estrutura Principal

/
assets/
components/
config/
css/
data/
docs/
fonts/
icons/
images/
js/
templates/

manifest.json

service-worker.js

index.html

README.md

CHANGELOG.md

---

# Estado Atual do Projeto

## Fase 1

Status:

✅ Concluída

Escopo:

- Documentação
- Arquitetura
- Roadmap
- Especificações

---

## Fase 2

Status:

✅ Concluída

Escopo:

- Fundação da aplicação
- Bootstrap
- Configuração
- PWA Base
- Componentes
- Service Worker
- Manifest
- Local Storage
- IndexedDB
- Logger
- Event Bus

Observação:

Arquivos binários foram removidos desta fase.

---

## Fase 3

Status:

✅ Concluída

Escopo:

- Interface completa
- Layout
- Sidebar
- Header
- Editor
- Preview (estrutura)
- Code Viewer
- Footer
- Dark Mode
- Responsividade

---

## Próxima Fase

Fase 4A

Application State

---

# Roadmap Atual

## ✅ Fase 1

Documentação

## ✅ Fase 2

Foundation

## ✅ Fase 3

UI

## ⏳ Fase 4A

Application State

## ⏳ Fase 4B

Signature Engine

## ⏳ Fase 5

Assets

## ⏳ Fase 6

Templates

## ⏳ Fase 7

Advanced Features

## ⏳ Fase 8

PWA Final

## ⏳ Fase 9

Testing

## ⏳ Fase 10

Deploy

---

# Decisões Arquiteturais

## Arquitetura

Não modificar.

## Componentes

Sempre reutilizar componentes existentes.

Nunca duplicar componentes.

## Comunicação

Todos os módulos comunicam-se através do Event Bus.

Não acessar módulos diretamente.

## Estado

A partir da Fase 4A todo o estado da aplicação deverá ser centralizado.

Nenhum componente deverá armazenar estado próprio que represente dados da assinatura.

---

# Convenções

- ES Modules
- SOLID
- DRY
- KISS
- Clean Code
- Separation of Concerns

---

# Padrões de Código

- Uma responsabilidade por módulo.
- Funções pequenas.
- Código comentado.
- Nomes descritivos.
- Sem duplicação.
- Componentes reutilizáveis.

---

# Compatibilidade da Assinatura

O HTML gerado deverá ser compatível com:

- Gmail
- Google Workspace
- Outlook Desktop
- Outlook Web
- Microsoft 365
- Apple Mail
- Zoho Mail
- Yahoo Mail
- Thunderbird
- Proton Mail
- Fastmail
- Roundcube

Nunca utilizar recursos incompatíveis com clientes de e-mail.

---

# Regras Importantes

Nunca alterar fases concluídas.

Nunca modificar arquitetura sem ADR.

Nunca mover arquivos existentes sem justificativa.

Nunca criar dependências externas sem aprovação.

Nunca utilizar frameworks.

---

# Fluxo de Desenvolvimento

Toda nova fase deverá:

1. Utilizar o código existente.
2. Atualizar somente os arquivos necessários.
3. Preservar compatibilidade.
4. Não quebrar funcionalidades anteriores.
5. Manter arquitetura modular.

---

# Controle de Versões

Marco atual:

v0.3.0

Status:

UI Completa

Próximo marco:

v0.4.0

Application State

---

# Hospedagem

Destino:

Cloudflare Pages

Domínio:

assinatura.objetivonet.com.br

Deploy automático via GitHub.

---

# Qualidade

Objetivos Lighthouse:

Performance >95

Accessibility >95

Best Practices >95

SEO >95

PWA >95

---

# Objetivo Final

Ao término do projeto a aplicação deverá possuir qualidade equivalente a uma solução SaaS comercial.

O código deverá ser modular, documentado, escalável, pronto para manutenção e preparado para futuras expansões sem necessidade de reestruturação da arquitetura.
