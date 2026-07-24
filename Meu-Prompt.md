# CONTEXTO

Você atuará como uma equipe completa de desenvolvimento composta por:

- Software Architect
- UX/UI Designer
- Front-end Engineer
- Especialista em HTML para Email
- Especialista em Progressive Web Apps (PWA)
- Especialista em Performance
- Especialista em Segurança
- QA Engineer
- Technical Writer

O objetivo é desenvolver uma aplicação SaaS profissional chamada:

OBJETIVONET EMAIL SIGNATURE GENERATOR

Esta aplicação será utilizada em produção para gerar assinaturas HTML profissionais para clientes de e-mail.

O projeto deverá possuir qualidade equivalente a um software comercial.

Nunca utilize código incompleto.

Nunca omita arquivos.

Nunca utilize pseudo-código.

Todo código deverá ser funcional.

Sempre siga as melhores práticas.

====================================================================

OBJETIVO

====================================================================

Criar uma Progressive Web App (PWA) que permita gerar assinaturas HTML profissionais compatíveis com praticamente todos os clientes de e-mail existentes.

A aplicação deverá permitir que qualquer usuário personalize completamente sua assinatura e obtenha imediatamente o código HTML pronto para copiar e colar.

====================================================================

COMPATIBILIDADE DA ASSINATURA

====================================================================

O HTML gerado deverá funcionar corretamente em:

Google Workspace

Gmail

Outlook Desktop

Outlook Web

Microsoft 365

Apple Mail

Thunderbird

Yahoo Mail

Zoho Mail

Roundcube

Proton Mail

Fastmail

AOL Mail

Spark

e outros clientes que utilizem renderização baseada em HTML tradicional.

Nunca utilizar recursos incompatíveis com clientes de e-mail.

====================================================================

TECNOLOGIAS

====================================================================

Utilizar apenas:

HTML5

CSS3

JavaScript ES2023

Sem frameworks.

Não utilizar:

React

Vue

Angular

Bootstrap

Tailwind

jQuery

Material UI

Node obrigatório apenas durante desenvolvimento.

O projeto final deverá ser uma aplicação estática.

====================================================================

ARQUITETURA

====================================================================

Criar arquitetura modular.

Separar responsabilidades.

Utilizar módulos ES6.

Organizar os arquivos.

Nenhuma função deverá ultrapassar aproximadamente 60 linhas.

Código altamente legível.

====================================================================

ESTRUTURA

====================================================================

/

index.html

manifest.json

service-worker.js

robots.txt

sitemap.xml

404.html

README.md

CHANGELOG.md

LICENSE

/assets

/css

/js

/components

/templates

/data

/icons

/images

/fonts

/config

====================================================================

PWA

====================================================================

Implementar completamente:

Manifest

Service Worker

Cache inteligente

Offline First

Cache First para assets

Atualização automática

Versionamento

Instalação

Splash Screen

Standalone

Ícones Android

Ícones iOS

Ícones Windows

Instalável no Desktop

Instalável no Android

Instalável no iPhone

Compatível com Lighthouse.

Objetivo:

PWA Score >95

====================================================================

LAYOUT

====================================================================

Interface moderna.

Minimalista.

Inspirada no Google Workspace.

Tema Claro.

Tema Escuro.

Responsiva.

Dividir em três áreas:

Painel de edição.

Preview em tempo real.

Código HTML.

====================================================================

FORMULÁRIO

====================================================================

Nome

Cargo

Departamento

Empresa

Cidade

Estado

País

Telefone

Celular

WhatsApp

Email

Website

Slogan

Observações

====================================================================

FOTO

====================================================================

Permitir:

Gravatar

URL externa

Upload

Drag and Drop

Recorte

Zoom

Reposicionamento

Centralização

Preview instantâneo

Converter para Base64 opcionalmente.

====================================================================

GRAVATAR

====================================================================

Aceitar:

Email

Hash

URL

Buscar automaticamente.

Atualizar foto.

Mostrar erros.

====================================================================

REDES SOCIAIS

====================================================================

LinkedIn

GitHub

Instagram

Facebook

Threads

X

TikTok

YouTube

Discord

Telegram

Behance

Dribbble

Pinterest

Medium

Mastodon

WhatsApp

Permitir:

Ativar

Desativar

Alterar ordem

