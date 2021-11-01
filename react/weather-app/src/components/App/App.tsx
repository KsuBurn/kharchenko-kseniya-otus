import React, {FC, useEffect, useState} from 'react';
import styles from './App.module.css'
import {BrowserRouter as Router, Route, NavLink, Routes} from 'react-router-dom';
import {Main} from '../Main/Main';
import {WeatherPage} from '../WeatherPage/WeatherPage';
import {ErrorPage} from '../ErrorPage/ErrorPage';
import {FavoritesPage} from '../FavoritesPage/FavoritesPage';

export const App: FC = () => {


  return (
    <Router>
      <div className={styles.wrap}>
        <h2>Приложение погоды</h2>
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
