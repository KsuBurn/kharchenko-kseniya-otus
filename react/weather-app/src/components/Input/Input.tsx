import {FC, ReactEventHandler} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import styles from './Input.module.css';
import React from 'react';

type InputPropsType = {
  placeholder: string;
  itemsList: any[]
  onSelect?: (evt: any) => void;
  onChange?: (evt: any, newValue: string ) => void;
  onInputChange?: (evt: any, newInputValue: string ) => void;
  options: any;
  disabled?: boolean
}

export const Input: FC<any> = ({onInputChange, onChange, disabled = false, placeholder, itemsList, onSelect, options}) => {
  return (
    <Autocomplete
      disabled={disabled}
      onSelect={onSelect}
      blurOnSelect
      autoHighlight
      freeSolo
      id={placeholder}
      disableClearable
      className={styles.input}
      options={options}
      onChange={onChange}
      onInputChange={onInputChange}
      renderInput={(params) => (
          <TextField
            {...params}
            label={placeholder}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}

            margin='normal'
          />
      )}
    />
  )
}
