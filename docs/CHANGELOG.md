# CHANGELOG

Todas as alterações relevantes deste projeto serão documentadas neste arquivo.

O projeto segue Semantic Versioning (SemVer).

---

## [0.4.0] - 2026-07-24

### 🎉 Concluído

- ✅ Fase 4A – Core Application Layer (Application State)

### ✨ Implementado

- Store central sem dependências externas com state, getters, actions, mutations, subscribers, observers, dispatch, commit, watch, snapshot e restore.
- Modelos independentes para pessoa, empresa, foto, redes sociais, tema, estilo, layout, configurações, validação e aplicação.
- Serviços centrais desacoplados para persistência, validação, tema, histórico, eventos, configuração, logger, imagem, clipboard e notificações.
- Sincronização automática entre estado, validação, preview state, Event Bus, observers, histórico e persistência.
- Undo/Redo, checkpoint, snapshot e restore com limite configurável.
- Persistência com IndexedDB e fallback para LocalStorage, incluindo versionamento.
- Validação em tempo real para email, telefone, WhatsApp, URLs, GitHub, LinkedIn e campos obrigatórios.

### 🧪 Testes

- Testes básicos para Store, Validation, History, Storage, Theme, Observers e Event Bus.

---

## [0.3.0] - 2026-07-24

### 🎉 Concluído

- ✅ Fase 1 – Documentação e Arquitetura
- ✅ Fase 2 – Fundação da Aplicação (Foundation)
- ✅ Fase 3 – Interface do Usuário (UI/UX)

---

### ✨ Implementado

- Estrutura completa da Progressive Web App (PWA)
- Interface responsiva
- Layout principal
- Sistema de componentes
- Header
- Sidebar
- Editor
- Preview (estrutura)
- Code Viewer
- Footer
- Sistema de temas (Light / Dark / Auto)
- Responsividade
- Estrutura de navegação
- Base para Event Bus
- Base para LocalStorage
- Base para IndexedDB
- Service Worker
- Manifest
- Bootstrap da aplicação

---

### 🔄 Alterações Arquiteturais

- Roadmap reorganizado.
- Criação da Fase exclusiva para Assets.
- Divisão da antiga Fase 4 em:
  - Fase 4A – Core Application Layer (Application State)
  - Fase 4B – Signature Engine
- Arquivos binários removidos da Fase 2.
- favicon.ico adiado para a Fase 5.
- Estrutura preparada para futura inclusão dos ícones PWA.
- Inclusão dos documentos:
  - PROJECT_CONTEXT.md
  - AI_RULES.md

---

### 📚 Documentação

Atualizados:

- ROADMAP.md
- PROJECT_CONTEXT.md
- AI_RULES.md
- CHANGELOG.md

---

### 🚀 Próxima Versão

## 0.4.0

Escopo previsto:

### Fase 4A — Core Application Layer

Objetivos:

- Store Central
- Application State
- Models
- Services
- Validation Engine
- History Engine
- Undo / Redo
- Auto Save
- IndexedDB
- LocalStorage Sync
- Observer Pattern
- Event Bus Integration
- State Synchronization
