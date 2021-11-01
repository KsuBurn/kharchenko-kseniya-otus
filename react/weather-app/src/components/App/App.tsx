import React, {FC, useEffect, useState} from 'react';
import {Input} from '../Input/Input';
import {WeatherCard} from '../WeatherCard/WeatherCard';
import styles from './App.module.css'
import {REGIONS_URL} from '../../api/constant';
import {getCountriesApi} from '../../api/getCountriesApi';
import {getCitiesApi} from '../../api/getCitiesApi';

export const App: FC = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [citiesList, setCitiesList] = useState([]);


  useEffect(() => {
    fetch(`${REGIONS_URL}/info?returns=currency,flag`, {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => setCountriesList(result.data))
      .catch(error => console.log('error', error));

  }, [])

  useEffect(() => {
    if (selectedCountry.length) {
      fetch(`${REGIONS_URL}/cities`, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({country: selectedCountry}),
      })
        .then(response => response.json())
        .then(result => setCitiesList(result.data))
        .catch(error => console.log('error', error));
    }
  }, [selectedCountry])

  return (
    <div className={styles.wrap}>
      <h2>Приложение погоды</h2>

      <Input
        placeholder={'country'}
        itemsList={countriesList}
        onBlur={(evt: any) => setSelectedCountry(evt.target.value)}
        options={countriesList.map((item) => item.name)}
      />

      <Input
        placeholder={'city'}
        itemsList={citiesList}
        options={citiesList.map((item) => item)}
      />

      <WeatherCard/>
    </div>
  )
}
