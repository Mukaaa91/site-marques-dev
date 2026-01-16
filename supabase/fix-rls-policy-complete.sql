-- SOLUÇÃO COMPLETA PARA CORRIGIR ERRO DE RLS
-- Execute TODO este SQL no Supabase SQL Editor

-- 1. Desabilitar temporariamente o RLS para verificar se funciona
ALTER TABLE public.orcamentos DISABLE ROW LEVEL SECURITY;

-- 2. Remover TODAS as políticas existentes (caso existam)
DROP POLICY IF EXISTS "Permitir inserção pública de orçamentos" ON public.orcamentos;
DROP POLICY IF EXISTS "Permitir leitura de orçamentos para autenticados" ON public.orcamentos;
DROP POLICY IF EXISTS "Permitir atualização de orçamentos para autenticados" ON public.orcamentos;

-- 3. Reabilitar RLS
ALTER TABLE public.orcamentos ENABLE ROW LEVEL SECURITY;

-- 4. Criar política de INSERT que permite QUALQUER inserção pública
-- Esta é a forma mais permissiva possível
CREATE POLICY "Permitir inserção pública de orçamentos"
  ON public.orcamentos
  FOR INSERT
  WITH CHECK (true);

-- 5. Criar política de SELECT (apenas para visualização futura de admins)
CREATE POLICY "Permitir leitura de orçamentos para autenticados"
  ON public.orcamentos
  FOR SELECT
  TO authenticated
  USING (true);

-- 6. Criar política de UPDATE (apenas para admins)
CREATE POLICY "Permitir atualização de orçamentos para autenticados"
  ON public.orcamentos
  FOR UPDATE
  TO authenticated
  USING (true);

-- 7. Verificar se as políticas foram criadas
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'orcamentos';

-- 8. Testar inserção manual (deve funcionar agora)
-- Descomente as linhas abaixo para testar:
/*
INSERT INTO public.orcamentos (nome, email, telefone, tipo_projeto, descricao)
VALUES ('Teste RLS', 'teste@teste.com', '(11) 99999-9999', 'landing', 'Teste de inserção');

SELECT * FROM public.orcamentos WHERE email = 'teste@teste.com';
*/
