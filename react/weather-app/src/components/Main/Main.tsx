import React, {FC, useState} from 'react';
import {WeatherCard} from '../WeatherCard/WeatherCard';
import Button from '@mui/material/Button';
import {getCitiesApi} from '../../api/getCitiesApi';
import {getCurrentWeatherData} from '../../api/getCurrentWeatherData';
import {normalizeCurrentWeather} from '../../utils/normalizeWeather';
import {GoToFavoriteButton} from '../GoToFavoriteButton/GoToFavoriteButton';
import _debounce from 'lodash/debounce';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {CurrentWeatherData} from '../../types/types';

export const Main: FC = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [inputCity, setInputCity] = useState('');

  const [options, setOptions] = useState([])
  const [cityWeather, setCityWeather] = useState<CurrentWeatherData | undefined>();

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleSearchWeather = (evt, newValue?) => {
    evt.preventDefault();
    getCurrentWeatherData(newValue || selectedCity)
      .then(result => {
        if ('error' in result) {
          setErrorMessage(result.error.message);
        } else {
          setCityWeather(normalizeCurrentWeather(result))

          if (errorMessage) {
            setErrorMessage(undefined);
          }
        }
      })
      .catch(() => {
        setShowError(true);
      });
  };

  const getCities = _debounce((evt, value) => {
    if (showError) {
      setShowError(false);
    }
    if (value) {
      setInputCity(value);
      getCitiesApi(value)
        .then(result => {
          const cities = result.map(item => item.name)
          setOptions(cities)
        })
        .catch(() => {
          setShowError(true);
        })
    } else {
      setOptions([]);
      setCityWeather(undefined);
      setInputCity('');
    }
  }, 400);

  return (
    <>
      <GoToFavoriteButton/>

      <form onSubmit={handleSearchWeather}>
        <Autocomplete
          autoComplete
          freeSolo
          options={options}
          id={'Choose a city'}
          onInputChange={getCities}
          onChange={(evt, newValue) => {
            if (newValue) {
              setSelectedCity(newValue.split(', ')[0]);
              handleSearchWeather(evt, newValue.split(', ')[0]);
              setInputCity(newValue.split(', ')[0]);
            } else {
              setSelectedCity('');
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={'Choose a city'}
              InputProps={{
                ...params.InputProps,
              }}
              inputProps={{
                ...params.inputProps,
              }}
              margin="normal"
            />
          )}
        />
        <Button
          type={'submit'}
          variant="contained"
          disabled={inputCity.length < 2}
        >
          Search
        </Button>
      </form>
      {cityWeather && selectedCity.length ? <WeatherCard cityWeather={cityWeather}/> : null}
      {showError && <p>Something went wrong. Please try later.</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </>
  )
}
