import { AppError } from '../errors/AppError';

export function formatForecastResponse(forecastData: any) {
  if (!forecastData.list || !forecastData.city) {
    throw new AppError('Unexpectd API response format', 500);
  }

  const weatherList = forecastData.list.map((item: any) => ({
    date: new Date(item.dt * 1000).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    time: new Date(item.dt * 1000).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    temperature: item.main?.temp ?? null,
    humidity: item.main?.humidity ?? null,
    // weather: item.weather?.map((w: any) => ({ main: w.main, description: w.description })) ?? [],
    weather: item.weather[0]?.main ?? null,
    description: item.weather[0]?.description ?? null,
    icon: item.weather[0]?.icon ?? null,
    wind: item.wind?.speed ?? null,
    rain: item.rain?.['3h'] ?? 0,
  }));

  return {
    city: forecastData.city.name,
    country: forecastData.city.country,
    forecast: weatherList,
  };
}
