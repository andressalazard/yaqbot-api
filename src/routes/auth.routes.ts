import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: User created successfully and valid JWT token is delivered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: valid JWT token to authenticate the user
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *                 userid:
 *                   type: string
 *                   description: The user's ID
 *                   example: 123e4567e89b12d3a456426614174000
 *       400:
 *         description: Bad request, user Id is required
 *       404:
 *         description: The User was not found
 *       500:
 *         description: Internal server error
 */
router.post('/register', AuthController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a registered user
 *     tags:
 *       - Authentication
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoggedUser'
 *     responses:
 *       201:
 *         description: User created successfully and valid JWT token is delivered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: valid JWT token to authenticate the user
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *                 userid:
 *                   type: string
 *                   description: The user's ID
 *                   example: 123e4567e89b12d3a456426614174000
 *       400:
 *         description: Bad request, user Id is required
 *       404:
 *         description: The User was not found
 *       500:
 *         description: Internal server error
 */
router.post('/login', AuthController.login);

export default router;
