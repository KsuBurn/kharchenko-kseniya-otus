import React, {FC, useState} from 'react';
import {getFromLocalstorage} from '../../utils/getFromLocalstorage';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import {getCurrentWeatherData} from '../../api/getCurrentWeatherData';
import {normalizeCurrentWeather} from '../../utils/normalizeWeather';
import {WeatherCard} from '../WeatherCard/WeatherCard';
import ListItemButton from '@mui/material/ListItemButton/';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {addToLocalstorage} from '../../utils/addToLocalstorage';
import {CurrentWeatherData} from '../../types/types';

export const FavoritesPage: FC = () => {
  const [cityWeather, setCityWeather] = useState<CurrentWeatherData | undefined>();
  const [favoritesCities, setFavoritesCities] = useState(JSON.parse(getFromLocalstorage('cities')))

  const handleClick = (item) => {
    getCurrentWeatherData(item)
      .then(result => {
        setCityWeather(normalizeCurrentWeather(result))
      })
      .catch(error => console.error('Error', error));
  }

  const deleteFromFavorite = (cityName: string) => {
    const resultFavoriteCities = favoritesCities.filter(item => item !== cityName)
    addToLocalstorage('cities', JSON.stringify(resultFavoriteCities));
    setFavoritesCities(resultFavoriteCities);
  }

  return (
    <>
      <List>
        {favoritesCities.map((item) => (
          <ListItemButton key={item} onClick={() => handleClick(item)}>
            <ListItemText primary={item} />
            <IconButton edge="end" aria-label="delete" onClick={(evt) => {
              deleteFromFavorite(item);
              evt.stopPropagation();
            }}>
              <DeleteIcon />
            </IconButton>
          </ListItemButton>
        ))}
      </List>
      {cityWeather && <WeatherCard cityWeather={cityWeather}/>}
    </>
  )
}
