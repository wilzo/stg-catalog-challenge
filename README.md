# 🛒 Wilson Market

## Sobre o Projeto

Sistema completo de e-commerce moderno e responsivo. Uma aplicação full-stack que oferece autenticação segura de usuários, catálogo de produtos com paginação, carrinho de compras inteligente, gerenciamento de imagens e integração com WhatsApp para finalização de pedidos.

### 🎯 Principais Funcionalidades

- **Catálogo de Produtos**: Navegação otimizada com paginação (12 produtos por página)
- **Sistema de Busca**: Busca em tempo real com debounce para performance
- **Carrinho Inteligente**: Adição/remoção de produtos com persistência no banco
- **Checkout Completo**: Tela de confirmação de pedidos com integração WhatsApp
- **Perfil de Usuário**: Gerenciamento completo de perfil e histórico de pedidos
- **Upload de Imagens**: Sistema seguro para gerenciar imagens dos produtos
- **Autenticação Robusta**: Login seguro com políticas RLS do Supabase
- **Interface Responsiva**: Design moderno que funciona em todos os dispositivos
- **Animações Suaves**: Transições elegantes entre páginas e elementos

## 🚀 Tecnologias Utilizadas

### Core Stack

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário para estilização
- **Supabase** - Backend-as-a-Service completo

### Funcionalidades Avançadas

- **Paginação Inteligente** - Máximo 12 produtos por página para otimizar carregamento
- **Upload de Imagens** - Sistema de batch save para gerenciar imagens dos produtos
- **RLS (Row Level Security)** - Segurança avançada no nível de linha do banco
- **Autenticação Contextual** - Controle de acesso baseado em usuários específicos
- **Interface de Perfil** - Dropdown com opções de perfil e logout

### Bibliotecas e Ferramentas

- **@supabase/ssr** - Integração Supabase com Server-Side Rendering
- **Lucide React** - Biblioteca de ícones moderna e consistente
- **Context API** - Gerenciamento de estado global nativo do React
- **ESLint** - Linting e formatação de código

## 📱 Funcionalidades Detalhadas

### 🛍️ Catálogo de Produtos

- Visualização paginada (12 produtos por página)
- Busca em tempo real com debounce
- Carregamento otimizado com skeletons
- Navegação fluida entre páginas

### 🖼️ Gerenciamento de Imagens

- **Upload Seguro**: Apenas usuários autenticados podem fazer upload
- **Sistema de Batch**: Alterações ficam pendentes até serem salvas
- **Interface Intuitiva**: Visual feedback para alterações pendentes
- **Persistência Garantida**: Imagens são salvas permanentemente no banco
- **Rota Protegida**: Acesso via `/upload-images` apenas para usuários logados
- **Validação de Arquivos**: Sistema verifica formato e tamanho das imagens

### 🧪 Páginas de Teste e Desenvolvimento

O projeto inclui páginas de teste para desenvolvimento e debug:

- **`/test-database`**: Testa conexão e operações do banco de dados
- **`/test-supabase`**: Verifica configurações e políticas do Supabase
- **`/test-images`**: Testa sistema de upload e manipulação de imagens
- **`/test-card-images`**: Valida exibição de imagens nos cards de produtos

**Nota**: Essas páginas são para desenvolvimento/debug e podem ser removidas em produção, mas demonstram a metodologia de testes durante o desenvolvimento.

### 🔐 Segurança e Autenticação

- **Login Obrigatório**: Acesso controlado às funcionalidades críticas
- **RLS Policies**: Segurança no nível do banco de dados
- **Sessões Seguras**: Gerenciamento de sessão com Supabase Auth
- **Perfil de Usuário**: Interface para gerenciar conta e logout

### 🛒 Carrinho de Compras

- Adição/remoção em tempo real
- Persistência entre sessões
- Cálculo automático de totais
- Interface responsiva e intuitiva
- Dois fluxos de finalização: checkout completo ou WhatsApp direto

### 🎯 Checkout e Finalização

- **Tela de Confirmação**: Interface elegante para inserir dados do cliente
- **Validação de Formulário**: Verificação em tempo real dos dados inseridos
- **Integração WhatsApp**: Envio automático do pedido formatado para WhatsApp
- **Animações Fluidas**: Feedback visual durante todo o processo de checkout
- **Segurança Total**: Todos os dados são validados antes do envio

### 👤 Perfil e Histórico

- **Perfil Completo**: Visualização e edição de dados pessoais
- **Histórico de Pedidos**: Visualização de todos os pedidos enviados via WhatsApp
- **Modal de Detalhes**: Visualização completa de cada pedido
- **Busca de Pedidos**: Encontre rapidamente pedidos específicos
- **Informações Adicionais**: Telefone, localização e data de cadastro

