'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Início',           href: '/' },
  { label: 'Educação',         href: '/categoria/educacao' },
  { label: 'Matemática',       href: '/categoria/matematica' },
  { label: 'Empreendedorismo', href: '/categoria/empreendedorismo' },
  { label: 'ENEM & Vestibular',href: '/categoria/enem-vestibular' },
  { label: 'Para Alunos',      href: '/#alunos' },
  { label: 'Para Professores', href: '/#professores' },
]

const TOP_LINKS = [
  { label: 'Newsletter',       href: '/#newsletter' },
  { label: 'Para Alunos',      href: '/#alunos' },
  { label: 'PFA — Apoio Pedagógico', href: '/#pfa' },
  { label: 'Para Professores', href: '/#professores' },
  { label: 'Contato',          href: '/contato' },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQ,    setSearchQ]    = useState('')
  const [dateStr,    setDateStr]    = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    setDateStr(new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }))
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Topo utilitário */}
      <div className="hidden md:block border-b border-paper-border bg-paper">
        <div className="max-w-[1200px] mx-auto px-6 py-[6px] flex items-center justify-between">
          <span className="font-sans text-[0.7rem] text-ink-muted capitalize tracking-wide">{dateStr}</span>
          <div className="flex gap-5">
            {TOP_LINKS.map(l => (
              <Link key={l.href} href={l.href} className="font-sans text-[0.7rem] text-ink-muted hover:text-brand-500 transition-colors no-underline">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Masthead */}
      <div className="bg-paper border-b-[3px] border-ink px-6 pt-5 pb-0">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-center pb-4 border-b border-paper-border relative">
            <div className="text-center">
              <Link href="/" className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tight text-ink leading-none no-underline">
                Aprender <span className="text-brand-500 italic">&</span> Empreender
              </Link>
              <div className="font-sans text-[0.68rem] font-medium tracking-[2px] uppercase text-ink-muted mt-1">
                Portal Editorial de Educação, Matemática e Empreendedorismo
              </div>
            </div>
            {/* Busca desktop */}
            <div className="hidden md:flex items-center gap-2 absolute right-0">
              <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Buscar"
                className="text-ink-muted hover:text-ink transition-colors">
                <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/>
                </svg>
              </button>
              <Link href="/#newsletter" className="font-sans text-[0.75rem] font-bold tracking-[0.1em] uppercase px-4 py-1.5 bg-brand-500 text-white hover:bg-brand-700 transition-colors no-underline">
                Newsletter
              </Link>
            </div>
          </div>

          {/* Barra de busca expandida */}
          {searchOpen && (
            <div className="py-2.5 border-b border-paper-border animate-fade-up">
              <form action="/busca" method="GET" className="flex items-center gap-3 max-w-lg mx-auto">
                <input type="text" name="q" value={searchQ} onChange={e => setSearchQ(e.target.value)}
                  placeholder="Buscar artigos..." autoFocus
                  className="flex-1 text-sm bg-transparent border-b border-ink outline-none pb-1 text-ink placeholder:text-ink-muted font-sans" />
                <button type="submit" className="font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase text-ink">Buscar</button>
                <button type="button" onClick={() => setSearchOpen(false)} className="text-ink-muted text-xs">✕</button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Nav editorial preta */}
      <nav className={`bg-ink sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-[1200px] mx-auto flex items-stretch overflow-x-auto scrollbar-hide">
          {/* Mobile menu toggle */}
          <button className="md:hidden text-white/80 px-4 py-3 flex-shrink-0"
            onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              {menuOpen ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>

          <div className="hidden md:flex flex-1">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href}
                className="font-sans text-[0.75rem] font-semibold tracking-[0.8px] uppercase text-white/80 hover:text-white px-4 py-3 whitespace-nowrap border-b-[3px] border-transparent hover:border-brand-400 hover:bg-white/5 transition-all no-underline">
                {l.label}
              </Link>
            ))}
            <Link href="/#pfa"
              className="font-sans text-[0.75rem] font-semibold tracking-[0.8px] uppercase text-gold-300 hover:text-gold-100 px-4 py-3 whitespace-nowrap border-b-[3px] border-transparent hover:border-gold-500 hover:bg-gold-500/5 transition-all no-underline ml-auto">
              PFA — Apoio Pedagógico
            </Link>
          </div>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="md:hidden bg-ink border-t border-white/10 px-5 py-4 space-y-3">
            {[...NAV_LINKS, { label: 'PFA — Apoio Pedagógico', href: '/#pfa' }].map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="block font-sans text-sm font-medium text-white/80 hover:text-white no-underline">
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}
