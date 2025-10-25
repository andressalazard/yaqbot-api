import { Router } from 'express';
import { PlantController } from '../controllers/plant.controller';

const router = Router();

/**
 * @swagger
 * /api/plants/:
 *   get:
 *     summary: Retrieve the list of all plants
 *     tags:
 *       - Plant
 *     responses:
 *       200:
 *         description: An array of plants
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AvailablePlant'
 *       500:
 *         description: Internal server error
 */
router.get('/', PlantController.getAllPlants);

/**
 * @swagger
 * /api/plants/catalog:
 *   get:
 *     summary: Retrieve the catalog of plants available on db
 *     tags:
 *       - Plant
 *     responses:
 *       200:
 *         description: An array of plants
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CatalogPlant'
 *       500:
 *         description: Internal server error
 */
router.get('/catalog', PlantController.getPlantsCatalog);

/**
 * @swagger
 * /api/plants/{productid}:
 *   post:
 *     summary: Creates the plant's details
 *     description: Creates the plant details for the plant passing on his productId
 *     tags:
 *       - Plant
 *     parameters:
 *       - name: productid
 *         in: path
 *         required: true
 *         description: Product ID of the plant, necessary for its details creation
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewPlantDetails'
 *     responses:
 *       '201':
 *         description: Plant details created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewPlantDetails'
 *       '400':
 *         description: Bad request, product Id is required
 *       '404':
 *         description: Product Not Found
 *       '500':
 *         description: Internal server error
 */
router.post('/:productid', PlantController.registerPlantDetails);

export default router;
