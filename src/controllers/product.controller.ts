import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export class ProductController {
  //GET
  static async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los productos de la base de datos' });
    }
  }
}
