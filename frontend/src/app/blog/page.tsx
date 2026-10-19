"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ChevronLeft, ChevronRight, Search } from "@/components/icons";
import { SiteHeader } from "@/components/site-header";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { blogCategories, blogPosts, type BlogPost } from "@/lib/blog";

const PAGE_SIZE = 4;

function BlogCard({ post }: { post: BlogPost }) {
  return <article className="post-card">
    <Link className={`post-image${post.imageFit === "contain" ? " post-image--contain" : ""}`} href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
      <Image src={post.image} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 32vw" />
    </Link>
    <div className="post-content">
      <span className="post-category">{post.category}</span>
      <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
      <p>{post.excerpt}</p>
      <Link className="read-more" href={`/blog/${post.slug}`}>Ler mais <ArrowRight size={16} aria-hidden="true" /></Link>
    </div>
  </article>;
}

function BlogContent() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const term = params.get("busca") || "";
  const category = params.get("categoria") || "Todos os artigos";
  const page = Math.max(1, Number(params.get("pagina") || 1));
  const filtered = useMemo(() => blogPosts.filter(post =>
    (category === "Todos os artigos" || post.category === category) &&
    `${post.title} ${post.excerpt} ${post.content.join(" ")}`.toLocaleLowerCase("pt-BR").includes(term.toLocaleLowerCase("pt-BR"))
  ), [category, term]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const actualPage = Math.min(page, totalPages);
  const visible = filtered.slice((actualPage - 1) * PAGE_SIZE, actualPage * PAGE_SIZE);
  const featured = blogPosts.filter(post => post.featured).slice(0, 3);

  function update(next: { term?: string; category?: string; page?: number }) {
    const query = new URLSearchParams(params.toString());
    if (next.term !== undefined) next.term ? query.set("busca", next.term) : query.delete("busca");
    if (next.category !== undefined) next.category === "Todos os artigos" ? query.delete("categoria") : query.set("categoria", next.category);
    const nextPage = next.page ?? (next.term !== undefined || next.category !== undefined ? 1 : actualPage);
    nextPage > 1 ? query.set("pagina", String(nextPage)) : query.delete("pagina");
    const search = query.toString();
    router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false });
  }

  return <>
    <SiteHeader />
    <main className="blog">
      <PageHero current="Blog" title="Blog" description="Conteúdos e dicas para ajudar sua empresa a escolher os melhores brindes personalizados." compact />
      <section className="shell blog-layout" aria-label="Artigos do blog">
        <div className="results-column">
          <div className="post-grid">
            {visible.map(post => <BlogCard post={post} key={post.slug} />)}
          </div>
          {!visible.length && <div className="empty-state">
            <h2>Nenhum artigo encontrado</h2>
            <p>Tente outro termo ou escolha uma categoria diferente.</p>
            <button className="reset-filters" onClick={() => update({ term: "", category: "Todos os artigos" })}>Limpar busca e filtros</button>
          </div>}
          {visible.length > 0 && <nav className="pagination" aria-label="Paginação dos artigos">
            <button type="button" disabled={actualPage === 1} onClick={() => update({ page: actualPage - 1 })}>
              <ChevronLeft size={16} aria-hidden="true" /> Anterior
            </button>
            {Array.from({ length: totalPages }, (_, index) => <button
              type="button"
              className={actualPage === index + 1 ? "current" : ""}
              aria-current={actualPage === index + 1 ? "page" : undefined}
              aria-label={`Página ${index + 1}`}
              key={index}
              onClick={() => update({ page: index + 1 })}
            >{index + 1}</button>)}
            <button type="button" disabled={actualPage === totalPages} onClick={() => update({ page: actualPage + 1 })}>
              Próxima <ChevronRight size={16} aria-hidden="true" />
            </button>
          </nav>}
        </div>

        <aside className="blog-sidebar" aria-label="Busca e navegação do blog">
          <label className="article-search">
            <span className="visually-hidden">Buscar artigos</span>
            <input aria-label="Buscar artigos" placeholder="Buscar artigos..." value={term} onChange={event => update({ term: event.target.value })} />
            <Search size={19} aria-hidden="true" />
          </label>
          <section className="side-panel">
            <h2>Categorias</h2>
            <div className="category-list">
              {blogCategories.map(item => <button
                type="button"
                className={category === item ? "selected" : ""}
                aria-pressed={category === item}
                onClick={() => update({ category: item })}
                key={item}
              >{item}</button>)}
            </div>
          </section>
          <section className="side-panel featured-panel">
            <h2>Artigos em destaque</h2>
            {featured.map(post => <Link href={`/blog/${post.slug}`} key={post.slug} className="featured-post">
              <Image src={post.image} alt="" width={72} height={72} />
              <strong>{post.title}</strong>
            </Link>)}
          </section>
        </aside>
      </section>
    </main>
    <SiteFooter />
    <style jsx>{`
      .blog{min-height:calc(100vh - 62px);background:var(--bg)}
      .shell{width:min(var(--content-max),calc(100% - (var(--page-padding) * 2)));margin:auto}
      .blog-layout{display:grid;grid-template-columns:minmax(0,3fr) minmax(245px,1fr);gap:28px;padding-top:24px;padding-bottom:36px;align-items:start}
      .results-column{min-width:0}
      .post-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;align-items:stretch}
      :global(.post-card){min-width:0;height:100%;display:flex;flex-direction:column;overflow:hidden;background:#fff;border:1px solid #e5e7eb;border-radius:10px;box-shadow:0 2px 8px #101f3d08;transition:box-shadow .18s ease,transform .18s ease}
      :global(.post-card:hover){transform:translateY(-2px);box-shadow:0 6px 16px #101f3d12}
      :global(.post-image){position:relative;display:block;width:100%;height:clamp(190px,17.5vw,220px);aspect-ratio:16/10;overflow:hidden;background:#f1f3f6}
      :global(.post-image img){object-fit:cover;object-position:center;transition:transform .2s ease}
      :global(.post-image--contain img){object-fit:contain;padding:12px}
      :global(.post-card:hover .post-image img){transform:scale(1.02)}
      :global(.post-content){display:flex;flex:1;flex-direction:column;align-items:flex-start;padding:14px 16px 16px}
      :global(.post-category){display:inline-flex;align-items:center;min-height:23px;padding:3px 9px;border-radius:4px;background:#f1f3f6;color:#425674;font-size:12px;font-weight:600}
      :global(.post-card h2){font-size:18px;line-height:1.3;letter-spacing:-.3px;font-weight:600;margin:10px 0 7px;color:var(--navy)}
      :global(.post-card h2 a:focus-visible),:global(.read-more:focus-visible),:global(.featured-post:focus-visible),.category-list button:focus-visible,.pagination button:focus-visible,.reset-filters:focus-visible,.article-search input:focus-visible{outline:3px solid #ff5a1f55;outline-offset:2px}
      :global(.post-content p){font-size:14px;line-height:1.6;color:#64748b;margin:0 0 16px;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden}
      :global(.read-more){margin-top:auto;display:inline-flex;gap:6px;align-items:center;color:var(--orange);font-size:14px;font-weight:600}
      :global(.read-more:hover){color:#d94312}
      .blog-sidebar{display:flex;flex-direction:column;gap:16px;min-width:0}
      .article-search{min-height:54px;background:#fff;border:1px solid #e5e7eb;border-radius:9px;padding:8px 12px;display:flex;align-items:center;gap:10px;color:var(--navy)}
      .article-search input{width:100%;min-width:0;border:0;border-radius:6px;background:#f7f8fa;padding:10px 12px;color:var(--navy);font:inherit;font-size:14px;outline:none}
      .article-search input::placeholder{color:#94a3b8}
      .side-panel{background:#fff;padding:18px;border:1px solid #e5e7eb;border-radius:10px}
      .side-panel h2{font-size:17px;line-height:1.3;font-weight:600;margin:0 0 12px;color:var(--navy)}
      .category-list{display:flex;flex-direction:column;gap:3px}
      .category-list button{min-height:38px;width:100%;padding:8px 12px;text-align:left;border:0;border-radius:5px;background:transparent;color:#475569;font:inherit;font-size:14px;cursor:pointer}
      .category-list button:hover{background:#f7f8fa}
      .category-list button.selected{background:#f1f3f6;border-left:3px solid var(--orange);padding-left:9px;color:var(--navy);font-weight:600}
      .featured-post{display:grid;grid-template-columns:72px minmax(0,1fr);gap:12px;align-items:center;padding:12px 0;border-top:1px solid #edf0f4;color:var(--navy)}
      .featured-post :global(img){width:72px;height:72px;object-fit:cover;object-position:center;border-radius:6px;background:#f1f3f6}
      .featured-post strong{font-size:13px;font-weight:600;line-height:1.4}
      .featured-post:hover strong{color:var(--orange)}
      .pagination{display:flex;justify-content:center;align-items:center;gap:8px;padding-top:20px;flex-wrap:wrap}
      .pagination button,.reset-filters{min-height:38px;padding:0 12px;display:inline-flex;align-items:center;justify-content:center;gap:5px;background:#fff;border:1px solid #d5dce5;border-radius:6px;color:var(--navy);font:inherit;font-size:13px;cursor:pointer}
      .pagination button:hover:not(:disabled),.reset-filters:hover{border-color:var(--orange);color:var(--orange)}
      .pagination button.current{background:var(--orange);border-color:var(--orange);color:#fff}
      .pagination button:disabled{opacity:.48;cursor:not-allowed}
      .empty-state{padding:34px 24px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;text-align:center}
      .empty-state h2{font-size:20px;margin:0 0 6px}
      .empty-state p{font-size:14px;line-height:1.6;color:#64748b;margin:0 0 16px}
      .visually-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
      @media(max-width:1000px){.blog-layout{grid-template-columns:1fr}.blog-sidebar{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));align-items:start}.article-search{grid-column:1/-1}.featured-panel{grid-column:1/-1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));column-gap:16px}.featured-panel h2{grid-column:1/-1}.featured-post{grid-template-columns:64px minmax(0,1fr);gap:10px}.featured-post :global(img){width:64px;height:64px}}
      @media(max-width:600px){.blog-layout{padding-top:16px;padding-bottom:24px;gap:20px}.post-grid{grid-template-columns:1fr;gap:16px}:global(.post-image){height:210px;aspect-ratio:16/10}:global(.post-content){padding:14px 15px 16px}:global(.post-card h2){font-size:18px}.blog-sidebar{display:flex}.featured-panel{display:block}.featured-post{grid-template-columns:72px minmax(0,1fr)}.featured-post :global(img){width:72px;height:72px}.pagination{gap:6px}.pagination button{min-height:36px;padding:0 9px}.empty-state{padding:28px 18px}}
    `}</style>
  </>;
}

export default function BlogPage() {
  return <Suspense fallback={<div className="empty-state">Carregando artigos...</div>}><BlogContent /></Suspense>;
}
