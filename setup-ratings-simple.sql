-- =========================================
-- SETUP SIMPLES DO SISTEMA DE AVALIAÇÕES
-- Execute comandos um por vez no Supabase
-- =========================================

-- 1. Criar tabela de favoritos
CREATE TABLE IF NOT EXISTS favorites (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, product_id)
);

-- 2. Criar tabela de avaliações
CREATE TABLE IF NOT EXISTS ratings (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, product_id)
);

-- 3. Adicionar colunas de rating na tabela products (execute separadamente)
-- ALTER TABLE products ADD COLUMN IF NOT EXISTS rating DECIMAL(3,1) DEFAULT 0;
-- ALTER TABLE products ADD COLUMN IF NOT EXISTS rating_count INTEGER DEFAULT 0;

-- 4. Habilitar RLS para favorites
-- ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- 5. Habilitar RLS para ratings  
-- ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- 6. Verificar se as tabelas foram criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('favorites', 'ratings');
