import React, {FC} from 'react';
import styles from './EasyWeatherCard.module.css';
import Card from '@mui/material/Card';

export const EasyWeatherCard: FC<any> = ({temperature, weather, perceivedTemperature, humidity, windSpeed, date}) => {
  return (
      <Card variant="outlined" className={styles.wrap}>
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