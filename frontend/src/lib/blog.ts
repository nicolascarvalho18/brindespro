import { editorialImages } from "@/lib/editorial-images";

export type BlogPost = {
  slug: string;
  category: "Dicas" | "Personalização" | "Tendências" | "Eventos" | "Kits corporativos";
  title: string;
  excerpt: string;
  image: string;
  imageFit?: "cover" | "contain";
  content: string[];
  featured?: boolean;
};

export const blogPosts: BlogPost[] = [
  { slug: "como-escolher-o-brinde-ideal", category: "Dicas", title: "Como escolher o brinde ideal para sua empresa", excerpt: "Entenda o que considerar na hora de escolher brindes personalizados que realmente fazem sentido para o seu público.", image: editorialImages.blogGifts, featured: true, content: ["Um brinde corporativo funciona melhor quando tem utilidade no dia a dia e se conecta com a identidade da empresa.", "Comece pelo público, pelo contexto da entrega e pela mensagem que a ação quer reforçar. A equipe BRINDESPRO pode ajudar a comparar materiais, acabamentos e técnicas de personalização."] },
  { slug: "tipos-de-personalizacao", category: "Personalização", title: "Tipos de personalização e qual a melhor para o seu projeto", excerpt: "Conheça as principais técnicas de personalização e descubra qual se encaixa melhor na sua demanda.", image: editorialImages.blogPersonalization, featured: true, content: ["Cada material pede uma técnica adequada. A escolha influencia acabamento, durabilidade e leitura da marca.", "Antes de aprovar a produção, envie sua arte para que possamos avaliar a aplicação e preparar a prévia do produto."] },
  { slug: "brindes-corporativos-em-alta", category: "Tendências", title: "Brindes corporativos que estão em alta", excerpt: "Veja quais produtos têm ganhado espaço em ações de marketing, eventos e campanhas internas.", image: editorialImages.blogTrends, featured: true, content: ["Itens úteis, duráveis e fáceis de personalizar continuam entre as escolhas mais frequentes para ações corporativas.", "Mochilas, garrafas térmicas e cadernos executivos combinam presença de marca com uso recorrente."] },
  { slug: "vantagens-dos-kits-personalizados", category: "Kits corporativos", title: "Vantagens de utilizar kits personalizados na sua empresa", excerpt: "Os kits são uma opção para fortalecer a sua marca e oferecer uma experiência mais completa.", image: "/images/kit.png", imageFit: "contain", content: ["Kits reúnem itens que se complementam e dão unidade a uma ação de boas-vindas, evento ou relacionamento.", "Escolha os produtos, a quantidade e a personalização para montar um orçamento alinhado ao seu projeto."] },
  { slug: "brindes-para-eventos-corporativos", category: "Eventos", title: "Como preparar brindes para eventos corporativos", excerpt: "Planeje quantidade, prazo e personalização para que cada item esteja pronto no momento certo.", image: "/images/tumbler.png", imageFit: "contain", content: ["O planejamento começa com antecedência: quantidade, data de entrega e arte aprovada são fatores importantes.", "No simulador, você pode comparar opções de produção e reunir os itens do seu orçamento em um único pedido."] }
];

export const blogCategories = ["Todos os artigos", "Dicas", "Personalização", "Tendências", "Eventos", "Kits corporativos"] as const;
