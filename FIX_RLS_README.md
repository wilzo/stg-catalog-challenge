# Fix para Problema de RLS (Row Level Security)

## Problema

O erro `new row violates row-level security policy for table "order_items"` acontece porque as políticas de segurança do Supabase estão bloqueando a inserção de dados na tabela `order_items`.

## Solução

### Passo 1: Acesse o Supabase Dashboard

1. Vá para [supabase.com](https://supabase.com)
2. Faça login na sua conta
3. Selecione seu projeto `stg-catalog-challenge`
4. Vá para a seção **SQL Editor** no menu lateral

### Passo 2: Execute os Comandos SQL

#### Opção A: Script Completo (Recomendado)

Copie e cole o conteúdo do arquivo `fix_rls_policies.sql` no SQL Editor e execute:

```sql
-- Esse script vai:
-- 1. Verificar políticas existentes
-- 2. Remover políticas problemáticas
-- 3. Criar novas políticas que permitem aos usuários gerenciar seus próprios pedidos
-- 4. Habilitar RLS corretamente
```

#### Opção B: Script Simples (Se a Opção A não funcionar)

Se o primeiro script não resolver, use o arquivo `fix_rls_simple.sql`:

```sql
-- Esse script cria políticas mais permissivas para usuários autenticados
```

### Passo 3: Teste a Aplicação

1. Após executar os comandos SQL
2. Teste fazer um pedido na aplicação
3. Verifique se o pedido é salvo corretamente
4. Confirme que o histórico de pedidos aparece no perfil

## O que foi corrigido

1. **Políticas RLS para `order_items`**:

   - Usuários podem ver apenas seus próprios itens de pedido
   - Usuários podem inserir itens apenas para seus próprios pedidos
   - Usuários podem atualizar/deletar apenas seus próprios itens

2. **Políticas RLS para `orders`**:

   - Usuários podem gerenciar apenas seus próprios pedidos
   - Políticas baseadas no `user_id` do pedido

3. **Função de criação de pedidos restaurada**:
   - Volta a criar pedidos completos com itens
   - Mantém logs detalhados para debug
   - Tratamento de erros melhorado

## Verificação

Execute este comando no SQL Editor para verificar se as políticas foram criadas:

```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename IN ('orders', 'order_items')
ORDER BY tablename, policyname;
```

## Funcionalidades Restauradas

✅ **Pedidos Reais**: Agora os pedidos são salvos no banco de dados corretamente
✅ **Histórico Completo**: O histórico mostra os itens reais dos pedidos
✅ **Persistência**: Dados permanecem após atualizar a página
✅ **Perfil**: Edições do perfil são salvas permanentemente
