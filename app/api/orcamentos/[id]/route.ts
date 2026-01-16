import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const updateSchema = z.object({
  status: z.enum(['novo', 'lido', 'em_andamento', 'respondido', 'concluido', 'cancelado']).optional(),
  observacoes: z.string().optional(),
})

// PATCH para atualizar um orçamento
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // Resolver params se for Promise (Next.js 15+)
    const resolvedParams = params instanceof Promise ? await params : params
    
    // Verificar autenticação
    const authHeader = request.headers.get('authorization')
    const cookieHeader = request.headers.get('cookie')

    if (!authHeader && !cookieHeader) {
      return NextResponse.json(
        { error: 'Não autorizado. Faça login para acessar.' },
        { status: 401 }
      )
    }

    // Verificar token
    const { createClient } = await import('@supabase/supabase-js')
    const authSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    )

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

    const { data: { user }, error: authError } = await authSupabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Não autorizado. Sessão inválida.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = updateSchema.parse(body)

    const { data, error } = await supabase
      .from('orcamentos')
      .update(validatedData)
      .eq('id', resolvedParams.id)
      .select()
      .single()

    if (error) {
      console.error('Erro ao atualizar orçamento:', error)
      return NextResponse.json(
        { error: 'Erro ao atualizar orçamento' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Erro inesperado:', error)
    return NextResponse.json(
      { error: 'Erro ao processar solicitação' },
      { status: 500 }
    )
  }
}

// DELETE para deletar um orçamento
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // Resolver params se for Promise (Next.js 15+)
    const resolvedParams = params instanceof Promise ? await params : params
    
    // Verificar autenticação via header Authorization
    const authHeader = request.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Não autorizado. Token de autenticação não fornecido.' },
        { status: 401 }
      )
    }

    // Extrair token do header
    const token = authHeader.substring(7)

    if (!token) {
      return NextResponse.json(
        { error: 'Token de autenticação inválido' },
        { status: 401 }
      )
    }

    // Verificar token
    const { createClient } = await import('@supabase/supabase-js')
    const authSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    )

    const { data: { user }, error: authError } = await authSupabase.auth.getUser(token)

    if (authError || !user) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erro de autenticação DELETE:', authError)
      }
      return NextResponse.json(
        { error: 'Não autorizado. Sessão inválida ou expirada.' },
        { status: 401 }
      )
    }

    // Verificar se o ID é válido
    if (!resolvedParams.id || resolvedParams.id.length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.error('ID inválido recebido:', resolvedParams.id, 'Tipo:', typeof resolvedParams.id)
      }
      return NextResponse.json(
        { error: 'ID do orçamento inválido' },
        { status: 400 }
      )
    }

    // Usar service_role_key para bypass RLS (já que verificamos autenticação acima)
    const { error, data: deletedData } = await supabase
      .from('orcamentos')
      .delete()
      .eq('id', resolvedParams.id)
      .select()

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erro ao deletar orçamento:', {
          error: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
          id: resolvedParams.id
        })
      }
      
      // Mensagem de erro mais específica
      let errorMessage = 'Erro ao deletar orçamento'
      if (error.code === '42501') {
        errorMessage = 'Sem permissão para deletar. Verifique as políticas RLS no Supabase.'
      } else if (error.code === 'PGRST116') {
        errorMessage = 'Orçamento não encontrado'
      } else if (error.message) {
        errorMessage = `Erro: ${error.message}`
      }
      
      return NextResponse.json(
        { 
          error: errorMessage,
          details: process.env.NODE_ENV === 'development' ? {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint
          } : undefined
        },
        { status: 500 }
      )
    }

    // Verificar se algum registro foi deletado
    if (!deletedData || deletedData.length === 0) {
      return NextResponse.json(
        { error: 'Orçamento não encontrado ou já foi deletado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro inesperado ao deletar:', error)
    }
    return NextResponse.json(
      { error: 'Erro ao processar solicitação' },
      { status: 500 }
    )
  }
}
