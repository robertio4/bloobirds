import React, { useEffect, useRef } from 'react';

import { IconButton } from '@bloobirds-it/flamingo-ui';
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';

import styles from './searchBar.module.css';

interface SearchBarProps {
  handleChange: (value: string) => void;
  value?: string;
  placeholder?: string;
  updateRefDependencies?: any[];
  updateRefFunction?: () => string;
}

interface InputPropsInterface {
  endAdornment: JSX.Element;
  className: string;
  placeholder?: string;
}
const SearchBar = ({
  handleChange,
  value,
  placeholder,
  updateRefDependencies = [],
  updateRefFunction,
}: SearchBarProps) => {
  const ref = useRef(null);
  let inputProps: InputPropsInterface = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          name="search"
          size={18}
          color="peanut"
          onClick={() => handleChange(ref.current.value)}
        />
      </InputAdornment>
    ),
    className: styles._input,
  };

  useEffect(() => {
    if (updateRefFunction && typeof updateRefFunction === 'function') {
      ref.current.value = updateRefFunction();
    }
  }, updateRefDependencies);

  if (placeholder) {
    inputProps = {
      ...inputProps,
      placeholder,
    };
  }

  return (
    <TextField
      fullWidth
      variant="outlined"
      onChange={() => handleChange(ref.current.value)}
      InputProps={inputProps}
      inputRef={ref}
      value={value}
      style={{ backgroundColor: 'white', marginRight: 16 }}
    />
  );
};

export default SearchBar;
