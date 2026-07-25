# OBJETIVONET Email Signature Generator

Aplicação Progressive Web App (PWA) para criação de assinaturas profissionais de e-mail compatíveis com os principais clientes de e-mail do mercado.

O projeto utiliza HTML5, CSS3 e JavaScript ES Modules, sem frameworks externos, seguindo uma arquitetura modular escalável.

---

# Status do Projeto

**Versão atual:** v0.5.0

**Status:**

✅ Fase 1 — Documentação
✅ Fase 2 — Foundation
✅ Fase 3 — Interface
✅ Fase 4A — Application State
✅ Fase 4B — Signature Engine
✅ Fase 5 — Assets
⏳ Fase 6 — Templates

---

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

* PROJECT_CONTEXT.md
* AI_RULES.md
* ROADMAP.md
* ARCHITECTURE.md
* CHANGELOG.md

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

PROJECT_CONTEXT.md
AI_RULES.md
ROADMAP.md
ARCHITECTURE.md
CHANGELOG.md
README.md
```

---

# Scripts

Executar validações:

```bash
npm run lint
```

Formatar projeto:

```bash
npm run format
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
