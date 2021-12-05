import {normalizeDailyWeather} from '../utils/normalizeWeather';

export type CurrentWeatherData = {
  cityName: string;
  date: string;
  temperature: string;
  perceivedTemperature: string;
  humidity: string;
  weather: {
    description: string;
    icon: string;
  },
  windSpeed: string;
}

export type DayWeather = {
  cityName: string;
  date: string;
  maxTemperature: string;
  minTemperature: string;
  humidity: string;
  weather: {
    description: string;
    icon: string;
  },
  windSpeed: string;
};

export type DailyWeatherData = {
  daily: DayWeather[]
}
