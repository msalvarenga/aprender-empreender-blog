import { getPosts, getCategories, getCategoryBySlug } from '@/lib/wordpress'
import { ArticleRowCard, GridCard } from '@/components/ArticleCard'
import Sidebar from '@/components/Sidebar'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 3600

export async function generateMetadata({ params }) {
  const cat = await getCategoryBySlug(params.slug)
  if (!cat) return {}
  return {
    title: `${cat.name} — Aprender & Empreender`,
    description: cat.description || `Artigos sobre ${cat.name} no portal Aprender & Empreender.`,
  }
}

export async function generateStaticParams() {
  const cats = await getCategories()
  return (cats || []).map(c => ({ slug: c.slug }))
}

const THUMB_COLORS = ['verde','laranja','roxo','azul','dourado']

export default async function CategoryPage({ params }) {
  const [cat, categories] = await Promise.all([
    getCategoryBySlug(params.slug),
    getCategories(),
  ])
  if (!cat) notFound()

  const posts = await getPosts({ perPage: 12, category: cat.id })

  return (
    <div className="bg-paper min-h-screen">
      {/* Header da categoria */}
      <div className="border-b-[3px] border-ink bg-paper-warm">
        <div className="max-w-[1200px] mx-auto px-6 py-7">
          <div className="flex items-center gap-2 font-sans text-[0.68rem] text-ink-muted mb-3">
            <Link href="/" className="hover:text-brand-500 no-underline transition-colors">Início</Link>
            <span>/</span>
            <span className="text-ink-editorial">{cat.name}</span>
          </div>
          <h1 className="font-serif text-[2rem] md:text-[2.6rem] font-black text-ink leading-tight">{cat.name}</h1>
          {cat.description && (
            <p className="font-sans text-[0.88rem] text-ink-muted mt-2 max-w-lg">{cat.description}</p>
          )}
          <div className="font-sans text-[0.68rem] text-ink-light mt-2">{cat.count} artigos</div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-10">
        {posts.length === 0 ? (
          <p className="font-sans text-sm text-ink-muted">Nenhum artigo encontrado nesta categoria.</p>
        ) : (
          <div className="grid md:grid-cols-[1fr_260px] gap-10 items-start">
            <div>
              {/* 3 primeiros em grid */}
              {posts.length >= 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-t-2 border-ink border-b border-paper-border mb-8">
                  {posts.slice(0, 3).map((post, i) => (
                    <div key={post.id} className={`py-5 ${i < 2 ? 'sm:border-r border-paper-border sm:pr-5' : ''} ${i > 0 ? 'sm:pl-5' : ''}`}>
                      <GridCard post={post} />
                    </div>
                  ))}
                </div>
              )}

              {/* Restantes em lista */}
              {posts.slice(3).map((post, i) => (
                <ArticleRowCard key={post.id} post={post} thumbColor={THUMB_COLORS[i % THUMB_COLORS.length]} />
              ))}
            </div>

            <div className="md:sticky md:top-14">
              <Sidebar trendingPosts={posts.slice(0, 5)} categories={categories} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
