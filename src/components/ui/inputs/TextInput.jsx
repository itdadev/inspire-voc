import React, { memo } from 'react';
import { Controller } from 'react-hook-form';
import { InputAdornment, TextField } from '@mui/material';
import styled from '@emotion/styled';

const TextInputWrapper = styled.div(() => ({
  minHeight: '8rem',
  width: '100%',
}));
const TextInput = ({
  type = 'text',
  control,
  name,
  label,
  placeholder,
  onClick,
  readOnly,
  endAdornment,
  customValue,
  maxLength,
  rows,
  multiline,
  required,
}) => {
  return (
    <TextInputWrapper>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ref, name }, formState: { errors } }) => {
          return (
            <TextField
              variant="outlined"
              autoComplete={type === 'password' ? 'new-password' : 'off'}
              margin="dense"
              type={type}
              label={label}
              rows={rows}
              onChange={onChange}
              onClick={onClick}
              value={customValue ? customValue : value}
              name={name}
              inputRef={ref}
              error={!!errors[name]}
              helperText={errors[name]?.message}
              fullWidth
              multiline={multiline}
              placeholder={placeholder}
              inputProps={{ maxLength: maxLength }}
              required={required}
              InputProps={{
                readOnly: readOnly,
                endAdornment: endAdornment && (
                  <InputAdornment position="end">{endAdornment}</InputAdornment>
                ),
              }}
            />
          );
        }}
      />
    </TextInputWrapper>
  );
};

export default memo(TextInput);
