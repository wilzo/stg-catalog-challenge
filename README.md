# 🛒 STG Catalog Challenge

## Sobre o Projeto

Sistema completo de e-commerce desenvolvido para o desafio técnico da **STG Company**. Uma aplicação full-stack que oferece autenticação de usuários, catálogo de produtos, carrinho de compras e integração com WhatsApp para finalização de pedidos.

### 🎯 Objetivos

- Demonstrar habilidades em desenvolvimento TypeScript/React
- Integrar autenticação e banco de dados com Supabase
- Criar interface responsiva e moderna
- Implementar fluxo completo de e-commerce
- Utilizar IA para acelerar o desenvolvimento

## 🚀 Tecnologias Utilizadas

### Core Stack

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário para estilização
- **Supabase** - Backend-as-a-Service para autenticação e database

### Bibliotecas e Ferramentas

- **@supabase/ssr** - Integração Supabase com Server-Side Rendering
- **Lucide React** - Biblioteca de ícones moderna e consistente
- **Context API** - Gerenciamento de estado global nativo do React
- **ESLint** - Linting e formatação de código

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
cd stg-catalog-challenge
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Configure suas variáveis no .env.local
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_supabase
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```

4. **Execute o projeto**

```bash
npm run dev
```

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
