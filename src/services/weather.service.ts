import { AppError } from '../errors/AppError';
import dotenv from 'dotenv';

export class WeatherService {
  static async getWeatherByCity(city: string): Promise<void> {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric&lang=es`
      );
      if (!response.ok) {
        throw new AppError('Ciudad no encontrada', 404);
      }
      return await response.json();
    } catch (error) {
      throw new AppError('Error al obtener el clima', 404);
    }
  }

  static async getWeatherByCoordinates(lat: number, lon: number): Promise<void> {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric&lang=es`
      );
      if (!response.ok) {
        throw new AppError(`HTTP error - status: ${response.status}`, 404);
      }
      return await response.json();
    } catch (error) {
      throw new AppError('Error al obtener el clima', 404);
    }
  }
}
