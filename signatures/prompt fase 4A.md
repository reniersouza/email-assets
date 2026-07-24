A FASE 1 (Documentação), FASE 2 (Foundation) e FASE 3 (UI/UX) foram concluídas, aprovadas e já estão presentes no repositório GitHub.

O projeto também possui os documentos:

- PROJECT_CONTEXT.md
- AI_RULES.md
- ROADMAP.md
- CHANGELOG.md

Esses documentos representam a fonte oficial do projeto e DEVEM ser utilizados como referência obrigatória durante toda esta fase.

Nunca reimplemente funcionalidades já existentes.

Nunca altere a arquitetura.

Nunca reorganize diretórios.

Nunca remova componentes.

Nunca substitua módulos existentes.

Atualize apenas os arquivos necessários.

======================================================================

PAPEL

======================================================================

Você atuará como Software Architect e Senior Front-end Engineer.

Sua responsabilidade é implementar toda a camada central da aplicação.

Esta camada será responsável por controlar todo o funcionamento interno do sistema.

Nenhum HTML de assinatura deverá ser gerado nesta fase.

Nenhum recurso de exportação deverá ser implementado nesta fase.

Nenhum Template deverá ser implementado nesta fase.

======================================================================

OBJETIVO

======================================================================

Implementar toda a Core Application Layer.

Esta camada deverá centralizar:

• Estado da aplicação
• Fluxo de dados
• Comunicação entre módulos
• Sincronização
• Validação
• Persistência
• Eventos
• Histórico
• Undo
• Redo

Ao término desta fase a aplicação deverá possuir uma infraestrutura completa de gerenciamento de estado.

======================================================================

IMPLEMENTAR

======================================================================

Criar um Store central.

Toda a aplicação deverá utilizar este Store.

Nenhum componente poderá armazenar informações permanentes da assinatura internamente.

Todos os componentes deverão consumir os dados exclusivamente através do Store.

======================================================================

STORE

======================================================================

Criar um Store inspirado em arquiteturas modernas.

Sem utilizar Redux.

Sem utilizar MobX.

Sem utilizar bibliotecas externas.

O Store deverá possuir:

State

Getters

Actions

Mutations

Subscribers

Observers

Dispatch

Commit

Watch

Snapshot

Restore

======================================================================

STATE

======================================================================

Modelar completamente os dados da assinatura.

Exemplo:

signature

person

company

photo

socials

style

layout

preferences

application

history

storage

theme

validation

preview

Cada domínio deverá possuir estrutura própria.

======================================================================

MODELS

======================================================================

Criar modelos independentes.

PersonModel

CompanyModel

PhotoModel

SocialModel

ThemeModel

StyleModel

LayoutModel

SettingsModel

ValidationModel

ApplicationModel

Cada modelo deverá possuir:

Valores padrão

Validação

Serialização

Desserialização

======================================================================

SERVICES

======================================================================

Criar serviços especializados.

StorageService

ValidationService

ThemeService

HistoryService

EventService

ConfigService

LoggerService

ImageService

ClipboardService

NotificationService

Todos desacoplados.

======================================================================

OBSERVERS

======================================================================

Implementar sistema Observer.

Permitir que qualquer componente observe alterações.

Adicionar:

subscribe()

unsubscribe()

notify()

watch()

======================================================================

EVENT BUS

======================================================================

Integrar completamente com o Event Bus criado anteriormente.

Criar eventos padronizados.

Exemplos:

STATE_UPDATED

FIELD_CHANGED

THEME_CHANGED

IMAGE_CHANGED

CONFIG_UPDATED

VALIDATION_UPDATED

APPLICATION_READY

Todos documentados.

======================================================================

HISTÓRICO

======================================================================

Criar sistema completo.

Undo

Redo

Checkpoint

Snapshot

Restore

Limite configurável.

======================================================================

AUTO SAVE

======================================================================

Implementar.

Salvar automaticamente.

Debounce.

Recuperação automática.

Versionamento.

======================================================================

INDEXEDDB

======================================================================

Implementar persistência.

Criar:

Database

Stores

Versionamento

Migração

Fallback para LocalStorage.

======================================================================

VALIDAÇÃO

======================================================================

Criar Validation Engine.

Validação em tempo real.

Email

Telefone

WhatsApp

URLs

GitHub

LinkedIn

Campos obrigatórios

Regras customizadas

Mensagens padronizadas.

======================================================================

STATE SYNCHRONIZATION

======================================================================

Sempre que qualquer campo mudar:

Atualizar Store.

Atualizar LocalStorage.

Atualizar IndexedDB.

Atualizar Preview State.

Disparar Eventos.

Notificar Observers.

Registrar Histórico.

Tudo automaticamente.

======================================================================

THEME

======================================================================

Sincronizar.

Light

Dark

Auto

Persistir preferência.

======================================================================

LOGGER

======================================================================

Registrar:

Info

Warn

Error

Debug

Performance

Eventos

======================================================================

ERROR HANDLING

======================================================================

Criar tratamento global.

Capturar exceções.

Recuperação automática quando possível.

Registrar falhas.

======================================================================

PERFORMANCE

======================================================================

Debounce.

Throttle.

Batch Updates.

Lazy Sync.

Evitar renders desnecessários.

======================================================================

ACESSIBILIDADE

======================================================================

Preservar compatibilidade WCAG.

Nunca quebrar navegação existente.

======================================================================

TESTES INTERNOS

======================================================================

Criar testes básicos para:

Store

Validation

History

Storage

Theme

Observers

Event Bus

======================================================================

QUALIDADE

======================================================================

Seguir rigorosamente:

PROJECT_CONTEXT.md

AI_RULES.md

Roadmap

Arquitetura existente

Clean Code

SOLID

DRY

KISS

Single Responsibility

======================================================================

IMPORTANTE

======================================================================

Não implementar:

Gerador HTML

Signature Engine

Templates

QR Code

vCard

Exportação

Importação

Preview Final

Compatibilidade Email

Esses recursos pertencem às próximas fases.

======================================================================

ENTREGA

======================================================================

Atualizar apenas os módulos necessários.

Criar novos arquivos somente quando forem realmente necessários e respeitando a arquitetura existente.

Todo código deve ser integrado ao projeto existente.

Cada novo módulo deve possuir documentação, comentários e testes básicos.

Ao final desta fase:

• Toda a aplicação deverá possuir gerenciamento de estado centralizado.
• Todos os componentes deverão estar sincronizados.
• Persistência automática deverá funcionar.
• Undo/Redo deverá estar operacional.
• Validation Engine deverá estar funcional.
• Event Bus deverá estar totalmente integrado.

Caso a implementação exceda o limite de contexto, dividir automaticamente a entrega em partes sequenciais, mantendo continuidade, sem repetir código e sem omitir arquivos.

Somente considerar a Fase 4A concluída quando toda a infraestrutura central da aplicação estiver funcional e pronta para suportar o Signature Engine da Fase 4B.
