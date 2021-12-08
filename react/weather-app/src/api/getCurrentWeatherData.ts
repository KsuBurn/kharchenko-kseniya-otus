import {API_KEY, WEATHER_API_URL} from './constant';

export const getCurrentWeatherData = (cityName: string) => {
  return fetch(`${WEATHER_API_URL}/current.json?key=${API_KEY}&q=${cityName}`)
    .then(response => response.json())
    .catch((err) => {
      throw new Error(err)
    })
}
