import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedImageUrl, getCategoryName, getCategorySlug, getCategoryColor, formatDate, readingTime, stripHtml, getAuthorName } from '@/lib/wordpress'

// Manchete principal (hero grande)
export function MancheteCard({ post }) {
  const image    = getFeaturedImageUrl(post, 'large')
  const category = getCategoryName(post)
  const catSlug  = getCategorySlug(post)
  const title    = post?.title?.rendered || ''
  const excerpt  = stripHtml(post?.excerpt?.rendered || '').slice(0, 220)
  const author   = getAuthorName(post)
  const date     = formatDate(post?.date)
  const time     = readingTime(post?.content?.rendered)
  const color    = getCategoryColor(post)

  return (
    <article className="group">
      {category && (
        <Link href={`/categoria/${catSlug}`} className={`cat-tag${color === 'gold' ? '-gold' : ''} mb-3 block`}>{category}</Link>
      )}
      <Link href={`/${post.slug}`} className="block hover:opacity-80 transition-opacity mb-3">
        <h1 className="font-serif text-[clamp(1.6rem,2.5vw,2.5rem)] font-black leading-[1.1] text-ink tracking-[-0.3px]">
          <span dangerouslySetInnerHTML={{ __html: title }} />
        </h1>
      </Link>
      {image ? (
        <Link href={`/${post.slug}`} className="block overflow-hidden mb-3">
          <div className="relative w-full aspect-[16/9] bg-paper-bg rounded-sm">
            <Image src={image} alt={stripHtml(title)} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" priority sizes="(max-width:768px) 100vw, 55vw" />
          </div>
        </Link>
      ) : (
        <div className="w-full aspect-[16/9] bg-gradient-to-br from-brand-50 to-brand-200 rounded-sm mb-3 flex items-center justify-center">
          <span className="font-sans text-[0.72rem] font-medium tracking-widest uppercase text-brand-700 opacity-50">Imagem do artigo</span>
        </div>
      )}
      <p className="font-body text-[1.02rem] font-light text-ink-secondary leading-relaxed mb-3">{excerpt}</p>
      <div className="flex items-center gap-3 text-[0.72rem] text-ink-muted font-sans border-t border-paper-border pt-3 mt-3">
        <span className="font-semibold text-ink-editorial">{author}</span>
        <span className="text-paper-border">·</span>
        <span>{date}</span>
        <span className="text-paper-border">·</span>
        <span className="bg-paper-bg px-2 py-[2px] rounded-sm text-[0.65rem]">{time} de leitura</span>
      </div>
    </article>
  )
}

// Card lateral (manchetes secundárias)
export function MancheteLatCard({ post }) {
  const category = getCategoryName(post)
  const catSlug  = getCategorySlug(post)
  const title    = post?.title?.rendered || ''
  const excerpt  = stripHtml(post?.excerpt?.rendered || '').slice(0, 100)
  const time     = readingTime(post?.content?.rendered)

  return (
    <article className="group hover-dim py-4 border-b border-paper-border last:border-0 cursor-pointer">
      {category && <Link href={`/categoria/${catSlug}`} className="cat-tag block mb-1">{category}</Link>}
      <Link href={`/${post.slug}`} className="block no-underline">
        <h3 className="font-serif text-[0.95rem] font-bold leading-snug text-ink mb-1">
          <span dangerouslySetInnerHTML={{ __html: title }} />
        </h3>
        {excerpt && <p className="text-[0.78rem] text-ink-muted leading-snug line-clamp-2">{excerpt}</p>}
        <div className="text-[0.65rem] text-ink-light mt-1.5 font-sans">{time} · Prof. M. Alvarenga</div>
      </Link>
    </article>
  )
}

// Card grade (3 colunas)
export function GridCard({ post, gold = false }) {
  const category = getCategoryName(post)
  const catSlug  = getCategorySlug(post)
  const title    = post?.title?.rendered || ''
  const excerpt  = stripHtml(post?.excerpt?.rendered || '').slice(0, 130)
  const date     = formatDate(post?.date)
  const time     = readingTime(post?.content?.rendered)

  return (
    <article className="group hover-dim cursor-pointer">
      {category && (
        <Link href={`/categoria/${catSlug}`} className={gold ? 'cat-tag-gold block mb-2' : 'cat-tag block mb-2'}>{category}</Link>
      )}
      <Link href={`/${post.slug}`} className="block no-underline">
        <h3 className="font-serif text-[0.98rem] font-bold leading-snug text-ink mb-2">
          <span dangerouslySetInnerHTML={{ __html: title }} />
        </h3>
        <p className="text-[0.78rem] text-ink-muted leading-relaxed line-clamp-3">{excerpt}</p>
        <div className="text-[0.65rem] text-ink-light mt-2 font-sans">{time} · {date}</div>
      </Link>
    </article>
  )
}

// Card horizontal (lista de artigos recentes)
export function ArticleRowCard({ post, thumbColor = 'verde' }) {
  const image    = getFeaturedImageUrl(post, 'medium')
  const category = getCategoryName(post)
  const catSlug  = getCategorySlug(post)
  const title    = post?.title?.rendered || ''
  const excerpt  = stripHtml(post?.excerpt?.rendered || '').slice(0, 120)
  const date     = formatDate(post?.date)
  const time     = readingTime(post?.content?.rendered)

  const thumbColors = {
    verde:    'from-brand-50 to-brand-200',
    laranja:  'from-amber-50 to-amber-200',
    azul:     'from-sky-50 to-sky-200',
    roxo:     'from-violet-50 to-violet-200',
    dourado:  'from-yellow-50 to-yellow-200',
  }

  return (
    <article className="group hover-dim grid grid-cols-[1fr_100px] gap-4 py-5 border-b border-paper-border last:border-0 cursor-pointer">
      <div>
        {category && <Link href={`/categoria/${catSlug}`} className="cat-tag block mb-1">{category}</Link>}
        <Link href={`/${post.slug}`} className="block no-underline">
          <h3 className="font-serif text-[1.02rem] font-bold leading-snug text-ink mb-1">
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </h3>
          <p className="text-[0.78rem] text-ink-muted leading-relaxed line-clamp-2">{excerpt}</p>
          <div className="text-[0.65rem] text-ink-light mt-1.5 font-sans">{date} · {time} · Prof. M. Alvarenga</div>
        </Link>
      </div>
      <div className={`aspect-square rounded-sm bg-gradient-to-br ${thumbColors[thumbColor] || thumbColors.verde} flex-shrink-0 overflow-hidden`}>
        {image && (
          <div className="relative w-full h-full">
            <Image src={image} alt={stripHtml(title)} fill className="object-cover" sizes="100px" />
          </div>
        )}
      </div>
    </article>
  )
}
