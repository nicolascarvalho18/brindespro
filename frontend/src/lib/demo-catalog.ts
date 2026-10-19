import type { Category, Product } from "./types";

export const demoCategories: Category[] = [
  [1, "Garrafas", "garrafas"], [2, "Canecas", "canecas"], [3, "Copos", "copos"],
  [4, "Canetas", "canetas"], [5, "Cadernos", "cadernos"], [6, "Mochilas", "mochilas"], [7, "Kits", "kits"],
].map(([id, name, slug]) => ({ id: Number(id), name: String(name), slug: String(slug) }));

const imageByCategory: Record<string, string> = {
  garrafas: "/images/products/bottle.webp", canecas: "/images/products/mug.webp", copos: "/images/products/tumbler.webp",
  canetas: "/images/products/pens.webp", cadernos: "/images/products/notebook.webp", mochilas: "/images/products/backpack.webp", kits: "/images/products/kit.webp",
};

const productInfo = [
  ["Garrafa Térmica Inox 500ml", "garrafa-termica-inox-500ml", "garrafas", 18.9, "Inox"],
  ["Caneca Cerâmica 325ml", "caneca-ceramica-325ml", "canecas", 12.9, "Cerâmica"],
  ["Copo Térmico 450ml", "copo-termico-450ml", "copos", 24.9, "Inox"],
  ["Caneta Metal", "caneta-metal", "canetas", 4.5, "Metal"],
  ["Caderno Executivo A5", "caderno-executivo-a5", "cadernos", 15.9, "Papel"],
  ["Mochila Corporativa", "mochila-corporativa", "mochilas", 89.9, "Poliéster"],
  ["Kit Boas-vindas", "kit-boas-vindas", "kits", 119.9, "Misto"],
] as const;

export const demoProducts: Product[] = productInfo.map(([name, slug, categorySlug, price, material], index) => {
  const category = demoCategories.find(item => item.slug === categorySlug)!;
  const imageUrl = imageByCategory[categorySlug];
  return {
    id: index + 1, name, slug, description: `${name} personalizado para empresas, eventos e campanhas.`, category, imageUrl,
    active: true, minQuantity: 10, engravingOptions: ["Laser", "Silk-screen", "UV"],
    variants: [{ id: index + 1, color: "Preto", hex: "#171717", imageUrl, material }],
    tiers: [{ id: index + 1, minQuantity: 10, maxQuantity: 99, unitPrice: price }, { id: index + 20, minQuantity: 100, maxQuantity: null, unitPrice: Number((price * .9).toFixed(2)) }],
    images: [{ id: index + 1, variantId: null, imageUrl, altText: name }],
  };
});

export function demoProductPage(query = "") {
  const params = new URLSearchParams(query.startsWith("?") ? query.slice(1) : query);
  const category = params.get("category");
  const term = params.get("q")?.toLowerCase();
  let content = demoProducts.filter(product => (!category || product.category.slug === category) && (!term || product.name.toLowerCase().includes(term)));
  const sort = params.get("sort");
  if (sort === "price-asc") content = [...content].sort((a, b) => a.tiers[0].unitPrice - b.tiers[0].unitPrice);
  if (sort === "price-desc") content = [...content].sort((a, b) => b.tiers[0].unitPrice - a.tiers[0].unitPrice);
  return { content, totalPages: 1, totalElements: content.length };
}
