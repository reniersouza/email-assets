# OBJETIVONET Email Signature Generator

Aplicação Progressive Web App (PWA) para criação de assinaturas profissionais de e-mail compatíveis com os principais clientes de e-mail do mercado.

O projeto utiliza HTML5, CSS3 e JavaScript ES Modules, sem frameworks externos, seguindo uma arquitetura modular escalável.

---

# Status do Projeto

**Versão atual:** v0.6.0

**Status:**

✅ Fase 1 — Documentação
✅ Fase 2 — Foundation
✅ Fase 3 — Interface
✅ Fase 4A — Application State
✅ Fase 4B — Signature Engine
✅ Fase 5 — Assets
⏳ Fase 6 — Templates

---

Roadmap atual:

✅ Foundation

✅ UI

✅ Application State

✅ Signature Engine

✅ Assets

⏳ Templates

⏳ Advanced Features

⏳ PWA Final

⏳ Testing

⏳ Deploy

# Objetivo

Criar uma solução profissional para geração de assinaturas HTML com:

* Preview em tempo real.
* HTML compatível com clientes de e-mail.
* Arquitetura modular.
* Funcionamento como PWA.
* Suporte offline.
* Alta compatibilidade entre plataformas.

---

# Tecnologias

Utilizadas:

* HTML5
* CSS3
* JavaScript ES2023
* Progressive Web App
* LocalStorage
* IndexedDB
* Service Worker

Não utiliza:

* React
* Vue
* Angular
* Bootstrap
* Tailwind
* jQuery

---

# Arquitetura

O projeto segue arquitetura modular baseada em:

* Store central.
* Models.
* Services.
* Event Bus.
* Signature Engine.
* Renderers.
* Componentes independentes.

Documentação oficial:

docs/PROJECT_CONTEXT.md

docs/ROADMAP.md

docs/ARCHITECTURE.md

docs/CHANGELOG.md

docs/AI_RULES.md

---

## Estrutura do Projeto

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

---

# Instalação

Clone o repositório:

```bash
git clone https://github.com/reniersouza/email-assets.git
```

Entre no diretório:

```bash
cd email-assets
```

Instale as dependências:

```bash
npm install
```
# Executando o projeto

Inicie um servidor local:

```bash
npm start
```

A aplicação ficará disponível em:

```
http://localhost:4173
```

# Scripts

Iniciar servidor local:

```bash
npm start
```

Executar lint:

```bash
npm run lint
```

Verificar formatação:

```bash
npm run format
```

Executar testes:

```bash
npm test
```

---

# Planejamento do Projeto

O planejamento completo está documentado em:

* PROJECT_PLAN.md
* ROADMAP.md

---

# Desenvolvimento

Regras obrigatórias:

* Não alterar arquitetura sem ADR.
* Não criar dependências externas sem aprovação.
* Não duplicar módulos existentes.
* Preservar compatibilidade entre fases.
* Manter documentação sincronizada.

---

# Hospedagem

Destino:

Cloudflare Pages

Domínio planejado:

assinatura.objetivonet.com.br

Deploy automático através do GitHub.

---

# Objetivo Final

Entregar uma plataforma SaaS profissional para criação de assinaturas HTML, com arquitetura escalável, código sustentável, alta compatibilidade com clientes de e-mail e preparada para evolução contínua.

---

# Licença

Este projeto é distribuído sob a licença MIT.

Consulte o arquivo LICENSE para mais informações.
