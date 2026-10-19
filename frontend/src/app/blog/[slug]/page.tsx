"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageCircle } from "@/components/icons";
import { notFound, useParams } from "next/navigation";
import { blogPosts } from "@/lib/blog";
import { SiteHeader } from "@/components/site-header";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>(); const post = blogPosts.find(item => item.slug === slug); if (!post) notFound();
  const related = blogPosts.filter(item => item.slug !== post.slug).slice(0, 2);
  return <><SiteHeader/><main className="article-page"><article><Link href="/blog" className="back"><ArrowLeft size={16}/> Voltar ao blog</Link><nav><Link href="/">Home</Link><span>›</span><Link href="/blog">Blog</Link><span>›</span><strong>{post.category}</strong></nav><span className="category">{post.category}</span><h1>{post.title}</h1><p className="excerpt">{post.excerpt}</p><Image src={post.image} alt="" width={1100} height={600} priority/>{post.content.map(paragraph => <p className="content" key={paragraph}>{paragraph}</p>)}<Link className="btn btn-orange" href="/produtos">Ver produtos <ArrowRight size={15}/></Link></article><section className="related"><h2>Leia também</h2><div>{related.map(item => <Link key={item.slug} href={`/blog/${item.slug}`}><Image src={item.image} alt="" width={250} height={130}/><strong>{item.title}</strong></Link>)}</div></section><section className="contact"><div><h2>Precisa de um orçamento?</h2><p>Escolha seus produtos e envie sua solicitação para a equipe.</p></div><Link href="/dados" className="btn btn-green"><MessageCircle size={17}/> Solicitar orçamento</Link></section><style jsx>{`
  .article-page{min-height:100vh;background:var(--bg);padding-bottom:45px}.back{font-size:12px;color:#335277;display:flex;gap:5px;align-items:center;margin-bottom:17px}article{width:min(800px,calc(100% - 40px));margin:38px auto 0}article nav{display:flex;gap:8px;font-size:11px;color:#60708a;margin-bottom:20px}article nav strong,.category{color:var(--orange)}.category{font-weight:800;font-size:12px}h1{font-size:40px;letter-spacing:-1.7px;line-height:1.05;margin:10px 0 15px}.excerpt{font-size:17px;line-height:1.45;color:#3b5272;margin:0 0 23px}article :global(img){width:100%;height:min(62vw,560px);object-fit:contain;background:#fff;border-radius:12px}.date{font-size:11px;color:#7b8ba2;margin:9px 0 25px}.content{font-size:16px;line-height:1.65;color:#334b6b}.related{width:min(800px,calc(100% - 40px));margin:42px auto}.related h2{font-size:24px}.related>div{display:grid;grid-template-columns:1fr 1fr;gap:15px}.related a{background:white;padding:8px;border-radius:6px;display:flex;flex-direction:column;gap:8px;font-size:13px}.related :global(img){width:100%;height:120px;object-fit:cover;border-radius:4px}.contact{width:min(1000px,calc(100% - 40px));margin:auto;background:white;border-radius:7px;padding:20px 28px;display:flex;justify-content:space-between;align-items:center}.contact h2{font-size:20px;margin:0 0 4px}.contact p{font-size:12px;margin:0;color:#51637e}@media(max-width:650px){h1{font-size:31px}.excerpt{font-size:15px}article :global(img){height:min(74vw,320px)}.related>div{grid-template-columns:1fr}.contact{align-items:flex-start;gap:15px;flex-direction:column}}
  `}</style></main></>;
}

