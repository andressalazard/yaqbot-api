import { prisma } from '../lib/prisma';

export class ProductService {
  static async getAllProducts() {
    return await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        category: true,
        image: true,
      },
    });
  }
}
