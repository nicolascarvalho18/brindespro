import type { Metadata } from "next";
import "./globals.css";
import "./design-system.css";
import "./typography.css";
import "@fontsource-variable/manrope";
import { Providers } from "@/components/providers";
export const metadata: Metadata = { title: "BRINDESPRO | Brindes personalizados", description: "Brindes que fortalecem sua marca" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body><Providers>{children}</Providers></body></html>; }
