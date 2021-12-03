import {API_KEY, WEATHER_URL} from './constant';

export const getDailyWeatherData = (cityName) => {
  // return fetch(`${WEATHER_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts,hourly&units=metric&appid=${API_KEY}`)
  //   .then(response => response.json())
  //   .then(result => result)
  //   .catch(error => {
  //     throw new Error(error)
  //   });

  return fetch(`http://api.weatherapi.com/v1/forecast.json?key=183bde896e0541fbab975023210312&days=3&q=${cityName}`)
    .then(response => response.json())
    .then(result => result)
    .catch((err) => {
      throw new Error(err)
    })
}