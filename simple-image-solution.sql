-- =========================================
-- SOLUÇÃO SIMPLES: URLs REAIS E TESTADAS
-- =========================================

-- Atualizar produtos com URLs de imagens funcionais
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE name ILIKE '%smartphone%' OR name ILIKE '%galaxy%' OR name ILIKE '%iphone%';

UPDATE products SET image_url = 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE name ILIKE '%notebook%' OR name ILIKE '%laptop%' OR name ILIKE '%macbook%' OR name ILIKE '%dell%';

UPDATE products SET image_url = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE name ILIKE '%fone%' OR name ILIKE '%headphone%' OR name ILIKE '%áudio%' OR name ILIKE '%airpods%' OR name ILIKE '%jbl%';

UPDATE products SET image_url = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE name ILIKE '%smartwatch%' OR name ILIKE '%watch%' OR name ILIKE '%relógio%';

UPDATE products SET image_url = 'https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE name ILIKE '%tablet%' OR name ILIKE '%ipad%' OR name ILIKE '%surface%';

UPDATE products SET image_url = 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE name ILIKE '%câmera%' OR name ILIKE '%camera%' OR name ILIKE '%canon%' OR name ILIKE '%sony%';

UPDATE products SET image_url = 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE name ILIKE '%console%' OR name ILIKE '%playstation%' OR name ILIKE '%xbox%' OR name ILIKE '%nintendo%';

UPDATE products SET image_url = 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE name ILIKE '%monitor%' OR name ILIKE '%display%';

UPDATE products SET image_url = 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE name ILIKE '%teclado%' OR name ILIKE '%keyboard%' OR name ILIKE '%mouse%' OR name ILIKE '%webcam%';

-- Para produtos sem categoria específica, usar imagem genérica de eletrônicos
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE image_url IS NULL;

-- Verificar resultado
SELECT id, name, image_url FROM products LIMIT 10;
