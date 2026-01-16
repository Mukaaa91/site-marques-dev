import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, Eye, FileText, Mail, CheckCircle, AlertTriangle, Users, Scale } from "lucide-react"

export default function PrivacidadePage() {
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
              <Shield className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-500">Política de Privacidade</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance">
              Proteção de <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Dados</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Esta Política de Privacidade está em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</strong>, o <strong>Marco Civil da Internet (Lei nº 12.965/2014)</strong> e demais normas aplicáveis à proteção de dados pessoais no Brasil.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Última atualização: {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <p className="text-xs text-muted-foreground mt-2 italic">
              Conforme previsto na LGPD, esta política pode ser atualizada periodicamente. Recomendamos sua leitura regular.
            </p>
          </div>

          <Card className="border border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl">
            <CardContent className="p-8 md:p-12 space-y-8">
              {/* 1. Informações Coletadas */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <Eye className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">1. Informações que Coletamos</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        Coletamos informações que você nos fornece diretamente quando utiliza nossos serviços, incluindo:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Nome completo e informações de contato (e-mail, telefone)</li>
                        <li>Informações sobre seu projeto ou necessidade</li>
                        <li>Dados de navegação e preferências quando você utiliza nosso site</li>
                        <li>Informações de comunicação quando você entra em contato conosco</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Base Legal LGPD */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">2. Base Legal para o Tratamento de Dados (LGPD)</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        De acordo com o art. 7º da LGPD, tratamos seus dados pessoais com base nas seguintes hipóteses legais:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Consentimento:</strong> Quando você autoriza expressamente o tratamento de seus dados</li>
                        <li><strong>Execução de contrato:</strong> Para cumprir obrigações contratuais ou pré-contratuais</li>
                        <li><strong>Cumprimento de obrigação legal:</strong> Para atender a obrigações legais ou regulatórias</li>
                        <li><strong>Legítimo interesse:</strong> Para realizar operações necessárias à prestação de nossos serviços</li>
                        <li><strong>Proteção da vida:</strong> Quando necessário para proteger a vida ou incolumidade física</li>
                      </ul>
                      <p className="mt-3">
                        Você pode revogar seu consentimento a qualquer momento, sendo que a revogação não afetará tratamentos realizados anteriormente com base em seu consentimento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2.1. Como Usamos */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <FileText className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">3. Finalidades do Tratamento de Dados</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>Utilizamos suas informações pessoais exclusivamente para as seguintes finalidades:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Fornecer, operar e manter nossos serviços de desenvolvimento web</li>
                        <li>Processar solicitações de orçamento e responder às suas consultas</li>
                        <li>Elaborar e enviar propostas comerciais</li>
                        <li>Executar contratos de prestação de serviços</li>
                        <li>Enviar comunicações sobre projetos e atualizações (apenas com seu consentimento)</li>
                        <li>Melhorar e personalizar sua experiência no site</li>
                        <li>Cumprir obrigações legais e regulatórias</li>
                        <li>Detectar, prevenir e resolver problemas técnicos ou de segurança</li>
                        <li>Realizar análises estatísticas e de uso do site (dados anonimizados)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Proteção */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <Lock className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">3. Segurança e Proteção</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
                      </p>
                      <p>
                        Utilizamos tecnologias de criptografia, firewalls e protocolos de segurança para garantir a proteção dos seus dados durante a transmissão e armazenamento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Compartilhamento e Transferência de Dados */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <Shield className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">5. Compartilhamento e Transferência de Dados</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        <strong>Conforme art. 8º da LGPD</strong>, não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto nas seguintes situações:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Operadores:</strong> Quando necessário, compartilhamos dados com prestadores de serviços (operadores) que processam dados em nosso nome, mediante contrato que garante a mesma proteção</li>
                        <li><strong>Consentimento:</strong> Com seu consentimento explícito e específico</li>
                        <li><strong>Obrigação legal:</strong> Para cumprir obrigações legais ou responder a solicitações de autoridades competentes</li>
                        <li><strong>Proteção de direitos:</strong> Para proteger nossos direitos, privacidade, segurança ou propriedade, bem como dos usuários</li>
                        <li><strong>Estudos e pesquisas:</strong> Dados anonimizados podem ser compartilhados para fins de estudos e pesquisas</li>
                      </ul>
                      <p className="mt-3">
                        <strong>Transferência Internacional:</strong> Caso seus dados sejam transferidos para outros países, garantiremos que o país de destino ofereça nível adequado de proteção ou que sejam adotadas cláusulas contratuais adequadas, conforme art. 33 da LGPD.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. Direitos dos Titulares (LGPD Art. 18) */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <Shield className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">6. Direitos dos Titulares de Dados Pessoais</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        <strong>Conforme art. 18 da LGPD</strong>, você possui os seguintes direitos em relação aos seus dados pessoais:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Confirmação e Acesso:</strong> Confirmar a existência de tratamento e acessar seus dados pessoais</li>
                        <li><strong>Correção:</strong> Solicitar a correção de dados incompletos, inexatos ou desatualizados</li>
                        <li><strong>Anonimização, Bloqueio ou Eliminação:</strong> Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD</li>
                        <li><strong>Portabilidade:</strong> Solicitar a portabilidade dos dados a outro fornecedor de serviço ou produto, mediante requisição expressa</li>
                        <li><strong>Eliminação:</strong> Solicitar a eliminação dos dados pessoais tratados com base no seu consentimento</li>
                        <li><strong>Informação sobre Compartilhamento:</strong> Obter informações sobre entidades públicas e privadas com as quais compartilhamos dados</li>
                        <li><strong>Informação sobre Negativa:</strong> Obter informações sobre a possibilidade de não fornecer consentimento e sobre as consequências da negativa</li>
                        <li><strong>Revogação do Consentimento:</strong> Revogar seu consentimento a qualquer momento</li>
                      </ul>
                      <p className="mt-3">
                        <strong>Como exercer seus direitos:</strong> Para exercer qualquer um destes direitos, entre em contato conosco através do e-mail indicado na seção de contato, fornecendo informações suficientes para identificação e comprovação de identidade. Responderemos sua solicitação em até <strong>15 (quinze) dias</strong>, conforme previsto no art. 18, § 3º da LGPD.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7. Retenção e Eliminação de Dados */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">7. Retenção e Eliminação de Dados</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletados, conforme previsto no <strong>art. 16 da LGPD</strong>:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Durante a vigência do contrato:</strong> Dados necessários para execução contratual são mantidos durante a vigência do contrato</li>
                        <li><strong>Obrigações legais:</strong> Dados podem ser mantidos por prazo superior para cumprimento de obrigações legais (ex: obrigações fiscais, contábeis)</li>
                        <li><strong>Exercício de direitos:</strong> Dados podem ser mantidos para exercício regular de direitos em processo judicial ou administrativo</li>
                        <li><strong>Proteção do titular:</strong> Quando necessário para proteção dos interesses do titular</li>
                      </ul>
                      <p className="mt-3">
                        Ao término do prazo de retenção, os dados serão eliminados mediante técnicas que impeçam a recuperação ou serão anonimizados, preservando apenas informações agregadas para fins estatísticos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 8. Cookies e Tecnologias de Rastreamento */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <Eye className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">8. Cookies e Tecnologias de Rastreamento</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        <strong>Conforme art. 7º, inciso I do Marco Civil da Internet</strong>, utilizamos cookies e tecnologias similares para:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Melhorar sua experiência de navegação</li>
                        <li>Analisar o uso do site (dados agregados e anonimizados)</li>
                        <li>Garantir a segurança do site</li>
                        <li>Personalizar conteúdo e preferências</li>
                      </ul>
                      <p className="mt-3">
                        Você pode gerenciar suas preferências de cookies através das configurações do seu navegador. A desativação de cookies pode afetar algumas funcionalidades do site.
                      </p>
                      <p className="mt-3">
                        <strong>Cookies Essenciais:</strong> Necessários para o funcionamento do site e não podem ser desativados.
                      </p>
                      <p>
                        <strong>Cookies de Análise:</strong> Utilizados para compreender como os visitantes interagem com o site. São anonimizados e não identificam pessoalmente o usuário.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 9. Proteção de Dados de Menores */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <Users className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">9. Proteção de Dados de Menores</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        <strong>Conforme art. 14 da LGPD</strong>, o tratamento de dados pessoais de menores de idade (menores de 18 anos) deve ser realizado em seu melhor interesse. Nosso serviço é direcionado a pessoas com 18 anos ou mais.
                      </p>
                      <p>
                        Se tomarmos conhecimento de que coletamos dados pessoais de menores sem o consentimento adequado, tomaremos medidas para eliminar essas informações de nossos sistemas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 10. Encarregado de Proteção de Dados (DPO) */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <Users className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">10. Encarregado de Proteção de Dados (DPO/Encarregado)</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        <strong>Conforme art. 41 da LGPD</strong>, nossa empresa possui um Encarregado de Proteção de Dados (DPO) responsável por receber comunicações dos titulares e da Autoridade Nacional de Proteção de Dados (ANPD).
                      </p>
                      <div className="mt-4 p-4 bg-orange-500/5 rounded-lg border border-orange-500/20">
                        <p className="font-semibold text-foreground mb-2">Contato do Encarregado de Dados:</p>
                        <p className="text-muted-foreground mb-1">E-mail:</p>
                        <a href="mailto:dpo@mintwebsite.com" className="text-orange-500 hover:underline">
                          dpo@mintwebsite.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 11. Alterações nesta Política */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <FileText className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">11. Alterações nesta Política de Privacidade</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas ou por outros motivos operacionais, legais ou regulatórios. Quando houver alterações significativas, notificaremos você:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Publicando a política atualizada nesta página com nova data de "Última atualização"</li>
                        <li>Enviando notificação por e-mail (quando aplicável)</li>
                        <li>Exibindo aviso no site por período razoável</li>
                      </ul>
                      <p className="mt-3">
                        Recomendamos que você revise esta política periodicamente para estar ciente de como protegemos suas informações.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 12. Legislação Aplicável e Autoridade Fiscalizadora */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <Scale className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">12. Legislação Aplicável e Autoridade Fiscalizadora</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        Esta Política de Privacidade está em conformidade com a legislação brasileira aplicável, especialmente:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Lei Geral de Proteção de Dados (LGPD) - Lei nº 13.709/2018</strong></li>
                        <li><strong>Marco Civil da Internet - Lei nº 12.965/2014</strong></li>
                        <li><strong>Código de Defesa do Consumidor - Lei nº 8.078/1990</strong></li>
                        <li><strong>Constituição Federal de 1988</strong></li>
                      </ul>
                      <p className="mt-3">
                        A autoridade nacional responsável pela fiscalização e proteção de dados pessoais é a <strong>Autoridade Nacional de Proteção de Dados (ANPD)</strong>. Caso você tenha dúvidas ou queira apresentar reclamações sobre o tratamento de seus dados pessoais, você pode:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                        <li>Entrar em contato conosco através dos canais indicados</li>
                        <li>Apresentar reclamação junto à ANPD através do site: <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">www.gov.br/anpd</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 13. Contato */}
              <div className="space-y-4 pt-4 border-t border-border/50">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mt-1">
                    <Mail className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">13. Entre em Contato</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        Se você tiver dúvidas sobre esta Política de Privacidade, sobre como tratamos suas informações pessoais ou deseja exercer seus direitos, entre em contato conosco:
                      </p>
                      <div className="mt-4 p-4 bg-orange-500/5 rounded-lg border border-orange-500/20 space-y-2">
                        <div>
                          <p className="font-semibold text-foreground mb-1">E-mail Geral:</p>
                          <a href="mailto:contato@mintwebsite.com" className="text-orange-500 hover:underline">
                            contato@mintwebsite.com
                          </a>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground mb-1">E-mail do DPO:</p>
                          <a href="mailto:dpo@mintwebsite.com" className="text-orange-500 hover:underline">
                            dpo@mintwebsite.com
                          </a>
                        </div>
                      </div>
                      <p className="mt-3 text-sm">
                        <strong>Prazo de Resposta:</strong> Comprometemo-nos a responder suas solicitações em até 15 (quinze) dias corridos, conforme previsto na LGPD.
                      </p>
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
