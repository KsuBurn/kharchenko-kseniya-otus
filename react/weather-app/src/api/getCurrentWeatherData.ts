import {API_KEY, WEATHER_URL} from './constant';

export const getCurrentWeatherData = (cityName: string) => {
  return fetch(`${WEATHER_URL}/weather?units=metric&q=${cityName}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(result => result)
    .catch(error => {
      throw new Error(error)
    });
}
