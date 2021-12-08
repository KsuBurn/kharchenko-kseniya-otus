import React, {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {normalizeDailyWeather} from '../../utils/normalizeWeather';
import {EasyWeatherCard} from './EasyWeatherCard/EasyWeatherCard';
import {FavoriteButton} from '../FavoriteButton/FavoriteButton';
import styles from './WeatherPage.module.css';
import {getDailyWeatherData} from '../../api/getDailyWeatherData';
import {DailyWeatherData} from '../../types/types';

export const WeatherPage: FC = () => {
  const {cityName} = useParams()
  const [dailyWeather, setDailyWeather] = useState<DailyWeatherData>();
  const [showError, setShowError] = useState(false);


  useEffect(() => {
    getDailyWeatherData(cityName)
      .then(result => {
        setDailyWeather(normalizeDailyWeather(result, cityName))
      })
      .catch(error => {
        setShowError(true);
        console.error(error);
      });
  }, [])

  if (showError) {
    return <p>Something went wrong. Please try later.</p>;
  }

  return (
    <div>
      <div className={styles.pageHead}>
        <h2 className={styles.title}>{cityName}</h2>
        <FavoriteButton cityName={cityName} />
      </div>
      {dailyWeather && dailyWeather.daily.map(item => (
        <EasyWeatherCard
          dayWeather={item}
        />
      ))}
    </div>
  )
}
