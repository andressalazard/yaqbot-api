import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving users', error });
    }
  }
}
