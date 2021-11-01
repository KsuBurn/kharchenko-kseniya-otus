import React, {FC, useEffect, useState} from 'react';
import {Input} from '../Input/Input';
import {WeatherCard} from '../WeatherCard/WeatherCard';
import Button from '@mui/material/Button';
import {getCitiesApi} from '../../api/getCitiesApi';
import {getCountriesApi} from '../../api/getCountriesApi';
import {getCurrentWeatherData} from '../../api/getCurrentWeatherData';
import {normalizeCurrentWeather} from '../../utils/normalizeWeather';
import {NavLink} from 'react-router-dom';

export const Main: FC = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [citiesList, setCitiesList] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const [cityWeather, setCityWeather] = useState();

  useEffect(() => {
    setSelectedCity('');
  }, [selectedCountry])

  useEffect(() => {
    getCountriesApi()
      .then(result => setCountriesList(result))
      .catch(error => {
        setCountriesList([])
        console.log('error', error)
      });

  }, [])

  useEffect(() => {

    if (selectedCountry.length) {
      getCitiesApi(selectedCountry)
        .then(result => setCitiesList(result))
        .catch(error => {
          setCitiesList([])
          console.log('error', error)
        });
    }
  }, [selectedCountry])

  const handleSearchWeather = () => {
    getCurrentWeatherData(selectedCity)
      .then(result => {
        setCityWeather(normalizeCurrentWeather(result))
        console.log('result', normalizeCurrentWeather(result))
      })
      .catch(error => console.log('error', error));
  }

  return (
    <>
      <NavLink to={'/favorite'}>Favorites</NavLink>
      <Input
        placeholder={'Choose a country'}
        itemsList={countriesList}
        onChange={(evt: any, newValue) => {
          setSelectedCountry(newValue)
        }}
        options={countriesList.map((item) => item.name)}
      />
      <Input
        placeholder={'Choose a city'}
        itemsList={citiesList}
        options={citiesList.map((item) => item)}
        disabled={!selectedCountry.length}
        onChange={(evt: any, newValue) => {
          setSelectedCity(newValue)
        }}
      />
      <Button
        variant="contained"
        onClick={handleSearchWeather}
        disabled={!(selectedCity.length && selectedCountry.length)}
      >
        Search
      </Button>

      {cityWeather && <WeatherCard cityName={selectedCity} cityWeather={cityWeather}/>}
    </>
  )
}
