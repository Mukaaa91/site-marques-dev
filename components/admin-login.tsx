'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from '@/lib/supabase'
import { toast } from "sonner"
import { Mail, Lock, Loader2, Shield } from "lucide-react"
import { MintLogo } from "@/components/mint-logo"

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Por favor, preencha todos os campos')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Erro ao fazer login:', error)
        toast.error('E-mail ou senha incorretos')
        return
      }

      if (data.user) {
        toast.success('Login realizado com sucesso!')
        onSuccess()
      }
    } catch (error) {
      console.error('Erro inesperado:', error)
      toast.error('Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-orange-500/5 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_50%)]" />
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-orange-500/20">
        <CardHeader className="space-y-4 text-center pb-6">
          <div className="flex justify-center mb-4">
            <MintLogo />
          </div>
          <div className="flex justify-center">
            <div className="p-3 bg-orange-500/10 rounded-full">
              <Shield className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Painel Administrativo</CardTitle>
          <CardDescription>
            Faça login para acessar o painel de orçamentos
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-orange-500" />
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="h-12 focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-orange-500" />
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="h-12 focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Entrar
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t">
            <p className="text-xs text-center text-muted-foreground">
              Esta área é restrita apenas para administradores autorizados
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
