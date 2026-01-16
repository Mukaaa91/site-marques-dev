# Configuração do Painel Admin

## Sistema de Autenticação Implementado

O painel admin (`/admin`) agora está protegido com autenticação usando Supabase Auth.

### Funcionalidades
- ✅ Página de login profissional
- ✅ Verificação de autenticação em tempo real
- ✅ Proteção da rota /admin
- ✅ Botão de logout
- ✅ Exibição do email do usuário logado

## Como Criar o Usuário Admin

### Opção 1: Via Supabase Dashboard (Recomendado)

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **Authentication** > **Users**
4. Clique em **Add User** ou **Create User**
5. Preencha:
   - **Email**: Seu email (ex: admin@mintwebsite.com)
   - **Password**: Uma senha forte (mínimo 8 caracteres)
   - **Auto Confirm User**: Marque esta opção para não precisar confirmar o email
6. Clique em **Create User**
7. Pronto! Agora você pode fazer login no `/admin`

### Opção 2: Via Código (Temporário - Apenas para Setup)

Você pode criar um script temporário para criar o primeiro usuário admin:

```typescript
// scripts/create-admin.ts (temporário, depois deletar)
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createAdmin() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'admin@mintwebsite.com',
    password: 'sua-senha-forte-123',
    email_confirm: true // Confirmar email automaticamente
  })

  if (error) {
    console.error('Erro:', error)
  } else {
    console.log('✅ Admin criado com sucesso!', data.user?.email)
  }
}

createAdmin()
```

**⚠️ Importante:** Após criar o usuário, delete este script por segurança!

## Como Fazer Login

1. Acesse: `http://localhost:3000/admin` (ou `https://seu-site.com/admin` em produção)
2. Você verá a tela de login
3. Digite o email e senha do usuário admin criado
4. Clique em **Entrar**
5. Você será redirecionado para o painel de orçamentos

## Segurança

### Recomendações Importantes

1. **Use senha forte**: Mínimo 12 caracteres, com letras, números e símbolos
2. **Não compartilhe as credenciais**: Mantenha o acesso restrito
3. **Use HTTPS em produção**: Sempre use SSL/TLS em produção
4. **Considere 2FA**: Para maior segurança, considere implementar autenticação de dois fatores
5. **Monitore acessos**: Verifique periodicamente os acessos ao painel no Supabase Dashboard

### Próximos Passos de Segurança

- [ ] Implementar rate limiting na API
- [ ] Adicionar autenticação de dois fatores (2FA)
- [ ] Implementar logging de acessos
- [ ] Configurar alertas para tentativas de login falhadas
- [ ] Adicionar IP whitelist se necessário

## Estrutura do Sistema de Autenticação

```
components/
  └── admin-login.tsx       # Componente de login

app/
  └── admin/
      └── page.tsx          # Página do admin (protegida)

lib/
  └── supabase.ts           # Cliente Supabase configurado
```

## Troubleshooting

### Erro: "E-mail ou senha incorretos"
- Verifique se o usuário foi criado no Supabase
- Confirme que o email está correto
- Verifique se o email foi confirmado (auto-confirm na criação)

### Erro: "Missing Supabase environment variables"
- Verifique se `.env.local` existe
- Confirme que `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` estão configurados
- Reinicie o servidor após adicionar as variáveis

### Não consigo acessar /admin mesmo após login
- Limpe o cache do navegador
- Verifique o console do navegador para erros
- Confirme que o usuário tem uma sessão ativa no Supabase

## Suporte

Se encontrar problemas:
1. Verifique os logs do console do navegador
2. Verifique os logs do servidor
3. Confirme as configurações do Supabase no Dashboard
4. Verifique as variáveis de ambiente
