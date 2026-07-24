# CHANGELOG

Todas as alterações relevantes deste projeto serão documentadas neste arquivo.

O projeto segue Semantic Versioning (SemVer).

---

## [0.5.0] - 2026-07-24

### 🎉 Concluído

- ✅ Fase 4B – Signature Engine.

### ✨ Implementado

- Signature Engine desacoplado da interface consumindo o Store e a Validation Engine.
- Layout Engine com suporte inicial a layouts horizontal, vertical e compacto.
- Style Engine para tokens visuais reutilizáveis por Preview e HTML Renderer.
- HTML Renderer sem JavaScript, com escape de caracteres, remoção de campos vazios e base para CSS inline compatível com clientes de e-mail.
- Preview integrado ao fluxo Store → Signature Engine → Renderer → Preview com debounce, cache e prevenção de renderizações redundantes.
- Infraestrutura de exportação HTML e Clipboard reutilizando o HTML Renderer.
- Eventos padronizados: SIGNATURE_UPDATED, PREVIEW_UPDATED, HTML_RENDERED, LAYOUT_CHANGED, STYLE_CHANGED e RENDER_COMPLETED.

### 🧪 Testes

- Testes básicos para Signature Engine, Layout Engine, Style Engine, HTML Renderer, Preview Renderer, integração com Store, Event Bus e exportação.

---

## [0.4.0] - 2026-07-24

### 🎉 Concluído

- ✅ Fase 4A – Application State (Core Application Layer)

### ✨ Implementado

- Store central sem dependências externas com state, getters, actions, mutations, subscribers, observers, dispatch, commit, watch, snapshot e restore.
- Modelos independentes para pessoa, empresa, foto, redes sociais, tema, estilo, layout, configurações, validação e aplicação.
- Serviços centrais desacoplados para persistência, validação, tema, histórico, eventos, configuração, logger, imagem, clipboard e notificações.
- Sincronização automática entre estado, validação, preview state, Event Bus, observers, histórico e persistência.
- Undo/Redo, checkpoint, snapshot e restore com limite configurável.
- Persistência com IndexedDB e fallback para LocalStorage, incluindo versionamento.
- Validação em tempo real para e-mail, telefone, WhatsApp, URLs, GitHub, LinkedIn e campos obrigatórios.

### 🧪 Testes

- Testes básicos para Store, Validation, History, Storage, Theme, Observers e Event Bus.

---

## [0.3.0] - 2026-07-24

### 🎉 Concluído

- ✅ Fase 1 – Documentação e Arquitetura
- ✅ Fase 2 – Fundação da Aplicação (Foundation)
- ✅ Fase 3 – Interface do Usuário (UI/UX)

### ✨ Implementado

- Estrutura completa da Progressive Web App (PWA).
- Interface responsiva.
- Layout principal.
- Sistema de componentes.
- Header.
- Sidebar.
- Editor.
- Preview (estrutura).
- Code Viewer.
- Footer.
- Sistema de temas (Light / Dark / Auto).
- Responsividade.
- Estrutura de navegação.
- Base para Event Bus.
- Base para LocalStorage.
- Base para IndexedDB.
- Service Worker.
- Manifest.
- Bootstrap da aplicação.

### 🔄 Alterações Arquiteturais

- Roadmap reorganizado.
- Criação da Fase exclusiva para Assets.
- Divisão da antiga Fase 4 em:
  - Fase 4A – Application State (Core Application Layer)
  - Fase 4B – Signature Engine
- Arquivos binários removidos da Fase 2.
- favicon.ico adiado para a Fase 5.
- Estrutura preparada para futura inclusão dos ícones PWA.
- Inclusão dos documentos:
  - PROJECT_CONTEXT.md
  - AI_RULES.md

### 📚 Documentação

Atualizados:

- ROADMAP.md
- PROJECT_CONTEXT.md
- AI_RULES.md
- CHANGELOG.md

---

### 🚀 Próxima Versão

## [0.5.0]

### Escopo Previsto

#### Fase 4B – Signature Engine

Objetivos:

- Transformar o Application State em uma representação completa da assinatura.
- Renderizar o Preview utilizando dados reais.
- Gerar HTML compatível com clientes de e-mail.
- Exportar HTML.
- Copiar HTML para a área de transferência.
- Reutilizar integralmente o Store, Models e Services implementados na Fase 4A.
- Manter integração com Event Bus, Validation Engine, Storage e Theme System.
- Preservar integralmente a arquitetura modular definida na Fase 1.

### 📌 Observações

- Nenhuma alteração estrutural na arquitetura será realizada.
- Nenhuma dependência externa será adicionada.
- Os recursos binários permanecem previstos para a Fase 5 – Assets.
- Templates continuam previstos exclusivamente para a Fase 6.
