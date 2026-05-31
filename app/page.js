import { getPosts, getCategories } from '@/lib/wordpress'
import { MancheteCard, MancheteLatCard, GridCard, ArticleRowCard } from '@/components/ArticleCard'
import Sidebar from '@/components/Sidebar'
import NewsletterForm from '@/components/NewsletterForm'
import Link from 'next/link'

export const revalidate = 3600

// ── Seção PFA (estática — conteúdo vem do WordPress depois) ──
const PFA_REFORCO = [
  { nome: 'Lista de Equações do 1.º Grau',          serie: '1.º Ano · Ensino Médio · PDF' },
  { nome: 'Atividade de Funções e Gráficos',         serie: '1.º Ano · Ensino Médio · PDF' },
  { nome: 'Lista de Geometria Plana',                serie: '2.º Ano · Ensino Médio · PDF' },
  { nome: 'Exercícios de Progressões (PA e PG)',     serie: '2.º Ano · Ensino Médio · PDF' },
  { nome: 'Revisão de Frações e Proporções',         serie: '9.º Ano · Fundamental · PDF' },
]
const PFA_ENEM = [
  { nome: 'Simulado ENEM — Matemática (60 questões)',    serie: 'ENEM · Com gabarito · PDF' },
  { nome: 'Estatística e Probabilidade — ENEM',          serie: 'ENEM · Questões comentadas · PDF' },
  { nome: 'Raciocínio Lógico — Concursos',               serie: 'Concursos · RLM · PDF' },
  { nome: 'Matemática Financeira — ENEM & Concursos',    serie: 'Misto · Com gabarito · PDF' },
  { nome: 'Geometria Espacial — Simulado Temático',      serie: 'ENEM · 20 questões · PDF' },
]
const PFA_ACOMP = [
  { nome: 'Cronograma de estudos — 3 meses',   serie: 'Planejamento · PDF editável',          btn: 'Download' },
  { nome: 'Como estudar matemática do zero',   serie: 'Guia pedagógico · PDF',                btn: 'Download' },
  { nome: 'Solicitar orientação personalizada',serie: 'Atendimento direto com o professor',   btn: 'Solicitar' },
  { nome: 'Diagnóstico de dificuldades',       serie: 'Autoavaliação · Online',               btn: 'Fazer' },
  { nome: 'Dicas para alunos com dificuldade', serie: 'Artigo especializado · Leitura',       btn: 'Ler' },
]

const ALUNOS = [
  { sigla: 'EX', titulo: 'Exercícios por Conteúdo',  desc: 'Listas organizadas por tema — álgebra, geometria, funções, estatística e mais. Com gabarito comentado.', qtd: '80+ listas disponíveis',    btn: 'Acessar exercícios' },
  { sigla: 'SM', titulo: 'Simulados ENEM',           desc: 'Provas completas com questões no estilo ENEM, gabarito e resolução detalhada para treinamento real.',     qtd: '18 simulados disponíveis', btn: 'Ver simulados' },
  { sigla: 'RL', titulo: 'Raciocínio Lógico',        desc: 'Questões de RLM para concursos públicos, com explicação passo a passo das estratégias de resolução.',    qtd: '120+ questões comentadas', btn: 'Praticar RLM' },
  { sigla: 'PF', titulo: 'Provas Anteriores',        desc: 'Provas de anos anteriores do ENEM, vestibulares e concursos com gabaritos e resoluções completas.',       qtd: '40+ provas disponíveis',   btn: 'Baixar provas' },
]

const PROFESSORES = [
  { sigla: 'SD', titulo: 'Sequências Didáticas', desc: 'Planejamentos completos com objetivos, recursos e avaliação para diferentes séries e conteúdos.', qtd: '14 materiais' },
  { sigla: 'AV', titulo: 'Avaliações Prontas',   desc: 'Provas, testes e rubricas com gabarito para aplicação imediata em turmas do Fundamental e Médio.', qtd: '32 avaliações' },
  { sigla: 'SL', titulo: 'Slides de Aula',       desc: 'Apresentações editáveis para os principais conteúdos de matemática, organizadas por unidade.',    qtd: '21 slides' },
  { sigla: 'BQ', titulo: 'Banco de Questões',    desc: 'Questões comentadas por tema, nível de dificuldade e habilidade da BNCC.',                         qtd: '200+ questões' },
]

const THUMB_COLORS = ['verde','laranja','roxo','azul','dourado']

