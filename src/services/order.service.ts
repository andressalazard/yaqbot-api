import { prisma } from '../lib/prisma';
import { NewOrder, OrderItem } from '../types';

export class OrderService {
  static async getOrdersByUserId(userId: string) {
    return prisma.order.findMany({
      where: { userId },
      include: {
        orderDetails: true,
      },
      orderBy: {
        orderDate: 'desc',
      },
    });
  }

  static async getOrderById(orderId: string) {
    return prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderDetails: true,
      },
    });
  }

  static async createOrder(userId: string, items: OrderItem[]) {
    return prisma.order.create({
      data: {
        userId,
        orderDate: new Date(),
        status: 'PLACED' as const,
        orderDetails: {
          create: items.map((item) => ({
            productId: item.productId,
            units: item.units,
            unitPrice: item.unitPrice,
          })),
        },
        total: items.reduce((sum, item) => sum + item.units * item.unitPrice, 0),
      },
      include: {
        orderDetails: true,
      },
    });
  }
}

export default OrderService;
