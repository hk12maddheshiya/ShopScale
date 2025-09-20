import prisma from '../config/prisma.js'

export async function createProduct(data) {
  return prisma.product.create({ data })
}

export async function getProductById(id) {
  return prisma.product.findUnique({ where: { id: Number(id) } })
}

export async function listProducts() {
  return prisma.product.findMany({ include: { category: true } })
}

export async function productsByCategory(categoryId) {
  return prisma.product.findMany({ where: { categoryId: Number(categoryId) } })
}
