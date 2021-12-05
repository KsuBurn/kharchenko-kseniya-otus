import {API_KEY, WEATHER_API_URL} from './constant';

export const getCitiesApi = (searchValue: string) => {
  return fetch(`${WEATHER_API_URL}/search.json?key=${API_KEY}&q=${searchValue}`)
    .then(response => response.json())
    .then(result => result)
    .catch((err) => {
      throw new Error(err)
    })
}

