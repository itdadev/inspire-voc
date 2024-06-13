import React, { memo } from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import styled from '@emotion/styled';
import { useIntl } from 'react-intl';

const TextInputWrapper = styled.div(({ textarea }) => ({
  minHeight: textarea ? '20rem' : '8rem',
  width: '100%',
}));

export const RequiredMark = styled.span(({ theme }) => ({
  marginLeft: '0.2rem',
  color: theme.color.red01,
}));
const TextInput = ({
  type = 'text',
  control,
  name,
  label,
  placeholder,
  onClick,
  customValue,
  maxLength,
  rows,
  multiline,
  required,
  inputmode,
}) => {
  const intl = useIntl();

  return (
    <TextInputWrapper textarea={multiline}>
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
              label={
                <>
                  {label}
                  {required && <RequiredMark>*</RequiredMark>}
                </>
              }
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
              placeholder={intl.formatMessage({
                id: placeholder,
              })}
              inputProps={{ maxLength: maxLength, inputMode: inputmode }}
            />
          );
        }}
      />
    </TextInputWrapper>
  );
};

export default memo(TextInput);
