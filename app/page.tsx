import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoveRight, Monitor, ShoppingBag, Zap, ArrowRight, FileText, CheckCircle2, Sparkles, Clock, Shield, Headphones, MessageCircle } from "lucide-react"
import { ServiceCard } from "@/components/service-card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { OrcamentoForm } from "@/components/orcamento-form"
import Link from "next/link"

const benefits = [
  "Resposta em até 24 horas",
  "Orçamento sem compromisso",
  "Suporte durante todo o projeto",
  "Garantia de satisfação",
]

const portfolioSites = [
  {
    id: 1,
    title: "Landing Page Moderna",
    category: "Site Personalizado",
    image: "/modern-landing-page-website-mockup.jpg",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    id: 2,
    title: "Portfólio Criativo",
    category: "Site Personalizado",
    image: "/creative-portfolio-website-mockup-dark-theme.jpg",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    id: 3,
    title: "Site Institucional",
    category: "Site Pronto",
    image: "/corporate-institutional-website-mockup-clean.jpg",
    icon: <Monitor className="h-5 w-5" />,
  },
  {
    id: 4,
    title: "Blog Profissional",
    category: "Site Pronto",
    image: "/professional-blog-website-mockup-minimal.jpg",
    icon: <Monitor className="h-5 w-5" />,
  },
  {
    id: 5,
    title: "E-commerce Completo",
    category: "Loja Virtual",
    image: "/ecommerce-online-store-website-mockup-modern.jpg",
    icon: <ShoppingBag className="h-5 w-5" />,
  },
  {
    id: 6,
    title: "Loja de Moda",
    category: "Loja Virtual",
    image: "/fashion-clothing-store-website-mockup-elegant.jpg",
    icon: <ShoppingBag className="h-5 w-5" />,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance">
          Seu próximo grande passo <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-muted-foreground to-foreground">
            começa com um site
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-10 text-pretty">
          Desenvolvemos experiências digitais de alta performance com a estética refinada que seu negócio merece.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/#portfolio">
            <Button size="lg" className="rounded-full px-8 bg-orange-500 hover:bg-orange-600">
              Ver Modelos
            </Button>
          </Link>
          <Link href="/orcamento">
            <Button 
              size="lg" 
              className="group relative overflow-hidden rounded-full border-2 border-orange-500/30 bg-gradient-to-r from-orange-500/10 via-orange-500/20 to-orange-500/10 text-foreground hover:from-orange-500 hover:via-orange-600 hover:to-orange-500 hover:text-white hover:border-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] transition-all duration-300 px-8 backdrop-blur-sm"
            >
              <span className="relative z-10 flex items-center gap-2 font-semibold">
                Solicitar Orçamento
                <MoveRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/30 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Zap className="h-8 w-8 text-orange-500" />}
              title="Sites Personalizados"
              description="Do rascunho ao código. Design exclusivo focado na identidade da sua marca."
            />
            <ServiceCard
              icon={<Monitor className="h-8 w-8 text-orange-400" />}
              title="Sites Prontos"
              description="Soluções rápidas e otimizadas para quem precisa estar online hoje."
            />
            <ServiceCard
              icon={<ShoppingBag className="h-8 w-8 text-orange-600" />}
              title="Loja Virtual"
              description="Sistemas de e-commerce robustos para escalar suas vendas com segurança."
            />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 px-4 relative overflow-hidden bg-gradient-to-b from-background via-card/30 to-background">
        {/* Background decorativo */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
              <Zap className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-500">Nossos Projetos</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Sites que <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Transformam Negócios</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Veja alguns dos projetos desenvolvidos por nossa equipe. Cada site é uma obra única.
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {portfolioSites.map((site, index) => (
              <Card
                key={site.id}
                className="group relative overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 rounded-2xl hover:-translate-y-2 cursor-pointer"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Overlay gradiente no hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                
                {/* Container da imagem */}
                <div className="relative overflow-hidden h-56 bg-gradient-to-br from-muted/50 to-muted/20">
                  {/* Imagem com zoom e efeito parallax */}
                  <img
                    src={site.image || "/placeholder.svg"}
                    alt={site.title}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                  />
                  
                  {/* Overlay escuro no hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  
                  {/* Badge de categoria */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="flex items-center gap-2 bg-background/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-border/50 group-hover:bg-orange-500/20 group-hover:border-orange-500/50 transition-all duration-300">
                      <span className="text-orange-500 group-hover:scale-110 transition-transform duration-300">
                        {site.icon}
                      </span>
                      <span className="text-xs font-semibold text-foreground">{site.category}</span>
                    </div>
                  </div>

                  {/* Título no hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl font-bold text-white mb-2">{site.title}</h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <span>Ver detalhes</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Brilho decorativo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/0 to-transparent opacity-0 group-hover:opacity-100 group-hover:via-orange-500/20 transition-opacity duration-700 pointer-events-none" />
                </div>

                {/* Conteúdo do card (visível sempre) */}
                <CardContent className="p-4 relative z-10">
                  <h3 className="text-lg font-bold mb-1 group-hover:text-orange-500 transition-colors duration-300">
                    {site.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{site.category}</p>
                </CardContent>

                {/* Brilho decorativo no canto */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Borda luminosa no hover */}
                <div className="absolute inset-0 rounded-2xl border-2 border-orange-500/0 group-hover:border-orange-500/30 transition-all duration-500 pointer-events-none" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Orçamento Section */}
      <section id="orcamento" className="py-20 px-4 relative overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-500/5 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Info */}
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="pt-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance">
                  Solicite seu <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Orçamento</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Preencha o formulário ao lado e receba uma proposta personalizada para o seu projeto. Nossa equipe irá
                  analisar suas necessidades e entrar em contato o mais breve possível.
                </p>
              </div>

              {/* Benefits */}
              <div className="flex-1 space-y-4">
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
                <CardContent className="p-0 space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Prefere falar diretamente?</p>
                    <a
                      href="https://wa.me/5511919799531"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Button className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold rounded-xl shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 group/btn">
                        <svg
                          className="h-5 w-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        Falar no WhatsApp
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Form */}
            <Card className="border border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 h-full flex flex-col">
              <CardHeader className="pb-6 pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-orange-500" />
                  </div>
                  <CardTitle className="text-2xl md:text-3xl font-bold">Conte-nos sobre seu projeto</CardTitle>
                </div>
                <p className="text-muted-foreground">Preencha os campos abaixo e receba uma proposta personalizada</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
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
