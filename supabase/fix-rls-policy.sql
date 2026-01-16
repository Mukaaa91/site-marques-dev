-- Script para corrigir políticas RLS da tabela orcamentos
-- Execute este SQL no Supabase SQL Editor se estiver recebendo erro de RLS

-- Remover todas as políticas existentes
DROP POLICY IF EXISTS "Permitir inserção pública de orçamentos" ON public.orcamentos;
DROP POLICY IF EXISTS "Permitir leitura de orçamentos para autenticados" ON public.orcamentos;
DROP POLICY IF EXISTS "Permitir atualização de orçamentos para autenticados" ON public.orcamentos;

-- Criar política de INSERT que permite inserção pública
CREATE POLICY "Permitir inserção pública de orçamentos"
  ON public.orcamentos
  FOR INSERT
  TO anon, authenticated, public
  WITH CHECK (true);

-- Criar política de SELECT apenas para autenticados
CREATE POLICY "Permitir leitura de orçamentos para autenticados"
  ON public.orcamentos
  FOR SELECT
  TO authenticated
  USING (true);

-- Criar política de UPDATE apenas para autenticados
CREATE POLICY "Permitir atualização de orçamentos para autenticados"
  ON public.orcamentos
  FOR UPDATE
  TO authenticated
  USING (true);

-- Verificar se as políticas foram criadas
SELECT * FROM pg_policies WHERE tablename = 'orcamentos';
