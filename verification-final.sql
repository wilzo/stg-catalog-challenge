-- =========================================
-- VERIFICAÇÃO FINAL E CORREÇÃO
-- =========================================

-- 1. Verificar se há produtos
SELECT COUNT(*) as total_produtos FROM products;

-- 2. Ver alguns produtos atuais
SELECT id, name, image_url, category_name FROM products LIMIT 5;

-- 3. Forçar image_url como NULL para todos
UPDATE products SET image_url = NULL;

-- 4. Verificar resultado
SELECT id, name, image_url, category_name FROM products LIMIT 5;

-- 5. Se não há produtos, criar alguns básicos
INSERT INTO products (name, description, price, image_url, category_name, in_stock, stock_quantity, featured) 
SELECT * FROM (VALUES 
  ('Smartphone Galaxy', 'Smartphone Samsung Galaxy com câmera avançada', 999.99, NULL, 'Eletrônicos', true, 10, true),
  ('Notebook Dell', 'Notebook Dell para trabalho e estudo', 1599.99, NULL, 'Computadores', true, 5, false),
  ('Fone JBL', 'Fone de ouvido JBL com qualidade premium', 199.99, NULL, 'Áudio', true, 20, false)
) AS new_products(name, description, price, image_url, category_name, in_stock, stock_quantity, featured)
WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1);
