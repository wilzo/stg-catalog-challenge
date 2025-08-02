-- Execute estes comandos no SQL Editor do Supabase (um por vez)

-- Comando 1: Verificar e criar tabela favorites
DROP TABLE IF EXISTS favorites CASCADE;
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Comando 2: Verificar e criar tabela ratings
DROP TABLE IF EXISTS ratings CASCADE;
CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Comando 3: Verificar se coluna rating já existe e criar apenas se necessário
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'products' AND column_name = 'rating') THEN
        ALTER TABLE products ADD COLUMN rating DECIMAL(3,1) DEFAULT 0;
    END IF;
END $$;

-- Comando 4: Verificar se coluna rating_count já existe e criar apenas se necessário
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'products' AND column_name = 'rating_count') THEN
        ALTER TABLE products ADD COLUMN rating_count INTEGER DEFAULT 0;
    END IF;
END $$;

-- Comando 5: Habilitar RLS nas novas tabelas
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Comando 6: Política para favorites - usuários só veem seus próprios favoritos
CREATE POLICY "users_can_manage_own_favorites" ON favorites
    FOR ALL USING (auth.uid() = user_id);

-- Comando 7: Política para ratings - usuários só veem/editam suas próprias avaliações
CREATE POLICY "users_can_manage_own_ratings" ON ratings
    FOR ALL USING (auth.uid() = user_id);

-- Comando 8: Política para permitir leitura pública das avaliações (para calcular médias)
CREATE POLICY "public_can_read_ratings" ON ratings
    FOR SELECT USING (true);
