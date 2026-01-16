-- Adicionar política RLS para permitir DELETE de orçamentos para usuários autenticados
-- Execute este script no SQL Editor do Supabase Dashboard

-- Remover política antiga se existir
DROP POLICY IF EXISTS "Permitir exclusão de orçamentos para autenticados" ON public.orcamentos;

-- Política para permitir exclusão apenas para usuários autenticados (admin)
CREATE POLICY "Permitir exclusão de orçamentos para autenticados"
  ON public.orcamentos
  FOR DELETE
  TO authenticated
  USING (true);

-- Verificar políticas existentes
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE tablename = 'orcamentos'
ORDER BY cmd;
