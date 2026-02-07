import { getWeather } from '@/lib/api/weather';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const weather = await getWeather();
    return NextResponse.json(weather);
  } catch (error) {
    console.error('Error fetching weather:', error);
    // Return empty weather data instead of error object to avoid client-side crashes
    return NextResponse.json({
      current: {
        temp: '0',
        condition: 'Unavailable',
        icon: '',
        feelsLike: '0',
        humidity: '0',
        windSpeed: '0',
      },
      forecast: [],
    });
  }
}
