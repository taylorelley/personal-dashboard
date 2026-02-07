import { getWeather } from '@/lib/api/weather';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const weather = await getWeather();
    return NextResponse.json(weather);
  } catch (error) {
    console.error('Error fetching weather:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
