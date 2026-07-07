import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import bcrypt from "bcryptjs";
import { testDb, disconnectTestDb } from "./helpers/db";
import { cleanupTestData } from "./helpers/cleanup";
import { testEmail } from "./helpers/env";
import { linkGuestOrdersToUser } from "../lib/orders";
import { vpsPlansById } from "../lib/plans";

describe("WebAiry database integration", () => {
  before(async () => {
    await cleanupTestData();
  });

  after(async () => {
    await cleanupTestData();
    await disconnectTestDb();
  });

  it("connects to PostgreSQL and reads schema", async () => {
    const result = await testDb.$queryRaw<{ ok: number }[]>`SELECT 1 as ok`;
    assert.equal(result[0]?.ok, 1);

    const tables = await testDb.$queryRaw<{ tablename: string }[]>`
      SELECT tablename FROM pg_tables
      WHERE schemaname = 'public' AND tablename IN ('User', 'Order')
    `;
    const names = tables.map((t) => t.tablename).sort();
    assert.deepEqual(names, ["Order", "User"]);
  });

  it("creates a user with hashed password", async () => {
    const email = testEmail("signup");
    const passwordHash = await bcrypt.hash("testpass123", 10);

    const user = await testDb.user.create({
      data: {
        email,
        name: "E2E Tester",
        passwordHash,
      },
    });

    assert.ok(user.id);
    assert.equal(user.email, email);

    const stored = await testDb.user.findUnique({ where: { email } });
    assert.ok(stored);
    assert.equal(await bcrypt.compare("testpass123", stored!.passwordHash), true);
    assert.equal(await bcrypt.compare("wrongpass", stored!.passwordHash), false);
  });

  it("rejects duplicate user emails", async () => {
    const email = testEmail("duplicate");
    const passwordHash = await bcrypt.hash("testpass123", 10);

    await testDb.user.create({
      data: { email, passwordHash },
    });

    await assert.rejects(
      () =>
        testDb.user.create({
          data: { email, passwordHash },
        }),
      (err: { code?: string }) => {
        assert.equal(err.code, "P2002");
        return true;
      }
    );
  });

  it("creates a guest order with customerEmail and PROCESSING status", async () => {
    const email = testEmail("guest-order");
    const plan = vpsPlansById["vps-8gb"];
    const total = Number((plan.price * 1.08).toFixed(2));

    const order = await testDb.order.create({
      data: {
        customerEmail: email,
        totalAmount: total,
        shippingAddress: "Jane Doe, 1 Test Lane, London, SW1A 1AA",
        status: "PROCESSING",
        items: [
          {
            productId: plan.id,
            name: plan.name,
            price: plan.price,
            quantity: 1,
          },
        ],
      },
    });

    assert.ok(order.id);
    assert.equal(order.userId, null);
    assert.equal(order.customerEmail, email);
    assert.equal(order.status, "PROCESSING");
    assert.equal(order.totalAmount, total);

    const items = order.items as Array<{ productId: string; name: string }>;
    assert.equal(items[0]?.productId, "vps-8gb");
    assert.equal(items[0]?.name, "Windows 8GB VPS");
  });

  it("links guest orders to a user on registration", async () => {
    const email = testEmail("link-orders");
    const plan = vpsPlansById["vps-4gb"];
    const total = Number((plan.price * 1.08).toFixed(2));

    await testDb.order.create({
      data: {
        customerEmail: email,
        totalAmount: total,
        shippingAddress: "Guest User, 2 Test Road, New York, 10001",
        status: "PROCESSING",
        items: [{ productId: plan.id, name: plan.name, price: plan.price, quantity: 1 }],
      },
    });

    const user = await testDb.user.create({
      data: {
        email,
        passwordHash: await bcrypt.hash("testpass123", 10),
        name: "Linked User",
      },
    });

    await linkGuestOrdersToUser(user.id, email);

    const orders = await testDb.order.findMany({
      where: { userId: user.id },
    });

    assert.equal(orders.length, 1);
    assert.equal(orders[0]?.customerEmail, email);
    assert.equal(orders[0]?.userId, user.id);
  });

  it("returns orders for a logged-in user", async () => {
    const email = testEmail("user-orders");
    const passwordHash = await bcrypt.hash("testpass123", 10);
    const plan = vpsPlansById["vps-16gb"];
    const total = Number((plan.price * 1.08).toFixed(2));

    const user = await testDb.user.create({
      data: { email, passwordHash, name: "Order Owner" },
    });

    await testDb.order.create({
      data: {
        userId: user.id,
        customerEmail: email,
        totalAmount: total,
        shippingAddress: "Order Owner, 3 VPS Street, Hayes, UB3 4FW",
        status: "PROCESSING",
        items: [{ productId: plan.id, name: plan.name, price: plan.price, quantity: 1 }],
      },
    });

    const userOrders = await testDb.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    assert.equal(userOrders.length, 1);
    assert.equal(userOrders[0]?.totalAmount, total);
  });

  it("validates VPS plan pricing used at checkout", () => {
    assert.equal(Number((vpsPlansById["vps-4gb"].price * 1.08).toFixed(2)), 10.8);
    assert.equal(Number((vpsPlansById["vps-8gb"].price * 1.08).toFixed(2)), 21.6);
    assert.equal(Number((vpsPlansById["vps-16gb"].price * 1.08).toFixed(2)), 32.4);
    assert.equal(Number((vpsPlansById["vps-32gb"].price * 1.08).toFixed(2)), 48.6);
    assert.equal(vpsPlansById["invalid-plan"], undefined);
  });
});
