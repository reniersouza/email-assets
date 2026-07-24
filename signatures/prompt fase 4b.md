A FASE 4A – Application State foi concluída, validada e integrada ao projeto.

Toda a documentação oficial encontra-se atualizada e deve ser utilizada obrigatoriamente como referência durante toda esta fase.

======================================================================
DOCUMENTAÇÃO OFICIAL
======================================================================

PROJECT_CONTEXT.md
AI_RULES.md
ROADMAP.md
CHANGELOG.md
ARCHITECTURE.md

Esses documentos representam a fonte oficial do projeto.

Nenhuma implementação poderá contrariar esses documentos.

Em caso de conflito entre implementação e documentação, a documentação possui prioridade.

======================================================================
DECISÕES ARQUITETURAIS
======================================================================

Antes de iniciar qualquer implementação:

Ler obrigatoriamente:

ARCHITECTURE.md

Seguir rigorosamente as responsabilidades de cada módulo.

Não alterar fluxos arquiteturais documentados.

Caso seja identificada necessidade de alteração estrutural, interromper a implementação dessa alteração e preservar a arquitetura existente.

======================================================================
PAPEL
======================================================================

Você atuará como Software Architect e Senior Front-end Engineer.

Sua responsabilidade é implementar integralmente a FASE 4B – Signature Engine.

Toda implementação deverá respeitar rigorosamente a arquitetura existente.

======================================================================
REGRAS GERAIS
======================================================================

Antes de qualquer implementação:

Analisar toda a estrutura atual do repositório.

Verificar arquivos existentes.

Verificar módulos existentes.

Verificar serviços existentes.

Verificar models existentes.

Verificar Store existente.

Verificar Event Bus existente.

Verificar arquitetura documentada.

Nunca assumir que um módulo não existe sem antes verificar.

Sempre reutilizar implementações existentes.

Expandir módulos existentes sempre que possível.

Criar novos arquivos somente quando realmente necessário.

Nunca criar implementações paralelas.

Nunca duplicar funcionalidades.

======================================================================
ARQUITETURA
======================================================================

A arquitetura definida durante as Fases 1, 2, 3 e 4A é definitiva.

Nunca:

- alterar diretórios
- reorganizar arquivos
- mover módulos
- substituir componentes existentes
- alterar responsabilidades dos módulos
- modificar a arquitetura sem ADR

Toda implementação deverá integrar-se à estrutura atual existente em:

assets/js/

utilizando exclusivamente a organização existente.

======================================================================
TECNOLOGIAS
======================================================================

Utilizar exclusivamente:

- HTML5
- CSS3
- JavaScript ES Modules
- IndexedDB
- LocalStorage
- Service Worker

Não utilizar:

- React
- Vue
- Angular
- jQuery
- Bootstrap
- Tailwind
- Redux
- MobX
- dependências externas

======================================================================
OBJETIVO
======================================================================

Implementar o Signature Engine responsável por transformar o Application State criado na Fase 4A em uma assinatura funcional.

O Signature Engine deverá ser completamente desacoplado da interface.

Toda informação deverá ser consumida exclusivamente através do Store.

Nenhum componente deverá possuir estado próprio referente aos dados da assinatura.

======================================================================
IMPLEMENTAR
======================================================================

Implementar os módulos necessários utilizando exclusivamente a arquitetura existente.

Não criar uma nova camada arquitetural.

Integrar os novos módulos ao projeto atual.

Responsabilidades:

• interpretar o estado da aplicação

• organizar os dados

• validar informações

• montar a estrutura lógica da assinatura

• preparar renderização

• renderizar preview

• gerar HTML

• disponibilizar infraestrutura para exportação

======================================================================
SIGNATURE MODEL
======================================================================

Criar o modelo completo da assinatura utilizando os Models existentes.

Representar:

Pessoa

Empresa

Cargo

Departamento

Foto

Email

Telefones

WhatsApp

Website

Endereço

Redes Sociais

Tema

Layout

Estilos

Campos opcionais

Campos obrigatórios

Não duplicar Models existentes.

======================================================================
SIGNATURE ENGINE
======================================================================

Implementar o motor responsável por:

- ler o Store

- consumir Models

- validar dados

- remover campos vazios

- organizar a ordem dos elementos

- preparar renderização

- disponibilizar estrutura reutilizável para Preview e HTML Renderer

Nunca acessar diretamente componentes da interface.

