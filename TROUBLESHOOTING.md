# Troubleshooting - Erro 500 ao Enviar Orçamento

## Problema
Erro 500 ao tentar enviar formulário de orçamento.

## Soluções

### 1. Verificar se a tabela foi criada no Supabase

**Passos:**
1. Acesse https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **SQL Editor** no menu lateral
4. Execute o SQL do arquivo `supabase/schema.sql`
5. Verifique se a tabela foi criada em **Table Editor**

**SQL para verificar se a tabela existe:**
```sql
SELECT * FROM public.orcamentos LIMIT 1;
```

### 2. Verificar Variáveis de Ambiente

Certifique-se de que o arquivo `.env.local` existe na raiz do projeto com:

```env
NEXT_PUBLIC_SUPABASE_URL=https://eledmgriigpegfynbwvg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsZWRtZ3JpaWdwZWdmeW5id3ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1MTkzMTEsImV4cCI6MjA4NDA5NTMxMX0.uucbm4kEqE_TuwEoqJKfovtTCTKWGmgz4EkQrp90ws0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsZWRtZ3JpaWdwZWdmeW5id3ZnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODUxOTMxMSwiZXhwIjoyMDg0MDk1MzExfQ.R-DEcuuZzYrgB67c2pyxk2I4u6B4_h4gGA-5qstZbuo
```

**Após criar/atualizar o .env.local:**
1. Reinicie o servidor de desenvolvimento (`pnpm dev`)
2. As variáveis de ambiente são carregadas apenas na inicialização

### 3. Verificar Logs do Servidor

Os logs agora mostram mais detalhes. Verifique:
- Console do terminal onde o servidor está rodando
- Console do navegador (F12 > Console)
- Mensagens de erro mais específicas

### 4. Verificar Políticas RLS

Se a tabela foi criada mas ainda dá erro, verifique as políticas RLS:

**No Supabase SQL Editor, execute:**
```sql
-- Verificar políticas existentes
SELECT * FROM pg_policies WHERE tablename = 'orcamentos';

-- Se necessário, recriar a política de INSERT
DROP POLICY IF EXISTS "Permitir inserção pública de orçamentos" ON public.orcamentos;
CREATE POLICY "Permitir inserção pública de orçamentos"
  ON public.orcamentos
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
```

### 5. Testar a Conexão

**No Supabase SQL Editor, teste a inserção manual:**
```sql
INSERT INTO public.orcamentos (nome, email, telefone, tipo_projeto, descricao)
VALUES ('Teste', 'teste@teste.com', '(11) 99999-9999', 'landing', 'Descrição de teste');

-- Verificar se foi inserido
SELECT * FROM public.orcamentos WHERE email = 'teste@teste.com';
```

## Erros Comuns

### "relation 'orcamentos' does not exist"
- **Causa**: Tabela não foi criada
- **Solução**: Execute o SQL schema no Supabase

### "new row violates row-level security policy"
- **Causa**: Política RLS bloqueando inserção
- **Solução**: Verifique e recrie a política de INSERT

### "Missing Supabase environment variables"
- **Causa**: Variáveis de ambiente não configuradas
- **Solução**: Crie o arquivo .env.local e reinicie o servidor

### "permission denied for table orcamentos"
- **Causa**: Permissões do usuário anon
- **Solução**: Verifique as políticas RLS no Supabase

## Mensagens de Erro Melhoradas

A API agora retorna mensagens de erro mais detalhadas em modo de desenvolvimento. Verifique o console do navegador e do servidor para mais informações.
