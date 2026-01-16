-- Script para criar um usuário administrador no Supabase Auth
-- Execute este script no SQL Editor do Supabase Dashboard

-- IMPORTANTE: Este é apenas um exemplo. Em produção, use a interface do Supabase Auth
-- ou a API de administração para criar usuários.

-- Opção 1: Criar usuário via Supabase Dashboard
-- 1. Acesse: Authentication > Users > Add User
-- 2. Preencha o email e senha
-- 3. O usuário será criado automaticamente

-- Opção 2: Criar via SQL (requer extensão auth)
-- NOTA: A criação de usuários via SQL requer privilégios especiais
-- e geralmente é feita através da API ou Dashboard

-- Opção 3: Usar a função signUp do Supabase (Recomendado)
-- No seu código, você pode criar um endpoint administrativo protegido
-- que cria usuários apenas para desenvolvedores/admins

-- Para testar, você pode criar um usuário através do código:
-- Veja o arquivo: app/api/admin/create-user/route.ts (criar se necessário)

-- Exemplo de como criar usuário programaticamente (apenas para setup inicial):
-- 
-- POST /api/admin/create-user
-- {
--   "email": "admin@mintwebsite.com",
--   "password": "senha-forte-123"
-- }

-- OU use o Supabase Dashboard:
-- 1. Vá em Authentication > Users
-- 2. Clique em "Add User"
-- 3. Preencha email e senha
-- 4. O usuário estará pronto para fazer login

-- Verificar usuários existentes:
SELECT id, email, created_at, last_sign_in_at 
FROM auth.users 
ORDER BY created_at DESC;
