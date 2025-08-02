-- Execute este comando para verificar se as tabelas existem:

SELECT 
    'favorites' as tabela,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'favorites') 
         THEN 'EXISTE' 
         ELSE 'NÃO EXISTE' 
    END as status
UNION ALL
SELECT 
    'ratings' as tabela,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'ratings') 
         THEN 'EXISTE' 
         ELSE 'NÃO EXISTE' 
    END as status
UNION ALL
SELECT 
    'products.rating' as tabela,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'rating') 
         THEN 'EXISTE' 
         ELSE 'NÃO EXISTE' 
    END as status
UNION ALL
SELECT 
    'products.rating_count' as tabela,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'rating_count') 
         THEN 'EXISTE' 
         ELSE 'NÃO EXISTE' 
    END as status;
