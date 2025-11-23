import { Router } from 'express';
import { DeviceController } from '../controllers/device.controller';

const router = Router();

/**
 * @swagger
 * /api/yaqbot/pump-water:
 *   get:
 *     summary: Pump Water
 *     tags: [Device]
 *     responses:
 *       200:
 *         description: A weather object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Error while pumping the water
 *       500:
 *         description: Internal server error
 *
 */
router.get('/pump-water', DeviceController.pumpWater);

export default router;
