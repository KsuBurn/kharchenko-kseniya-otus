import React, {FC} from 'react';
import styles from './EasyWeatherCard.module.css';
import Card from '@mui/material/Card';
import {DayWeather} from '../../../types/types';

type EasyWeatherCardPropsType = {
  dayWeather: DayWeather;
};

export const EasyWeatherCard: FC<EasyWeatherCardPropsType> = ({dayWeather}) => {
  const {minTemperature, maxTemperature, weather, humidity, windSpeed, date} = dayWeather;
  return (
    <Card variant="outlined" className={styles.wrap}>
      <p className={styles.date}>{date}</p>
      <div className={styles.mainWeather}>
        <p className={styles.temperature}>
          {minTemperature}&#176;C...{maxTemperature}&#176;C
        </p>
        <div>
          <div className={styles.weather}>
            <img src={weather.icon} alt=""/>
            <p>{weather.description}</p>
          </div>
        </div>
      </div>
      <div className={styles.additionalWeather}>
        <p className={styles.additionalWeatherItem}>Humidity {humidity}%</p>
        <p className={styles.additionalWeatherItem}>
          Wind {windSpeed} m/s
        </p>
      </div>
    </Card>
  )
}
