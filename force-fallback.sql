-- =========================================
-- SOLUÇÃO SIMPLES: FORÇAR FALLBACK INTELIGENTE
-- =========================================

-- Limpar URLs problemáticas para forçar o uso do fallback inteligente
UPDATE products SET image_url = null WHERE image_url IS NOT NULL;

-- Verificar produtos afetados
SELECT id, name, image_url FROM products LIMIT 10;
