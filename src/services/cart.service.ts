import { prisma } from '../lib/prisma';

export class CartService {
  async createCart(userId: string, items: { productId: string }[]) {
    return await prisma.shoppingCart.create({
      data: {
        userId,
        shoppingItems: {
          create: items.map((item) => ({
            productId: item.productId,
          })),
        },
      },
      include: {
        shoppingItems: true,
      },
    });
  }
}
