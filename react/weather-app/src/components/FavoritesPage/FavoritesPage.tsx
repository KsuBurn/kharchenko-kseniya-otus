import React, {FC, useState} from 'react';
import {getFromLocalstorage} from '../../utils/getFromLocalstorage';
import {GoHomeButton} from '../GoHomeButton/GoHomeButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {getCurrentWeatherData} from '../../api/getCurrentWeatherData';
import {normalizeCurrentWeather} from '../../utils/normalizeWeather';
import {WeatherCard} from '../WeatherCard/WeatherCard';

export const FavoritesPage: FC = () => {
  const [cityWeather, setCityWeather] = useState();

  const favoritesCities = JSON.parse(getFromLocalstorage('cities'));

  const handleClick = (item) => {
    getCurrentWeatherData(item)
      .then(result => {
        setCityWeather(normalizeCurrentWeather(result))
        console.log('result', normalizeCurrentWeather(result))
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div>
      <GoHomeButton />

      <List>
        {favoritesCities.map((item) => (
          <ListItem key={item} onClick={() => handleClick(item)}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>

      {cityWeather && <WeatherCard cityWeather={cityWeather}/>}

    </div>
  )
}
