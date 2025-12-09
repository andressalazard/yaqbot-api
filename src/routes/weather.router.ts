import { Router } from 'express';
import { WeatherController } from '../controllers/weather.controller';

const router = Router();
/**
 * @swagger
 * /api/weather/city/{city}:
 *   get:
 *     summary: Get weather by city name
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *     responses:
 *       200:
 *         description: A weather object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request, you need to pass the city name as parameter
 *       500:
 *         description: Internal server error
 *
 */
router.get('/city/:city', WeatherController.getCityWeather);

/**
 * @swagger
 * /api/weather/forecast/city/{city}:
 *   get:
 *     summary: Get forecast weather by city name
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *     responses:
 *       200:
 *         description: A weather forecast object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request, you need to pass the city name as parameter
 *       500:
 *         description: Internal server error
 *
 */
router.get('/forecast/city/:city', WeatherController.getCityForecast);

/**
 * @swagger
 * /api/weather/forecast/geolocation/{lat}/{lon}:
 *   get:
 *     summary: Get weather forecast by geolocation coordinates
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: lat
 *         required: true
 *       - in: path
 *         name: lon
 *         required: true
 *     responses:
 *       200:
 *         description: A weather object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request, you need to pass the lattitude/longitude coordinates as parameters
 *       500:
 *         description: Internal server error
 *
 */
router.get('/forecast/geolocation/:lat/:lon', WeatherController.getGeolocationForecast);

/**
 * @swagger
 * /api/weather/geolocation/{lat}/{lon}:
 *   get:
 *     summary: Get weather by geolocation coordinates
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: lat
 *         required: true
 *       - in: path
 *         name: lon
 *         required: true
 *     responses:
 *       200:
 *         description: A weather object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request, you need to pass the city name as parameter
 *       500:
 *         description: Internal server error
 *
 */
router.get('/geolocation/:lat/:lon', WeatherController.getGeolocationWeather);

export default router;
