import { OrderStatus } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { NewOrder, OrderItem } from '../types';

export class OrderService {
  static async getOrdersByUserId(userId: string) {
    return prisma.order.findMany({
      where: { userId },
      include: {
        orderDetails: {
          include: {
            product: true, // Incluye los datos del producto
          },
        },
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
        orderDetails: {
          include: {
            product: true, // Incluye los datos del producto dentro de orderDetails
          },
        },
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

  static async deleteOrder(orderId: string) {
    await prisma.orderDetails.deleteMany({
      where: { orderId },
    });

    return prisma.order.delete({
      where: { id: orderId },
    });
  }

  static async updateOrderStatus(orderId: string, status: OrderStatus) {
    return prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

  static async getAllOrders() {
    return prisma.order.findMany({
      include: {
        buyer: {
          select: {
            id: true,
            username: true,
            email: true,
            profile: {
              select: {
                fullname: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
        orderDetails: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        orderDate: 'desc',
      },
    });
  }

  static async getOrdersByStatus(status: OrderStatus) {
    return prisma.order.findMany({
      where: { status },
      include: {
        buyer: {
          select: {
            id: true,
            username: true,
            email: true,
            profile: {
              select: {
                fullname: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
        orderDetails: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        orderDate: 'desc',
      },
    });
  }
}

export default OrderService;
