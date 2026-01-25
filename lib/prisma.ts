import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client'

const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter,
}).$extends({
  result: {
    cart: {
      itemsPrice: {
        needs: {itemsPrice: true},
        compute(cart) {
          return cart.itemsPrice.toString()
        }
      },
      shippingPrice: {
        needs: {shippingPrice: true},
        compute(cart) {
          return cart.shippingPrice.toString()
        }
      },
      taxPrice: {
        needs: {taxPrice: true},
        compute(cart) {
          return cart.taxPrice.toString()
        }
      },
      totalPrice: {
        needs: {totalPrice: true},
        compute(cart) {
          return cart.totalPrice.toString()
        }
      },
    }
  }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma