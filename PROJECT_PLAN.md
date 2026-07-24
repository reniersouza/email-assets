# OBJETIVONET Email Signature Generator — Arquitetura e Plano

Este documento registra a fase inicial aprovada para o projeto: arquitetura completa, estrutura de pastas, plano de desenvolvimento e cronograma. A implementação será feita em fases incrementais, sempre mantendo uma versão funcional e testável antes de avançar.

## 1. Arquitetura completa

### Visão geral

A aplicação será uma Progressive Web App estática, sem frameworks, construída com HTML5, CSS3 e JavaScript ES2023 em módulos ES6. A interface terá três áreas principais: painel de edição, preview em tempo real e código HTML gerado. O motor de assinatura será independente da interface para garantir testabilidade, manutenção e compatibilidade com clientes de e-mail.

### Camadas

1. **Shell PWA**
   - `index.html` com metadados, políticas de segurança, pontos de montagem e links para manifest, CSS e módulos JavaScript.
   - `manifest.json` com identidade visual, ícones, atalhos, modo standalone e splash screen.
   - `service-worker.js` com estratégia offline first, cache first para assets versionados e atualização controlada.

2. **Camada de UI**
   - Componentes de formulário, personalização visual, redes sociais, foto, preview, exportação e importação.
   - Componentes acessíveis com labels, ARIA, foco visível, navegação por teclado e mensagens de erro em tempo real.
   - Layout responsivo com tema claro/escuro inspirado no Google Workspace.

3. **Camada de estado**
   - Store central baseada em módulos ES6.
   - Histórico de undo/redo.
   - Persistência automática em Local Storage.
   - Persistência estruturada em IndexedDB para modelos, fotos, configurações e histórico.

4. **Camada de domínio**
   - Motor exclusivo de geração de assinatura HTML.
   - Normalização, sanitização e validação de dados.
   - Sistema de templates em JSON.
   - Sistema extensível de provedores de ícones.
   - Sistema base para temas, idiomas e plugins.

5. **Camada de compatibilidade de e-mail**
   - Geração de HTML baseado em tabelas com `role="presentation"`.
   - CSS 100% inline na assinatura gerada.
   - Imagens com `display:block`, `border:0`, `outline:none`, `text-decoration:none`, `vertical-align:middle` e `-ms-interpolation-mode:bicubic`.
   - Proibição no HTML gerado de Flexbox, Grid, `position:absolute`, JavaScript e CSS externo.

6. **Camada de qualidade**
   - Validações em tempo real para email, telefone, WhatsApp, URLs, LinkedIn, GitHub e website.
   - Utilitários de escape HTML e sanitização de URLs para reduzir risco de XSS.
   - Checklist Lighthouse para performance, acessibilidade, boas práticas, SEO e PWA.
   - Testes manuais documentados por fase e testes automatizáveis para módulos puros.

### Módulos JavaScript planejados

- `assets/js/app.js`: inicialização, registro do service worker e composição dos módulos.
- `assets/js/state/store.js`: estado global, assinatura, subscribe/dispatch e snapshots.
- `assets/js/state/history.js`: undo/redo com limite de memória.
- `assets/js/storage/local-storage.js`: autosave e restauração rápida.
- `assets/js/storage/indexed-db.js`: persistência de modelos, fotos, configurações e histórico.
- `assets/js/signature/generator.js`: geração do HTML final compatível com e-mail.
- `assets/js/signature/styles.js`: montagem segura dos estilos inline suportados.
- `assets/js/signature/sanitizer.js`: escape HTML, normalização e validação de URLs.
- `assets/js/signature/validators.js`: regras de validação dos campos.
- `assets/js/templates/templates-service.js`: carga, clonagem, importação e exportação de modelos JSON.
- `assets/js/icons/icon-provider.js`: contrato comum para provedores de ícones.
- `assets/js/media/photo-editor.js`: upload, drag and drop, crop, zoom, reposicionamento e base64 opcional.
- `assets/js/media/gravatar.js`: leitura de email, hash ou URL e geração de URL Gravatar.
- `assets/js/export/exporters.js`: HTML, TXT, JSON, configuração e vCard.
- `assets/js/import/importers.js`: JSON, HTML compatível e configuração.
- `assets/js/premium/qrcode.js`: QR Code automático sem dependências externas em runtime.
- `assets/js/i18n/i18n.js`: base para idiomas.
- `assets/js/plugins/plugin-registry.js`: registro seguro de plugins locais.

## 2. Estrutura de pastas

```text
/
├── index.html
├── 404.html
├── manifest.json
├── service-worker.js
├── robots.txt
├── sitemap.xml
├── README.md
├── CHANGELOG.md
├── LICENSE
├── PROJECT_PLAN.md
├── assets/
│   ├── css/
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   ├── themes.css
│   │   └── print.css
│   ├── js/
│   │   ├── app.js
│   │   ├── config/
│   │   ├── state/
│   │   ├── storage/
│   │   ├── signature/
│   │   ├── templates/
│   │   ├── icons/
│   │   ├── media/
│   │   ├── export/
│   │   ├── import/
│   │   ├── premium/
│   │   ├── i18n/
│   │   └── plugins/
│   ├── components/
│   ├── templates/
│   │   ├── gravatar.json
│   │   ├── objetivonet.json
│   │   ├── google.json
│   │   ├── microsoft.json
│   │   ├── apple.json
│   │   ├── executivo.json
│   │   ├── minimalista.json
│   │   ├── dark.json
│   │   └── corporativo.json
│   ├── data/
│   │   ├── social-networks.json
│   │   ├── validators.json
│   │   └── locales.json
│   ├── icons/
│   │   ├── app/
│   │   ├── social/
│   │   └── providers/
│   ├── images/
│   ├── fonts/
│   └── config/
│       ├── app.json
│       ├── cache.json
│       └── security.json
└── signatures/
```

