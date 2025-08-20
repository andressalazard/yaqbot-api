import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 *
 * get:
 *   summary: Retrieve a list of users
 *   responses:
 *    200:
 *     description: A list of users.
 *     content:
 *      application/json:
 *      schema:
 *       type: array
 *      items:
 *      $ref: '#/components/schemas/User'
 */

router.get('', UserController.getAllUsers);

export default router;
