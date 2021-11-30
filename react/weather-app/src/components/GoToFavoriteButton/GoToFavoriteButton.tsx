import React, {FC, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {NavLink} from 'react-router-dom';
import {getFromLocalstorage} from '../../utils/getFromLocalstorage';
import Tooltip from '@mui/material/Tooltip';
import styles from './GoToFavoriteButton.module.css';

export const GoToFavoriteButton: FC = () => {
  const [open, setOpen] = React.useState(false);
  const [isFavoriteCities, setIsFavoriteCities] = useState(false);

  const favoritesCities = JSON.parse(getFromLocalstorage('cities'));

  const handleClick = (evt) => {
    if (!favoritesCities || !favoritesCities.length) {
      evt.preventDefault()
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    if (!favoritesCities || !favoritesCities.length) {
      setOpen(true);
    }
  };

  useEffect(() => {

  }, [])

  return (
    <Tooltip
      open={open}
      title="No cities have been added to favorites"
      onClose={handleClose}
      onOpen={handleOpen}
    >
      <NavLink to={'/favorite'} onClick={handleClick} className={styles.wrap}>
        <Button
          size="small"
          variant="contained"
          startIcon={<FavoriteIcon/>}
          disabled={!favoritesCities || !favoritesCities.length}>
          Favorites
        </Button>
      </NavLink>
    </Tooltip>
  )
}