# Configuração do Supabase

## Passos para criar as tabelas no Supabase

### 1. Acesse o Supabase Dashboard
- Vá para https://supabase.com/dashboard
- Faça login na sua conta
- Selecione o projeto: `eledmgriigpegfynbwvg`

### 2. Execute o SQL Schema
1. No painel do Supabase, vá para **SQL Editor** (menu lateral)
2. Clique em **New Query**
3. Copie todo o conteúdo do arquivo `supabase/schema.sql`
4. Cole no editor SQL
5. Clique em **Run** (ou pressione Ctrl+Enter)

### 3. Verificar se as tabelas foram criadas
1. Vá para **Table Editor** (menu lateral)
2. Você deve ver a tabela `orcamentos` criada
3. Verifique se as colunas estão corretas

### 4. Configuração de Variáveis de Ambiente
O arquivo `.env.local` já foi criado com as credenciais do Supabase:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **Importante**: O arquivo `.env.local` não deve ser commitado no git (já está no .gitignore).

### 5. Estrutura da Tabela

A tabela `orcamentos` possui os seguintes campos:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | ID único (gerado automaticamente) |
| `nome` | VARCHAR(255) | Nome completo (obrigatório) |
| `email` | VARCHAR(255) | E-mail (obrigatório) |
| `telefone` | VARCHAR(20) | Telefone (obrigatório) |
| `empresa` | VARCHAR(255) | Nome da empresa (opcional) |
| `tipo_projeto` | VARCHAR(50) | Tipo: landing, institucional, portfolio, blog, ecommerce, personalizado |
| `orcamento_estimado` | VARCHAR(50) | Faixa: 1000-3000, 3000-5000, 5000-10000, 10000+ |
| `descricao` | TEXT | Descrição do projeto (obrigatório) |
| `status` | VARCHAR(20) | Status: novo, lido, em_andamento, respondido, concluido, cancelado |
| `observacoes` | TEXT | Observações internas (opcional) |
| `created_at` | TIMESTAMP | Data de criação (automático) |
| `updated_at` | TIMESTAMP | Data de atualização (automático) |

### 6. Políticas de Segurança (RLS)

As seguintes políticas foram criadas:
- **INSERT**: Qualquer usuário (anon/authenticated) pode inserir orçamentos
- **SELECT**: Apenas usuários autenticados podem ler orçamentos
- **UPDATE**: Apenas usuários autenticados podem atualizar orçamentos

### 7. Teste o Sistema

1. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```

2. Acesse a página de orçamento:
   - http://localhost:3000/orcamento
   - ou http://localhost:3000/#orcamento

3. Preencha e envie o formulário

4. Verifique no Supabase Dashboard (Table Editor) se o orçamento foi salvo

### 8. API Routes

As seguintes rotas API foram criadas:
- `POST /api/orcamentos` - Criar novo orçamento
- `GET /api/orcamentos` - Listar todos os orçamentos (requer autenticação)

### 9. Componente do Formulário

O componente `OrcamentoForm` foi criado em `components/orcamento-form.tsx` e está sendo usado em:
- `/app/orcamento/page.tsx`
- `/app/page.tsx` (seção de orçamento)

### Problemas Comuns

**Erro: "Missing Supabase environment variables"**
- Verifique se o arquivo `.env.local` existe na raiz do projeto
- Verifique se as variáveis estão corretas

**Erro: "relation 'orcamentos' does not exist"**
- Execute o SQL schema no Supabase (passo 2)

**Erro: "new row violates row-level security policy"**
- Verifique se as políticas RLS estão ativadas corretamente
- Execute novamente o SQL schema

## Estrutura de Arquivos Criados

```
.
├── .env.local                          # Variáveis de ambiente (não commitado)
├── supabase/
│   └── schema.sql                      # SQL para criar as tabelas
├── lib/
│   └── supabase.ts                     # Cliente Supabase e tipos
├── app/
│   └── api/
│       └── orcamentos/
│           └── route.ts                # API routes para orçamentos
└── components/
    └── orcamento-form.tsx              # Componente do formulário
```

## Próximos Passos (Opcional)

- Criar painel admin para visualizar/gerenciar orçamentos
- Adicionar autenticação para acesso ao painel
- Configurar notificações por e-mail quando um orçamento for enviado
- Adicionar validação mais robusta nos campos
- Implementar busca e filtros para os orçamentos
