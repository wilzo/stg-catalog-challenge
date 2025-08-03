# 🛒 Wilson Market

## Sobre o Projeto

Sistema completo de e-commerce moderno e responsivo. Uma aplicação full-stack que oferece autenticação segura de usuários, catálogo de produtos com paginação, carrinho de compras inteligente, gerenciamento de imagens e integração com WhatsApp para finalização de pedidos.

### 🎯 Principais Funcionalidades

- **Catálogo de Produtos**: Navegação otimizada com paginação (12 produtos por página)
- **Sistema de Busca**: Busca em tempo real com debounce para performance
- **Carrinho Inteligente**: Adição/remoção de produtos com persistência no banco
- **Upload de Imagens**: Sistema seguro para gerenciar imagens dos produtos
- **Autenticação Robusta**: Login seguro com políticas RLS do Supabase
- **Interface Responsiva**: Design moderno que funciona em todos os dispositivos

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

## 🤖 IA Utilizada

### GitHub Copilot

- **Como ajudou**: Acelerou significativamente a criação de componentes React, configurações do Supabase e lógica de autenticação
- **Partes geradas**: Estrutura inicial dos contextos, tipagem TypeScript, e configurações de middleware
- **Partes manuais**: Arquitetura do projeto, integração WhatsApp e lógica de negócio específica

### Estratégia de Desenvolvimento

- Uso de prompts específicos para gerar código TypeScript bem tipado
- Aproveitamento do Copilot para criar boilerplate de componentes React
- Revisão manual de todo código gerado para garantir qualidade e segurança

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

- **Catálogo**: `http://localhost:3000/catalog`
- **Upload de Imagens**: `http://localhost:3000/upload-images`
- **Login**: Será redirecionado automaticamente se necessário

## 📁 Estrutura de Arquivos

```
src/
├── app/
│   ├── auth/          # Páginas de autenticação
│   ├── catalog/       # Catálogo principal com paginação
│   ├── cart/          # Carrinho de compras
│   └── upload-images/ # Gerenciamento de imagens (protegido)
├── components/
│   ├── Header.tsx           # Cabeçalho com perfil dropdown
│   ├── Pagination.tsx       # Componente de paginação
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

- **Email**: contato@wilsonmarket.com
- **GitHub Issues**: Abra uma issue no repositório

---

**Wilson Market** - Sua loja de tecnologia de confiança 🛒✨

5. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🔗 Links

- **Deploy**: [Em breve - Vercel]
- **Repositório**: [GitHub - stg-catalog-challenge]
- **Supabase Project**: [Configuração em desenvolvimento]

## ✅ Funcionalidades

### Obrigatórias ✅

- [x] Sistema de autenticação (login/registro)
- [x] Proteção de rotas com middleware
- [x] Catálogo de produtos responsivo
- [x] Busca e filtros por produtos
- [x] Carrinho de compras funcional
- [x] Integração WhatsApp para finalização
- [x] Design responsivo (mobile/desktop)
- [x] TypeScript em todo o projeto

### Em Desenvolvimento 🚧

- [ ] Página de login/registro
- [ ] Componentes do catálogo
- [ ] Modal de detalhes do produto
- [ ] Interface do carrinho
- [ ] Página de confirmação
- [ ] População do banco com produtos
- [ ] Deploy na Vercel

### Diferenciais (Futuros) ⭐

- [ ] Dark mode toggle
- [ ] Histórico de pedidos
- [ ] Sistema de cupons
- [ ] PWA (Progressive Web App)
- [ ] Testes unitários

## 📱 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 15)
├── components/            # Componentes React reutilizáveis
├── context/              # Context API (Auth, Cart)
├── lib/                  # Utilitários e configurações
│   ├── supabase/        # Configuração do Supabase
│   └── utils.ts         # Funções utilitárias
└── types/               # Definições TypeScript
```

## 👨‍💻 Desenvolvedor

**Wilson Hernandes Cardoso Junior**

- Candidato para Desenvolvedor FullStack - STG Company
- Especialização: TypeScript, React, Next.js
- Foco: Desenvolvimento moderno com IA e boas práticas

---

_Projeto desenvolvido para o desafio técnico da STG Company - Agosto 2025_

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
