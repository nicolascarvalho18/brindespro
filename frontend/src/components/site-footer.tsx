import Link from "next/link";
import { CirclesThreePlus, EnvelopeSimple, InstagramLogo, LinkedinLogo, MapPin, Phone, ShieldCheck } from "@phosphor-icons/react";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="container site-footer-grid">
      <div>
        <div className="site-footer-brand"><CirclesThreePlus size={20} weight="bold"/> BRINDES<span>PRO</span></div>
        <p>Brindes personalizados para fortalecer a sua marca com qualidade e atendimento especializado.</p>
        <div className="site-footer-socials" aria-label="Redes sociais"><InstagramLogo size={18}/><LinkedinLogo size={18}/></div>
      </div>
      <div>
        <h2>Institucional</h2>
        <Link href="/produtos">Produtos</Link><Link href="/kits">Kits</Link><Link href="/portfolio">Portfólio</Link><Link href="/para-empresas">Para empresas</Link><Link href="/sobre">Sobre nós</Link><Link href="/blog">Blog</Link><Link href="/contato">Contato</Link>
      </div>
      <div>
        <h2>Atendimento</h2>
        <Link href="/dados"><Phone size={15}/> Solicitar orçamento</Link>
        <Link href="/contato"><EnvelopeSimple size={15}/> Enviar mensagem</Link>
        <span><MapPin size={15}/> Santos – SP</span>
      </div>
      <div>
        <h2>Pagamento e segurança</h2>
        <p className="site-footer-security"><ShieldCheck size={15}/> Dados enviados com segurança.</p>
        <div className="site-footer-payments"><span>PIX</span><span>Cartões</span></div>
      </div>
    </div>
    <div className="container site-footer-bottom"><span>© {new Date().getFullYear()} BRINDESPRO. Todos os direitos reservados.</span><span>Política de Privacidade&nbsp;&nbsp;|&nbsp;&nbsp;Termos de Uso</span></div>
    <style jsx>{`
      .site-footer{background:var(--navy);color:#e6edf8;padding:32px 0 14px}.site-footer-grid{display:grid;grid-template-columns:1.45fr .8fr 1.35fr 1fr;gap:35px}.site-footer-brand{font-size:19px;font-weight:700;display:flex;align-items:center;gap:4px;color:#fff}.site-footer-brand svg,.site-footer-brand span{color:var(--orange)}.site-footer-grid p{font-size:11px;line-height:1.5;max-width:220px;color:#d8e1ef}.site-footer-grid h2{font-size:12px;margin:4px 0 13px;color:#fff}.site-footer-grid>div:not(:first-child){display:flex;flex-direction:column;gap:8px}.site-footer-grid a,.site-footer-grid span{font-size:11px;color:#e6edf8;display:flex;align-items:center;gap:6px}.site-footer-grid a:hover{color:#fff}.site-footer-socials{display:flex;gap:13px;margin-top:16px}.site-footer-security{display:flex;align-items:center;gap:6px}.site-footer-payments{display:flex;gap:6px}.site-footer-payments span{font-size:9px;border:1px solid #5a6c8a;border-radius:3px;padding:4px 7px}.site-footer-bottom{border-top:1px solid #3a4e72;margin-top:27px;padding-top:14px;display:flex;justify-content:space-between;font-size:10px;color:#d6e0ed}@media(max-width:760px){.site-footer-grid{grid-template-columns:1fr 1fr;gap:25px}.site-footer-bottom{gap:10px;flex-direction:column}}@media(max-width:430px){.site-footer-grid{grid-template-columns:1fr}.site-footer{padding-top:28px}}
    `}</style>
  </footer>;
}
