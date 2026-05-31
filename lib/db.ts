import { PrismaClient } from "./generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from "path";

function createPrisma() {
  const remoteUrl = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  let url: string;
  if (remoteUrl) {
    // Productie: Turso hosted database
    url = remoteUrl;
  } else {
    // Lokaal: SQLite bestand
    const dbPath = path.resolve(process.cwd(), "prisma/dev.db");
    url = "file:///" + dbPath.split("\\").join("/");
  }

  const adapter = new PrismaLibSql({ url, authToken });
  return new PrismaClient({ adapter } as never);
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma ?? createPrisma();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
