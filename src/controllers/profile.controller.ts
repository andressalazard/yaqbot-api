import { Request, Response } from 'express';
import { ProfileService } from '../services/profile.service';

export class ProfileController {
  //PROFILE
  //GET
  static async getProfileByUserId(req: Request, res: Response): Promise<void> {
    try {
      const { userid } = req.params;
      if (!userid) {
        res.status(400).json({ message: 'Id del usuario es requerido' });
        return;
      }

      const profile = await ProfileService.getUserProfileById(userid);
      if (!profile) {
        res.status(404).json({ message: 'Perfil del usuario no encontrado' });
        return;
      }

      res.json(profile);
    } catch (error) {
      res.status(500).json({ Error: 'Error al obtener el perfil del usuario', error });
    }
  }

  //POST
  static async registerProfile(req: Request, res: Response): Promise<void> {
    try {
      const { userid } = req.params;

      if (!userid) {
        res.status(400).json({ message: 'Id del usuario es requerido' });
        return;
      }

      const response = await ProfileService.createProfile(userid, req.body);
      res.json({ message: 'Perfil creado con éxito', response });
    } catch (error) {
      res.status(500).json({ message: 'Error interno del sistema', error });
    }
  }

  //UPDATE
  static async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const { userid } = req.params;

      if (!userid) {
        res.status(400).json({ message: 'Id del usuario es requerido' });
        return;
      }
      const response = await ProfileService.updateProfile(userid, req.body);
      res.json({ message: 'Perfil modificado con éxito', response });
    } catch (error) {
      res.status(500).json({ message: 'Error interno del sistema', error });
    }
  }

  static async updateProfilePhoto(req: Request, res: Response): Promise<void> {
    try {
      const { userid } = req.params;

      if (!userid) {
        res.status(400).json({ message: 'Id del usuario es requerido' });
        return;
      }

      const file = req.file;

      if (!file) {
        res.status(404).json({ message: 'No se envió ninguna imagen' });
        return;
      }

      const validFormats = ['jpg', 'png', 'jpeg'];
      const fileExt = file.originalname.split('.').pop();

      if (!validFormats.includes(fileExt?.toLowerCase() || '')) {
        res.status(400).json({ message: 'La extensión del archivo no es válida. Se permiten JPG, JPEG y PNG' });
        return;
      }

      await ProfileService.updateProfilePhoto(userid, file.path);
    } catch (error) {
      res.status(500).json({ message: 'Error interno del sistema', error });
    }
  }
}
