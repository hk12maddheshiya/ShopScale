import prisma from '../config/prisma.js'

export async function createOrder(data) {
  // data should include: buyerId, products: [{ productId, quantity }], payment
  const order = await prisma.order.create({ data: { buyerId: data.buyerId, payment: data.payment } })

  const items = data.products.map(p => ({ orderId: order.id, productId: p.productId, quantity: p.quantity || 1 }))
  await prisma.orderItem.createMany({ data: items })

  return prisma.order.findUnique({ where: { id: order.id }, include: { products: true, buyer: true } })
}

export async function getOrderById(id) {
  return prisma.order.findUnique({ where: { id: Number(id) }, include: { products: { include: { product: true } }, buyer: true } })
}

export async function listOrders() {
  return prisma.order.findMany({ include: { products: { include: { product: true } }, buyer: true } })
}
