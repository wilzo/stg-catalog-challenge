-- =========================================
-- PRODUTOS REAIS E ORGANIZADOS POR CATEGORIA
-- =========================================

-- Limpar produtos existentes (opcional)
-- DELETE FROM products;

-- SMARTPHONES (5 produtos)
INSERT INTO products (name, description, price, image_url, category_id, category_name, in_stock, stock_quantity, rating, rating_count, featured) VALUES
('iPhone 15 Pro Max 256GB', 'O mais avançado iPhone com chip A17 Pro, câmera de 48MP e design em titânio. Tela Super Retina XDR de 6.7 polegadas.', 8999.00, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 1, 'Smartphones', true, 15, 4.8, 324, true),
('Samsung Galaxy S24 Ultra', 'Smartphone premium com S Pen integrada, câmera de 200MP e zoom óptico de 10x. Tela Dynamic AMOLED de 6.8 polegadas.', 7499.00, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 1, 'Smartphones', true, 22, 4.7, 198, true),
('Google Pixel 8 Pro', 'Fotografia computational avançada com IA, chip Google Tensor G3 e 7 anos de atualizações garantidas.', 5999.00, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 1, 'Smartphones', true, 18, 4.6, 156, false),
('Xiaomi 14 Ultra', 'Câmera Leica com lente variável, carregamento rápido de 90W e design premium em couro vegano.', 4299.00, 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 1, 'Smartphones', true, 31, 4.5, 89, false),
('OnePlus 12', 'Performance flagship com Snapdragon 8 Gen 3, carregamento super rápido e OxygenOS fluido.', 3799.00, 'https://images.unsplash.com/photo-1567581935884-3349723552ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 1, 'Smartphones', true, 26, 4.4, 112, false);

-- NOTEBOOKS (5 produtos)
INSERT INTO products (name, description, price, image_url, category_id, category_name, in_stock, stock_quantity, rating, rating_count, featured) VALUES
('MacBook Pro 16" M3 Max', 'Notebook profissional com chip M3 Max, 36GB RAM, SSD 1TB. Ideal para edição de vídeo e desenvolvimento.', 24999.00, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 2, 'Notebooks', true, 8, 4.9, 267, true),
('Dell XPS 15 OLED', 'Ultrabook premium com tela OLED 4K, Intel i7 13ª geração, 32GB RAM e RTX 4060. Design ultrafino.', 18999.00, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 2, 'Notebooks', true, 12, 4.7, 145, true),
('ASUS ROG Strix G16', 'Notebook gamer com RTX 4070, Intel i7, 16GB RAM e tela 165Hz. Perfeito para jogos e streaming.', 8999.00, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 2, 'Notebooks', true, 19, 4.6, 203, false),
('Lenovo ThinkPad X1 Carbon', 'Ultrabook corporativo com certificação militar, Intel i7, 16GB RAM e bateria de 19 horas.', 12999.00, 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 2, 'Notebooks', true, 14, 4.8, 178, false),
('Acer Predator Helios 300', 'Gamer acessível com RTX 4060, AMD Ryzen 7, 16GB RAM e sistema de resfriamento avançado.', 6799.00, 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 2, 'Notebooks', true, 25, 4.3, 92, false);

-- FONES DE OUVIDO (4 produtos)
INSERT INTO products (name, description, price, image_url, category_id, category_name, in_stock, stock_quantity, rating, rating_count, featured) VALUES
('AirPods Pro 2ª Geração', 'Fones com cancelamento ativo de ruído, áudio espacial e case com MagSafe. Bateria de até 30 horas.', 2299.00, 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 3, 'Fones de Ouvido', true, 45, 4.7, 412, true),
('Sony WH-1000XM5', 'Headphone over-ear com melhor cancelamento de ruído do mercado. 30 horas de bateria e som Hi-Res.', 1899.00, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 3, 'Fones de Ouvido', true, 33, 4.8, 356, true),
('Bose QuietComfort Ultra', 'Fones premium com cancelamento de ruído adaptativo e som espacial imersivo. Conforto excepcional.', 2499.00, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 3, 'Fones de Ouvido', true, 21, 4.6, 189, false),
('JBL Tune 770NC', 'Fones wireless com cancelamento de ruído, 70 horas de bateria e carregamento rápido. Ótimo custo-benefício.', 449.00, 'https://images.unsplash.com/photo-1590658165737-15a047b1dc74?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 3, 'Fones de Ouvido', true, 67, 4.2, 234, false);

-- SMARTWATCHES (3 produtos)
INSERT INTO products (name, description, price, image_url, category_id, category_name, in_stock, stock_quantity, rating, rating_count, featured) VALUES
('Apple Watch Ultra 2', 'Smartwatch robusto para aventuras extremas. GPS de precisão, resistência até 100m e bateria de 36 horas.', 6999.00, 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 4, 'Smartwatches', true, 16, 4.9, 145, true),
('Galaxy Watch6 Classic', 'Smartwatch premium com bezel rotativo, monitoramento avançado de saúde e Wear OS otimizado.', 1899.00, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 4, 'Smartwatches', true, 28, 4.5, 167, false),
('Garmin Fenix 7X Solar', 'Relógio multiesportivo com carregamento solar, mapas topográficos e bateria de semanas.', 4299.00, 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 4, 'Smartwatches', true, 11, 4.7, 98, false);

-- TABLETS (3 produtos)
INSERT INTO products (name, description, price, image_url, category_id, category_name, in_stock, stock_quantity, rating, rating_count, featured) VALUES
('iPad Pro 12.9" M2', 'Tablet profissional com chip M2, tela Liquid Retina XDR e suporte completo ao Apple Pencil 2.', 8999.00, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 5, 'Tablets', true, 19, 4.8, 234, true),
('Samsung Galaxy Tab S9 Ultra', 'Tablet Android premium de 14.6" com S Pen incluída, tela AMOLED e performance flagship.', 6799.00, 'https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 5, 'Tablets', true, 23, 4.6, 156, false),
('Microsoft Surface Pro 9', 'Tablet 2-em-1 com Windows 11, Intel i7, teclado destacável e versatilidade profissional completa.', 7299.00, 'https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 5, 'Tablets', true, 15, 4.4, 189, false);

-- Verificar inserção
SELECT COUNT(*) as total_produtos FROM products;
SELECT category_name, COUNT(*) as quantidade FROM products GROUP BY category_name;
