import { PrismaClient } from "@prisma/client"

let prisma; //Will hold the PrismaClient. Either a new one in production or globally cached one in development.

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {       //If global.prisma is undefined.
    global.prisma = new PrismaClient()    
  }
  prisma = global.prisma
}

export default prisma;

