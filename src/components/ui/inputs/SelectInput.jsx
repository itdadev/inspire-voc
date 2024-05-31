import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import styled from '@emotion/styled';
import { mq } from '@/lib/react-responsive/mediaQuery';

const StyledSelectInputContainer = styled.div(() => ({
  minHeight: '8rem',
  width: '100%',
}));

const StyledSelectInput = styled(Select)(() => ({
  flex: 1,
  minWidth: '10rem',
  width: '100%',
  maxHeight: '5.6rem',
  fontSize: '1.4rem',

  [mq('desktop')]: {
    fontSize: '1.6rem',
  },
}));

const SelectInput = (props) => {
  return (
    <StyledSelectInputContainer>
      <Controller
        control={props.control}
        name={props.name}
        render={({ field }) => {
          return (
            <FormControl error={!!props.errors[props.name]}>
              <InputLabel id={props.name}>{props.label}</InputLabel>

              <StyledSelectInput
                {...field}
                {...props}
                defaultValue=""
                label={props.label}
                placeholder={props.placeholder}
                MenuProps={{ disableScrollLock: true }}
              >
                {props.name === 'time_key' && props.arr === undefined && (
                  <MenuItem value="">Please select route first</MenuItem>
                )}

                {props.name === 'route_key' && props.arr === undefined && (
                  <MenuItem value="">Please select category first</MenuItem>
                )}

                {props.arr?.map((el) => {
                  return (
                    <MenuItem key={el.key} value={JSON.stringify(el.key)}>
                      {el.name}
                    </MenuItem>
                  );
                })}
              </StyledSelectInput>

              {props.errors[props.name] && (
                <FormHelperText>{props.errors[props.name].message}</FormHelperText>
              )}
            </FormControl>
          );
        }}
      />
    </StyledSelectInputContainer>
  );
};

export default SelectInput;
