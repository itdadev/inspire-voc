import { forwardRef } from 'react';
import { TextField } from '@mui/material';

const PhoneNumberInput = (props, ref) => {
  return <TextField {...props} inputRef={ref} variant="outlined" margin="dense" fullWidth />;
};
export default forwardRef(PhoneNumberInput);
