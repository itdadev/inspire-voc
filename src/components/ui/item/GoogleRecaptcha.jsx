import React from 'react';
import { ReCAPTCHA } from 'react-google-recaptcha';

const GoogleRecaptcha = () => {
  function onChange(value) {
    console.log('Captcha value:', value);
  }

  return (
    <div>
      <ReCAPTCHA sitekey="6Ld6MQIqAAAAAD1aNTCmYQi9zwLFItP35CYWza6S" onChange={onChange} />
    </div>
  );
};

export default GoogleRecaptcha;
