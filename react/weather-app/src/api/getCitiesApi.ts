import {REGIONS_URL} from './constant';

export const getCitiesApi = (searchValue) => {
  // return fetch(`${REGIONS_URL}/cities`, {
  //   method: 'POST',
  //   headers: {
  //     'Accept': '*/*',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({country: country}),
  // })
  //   .then(response => response.json())
  //   .then(result => result.data)
  //   .catch(error => {
  //     throw new Error(error)
  //   });

return fetch(`http://api.weatherapi.com/v1/search.json?key=183bde896e0541fbab975023210312&q=${searchValue}`)
  .then(response => response.json())
  .then(result => result)
  .catch((err) => {
    throw new Error(err)
  })
}