## 🤖 IA Utilizada no Desenvolvimento

### GitHub Copilot + Claude Sonnet 4.0

- **Assistente Principal**: GitHub Copilot integrado ao VS Code com modelo Claude Sonnet 3.5
- **Como ajudou**: Acelerou significativamente o desenvolvimento de componentes React, configurações do Supabase, lógica de autenticação e validações de formulário
- **Partes geradas com IA**:
  - Estrutura inicial dos contextos (AuthContext, CartContext)
  - Tipagem TypeScript complexa para integração com Supabase
  - Configurações de middleware e proteção de rotas
  - Validações de formulário e tratamento de erros
  - Helpers para manipulação de dados do banco
- **Desenvolvimento Manual**:
  - Arquitetura geral do projeto
  - Lógica de negócio específica do e-commerce
  - Integração personalizada com WhatsApp
  - Design de interface e experiência do usuário
  - Componentes utilizados.

### V0.dev para Layout e Design

- **Ferramenta**: V0.dev (Vercel) para geração de componentes de interface
- **Como foi usado**: Criação de layouts iniciais e estruturas de componentes
- **Prompts utilizados**: Prompts específicos gerados pelo ChatGPT para criar interfaces modernas e responsivas
- **Customização**: Todos os componentes foram adaptados e personalizados para as necessidades específicas do projeto

### ChatGPT para Prompts e Estratégia

- **Uso**: Geração de prompts otimizados para o V0.dev e GitHub Copilot
- **Estratégia**: Criação de prompts específicos para gerar código TypeScript bem tipado
- **Planejamento**: Auxiliou na estruturação da arquitetura do projeto

### Abordagem de Desenvolvimento

- **Componentes Próprios**: Todos os componentes foram desenvolvidos do zero, sem bibliotecas de UI externas
- **Aproveitamento de IA**: Uso inteligente de ferramentas de IA para acelerar desenvolvimento mantendo qualidade
- **Revisão Manual**: Todo código gerado por IA foi revisado, testado e adaptado para garantir qualidade e segurança
- **Iteração Contínua**: Processo iterativo de geração, teste e refinamento com assistência da IA

## 🏗️ Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase (gratuita)
- Editor de código (recomendado: VS Code)

### Passo a Passo

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd wilson-market
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_publica_do_supabase
```

4. **Configure o banco de dados**

Execute os scripts SQL no Supabase SQL Editor para criar as tabelas e políticas:

```sql
-- Configurar RLS para tabela products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública
CREATE POLICY "products_select_policy" ON products
  FOR SELECT TO public USING (true);

-- Política para updates apenas usuários autenticados
CREATE POLICY "products_update_policy" ON products
  FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);
```

5. **Execute o projeto**

```bash
npm run dev
```

6. **Acesse o sistema**

**Páginas Principais:**

- **Catálogo**: `http://localhost:3000/catalog`
- **Carrinho**: `http://localhost:3000/cart`
- **Checkout**: `http://localhost:3000/checkout`
- **Perfil**: `http://localhost:3000/profile`
- **Upload de Imagens**: `http://localhost:3000/upload-images`

**Páginas de Teste/Debug (para desenvolvimento):**

- **Teste Database**: `http://localhost:3000/test-database`
- **Teste Supabase**: `http://localhost:3000/test-supabase`
- **Teste Images**: `http://localhost:3000/test-images`
- **Teste Card Images**: `http://localhost:3000/test-card-images`

**Nota**: O login será solicitado automaticamente se necessário

## 🔧 Metodologia de Desenvolvimento

### 🧪 Approach Test-Driven

Durante o desenvolvimento, foram criadas páginas específicas para testar cada funcionalidade:

- **Testes de Banco**: Validação de conexões e operações CRUD
- **Testes de Upload**: Verificação do sistema de imagens
- **Testes de Interface**: Validação de componentes visuais
- **Debug em Tempo Real**: Páginas que mostram estado atual do sistema

### 🔄 Processo Iterativo

1. **Desenvolvimento com IA**: Uso do GitHub Copilot para acelerar criação
2. **Teste Imediato**: Páginas de teste para validar funcionalidades
3. **Refinamento Manual**: Ajustes e melhorias baseados nos testes
4. **Integração**: Combinação de todas as partes testadas

### 🎯 Qualidade de Código

- **TypeScript Strict**: Tipagem rigorosa em todo o projeto
- **ESLint**: Linting automático para consistência
- **Componentes Reutilizáveis**: Arquitetura modular e escalável
- **Context API**: Gerenciamento de estado centralizado e eficiente

