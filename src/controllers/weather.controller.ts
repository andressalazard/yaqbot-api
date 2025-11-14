import { Request, Response } from 'express';
import { WeatherService } from '../services/weather.service';

export class WeatherController {
  /*GET METHODS*/
  static async getCityWeather(req: Request, res: Response) {
    const { city } = req.params;
    if (!city) {
      return res.status(400).json({ message: 'City parameter is required' });
    }
    try {
      const weatherData = await WeatherService.getWeatherByCity(city);
      res.json(weatherData);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el clima de la ciudad' });
    }
  }

  static async getGeolocationWeather(req: Request, res: Response) {
    const { lat, lon } = req.params;
    if (!lat || !lon) {
      return res.status(400).json({ message: 'Latitud y longitud son requeridos' });
    }
    try {
      const weatherData = await WeatherService.getWeatherByCoordinates(
        parseInt(lat),
        parseInt(lon)
      );
      res.json(weatherData);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el clima por geolocalización' });
    }
  }
}
