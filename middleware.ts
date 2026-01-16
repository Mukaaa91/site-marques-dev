import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Cliente Supabase para verificar autenticação
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Rate limiting simples (em produção, use Redis ou similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string, limit: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count++
  return true
}

// Limpar rate limit map periodicamente (a cada 5 minutos)
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip)
    }
  }
}, 5 * 60 * 1000)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'

  // Headers de segurança
  const response = NextResponse.next()
  
  // Content Security Policy
  // Permite conexões WebSocket (wss://) e HTTPS para Supabase Realtime
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co wss://*.supabase.co;"
  )
  
  // X-Frame-Options: Previne clickjacking
  response.headers.set('X-Frame-Options', 'DENY')
  
  // X-Content-Type-Options: Previne MIME sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  // Referrer-Policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Permissions-Policy
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  )

  // Proteger rotas de API sensíveis
  if (pathname.startsWith('/api/orcamentos')) {
    // Rate limiting para APIs
    if (!checkRateLimit(ip, 30, 60000)) {
      return NextResponse.json(
        { error: 'Muitas requisições. Tente novamente em alguns instantes.' },
        { status: 429 }
      )
    }

    // GET /api/orcamentos requer autenticação
    if (request.method === 'GET') {
      const authHeader = request.headers.get('authorization')
      const cookieHeader = request.headers.get('cookie')

      // Verificar token no header ou cookie
      if (!authHeader && !cookieHeader) {
        return NextResponse.json(
          { error: 'Não autorizado' },
          { status: 401 }
        )
      }

      // Verificar sessão no Supabase
      try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey, {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        })

        // Extrair token do cookie ou header
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

        if (token) {
          const { data: { user }, error } = await supabase.auth.getUser(token)
          
          if (error || !user) {
            return NextResponse.json(
              { error: 'Não autorizado' },
              { status: 401 }
            )
          }
        } else {
          return NextResponse.json(
            { error: 'Não autorizado' },
            { status: 401 }
          )
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        return NextResponse.json(
          { error: 'Erro ao verificar autenticação' },
          { status: 500 }
        )
      }
    }

    // PATCH e DELETE requerem autenticação
    if (request.method === 'PATCH' || request.method === 'DELETE') {
      const authHeader = request.headers.get('authorization')
      const cookieHeader = request.headers.get('cookie')

      if (!authHeader && !cookieHeader) {
        return NextResponse.json(
          { error: 'Não autorizado' },
          { status: 401 }
        )
      }

      // Verificar autenticação (mesma lógica acima)
      try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey, {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        })

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

        if (token) {
          const { data: { user }, error } = await supabase.auth.getUser(token)
          
          if (error || !user) {
            return NextResponse.json(
              { error: 'Não autorizado' },
              { status: 401 }
            )
          }
        } else {
          return NextResponse.json(
            { error: 'Não autorizado' },
            { status: 401 }
          )
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        return NextResponse.json(
          { error: 'Erro ao verificar autenticação' },
          { status: 500 }
        )
      }
    }
  }

  // Rate limiting para login
  if (pathname === '/admin' && request.method === 'POST') {
    if (!checkRateLimit(ip, 5, 900000)) { // 5 tentativas a cada 15 minutos
      return NextResponse.json(
        { error: 'Muitas tentativas de login. Tente novamente em 15 minutos.' },
        { status: 429 }
      )
    }
  }

  return response
}

export const config = {
  matcher: [
    '/api/orcamentos/:path*',
    '/admin/:path*',
  ],
}
