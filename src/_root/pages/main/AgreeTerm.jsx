import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { Controller } from 'react-hook-form';
import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
import { useIntl } from 'react-intl';
import { PrivacyPolicyText } from '@/lib/react-intl/TranslatedTexts';

const Container = styled.div(() => ({
  minHeight: '4.8rem',
}));

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
  gap: '1rem',
  flexWrap: 'wrap',
}));

const KeepInTouchFormTermsOfUse = styled.button(({ theme }) => ({
  borderBottom: `1px solid ${theme.color.grey01}`,
}));
const AgreeTerm = ({ control, errors, setPrivacyPolicyOpen }) => {
  const intl = useIntl();

  const openTerms = useCallback(() => {
    setPrivacyPolicyOpen(true);
  }, [setPrivacyPolicyOpen]);

  return (
    <Container>
      <CheckBoxWrapper>
        <Wrapper>
          <Controller
            control={control}
            name="agreeToTerm"
            render={({ field }) => {
              return (
                <FormControlLabel
                  value={field.value}
                  control={<Checkbox {...field} checked={field.value} />}
                  label={intl.formatMessage({
                    id: 'lang-agree-privacy-policy-text',
                  })}
                />
              );
            }}
          />

          <KeepInTouchFormTermsOfUse type="button" onClick={openTerms}>
            <PrivacyPolicyText />
          </KeepInTouchFormTermsOfUse>
        </Wrapper>
      </CheckBoxWrapper>

      <FormHelperText error>{errors.agreeToTerm ? errors.agreeToTerm.message : ''}</FormHelperText>
    </Container>
  );
};

export default AgreeTerm;
