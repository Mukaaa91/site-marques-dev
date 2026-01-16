-- Habilitar Realtime para a tabela orcamentos
-- Execute este script no SQL Editor do Supabase Dashboard

-- Habilitar publicação Realtime para a tabela orcamentos
ALTER PUBLICATION supabase_realtime ADD TABLE public.orcamentos;

-- Se a publicação não existir, crie-a:
-- CREATE PUBLICATION supabase_realtime FOR TABLE public.orcamentos;

-- Verificar se Realtime está habilitado
SELECT 
    schemaname,
    tablename,
    pubname
FROM pg_publication_tables
WHERE tablename = 'orcamentos';

-- Para desabilitar Realtime (se necessário):
-- ALTER PUBLICATION supabase_realtime DROP TABLE public.orcamentos;
