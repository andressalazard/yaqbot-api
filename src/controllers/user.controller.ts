import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ValidateDto } from '../middlewares/validate.middleware';
import { UpdateUserDto } from '../dto/updated-user.dto';

export class UserController {
  /*GET*/
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'Id del usuario es requerido' });
        return;
      }
      const user = await UserService.getUserById(id);
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ Error: 'Error al obtener el usuario', error });
    }
  }

  /*PATCH*/
  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      ValidateDto(UpdateUserDto)(req, res, async () => {
        const { id } = req.params;
        if (!id) {
          res.status(400).json({ message: 'Id del usuario es requerido' });
          return;
        }
        const updatedUser = await UserService.updateUser(id, req.body);
        res.status(200).json({ updatedUser });
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Usuario no encontrado') {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(500).json({ message: 'Error al actualizar el usuario', error: error instanceof Error ? error.message : 'Error desconocido' });
      }
    }
  }

  /*DELETE*/
  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'Id del usuario es requerido' });
        return;
      }
      const result = UserService.deleteUser(id);
      res.json(result);
    } catch (error) {
      if (error instanceof Error && error.message === 'Usuario no encontrado') {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(500).json({ message: 'Error al borrar el usuario', error: error instanceof Error ? error.message : 'Error desconocido' });
      }
    }
  }
}
