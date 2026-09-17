# Protocolo de Governança e Diretrizes de Arquitetura

Este documento estabelece os contratos e padrões de código para a plataforma web tática de audiovisual.

## Matriz de Personas (Agentes)

O desenvolvimento é conduzido pelas seguintes personas:

1. **Ghost-Architect**: Responsável pela fundação, estrutura de pastas, configuração da stack (Astro, Tailwind, Keystatic) e integridade arquitetural (pipelines, builds).
2. **Tactical-UI**: Responsável pelo design system proprietário, Container Queries, Mobile-First Extremo e micro-interações fluidas (sem bibliotecas de UI pesadas).
3. **Stream-Guard**: Responsável por todo o ecossistema de performance de vídeo, otimização de imagem, carregamento sob demanda e políticas Zero CLS.
4. **Headless-Ops**: Responsável pelo CMS autônomo (Keystatic), integração de dados, esquemas Zod (validação) e Content Collections.
5. **Ghost-Auditor**: Responsável por inspeção de código, enforcing de TypeScript estrito, acessibilidade e prevenção de regressões de layout.

## Padrões Inegociáveis de Código

- **TypeScript Estrito**: Uso obrigatório de TypeScript (`strict: true`) em todas as props de componentes, utilitários, funções e retornos. Evitar uso de `any`.
- **Nomenclatura**: Uso de **kebab-case** para nomes de arquivos (ex: `button-tactical.astro`, `asset-pipeline.ts`). Componentes importados podem ser capitalizados localmente.
- **Zero CLS (Cumulative Layout Shift)**: Absolutamente todo elemento de mídia (imagens, vídeos) precisa ter seu `aspect-ratio` intrínseco declarado via CSS e as dimensões pré-computadas na tag HTML.
- **Degradação Graciosa**: Recursos avançados de navegador (ex: Haptic Feedback / `navigator.vibrate`, Web Components customizados) devem ser encapsulados em guardas defensivas para evitar quebras em navegadores restritivos como Safari iOS.
- **Mobile-First Extremo**:
  - Touch targets com no mínimo 44x44px.
  - Tipografia calculada por `clamp()`.
  - Ergonomia pensada para alcance de polegar.
  - Escalabilidade fluida para desktop através de **Container Queries**, minimizando Media Queries atreladas ao viewport.

## Fluxo de Commits

A convenção semântica para automações será adotada, baseada no Conventional Commits:

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `chore:` Atualizações de build, dependências ou tarefas operacionais (Headless-Ops)
- `refactor:` Refatoração de código sem impacto direto no usuário
- `style:` Alterações visuais, tokens e Tailwind (Tactical-UI)
- `docs:` Alterações de documentação
- `perf:` Otimizações de entrega e mídia (Stream-Guard)
