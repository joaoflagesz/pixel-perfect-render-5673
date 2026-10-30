# Gestão de Peças Automotivas

Sistema de gestão de estoque para oficina, com React, TypeScript, TanStack Start, Tailwind CSS e Supabase.

## Configuração

1. Crie um projeto no Supabase.
2. Execute o SQL de `supabase/migrations/001_initial_schema.sql` no SQL Editor.
3. Crie um bucket privado chamado `part-photos` (a migration também documenta as políticas necessárias).
4. Copie `.env.example` para `.env` e informe a URL e a chave anon/public do Supabase.
5. Execute `npm install` e `npm run dev`.

A chave service_role nunca deve ser colocada no navegador. O app usa somente a chave anon/public e políticas RLS.

## Estado da implementação

A base inclui autenticação Supabase, isolamento multiempresa por RLS, cadastro de peças, aplicações veiculares, galeria de fotos no Storage, movimentações de estoque e painel alimentado pelos dados persistidos. Os demais módulos previstos no documento devem ser entregues em etapas incrementais e testados antes de uso em produção.
