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

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request password recovery
 *     tags:
 *       - Authentication
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *                example: usuario@example.com
 *     responses:
 *       200:
 *         description: Recovery email sent (if email exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Si el correo existe, recibirás un email con instrucciones para recuperar tu contraseña
 *       400:
 *         description: Invalid email format
 *       500:
 *         description: Internal server error
 */
router.post('/forgot-password', AuthController.forgotPassword);

/**
 * @swagger
 * /api/auth/verify-reset-token:
 *   post:
 *     summary: Verify password reset token and get temporary JWT
 *     tags:
 *       - Authentication
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - token
 *            properties:
 *              token:
 *                type: string
 *                description: Token received in the email
 *                example: a4f8b2c9d1e3f7a8b5c2d9e1f4a7b3c8d2e5f9a1b6c3d8e2f5a9b4c7d1e8f3a6
 *     responses:
 *       200:
 *         description: Token verified, returns temporary JWT (15 minutes)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 resetToken:
 *                   type: string
 *                   description: Temporary JWT for password reset
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 expiresIn:
 *                   type: string
 *                   example: 15m
 *       400:
 *         description: Invalid or expired token
 */
router.post('/verify-reset-token', AuthController.verifyResetToken);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password with temporary JWT
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - newPassword
 *            properties:
 *              newPassword:
 *                type: string
 *                format: password
 *                description: New password (min 8 chars, must contain uppercase, lowercase and number)
 *                example: NuevaPassword123
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Contraseña actualizada exitosamente
 *       400:
 *         description: Invalid password or token
 *       401:
 *         description: Missing or invalid authorization token
 *       403:
 *         description: Token not valid for this operation
 */
router.post('/reset-password', AuthController.resetPassword);

export default router;
