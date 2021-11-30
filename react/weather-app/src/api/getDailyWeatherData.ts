import {API_KEY, WEATHER_URL} from './constant';

export const getDailyWeatherData = ({lat, lon}) => {
  return fetch(`${WEATHER_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts,hourly&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(result => result)
    .catch(error => {
      throw new Error(error)
    });
}