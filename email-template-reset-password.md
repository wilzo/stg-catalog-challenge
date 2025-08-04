# 📧 Template Personalizado - Email de Redefinição de Senha

## Como Configurar no Supabase:

1. **Acesse o Dashboard do Supabase**

   - Vá para o seu projeto no [supabase.com](https://supabase.com)
   - Entre em **Authentication** → **Email Templates**

2. **Edite o template "Reset Password"**
   - Clique em **Reset Password** na lista de templates
   - Substitua o conteúdo pelo template abaixo

---

## 🎨 Template HTML Personalizado:

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Redefinir Senha - STG Catalog</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          "Helvetica Neue", Arial, sans-serif;
        background: linear-gradient(
          135deg,
          #dbeafe 0%,
          #dcfce7 50%,
          #dbeafe 100%
        );
        min-height: 100vh;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 40px 20px;
      }
      .card {
        background: white;
        border-radius: 16px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        overflow: hidden;
        border: none;
      }
      .header {
        background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%);
        padding: 40px 30px;
        text-align: center;
        color: white;
      }
      .logo {
        width: 64px;
        height: 64px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        margin: 0 auto 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: bold;
      }
      .header h1 {
        margin: 0;
        font-size: 28px;
        font-weight: 700;
      }
      .header p {
        margin: 8px 0 0;
        opacity: 0.9;
        font-size: 16px;
      }
      .content {
        padding: 40px 30px;
      }
      .greeting {
        font-size: 18px;
        color: #1f2937;
        margin-bottom: 20px;
        font-weight: 600;
      }
      .message {
        color: #4b5563;
        line-height: 1.6;
        font-size: 16px;
        margin-bottom: 30px;
      }
      .button-container {
        text-align: center;
        margin: 40px 0;
      }
      .reset-button {
        display: inline-block;
        background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%);
        color: white;
        text-decoration: none;
        padding: 16px 32px;
        border-radius: 12px;
        font-weight: 600;
        font-size: 16px;
        box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4);
        transition: all 0.3s ease;
      }
      .reset-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 15px 35px -5px rgba(59, 130, 246, 0.5);
      }
      .security-notice {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        border: 1px solid #f59e0b;
        border-radius: 12px;
        padding: 20px;
        margin: 30px 0;
      }
      .security-notice h3 {
        color: #92400e;
        margin: 0 0 10px;
        font-size: 16px;
        font-weight: 600;
      }
      .security-notice p {
        color: #a16207;
        margin: 0;
        font-size: 14px;
        line-height: 1.5;
      }
      .footer {
        background: #f9fafb;
        padding: 30px;
        text-align: center;
        border-top: 1px solid #e5e7eb;
      }
      .footer p {
        color: #6b7280;
        font-size: 14px;
        margin: 5px 0;
      }
      .footer a {
        color: #3b82f6;
        text-decoration: none;
      }
      .expiry-info {
        background: #f0f9ff;
        border: 1px solid #0ea5e9;
        border-radius: 8px;
        padding: 15px;
        margin: 20px 0;
        text-align: center;
      }
      .expiry-info p {
        color: #0c4a6e;
        margin: 0;
        font-size: 14px;
        font-weight: 500;
      }
      @media (max-width: 600px) {
        .container {
          padding: 20px 15px;
        }
        .content {
          padding: 30px 20px;
        }
        .header {
          padding: 30px 20px;
        }
        .reset-button {
          padding: 14px 24px;
          font-size: 15px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="card">
        <div class="header">
          <div class="logo">🛒</div>
          <h1>STG Catalog</h1>
          <p>Redefinição de Senha</p>
        </div>

        <div class="content">
          <div class="greeting">Olá!</div>

          <div class="message">
            Recebemos uma solicitação para redefinir a senha da sua conta no
            <strong>STG Catalog</strong>. <br /><br />
            Se você fez esta solicitação, clique no botão abaixo para criar uma
            nova senha:
          </div>

          <div class="button-container">
            <a href="{{ .ConfirmationURL }}" class="reset-button">
              🔒 Redefinir Minha Senha
            </a>
          </div>

          <div class="expiry-info">
            <p>⏰ Este link expira em 24 horas por segurança</p>
          </div>

          <div class="security-notice">
            <h3>🔐 Importante - Segurança</h3>
            <p>
              • Se você <strong>não solicitou</strong> esta redefinição, ignore
              este email<br />
              • Sua senha atual permanece inalterada até que você crie uma
              nova<br />
              • Nunca compartilhe este link com outras pessoas<br />
              • Se suspeitar de atividade suspeita, entre em contato conosco
            </p>
          </div>

          <div class="message">
            <strong>Não consegue clicar no botão?</strong><br />
            Copie e cole este link no seu navegador:<br />
            <a
              href="{{ .ConfirmationURL }}"
              style="color: #3b82f6; word-break: break-all;"
              >{{ .ConfirmationURL }}</a
            >
          </div>
        </div>

        <div class="footer">
          <p><strong>STG Catalog Challenge</strong></p>
          <p>Sistema de E-commerce Completo</p>
          <p style="margin-top: 15px;">
            📧 Dúvidas? Responda este email<br />
            🌐 Visite nosso site: <a href="{{ .SiteURL }}">{{ .SiteURL }}</a>
          </p>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">
            Este email foi enviado automaticamente. Não responda se for spam.
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
```

---

## 📋 Variáveis Disponíveis no Supabase:

- `{{ .ConfirmationURL }}` - Link para redefinir senha
- `{{ .SiteURL }}` - URL do seu site
- `{{ .Email }}` - Email do usuário

---

## 🎯 Características do Template:

✅ **Design Responsivo** - Funciona em mobile e desktop
✅ **Gradientes Modernos** - Azul e verde (mesma paleta do projeto)
✅ **Segurança Destacada** - Avisos sobre phishing e segurança
✅ **Call-to-Action Claro** - Botão grande e visível
✅ **Informações de Expiração** - 24 horas de validade
✅ **Link Alternativo** - Para casos onde o botão não funciona
✅ **Branding Consistente** - Logo e cores do STG Catalog

---

## 🔧 Como Aplicar:

1. **Copie todo o código HTML acima**
2. **Vá para Supabase Dashboard**
3. **Authentication → Email Templates → Reset Password**
4. **Cole o template no campo de conteúdo**
5. **Salve as alterações**

O email ficará muito mais profissional e alinhado com o design do seu projeto!
