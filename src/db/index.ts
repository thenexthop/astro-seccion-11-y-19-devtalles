import { PrismaClient } from '../../generated/prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import 'dotenv/config'

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
export const prisma = new PrismaClient({ adapter })

try {
    await prisma.$connect()
    console.log(await prisma.client.findMany())
    console.log(await prisma.post.findMany())
} catch (error) {
    console.log(error)
}