## 3. Plano de desenvolvimento

### Fase 0 — Fundação e documentação inicial

- Confirmar arquitetura, estrutura, critérios de qualidade e fases.
- Criar documentação inicial do plano.
- Definir critérios de aceite por fase.

**Entregável testável:** documentação revisada e versionada.

### Fase 1 — Shell estático, design system e PWA base

- Criar `index.html`, `404.html`, `manifest.json`, `service-worker.js`, `robots.txt` e `sitemap.xml`.
- Implementar CSS base, layout responsivo, tema claro/escuro e tokens visuais.
- Implementar instalação PWA, cache versionado, offline fallback e atualização automática.

**Entregável testável:** aplicação abre offline após primeiro carregamento e passa checklist PWA básico.

### Fase 2 — Estado, formulário e validações

- Implementar store modular, autosave em Local Storage e restauração automática.
- Implementar campos principais do formulário.
- Implementar validação em tempo real com mensagens acessíveis.
- Implementar undo/redo.

**Entregável testável:** dados persistem, validações aparecem sem recarregar a página e undo/redo funciona.

### Fase 3 — Motor de assinatura HTML

- Implementar sanitização, escape HTML e validação de URLs.
- Implementar geração por tabela com CSS inline.
- Garantir compatibilidade com Gmail, Outlook, Apple Mail e webmails tradicionais.
- Implementar painel de código HTML e cópia.

**Entregável testável:** assinatura gerada sem JavaScript, sem CSS externo e sem layout moderno incompatível.

### Fase 4 — Templates, personalização e preview

- Implementar templates JSON editáveis.
- Implementar personalização de cores, bordas, espaçamentos, dimensões, fontes, ícones e foto.
- Implementar simulações Desktop, Mobile, Gmail, Outlook, Apple Mail, Zoho, Yahoo e Dark Mode.

**Entregável testável:** troca de template e personalização atualizam preview e HTML instantaneamente.

### Fase 5 — Foto, Gravatar e redes sociais

- Implementar Gravatar por email, hash ou URL.
- Implementar upload, drag and drop, crop, zoom, reposicionamento, centralização e base64 opcional.
- Implementar redes sociais com ativação, desativação, reordenação por drag and drop e ocultação quando vazias.
- Implementar sistema de provedores de ícones.

**Entregável testável:** imagem e redes sociais aparecem corretamente no preview e no HTML gerado.

### Fase 6 — Importação, exportação e IndexedDB

- Implementar exportação HTML, TXT, JSON, configuração e vCard.
- Implementar importação JSON, HTML compatível e configuração.
- Implementar IndexedDB para modelos, fotos, configurações e histórico.

**Entregável testável:** configuração completa pode ser exportada, removida, importada e restaurada.

### Fase 7 — Funcionalidades premium e extensibilidade

- Implementar QR Code automático.
- Implementar favoritos, duplicação de modelos, importação/exportação de modelos.
- Implementar registros de plugins, temas e idiomas.

**Entregável testável:** recursos premium funcionam sem dependências externas obrigatórias em runtime.

### Fase 8 — Hardening, performance e documentação final

- Revisar CSP, Referrer Policy e Permissions Policy.
- Auditar acessibilidade WCAG AA.
- Otimizar cache, imagens, CSS e JavaScript.
- Documentar módulos, arquivos, implantação e operação.
- Executar Lighthouse e checklist manual de clientes de e-mail.

**Entregável testável:** build estático pronto para produção com documentação completa.

## 4. Cronograma das fases

| Fase | Duração estimada | Resultado |
| --- | ---: | --- |
| 0 — Fundação | 0,5 dia | Plano aprovado e versionado |
| 1 — Shell + PWA | 1,5 dias | Aplicação instalável e offline |
| 2 — Estado + formulário | 2 dias | Editor funcional com validações |
| 3 — Motor HTML | 2 dias | Assinatura compatível gerada em tempo real |
| 4 — Templates + preview | 2 dias | Modelos e simulações visuais completas |
| 5 — Foto + redes | 2 dias | Mídia, Gravatar e redes sociais completos |
| 6 — Import/export + IndexedDB | 1,5 dia | Persistência e portabilidade completas |
| 7 — Premium/extensibilidade | 2 dias | QR Code, vCard, favoritos, plugins, temas e idiomas |
| 8 — Qualidade + docs | 2 dias | Projeto pronto para produção |

Tempo total estimado: aproximadamente 15,5 dias úteis, podendo ser ajustado após validação visual, testes em clientes de e-mail reais e eventuais mudanças de escopo.

## Critérios de aceite globais

- Aplicação estática, sem frameworks e sem dependências obrigatórias de runtime.
- HTML gerado compatível com clientes de e-mail tradicionais.
- Funcionalidades entregues somente quando completas, funcionais e testáveis.
- Código modular, legível e comentado onde a intenção não for óbvia.
- Segurança aplicada por padrão: escape HTML, sanitização de URLs e políticas do navegador.
- Acessibilidade WCAG AA como requisito, não como melhoria opcional.
