import { PrismaClient } from "@prisma/client";

// Extend the global object to include `prisma`
declare global {
  // You can also use `let` here as it's reassignable in development
  // `PrismaClient | undefined` allows for lazy initialization in development mode
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient | undefined;
    }
  }
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // In development mode, prevent multiple instances of Prisma Client
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma; // Assign the global instance
}

export default prisma;
