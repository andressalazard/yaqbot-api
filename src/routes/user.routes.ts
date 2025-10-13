import { Router } from "express";
import { UserController } from "../controllers/user.controller";

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
router.get("", UserController.getAllUsers);

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
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The user Id
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoggedUser'
 *       400:
 *         description: Bad request, user Id is required
 *       404:
 *         description: The User was not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", UserController.getUserById);

/**
 * @swagger
 * /api/users/email/{email}:
 *   get:
 *     summary: Retrieve a user by email
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The user email
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoggedUser'
 *       400:
 *         description: Bad request, user email is required
 *       404:
 *         description: The User was not found
 *       500:
 *         description: Internal server error
 */
router.get("/email/:email", UserController.getUserByEmail);

/**
 * @swagger
 * /api/users/username/{username}:
 *   get:
 *     summary: Retrieve a user by username
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The user username
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoggedUser'
 *       400:
 *         description: Bad request, user username is required
 *       404:
 *         description: The User was not found
 *       500:
 *         description: Internal server error
 */
router.get("/username/:username", UserController.getUserByUsername);

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
 *           format: uuid
 *         required: true
 *         description: The user Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatedUser'
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
router.patch("/:id", UserController.updateUser);

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
 *           format: uuid
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

router.delete("/:id", UserController.deleteUser);

export default router;
