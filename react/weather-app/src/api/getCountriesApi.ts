import {REGIONS_URL} from './constant';

export const getCountriesApi = () => {
  return fetch(`${REGIONS_URL}/info?returns=currency,flag`, {
    method: 'GET',
    redirect: 'follow'
  })
    .then(response => response.json())
    .then(result => result.data)
    .catch(error => {
      throw new Error(error)
    });
}
