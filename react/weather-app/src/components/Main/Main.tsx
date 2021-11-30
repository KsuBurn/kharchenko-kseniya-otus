import React, {FC, useEffect, useState} from 'react';
import {Input} from '../Input/Input';
import {WeatherCard} from '../WeatherCard/WeatherCard';
import Button from '@mui/material/Button';
import {getCitiesApi} from '../../api/getCitiesApi';
import {getCountriesApi} from '../../api/getCountriesApi';
import {getCurrentWeatherData} from '../../api/getCurrentWeatherData';
import {normalizeCurrentWeather} from '../../utils/normalizeWeather';
import {GoToFavoriteButton} from '../GoToFavoriteButton/GoToFavoriteButton';
import Box from '@mui/material/Box';

export const Main: FC = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [inputCountry, setInputCountry] = useState('');

  const [citiesList, setCitiesList] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const [cityWeather, setCityWeather] = useState();

  const [error, setError] = useState('');

  useEffect(() => {
    getCountriesApi()
      .then(result => setCountriesList(result))
      .catch(error => {
        setCountriesList([])
        console.error('error', error)
      });

  }, [])

  useEffect(() => {
    // if (selectedCountry.length) {
    //   getCitiesApi(selectedCountry)
    //     .then(result => setCitiesList(result))
    //     .catch(error => {
    //       setCitiesList([])
    //       console.error('error', error)
    //     });
    // }
  }, [selectedCountry])

  const handleSearchWeather = () => {
    getCurrentWeatherData(selectedCity)
      .then(result => {
        if (result.cod.toString() === '404') {
          setError(result.message);
          setCityWeather(undefined);
        }

        if (result.cod.toString() === '200') {
          setCityWeather(normalizeCurrentWeather(result))
          setError('');
        }
      })
      .catch(error => console.log('error', error));
  }

  return (
    <>
      <GoToFavoriteButton/>
      <Input
        placeholder={'Choose a country'}
        onChange={(evt: any, newValue) => {
          if (newValue) {
            setSelectedCountry(newValue.name)
            setSelectedCity('')
            return;
          }

          setSelectedCountry('');
          setSelectedCity('');
          setCityWeather(undefined);
          setError('');
        }}

        onInputChange={(evt, value) => setSelectedCountry(value)}
        options={countriesList.map((item) => ({name: item.name, flag: item.flag}))}
        value={selectedCountry}
        countriesList={countriesList}
        getOptionLabel={(option: any) => option.name}
        renderOption={(props, option) => (
          <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
            <img
              loading="lazy"
              width="20"
              src={option.flag}
              alt=""
            />
            {option.name}
          </Box>
        )}

        onBlur={() => {
          if (selectedCountry.length) {
            getCitiesApi(selectedCountry)
              .then(result => setCitiesList(result))
              .catch(error => {
                setCitiesList([])
                console.error('error', error)
              });
          }
        }}
      />

      <Input
        placeholder={'Choose a city'}
        options={citiesList.map((item) => item)}
        disabled={!selectedCountry.length}
        onChange={(evt: any, newValue) => {
          if (newValue) {
            setSelectedCity(newValue);
            return;
          }

          setSelectedCity('');
          setCityWeather(undefined);
          setError('');
        }}
        value={selectedCity}
        onInputChange={(evt, value) => setSelectedCity(value)}
      />
      <Button
        variant="contained"
        onClick={handleSearchWeather}
        disabled={!(selectedCity.length && selectedCountry.length)}
      >
        Search
      </Button>
      {cityWeather && <WeatherCard cityName={selectedCity} cityWeather={cityWeather}/>}
      {error.length && selectedCity ? (
        <p>{error}</p>
      ) : null}
    </>
  )
}
