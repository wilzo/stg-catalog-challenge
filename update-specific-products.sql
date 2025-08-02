-- =========================================
-- UPDATE URLs PARA PRODUTOS ESPECÍFICOS
-- =========================================

-- Eletrônicos (Smartphones)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE id = 1; -- Smartphone Pro Max 256GB
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE id = 10; -- iPhone 15 Pro

-- Computadores
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE id = 2; -- Notebook Gamer RTX 4060
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE id = 11; -- MacBook Air M3

-- Áudio
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE id = 3; -- Fone Bluetooth Premium
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE id = 12; -- AirPods Pro 2

-- Wearables
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE id = 4; -- Smartwatch Fitness Pro
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE id = 13; -- Apple Watch Ultra

-- Tablets
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE id = 5; -- Tablet 12.9 polegadas
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE id = 14; -- iPad Pro 12.9"

-- Fotografia
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE id = 6; -- Câmera Mirrorless 4K
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE id = 15; -- Canon EOS R6 Mark II

-- Games
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE id = 7; -- Console Next-Gen
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE id = 16; -- PlayStation 5

-- Monitores
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE id = 8; -- Monitor Ultrawide 34"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE id = 17; -- LG UltraWide 38"

-- Periféricos
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE id = 9; -- Teclado Mecânico RGB
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' WHERE id = 18; -- Logitech MX Master 3S

-- Verificar resultado
SELECT id, name, SUBSTRING(image_url, 1, 50) as image_preview FROM products ORDER BY id;

-- Contar produtos atualizados
SELECT COUNT(*) as produtos_com_imagem FROM products WHERE image_url IS NOT NULL;
