import {API_KEY, WEATHER_URL} from './constant';

export const getCurrentWeatherData = (cityName: string) => {
  // return fetch(`${WEATHER_URL}/weather?units=metric&q=${cityName}&appid=${API_KEY}`)
  //   .then(response => response.json())
  //   .then(result => result)
  //   .catch(error => {
  //     throw new Error(error)
  //   });

  return fetch(`http://api.weatherapi.com/v1/current.json?key=183bde896e0541fbab975023210312&q=${cityName}`)
    .then(response => response.json())
    .then(result => result)
    .catch((err) => {
      throw new Error(err)
    })
}
