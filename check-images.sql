-- Verificar se as imagens foram populadas
SELECT 
    id,
    name,
    image_url,
    CASE 
        WHEN image_url IS NULL THEN 'SEM URL'
        WHEN image_url = '' THEN 'URL VAZIA'
        ELSE 'URL OK'
    END as status
FROM products 
ORDER BY id;

-- Contar quantos produtos têm URLs
SELECT 
    COUNT(*) as total_produtos,
    COUNT(image_url) as com_url,
    COUNT(*) - COUNT(image_url) as sem_url
FROM products;