export default async function HomePage() {
  const [allPosts, categories] = await Promise.all([
    getPosts({ perPage: 14 }),
    getCategories(),
  ])

  const posts       = allPosts || []
  const hero        = posts[0]
  const latPosts    = posts.slice(1, 5)
  const gridPosts   = posts.slice(5, 8)
  const listPosts   = posts.slice(8, 13)

  return (
    <div className="bg-paper min-h-screen">

      {/* ── Bloco editorial principal ── */}
      <div className="max-w-[1200px] mx-auto px-6 pt-8 pb-6">

        <div className="section-label mb-5">
          <span className="section-label-accent">Destaques</span>
          <span className="section-label-line" />
          <span className="section-label-text">{new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>

        {hero ? (
          <div className="grid md:grid-cols-[1fr_1px_320px] gap-0 mb-8">
            {/* Manchete principal */}
            <div className="md:pr-6">
              <MancheteCard post={hero} />
            </div>

            {/* Divisor */}
            <div className="hidden md:block bg-paper-border mx-6" />

            {/* Manchetes laterais */}
            <div className="mt-6 md:mt-0 border-t-2 border-ink md:border-t-0">
              {latPosts.map(post => <MancheteLatCard key={post.id} post={post} />)}
            </div>
          </div>
        ) : (
          <div className="h-72 flex items-center justify-center border border-paper-border">
            <p className="font-sans text-sm text-ink-muted">Carregando artigos...</p>
          </div>
        )}

        {/* Faixa de categorias */}
        {categories.length > 0 && (
          <div className="border-t border-b border-paper-border bg-paper-warm -mx-6 px-6 py-2 mb-8 flex items-center gap-6 overflow-x-auto scrollbar-hide">
            {categories.filter(c => c.slug !== 'uncategorized').map(cat => (
              <Link key={cat.id} href={`/categoria/${cat.slug}`}
                className="font-sans text-[0.72rem] font-semibold tracking-[0.12em] uppercase whitespace-nowrap text-ink-secondary hover:text-brand-500 transition-colors no-underline flex-shrink-0">
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* ── Grade secundária (3 colunas) ── */}
        {gridPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-t-2 border-ink border-b border-paper-border mb-8">
            {gridPosts.map((post, i) => (
              <div key={post.id} className={`py-5 ${i < gridPosts.length - 1 ? 'sm:border-r border-paper-border' : ''} ${i > 0 ? 'sm:pl-5' : ''} ${i < gridPosts.length - 1 ? 'sm:pr-5' : ''}`}>
                <GridCard post={post} gold={i === 1} />
              </div>
            ))}
          </div>
        )}

        {/* ── Layout artigos + sidebar ── */}
        <div className="section-label">
          <span className="section-label-accent">Artigos Recentes</span>
          <span className="section-label-line" />
        </div>

        <div className="grid md:grid-cols-[1fr_260px] gap-10 items-start">
          <div>
            {listPosts.map((post, i) => (
              <ArticleRowCard key={post.id} post={post} thumbColor={THUMB_COLORS[i % THUMB_COLORS.length]} />
            ))}
          </div>
          <div className="md:sticky md:top-14">
            <Sidebar trendingPosts={posts.slice(0, 5)} categories={categories} />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════ */}
      {/* SEÇÃO ALUNOS                       */}
      {/* ══════════════════════════════════ */}
      <section id="alunos" className="bg-brand-50 border-t-[3px] border-brand-500 py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="section-label mb-6">
            <span className="section-label-accent">Para Alunos</span>
            <span className="section-label-line" />
            <span className="section-label-text">Exercícios, simulados e materiais de estudo</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ALUNOS.map(a => (
              <div key={a.sigla} className="bg-white border border-[#9FE1CB] rounded-sm p-4 flex flex-col hover:border-brand-500 hover:shadow-[0_4px_16px_rgba(15,110,86,0.12)] transition-all">
                <div className="w-9 h-9 bg-brand-500 text-white font-serif font-bold text-[0.9rem] flex items-center justify-center rounded-sm mb-3">{a.sigla}</div>
                <h4 className="font-sans text-[0.88rem] font-bold text-ink mb-1.5">{a.titulo}</h4>
                <p className="font-sans text-[0.74rem] text-ink-muted leading-relaxed flex-1">{a.desc}</p>
                <div className="font-sans text-[0.65rem] text-brand-700 font-semibold mt-2 mb-3">{a.qtd}</div>
                <a href="#pfa" className="font-sans text-[0.68rem] font-bold tracking-[0.8px] uppercase py-1.5 text-center bg-brand-500 hover:bg-brand-700 text-white rounded-sm transition-colors no-underline">{a.btn}</a>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 pt-5 border-t border-[#9FE1CB]">
            <p className="font-sans text-[0.82rem] text-brand-700 font-medium text-center md:text-left">
              Precisa de reforço personalizado em matemática? Conheça o Programa de Fortalecimento da Aprendizagem.
            </p>
            <a href="#pfa" className="font-sans text-[0.78rem] font-bold tracking-[0.5px] uppercase py-2.5 px-7 bg-brand-500 hover:bg-brand-700 text-white rounded-sm transition-colors no-underline whitespace-nowrap">
              Acessar o PFA — Apoio Pedagógico
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ */}
      {/* SEÇÃO PROFESSORES                  */}
      {/* ══════════════════════════════════ */}
      <section id="professores" className="bg-paper border-t border-paper-border py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="section-label mb-6">
            <span className="section-label-accent">Para Professores</span>
            <span className="section-label-line" />
            <span className="section-label-text">Materiais e recursos pedagógicos</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROFESSORES.map(p => (
              <div key={p.sigla} className="border border-paper-border rounded-sm p-4 hover:border-brand-500 hover:shadow-[0_2px_12px_rgba(15,110,86,0.08)] transition-all cursor-pointer">
                <div className="w-9 h-9 bg-brand-50 text-brand-700 font-serif font-bold text-[0.9rem] flex items-center justify-center rounded-sm mb-3">{p.sigla}</div>
                <h4 className="font-sans text-[0.88rem] font-bold text-ink mb-1.5">{p.titulo}</h4>
                <p className="font-sans text-[0.74rem] text-ink-muted leading-relaxed">{p.desc}</p>
                <div className="font-sans text-[0.65rem] text-brand-500 font-semibold mt-2">{p.qtd}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ */}
      {/* SEÇÃO PFA                          */}
      {/* ══════════════════════════════════ */}
      <section id="pfa" className="bg-paper-bg border-t-[3px] border-gold-500 py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="font-serif text-[1.6rem] font-black text-ink mb-1">Programa de Fortalecimento da Aprendizagem</h2>
              <p className="font-sans text-[0.82rem] text-ink-muted">Materiais de reforço, simulados e orientação pedagógica para alunos com dificuldades em matemática</p>
            </div>
            <span className="hidden md:block font-sans text-[0.65rem] font-bold tracking-[1.5px] uppercase py-1.5 px-4 bg-gold-500 text-white rounded-sm whitespace-nowrap">Apoio Pedagógico</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              { titulo: 'Reforço por Série',          items: PFA_REFORCO },
              { titulo: 'ENEM & Simulados',           items: PFA_ENEM },
              { titulo: 'Acompanhamento Pedagógico',  items: PFA_ACOMP },
            ].map((col, ci) => (
              <div key={col.titulo} className={`${ci > 0 ? 'md:pl-6 md:border-l border-paper-border pt-6 md:pt-0' : ''} ${ci < 2 ? 'md:pr-6 border-b md:border-b-0 pb-6 md:pb-0' : ''}`}>
                <div className="font-sans text-[0.65rem] font-bold tracking-[2px] uppercase text-gold-700 border-b border-paper-border pb-2 mb-3">{col.titulo}</div>
                {col.items.map((m, mi) => (
                  <div key={mi} className="material-item">
                    <div>
                      <div className="font-sans text-[0.8rem] font-medium text-ink-editorial leading-snug">{m.nome}</div>
                      <div className="font-sans text-[0.65rem] text-ink-light mt-0.5">{m.serie}</div>
                    </div>
                    <a href="#" className="material-btn">{m.btn || 'Download'}</a>
                  </div>
                ))}
                <div className="mt-3 text-center">
                  <a href="#" className="font-sans text-[0.72rem] font-semibold text-gold-700 border border-gold-500 px-4 py-1.5 inline-block hover:bg-gold-500 hover:text-white transition-all no-underline rounded-sm">
                    Ver todos →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ */}
      {/* NEWSLETTER                         */}
      {/* ══════════════════════════════════ */}
      <section id="newsletter" className="bg-ink py-16">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="font-sans text-[0.65rem] font-bold tracking-[2.5px] uppercase text-brand-400 mb-3">Newsletter</div>
          <h2 className="font-serif text-[2rem] md:text-[2.4rem] font-black text-white mb-3 leading-tight">
            Educação & Empreendedorismo no seu e-mail. Toda semana.
          </h2>
          <p className="font-sans text-white/50 text-[0.9rem] mb-7 leading-relaxed">
            Artigos práticos, materiais de estudo e estratégias para alunos, professores e empreendedores.
          </p>
          <NewsletterForm dark />
          <p className="font-sans text-[0.68rem] text-white/25 mt-4 tracking-wide">Sem spam. Cancele a qualquer momento.</p>
        </div>
      </section>
    </div>
  )
}
