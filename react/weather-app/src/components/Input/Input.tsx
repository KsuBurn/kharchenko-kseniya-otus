import {FC, ReactEventHandler} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import styles from './Input.module.css';
import React from 'react';

type InputPropsType = {
  placeholder: string;
  itemsList: any[]
  onSelect?: (evt: any) => void;
  onBlur?: (evt: any) => void;
  options: any;
}

export const Input: FC<InputPropsType> = ({placeholder, itemsList, onSelect, onBlur, options}) => {
  return (
    <Autocomplete
      onSelect={onSelect}
      blurOnSelect
      id={placeholder}
      freeSolo
      disableClearable
      className={styles.input}
      options={options}
      renderInput={(params) => (
          <TextField
            {...params}
            label={placeholder}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}

            onBlur={onBlur}
          />
      )}
    />
  )
}
