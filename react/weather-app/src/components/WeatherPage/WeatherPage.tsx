import React, {FC, useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {normalizeDailyWeather} from '../../utils/normalizeWeather';
import {EasyWeatherCard} from '../EasyWeatherCard/EasyWeatherCard';
import {FavoriteButton} from '../FavoriteButton/FavoriteButton';
import styles from './WeatherPage.module.css';
import {getDailyWeatherData} from '../../api/getDailyWeatherData';

export const WeatherPage: FC = (props) => {
  const {cityName} = useParams()
  const {state} = useLocation()
  const [dailyWeather, setDailyWeather] = useState<any>();

  useEffect(() => {
    getDailyWeatherData({lat: state.lat, lon: state.lon})
      .then(result => {
        setDailyWeather(normalizeDailyWeather(result, cityName))
      })
      .catch(error => console.error('error', error));
  }, [])

  return (
    <div>
      <div className={styles.pageHead}>
        <h2 className={styles.title}>{cityName}</h2>
        <FavoriteButton cityName={cityName} />
      </div>
      {dailyWeather && dailyWeather.daily.map(item => (
        <EasyWeatherCard
          temperature={item.temperature}
          weather={item.weather}
          perceivedTemperature={item.perceivedTemperature}
          humidity={item.humidity}
          windSpeed={item.windSpeed}
          date={item.date}
        />
      ))}
    </div>
  )
}
