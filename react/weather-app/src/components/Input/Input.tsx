import {FC, ReactEventHandler} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import styles from './Input.module.css';
import React from 'react';
import Box from '@mui/material/Box';

type InputPropsType = {
  placeholder: string;
  itemsList: any[]
  onSelect?: (evt: any) => void;
  onChange?: (evt: any, newValue: string) => void;
  onInputChange?: (evt: any, newInputValue: string) => void;
  options: () => {};
  disabled?: boolean
}

export const Input: FC<any> = ({
                                 onChange,
                                 disabled = false,
                                 placeholder,
                                 onSelect,
                                 options,
                                 value,
                                 getOptionLabel,
                                 renderOption,
                                 onInputChange,
                               }) => {
  return (
    <Autocomplete
      onInputChange={onInputChange}
      blurOnSelect
      autoHighlight
      freeSolo
      className={styles.input}
      id={placeholder}
      disabled={disabled}
      onSelect={onSelect}
      options={options}
      onChange={onChange}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      renderInput={(params) => (
        <TextField
          {...params}
          label={placeholder}
          InputProps={{
            ...params.InputProps,
          }}
          margin="normal"
          inputProps={{
            ...params.inputProps,
            value: value,
          }}
        />
      )}
    />
  )
}
