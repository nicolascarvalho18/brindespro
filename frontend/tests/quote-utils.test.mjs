import test from "node:test";
import assert from "node:assert/strict";
import { sumQuoteTotals } from "../src/lib/quote-utils.ts";

test("empty quote has a zero total even when old prices remain in state", () => {
  assert.equal(sumQuoteTotals([], { 0: { total: 1890 } }), 0);
});

test("quote total sums current items and ignores stale indexes", () => {
  const items = [{ id: "bottle" }, { id: "mug" }];
  const prices = { 0: { total: 1890 }, 1: { total: 740 }, 2: { total: 9999 } };

  assert.equal(sumQuoteTotals(items, prices), 2630);
});

test("an item without a calculated price contributes zero", () => {
  assert.equal(sumQuoteTotals([{ id: "bottle" }], {}), 0);
});
