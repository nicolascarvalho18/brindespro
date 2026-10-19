"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, MessageCircle } from "@/components/icons";
import { SiteHeader } from "@/components/site-header";
function Confirmation() {
  const params = useSearchParams();
  const number = params.get("numero");
  const redirected = params.get("redirecionado") === "true";
  const [whatsappUrl, setWhatsappUrl] = useState("");
  useEffect(() => { setWhatsappUrl(sessionStorage.getItem("brindespro-whatsapp-url") || ""); }, []);
  return <><SiteHeader/><main className="container confirmation panel"><div className="check"><Check size={38}/></div><h1>Pedido recebido!</h1><p>Seu pedido foi registrado{redirected ? " e o redirecionamento para o WhatsApp foi iniciado" : ""}.</p><span>Número do pedido</span><strong>{number || "—"}</strong><p className="note">Guarde este número e o e-mail informado para acompanhar cada etapa do pedido.</p>{number&&<Link href={`/acompanhar-pedido?numero=${encodeURIComponent(number)}`} className="btn btn-blue">Acompanhar pedido</Link>}{whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-green" onClick={() => sessionStorage.removeItem("brindespro-whatsapp-url")}><MessageCircle size={16}/> Abrir WhatsApp</a>}<Link href="/" className="btn btn-outline">Voltar para o site</Link><Link href="/produtos" className="new">Novo orçamento</Link></main><style jsx>{`.confirmation{max-width:540px;margin:42px auto;padding:45px 32px;text-align:center}.check{background:#0da455;color:white;width:65px;height:65px;border-radius:50%;display:grid;place-items:center;margin:0 auto 20px;box-shadow:0 0 0 15px #e6f7ee,0 0 0 28px #f3fbf7}.confirmation h1{color:#0da455;font-size:28px;margin:40px 0 10px}.confirmation p{line-height:1.5}.confirmation span{font-size:12px;color:#667085;display:block;margin-top:18px}.confirmation strong{display:block;font-size:19px;margin:6px}.note{font-size:12px;color:#667085;margin:25px 0}.confirmation :global(.btn){min-width:180px;margin:5px}.new{display:block;color:#1264d6;font-size:12px;margin-top:14px}`}</style></>;
}
export default function Page() { return <Suspense><Confirmation/></Suspense>; }
