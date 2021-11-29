import {REGIONS_URL} from './constant';

export const getCitiesApi = (country: string) => {
  return fetch(`${REGIONS_URL}/cities`, {
    method: 'POST',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({country: country}),
  })
    .then(response => response.json())
    .then(result => result.data)
    .catch(error => {
      throw new Error(error)
    });
}
