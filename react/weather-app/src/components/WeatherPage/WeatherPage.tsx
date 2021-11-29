import {FC, useEffect, useState} from 'react';
import {API_KEY, WEATHER_URL} from '../../api/constant';
import {NavLink, useLocation, useParams} from 'react-router-dom';
import moment from 'moment';
import {normalizeDailyWeather} from '../../utils/normalizeWeather';
import {WeatherCard} from '../WeatherCard/WeatherCard';
import {GoHomeButton} from '../GoHomeButton/GoHomeButton';

export const WeatherPage: FC = (props) => {
  const {cityName} = useParams()
  const {state} = useLocation()
  const [dailyWeather, setDailyWeather] = useState<any>();

  useEffect(() => {
    fetch(`${WEATHER_URL}/onecall?lat=${state.lat}&lon=${state.lon}&exclude=minutely,alerts,hourly&units=metric&appid=${API_KEY}`)
      .then(response => response.json())
      .then(result => {
        setDailyWeather(normalizeDailyWeather(result, cityName))
        console.log('result', normalizeDailyWeather(result, cityName))
      })
      .catch(error => console.log('error', error));
  }, [])

  return (
    <div>
      <GoHomeButton />
      {dailyWeather && dailyWeather.daily.map(item => (
        <WeatherCard cityWeather={item}/>
      ))}
    </div>
  )
}
