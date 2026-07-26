# Regras para uso com IA

## Arquitetura

- Nunca alterar a arquitetura aprovada.
- Nunca reorganizar diretórios existentes.
- Nunca duplicar funcionalidades.

## Código

- Reutilizar código existente sempre que possível.
- Respeitar SOLID.
- Respeitar DRY.
- Respeitar KISS.
- Manter baixo acoplamento.

## Estado

- Todo dado permanente pertence ao Store.
- Componentes não armazenam estado.
- Comunicação entre módulos apenas pelo Event Bus.

## Renderização

- Preview e HTML devem utilizar exatamente a mesma representação da assinatura.
- Nunca criar HTML diretamente dentro dos componentes.

## Templates

- Templates apenas definem aparência.
- Templates nunca implementam regras de negócio.

## Documentação

Sempre manter sincronizados:

- CHANGELOG.md
- ROADMAP.md
- PROJECT_CONTEXT.md
- CURRENT_PHASE.md

Sempre atualizar a versão do projeto quando uma fase for concluída.

## Compatibilidade

- Não adicionar frameworks.
- Não adicionar dependências externas sem aprovação.
- Preservar compatibilidade com fases concluídas.