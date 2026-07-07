import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { loadEnv } from "./env";

loadEnv();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

export const testDb = new PrismaClient({ adapter });

export async function disconnectTestDb() {
  await testDb.$disconnect();
  await pool.end();
}
