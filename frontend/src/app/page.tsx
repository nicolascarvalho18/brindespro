"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Headphones,
  MessageCircle,
  PackageOpen,
  Palette,
  ShieldCheck,
  Tag,
  Truck,
  type LucideIcon,
} from "@/components/icons";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { QueryState } from "@/components/query-state";
import { catalog } from "@/lib/api";
import { blogPosts } from "@/lib/blog";
import { editorialImages } from "@/lib/editorial-images";
import { productImage } from "@/lib/product-image";
import type { Product } from "@/lib/types";
import "./home.css";

const categoryImages: Record<string, string> = {
  garrafas: "/images/categories/garrafas.webp",
  canecas: "/images/categories/canecas.webp",
  copos: "/images/categories/copos.webp",
  canetas: "/images/categories/canetas.webp",
  cadernos: "/images/categories/cadernos.webp",
  mochilas: "/images/categories/mochilas.webp",
  kits: "/images/categories/kits.webp",
};

const benefits: [LucideIcon, string, string][] = [
  [Truck, "Orçamento rápido", "pelo WhatsApp"],
  [Tag, "Personalização", "com a sua logo"],
  [PackageOpen, "Diversos produtos", "e kits personalizados"],
  [Headphones, "Atendimento", "especializado"],
];

const differentiators: [LucideIcon, string][] = [
  [ShieldCheck, "Produtos selecionados"],
  [Palette, "Personalização cuidadosa"],
  [Headphones, "Atendimento próximo"],
];

const kits = [
  ["Kit Boas-vindas", "Garrafa, caderno e caneta", "/images/products/kit.webp"],
  ["Kit Executivo", "Mochila, garrafa e caderno", "/images/products/backpack.webp"],
  ["Kit Escritório", "Caneca, caderno e caneta", "/images/products/kit.webp"],
];

function ProductHighlight({ product }: { product: Product }) {
  return <article className="product-highlight">
    <Link href={`/produto/${product.slug}`} className="highlight-image">
      <Image src={productImage(product.imageUrl)} alt={product.name} width={350} height={320} sizes="(max-width: 600px) 50vw, (max-width: 900px) 45vw, 25vw" />
    </Link>
    <Link href={`/produto/${product.slug}`} className="highlight-name">{product.name}</Link>
    <div className="swatches" aria-label={`Cores disponíveis para ${product.name}`}>
      {product.variants.slice(0, 4).map(variant => <span key={variant.id} title={variant.color} style={{ background: variant.hex }} />)}
    </div>
    <Link href={`/produto/${product.slug}`} className="btn btn-orange">Personalizar</Link>
  </article>;
}

