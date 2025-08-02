-- =========================================
-- CORREÇÃO: URLs DE IMAGENS CONFIÁVEIS
-- =========================================

-- Deletar todos os produtos e recriar com URLs testadas e validadas
DELETE FROM products;
ALTER SEQUENCE products_id_seq RESTART WITH 1;

-- Inserir produtos com URLs de imagens TESTADAS e VÁLIDAS
INSERT INTO products (name, description, price, image_url, category_name, in_stock, stock_quantity, featured) VALUES

-- Eletrônicos - URLs testadas
('Smartphone Pro Max 256GB', 'Smartphone top de linha com 256GB de armazenamento, câmera profissional e bateria de longa duração', 1299.99, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 'Eletrônicos', true, 15, true),
('iPhone 15 Pro', 'iPhone 15 Pro com chip A17 Pro, sistema de câmeras profissionais e titânio', 1499.99, 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 'Eletrônicos', true, 20, true),

-- Computadores - URLs testadas
('Notebook Gamer RTX 4060', 'Notebook gamer com placa RTX 4060, 16GB RAM, SSD 512GB, ideal para jogos e trabalho', 2499.99, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 'Computadores', true, 8, true),
('MacBook Air M3', 'MacBook Air com chip M3, tela Liquid Retina de 13.6", até 18h de bateria', 1599.99, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 'Computadores', true, 12, true),

-- Áudio - URLs testadas
('Fone Bluetooth Premium', 'Fone de ouvido Bluetooth com cancelamento de ruído ativo e até 30h de bateria', 299.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 'Áudio', true, 25, false),
('AirPods Pro 2', 'AirPods Pro de 2ª geração com cancelamento ativo de ruído adaptativo', 349.99, 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 'Áudio', true, 40, false),

-- Wearables - URLs testadas
('Smartwatch Fitness Pro', 'Smartwatch com GPS, monitor cardíaco, resistente à água e mais de 100 modalidades esportivas', 399.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 'Wearables', false, 0, true),
('Apple Watch Ultra', 'Apple Watch Ultra com GPS + Cellular, caixa de titânio de 49mm', 1299.99, 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 'Wearables', true, 8, true),

-- Tablets - URLs testadas
('Tablet 12.9 polegadas', 'Tablet profissional com tela de 12.9", processador M2, ideal para criação e produtividade', 899.99, 'https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 'Tablets', true, 12, false),
('iPad Pro 12.9"', 'iPad Pro com tela Liquid Retina XDR de 12.9", chip M2 e compatibilidade com Apple Pencil', 1699.99, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 'Tablets', true, 15, true),

-- Fotografia - URLs testadas
('Câmera Mirrorless 4K', 'Câmera mirrorless profissional com gravação 4K, lente intercambiável e estabilização', 1599.99, 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 'Fotografia', true, 6, true),
('Canon EOS R6 Mark II', 'Câmera mirrorless full-frame com 24.2MP, vídeo 4K e estabilização de 5 eixos', 2799.99, 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 'Fotografia', true, 5, true),

-- Games - URLs testadas
('Console Next-Gen', 'Console de última geração com SSD ultra-rápido, ray tracing e jogos em 4K', 699.99, 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 'Games', true, 20, true),
('PlayStation 5', 'Console PlayStation 5 com SSD ultra-rápido e controle DualSense', 899.99, 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 'Games', false, 0, true),

-- Monitores - URLs testadas
('Monitor Ultrawide 34"', 'Monitor ultrawide de 34" com resolução QHD, 144Hz e tecnologia HDR', 799.99, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 'Monitores', true, 10, false),
('LG UltraWide 38"', 'Monitor ultrawide curvo de 38" com resolução 3840x1600 e 144Hz', 1299.99, 'https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 'Monitores', true, 6, false),

-- Periféricos - URLs testadas
('Teclado Mecânico RGB', 'Teclado mecânico com switches Cherry MX, iluminação RGB personalizável e teclas programáveis', 199.99, 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 'Periféricos', true, 30, false),
('Logitech MX Master 3S', 'Mouse sem fio premium com sensor de 8000 DPI e até 70 dias de bateria', 149.99, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', 'Periféricos', true, 50, false);
