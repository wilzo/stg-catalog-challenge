# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Context

This is a **STG Catalog Challenge** - a complete e-commerce system built with:

- **Next.js 15** with TypeScript and App Router
- **Supabase** for authentication and database
- **Tailwind CSS** for styling
- **WhatsApp integration** for order completion

## Project Structure Guidelines

- Use TypeScript for all files with proper typing
- Follow Next.js 15 App Router conventions
- Place components in `src/components/`
- Use `src/lib/` for utilities and configurations
- Store types in `src/types/`
- Use Context API for global state management

## Code Style & Conventions

- Use functional components with hooks
- Implement proper error handling with try/catch
- Use Server Components when possible, Client Components when needed
- Follow responsive-first design with Tailwind
- Use Lucide React for icons consistently
- Implement loading states and user feedback

## Supabase Integration

- Use the new `@supabase/ssr` package for authentication
- Implement Row Level Security (RLS) policies
- Use TypeScript with generated types from Supabase
- Handle auth state changes properly

## Key Features to Implement

1. **Authentication**: Login, register, logout, protected routes
2. **Product Catalog**: Grid view, search, filters, product details
3. **Shopping Cart**: Add/remove items, quantity management, persistence
4. **WhatsApp Integration**: Format orders and redirect to wa.me
5. **Responsive Design**: Mobile-first approach

## Best Practices

- Always validate user inputs
- Implement proper TypeScript types
- Use semantic HTML and accessibility features
- Optimize images and performance
- Handle edge cases and errors gracefully
- Follow security best practices for authentication
