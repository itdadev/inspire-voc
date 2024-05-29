import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { Controller } from 'react-hook-form';
import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';

const CheckBoxWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  color: theme.color.grey01,

  '> div': {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Wrapper = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '1rem',
}));

const KeepInTouchFormTermsOfUse = styled.button(({ theme }) => ({
  borderBottom: `1px solid ${theme.color.grey01}`,
}));
const AgreeTerm = ({ control, errors, setPrivacyPolicyOpen }) => {
  const openTerms = useCallback(() => {
    setPrivacyPolicyOpen(true);
  }, [setPrivacyPolicyOpen]);

  return (
    <>
      <CheckBoxWrapper>
        <Wrapper>
          <Controller
            control={control}
            name="agreeToTerm"
            render={({ field }) => {
              return (
                <FormControlLabel
                  control={<Checkbox onChange={field.onChange} name="agreeToTerm" />}
                  label="I agree to Terms and Conditions"
                />
              );
            }}
          />

          <KeepInTouchFormTermsOfUse type="button" onClick={openTerms}>
            Terms & Conditions
          </KeepInTouchFormTermsOfUse>
        </Wrapper>
      </CheckBoxWrapper>

      <FormHelperText error>{errors.agreeToTerm ? errors.agreeToTerm.message : ''}</FormHelperText>
    </>
  );
};

export default AgreeTerm;
