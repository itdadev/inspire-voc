import React from 'react';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import {
  SuccessSumitMessage1Text,
  SuccessSumitMessage2Text,
} from '@/lib/react-intl/TranslatedTexts';

const SubmitSuccessAlert = ({ successSnackBar, setSuccessSnackBar }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessSnackBar(false);
  };

  return (
    <Snackbar
      open={successSnackBar}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
        <AlertTitle>
          <SuccessSumitMessage1Text />
        </AlertTitle>

        <p>
          <SuccessSumitMessage2Text />
        </p>
      </Alert>
    </Snackbar>
  );
};

export default SubmitSuccessAlert;
