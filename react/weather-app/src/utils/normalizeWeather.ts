import moment from 'moment';
import {CurrentWeatherData, DailyWeatherData} from '../types/types';

export const normalizeCurrentWeather = (data): CurrentWeatherData => {
  return {
    cityName: data.location.name,
    date: moment.unix(data.current.last_updated_epoch).format('DD.MM.YY'),
    temperature: data.current.temp_c,
    perceivedTemperature: data.current.feelslike_c,
    humidity: data.current.humidity,
    weather: {
      description: data.current.condition.text,
      icon: data.current.condition.icon
    },
    windSpeed: data.current.wind_kph,
  }
}

export const normalizeDailyWeather = (data, cityName: string): DailyWeatherData => {
  const daily = data.forecast.forecastday.map(item => ({
    cityName,
    date: moment.unix(item.date_epoch).format('DD.MM.YY'),
    maxTemperature: item.day.maxtemp_c,
    minTemperature: item.day.mintemp_c,
    humidity: item.day.avghumidity,
    windSpeed: item.day.maxwind_kph,
    weather: {
      description: item.day.condition.text,
      icon: item.day.condition.icon,
    },
  }));

  return {
    daily,
  }
}


