import React, {FC} from 'react';
import Card from '@mui/material/Card';
import {NavLink} from 'react-router-dom';
import styles from './WeatherCard.module.css';
import {FavoriteButton} from '../FavoriteButton/FavoriteButton';

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
console.log('cityName', cityName)
  return (
    <Card variant="outlined" className={styles.wrap}>
      <div className={styles.favorite}>
        <FavoriteButton cityName={cityName} />
      </div>
      <NavLink
        to={`/weather/${cityName}`}
        state={{
          cityName,
          lat,
          lon
        }}
      >
        <h2 className={styles.title}>{cityName}</h2>
      </NavLink>
      <p className={styles.date}>{date}</p>
      <div className={styles.mainWeather}>
        <p className={styles.temperature}>{temperature}&#176;C</p>
        <div>
          {weather.map(item => (
            <div className={styles.weather} key={item}>
              {/*<img src={`https://openweathermap.org/img/wn/${item.icon}.png`} alt=""/>*/}
              <img src={item.icon} alt=""/>
              <p key={item.id}>{item.description}</p>
            </div>
          ))}
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
