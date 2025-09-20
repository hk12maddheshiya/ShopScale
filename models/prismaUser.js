import prisma from '../config/prisma.js'

export async function createUser(data) {
  return prisma.user.create({ data })
}

export async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } })
}

export async function getUserById(id) {
  return prisma.user.findUnique({ where: { id: Number(id) } })
}

export async function listUsers() {
  return prisma.user.findMany()
}
