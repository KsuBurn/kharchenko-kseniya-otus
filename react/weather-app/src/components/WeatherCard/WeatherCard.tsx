import React, {FC} from 'react';
import Card from '@mui/material/Card';
import {NavLink} from 'react-router-dom';
import styles from './WeatherCard.module.css';
import {FavoriteButton} from '../FavoriteButton/FavoriteButton';
import {CurrentWeatherData} from '../../types/types';

type WeatherCardPropsType = {
  cityWeather: CurrentWeatherData;
};

export const WeatherCard: FC<WeatherCardPropsType> = ({ cityWeather }) => {
  const {
    cityName,
    date,
    temperature,
    perceivedTemperature,
    humidity,
    weather,
    windSpeed,
  } = cityWeather;

  return (
    <Card variant="outlined" className={styles.wrap}>
      <div className={styles.favorite}>
        <FavoriteButton cityName={cityName}/>
      </div>
      <NavLink
        to={`/weather/${cityName}`}
      >
        <h2 className={styles.title}>{cityName}</h2>
      </NavLink>
      <p className={styles.date}>{date}</p>
      <div className={styles.mainWeather}>
        <p className={styles.temperature}>{temperature}&#176;C</p>
        <div>
          <div className={styles.weather}>
            <img src={weather.icon} alt=""/>
            <p>{weather.description}</p>
          </div>
        </div>
      </div>
      <div className={styles.additionalWeather}>
        <p className={styles.additionalWeatherItem}>Feel likes {perceivedTemperature}&#176;C</p>
        <p className={styles.additionalWeatherItem}>Humidity {humidity}%</p>
        <p className={styles.additionalWeatherItem}>
          Wind {windSpeed} m/s
        </p>
      </div>
    </Card>
  )
}
