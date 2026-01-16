import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipo para o orçamento
export type OrcamentoInsert = {
  nome: string
  email: string
  telefone: string
  empresa?: string
  tipo_projeto: 'landing' | 'institucional' | 'portfolio' | 'blog' | 'ecommerce' | 'personalizado'
  orcamento_estimado?: '1000-3000' | '3000-5000' | '5000-10000' | '10000+'
  descricao: string
}

export type Orcamento = OrcamentoInsert & {
  id: string
  status: 'novo' | 'lido' | 'em_andamento' | 'respondido' | 'concluido' | 'cancelado'
  observacoes?: string
  created_at: string
  updated_at: string
}
