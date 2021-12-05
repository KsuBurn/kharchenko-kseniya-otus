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

  const [options, setOptions] = useState([])
  const [cityWeather, setCityWeather] = useState<CurrentWeatherData | undefined>();

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleSearchWeather = () => {
    getCurrentWeatherData(selectedCity)
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

  const getCities = _debounce((evt) => {
    if (showError) {
      setShowError(false);
    }
    if (evt.target.value && evt.target.value.length) {
      getCitiesApi(evt.target.value)
        .then(result => {
          const cities = result.map(item => item.name)
          setOptions(cities)
        })
        .catch(() => {
          setShowError(true);
        })
    } else {
      setOptions([]);
      setCityWeather(undefined)
    }
  }, 400);

  return (
    <>
      <GoToFavoriteButton/>

      <Autocomplete
        autoHighlight
        freeSolo
        options={options}
        id={'Choose a city'}
        onInputChange={getCities}
        onChange={(evt, newValue) => {
          if (newValue) {
            setSelectedCity(newValue.split(', ')[0]);
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
            margin="normal"
          />
        )}
      />
      <Button
        variant="contained"
        onClick={handleSearchWeather}
        disabled={!selectedCity.length}
      >
        Search
      </Button>
      {cityWeather && selectedCity.length ? <WeatherCard cityWeather={cityWeather}/> : null}
      {showError && <p>Something went wrong. Please try later.</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </>
  )
}
