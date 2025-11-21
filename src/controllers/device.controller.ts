import { Request, Response } from 'express';
import { DeviceService } from '../services/device.service';

export class DeviceController {
  static async pumpWater(req: Request, res: Response) {
    try {
      const response = await DeviceService.pumpWater();
      if (!response) {
        res.status(400).json({ message: 'Error al regar la planta' });
      }
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: 'Error interno del sistema', error });
    }
  }
}
