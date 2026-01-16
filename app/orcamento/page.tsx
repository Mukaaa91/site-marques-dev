import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { OrcamentoForm } from "@/components/orcamento-form"
import { FileText, Sparkles, Clock, Shield, Headphones, CheckCircle2, Mail } from "lucide-react"

const benefits = [
  "Resposta em até 24 horas",
  "Orçamento sem compromisso",
  "Suporte durante todo o projeto",
  "Garantia de satisfação",
]

export default function OrcamentoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-500/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <Navbar />

      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Info */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
                  <Sparkles className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium text-orange-500">Orçamento Rápido</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance">
                  Solicite seu <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Orçamento</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Preencha o formulário ao lado e receba uma proposta personalizada para o seu projeto. Nossa equipe irá
                  analisar suas necessidades e entrar em contato o mais breve possível.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="border border-border/50 bg-card/50 backdrop-blur-sm hover:border-orange-500/50 hover:bg-card transition-all duration-300">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                        {index === 0 && <Clock className="h-5 w-5 text-orange-500" />}
                        {index === 1 && <Shield className="h-5 w-5 text-orange-500" />}
                        {index === 2 && <Headphones className="h-5 w-5 text-orange-500" />}
                        {index === 3 && <CheckCircle2 className="h-5 w-5 text-orange-500" />}
                      </div>
                      <span className="text-foreground font-medium">{benefit}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Contact Card */}
              <Card className="border-none bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-orange-500/10 p-6">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Prefere falar diretamente?</p>
                      <p className="font-semibold text-lg text-foreground">contato@mintwebsite.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Form */}
            <Card className="border border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl hover:shadow-orange-500/10 transition-all duration-300">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-orange-500" />
                  </div>
                  <CardTitle className="text-2xl md:text-3xl font-bold">Conte-nos sobre seu projeto</CardTitle>
                </div>
                <p className="text-muted-foreground">Preencha os campos abaixo e receba uma proposta personalizada</p>
              </CardHeader>
              <CardContent>
                <OrcamentoForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
