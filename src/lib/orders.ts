import { supabase } from "./supabase-helpers";

export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress?: string;
  status: string;
  whatsappSent: boolean;
}

export interface CreateOrderData {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress?: string;
  items: Array<{
    productId?: number;
    productName: string;
    productPrice: number;
    quantity: number;
  }>;
  totalAmount: number;
}

/**
 * Cria um novo pedido no banco de dados
 */
export async function createOrder(
  orderData: CreateOrderData
): Promise<{ success: boolean; orderId?: number; error?: string }> {
  try {
    console.log("🛒 Iniciando criação de pedido:", orderData);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return { success: false, error: "Usuário não autenticado" };
    }

    console.log("👤 Usuário autenticado:", session.user.id);

    // Validar dados obrigatórios
    if (
      !orderData.customerName ||
      !orderData.customerEmail ||
      !orderData.items ||
      orderData.items.length === 0
    ) {
      console.error("❌ Dados obrigatórios faltando");
      return { success: false, error: "Dados obrigatórios faltando" };
    }

    // Criar o pedido principal
    const orderToInsert = {
      user_id: session.user.id,
      total_amount: orderData.totalAmount,
      status: "pending",
      customer_name: orderData.customerName,
      customer_phone: orderData.customerPhone || "",
      customer_address: orderData.customerAddress || null,
      whatsapp_sent: true,
    };

    console.log("📦 Criando pedido:", orderToInsert);

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert(orderToInsert)
      .select()
      .single();

    if (orderError) {
      console.error("❌ Erro ao criar pedido:", orderError);
      return {
        success: false,
        error: `Erro ao criar pedido: ${orderError.message}`,
      };
    }

    console.log("✅ Pedido criado com sucesso:", order);

    // Criar os itens do pedido
    const orderItems = orderData.items.map((item) => ({
      order_id: order.id,
      product_id: item.productId || null,
      product_name: item.productName,
      product_price: item.productPrice,
      quantity: item.quantity,
      subtotal: item.productPrice * item.quantity,
    }));

    console.log("📋 Criando itens do pedido:", orderItems);

    const { data: insertedItems, error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems)
      .select();

    if (itemsError) {
      console.error("❌ Erro ao criar itens do pedido:", itemsError);
      // Se falhar, deletar o pedido criado
      await supabase.from("orders").delete().eq("id", order.id);
      return {
        success: false,
        error: `Erro ao criar itens do pedido: ${itemsError.message}`,
      };
    }

    console.log("✅ Itens do pedido criados com sucesso:", insertedItems);
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("❌ Erro inesperado ao criar pedido:", error);
    return { success: false, error: "Erro inesperado" };
  }
}

/**
 * Busca todos os pedidos do usuário autenticado
 */
export async function getUserOrders(): Promise<{
  success: boolean;
  orders?: Order[];
  error?: string;
}> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return { success: false, error: "Usuário não autenticado" };
    }

    // Buscar pedidos com seus itens
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items (
          id,
          product_name,
          product_price,
          quantity,
          subtotal
        )
      `
      )
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (ordersError) {
      console.error("Erro ao buscar pedidos:", ordersError);
      return { success: false, error: "Erro ao buscar pedidos" };
    }

    // Formatar os dados para o formato esperado
    const formattedOrders: Order[] = orders.map((order) => ({
      id: order.id.toString(),
      date: order.created_at,
      customerName: order.customer_name,
      customerEmail: session.user.email || "",
      customerPhone: order.customer_phone,
      customerAddress: order.customer_address,
      total: order.total_amount,
      status: order.status,
      whatsappSent: order.whatsapp_sent,
      items:
        order.order_items && order.order_items.length > 0
          ? order.order_items.map(
              (item: {
                id: number;
                product_name: string;
                quantity: number;
                product_price: number;
              }) => ({
                id: item.id.toString(),
                productName: item.product_name,
                quantity: item.quantity,
                price: item.product_price,
              })
            )
          : [
              {
                id: "1",
                productName: "Produtos do Pedido",
                quantity: 1,
                price: order.total_amount,
              },
            ],
    }));

    return { success: true, orders: formattedOrders };
  } catch (error) {
    console.error("Erro inesperado ao buscar pedidos:", error);
    return { success: false, error: "Erro inesperado" };
  }
}

/**
 * Busca um pedido específico pelo ID
 */
export async function getOrderById(
  orderId: string
): Promise<{ success: boolean; order?: Order; error?: string }> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return { success: false, error: "Usuário não autenticado" };
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items (
          id,
          product_name,
          product_price,
          quantity,
          subtotal
        )
      `
      )
      .eq("id", orderId)
      .eq("user_id", session.user.id)
      .single();

    if (orderError) {
      console.error("Erro ao buscar pedido:", orderError);
      return { success: false, error: "Pedido não encontrado" };
    }

    const formattedOrder: Order = {
      id: order.id.toString(),
      date: order.created_at,
      customerName: order.customer_name,
      customerEmail: session.user.email || "",
      customerPhone: order.customer_phone,
      customerAddress: order.customer_address,
      total: order.total_amount,
      status: order.status,
      whatsappSent: order.whatsapp_sent,
      items:
        order.order_items && order.order_items.length > 0
          ? order.order_items.map(
              (item: {
                id: number;
                product_name: string;
                quantity: number;
                product_price: number;
              }) => ({
                id: item.id.toString(),
                productName: item.product_name,
                quantity: item.quantity,
                price: item.product_price,
              })
            )
          : [
              {
                id: "1",
                productName: "Produtos do Pedido",
                quantity: 1,
                price: order.total_amount,
              },
            ],
    };

    return { success: true, order: formattedOrder };
  } catch (error) {
    console.error("Erro inesperado ao buscar pedido:", error);
    return { success: false, error: "Erro inesperado" };
  }
}
