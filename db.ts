import { PrismaClient } from "@prisma/client";
import "dotenv/config";

export const db = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "warn", "error"]
      : ["error"],
});
