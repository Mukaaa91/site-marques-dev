'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { User, Mail, Phone, Building2, Briefcase, DollarSign, FileText, Send, Loader2, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

interface OrcamentoFormData {
  nome: string
  email: string
  telefone: string
  empresa: string
  tipo_projeto: string
  orcamento_estimado: string
  descricao: string
}

export function OrcamentoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState<OrcamentoFormData>({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    tipo_projeto: '',
    orcamento_estimado: '',
    descricao: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/orcamentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          empresa: formData.empresa || undefined,
          tipo_projeto: formData.tipo_projeto,
          orcamento_estimado: formData.orcamento_estimado || undefined,
          descricao: formData.descricao,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar orçamento')
      }

      setIsSuccess(true)
      toast.success('Orçamento enviado com sucesso! Entraremos em contato em breve.')
      
      // Reset form
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        tipo_projeto: '',
        orcamento_estimado: '',
        descricao: '',
      })

      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } catch (error) {
      console.error('Erro ao enviar orçamento:', error)
      toast.error(error instanceof Error ? error.message : 'Erro ao enviar orçamento. Por favor, tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">Orçamento Enviado!</h3>
        <p className="text-muted-foreground max-w-md">
          Recebemos sua solicitação de orçamento. Nossa equipe entrará em contato em até 24 horas.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nome" className="flex items-center gap-2">
            <User className="h-4 w-4 text-orange-500" />
            Nome completo
          </Label>
          <Input 
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Seu nome" 
            className="bg-background/50 border-border/50 focus:border-orange-500 focus:ring-orange-500/20 h-12 rounded-xl transition-all duration-300" 
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-orange-500" />
            E-mail
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            className="bg-background/50 border-border/50 focus:border-orange-500 focus:ring-orange-500/20 h-12 rounded-xl transition-all duration-300"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="telefone" className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-orange-500" />
            Telefone
          </Label>
          <Input 
            id="telefone"
            name="telefone"
            type="tel"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(00) 00000-0000" 
            className="bg-background/50 border-border/50 focus:border-orange-500 focus:ring-orange-500/20 h-12 rounded-xl transition-all duration-300" 
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="empresa" className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-orange-500" />
            Empresa (opcional)
          </Label>
          <Input 
            id="empresa"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            placeholder="Nome da empresa" 
            className="bg-background/50 border-border/50 focus:border-orange-500 focus:ring-orange-500/20 h-12 rounded-xl transition-all duration-300" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipo" className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-orange-500" />
          Tipo de projeto
        </Label>
        <select
          id="tipo"
          name="tipo_projeto"
          value={formData.tipo_projeto}
          onChange={handleChange}
          className="w-full h-12 px-4 rounded-xl bg-background/50 border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300"
          required
        >
          <option value="">Selecione uma opção</option>
          <option value="landing">Landing Page</option>
          <option value="institucional">Site Institucional</option>
          <option value="portfolio">Portfólio</option>
          <option value="blog">Blog</option>
          <option value="ecommerce">Loja Virtual</option>
          <option value="personalizado">Projeto Personalizado</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="orcamento" className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-orange-500" />
          Orçamento estimado
        </Label>
        <select
          id="orcamento"
          name="orcamento_estimado"
          value={formData.orcamento_estimado}
          onChange={handleChange}
          className="w-full h-12 px-4 rounded-xl bg-background/50 border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300"
        >
          <option value="">Selecione uma faixa</option>
          <option value="1000-3000">R$ 1.000 - R$ 3.000</option>
          <option value="3000-5000">R$ 3.000 - R$ 5.000</option>
          <option value="5000-10000">R$ 5.000 - R$ 10.000</option>
          <option value="10000+">Acima de R$ 10.000</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="descricao" className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-orange-500" />
          Descrição do projeto
        </Label>
        <Textarea
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          placeholder="Descreva sua ideia, objetivos, referências de sites que gosta, funcionalidades desejadas..."
          className="bg-background/50 border-border/50 focus:border-orange-500 focus:ring-orange-500/20 min-h-[140px] rounded-xl resize-none transition-all duration-300"
          required
        />
      </div>

      <Button 
        type="submit"
        disabled={isSubmitting}
        className="group relative w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-7 text-lg font-semibold rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              Enviar Solicitação
              <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700" />
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Ao enviar, você concorda com nossa política de privacidade.
      </p>
    </form>
  )
}
