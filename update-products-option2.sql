-- =========================================
-- OPÇÃO 2: ATUALIZAR APENAS AS URLs DAS IMAGENS
-- =========================================

-- Atualizar URLs das imagens dos produtos existentes
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop' WHERE name LIKE '%Smartphone%' OR name LIKE '%iPhone%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop' WHERE name LIKE '%Notebook%' OR name LIKE '%MacBook%' OR name LIKE '%Gaming PC%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop' WHERE name LIKE '%Fone%' OR name LIKE '%AirPods%' OR name LIKE '%Sony WH%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop' WHERE name LIKE '%Smartwatch%' OR name LIKE '%Watch%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop' WHERE name LIKE '%Tablet%' OR name LIKE '%iPad%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop' WHERE name LIKE '%Câmera%' OR name LIKE '%Canon%' OR name LIKE '%Sony α%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500&h=500&fit=crop' WHERE name LIKE '%Console%' OR name LIKE '%PlayStation%' OR name LIKE '%Xbox%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop' WHERE name LIKE '%Monitor%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop' WHERE name LIKE '%Teclado%' OR name LIKE '%Mouse%' OR name LIKE '%Webcam%' OR name LIKE '%Mesa%';

-- Atualizar produtos específicos que podem ter nomes diferentes
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=500&fit=crop' WHERE name LIKE '%Caixa%' OR name LIKE '%JBL%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1590602846989-e99596d2a6ee?w=500&h=500&fit=crop' WHERE name LIKE '%Microfone%' OR name LIKE '%Blue Yeti%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=500&h=500&fit=crop' WHERE name LIKE '%Lente%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&h=500&fit=crop' WHERE name LIKE '%Drone%' OR name LIKE '%DJI%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop' WHERE name LIKE '%Nintendo%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1592840062661-dd2bb881dada?w=500&h=500&fit=crop' WHERE name LIKE '%Controle%';
