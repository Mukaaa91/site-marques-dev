-- Tabela de Orçamentos
CREATE TABLE IF NOT EXISTS public.orcamentos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  empresa VARCHAR(255),
  tipo_projeto VARCHAR(50) NOT NULL CHECK (tipo_projeto IN ('landing', 'institucional', 'portfolio', 'blog', 'ecommerce', 'personalizado')),
  orcamento_estimado VARCHAR(50) CHECK (orcamento_estimado IN ('1000-3000', '3000-5000', '5000-10000', '10000+')),
  descricao TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'novo' CHECK (status IN ('novo', 'lido', 'em_andamento', 'respondido', 'concluido', 'cancelado')),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_orcamentos_status ON public.orcamentos(status);
CREATE INDEX IF NOT EXISTS idx_orcamentos_created_at ON public.orcamentos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orcamentos_email ON public.orcamentos(email);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
CREATE TRIGGER update_orcamentos_updated_at 
  BEFORE UPDATE ON public.orcamentos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.orcamentos ENABLE ROW LEVEL SECURITY;

-- Remover políticas antigas se existirem (para evitar conflitos)
DROP POLICY IF EXISTS "Permitir inserção pública de orçamentos" ON public.orcamentos;
DROP POLICY IF EXISTS "Permitir leitura de orçamentos para autenticados" ON public.orcamentos;
DROP POLICY IF EXISTS "Permitir atualização de orçamentos para autenticados" ON public.orcamentos;

-- Política para permitir inserção de qualquer usuário (para formulários públicos)
-- Esta política permite que usuários anônimos (anon) insiram dados
CREATE POLICY "Permitir inserção pública de orçamentos"
  ON public.orcamentos
  FOR INSERT
  TO anon, authenticated, public
  WITH CHECK (true);

-- Política para permitir leitura apenas para usuários autenticados (admin)
CREATE POLICY "Permitir leitura de orçamentos para autenticados"
  ON public.orcamentos
  FOR SELECT
  TO authenticated
  USING (true);

-- Política para permitir atualização apenas para usuários autenticados (admin)
CREATE POLICY "Permitir atualização de orçamentos para autenticados"
  ON public.orcamentos
  FOR UPDATE
  TO authenticated
  USING (true);

-- Comentários nas colunas
COMMENT ON TABLE public.orcamentos IS 'Tabela para armazenar solicitações de orçamento';
COMMENT ON COLUMN public.orcamentos.status IS 'Status do orçamento: novo, lido, em_andamento, respondido, concluido, cancelado';
COMMENT ON COLUMN public.orcamentos.tipo_projeto IS 'Tipo de projeto: landing, institucional, portfolio, blog, ecommerce, personalizado';
COMMENT ON COLUMN public.orcamentos.orcamento_estimado IS 'Faixa de orçamento estimado: 1000-3000, 3000-5000, 5000-10000, 10000+';
