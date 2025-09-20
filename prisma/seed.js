
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export { prisma }

export default prisma

export async function seed() {
	// Upsert a default category
	await prisma.category.upsert({
		where: { id: 1 },
		update: {},
		create: { name: 'Default', slug: 'default' },
	})
	console.log('Seed completed')
}

// If executed directly, run seed
if (process.argv[1] && process.argv[1].endsWith('prisma\\seed.js')) {
	seed()
		.catch((e) => {
			console.error(e)
			process.exit(1)
		})
		.finally(async () => {
			await prisma.$disconnect()
		})
}
