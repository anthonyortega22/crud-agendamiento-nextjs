import { PrismaClient } from "@prisma/client/extension"

// This file is used to create a single instance of the Prisma Client that can be shared across the entire application.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}