import { Request, Response } from 'express';
import { CreateUserDto } from '../dto/create-user.dto';
import { ValidateDto } from '../middlewares/validate.middleware';
import { AuthService } from '../services/auth.service';
import { ValidLoginDto } from '../dto/valid-login.dto';
import { forgotPasswordSchema } from '../dto/forgot-password.dto';
import { verifyResetTokenSchema } from '../dto/verify-reset-token.dto';
import { resetPasswordSchema } from '../dto/reset-password.dto';
import { verifyToken } from '../utils/jwt';

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      ValidateDto(CreateUserDto)(req, res, async () => {
        const { username, email, password, role } = req.body;
        const result = await AuthService.register({ username, email, password, role });
        res.json(result);
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error interno del servidor',
        error: error instanceof Error ? error.message : 'error desconocido',
      });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      ValidateDto(ValidLoginDto)(req, res, async () => {
        const { email, password } = req.body;

        if (!email || !password) {
          res.status(400).json({ message: 'Correo y contraseña son obligatorias' });
          return;
        }
        const result = await AuthService.login(email, password);
        res.json(result);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Credenciales incorrectas' });
    }
  }

  // 🔐 RECUPERACIÓN DE CONTRASEÑA

  /**
   * POST /api/auth/forgot-password
   * Solicita recuperación de contraseña
   */
  static async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = forgotPasswordSchema.parse(req.body);
      const result = await AuthService.forgotPassword(email);
      res.json(result);
    } catch (error) {
      console.error('Error en forgot-password:', error);
      if (error instanceof Error && 'issues' in error) {
        res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          errors: error,
        });
        return;
      }
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error al procesar solicitud',
      });
    }
  }

  /**
   * POST /api/auth/verify-reset-token
   * Verifica el token de recuperación y devuelve JWT temporal
   */
  static async verifyResetToken(req: Request, res: Response): Promise<void> {
    try {
      const { token } = verifyResetTokenSchema.parse(req.body);
      const result = await AuthService.verifyResetToken(token);
      res.json(result);
    } catch (error) {
      console.error('Error en verify-reset-token:', error);
      if (error instanceof Error && 'issues' in error) {
        res.status(400).json({
          success: false,
          message: 'Token inválido',
          errors: error,
        });
        return;
      }
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Token inválido o expirado',
      });
    }
  }

  /**
   * POST /api/auth/reset-password
   * Cambia la contraseña usando el JWT temporal
   * Requiere Authorization header con el JWT de reset
   */
  static async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      // 1. Validar body
      const { newPassword } = resetPasswordSchema.parse(req.body);

      // 2. Obtener y verificar JWT del header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
          success: false,
          message: 'Token de autorización requerido',
        });
        return;
      }

      const token = authHeader.split(' ')[1];

      if (!token) {
        res.status(401).json({
          success: false,
          message: 'Token no proporcionado',
        });
        return;
      }

      console.log('Verificando token de reset-password:', token);
      const decoded = verifyToken(token) as {
        userId: string;
        type: string;
        tokenId: string;
      };
      console.log('Token verificado:', decoded);

      // 3. Verificar que sea un token de reset
      if (decoded.type !== 'password-reset') {
        res.status(403).json({
          success: false,
          message: 'Token no válido para esta operación',
        });
        return;
      }

      // 4. Cambiar contraseña
      const result = await AuthService.resetPassword(decoded.userId, decoded.tokenId, newPassword);

      res.json(result);
    } catch (error) {
      console.error('Error en reset-password:', error);
      if (error instanceof Error && 'issues' in error) {
        res.status(400).json({
          success: false,
          message: 'Contraseña inválida',
          errors: error,
        });
        return;
      }
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error al cambiar contraseña',
      });
    }
  }
}
