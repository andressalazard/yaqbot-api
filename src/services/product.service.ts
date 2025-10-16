import { prisma } from '../lib/prisma';
import { NewProduct } from '../types';

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

  static async createProduct(data: NewProduct) {
    const { name, description, price, stock, category, image } = data;

    const newProduct = await prisma.product.create({
      data: {
        name,
        description: description ? description : '',
        price,
        stock,
        category,
        image,
      },
    });

    return newProduct;
  }
}
