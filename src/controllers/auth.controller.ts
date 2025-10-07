import { Request, Response } from 'express';
import { CreateUserDto } from '../dto/create-user.dto';
import { ValidateDto } from '../middlewares/validate.middleware';
import { AuthService } from '../services/auth.service';
import { ValidLoginDto } from '../dto/valid-login.dto';

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      ValidateDto(CreateUserDto)(req, res, async () => {
        const { username, email, password, role } = req.body;
        const result = await AuthService.register({ username, email, password, role });
        res.json(result);
      });
    } catch (error) {
      res.status(500).json({ message: 'Error interno del servidor', error: error instanceof Error ? error.message : 'error desconocido' });
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
}
