# Configuração de Atualizações em Tempo Real

## Sistema de Realtime Implementado

O painel admin agora recebe atualizações em tempo real quando novos orçamentos são enviados pelo formulário do site.

### Funcionalidades
- ✅ Atualizações instantâneas quando um novo orçamento é criado
- ✅ Notificações visuais (toast) quando um novo orçamento chega
- ✅ Atualização automática quando um orçamento é modificado
- ✅ Remoção automática quando um orçamento é deletado
- ✅ Indicador visual de conexão Realtime no header
- ✅ Botão "Ver" na notificação para abrir o orçamento diretamente

## Como Habilitar Realtime no Supabase

### Passo 1: Executar SQL no Supabase Dashboard

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **SQL Editor**
4. Execute o script `supabase/enable-realtime.sql`:

```sql
-- Habilitar Realtime para a tabela orcamentos
ALTER PUBLICATION supabase_realtime ADD TABLE public.orcamentos;
```

### Passo 2: Verificar se Realtime está Habilitado

Execute este SQL para verificar:

```sql
SELECT 
    schemaname,
    tablename,
    pubname
FROM pg_publication_tables
WHERE tablename = 'orcamentos';
```

Se retornar uma linha com `supabase_realtime`, está habilitado!

### Passo 3: Habilitar Realtime no Dashboard (Alternativa)

Se preferir usar a interface gráfica:

1. Acesse o Supabase Dashboard
2. Vá em **Database** > **Replication**
3. Encontre a tabela `orcamentos`
4. Ative o toggle para habilitar Realtime

## Como Funciona

### No Painel Admin

Quando você acessa `/admin` e está autenticado:

1. O sistema conecta automaticamente ao Supabase Realtime
2. Uma subscription é criada para escutar mudanças na tabela `orcamentos`
3. Quando um novo orçamento é inserido:
   - O orçamento aparece instantaneamente na lista
   - Uma notificação toast aparece com o nome do cliente
   - Um botão "Ver" na notificação abre o detalhe do orçamento
4. Quando um orçamento é atualizado:
   - A lista é atualizada automaticamente
   - O modal de detalhes também é atualizado se estiver aberto
5. Quando um orçamento é deletado:
   - É removido automaticamente da lista
   - O modal fecha se estava aberto

### Indicadores Visuais

- **Ponto verde pulsante** no header: Indica que Realtime está conectado
- **Toast de sucesso**: Quando conecta ao Realtime
- **Toast de novo orçamento**: Quando um novo orçamento chega
- **Toast de erro**: Se houver problemas na conexão

## Logs do Console

O sistema registra eventos importantes no console do navegador:

- `🔄 Conectando ao Realtime...` - Tentando conectar
- `✅ Conectado ao Realtime com sucesso!` - Conexão estabelecida
- `📨 Evento Realtime recebido:` - Novo evento recebido
- `📡 Status da subscription:` - Status da conexão
- `🔌 Desconectando do Realtime...` - Limpando conexão

Para ver os logs:
1. Abra o DevTools (F12)
2. Vá na aba Console
3. Veja os eventos em tempo real

## Troubleshooting

### Realtime não está funcionando

1. **Verifique se Realtime está habilitado na tabela:**
   ```sql
   SELECT * FROM pg_publication_tables WHERE tablename = 'orcamentos';
   ```

2. **Verifique se você está autenticado:**
   - A subscription só funciona se você estiver logado
   - Verifique se o botão de logout mostra seu email

3. **Verifique o console do navegador:**
   - Procure por erros
   - Verifique se a subscription está conectada

4. **Verifique as variáveis de ambiente:**
   - `NEXT_PUBLIC_SUPABASE_URL` deve estar configurado
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` deve estar configurado

### Erro: "permission denied for publication supabase_realtime"

**Solução:** Você precisa habilitar Realtime manualmente no SQL Editor do Supabase Dashboard. A publicação `supabase_realtime` já existe, você só precisa adicionar a tabela a ela.

### Não recebo notificações

**Possíveis causas:**
1. Realtime não está habilitado na tabela (execute o SQL acima)
2. Você não está autenticado (faça login novamente)
3. O navegador bloqueou notificações (verifique as configurações)

### Conexão desconecta frequentemente

**Soluções:**
1. Verifique sua conexão com a internet
2. Verifique os logs do Supabase Dashboard para problemas no serviço
3. O sistema reconecta automaticamente quando possível

## Desabilitar Realtime (se necessário)

Se precisar desabilitar temporariamente:

```sql
ALTER PUBLICATION supabase_realtime DROP TABLE public.orcamentos;
```

Ou no código, comente o `useEffect` que contém a subscription.

## Performance

### Otimizações Implementadas

- A subscription é criada apenas quando autenticado
- Cleanup automático ao desmontar o componente
- Reconnection automática em caso de falha
- Atualizações otimizadas usando `setState` com callbacks

### Limitações

- O Realtime usa WebSockets, então requer conexão estável
- Muitas subscriptions podem consumir recursos
- Rate limiting pode aplicar limites no Supabase

## Próximos Passos

Possíveis melhorias futuras:

- [ ] Notificações sonoras quando novo orçamento chega
- [ ] Badge com contador de novos orçamentos não lidos
- [ ] Histórico de atualizações em tempo real
- [ ] Dashboard com gráficos atualizados em tempo real
- [ ] Colaboração em tempo real (múltiplos admins)

## Arquivos Modificados

- `app/admin/page.tsx` - Adicionado subscription Realtime
- `supabase/enable-realtime.sql` - SQL para habilitar Realtime
