import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatWhatsAppMessage(
  items: Array<{ product: { name: string; price: number }; quantity: number }>,
  total: number,
  customerName: string,
  customerEmail: string
): string {
  const productList = items
    .map(
      (item) =>
        `- ${item.product.name} - Qtd: ${item.quantity} - ${formatCurrency(
          item.product.price * item.quantity
        )}`
    )
    .join("\n");

  return `🛒 *NOVO PEDIDO - STG CATALOG*

👤 *Cliente:* ${customerName}
📧 *Email:* ${customerEmail}

📋 *PRODUTOS:*
${productList}

💰 *TOTAL: ${formatCurrency(total)}*

---
Pedido realizado via STG Catalog`;
}

export function generateWhatsAppLink(
  phoneNumber: string,
  message: string
): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export function cn(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export function cn2(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
