'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { AdminLogin } from "@/components/admin-login"
import { supabase } from '@/lib/supabase'
import { 
  Mail, Phone, Building2, Calendar, DollarSign, FileText, 
  Briefcase, CheckCircle2, Clock, XCircle, AlertCircle,
  Eye, Trash2, RefreshCw, Search, Filter, Download, LogOut, User
} from "lucide-react"
import { toast } from "sonner"
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useRouter } from 'next/navigation'

type Status = 'novo' | 'lido' | 'em_andamento' | 'respondido' | 'concluido' | 'cancelado'

interface Orcamento {
  id: string
  nome: string
  email: string
  telefone: string
  empresa?: string
  tipo_projeto: string
  orcamento_estimado?: string
  descricao: string
  status: Status
  observacoes?: string
  created_at: string
  updated_at: string
}

const statusConfig: Record<Status, { label: string; color: string; icon: any }> = {
  novo: { label: 'Novo', color: 'bg-blue-500', icon: AlertCircle },
  lido: { label: 'Lido', color: 'bg-yellow-500', icon: Eye },
  em_andamento: { label: 'Em Andamento', color: 'bg-orange-500', icon: Clock },
  respondido: { label: 'Respondido', color: 'bg-purple-500', icon: Mail },
  concluido: { label: 'Concluído', color: 'bg-green-500', icon: CheckCircle2 },
  cancelado: { label: 'Cancelado', color: 'bg-red-500', icon: XCircle },
}

const tipoProjetoLabels: Record<string, string> = {
  landing: 'Landing Page',
  institucional: 'Site Institucional',
  portfolio: 'Portfólio',
  blog: 'Blog',
  ecommerce: 'Loja Virtual',
  personalizado: 'Projeto Personalizado',
}

const orcamentoLabels: Record<string, string> = {
  '1000-3000': 'R$ 1.000 - R$ 3.000',
  '3000-5000': 'R$ 3.000 - R$ 5.000',
  '5000-10000': 'R$ 5.000 - R$ 10.000',
  '10000+': 'Acima de R$ 10.000',
}

