import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

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

  /*POST*/
}
