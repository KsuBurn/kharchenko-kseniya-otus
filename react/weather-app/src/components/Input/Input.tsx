import {FC} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export const Input: FC = () => {
  return (
    <Autocomplete
      id="free-solo-demo"
      freeSolo
      options={['city1', 'city2'].map((item) => item)}
      renderInput={(params) => <TextField {...params} label="freeSolo" />}
    />
  )
}
