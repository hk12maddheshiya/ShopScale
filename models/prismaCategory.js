import prisma from '../config/prisma.js'

export async function createCategory(data) {
  return prisma.category.create({ data })
}

export async function listCategories() {
  return prisma.category.findMany()
}

export async function getCategoryById(id) {
  return prisma.category.findUnique({ where: { id: Number(id) } })
}
