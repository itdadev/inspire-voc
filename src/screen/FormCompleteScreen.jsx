import React, { useCallback } from 'react';
import styled from '@emotion/styled';

import { PrimaryButton } from '@/components/ui/button';
import { CommonDescOne, CommonTitleOne } from '@/components/ui/text/CommonTexts';
import { LOCAL_STORAGE_LANGUAGE } from '@/constants/storageKey';
import {
  SuccessSubmitMessage1Text,
  SuccessSubmitMessage2Text,
  VisitWebsiteText,
} from '@/lib/react-intl/TranslatedTexts';

const Container = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8rem 0',
  textAlign: 'center',
  padding: '8rem 1.6rem',
}));

const ButtonWrapper = styled.div(() => ({
  maxWidth: '50rem',
  width: '100%',
}));

const FormCompleteScreen = () => {
  const lang = localStorage.getItem(LOCAL_STORAGE_LANGUAGE) || 'en';

  const goToWebsite = useCallback(() => {
    window.open(`https://www.inspirekorea.com/${lang}`, '_blank', 'noopener, noreferrer');
  }, [lang]);

  return (
    <Container>
      <CommonTitleOne>
        <SuccessSubmitMessage1Text />
      </CommonTitleOne>

      <CommonDescOne>
        <p>
          <SuccessSubmitMessage2Text />
        </p>
      </CommonDescOne>

      <ButtonWrapper>
        <PrimaryButton clickEvent={goToWebsite} thick>
          <VisitWebsiteText />
        </PrimaryButton>
      </ButtonWrapper>
    </Container>
  );
};

export default FormCompleteScreen;
