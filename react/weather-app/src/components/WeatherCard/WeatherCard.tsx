import React, {FC} from 'react';
import Card from '@mui/material/Card';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import {NavLink} from 'react-router-dom';
import {addToLocalstorage} from '../../utils/addToLocalstorage';
import {getFromLocalstorage} from '../../utils/getFromLocalstorage';

export const WeatherCard: FC<any> = ({cityWeather}) => {
  const {
    cityName,
    date,
    temperature,
    perceivedTemperature,
    humidity,
    weather,
    windSpeed,
    lat,
    lon
  } = cityWeather;

  const addToFavorite = () => {
    const favoritesCities = JSON.parse(getFromLocalstorage('cities'));

    if (!favoritesCities) {
      addToLocalstorage('cities', JSON.stringify([cityName]));
    }

    if (favoritesCities && !favoritesCities.find(item => item === cityName)) {
      addToLocalstorage('cities', JSON.stringify([...favoritesCities, cityName]));
    }
  };

  return (
    <Card variant="outlined">
      <NavLink
        to={`/weather/${cityName}`}
        state={{
          cityName,
          lat,
          lon
        }}
      >
        <h3>{cityName}</h3>
      </NavLink>
      <p>{date}</p>
      <p>{temperature}&#176;C</p>
      {weather.map(item => (
        <div>
          <img src={`https://openweathermap.org/img/wn/${item.icon}.png`} alt=""/>
          <p key={item.id}>{item.description}</p>
        </div>
      ))}
      <p>Feel likes {perceivedTemperature}&#176;C</p>
      <p>Humidity {humidity}%</p>
      <div>
        Wind {windSpeed} m/s
      </div>
      <FavoriteTwoToneIcon onClick={addToFavorite}/>
    </Card>
  )
}
