import nodemailer from 'nodemailer'

// Configuração do transporter de email
// Para produção, use um serviço como SendGrid, Mailgun, ou Resend
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true para porta 465, false para outras portas
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
} as nodemailer.TransportOptions)

interface OrcamentoEmailData {
  nome: string
  email: string
  telefone: string
  empresa?: string
  tipo_projeto: string
  orcamento_estimado?: string
  descricao: string
  id: string
  created_at: string
}

export async function sendOrcamentoNotification(data: OrcamentoEmailData) {
  // Se não houver configuração de email, apenas logar
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.log('⚠️ Email não configurado. Orçamento recebido:', data)
    return { success: false, error: 'Email não configurado' }
  }

  try {
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #f97316; margin-bottom: 5px; }
            .value { background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #f97316; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
            .button { display: inline-block; padding: 12px 24px; background: #f97316; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 Novo Orçamento Recebido</h1>
              <p>ID: ${data.id}</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Nome:</div>
                <div class="value">${data.nome}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 E-mail:</div>
                <div class="value">${data.email}</div>
              </div>
              
              <div class="field">
                <div class="label">📱 Telefone:</div>
                <div class="value">${data.telefone}</div>
              </div>
              
              ${data.empresa ? `
              <div class="field">
                <div class="label">🏢 Empresa:</div>
                <div class="value">${data.empresa}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">💼 Tipo de Projeto:</div>
                <div class="value">${getTipoProjetoLabel(data.tipo_projeto)}</div>
              </div>
              
              ${data.orcamento_estimado ? `
              <div class="field">
                <div class="label">💰 Orçamento Estimado:</div>
                <div class="value">${getOrcamentoLabel(data.orcamento_estimado)}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">📝 Descrição do Projeto:</div>
                <div class="value">${data.descricao}</div>
              </div>
              
              <div style="margin-top: 30px; text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin" class="button">
                  Ver no Painel Admin
                </a>
              </div>
            </div>
            <div class="footer">
              <p>Recebido em: ${new Date(data.created_at).toLocaleString('pt-BR')}</p>
              <p>Mint - Desenvolvimento de Sites</p>
            </div>
          </div>
        </body>
      </html>
    `

    const emailText = `
NOVO ORÇAMENTO RECEBIDO

ID: ${data.id}
Data: ${new Date(data.created_at).toLocaleString('pt-BR')}

👤 Nome: ${data.nome}
📧 E-mail: ${data.email}
📱 Telefone: ${data.telefone}
${data.empresa ? `🏢 Empresa: ${data.empresa}` : ''}
💼 Tipo de Projeto: ${getTipoProjetoLabel(data.tipo_projeto)}
${data.orcamento_estimado ? `💰 Orçamento Estimado: ${getOrcamentoLabel(data.orcamento_estimado)}` : ''}

📝 Descrição do Projeto:
${data.descricao}

---
Mint - Desenvolvimento de Sites
    `

    const info = await transporter.sendMail({
      from: `"Mint - Site" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || 'contato@mintwebsite.com',
      subject: `🎯 Novo Orçamento: ${data.nome} - ${getTipoProjetoLabel(data.tipo_projeto)}`,
      text: emailText,
      html: emailHtml,
    })

    console.log('✅ Email enviado:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error)
    return { success: false, error: String(error) }
  }
}

function getTipoProjetoLabel(tipo: string): string {
  const labels: Record<string, string> = {
    landing: 'Landing Page',
    institucional: 'Site Institucional',
    portfolio: 'Portfólio',
    blog: 'Blog',
    ecommerce: 'Loja Virtual',
    personalizado: 'Projeto Personalizado',
  }
  return labels[tipo] || tipo
}

function getOrcamentoLabel(faixa: string): string {
  const labels: Record<string, string> = {
    '1000-3000': 'R$ 1.000 - R$ 3.000',
    '3000-5000': 'R$ 3.000 - R$ 5.000',
    '5000-10000': 'R$ 5.000 - R$ 10.000',
    '10000+': 'Acima de R$ 10.000',
  }
  return labels[faixa] || faixa
}
