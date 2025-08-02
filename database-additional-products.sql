-- Script para adicionar mais produtos com imagens variadas
-- Execute este script após executar o database-tables.sql principal

-- Produtos adicionais com imagens reais
INSERT INTO products (name, description, price, image_url, category_name, in_stock, stock_quantity, featured) VALUES
-- Eletrônicos variados
('Samsung Galaxy S24 Ultra', 'Smartphone Samsung Galaxy S24 Ultra com S Pen, câmera de 200MP e tela de 6.8"', 1699.99, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop&crop=center', 'Eletrônicos', true, 18, true),
('Google Pixel 8 Pro', 'Google Pixel 8 Pro com chip Tensor G3, câmeras AI e Android puro', 1199.99, 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop&crop=center', 'Eletrônicos', true, 25, false),

-- Computadores variados
('Dell XPS 13 Plus', 'Ultrabook Dell XPS 13 Plus com tela InfinityEdge 13.4" e processador Intel i7', 1899.99, 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop&crop=center', 'Computadores', true, 10, false),
('Gaming PC RTX 4090', 'PC Gamer completo com RTX 4090, i9-13900K, 32GB RAM e SSD 2TB', 4999.99, 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=400&fit=crop&crop=center', 'Computadores', true, 5, true),

-- Áudio variados
('Sony WH-1000XM5', 'Fone Sony WH-1000XM5 com cancelamento de ruído líder da indústria', 449.99, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=center', 'Áudio', true, 20, true),
('Caixa JBL Xtreme 3', 'Caixa de som portátil JBL Xtreme 3 com Bluetooth e à prova d''água', 329.99, 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop&crop=center', 'Áudio', true, 15, false),
('Microfone Blue Yeti', 'Microfone condensador Blue Yeti USB para streaming e podcasts', 199.99, 'https://images.unsplash.com/photo-1590602846989-e99596d2a6ee?w=400&h=400&fit=crop&crop=center', 'Áudio', true, 30, false),

-- Wearables variados
('Garmin Fenix 7', 'Smartwatch Garmin Fenix 7 com GPS multibanda e bateria de até 18 dias', 899.99, 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop&crop=center', 'Wearables', true, 12, true),
('Samsung Galaxy Watch6', 'Samsung Galaxy Watch6 com monitoramento avançado de saúde', 449.99, 'https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?w=400&h=400&fit=crop&crop=center', 'Wearables', true, 16, false),

-- Tablets variados
('Microsoft Surface Pro 9', 'Microsoft Surface Pro 9 com tela de 13" e processador Intel i7', 1399.99, 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=400&h=400&fit=crop&crop=center', 'Tablets', true, 8, true),
('Samsung Galaxy Tab S9+', 'Samsung Galaxy Tab S9+ com S Pen incluída e tela Dynamic AMOLED', 1199.99, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center', 'Tablets', true, 14, false),

-- Fotografia variados
('Sony α7 IV', 'Câmera mirrorless Sony α7 IV com 33MP, vídeo 4K e estabilização de 5 eixos', 2899.99, 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop&crop=center', 'Fotografia', true, 7, true),
('Lente Sony 24-70mm f/2.8', 'Lente zoom Sony FE 24-70mm f/2.8 GM para câmeras full-frame', 2399.99, 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400&h=400&fit=crop&crop=center', 'Fotografia', true, 4, false),
('DJI Air 3 Drone', 'Drone DJI Air 3 com câmera 4K, voo de 46 minutos e detecção de obstáculos', 1399.99, 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop&crop=center', 'Fotografia', true, 10, true),

-- Games variados
('Xbox Series X', 'Console Xbox Series X com 1TB de armazenamento e gráficos 4K', 799.99, 'https://images.unsplash.com/photo-1605902711834-8b11c3e3ef2f?w=400&h=400&fit=crop&crop=center', 'Games', true, 12, true),
('Nintendo Switch OLED', 'Nintendo Switch OLED com tela de 7" e cores vibrantes', 449.99, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center', 'Games', true, 25, false),
('Controle Xbox Elite', 'Controle Xbox Elite Series 2 com botões programáveis e gatilhos ajustáveis', 299.99, 'https://images.unsplash.com/photo-1592840062661-dd2bb881dada?w=400&h=400&fit=crop&crop=center', 'Games', true, 18, false),

-- Monitores variados
('Samsung Odyssey G9', 'Monitor gamer curvo Samsung Odyssey G9 49" com 240Hz e QLED', 1899.99, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=center', 'Monitores', true, 5, true),
('Dell UltraSharp 4K', 'Monitor Dell UltraSharp 27" 4K com USB-C e precisão de cores profissional', 749.99, 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&h=400&fit=crop&crop=center', 'Monitores', true, 8, false),

-- Periféricos variados
('Corsair K95 RGB', 'Teclado mecânico Corsair K95 RGB Platinum com switches Cherry MX', 249.99, 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop&crop=center', 'Periféricos', true, 22, false),
('Razer DeathAdder V3', 'Mouse gamer Razer DeathAdder V3 com sensor de 30000 DPI', 89.99, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=center', 'Periféricos', true, 35, false),
('Webcam Logitech C920', 'Webcam Logitech C920 HD Pro com vídeo Full HD 1080p', 129.99, 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=400&fit=crop&crop=center', 'Periféricos', true, 40, false),
('Mesa Digitalizadora Wacom', 'Mesa digitalizadora Wacom Intuos Pro com caneta de 8192 níveis de pressão', 399.99, 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center', 'Periféricos', true, 12, false);
