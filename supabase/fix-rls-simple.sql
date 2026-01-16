-- SOLUÇÃO SIMPLES E DIRETA
-- Execute APENAS este SQL no Supabase SQL Editor

-- 1. Desabilitar RLS temporariamente
ALTER TABLE public.orcamentos DISABLE ROW LEVEL SECURITY;

-- OU se preferir manter RLS ativado, execute estas linhas ao invés:

-- Remover todas as políticas
DROP POLICY IF EXISTS "Permitir inserção pública de orçamentos" ON public.orcamentos;
DROP POLICY IF EXISTS "Permitir leitura de orçamentos para autenticados" ON public.orcamentos;
DROP POLICY IF EXISTS "Permitir atualização de orçamentos para autenticados" ON public.orcamentos;

-- Criar política SUPER permissiva (sem restrição de role)
CREATE POLICY "Permitir inserção pública de orçamentos"
  ON public.orcamentos
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir leitura de orçamentos para autenticados"
  ON public.orcamentos
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Permitir atualização de orçamentos para autenticados"
  ON public.orcamentos
  FOR UPDATE
  TO authenticated
  USING (true);

-- Reabilitar RLS se foi desabilitado
-- ALTER TABLE public.orcamentos ENABLE ROW LEVEL SECURITY;
