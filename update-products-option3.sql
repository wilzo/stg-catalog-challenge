-- =========================================
-- OPÇÃO 3: BACKUP E ATUALIZAÇÃO SEGURA
-- =========================================

-- 1. Primeiro, criar backup dos produtos atuais
CREATE TABLE products_backup AS SELECT * FROM products;

-- 2. Atualizar todas as URLs de imagem para URLs funcionais
UPDATE products SET 
  image_url = CASE 
    WHEN category_name = 'Eletrônicos' THEN 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop'
    WHEN category_name = 'Computadores' THEN 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop'
    WHEN category_name = 'Áudio' THEN 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'
    WHEN category_name = 'Wearables' THEN 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'
    WHEN category_name = 'Tablets' THEN 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop'
    WHEN category_name = 'Fotografia' THEN 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop'
    WHEN category_name = 'Games' THEN 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500&h=500&fit=crop'
    WHEN category_name = 'Monitores' THEN 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop'
    WHEN category_name = 'Periféricos' THEN 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop'
    ELSE 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=500&h=500&fit=crop'
  END
WHERE image_url IS NULL OR image_url = '/placeholder.svg' OR image_url LIKE '%placeholder%';

-- Para restaurar o backup se necessário, execute:
-- DROP TABLE products;
-- ALTER TABLE products_backup RENAME TO products;
