-- =========================================
-- OPÇÃO 1: LIMPAR E RECRIAR TODOS OS PRODUTOS
-- =========================================

-- Deletar todos os produtos existentes
DELETE FROM products;

-- Resetar o contador de ID para começar do 1
ALTER SEQUENCE products_id_seq RESTART WITH 1;

-- Inserir produtos com URLs de imagens testadas
INSERT INTO products (name, description, price, image_url, category_name, in_stock, stock_quantity, featured) VALUES
('Smartphone Pro Max 256GB', 'Smartphone top de linha com 256GB de armazenamento, câmera profissional e bateria de longa duração', 1299.99, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop', 'Eletrônicos', true, 15, true),
('Notebook Gamer RTX 4060', 'Notebook gamer com placa RTX 4060, 16GB RAM, SSD 512GB, ideal para jogos e trabalho', 2499.99, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop', 'Computadores', true, 8, true),
('Fone Bluetooth Premium', 'Fone de ouvido Bluetooth com cancelamento de ruído ativo e até 30h de bateria', 299.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', 'Áudio', true, 25, false),
('Smartwatch Fitness Pro', 'Smartwatch com GPS, monitor cardíaco, resistente à água e mais de 100 modalidades esportivas', 399.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop', 'Wearables', false, 0, true),
('Tablet 12.9 polegadas', 'Tablet profissional com tela de 12.9", processador M2, ideal para criação e produtividade', 899.99, 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop', 'Tablets', true, 12, false),
('Câmera Mirrorless 4K', 'Câmera mirrorless profissional com gravação 4K, lente intercambiável e estabilização', 1599.99, 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop', 'Fotografia', true, 6, true),
('Console Next-Gen', 'Console de última geração com SSD ultra-rápido, ray tracing e jogos em 4K', 699.99, 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500&h=500&fit=crop', 'Games', true, 20, true),
('Monitor Ultrawide 34"', 'Monitor ultrawide de 34" com resolução QHD, 144Hz e tecnologia HDR', 799.99, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop', 'Monitores', true, 10, false),
('Teclado Mecânico RGB', 'Teclado mecânico com switches Cherry MX, iluminação RGB personalizável e teclas programáveis', 199.99, 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop', 'Periféricos', true, 30, false),

-- Produtos adicionais
('iPhone 15 Pro', 'iPhone 15 Pro com chip A17 Pro, sistema de câmeras profissionais e titânio', 1499.99, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&h=500&fit=crop', 'Eletrônicos', true, 20, true),
('MacBook Air M3', 'MacBook Air com chip M3, tela Liquid Retina de 13.6", até 18h de bateria', 1599.99, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop', 'Computadores', true, 12, true),
('AirPods Pro 2', 'AirPods Pro de 2ª geração com cancelamento ativo de ruído adaptativo', 349.99, 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&h=500&fit=crop', 'Áudio', true, 40, false),
('Apple Watch Ultra', 'Apple Watch Ultra com GPS + Cellular, caixa de titânio de 49mm', 1299.99, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop', 'Wearables', true, 8, true),
('iPad Pro 12.9"', 'iPad Pro com tela Liquid Retina XDR de 12.9", chip M2 e compatibilidade com Apple Pencil', 1699.99, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop', 'Tablets', true, 15, true),
('Canon EOS R6 Mark II', 'Câmera mirrorless full-frame com 24.2MP, vídeo 4K e estabilização de 5 eixos', 2799.99, 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop', 'Fotografia', true, 5, true),
('PlayStation 5', 'Console PlayStation 5 com SSD ultra-rápido e controle DualSense', 899.99, 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop', 'Games', false, 0, true),
('LG UltraWide 38"', 'Monitor ultrawide curvo de 38" com resolução 3840x1600 e 144Hz', 1299.99, 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500&h=500&fit=crop', 'Monitores', true, 6, false),
('Logitech MX Master 3S', 'Mouse sem fio premium com sensor de 8000 DPI e até 70 dias de bateria', 149.99, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop', 'Periféricos', true, 50, false);
