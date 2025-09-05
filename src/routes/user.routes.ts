import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('', UserController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retrieve a user by Id
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user Id
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, user Id is required
 *       404:
 *         description: The User was not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', UserController.getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update user data by Id
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, user Id is required
 *       404:
 *         description: The User was not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:id', UserController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by Id
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user Id
 *     responses:
 *       200:
 *         description: A json object
 *       400:
 *         description: Bad request, user Id is required
 *       404:
 *         description: The User was not found
 *       500:
 *         description: Internal server error
 */

router.delete('/:id', UserController.deleteUser);
export default router;
