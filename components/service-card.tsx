import type React from "react"
import { Card } from "@/components/ui/card"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <Card className="group relative overflow-hidden border border-border/50 bg-gradient-to-br from-card/50 to-card hover:from-orange-500/5 hover:to-card transition-all duration-500 p-8 rounded-3xl hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 hover:border-orange-500/30">
      {/* Efeito de brilho no hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Borda animada no topo */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500/0 to-transparent group-hover:via-orange-500 group-hover:from-orange-500/50 group-hover:to-orange-500/50 transition-all duration-500" />
      
      {/* Container do ícone com animação */}
      <div className="relative mb-6 inline-block">
        <div className="absolute inset-0 bg-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />
        <div className="relative transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
          {icon}
        </div>
      </div>
      
      {/* Conteúdo */}
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-orange-500 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-[15px] group-hover:text-foreground/80 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Partículas decorativas */}
      <div className="absolute bottom-4 right-4 w-20 h-20 bg-orange-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" />
    </Card>
  )
}
