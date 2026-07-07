import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getSafeRedirectPath } from "../lib/redirect";
import { vpsPlansById } from "../lib/plans";

describe("WebAiry checkout & auth validation", () => {
  it("sanitizes redirect paths", () => {
    assert.equal(getSafeRedirectPath("/checkout"), "/checkout");
    assert.equal(getSafeRedirectPath("/orders"), "/orders");
    assert.equal(getSafeRedirectPath("//evil.com"), "/");
    assert.equal(getSafeRedirectPath("https://evil.com"), "/");
    assert.equal(getSafeRedirectPath(null), "/");
    assert.equal(getSafeRedirectPath(undefined, "/login"), "/login");
  });

  it("computes checkout totals for all VPS plans", () => {
    for (const plan of Object.values(vpsPlansById)) {
      const total = Number((plan.price * 1.08).toFixed(2));
      assert.ok(total > plan.price);
      assert.ok(total < plan.price * 1.09);
    }
  });

  it("rejects invalid plan ids", () => {
    assert.equal(vpsPlansById["not-a-plan"], undefined);
  });
});
