import { Router } from 'express';
import { PlantController } from '../controllers/plant.controller';

const router = Router();

/**
 * @swagger
 * /api/plants/owned-by/{userid}:
 *   get:
 *     summary: Retrieve the plants owned by the user
 *     tags:
 *       - Plant
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The user Id
 *     responses:
 *       200:
 *         description: An array of plants owned by this user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OwnedPlant'
 *       500:
 *         description: Internal server error
 */
router.get('/owned-by/:userid', PlantController.getOwnerPlants);

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
 * /api/plants/owned/{ownedplantid}:
 *   get:
 *     summary: Retrieve the plants owned by the user
 *     tags:
 *       - Plant
 *     parameters:
 *       - in: path
 *         name: ownedplantid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The user Id
 *     responses:
 *       200:
 *         description: An array of plants owned by this user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OwnedPlant'
 *       500:
 *         description: Internal server error
 */
router.get('/owned/:ownedplantid', PlantController.getUserPlantById);

/**********************************************************
 * POST
 **********************************************************/
/**
 * @swagger
 * /api/plants/new-ownership:
 *   post:
 *     summary: Register the user's new plant
 *     description: Creates a new plant record for the user
 *     tags:
 *       - Plant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUserPlantRegister'
 *     responses:
 *       '201':
 *         description: Plant details created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewUserPlantRecord'
 *       '400':
 *         description: Bad request, register data is required
 *       '404':
 *         description: User or Plant Not Found
 *       '500':
 *         description: Internal server error
 */
router.post('/new-ownership', PlantController.createNewPlantOwnership);

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
