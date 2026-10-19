export type QuotePrice = { total: number };

export function sumQuoteTotals<T>(items: readonly T[], prices: Readonly<Record<number, QuotePrice>>) {
  return items.reduce((sum, _, index) => sum + (prices[index]?.total ?? 0), 0);
}
