import React, {FC} from 'react';
import styles from './App.module.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Main} from '../Main/Main';
import {WeatherPage} from '../WeatherPage/WeatherPage';
import {ErrorPage} from '../ErrorPage/ErrorPage';
import {FavoritesPage} from '../FavoritesPage/FavoritesPage';
import {GoHomeButton} from '../GoHomeButton/GoHomeButton';

export const App: FC = () => {

  return (
    <Router>
      <div className={styles.wrap}>
        <div className={styles.appHead}>
          <h1>Weather app</h1>
          <GoHomeButton />
        </div>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/weather/:cityName' element={<WeatherPage />} />
          <Route path='/favorite' element={<FavoritesPage />} />
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
      </div>
    </Router>
  )
};
