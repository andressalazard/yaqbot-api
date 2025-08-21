import { z } from 'zod';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - username
 *         - email
 *         - password
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the user
 *         username:
 *           type: string
 *           description: Username of the user
 *         email:
 *           type: string
 *           description: Email address of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the user was created
 *       example:
 *         id: 123e4567-e89b-12d3-a456-426614174000
 *         username: johndoe
 *         email: johndoe@email.com
 *         password: securepassword
 *         createdAt: 2023-10-01T12:00:00Z
 */

export const CreateUserDto = z.object({
  username: z.string().min(2, 'el nombre debe tener al menos 2 caracteres').max(60, 'el nombre no puede tener más de 60 caracteres'),
  email: z.string().email('Formato de correo electrónico inválido').toLowerCase,
  password: z
    .string()
    .min(8, 'la contraseña debe tener al menos 6 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Debe incluir mayúscula, minúscula, y número'),
});

export type CreateUserDto = z.infer<typeof CreateUserDto>;
