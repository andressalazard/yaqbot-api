import { AppError } from '../errors/AppError';

export class DeviceService {
  static async pumpWater() {
    try {
      const response = await fetch(`${process.env.YAQBOT_DEVICE_URL}/yaqbot/pump-water`);
      if (!response.ok) {
        throw new AppError('Error al obtener respuesta del dispositivo', 404);
      }
      return await response.json();
    } catch (error) {
      throw new AppError('La planta no pudo ser regada', 404);
    }
  }
}
