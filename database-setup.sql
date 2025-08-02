-- Criar a tabela de produtos
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    category VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar a tabela de itens do carrinho
CREATE TABLE IF NOT EXISTS cart_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir produtos de exemplo
INSERT INTO products (name, description, price, image_url, category) VALUES
('iPhone 15 Pro Max', 'Smartphone Apple com 256GB, câmera tripla de 48MP e chip A17 Pro. Tecnologia de ponta para quem busca performance máxima.', 7999.99, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&h=500&fit=crop', 'Eletrônicos'),
('MacBook Air M3', 'Notebook ultrafino com chip M3, 16GB RAM e 512GB SSD. Ideal para trabalho e criatividade com bateria que dura o dia todo.', 12999.99, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop', 'Eletrônicos'),
('AirPods Pro (3ª geração)', 'Fones de ouvido sem fio com cancelamento ativo de ruído, áudio espacial e estojo de carregamento MagSafe.', 2299.99, 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop', 'Eletrônicos'),
('Samsung Galaxy S24 Ultra', 'Smartphone premium com S Pen, câmera de 200MP e tela Dynamic AMOLED 2X de 6.8 polegadas. Potência e elegância.', 6999.99, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop', 'Eletrônicos'),

('Camiseta Premium Algodão', 'Camiseta básica de alta qualidade em 100% algodão pima. Corte moderno e conforto excepcional para o dia a dia.', 89.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop', 'Roupas'),
('Calça Jeans Slim Fit', 'Calça jeans moderna com corte slim, tecido stretch e lavagem stone. Estilo e conforto para todas as ocasiões.', 179.99, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop', 'Roupas'),
('Tênis Esportivo Runner', 'Tênis para corrida com tecnologia de amortecimento avançada, respirabilidade máxima e design aerodinâmico.', 299.99, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop', 'Roupas'),
('Jaqueta Bomber Vintage', 'Jaqueta estilo bomber com acabamento vintage, forro interno suave e bolsos funcionais. Peça versátil e atemporal.', 249.99, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop', 'Roupas'),

('Sofá Retrátil 3 Lugares', 'Sofá moderno com mecanismo retrátil, tecido suede de alta qualidade e espuma D33. Conforto e elegância para sua sala.', 1899.99, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop', 'Casa'),
('Mesa de Jantar Madeira Maciça', 'Mesa em madeira de demolição com pés em aço industrial. Design rústico moderno para 6 pessoas.', 1299.99, 'https://images.unsplash.com/photo-1549497538-303791108f95?w=500&h=500&fit=crop', 'Casa'),
('Luminária Pendente Industrial', 'Luminária estilo industrial com acabamento em metal preto fosco. Ideal para cozinhas e salas de jantar modernas.', 199.99, 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&h=500&fit=crop', 'Casa'),
('Conjunto de Panelas Inox', 'Kit com 5 panelas em aço inoxidável, fundo triplo e cabos ergonômicos. Durabilidade e praticidade na cozinha.', 399.99, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop', 'Casa'),

('Bicicleta Mountain Bike', 'Mountain bike com quadro de alumínio, suspensão dianteira e 21 marchas Shimano. Aventura e performance off-road.', 1599.99, 'https://images.unsplash.com/photo-1544191696-15693986e1cc?w=500&h=500&fit=crop', 'Esportes'),
('Kit Halteres Ajustáveis', 'Conjunto de halteres com pesos ajustáveis de 2kg a 24kg por halter. Treino completo em casa com praticidade.', 899.99, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop', 'Esportes'),
('Esteira Elétrica Profissional', 'Esteira com motor de 2.5HP, velocidade até 16km/h e inclinação elétrica. Monitor LCD com programas pré-definidos.', 2499.99, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop', 'Esportes'),
('Prancha de Surf 6.2', 'Prancha de surf em fibra de vidro, ideal para ondas médias. Shape clássico com design moderno e alta performance.', 1199.99, 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=500&h=500&fit=crop', 'Esportes');

-- Configurar RLS (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Política para produtos (todos podem ler)
CREATE POLICY "Produtos são públicos para leitura" ON products
    FOR SELECT USING (true);

-- Política para carrinho (usuários só veem seus próprios itens)
CREATE POLICY "Usuários só veem seus próprios itens do carrinho" ON cart_items
    FOR ALL USING (auth.uid() = user_id);

-- Política para inserir no carrinho (usuários autenticados)
CREATE POLICY "Usuários autenticados podem adicionar ao carrinho" ON cart_items
    FOR INSERT WITH CHECK (auth.uid() = user_id);