## 📁 Estrutura de Arquivos

```
src/
├── app/
│   ├── auth/          # Páginas de autenticação
│   ├── catalog/       # Catálogo principal com paginação
│   ├── cart/          # Carrinho de compras
│   ├── checkout/      # Tela de finalização e confirmação
│   ├── profile/       # Perfil do usuário e histórico de pedidos
│   │   └── orders/    # Página com todos os pedidos
│   ├── upload-images/ # Gerenciamento de imagens (protegido)
│   ├── test-database/ # 🧪 Teste de conexão com banco
│   ├── test-supabase/ # 🧪 Teste de configurações Supabase
│   ├── test-images/   # 🧪 Teste de sistema de upload
│   └── test-card-images/ # 🧪 Teste de exibição de imagens
├── components/
│   ├── Header.tsx           # Cabeçalho com perfil dropdown
│   ├── Pagination.tsx       # Componente de paginação
│   ├── WhatsAppButton.tsx   # Botão reutilizável para WhatsApp
│   ├── OrderHistory.tsx     # Histórico de pedidos recentes
│   ├── OrderModal.tsx       # Modal para visualizar pedidos
│   ├── EditProfileModal.tsx # Modal para editar perfil
│   ├── ImageUpload.tsx      # Upload de imagens
│   ├── ImageUploadAuth.tsx  # Autenticação para upload
│   └── ProductDetailView.tsx # Detalhes do produto (sem avaliações)
├── context/
│   ├── AuthContext.tsx      # Contexto de autenticação
│   └── CartContext.tsx      # Contexto do carrinho
└── lib/
    ├── supabase-helpers.ts  # Funções do banco
    └── upload-images.ts     # Helpers para upload
```

## 🔐 Credenciais de Acesso

### Upload de Imagens

- **Email**: `admin@ecommerce.local`
- **Senha**: `admin123456`

_As credenciais são criadas automaticamente na primeira tentativa de login._

## 🎨 Melhorias Implementadas

### ✨ Atualizações Recentes

- **🏪 Rebranding**: Mudança de nome para "Wilson Market"
- **📄 Paginação**: Catálogo limitado a 12 produtos por página
- **👤 Menu de Perfil**: Dropdown com "Meu Perfil" e opções de logout
- **🖼️ Upload Seguro**: Sistema de autenticação para upload de imagens
- **⭐ Limpeza de Interface**: Remoção do sistema de avaliações
- **🔒 Segurança RLS**: Políticas avançadas de segurança no banco
- **🎨 Animações Suaves**: Transições elegantes entre páginas e componentes
- **🛒 Checkout Completo**: Nova tela de finalização com integração WhatsApp
- **📱 Componentes Reutilizáveis**: WhatsAppButton e outros componentes modulares
- **👤 Sistema de Perfil**: Gerenciamento completo de perfil do usuário
- **📋 Histórico de Pedidos**: Visualização e busca de pedidos anteriores
- **🔧 Modais Interativos**: Edição de perfil e visualização de pedidos

### 🚀 Performance

- **Debounce na Busca**: Evita requisições excessivas
- **Loading States**: Feedback visual durante carregamentos
- **Paginação Otimizada**: Carrega apenas os produtos necessários
- **Lazy Loading**: Imagens carregadas sob demanda

## 🛡️ Segurança

- **Row Level Security (RLS)**: Controle de acesso no nível do banco
- **Autenticação Obrigatória**: Funções críticas protegidas
- **Validação de Sessão**: Verificação contínua de autenticação
- **Sanitização de Dados**: Prevenção de ataques XSS e SQL injection

## 📱 Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Grid Responsivo**: Layout adapta automaticamente ao tamanho da tela
- **Touch Friendly**: Botões e elementos otimizados para toque
- **Performance Mobile**: Carregamento otimizado para conexões lentas

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa linting do código
```

## 📞 Suporte

Para dúvidas ou sugestões:

- **Email**: wilson.hernandesjunior@gmail.com
- **GitHub Issues**: Abra uma issue no repositório

---

**Wilson Market** - Desafio gerado para a STG

5. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🔗 Links

- **Deploy**: https://stg-catalog-challenge-plhg.vercel.app/
- **Repositório**: [GitHub - stg-catalog-challenge]
- **Supabase Project**: [Configuração em desenvolvimento]

## 👨‍💻 Desenvolvedor

**Wilson Hernandes Cardoso Junior**

- Candidato para Desenvolvedor FullStack - STG Company
- Especialização: TypeScript, React, Next.js
- Foco: Desenvolvimento moderno com IA e boas práticas

---

_Projeto desenvolvido para o desafio técnico da STG Company - Agosto 2025_
