-- =========================================
-- DEBUG: VERIFICAR DADOS NO BANCO
-- =========================================

-- 1. Verificar quantos produtos existem
SELECT COUNT(*) as total_produtos FROM products;

-- 2. Verificar URLs das imagens atuais
SELECT id, name, image_url FROM products ORDER BY id LIMIT 10;

-- 3. Verificar se há produtos com URLs ainda não nulas
SELECT COUNT(*) as produtos_com_url FROM products WHERE image_url IS NOT NULL;

-- 4. Limpar DEFINITIVAMENTE todas as URLs
UPDATE products SET image_url = NULL;

-- 5. Verificar novamente
SELECT id, name, image_url FROM products ORDER BY id LIMIT 5;
