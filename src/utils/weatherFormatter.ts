export function formatWeatherResponse(weatherData: any) {
  return {
    date: new Date(weatherData.dt * 1000).toLocaleDateString('es-ES', {
      month: 'long',
    }),
    time: new Date(weatherData.dt * 1000).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    city: weatherData.name ?? null,
    country: weatherData.sys?.country ?? null,
    weather: weatherData.weather[0]?.main ?? null,
    description: weatherData.weather[0]?.description ?? null,
    icon: weatherData.weather[0]?.icon ?? null,
    temperature: weatherData.main?.temp ?? null,
    humidity: weatherData.main?.humidity ?? null,
    wind: weatherData.wind?.speed ?? null,
  };
}