Arrastar para reorganizar

Ocultar automaticamente caso vazio.

====================================================================

ÍCONES

====================================================================

Sistema de provedores.

Simple Icons

Icons8

PNG próprios

SVG próprios

Permitir adicionar novos pacotes futuramente.

====================================================================

TEMPLATES

====================================================================

Sistema baseado em JSON.

Modelos:

Gravatar

ObjetivoNET

Google

Microsoft

Apple

Executivo

Minimalista

Dark

Corporativo

Todos editáveis.

====================================================================

PERSONALIZAÇÃO

====================================================================

Editar:

Cor do fundo

Cor da borda

Cor da barra inferior

Cor do texto

Cor do subtítulo

Raio da borda

Espaçamentos

Largura

Altura

Fontes

Ícones

Tamanho dos ícones

Tamanho da foto

====================================================================

GERADOR HTML

====================================================================

Criar um motor exclusivo.

Separado da interface.

Gerar:

HTML limpo

CSS Inline

Compatibilidade máxima.

Utilizar:

role="presentation"

display:block

border:0

outline:none

text-decoration:none

vertical-align:middle

-ms-interpolation-mode:bicubic

table para layout.

Jamais utilizar:

Flexbox

Grid

Position Absolute

JavaScript

CSS externo

====================================================================

PREVIEW

====================================================================

Atualização instantânea.

Mostrar simulações:

Desktop

Mobile

Gmail

Outlook

Apple Mail

Zoho

Yahoo

Dark Mode

====================================================================

EXPORTAÇÃO

====================================================================

Copiar HTML

Copiar assinatura

Baixar HTML

Baixar TXT

Baixar JSON

Baixar configuração

====================================================================

IMPORTAÇÃO

====================================================================

Importar JSON

Importar HTML

Importar configuração

====================================================================

LOCAL STORAGE

====================================================================

Salvar automaticamente.

Restaurar automaticamente.

====================================================================

INDEXED DB

====================================================================

Salvar:

Modelos

Fotos

Configurações

Histórico

====================================================================

UNDO / REDO

====================================================================

Implementar histórico completo.

====================================================================

VALIDAÇÕES

====================================================================

Validar:

Email

Telefone

WhatsApp

URLs

LinkedIn

GitHub

Website

Mostrar erros em tempo real.

====================================================================

ACESSIBILIDADE

====================================================================

WCAG AA.

ARIA.

Labels.

Navegação por teclado.

Contraste adequado.

====================================================================

SEGURANÇA

====================================================================

Escapar HTML.

Sanitizar entradas.

Evitar XSS.

Validar URLs.

Content Security Policy.

Referrer Policy.

Permissions Policy.

====================================================================

PERFORMANCE

====================================================================

Objetivo Lighthouse:

Performance >95

Accessibility >100

Best Practices >100

SEO >100

PWA >100

====================================================================

FUNCIONALIDADES PREMIUM

====================================================================

QR Code automático.

Gerador de vCard.

Compartilhar assinatura.

Salvar favoritos.

Duplicar modelo.

Importar e exportar modelos.

Sistema de plugins.

Sistema de temas.

Sistema de idiomas.

====================================================================

CÓDIGO

====================================================================

Todo o projeto deverá ser comentado.

Documentado.

Organizado.

Escalável.

Pronto para manutenção.

====================================================================

DOCUMENTAÇÃO

====================================================================

Gerar documentação completa.

Explicar cada módulo.

Explicar cada pasta.

Explicar cada arquivo.

====================================================================

IMPLANTAÇÃO

====================================================================

Gerar instruções completas para:

Cloudflare Pages

GitHub Pages

Netlify

Vercel

Servidor Apache

Servidor Nginx

Domínio personalizado

SSL

Cache

====================================================================

MODO DE ENTREGA

====================================================================

NÃO tente gerar todo o projeto em uma única resposta.

Primeiro apresente:

1. Arquitetura completa.
2. Estrutura de pastas.
3. Plano de desenvolvimento.
4. Cronograma das fases.

Após aprovação, desenvolva o projeto em fases.

Cada fase deve ser completa, funcional e testável antes de avançar para a próxima.

Nunca pule etapas.

Ao final, entregue um projeto pronto para produção, equivalente em qualidade a uma aplicação SaaS comercial.
