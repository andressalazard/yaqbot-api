import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import multer from 'multer';
import storage from '../middlewares/multerStorage.middleware';

const router = Router();
const uploadCloudinary = multer({ storage });

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('', ProductController.getAllProducts);

/**
 * @swagger
 * /api/products/create:
 *   post:
 *     summary: Create a new Product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProduct'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request, you need to pass the data of the new product you want to add
 *       500:
 *         description: Internal server error
 *
 */
router.post('/create', ProductController.addNewProduct);
router.post('/edit', ProductController.editProduct);
router.patch('/photo/:id', uploadCloudinary.single('file'), ProductController.updateProductPhoto);
export default router;
