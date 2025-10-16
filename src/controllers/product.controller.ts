import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { NewProductDto } from '../dto/new-product.dto';
import { ValidateDto } from '../middlewares/validate.middleware';

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

  //POST
  static async addNewProduct(req: Request, res: Response): Promise<void> {
    try {
      ValidateDto(NewProductDto)(req, res, async () => {
        const data = req.body;
        console.log('esto recibo: ', req.body);
        if (!data) {
          res.status(400).json({ message: 'Es necesario pasar los datos del nuevo producto' });
          return;
        }
        const result = await ProductService.createProduct(data);
        res.json(result);
      });
    } catch (error) {
      res.status(500).json({ message: 'Error interno del sistema' });
    }
  }
}
