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
import citiesData from '../../api/city.list.json';
import _debounce from 'lodash/debounce';
import styles from '../Input/Input.module.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export const Main: FC = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [inputCountry, setInputCountry] = useState('');

  const [citiesList, setCitiesList] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [inputCity, setInputCity] = useState('');

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = useState([])
  const [cityWeather, setCityWeather] = useState();

  const [error, setError] = useState('');

  // useEffect(() => {
  //   getCountriesApi()
  //     .then(result => setCountriesList(result))
  //     .catch(error => {
  //       setCountriesList([])
  //       console.error('error', error)
  //     });
  //
  // }, [])
  //
  // useEffect(() => {
  //   if (selectedCountry.length) {
  //     getCitiesApi(selectedCountry)
  //       .then(result => setCitiesList(result))
  //       .catch(error => {
  //         setCitiesList([])
  //         console.error('error', error)
  //       });
  //   }
  // }, [selectedCountry])

  const handleSearchWeather = () => {
    getCurrentWeatherData(selectedCity)
      .then(result => {
        console.log('result', result)
        setCityWeather(normalizeCurrentWeather(result))
        // if (result.cod.toString() === '404') {
        //   setError(result.message);
        //   setCityWeather(undefined);
        // }
        //
        // if (result.cod.toString() === '200') {
        //   setCityWeather(normalizeCurrentWeather(result))
        //   setError('');
        // }
      })
      .catch(error => console.log('error', error));

  }

  const getCities = _debounce((evt) => {
    if (evt.target.value.length) {
      getCitiesApi(evt.target.value)
        .then(result => {
          setCitiesList(result)
          const cities = result.map(item => item.name)
          setOptions(cities)
        })
        .catch((err) => console.log('error', err))
    }

    setCitiesList([]);
    setOptions([]);
  }, 400)


  useEffect(() => {
    console.log('open', open)
    if (!open && options.length) {
      setOpen(true)
    }
    setOpen(false)
  }, [options])

  return (
    <>
      <GoToFavoriteButton/>

      <Autocomplete
        autoSelect
        blurOnSelect
        autoHighlight
        freeSolo
        className={styles.input}
        options={options}
        id={'Choose a city'}
        onInputChange={getCities}
        onChange={(evt, newValue) => {
          console.log('newValue', newValue.split(', ')[0])
          if (newValue) {
            setSelectedCity(newValue.split(', ')[0])
          }
        }}
        // open={open}
        // onOpen={() => {
        //   setOpen(true);
        // }}
        // onClose={() => {
        //   setOpen(false);
        // }}
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

      {/*<Input*/}
      {/*  placeholder={'Choose a country'}*/}
      {/*  onChange={(evt: any, newValue) => {*/}
      {/*    console.log('HERE')*/}
      {/*    if (newValue) {*/}
      {/*      setSelectedCountry(newValue.name)*/}
      {/*      setInputCountry(newValue.name)*/}
      {/*      setSelectedCity('')*/}
      {/*      return;*/}
      {/*    }*/}

      {/*    setSelectedCountry('');*/}
      {/*    setSelectedCity('');*/}
      {/*    setCityWeather(undefined);*/}
      {/*    setError('');*/}
      {/*    setInputCity('')*/}
      {/*    setInputCountry('')*/}
      {/*  }}*/}

      {/*  onInputChange={(evt, value) => setInputCountry(value)}*/}
      {/*  options={countriesList.map((item) => ({name: item.name, flag: item.flag}))}*/}
      {/*  value={inputCountry}*/}
      {/*  countriesList={countriesList}*/}
      {/*  getOptionLabel={(option: any) => option.name}*/}
      {/*  renderOption={(props, option) => (*/}
      {/*    <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>*/}
      {/*      <img*/}
      {/*        loading="lazy"*/}
      {/*        width="20"*/}
      {/*        src={option.flag}*/}
      {/*        alt=""*/}
      {/*      />*/}
      {/*      {option.name}*/}
      {/*    </Box>*/}
      {/*  )}*/}
      {/*/>*/}

      {/*<Input*/}
      {/*  placeholder={'Choose a city'}*/}
      {/*  options={citiesList.map((item) => item)}*/}
      {/*  disabled={!selectedCountry.length}*/}
      {/*  onChange={(evt: any, newValue) => {*/}
      {/*    if (newValue) {*/}
      {/*      setSelectedCity(newValue);*/}
      {/*      setInputCity(newValue);*/}
      {/*      return;*/}
      {/*    }*/}

      {/*    setSelectedCity('');*/}
      {/*    setCityWeather(undefined);*/}
      {/*    setError('');*/}
      {/*    setInputCity('')*/}
      {/*  }}*/}
      {/*  value={inputCity}*/}
      {/*  onInputChange={(evt, value) => setInputCity(value)}*/}
      {/*/>*/}
      <Button
        variant="contained"
        onClick={handleSearchWeather}
        disabled={!selectedCity.length}
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
