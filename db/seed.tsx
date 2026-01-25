import 'dotenv/config';
import { PrismaClient } from '@/lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { products, users } from './data';


const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

export const prisma = new PrismaClient({ adapter });

export async function main() {
    await prisma.products.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.user.deleteMany();

    await prisma.products.createMany({
        data: products,
    })
    await prisma.user.createMany({
        data: users
    })

    console.log("[+] Database seeded successfully...")
}

main();