======================================================================
LAYOUT ENGINE
======================================================================

Preparar suporte para:

Horizontal

Vertical

Compacto

A arquitetura deverá permitir novos layouts futuramente sem alterar os existentes.

======================================================================
STYLE ENGINE
======================================================================

Controlar:

cores

tipografia

espaçamentos

alinhamentos

bordas

separadores

ícones

foto

Toda lógica visual deverá permanecer desacoplada do Signature Engine.

======================================================================
PREVIEW
======================================================================

Substituir o Preview estrutural criado na Fase 3.

O Preview deverá utilizar dados reais provenientes do Store.

Fluxo obrigatório:

Store

↓

Signature Engine

↓

Renderer

↓

Preview

Sempre que qualquer campo for alterado:

Atualizar Preview automaticamente.

Evitar renderizações desnecessárias.

======================================================================
HTML RENDERER
======================================================================

Implementar um renderer responsável por gerar HTML compatível com clientes de e-mail.

Requisitos:

HTML limpo.

Sem JavaScript.

Sem dependências.

Preparado para CSS inline.

Eliminar campos vazios.

Escapar caracteres especiais.

Preservar acessibilidade.

Compatibilidade com:

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

======================================================================
EXPORTAÇÃO
======================================================================

Implementar apenas a infraestrutura.

Preparar:

HTML Export

Clipboard

A exportação deverá reutilizar obrigatoriamente o HTML produzido pelo Renderer.

Nunca duplicar lógica de geração de HTML.

Não implementar:

Download

ZIP

PDF

======================================================================
EVENT BUS
======================================================================

Integrar completamente ao Event Bus existente.

Criar eventos padronizados.

Exemplos:

SIGNATURE_UPDATED

PREVIEW_UPDATED

HTML_RENDERED

LAYOUT_CHANGED

STYLE_CHANGED

RENDER_COMPLETED

Todos documentados.

======================================================================
VALIDAÇÃO
======================================================================

Utilizar exclusivamente a Validation Engine existente.

Nunca duplicar validações.

Campos inválidos não deverão ser renderizados.

======================================================================
PERFORMANCE
======================================================================

Implementar:

Debounce

Batch Rendering

Atualizações parciais

Cache interno quando apropriado

Evitar renders desnecessários.

======================================================================
NÃO IMPLEMENTAR
======================================================================

Templates

Biblioteca de Assets

QR Code

vCard

Importação

Plugins

Favoritos

Compatibilidade específica por cliente

Esses recursos pertencem às próximas fases.

======================================================================
TESTES
======================================================================

Criar testes básicos para:

Signature Engine

Layout Engine

Style Engine

HTML Renderer

Preview Renderer

Integração com Store

Integração com Event Bus

======================================================================
DOCUMENTAÇÃO
======================================================================

Documentar todos os novos módulos.

Atualizar:

CHANGELOG.md

quando houver alterações relevantes.

Caso alguma decisão arquitetural seja necessária, registrar também em:

ARCHITECTURE.md

======================================================================
QUALIDADE
======================================================================

Seguir rigorosamente:

PROJECT_CONTEXT.md

AI_RULES.md

ROADMAP.md

CHANGELOG.md

ARCHITECTURE.md

Aplicar:

SOLID

DRY

KISS

Clean Code

Single Responsibility Principle

Todo código deverá:

- reutilizar módulos existentes

- evitar duplicação

- preservar compatibilidade com todas as fases anteriores

- manter a arquitetura modular

- possuir nomenclatura consistente

======================================================================
ENTREGA
======================================================================

Atualizar apenas os arquivos necessários.

Criar novos arquivos somente quando indispensáveis.

Antes de criar qualquer novo módulo, verificar se já existe implementação equivalente.

Se existir, reutilizar e expandir o módulo existente.

Caso a implementação exceda o limite de contexto, dividir automaticamente a Fase 4B em entregas incrementais por subsistema.

Cada entrega deverá permanecer:

- funcional

- integrada

- compatível

- documentada

antes de iniciar a próxima.

Considerar a Fase 4B concluída apenas quando:

- o Signature Engine estiver funcional;

- o Preview utilizar dados reais provenientes do Store;

- o HTML compatível com clientes de e-mail puder ser gerado pelo Renderer;

- a infraestrutura de exportação estiver preparada reutilizando o Renderer;

- toda comunicação ocorrer através do Store e Event Bus;

- a arquitetura existente permanecer integralmente preservada.
