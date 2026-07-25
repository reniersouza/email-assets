Você atuará como Software Architect e Senior Front-end Engineer responsável pela implementação da Fase 5 — Assets Layer do projeto:

OBJETIVONET Email Signature Generator.

Antes de qualquer alteração, leia obrigatoriamente:

- PROJECT_CONTEXT.md
- AI_RULES.md
- ROADMAP.md
- CHANGELOG.md
- ARCHITECTURE.md

Esses documentos representam a fonte oficial do projeto.

A arquitetura existente é definitiva.

======================================================================

CONTEXTO ATUAL

======================================================================

As fases anteriores foram concluídas:

✅ Fase 1 — Documentação e Arquitetura

✅ Fase 2 — Foundation

✅ Fase 3 — Interface

✅ Fase 4A — Application State

✅ Fase 4B — Signature Engine


O projeto possui:

- Store centralizado
- Models
- Services
- Validation Engine
- History Engine
- IndexedDB
- LocalStorage fallback
- Event Bus
- Signature Engine
- HTML Renderer
- Preview Renderer


A próxima etapa é implementar a camada de Assets.

======================================================================

OBJETIVO DA FASE 5

======================================================================

Criar a infraestrutura completa para gerenciamento de recursos visuais da aplicação.

Esta fase deve preparar o sistema para utilização futura de:

- Templates
- Signature Engine
- Preview
- PWA
- Exportação

======================================================================

REGRA CRÍTICA SOBRE ARQUIVOS BINÁRIOS

======================================================================

IMPORTANTE:

Não criar arquivos binários automaticamente.

Não gerar:

- favicon.ico
- PNG
- JPG
- WEBP
- fontes
- arquivos compactados


O histórico do projeto apresentou problemas com arquivos binários no GitHub.

Portanto:

A IA deve criar somente:

- estrutura de diretórios;
- arquivos JavaScript;
- arquivos JSON;
- documentação.


Os arquivos reais de imagem serão adicionados manualmente posteriormente pelo desenvolvedor.

Nunca substituir placeholders por imagens geradas automaticamente.

======================================================================

NÃO ALTERAR

======================================================================

Nunca:

- alterar arquitetura;
- reorganizar diretórios existentes;
- remover componentes;
- substituir módulos existentes;
- criar frameworks;
- adicionar dependências externas;
- modificar Store;
- modificar Signature Engine;
- modificar HTML Renderer.


Somente atualizar arquivos realmente necessários.

======================================================================

ESTRUTURA DE ASSETS

======================================================================

Criar a estrutura:

assets/

icons/

images/

logos/

fonts/

placeholders/

favicon/


Caso algum diretório já exista:

não recriar.

Apenas complementar.

======================================================================

ASSET MANAGEMENT

======================================================================

Implementar uma camada responsável por gerenciamento de assets.

Utilizar arquitetura existente.

Criar serviço desacoplado:

AssetService


Responsabilidades:

- localizar assets;
- validar existência;
- retornar caminhos padronizados;
- controlar fallback;
- centralizar referências.


Não acessar imagens diretamente pelos componentes.

Fluxo obrigatório:


Componentes

↓

Store

↓

Services

↓

AssetService

↓

Arquivos


======================================================================

ASSET CONFIGURATION

======================================================================

Atualizar o sistema de configuração existente.


Adicionar configuração de assets:

Exemplo:

assets.json


Responsável por registrar:


- favicon
- ícones PWA
- logos
- imagens padrão
- placeholders


Não inserir imagens reais.

Utilizar caminhos preparados.

======================================================================

IMAGE SERVICE

======================================================================

Integrar com ImageService existente.


Adicionar suporte para:

- validação de caminho;
- fallback de imagem;
- placeholder;
- normalização;
- carregamento seguro.


Não alterar a responsabilidade atual do ImageService.

Apenas evoluir.

======================================================================

PWA ASSETS

======================================================================

Preparar integração futura:


Manifest:

Revisar referências:


- ícone 192x192
- ícone 512x512


Service Worker:

Preparar cache dos caminhos corretos.


IMPORTANTE:

Não criar os arquivos físicos.

Somente preparar referências.

======================================================================

ICON SYSTEM

======================================================================

Preparar sistema de ícones:


Suportar:

- ícones sociais;
- ícones PWA;
- ícones da interface;
- ícones futuros de templates.


Criar estrutura compatível com:

SVG
PNG


Porém sem adicionar arquivos.

======================================================================

FONT SYSTEM

======================================================================

Preparar estrutura para fontes.


Criar configuração:

fonts.json


Registrar:

- família;
- peso;
- caminho;
- fallback.


Não adicionar arquivos de fonte.

======================================================================

PLACEHOLDER SYSTEM

======================================================================

Criar placeholders lógicos.


Exemplos:

- foto ausente;
- logo ausente;
- avatar padrão.


Não criar imagens.


Utilizar referências futuras.

======================================================================

PERFORMANCE

======================================================================

Implementar boas práticas:

- lazy loading;
- cache;
- validação;
- fallback;
- evitar carregamentos duplicados.


Não prejudicar:

Lighthouse
Performance
PWA

======================================================================

EVENT BUS

======================================================================

Criar eventos necessários:

ASSET_LOADED

ASSET_ERROR

IMAGE_READY

ASSET_UPDATED


Registrar em:

constants.js


======================================================================

TESTES

======================================================================

Criar testes básicos:


AssetService:

- carregamento;
- fallback;
- validação.


ImageService:

- normalização;
- ausência de arquivo.


Config:

- leitura assets.json.


======================================================================

DOCUMENTAÇÃO

======================================================================

Atualizar:

CHANGELOG.md

ROADMAP.md

PROJECT_CONTEXT.md

Caso necessário.


Registrar:

Fase 5 iniciada/concluída conforme implementação real.


======================================================================

IMPORTANTE

======================================================================

Ao finalizar:


Informar:

1. Arquivos criados.
2. Arquivos alterados.
3. Estrutura final.
4. Testes executados.
5. Quais arquivos binários precisam ser adicionados manualmente.


Não considerar a fase concluída caso:

- arquivos binários tenham sido criados automaticamente;
- arquitetura tenha sido alterada;
- componentes existentes tenham sido substituídos.

======================================================================

OBJETIVO FINAL

======================================================================

Ao término desta implementação:


A aplicação deverá possuir uma infraestrutura profissional de gerenciamento de assets preparada para:

- PWA;
- Signature Engine;
- Templates;
- Preview;
- Exportação futura.


Os arquivos reais de imagem e ícones serão adicionados manualmente posteriormente.
