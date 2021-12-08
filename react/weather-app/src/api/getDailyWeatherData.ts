import {API_KEY, WEATHER_API_URL} from './constant';

export const getDailyWeatherData = (cityName: string) => {
  return fetch(`${WEATHER_API_URL}/forecast.json?key=${API_KEY}&days=3&q=${cityName}`)
    .then(response => response.json())
    .catch((err) => {
      throw new Error(err)
    })
}
