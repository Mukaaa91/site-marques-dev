import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { sendOrcamentoNotification } from '@/lib/email'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Usar service_role key para operações do servidor (bypass RLS)
// Isso permite inserções mesmo se houver problemas com políticas RLS
const supabase = createClient(
  supabaseUrl, 
  supabaseServiceKey || supabaseAnonKey, // Usar service key se disponível
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Schema de validação
const orcamentoSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(255),
  email: z.string().email('E-mail inválido').max(255),
  telefone: z.string().min(10, 'Telefone inválido').max(20),
  empresa: z.string().max(255).optional(),
  tipo_projeto: z.enum(['landing', 'institucional', 'portfolio', 'blog', 'ecommerce', 'personalizado']),
  orcamento_estimado: z.enum(['1000-3000', '3000-5000', '5000-10000', '10000+']).optional(),
  descricao: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
})

export async function POST(request: NextRequest) {
  try {
    // Verificar variáveis de ambiente
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Variáveis de ambiente do Supabase não configuradas')
      return NextResponse.json(
        { error: 'Configuração do servidor incompleta. Por favor, entre em contato com o suporte.' },
        { status: 500 }
      )
    }

    const body = await request.json()
    console.log('Dados recebidos:', body)

    // Validação dos dados
    const validatedData = orcamentoSchema.parse(body)
    console.log('Dados validados:', validatedData)

    // Preparar dados para inserção (remover campos undefined)
    const dataToInsert: any = {
      nome: validatedData.nome,
      email: validatedData.email,
      telefone: validatedData.telefone,
      tipo_projeto: validatedData.tipo_projeto,
      descricao: validatedData.descricao,
      status: 'novo',
    }

    // Adicionar campos opcionais apenas se existirem
    if (validatedData.empresa) {
      dataToInsert.empresa = validatedData.empresa
    }
    if (validatedData.orcamento_estimado) {
      dataToInsert.orcamento_estimado = validatedData.orcamento_estimado
    }

    console.log('Dados para inserção:', dataToInsert)

    // Inserir no Supabase
    const { data, error } = await supabase
      .from('orcamentos')
      .insert([dataToInsert])
      .select()
      .single()

    if (error) {
      console.error('Erro do Supabase:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      
      // Retornar mensagem de erro mais detalhada em desenvolvimento
      const errorMessage = process.env.NODE_ENV === 'development' 
        ? `Erro ao salvar: ${error.message}`
        : 'Erro ao salvar orçamento. Por favor, verifique se todos os campos estão preenchidos corretamente e tente novamente.'
      
      return NextResponse.json(
        { 
          error: errorMessage,
          details: process.env.NODE_ENV === 'development' ? error : undefined
        },
        { status: 500 }
      )
    }

    console.log('Orçamento salvo com sucesso:', data)

    // Enviar notificação por email (não bloqueia a resposta)
    if (data) {
      sendOrcamentoNotification(data).catch((emailError) => {
        console.error('Erro ao enviar email (não crítico):', emailError)
        // Não falha a requisição se o email não enviar
      })
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Orçamento enviado com sucesso! Entraremos em contato em breve.',
        data 
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Erro de validação Zod:', error.errors)
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Erro inesperado:', error)
    return NextResponse.json(
      { 
        error: 'Erro ao processar solicitação. Por favor, tente novamente.',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    )
  }
}

// GET para listar orçamentos (apenas para admin autenticado)
export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação via header ou cookie
    const authHeader = request.headers.get('authorization')
    const cookieHeader = request.headers.get('cookie')

    if (!authHeader && !cookieHeader) {
      return NextResponse.json(
        { error: 'Não autorizado. Faça login para acessar.' },
        { status: 401 }
      )
    }

    // Criar cliente Supabase para verificar autenticação
    const { createClient } = await import('@supabase/supabase-js')
    const authSupabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })

    // Extrair token
    let token: string | null = null
    
    if (cookieHeader) {
      const cookies = Object.fromEntries(
        cookieHeader.split('; ').map(c => c.split('='))
      )
      token = cookies['sb-access-token'] || cookies['sb-refresh-token']
    }

    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.substring(7)
    }

    if (!token) {
      return NextResponse.json(
        { error: 'Token de autenticação não fornecido' },
        { status: 401 }
      )
    }

    // Verificar usuário autenticado
    const { data: { user }, error: authError } = await authSupabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Não autorizado. Sessão inválida.' },
        { status: 401 }
      )
    }

    // Usuário autenticado - buscar orçamentos
    const { data, error } = await supabase
      .from('orcamentos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erro ao buscar orçamentos:', error)
      }
      return NextResponse.json(
        { error: 'Erro ao buscar orçamentos' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro inesperado:', error)
    }
    return NextResponse.json(
      { error: 'Erro ao processar solicitação' },
      { status: 500 }
    )
  }
}
