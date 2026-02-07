export interface WeatherCurrent {
  temp: string;
  condition: string;
  icon: string;
  feelsLike: string;
  humidity: string;
  windSpeed: string;
}

export interface WeatherForecast {
  date: string;
  maxTemp: string;
  minTemp: string;
  condition: string;
}

export interface WeatherData {
  current: WeatherCurrent;
  forecast: WeatherForecast[];
}
