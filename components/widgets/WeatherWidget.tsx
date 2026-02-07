'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { WeatherData } from '@/types/weather';

interface WeatherWidgetProps {
  initialWeather: WeatherData;
}

export function WeatherWidget({ initialWeather }: WeatherWidgetProps) {
  const [weather, setWeather] = useState(initialWeather);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/weather');
        if (response.ok) {
          const updatedWeather = await response.json();
          setWeather(updatedWeather);
        }
      } catch (error) {
        console.error('Failed to refresh weather:', error);
      }
    }, 600000); // Refresh every 10 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <Card title="🌤️ Christchurch Weather">
      <div className="space-y-4">
        {/* Current weather */}
        <div className="flex items-center gap-4">
          <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">
            {weather.current.temp}°C
          </div>
          <div className="flex-1">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
              {weather.current.condition}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Feels like {weather.current.feelsLike}°C
            </p>
          </div>
        </div>

        {/* Additional info */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <p className="text-gray-500 dark:text-gray-400">Humidity</p>
            <p className="font-medium text-gray-800 dark:text-gray-100">{weather.current.humidity}%</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <p className="text-gray-500 dark:text-gray-400">Wind</p>
            <p className="font-medium text-gray-800 dark:text-gray-100">{weather.current.windSpeed} km/h</p>
          </div>
        </div>

        {/* Forecast */}
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">3-Day Forecast</p>
          <div className="space-y-2">
            {weather.forecast.map((day) => (
              <div key={day.date} className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {new Date(day.date).toLocaleDateString('en-NZ', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
                <span className="text-gray-800 dark:text-gray-100 font-medium">
                  {day.maxTemp}° / {day.minTemp}°
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