export default function Home() {
  const categories = useQuery({ queryKey: ["categories"], queryFn: catalog.categories });
  const products = useQuery({ queryKey: ["home-products"], queryFn: () => catalog.products("?size=50&sort=name") });
  const featuredProducts = ["garrafas", "canecas", "cadernos", "mochilas"]
    .map(category => products.data?.content.find(product => product.category.slug === category))
    .filter((product): product is Product => Boolean(product));
  const featuredStories = blogPosts.filter(post => post.featured).slice(0, 3);

  return <>
    <SiteHeader />
    <main className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-shell hero-layout">
          <div className="hero-content">
            <h1 id="home-title">Brindes<br />que valorizam<br />a sua marca</h1>
            <p>Personalize produtos de alta qualidade<br />para sua empresa, eventos e campanhas.</p>
            <Link href="/produtos" className="btn btn-orange">Ver produtos <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="hero-media">
          <Image src={editorialImages.homeHero} alt="Garrafa térmica, caneca, caderno, caneta e copo em uma mesa de escritório" fill priority sizes="(max-width: 800px) 100vw, (max-width: 1440px) 62vw, 1040px" />
        </div>
      </section>

      <section className="benefit-band" aria-label="Vantagens da BRINDESPRO">
        <div className="home-shell benefits">
          {benefits.map(([Icon, title, description]) => <div className="benefit" key={title}>
            <Icon size={27} aria-hidden="true" />
            <p><strong>{title}</strong><span>{description}</span></p>
          </div>)}
        </div>
      </section>

      <section className="home-shell section-space">
        <div className="section-heading"><h2>Categorias</h2><Link href="/produtos">Ver todas as categorias <ArrowRight size={15} aria-hidden="true" /></Link></div>
        <QueryState loading={categories.isLoading} error={categories.error}>
          <div className="category-row">
            {categories.data?.filter(category => categoryImages[category.slug]).map(category => <Link key={category.id} href={`/produtos?categoria=${category.slug}`} className={`category-card category-card--${category.slug}`}>
              <span className="category-card__media"><Image src={categoryImages[category.slug]} alt={category.name} width={180} height={160} sizes="(max-width: 480px) 44vw, (max-width: 800px) 24vw, 15vw" /></span>
              <strong>{category.name}</strong>
            </Link>)}
          </div>
        </QueryState>
      </section>

      <section className="home-shell section-space products-section">
        <div className="section-heading"><h2>Produtos em destaque</h2><Link href="/produtos">Ver todos os produtos <ArrowRight size={15} aria-hidden="true" /></Link></div>
        <QueryState loading={products.isLoading} error={products.error}>
          <div className="highlight-grid">{featuredProducts.map(product => <ProductHighlight key={product.id} product={product} />)}</div>
        </QueryState>
      </section>

      <section className="home-shell section-space">
        <div className="section-heading"><h2>Projetos em destaque</h2><Link href="/portfolio">Ver portfólio <ArrowRight size={15} aria-hidden="true" /></Link></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:16}} className="portfolio-home-grid">
          {[['Kit de boas-vindas','Equipes','/images/products/kit.webp'],['Campanha de relacionamento','Tecnologia','/images/products/bottle-blue.webp'],['Convenção comercial','Eventos','/images/products/tumbler.webp']].map(([name,segment,image]) => <Link href="/portfolio" key={name} className="panel" style={{overflow:"hidden"}}><div style={{height:180,position:"relative",background:"#f5f7fa"}}><Image src={image} alt={name} fill sizes="(max-width:800px) 100vw, 33vw" style={{objectFit:"contain",padding:14}}/></div><div style={{padding:14}}><small style={{color:"var(--orange)",fontWeight:800}}>{segment}</small><h3 style={{margin:"5px 0",fontSize:16}}>{name}</h3><p className="muted small" style={{margin:0}}>Projeto demonstrativo com acabamento profissional.</p></div></Link>)}
        </div>
      </section>

      <section className="home-shell corporate-banner" aria-labelledby="corporate-title">
        <div className="corporate-image">
          <Image src={editorialImages.corporateTumbler} alt="Copo térmico azul-marinho completo sobre uma mesa em escritório" fill sizes="(max-width: 700px) 100vw, 50vw" />
        </div>
        <div className="corporate-copy">
          <span className="eyebrow">PRODUTOS CORPORATIVOS</span>
          <h2 id="corporate-title">Soluções personalizadas<br />para a sua empresa</h2>
          <p>Atendemos empresas de todos os portes com produtos personalizados para eventos, campanhas, kits de boas-vindas e muito mais.</p>
          <ul className="corporate-perks">
            {differentiators.map(([Icon, label]) => <li key={label}><Icon size={18} aria-hidden="true" />{label}</li>)}
          </ul>
          <Link href="/kits" className="btn btn-orange">Conheça nossos kits <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="home-shell section-space" id="kits">
        <div className="section-heading"><h2>Nossos kits</h2><Link href="/kits">Ver todos os kits <ArrowRight size={15} aria-hidden="true" /></Link></div>
        <div className="kit-grid">{kits.map(([name, description, image]) => <article className="kit-card" key={name}>
          <Image src={image} alt={name} width={500} height={270} sizes="(max-width: 800px) 100vw, 33vw" />
          <h3>{name}</h3><p>{description}</p><Link href="/kits" className="btn btn-orange">Solicite orçamento</Link>
        </article>)}</div>
      </section>

      <section className="home-shell section-space" id="blog">
        <div className="section-heading"><h2>Conteúdos e dicas</h2><Link href="/blog">Ver todos os artigos <ArrowRight size={15} aria-hidden="true" /></Link></div>
        <div className="story-grid">{featuredStories.map(post => <Link href={`/blog/${post.slug}`} className="story-card" key={post.slug}>
          <span className="story-media"><Image src={post.image} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" /></span>
          <span className="story-body"><span className="story-category">{post.category}</span><h3>{post.title}</h3><p>{post.excerpt}</p><span className="story-read">Ler artigo <ArrowRight size={15} aria-hidden="true" /></span></span>
        </Link>)}</div>
      </section>

      <section className="home-shell contact-callout" id="contato">
        <div><h2>Fale com a BRINDESPRO</h2><p>Solicite seu orçamento pelo WhatsApp e receba um atendimento rápido.</p></div>
        <Link href="/dados" className="btn btn-green"><MessageCircle size={18} aria-hidden="true" /> Solicitar orçamento</Link>
      </section>
      <style jsx>{`@media(max-width:800px){.portfolio-home-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}}@media(max-width:480px){.portfolio-home-grid{grid-template-columns:1fr!important}}`}</style>
    </main>
    <SiteFooter />
  </>;
}
