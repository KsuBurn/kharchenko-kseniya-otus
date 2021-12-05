import {FC} from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {NavLink, useLocation} from 'react-router-dom';

export const GoHomeButton: FC = () => {
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }

  return (
    (
      <NavLink
        to={`/`}
      >
        <Button size="small" variant="contained" startIcon={<ArrowBackIcon />}>
          Go home
        </Button>
      </NavLink>
    )
  )
};
