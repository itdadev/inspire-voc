import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import styled from '@emotion/styled';
import { FormHelperText } from '@mui/material';

const Container = styled.div(() => ({
  marginTop: '2rem',
}));
const GoogleRecaptcha = ({ errors, setValue }) => {
  const onChange = (value) => {
    console.log('Captcha value:', value);

    if (value !== null || value !== '') {
      setValue('captcha', true);
    }
  };

  return (
    <Container>
      <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_KEY} onChange={onChange} />

      {errors?.captcha && <FormHelperText error>{errors?.captcha.message}</FormHelperText>}
    </Container>
  );
};
export default GoogleRecaptcha;
