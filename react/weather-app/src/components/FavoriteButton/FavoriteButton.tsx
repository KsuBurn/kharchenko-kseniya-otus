import React, {FC, useEffect, useState} from 'react';
import clsx from 'clsx';
import styles from './FavoriteButton.module.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {getFromLocalstorage} from '../../utils/getFromLocalstorage';
import {addToLocalstorage} from '../../utils/addToLocalstorage';

type FavoriteButtonPropsType = {
  cityName: string;
};

export const FavoriteButton: FC<FavoriteButtonPropsType> = ({ cityName }) => {
  const favoritesCities = JSON.parse(getFromLocalstorage('cities'));

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    if (!isFavorite) {
      if (!favoritesCities) {
        addToLocalstorage('cities', JSON.stringify([cityName]));
      }

      if (favoritesCities && !favoritesCities.find(item => item === cityName)) {
        addToLocalstorage('cities', JSON.stringify([...favoritesCities, cityName]));
      }
    }

    if (isFavorite) {
      const resultFavoriteCities = favoritesCities.filter(item => item !==cityName)
      addToLocalstorage('cities', JSON.stringify(resultFavoriteCities));
    }

    setIsFavorite(prevState => !prevState)
  };

  useEffect(() => {
    setIsFavorite(favoritesCities && favoritesCities.find(item => item === cityName))
  }, [cityName])

  return (
    <FavoriteIcon
      onClick={toggleFavorite}
      className={clsx({
        [styles.favoriteIcon]: true,
        [styles.activeFavoriteIcon]: isFavorite
      })}
    />
  )
}