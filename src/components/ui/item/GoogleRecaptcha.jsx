import React from 'react';
import { ReCAPTCHA } from 'react-google-recaptcha';

const GoogleRecaptcha = () => {
  function onChange(value) {
    console.log('Captcha value:', value);
  }

  return <ReCAPTCHA sitekey="6Le90AIqAAAAAOG0wVRRbkIB5TgeOpV2X1uEtjAU" onChange={onChange} />;
};

export default GoogleRecaptcha;
