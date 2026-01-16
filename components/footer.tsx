import { MintLogo } from "@/components/mint-logo"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, Twitter } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <Link href="/">
              <MintLogo />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Desenvolvemos experiências digitais de alta performance com a estética refinada que seu negócio merece.
            </p>
          </div>

          {/* Navegação */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Navegação</h3>
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-sm text-muted-foreground hover:text-orange-500 transition">
                Início
              </Link>
              <Link href="/#portfolio" className="text-sm text-muted-foreground hover:text-orange-500 transition">
                Serviços
              </Link>
              <Link href="/orcamento" className="text-sm text-muted-foreground hover:text-orange-500 transition">
                Orçamento
              </Link>
            </nav>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contato</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="mailto:contato@mint.com"
                className="text-sm text-muted-foreground hover:text-orange-500 transition flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                contato@mint.com
              </a>
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-orange-500 transition"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-orange-500 transition"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-orange-500 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-orange-500 transition"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Mint. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <Link href="/privacidade" className="hover:text-orange-500 transition">
              Privacidade
            </Link>
            <Link href="/termos" className="hover:text-orange-500 transition">
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
