import { PrismaClient } from '@prisma/client';

export let prisma: PrismaClient;
export function connectDb(): void {
  prisma = new PrismaClient();
  console.log("connected on db")
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}