import {REGIONS_URL} from './constant';

export const getCitiesApi = (country: string) => {
  console.log('country', country)
  fetch(`${REGIONS_URL}/cities`, {
    method: 'POST',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({country}),
  })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
