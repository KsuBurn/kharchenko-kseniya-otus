import {REGIONS_URL} from './constant';

export const getCountriesApi = async () => {
  try {
    const response = await fetch(`${REGIONS_URL}/info?returns=currency,flag`, {
      method: 'GET',
      redirect: 'follow'
    });
    console.log(response.json())
  } catch (err) {
    console.log('err', err)

  }
}
