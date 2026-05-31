import Link from 'next/link'

const LINKS = {
  Conteúdo: [
    { label: 'Educação Matemática',     href: '/categoria/matematica' },
    { label: 'Empreendedorismo',        href: '/categoria/empreendedorismo' },
    { label: 'ENEM & Vestibular',       href: '/categoria/enem-vestibular' },
    { label: 'Raciocínio Lógico',       href: '/categoria/raciocinio-logico' },
    { label: 'Metodologias Ativas',     href: '/categoria/metodologias' },
  ],
  Recursos: [
    { label: 'Downloads Gratuitos',     href: '/#pfa' },
    { label: 'Para Alunos',             href: '/#alunos' },
    { label: 'Para Professores',        href: '/#professores' },
    { label: 'Simulados ENEM',          href: '/#pfa' },
    { label: 'Banco de Questões',       href: '/#pfa' },
  ],
  Portal: [
    { label: 'Sobre o Autor',           href: '/sobre' },
    { label: 'Newsletter',              href: '/#newsletter' },
    { label: 'Contato',                 href: '/contato' },
    { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-ink text-white/60 mt-0">
      <div className="max-w-[1200px] mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-10 border-b border-white/10 mb-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-serif text-[1.4rem] font-black text-white no-underline block mb-3">
              Aprender <span className="text-brand-400 italic">&</span> Empreender
            </Link>
            <p className="text-[0.77rem] text-white/40 leading-relaxed mb-4">
              Portal editorial de educação matemática, empreendedorismo e desenvolvimento acadêmico.
              Conteúdo de autoridade para alunos, professores e empreendedores.
            </p>
            <a href="mailto:professor.marcioalvarenga@gmail.com" className="text-[0.75rem] text-brand-400 no-underline hover:text-brand-300 transition-colors">
              professor.marcioalvarenga@gmail.com
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h5 className="text-[0.62rem] font-bold tracking-[2px] uppercase text-white/30 mb-3">{title}</h5>
              {links.map(l => (
                <Link key={l.href} href={l.href}
                  className="block text-[0.77rem] text-white/55 hover:text-brand-400 no-underline mb-1.5 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-[0.68rem] text-white/25">
          <span>© 2026 Aprender &amp; Empreender — Prof. Márcio Alvarenga · Todos os direitos reservados</span>
          <span>Cariacica, Espírito Santo, Brasil</span>
        </div>
      </div>
    </footer>
  )
}
