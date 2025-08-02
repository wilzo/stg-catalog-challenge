-- =========================================
-- ESTRUTURA DO BANCO - E-COMMERCE SUPABASE
-- =========================================

-- 1. Tabela de categorias
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Tabela de produtos
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(500),
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  category_name VARCHAR(100), -- Para facilitar consultas
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 4.8,
  rating_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Tabela de carrinho
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id) -- Um produto por usuário no carrinho
);

-- 4. Tabela de pedidos
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, cancelled
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_address TEXT,
  whatsapp_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. Tabela de itens do pedido
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  product_name VARCHAR(255) NOT NULL, -- Para histórico
  product_price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  subtotal DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =========================================
-- POLÍTICAS RLS (Row Level Security)
-- =========================================

-- Habilitar RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Políticas para categorias (todos podem ler)
CREATE POLICY "Anyone can read categories" ON categories FOR SELECT USING (true);

-- Políticas para produtos (todos podem ler)
CREATE POLICY "Anyone can read products" ON products FOR SELECT USING (true);

-- Políticas para carrinho (usuário só vê seus próprios itens)
CREATE POLICY "Users can view own cart" ON cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cart" ON cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart" ON cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cart" ON cart_items FOR DELETE USING (auth.uid() = user_id);

-- Políticas para pedidos (usuário só vê seus próprios pedidos)
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own orders" ON orders FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para itens do pedido (usuário só vê itens de seus pedidos)
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
));

-- =========================================
-- DADOS INICIAIS
-- =========================================

-- Inserir categorias
INSERT INTO categories (name, description) VALUES
('Eletrônicos', 'Smartphones, tablets e acessórios eletrônicos'),
('Computadores', 'Notebooks, desktops e componentes'),
('Áudio', 'Fones de ouvido, caixas de som e equipamentos de áudio'),
('Wearables', 'Smartwatches, pulseiras inteligentes e acessórios'),
('Tablets', 'Tablets e acessórios'),
('Fotografia', 'Câmeras, lentes e equipamentos fotográficos'),
('Games', 'Consoles, jogos e acessórios para gaming'),
('Monitores', 'Monitores e displays'),
('Periféricos', 'Teclados, mouses e outros periféricos');

-- Inserir produtos de exemplo
INSERT INTO products (name, description, price, image_url, category_name, in_stock, stock_quantity, featured) VALUES
('Smartphone Pro Max 256GB', 'Smartphone top de linha com 256GB de armazenamento, câmera profissional e bateria de longa duração', 1299.99, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center', 'Eletrônicos', true, 15, true),
('Notebook Gamer RTX 4060', 'Notebook gamer com placa RTX 4060, 16GB RAM, SSD 512GB, ideal para jogos e trabalho', 2499.99, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center', 'Computadores', true, 8, true),
('Fone Bluetooth Premium', 'Fone de ouvido Bluetooth com cancelamento de ruído ativo e até 30h de bateria', 299.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center', 'Áudio', true, 25, false),
('Smartwatch Fitness Pro', 'Smartwatch com GPS, monitor cardíaco, resistente à água e mais de 100 modalidades esportivas', 399.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center', 'Wearables', false, 0, true),
('Tablet 12.9 polegadas', 'Tablet profissional com tela de 12.9", processador M2, ideal para criação e produtividade', 899.99, 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop&crop=center', 'Tablets', true, 12, false),
('Câmera Mirrorless 4K', 'Câmera mirrorless profissional com gravação 4K, lente intercambiável e estabilização', 1599.99, 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop&crop=center', 'Fotografia', true, 6, true),
('Console Next-Gen', 'Console de última geração com SSD ultra-rápido, ray tracing e jogos em 4K', 699.99, 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop&crop=center', 'Games', true, 20, true),
('Monitor Ultrawide 34"', 'Monitor ultrawide de 34" com resolução QHD, 144Hz e tecnologia HDR', 799.99, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=center', 'Monitores', true, 10, false),
('Teclado Mecânico RGB', 'Teclado mecânico com switches Cherry MX, iluminação RGB personalizável e teclas programáveis', 199.99, 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop&crop=center', 'Periféricos', true, 30, false),
('iPhone 15 Pro', 'iPhone 15 Pro com chip A17 Pro, sistema de câmeras profissionais e titânio', 1499.99, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop&crop=center', 'Eletrônicos', true, 20, true),
('MacBook Air M3', 'MacBook Air com chip M3, tela Liquid Retina de 13.6", até 18h de bateria', 1599.99, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&crop=center', 'Computadores', true, 12, true),
('AirPods Pro 2', 'AirPods Pro de 2ª geração com cancelamento ativo de ruído adaptativo', 349.99, 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop&crop=center', 'Áudio', true, 40, false),
('Apple Watch Ultra', 'Apple Watch Ultra com GPS + Cellular, caixa de titânio de 49mm', 1299.99, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center', 'Wearables', true, 8, true),
('iPad Pro 12.9"', 'iPad Pro com tela Liquid Retina XDR de 12.9", chip M2 e compatibilidade com Apple Pencil', 1699.99, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&crop=center', 'Tablets', true, 15, true),
('Canon EOS R6 Mark II', 'Câmera mirrorless full-frame com 24.2MP, vídeo 4K e estabilização de 5 eixos', 2799.99, 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop&crop=center', 'Fotografia', true, 5, true),
('PlayStation 5', 'Console PlayStation 5 com SSD ultra-rápido e controle DualSense', 899.99, 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop&crop=center', 'Games', false, 0, true),
('LG UltraWide 38"', 'Monitor ultrawide curvo de 38" com resolução 3840x1600 e 144Hz', 1299.99, 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&h=400&fit=crop&crop=center', 'Monitores', true, 6, false),
('Logitech MX Master 3S', 'Mouse sem fio premium com sensor de 8000 DPI e até 70 dias de bateria', 149.99, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=center', 'Periféricos', true, 50, false);

-- =========================================
-- FUNÇÕES E TRIGGERS
-- =========================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para calcular total do carrinho
CREATE OR REPLACE FUNCTION get_cart_total(user_uuid UUID)
RETURNS DECIMAL(10,2) AS $$
DECLARE
    total DECIMAL(10,2);
BEGIN
    SELECT COALESCE(SUM(p.price * c.quantity), 0)
    INTO total
    FROM cart_items c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = user_uuid;
    
    RETURN total;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =========================================
-- VIEWS ÚTEIS
-- =========================================

-- View para carrinho com detalhes dos produtos
CREATE VIEW cart_details AS
SELECT 
    c.id,
    c.user_id,
    c.product_id,
    c.quantity,
    p.name as product_name,
    p.price as product_price,
    p.image_url,
    p.category_name,
    (p.price * c.quantity) as subtotal,
    c.created_at,
    c.updated_at
FROM cart_items c
JOIN products p ON c.product_id = p.id;

-- View para produtos com informações de categoria
CREATE VIEW products_with_category AS
SELECT 
    p.*,
    c.name as category_full_name,
    c.description as category_description
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;
