import { forwardRef } from 'react';
import { TextField } from '@mui/material';
import { mq } from '@/lib/react-responsive/mediaQuery';

const PhoneNumberInput = (props, ref) => {
  return (
    <TextField
      {...props}
      inputRef={ref}
      variant="outlined"
      margin="dense"
      fullWidth
      InputLabelProps={{
        sx: {
          fontSize: '1.4rem',

          [mq('desktop')]: {
            fontSize: '1.6rem',
          },
        },
      }}
    />
  );
};
export default forwardRef(PhoneNumberInput);
