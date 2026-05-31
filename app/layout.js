import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: { default: 'Aprender & Empreender', template: '%s | Aprender & Empreender' },
  description: 'Portal editorial de educação matemática, empreendedorismo e desenvolvimento acadêmico. Conteúdo de autoridade para alunos, professores e empreendedores.',
  openGraph: {
    siteName: 'Aprender & Empreender',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
