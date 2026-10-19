import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuoteLine } from "./types";
type State = { items: QuoteLine[]; add: (line: QuoteLine) => void; update: (index: number, line: QuoteLine) => void; remove: (index: number) => void; clear: () => void };
export const useQuote = create<State>()(persist((set) => ({ items: [], add: line => set(state => ({ items: [...state.items, line] })), update: (index, line) => set(state => ({ items: state.items.map((item, i) => i === index ? line : item) })), remove: index => set(state => ({ items: state.items.filter((_, i) => i !== index) })), clear: () => set({ items: [] }) }), { name: "brindespro-quote" }));