export default function AdminOrcamentosPage() {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<Status | 'todos'>('todos')
  const [selectedOrcamento, setSelectedOrcamento] = useState<Orcamento | null>(null)

  const fetchOrcamentos = async () => {
    try {
      setLoading(true)
      
      // Obter token de autenticação do Supabase
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        throw new Error('Não autenticado')
      }

      const response = await fetch('/api/orcamentos', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          toast.error('Sessão expirada. Faça login novamente.')
          setAuthenticated(false)
          return
        }
        throw new Error('Erro ao carregar orçamentos')
      }

      const result = await response.json()
      const orcamentosData = result.data || []
      
      // Validar que todos os orçamentos têm ID
      const validOrcamentos = orcamentosData.filter((o: Orcamento) => {
        if (!o.id) {
          console.warn('Orçamento sem ID encontrado:', o)
          return false
        }
        return true
      })
      
      if (validOrcamentos.length !== orcamentosData.length) {
        console.warn(`Alguns orçamentos foram filtrados por falta de ID: ${orcamentosData.length - validOrcamentos.length}`)
      }
      
      setOrcamentos(validOrcamentos)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erro:', error)
      }
      toast.error('Erro ao carregar orçamentos')
    } finally {
      setLoading(false)
    }
  }

  const checkAuth = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (session && !error) {
        setAuthenticated(true)
        setUser(session.user)
        fetchOrcamentos()
      } else {
        setAuthenticated(false)
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error)
      setAuthenticated(false)
    } finally {
      setCheckingAuth(false)
    }
  }

  // Verificar autenticação
  useEffect(() => {
    checkAuth()
    
    // Listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setAuthenticated(true)
        setUser(session.user)
        fetchOrcamentos()
      } else {
        setAuthenticated(false)
        setUser(null)
      }
      setCheckingAuth(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Buscar orçamentos quando autenticado
  useEffect(() => {
    if (authenticated && !checkingAuth) {
      fetchOrcamentos()
    }
  }, [authenticated, checkingAuth])

  // Subscription Realtime para atualizações em tempo real
  useEffect(() => {
    if (!authenticated || checkingAuth) return

    let channel: ReturnType<typeof supabase.channel> | null = null
    let reconnectTimeout: NodeJS.Timeout | null = null
    let reconnectAttempts = 0
    const maxReconnectAttempts = 5

    const setupRealtime = async () => {
      try {
        // Verificar se há sessão ativa
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          console.warn('⚠️ Sem sessão ativa para Realtime')
          return
        }

        console.log('🔄 Conectando ao Realtime...')

        // Criar subscription para mudanças na tabela orcamentos
        channel = supabase
          .channel('orcamentos-changes', {
            config: {
              broadcast: { self: true },
            },
          })
          .on(
            'postgres_changes',
            {
              event: '*', // Escutar todos os eventos (INSERT, UPDATE, DELETE)
              schema: 'public',
              table: 'orcamentos',
              filter: undefined, // Escutar todas as mudanças (RLS já filtra por permissão)
            },
            (payload) => {
              console.log('📨 Evento Realtime recebido:', payload)

              if (payload.eventType === 'INSERT') {
                // Novo orçamento inserido
                const newOrcamento = payload.new as Orcamento
                setOrcamentos((prev) => [newOrcamento, ...prev])
                
                // Notificação visual
                toast.success(
                  `Novo orçamento recebido de ${newOrcamento.nome}!`,
                  {
                    description: `Projeto: ${tipoProjetoLabels[newOrcamento.tipo_projeto] || newOrcamento.tipo_projeto}`,
                    duration: 5000,
                    action: {
                      label: 'Ver',
                      onClick: () => setSelectedOrcamento(newOrcamento)
                    }
                  }
                )
              } else if (payload.eventType === 'UPDATE') {
                // Orçamento atualizado
                const updatedOrcamento = payload.new as Orcamento
                setOrcamentos((prev) =>
                  prev.map((o) => (o.id === updatedOrcamento.id ? updatedOrcamento : o))
                )

                // Atualizar selectedOrcamento se estiver aberto
                setSelectedOrcamento((prev) => 
                  prev?.id === updatedOrcamento.id ? updatedOrcamento : prev
                )
              } else if (payload.eventType === 'DELETE') {
                // Orçamento deletado
                const deletedId = payload.old.id as string
                setOrcamentos((prev) => prev.filter((o) => o.id !== deletedId))
                
                // Fechar modal se o orçamento deletado estava aberto
                setSelectedOrcamento((prev) => 
                  prev?.id === deletedId ? null : prev
                )
              }
            }
          )
          .subscribe((status, err) => {
            console.log('📡 Status da subscription:', status, err ? `Erro: ${err.message}` : '')
            
            if (status === 'SUBSCRIBED') {
              console.log('✅ Conectado ao Realtime com sucesso!')
              reconnectAttempts = 0 // Reset contador ao conectar com sucesso
              
              // Toast apenas na primeira conexão
              if (reconnectAttempts === 0) {
                toast.success('Conectado - Atualizações em tempo real ativas', {
                  duration: 2000,
                })
              }
            } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
              reconnectAttempts++
              
              if (process.env.NODE_ENV === 'development') {
                console.error('❌ Erro na conexão Realtime:', {
                  status,
                  error: err?.message,
                  attempt: reconnectAttempts,
                })
              }

              // Não mostrar toast de erro imediatamente - tentar reconectar
              if (reconnectAttempts <= maxReconnectAttempts) {
                const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000) // Exponential backoff, max 30s
                console.log(`🔄 Tentando reconectar em ${delay}ms... (tentativa ${reconnectAttempts}/${maxReconnectAttempts})`)
                
                reconnectTimeout = setTimeout(() => {
                  if (channel) {
                    supabase.removeChannel(channel)
                  }
                  setupRealtime()
                }, delay)
              } else {
                // Apenas mostrar erro após várias tentativas falhadas
                console.error('❌ Falha ao conectar ao Realtime após múltiplas tentativas')
                toast.error('Realtime não disponível', {
                  description: 'As atualizações em tempo real podem não funcionar. Recarregue a página.',
                  duration: 5000,
                })
              }
            }
          })

      } catch (error) {
        console.error('❌ Erro ao configurar Realtime:', error)
        // Não mostrar toast de erro - Realtime é opcional
      }
    }

    setupRealtime()

    // Cleanup: remover subscription ao desmontar ou quando desautenticar
    return () => {
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout)
      }
      if (channel) {
        console.log('🔌 Desconectando do Realtime...')
        supabase.removeChannel(channel)
      }
    }
  }, [authenticated, checkingAuth])

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      toast.success('Logout realizado com sucesso!')
      setAuthenticated(false)
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      toast.error('Erro ao fazer logout')
    }
  }

  // Mostrar login se não autenticado (APÓS todos os hooks)
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-500" />
          <p className="text-muted-foreground">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return <AdminLogin onSuccess={checkAuth} />
  }

  const updateStatus = async (id: string, status: Status) => {
    try {
      const response = await fetch(`/api/orcamentos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) throw new Error('Erro ao atualizar status')

      setOrcamentos(prev =>
        prev.map(o => o.id === id ? { ...o, status } : o)
      )
      toast.success('Status atualizado com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar status')
    }
  }

  const deleteOrcamento = async (id: string) => {
    // Validar ID antes de prosseguir
    if (!id || id.trim().length === 0) {
      console.error('ID do orçamento inválido:', id)
      toast.error('Erro: ID do orçamento inválido')
      return
    }

    if (!confirm('Tem certeza que deseja excluir este orçamento?')) return

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError || !session) {
        toast.error('Sessão expirada. Faça login novamente.')
        setAuthenticated(false)
        return
      }

      const response = await fetch(`/api/orcamentos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMessage = data.error || 'Erro ao excluir orçamento'
        console.error('Erro ao excluir:', errorMessage, response.status)
        
        if (response.status === 401) {
          toast.error('Sessão expirada. Faça login novamente.')
          setAuthenticated(false)
          return
        }
        
        throw new Error(errorMessage)
      }

      setOrcamentos(prev => prev.filter(o => o.id !== id))
      toast.success('Orçamento excluído com sucesso!')
      
      // Fechar modal se o orçamento deletado estava aberto
      if (selectedOrcamento?.id === id) {
        setSelectedOrcamento(null)
      }
    } catch (error) {
      console.error('Erro ao excluir orçamento:', error)
      const errorMessage = error instanceof Error ? error.message : 'Erro ao excluir orçamento'
      toast.error(errorMessage)
    }
  }

  const filteredOrcamentos = orcamentos.filter(o => {
    const matchesSearch = 
      o.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.telefone.includes(searchTerm) ||
      (o.empresa && o.empresa.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'todos' || o.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: orcamentos.length,
    novos: orcamentos.filter(o => o.status === 'novo').length,
    emAndamento: orcamentos.filter(o => o.status === 'em_andamento').length,
    concluidos: orcamentos.filter(o => o.status === 'concluido').length,
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Painel de Orçamentos</h1>
              <p className="text-muted-foreground">Gerencie todas as solicitações de orçamento</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" title="Realtime conectado" />
                <User className="h-4 w-4" />
                <span>{user?.email}</span>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-3xl font-bold">{stats.total}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Novos</p>
                    <p className="text-3xl font-bold text-blue-500">{stats.novos}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Em Andamento</p>
                    <p className="text-3xl font-bold text-orange-500">{stats.emAndamento}</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Concluídos</p>
                    <p className="text-3xl font-bold text-green-500">{stats.concluidos}</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar por nome, email ou telefone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as Status | 'todos')}
                  className="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="todos">Todos os Status</option>
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <option key={key} value={key}>{config.label}</option>
                  ))}
                </select>
                <Button onClick={fetchOrcamentos} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Atualizar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Orçamentos */}
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-500" />
              <p className="text-muted-foreground">Carregando orçamentos...</p>
            </div>
          ) : filteredOrcamentos.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Nenhum orçamento encontrado</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredOrcamentos.map((orcamento) => {
                const StatusIcon = statusConfig[orcamento.status].icon
                return (
                  <Card
                    key={orcamento.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedOrcamento(orcamento)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="mb-2">{orcamento.nome}</CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`px-2 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1 ${statusConfig[orcamento.status].color}`}>
                              <StatusIcon className="h-3 w-3" />
                              {statusConfig[orcamento.status].label}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (!orcamento.id) {
                              console.error('Orçamento sem ID:', orcamento)
                              toast.error('Erro: Orçamento sem ID válido')
                              return
                            }
                            deleteOrcamento(orcamento.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span>{orcamento.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>{orcamento.telefone}</span>
                        </div>
                        {orcamento.empresa && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Building2 className="h-4 w-4" />
                            <span>{orcamento.empresa}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Briefcase className="h-4 w-4" />
                          <span>{tipoProjetoLabels[orcamento.tipo_projeto] || orcamento.tipo_projeto}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{format(new Date(orcamento.created_at), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}</span>
                        </div>
                      </div>
                      
                      {/* Ações Rápidas */}
                      <div className="mt-4 pt-4 border-t flex gap-2">
                        <select
                          value={orcamento.status}
                          onChange={(e) => {
                            e.stopPropagation()
                            updateStatus(orcamento.id, e.target.value as Status)
                          }}
                          className="flex-1 px-3 py-1.5 text-xs border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-orange-500"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {Object.entries(statusConfig).map(([key, config]) => (
                            <option key={key} value={key}>{config.label}</option>
                          ))}
                        </select>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.location.href = `mailto:${orcamento.email}?subject=Orçamento - ${orcamento.tipo_projeto}`
                          }}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.location.href = `https://wa.me/55${orcamento.telefone.replace(/\D/g, '')}`
                          }}
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {/* Modal de Detalhes */}
          {selectedOrcamento && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedOrcamento(null)}>
              <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>{selectedOrcamento.nome}</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedOrcamento(null)}>
                      <XCircle className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold mb-1">E-mail</p>
                      <p className="text-sm text-muted-foreground">{selectedOrcamento.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">Telefone</p>
                      <p className="text-sm text-muted-foreground">{selectedOrcamento.telefone}</p>
                    </div>
                    {selectedOrcamento.empresa && (
                      <div>
                        <p className="text-sm font-semibold mb-1">Empresa</p>
                        <p className="text-sm text-muted-foreground">{selectedOrcamento.empresa}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold mb-1">Tipo de Projeto</p>
                      <p className="text-sm text-muted-foreground">{tipoProjetoLabels[selectedOrcamento.tipo_projeto]}</p>
                    </div>
                    {selectedOrcamento.orcamento_estimado && (
                      <div>
                        <p className="text-sm font-semibold mb-1">Orçamento Estimado</p>
                        <p className="text-sm text-muted-foreground">{orcamentoLabels[selectedOrcamento.orcamento_estimado]}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold mb-1">Data de Recebimento</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(selectedOrcamento.created_at), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">Descrição do Projeto</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedOrcamento.descricao}</p>
                  </div>
                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      onClick={() => {
                        window.location.href = `mailto:${selectedOrcamento.email}?subject=Orçamento - ${selectedOrcamento.tipo_projeto}`
                      }}
                      className="flex-1"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Enviar E-mail
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        window.location.href = `https://wa.me/55${selectedOrcamento.telefone.replace(/\D/g, '')}`
                      }}
                      className="flex-1"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
