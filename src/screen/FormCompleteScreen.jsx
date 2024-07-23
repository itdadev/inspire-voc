import React, { useCallback, useEffect } from 'react';
import styled from '@emotion/styled';

import { PrimaryButton } from '@/components/ui/button';
import { CommonDescOne, CommonTitleOne } from '@/components/ui/text/CommonTexts';
import { LOCAL_STORAGE_LANGUAGE } from '@/constants/storageKey';
import {
  SuccessSubmitMessage1Text,
  SuccessSubmitMessage2Text,
  VisitWebsiteText,
} from '@/lib/react-intl/TranslatedTexts';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const { state } = useLocation();
  const navigate = useNavigate();

  const lang = localStorage.getItem(LOCAL_STORAGE_LANGUAGE) || 'en';

  const goToWebsite = useCallback(() => {
    window.open(`https://www.inspirekorea.com/${lang}`, '_blank', 'noopener, noreferrer');
  }, [lang]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (!state?.complete) {
      navigate('/not-found');
    }
  }, [state, navigate]);

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
