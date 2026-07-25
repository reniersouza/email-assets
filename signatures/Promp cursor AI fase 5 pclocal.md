# Implementação da Fase 5 — Assets

## Contexto do Projeto

Você está trabalhando no projeto:

OBJETIVONET Email Signature Generator

Este projeto é uma PWA estática desenvolvida em:

- HTML5
- CSS3
- JavaScript ES Modules

A arquitetura foi definida nas fases anteriores e NÃO deve ser alterada.

Antes de qualquer alteração leia obrigatoriamente:

@docs/AI_RULES.md
@docs/ARCHITECTURE.md
@docs/ROADMAP.md
@docs/PROJECT_CONTEXT.md
@docs/CHANGELOG.md


# Objetivo da Fase 5

Implementar a camada de Assets do projeto.

Esta fase tem como objetivo adicionar, organizar e integrar todos os recursos binários necessários para a aplicação, mantendo compatibilidade com a arquitetura existente.

A Fase 5 NÃO deve criar funcionalidades novas.

A Fase 5 NÃO deve iniciar Templates.

A Fase 5 NÃO deve alterar o Signature Engine.


# Regras obrigatórias

Antes de modificar qualquer arquivo:

1. Analise a estrutura atual do projeto.
2. Preserve todos os módulos existentes.
3. Não reorganize diretórios existentes.
4. Não substitua arquivos funcionais.
5. Não adicione frameworks.
6. Não adicione dependências externas.
7. Não alterar a arquitetura definida em ARCHITECTURE.md.
8. Atualizar documentação somente após concluir a implementação.


# Estrutura esperada de Assets

Criar ou ajustar somente dentro de:

assets/


Estrutura desejada:

assets/

├── icons/
│
├── images/
│
├── social/
│
├── fonts/
│
└── placeholders/


# 1. Ícones PWA

Adicionar os ícones oficiais da aplicação:

assets/icons/

Criar:

- icon-192.svg
- icon-512.svg


Requisitos:

- SVG válido.
- Fundo transparente.
- Compatível com PWA.
- Visual profissional.
- Relacionado ao OBJETIVONET Email Signature Generator.
- Não utilizar bibliotecas externas.
- Não utilizar imagens hospedadas externamente.


Atualizar:

manifest.json


Validar:

- caminhos corretos;
- MIME type correto;
- compatibilidade com PWA.


# 2. Favicon

Adicionar:

favicon.ico

Local:

/

ou no local já definido pela arquitetura atual.


Atualizar:

index.html


Adicionar referência correta:

<link rel="icon">


Importante:

O favicon deve ser tratado como asset físico real.

Não criar código para gerar favicon dinamicamente.


# 3. Ícones Sociais

Criar estrutura:

assets/social/


Adicionar:

- github
- linkedin


Requisitos:

- PNG ou SVG.
- Fundo transparente.
- Estilo monocromático.
- Compatível com assinatura HTML.
- Preparado para uso pelo Signature Engine.


Não alterar o Signature Engine.


# 4. Imagens e Placeholders


Criar:

assets/images/

Para:

- fotos de perfil;
- logos;
- imagens futuras.


Criar:

assets/placeholders/


Adicionar placeholders básicos:

- profile-placeholder.svg
- logo-placeholder.svg


Objetivo:

Permitir testes do Preview sem depender de imagens externas.


# 5. Fontes


Criar:

assets/fonts/


Não adicionar fontes externas nesta fase.

Apenas preparar a estrutura.

Documentar que fontes personalizadas serão avaliadas futuramente.


# 6. Atualização do Manifest


Revisar:

manifest.json


Garantir:

- nome correto;
- ícones existentes;
- caminhos válidos.


Não alterar:

- start_url;
- scope;
- display;

sem necessidade.


# 7. Atualização do Service Worker


Revisar:

service-worker.js


Adicionar os novos assets ao APP_SHELL:

Somente arquivos realmente existentes.


Exemplo:

assets/icons/*
assets/social/*
assets/images/*
assets/placeholders/*


Atualizar CACHE_VERSION.


Não modificar a lógica:

- install;
- activate;
- fetch.


# 8. Validação


Executar validações:

- verificar caminhos quebrados;
- verificar arquivos inexistentes;
- verificar imports;
- verificar JSON válido;
- verificar manifesto PWA.


Executar:

npm run lint

npm run test


Corrigir somente problemas relacionados à Fase 5.


# 9. Documentação obrigatória


Após concluir:


Atualizar:

## ROADMAP.md


Alterar:

Fase 5 — Assets

de:

⏳ Pendente


para:

✅ Concluída


Adicionar:

Implementado:

- Ícones PWA.
- Favicon.
- Assets sociais.
- Estrutura de imagens.
- Placeholders.
- Preparação para fontes.


Atualizar próximo marco:

Fase 6 — Templates


---

Atualizar:

## CHANGELOG.md


Criar nova versão:

## [0.6.0]


Adicionar:


### 🎉 Concluído

- ✅ Fase 5 — Assets


### ✨ Implementado

- Estrutura oficial de assets.
- Ícones PWA.
- Favicon.
- Ícones sociais.
- Placeholders.
- Preparação para imagens e fontes.
- Integração dos assets com Manifest e Service Worker.


### 🧪 Testes

- Validação dos arquivos estáticos.
- Validação PWA.
- Verificação de carregamento dos assets.


---

Atualizar:

## PROJECT_CONTEXT.md


Alterar:

Status atual:

Fase 5 concluída.


Adicionar no roadmap:

- ✅ Fase 5 — Assets
- ⏳ Fase 6 — Templates


---

# 10. Controle final


Antes de finalizar:


Executar:

git status


Listar todos os arquivos modificados.


Não realizar commit automaticamente.


Apresentar:

1. Arquivos criados.
2. Arquivos modificados.
3. Alterações realizadas.
4. Possíveis riscos.


Aguarde aprovação antes do commit.


# Resultado esperado

Ao finalizar:

A aplicação deve possuir todos os assets fundamentais preparados.

A arquitetura deve permanecer intacta.

A Fase 5 deve estar pronta para iniciar a Fase 6 — Templates.
