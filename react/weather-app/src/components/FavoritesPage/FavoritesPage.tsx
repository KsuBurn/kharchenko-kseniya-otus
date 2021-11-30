import React, {FC, useState} from 'react';
import {getFromLocalstorage} from '../../utils/getFromLocalstorage';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import {getCurrentWeatherData} from '../../api/getCurrentWeatherData';
import {normalizeCurrentWeather} from '../../utils/normalizeWeather';
import {WeatherCard} from '../WeatherCard/WeatherCard';
import ListItemButton from '@mui/material/ListItemButton/';

export const FavoritesPage: FC = () => {
  const [cityWeather, setCityWeather] = useState();

  const favoritesCities = JSON.parse(getFromLocalstorage('cities'));

  const handleClick = (item) => {
    getCurrentWeatherData(item)
      .then(result => {
        setCityWeather(normalizeCurrentWeather(result))
      })
      .catch(error => console.error('Error', error));
  }

  return (
    <>
      <List>
        {favoritesCities.map((item) => (
          <ListItemButton key={item} onClick={() => handleClick(item)}>
            <ListItemText primary={item} />
          </ListItemButton>
        ))}
      </List>
      {cityWeather && <WeatherCard cityWeather={cityWeather}/>}
    </>
  )
}
