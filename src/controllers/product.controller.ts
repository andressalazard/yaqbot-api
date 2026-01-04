import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { NewProductDto } from '../dto/new-product.dto';
import { ValidateDto } from '../middlewares/validate.middleware';
import { uploadImageCloudinary } from '../config/cloudinary';

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
  /*
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
    */
  static async addNewProduct(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      console.log('esto recibo: ', req.body);
      if (!data) {
        res.status(400).json({ message: 'Es necesario pasar los datos del nuevo producto' });
        return;
      }
      const result = await ProductService.createProduct(data);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error interno del sistema' });
    }
  }

  //EDIT
  static async editProduct(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      if (!data) {
        res.status(400).json({ message: 'Es necesario pasar los datos del producto a editar' });
        return;
      }
      const result = await ProductService.updateProduct(data.id, data);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error interno del sistema' });
    }
  }

  static async updateProductPhoto(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: 'Id del producto es requerido' });
        return;
      }

      const file = req.file;

      if (!file) {
        res.status(404).json({ message: 'No se envió ninguna imagen' });
        return;
      }
      const imageURL = await uploadImageCloudinary(file.path);
      console.log('URL de la imagen subida:', imageURL);
      if (typeof imageURL !== 'string') {
        res.status(500).json({ message: 'Error al subir la imagen de perfil.' });
        return;
      }

      await ProductService.updateProductPhoto(id, imageURL);
      res
        .status(200)
        .json({ message: 'Foto de perfil actualizada correctamente. ', imageURL: imageURL });
    } catch (error) {
      res.status(500).json({ message: 'Error interno del sistema', error });
    }
  }
}
