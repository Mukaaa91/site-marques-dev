-- Script para corrigir problemas de Realtime com RLS
-- Execute este script no SQL Editor do Supabase Dashboard

-- Verificar se Realtime está habilitado
SELECT 
    schemaname,
    tablename,
    pubname
FROM pg_publication_tables
WHERE tablename = 'orcamentos';

-- Se não retornar nenhuma linha, habilite Realtime:
ALTER PUBLICATION supabase_realtime ADD TABLE public.orcamentos;

-- IMPORTANTE: Para Realtime funcionar com RLS, você precisa garantir que:
-- 1. O usuário autenticado tenha permissão SELECT na tabela
-- 2. As políticas RLS permitam que usuários autenticados vejam os dados

-- Verificar políticas RLS atuais
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE tablename = 'orcamentos';

-- Se necessário, ajuste a política SELECT para garantir que usuários autenticados possam ver os dados
-- (Isso já deve estar configurado, mas verifique)

-- Verificar se a tabela tem RLS habilitado
SELECT 
    tablename,
    rowsecurity
FROM pg_tables
WHERE tablename = 'orcamentos';

-- Se rowsecurity for false, habilite:
-- ALTER TABLE public.orcamentos ENABLE ROW LEVEL SECURITY;

-- Para testar se Realtime está funcionando:
-- 1. Faça login no painel admin
-- 2. Abra o console do navegador (F12)
-- 3. Você deve ver "✅ Conectado ao Realtime com sucesso!"
-- 4. Envie um orçamento de teste pelo formulário
-- 5. O orçamento deve aparecer automaticamente no painel
