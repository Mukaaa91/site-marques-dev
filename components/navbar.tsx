import { Button } from "@/components/ui/button"
import { MintLogo } from "@/components/mint-logo"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/">
          <MintLogo />
        </Link>
        <div className="hidden space-x-8 md:flex text-sm font-medium">
          <Link href="/" className="hover:text-orange-500 transition">
            Início
          </Link>
          <Link href="/#portfolio" className="hover:text-orange-500 transition">
            Serviços
          </Link>
          <Link href="/#orcamento" className="hover:text-orange-500 transition">
            Orçamento
          </Link>
        </div>
        <Link href="/#orcamento">
          <Button variant="default" className="rounded-full bg-orange-500 hover:bg-orange-600">
            Começar Projeto
          </Button>
        </Link>
      </div>
    </nav>
  )
}
