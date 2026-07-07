import { testDb } from "./db";
import { TEST_EMAIL_DOMAIN } from "./env";

export async function cleanupTestData() {
  const testUsers = await testDb.user.findMany({
    where: { email: { endsWith: `@${TEST_EMAIL_DOMAIN}` } },
    select: { id: true },
  });
  const userIds = testUsers.map((user) => user.id);

  await testDb.order.deleteMany({
    where: {
      OR: [
        { customerEmail: { endsWith: `@${TEST_EMAIL_DOMAIN}` } },
        ...(userIds.length > 0 ? [{ userId: { in: userIds } }] : []),
      ],
    },
  });

  await testDb.user.deleteMany({
    where: { email: { endsWith: `@${TEST_EMAIL_DOMAIN}` } },
  });
}
