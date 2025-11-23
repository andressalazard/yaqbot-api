import { Request, Response } from 'express';
import { WeatherService } from '../services/weather.service';
import { formatForecastResponse } from '../utils/forecastFormatter';
import { formatWeatherResponse } from '../utils/weatherFormatter';

export class WeatherController {
  /*GET METHODS*/
  static async getCityWeather(req: Request, res: Response) {
    const { city } = req.params;
    if (!city) {
      return res.status(400).json({ message: 'City parameter is required' });
    }
    try {
      const weatherData: any = await WeatherService.getWeatherByCity(city);
      const formattedResponse = formatWeatherResponse(weatherData);
      res.json(formattedResponse);
    } catch (error) {
      res.status(500).json({ message: 'Error at getting city weather', error });
    }
  }

  static async getGeolocationWeather(req: Request, res: Response) {
    const { lat, lon } = req.params;
    if (!lat || !lon) {
      return res.status(400).json({ message: 'Lattitude and longitude are mandatory' });
    }
    try {
      const weatherData: any = await WeatherService.getWeatherByCoordinates(
        parseInt(lat),
        parseInt(lon)
      );
      const formattedResponse = formatWeatherResponse(weatherData);
      res.json(formattedResponse);
    } catch (error) {
      res.status(500).json({ message: 'Error at getting geolocation weather' });
    }
  }

  /*********************************************************************
   * FORECAST
   ********************************************************************/

  static async getCityForecast(req: Request, res: Response) {
    const { city } = req.params;
    if (!city) {
      return res.status(400).json({ message: 'City parameter is required' });
    }
    try {
      const forecastData: any = await WeatherService.getForecastByCity(city);
      const formattedResponse = formatForecastResponse(forecastData);
      res.json(formattedResponse);
    } catch (error) {
      res.status(500).json({ message: 'Error at getting city forecast', error });
    }
  }

  static async getGeolocationForecast(req: Request, res: Response) {
    const { lat, lon } = req.params;
    if (!lat || !lon) {
      return res.status(400).json({ message: 'Lattitude and longitude coordinates are mandatory' });
    }
    try {
      const forecastData: any = await WeatherService.getForecastByCoordinates(
        parseInt(lat),
        parseInt(lon)
      );
      const formattedResponse = formatForecastResponse(forecastData);
      res.json(formattedResponse);
    } catch (error) {
      res.status(500).json({ message: 'Error at getting geolocation forecast' });
    }
  }
}
