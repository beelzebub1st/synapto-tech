import postgresImport from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const postgres =
  typeof postgresImport === "function"
    ? postgresImport
    : ((postgresImport as { default: typeof postgresImport }).default ??
      postgresImport);

type SqlClient = ReturnType<typeof postgres>;
type Db = ReturnType<typeof drizzle<typeof schema>>;

declare global {
  // eslint-disable-next-line no-var
  var __synapto_sql: SqlClient | undefined;
  // eslint-disable-next-line no-var
  var __synapto_db: Db | undefined;
}

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not configured. Start Docker Postgres or set a Neon URL."
    );
  }

  if (!globalThis.__synapto_sql) {
    globalThis.__synapto_sql = postgres(url, {
      max: 10,
      prepare: false,
    });
  }

  if (!globalThis.__synapto_db) {
    globalThis.__synapto_db = drizzle(globalThis.__synapto_sql, { schema });
  }

  return globalThis.__synapto_db;
}

export type Database = ReturnType<typeof getDb>;

export async function closeDb() {
  if (globalThis.__synapto_sql) {
    await globalThis.__synapto_sql.end({ timeout: 5 });
    globalThis.__synapto_sql = undefined;
    globalThis.__synapto_db = undefined;
  }
}
