import { getPost, getPosts, getFeaturedImageUrl, getCategoryName, getCategorySlug, getAuthorName, formatDate, readingTime } from '@/lib/wordpress'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  if (!post) return {}
  return {
    title: post.title?.rendered?.replace(/<[^>]+>/g, '') || '',
    description: post.excerpt?.rendered?.replace(/<[^>]+>/g, '').slice(0, 160) || '',
  }
}

export async function generateStaticParams() {
  const posts = await getPosts({ perPage: 50 })
  return (posts || []).map(p => ({ slug: p.slug }))
}

export default async function ArticlePage({ params }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const image    = getFeaturedImageUrl(post, 'full')
  const category = getCategoryName(post)
  const catSlug  = getCategorySlug(post)
  const author   = getAuthorName(post)
  const date     = formatDate(post.date)
  const time     = readingTime(post?.content?.rendered)
  const title    = post.title?.rendered || ''

  return (
    <div className="bg-paper min-h-screen">
      {/* Progress bar placeholder */}
      <div id="reading-progress" style={{ width: '0%' }} />

      <article className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="max-w-[720px] mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-sans text-[0.68rem] text-ink-muted mb-6">
            <Link href="/" className="hover:text-brand-500 transition-colors no-underline">Início</Link>
            <span className="text-paper-border">/</span>
            {category && (
              <>
                <Link href={`/categoria/${catSlug}`} className="hover:text-brand-500 transition-colors no-underline">{category}</Link>
                <span className="text-paper-border">/</span>
              </>
            )}
            <span className="truncate text-ink-editorial" dangerouslySetInnerHTML={{ __html: title }} />
          </div>

          {/* Category */}
          {category && (
            <Link href={`/categoria/${catSlug}`} className="cat-tag block mb-4">{category}</Link>
          )}

          {/* Title */}
          <h1 className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] font-black leading-[1.1] text-ink tracking-[-0.5px] mb-5">
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 font-sans text-[0.72rem] text-ink-muted border-y border-paper-border py-3 mb-7">
            <span className="font-semibold text-ink-editorial">{author}</span>
            <span className="text-paper-border">·</span>
            <span>{date}</span>
            <span className="text-paper-border">·</span>
            <span className="bg-paper-bg px-2 py-[2px] rounded-sm text-[0.65rem]">{time} de leitura</span>
          </div>

          {/* Featured image */}
          {image && (
            <div className="relative w-full aspect-[16/9] mb-8 rounded-sm overflow-hidden">
              <Image src={image} alt={title.replace(/<[^>]+>/g, '')} fill className="object-cover" priority sizes="(max-width:768px) 100vw, 720px" />
            </div>
          )}

          {/* Body */}
          <div className="article-body"
            dangerouslySetInnerHTML={{ __html: post.content?.rendered || '' }} />

          {/* Footer do artigo */}
          <div className="mt-12 pt-6 border-t border-paper-border">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-sans text-[0.68rem] font-bold tracking-[1.5px] uppercase text-ink-muted mb-0.5">Escrito por</div>
                <div className="font-sans text-sm font-semibold text-ink-editorial">{author}</div>
              </div>
              {category && (
                <Link href={`/categoria/${catSlug}`} className="font-sans text-[0.72rem] font-bold tracking-[0.1em] uppercase px-4 py-2 border border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white transition-all no-underline rounded-sm">
                  Mais sobre {category}
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
