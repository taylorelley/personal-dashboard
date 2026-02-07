import { WeatherData } from '@/types/weather';

export async function getWeather(): Promise<WeatherData> {
  const response = await fetch(
    'https://wttr.in/Christchurch,NZ?format=j1',
    {
      next: { revalidate: 600 }, // 10 minutes
    }
  );

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  const data = await response.json();
  
  return {
    current: {
      temp: data.current_condition[0].temp_C,
      condition: data.current_condition[0].weatherDesc[0].value,
      icon: data.current_condition[0].weatherIconUrl[0].value,
      feelsLike: data.current_condition[0].FeelsLikeC,
      humidity: data.current_condition[0].humidity,
      windSpeed: data.current_condition[0].windspeedKmph,
    },
    forecast: data.weather.slice(0, 3).map((day: any) => ({
      date: day.date,
      maxTemp: day.maxtempC,
      minTemp: day.mintempC,
      condition: day.hourly[4]?.weatherDesc[0]?.value || day.hourly[0]?.weatherDesc[0]?.value,
    })),
  };
}
