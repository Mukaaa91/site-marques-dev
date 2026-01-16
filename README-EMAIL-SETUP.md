# Configuração de Email Profissional

## Forma Mais Profissional de Receber Orçamentos

Implementei um sistema completo com:

### ✅ Funcionalidades Implementadas

1. **Notificações por Email**
   - Email HTML profissional enviado automaticamente quando um orçamento é recebido
   - Template formatado com todas as informações do orçamento
   - Link direto para o painel admin

2. **Painel Admin Profissional** (`/admin/orcamentos`)
   - Visualização de todos os orçamentos
   - Estatísticas em tempo real
   - Busca e filtros
   - Gerenciamento de status
   - Ações rápidas (email, WhatsApp)
   - Visualização detalhada de cada orçamento

3. **API Routes**
   - `POST /api/orcamentos` - Criar orçamento e enviar email
   - `GET /api/orcamentos` - Listar todos os orçamentos
   - `PATCH /api/orcamentos/[id]` - Atualizar status
   - `DELETE /api/orcamentos/[id]` - Deletar orçamento

## Configuração de Email

### Opção 1: Gmail (Rápido para testes)

Adicione ao `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-de-app
ADMIN_EMAIL=contato@mintwebsite.com
NEXT_PUBLIC_SITE_URL=https://seu-site.com
```

**Para Gmail, você precisa criar uma "Senha de App":**
1. Acesse: https://myaccount.google.com/apppasswords
2. Gere uma senha de app
3. Use essa senha no `SMTP_PASSWORD`

### Opção 2: Serviços Profissionais (Recomendado)

#### SendGrid (Recomendado para produção)
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=sua-api-key-do-sendgrid
ADMIN_EMAIL=contato@mintwebsite.com
```

#### Resend (Moderno e fácil)
```env
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASSWORD=sua-api-key-do-resend
ADMIN_EMAIL=contato@mintwebsite.com
```

#### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=seu-usuario-mailgun
SMTP_PASSWORD=sua-senha-mailgun
ADMIN_EMAIL=contato@mintwebsite.com
```

### Opção 3: Sem Email (Apenas Database)

Se não configurar email, o sistema funciona normalmente:
- Orçamentos são salvos no Supabase
- Você pode visualizar no painel admin
- Apenas não receberá notificações por email

## Como Acessar o Painel Admin

1. Acesse: `http://localhost:3000/admin`
2. Ou em produção: `https://seu-site.com/admin`

**⚠️ Importante:** O painel admin atualmente não tem autenticação. Para produção, você deve adicionar:
- Autenticação com Supabase Auth
- Proteção de rota
- Sistema de login

## Funcionalidades do Painel Admin

### 📊 Estatísticas
- Total de orçamentos
- Novos orçamentos
- Em andamento
- Concluídos

### 🔍 Busca e Filtros
- Buscar por nome, email ou telefone
- Filtrar por status
- Atualizar lista em tempo real

### 📋 Gerenciamento
- Alterar status diretamente
- Visualizar detalhes completos
- Enviar email com um clique
- Abrir WhatsApp com um clique
- Excluir orçamentos

### 🎨 Interface
- Design moderno e responsivo
- Cards visuais para cada orçamento
- Modal de detalhes completo
- Badges de status coloridos

## Próximos Passos Recomendados

1. **Autenticação no Painel Admin**
   - Implementar login com Supabase Auth
   - Proteger a rota `/admin`

2. **Notificações Adicionais**
   - Integração com WhatsApp Business API
   - Notificações push no navegador
   - Integração com Slack/Discord

3. **Automações**
   - Email automático de confirmação para o cliente
   - Respostas automáticas baseadas em templates
   - Lembretes automáticos de follow-up

4. **Analytics**
   - Dashboard com gráficos
   - Taxa de conversão
   - Tempo médio de resposta
   - Projetos mais solicitados

5. **Exportação**
   - Exportar para CSV/Excel
   - Relatórios PDF
   - Integração com CRM

## Estrutura de Arquivos Criados

```
lib/
  └── email.ts                    # Sistema de envio de emails

app/
  ├── api/
  │   └── orcamentos/
  │       ├── route.ts            # GET, POST
  │       └── [id]/
  │           └── route.ts        # PATCH, DELETE
  └── admin/
      └── orcamentos/
          └── page.tsx            # Painel admin

supabase/
  ├── schema.sql                  # Schema da tabela
  └── fix-rls-simple.sql          # Correção de RLS
```

## Testar o Sistema

1. **Configure o email** (ou pule se quiser apenas o banco de dados)
2. **Acesse o formulário**: `/orcamento` ou `/#orcamento`
3. **Envie um orçamento de teste**
4. **Verifique**:
   - Email recebido (se configurado)
   - Orçamento salvo no Supabase
   - Aparece no painel admin

## Segurança

⚠️ **Importante para Produção:**
- Adicione autenticação ao painel admin
- Use HTTPS
- Configure CORS adequadamente
- Proteja as API routes
- Use variáveis de ambiente para credenciais
- Não commite `.env.local` no git
