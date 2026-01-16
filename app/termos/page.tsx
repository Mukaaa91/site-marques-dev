import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Scale, AlertTriangle, CheckCircle, Mail, Gavel, Shield, Clock } from "lucide-react"

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-500/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <Navbar />

      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
              <Scale className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-500">Termos de Uso</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance">
              Termos e <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Condições</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Estes Termos de Uso estão em conformidade com o <strong>Marco Civil da Internet (Lei nº 12.965/2014)</strong>, o <strong>Código de Defesa do Consumidor (CDC - Lei nº 8.078/1990)</strong>, a <strong>Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</strong> e demais normas aplicáveis.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Última atualização: {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <p className="text-xs text-muted-foreground mt-2 italic">
              Conforme previsto no Marco Civil da Internet (art. 7º, VIII), estes termos podem ser atualizados periodicamente.
            </p>
          </div>

          <Card className="border border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl">
            <CardContent className="p-8 md:p-12 space-y-8">
              {/* 1. Aceitação */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">1. Aceitação dos Termos</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        <strong>Conforme art. 7º, inciso VIII do Marco Civil da Internet</strong>, ao acessar e utilizar este site, você concorda em cumprir e estar vinculado a estes Termos de Uso e a todas as leis e regulamentos aplicáveis ao Brasil, incluindo:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Marco Civil da Internet (Lei nº 12.965/2014)</li>
                        <li>Código de Defesa do Consumidor (Lei nº 8.078/1990)</li>
                        <li>Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</li>
                        <li>Constituição Federal de 1988</li>
                      </ul>
                      <p className="mt-3">
                        Se você não concordar com algum destes termos, está proibido de usar ou acessar este site. O uso continuado do site após alterações nos termos constitui sua aceitação dos termos modificados.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Serviços */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <FileText className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">2. Descrição dos Serviços</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        Fornecemos serviços de desenvolvimento web, design e soluções digitais personalizadas. Os serviços incluem, mas não se limitam a:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Desenvolvimento de sites personalizados</li>
                        <li>Sites prontos e templates</li>
                        <li>Lojas virtuais (e-commerce)</li>
                        <li>Consultoria em soluções digitais</li>
                        <li>Manutenção e suporte técnico</li>
                      </ul>
                      <p className="mt-3">
                        Nos reservamos o direito de modificar, suspender ou descontinuar qualquer aspecto dos serviços a qualquer momento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Uso Permitido */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">3. Uso Permitido</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>Você concorda em usar o site apenas para fins legais e de forma que não infrinja os direitos de terceiros. Você não deve:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Usar o site de forma que possa danificar, desativar ou sobrecarregar nossos servidores</li>
                        <li>Tentar obter acesso não autorizado a qualquer parte do site</li>
                        <li>Interferir ou interromper o funcionamento do site</li>
                        <li>Usar qualquer dispositivo ou processo automatizado para acessar o site</li>
                        <li>Reproduzir, duplicar ou copiar qualquer conteúdo sem autorização</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Propriedade Intelectual */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <Gavel className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">4. Propriedade Intelectual</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        Todo o conteúdo deste site, incluindo textos, gráficos, logotipos, ícones, imagens, clipes de áudio e software, é propriedade da Mint ou de seus fornecedores de conteúdo e está protegido por leis de direitos autorais e outras leis de propriedade intelectual.
                      </p>
                      <p>
                        Você não pode reproduzir, distribuir, modificar, criar trabalhos derivados, exibir publicamente ou usar qualquer conteúdo deste site para fins comerciais sem nossa autorização prévia por escrito.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Propostas e Contratos de Serviço */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <FileText className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">5. Propostas e Contratos de Serviço</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        <strong>Conforme CDC (Lei nº 8.078/1990)</strong>, quando você solicita nossos serviços através do formulário de orçamento ou contato:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Proposta Comercial:</strong> Enviaremos uma proposta detalhada baseada em suas necessidades, contendo especificações técnicas, prazos e valores</li>
                        <li><strong>Aprovação e Contrato:</strong> O serviço só será iniciado após a aprovação formal da proposta e assinatura de contrato específico</li>
                        <li><strong>Contrato Específico:</strong> Os termos específicos de cada projeto (prazo, valor, escopo, garantias) serão definidos em contrato separado e detalhado</li>
                        <li><strong>Preços:</strong> Os preços e condições podem variar conforme a complexidade e escopo do projeto. Todos os valores são expressos em Reais (R$)</li>
                        <li><strong>Forma de Pagamento:</strong> As condições de pagamento serão definidas em contrato específico, respeitando o CDC</li>
                      </ul>
                      <p className="mt-3">
                        <strong>Prazo para Resposta da Proposta:</strong> Você terá prazo razoável para avaliar a proposta e decidir sobre sua aceitação.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5.1. Direito de Arrependimento */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <Clock className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">5.1. Direito de Arrependimento (CDC Art. 49)</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        <strong>Conforme art. 49 do Código de Defesa do Consumidor</strong>, quando o serviço for contratado fora do estabelecimento comercial, você tem o direito de se arrepender do contrato no prazo de <strong>7 (sete) dias corridos</strong>, contados a partir da assinatura do contrato ou do início da prestação do serviço.
                      </p>
                      <p>
                        <strong>Exceções ao Direito de Arrependimento:</strong> O direito de arrependimento não se aplica a:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Serviços já iniciados com sua expressa concordância</li>
                        <li>Serviços executados sob medida ou personalizados</li>
                        <li>Serviços cuja execução tenha sido concluída</li>
                      </ul>
                      <p className="mt-3">
                        Para exercer o direito de arrependimento, entre em contato conosco através dos canais indicados na seção de contato, informando claramente sua decisão.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. Responsabilidade e Limitações */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <Shield className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">6. Responsabilidade Civil</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        <strong>Conforme art. 14 do Marco Civil da Internet e art. 12 do CDC</strong>, assumimos responsabilidade pelos danos causados aos usuários decorrentes de conteúdo gerado por terceiros quando, após ordem judicial específica, não removermos o conteúdo em questão.
                      </p>
                      <p>
                        <strong>Responsabilidade pelo Serviço:</strong> Somos responsáveis pelos vícios e defeitos dos serviços prestados, conforme estabelece o <strong>art. 18 do CDC</strong>:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Garantimos que o serviço corresponda às especificações constantes da proposta e do contrato</li>
                        <li>Garantimos que o serviço não apresente vícios ou defeitos que o tornem impróprio ao uso ou diminuam seu valor</li>
                        <li>Oferecemos garantia mínima de <strong>90 (noventa) dias</strong> para os serviços prestados, contados da entrega/implementação</li>
                      </ul>
                      <p className="mt-3">
                        <strong>Limitação de Responsabilidade (Marco Civil Art. 18):</strong> Não seremos responsáveis por:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Danos resultantes de conteúdo gerado por terceiros (sem ordem judicial específica)</li>
                        <li>Danos decorrentes da impossibilidade de uso do site devido a falhas técnicas fora de nosso controle</li>
                        <li>Decisões tomadas pelo usuário com base em informações do site</li>
                      </ul>
                      <p className="mt-3">
                        <strong>Força Maior:</strong> Não seremos responsáveis por falhas ou atrasos decorrentes de causas fora de nosso controle razoável (força maior), incluindo desastres naturais, atos de guerra, greves, falhas de infraestrutura de internet, etc.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6.1. Garantias (CDC) */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">6.1. Garantias dos Serviços (CDC Art. 18-26)</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        <strong>Conforme art. 18 e seguintes do CDC</strong>, garantimos:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Garantia Legal:</strong> Garantia mínima de 90 dias para correção de vícios ou defeitos</li>
                        <li><strong>Padrão de Qualidade:</strong> Os serviços serão executados com padrão de qualidade adequado ao uso a que se destinam</li>
                        <li><strong>Manutenção:</strong> Oferecemos suporte técnico durante o prazo estabelecido no contrato</li>
                        <li><strong>Correção de Vícios:</strong> Em caso de vícios ou defeitos, você pode exigir a reexecução do serviço sem custo adicional ou a restituição proporcional do valor pago</li>
                      </ul>
                      <p className="mt-3">
                        <strong>Prazo para Reclamar:</strong> Você tem <strong>90 (noventa) dias</strong> para reclamar vícios aparentes ou de fácil constatação, contados da entrega/implementação do serviço. Para vícios ocultos, o prazo é de <strong>30 (trinta) dias</strong> contados da descoberta do vício.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7. Links Externos */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <FileText className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">7. Links para Sites de Terceiros</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        Nosso site pode conter links para sites de terceiros. Não temos controle sobre o conteúdo ou práticas desses sites e não assumimos responsabilidade por eles. Recomendamos que você leia os termos de uso e políticas de privacidade de qualquer site de terceiros que você visite.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 8. Modificações */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <FileText className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">8. Modificações dos Termos</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no site. É sua responsabilidade revisar periodicamente estes termos para estar ciente de quaisquer alterações.
                      </p>
                      <p>
                        O uso continuado do site após qualquer modificação constitui sua aceitação dos termos modificados.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 9. Rescisão Contratual */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">9. Rescisão Contratual</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        <strong>Rescisão pelo Consumidor:</strong> Conforme CDC, você pode rescindir o contrato em caso de:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Descumprimento de obrigações contratuais por nossa parte</li>
                        <li>Vícios ou defeitos não corrigidos dentro do prazo razoável</li>
                        <li>Exercício do direito de arrependimento (quando aplicável)</li>
                      </ul>
                      <p className="mt-3">
                        <strong>Rescisão pelo Prestador:</strong> Podemos rescindir o contrato em caso de:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Descumprimento de obrigações contratuais pelo cliente</li>
                        <li>Não pagamento dentro dos prazos estabelecidos</li>
                        <li>Uso indevido dos serviços prestados</li>
                      </ul>
                      <p className="mt-3">
                        A rescisão será formalizada por escrito e seguirá as disposições do contrato específico e da legislação aplicável.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 10. Lei Aplicável e Foro */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <Scale className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">10. Lei Aplicável e Foro</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        <strong>Lei Aplicável:</strong> Estes Termos de Uso serão regidos e interpretados de acordo com as leis da República Federativa do Brasil, especialmente:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Marco Civil da Internet (Lei nº 12.965/2014)</li>
                        <li>Código de Defesa do Consumidor (Lei nº 8.078/1990)</li>
                        <li>Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</li>
                        <li>Código Civil (Lei nº 10.406/2002)</li>
                        <li>Constituição Federal de 1988</li>
                      </ul>
                      <p className="mt-3">
                        <strong>Foro de Eleição:</strong> Qualquer disputa relacionada a estes termos ou aos serviços prestados será resolvida preferencialmente por meio de mediação ou arbitragem. Na impossibilidade ou falta de acordo, será submetida à jurisdição dos tribunais competentes do local de sua residência, ressalvadas as causas de competência absoluta previstas em lei.
                      </p>
                      <p className="mt-3">
                        <strong>Proteção ao Consumidor:</strong> Conforme art. 51, inciso I do CDC, as cláusulas que estabelecerem a renúncia ou limitação de direitos do consumidor são nulas de pleno direito.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 10. Contato */}
              <div className="space-y-4 pt-4 border-t border-border/50">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <Mail className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">10. Entre em Contato</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
                      </p>
                      <div className="mt-4 p-4 bg-orange-500/5 rounded-lg border border-orange-500/20">
                        <p className="font-semibold text-foreground mb-1">E-mail:</p>
                        <a href="mailto:contato@mintwebsite.com" className="text-orange-500 hover:underline">
                          contato@mintwebsite.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
