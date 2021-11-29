import {FC} from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {NavLink} from 'react-router-dom';

export const GoHomeButton: FC = () => (
  <NavLink
    to={`/`}
  >
    <Button variant="contained" startIcon={<ArrowBackIcon />}>
      Go home
    </Button>
  </NavLink>
)
