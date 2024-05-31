import React, { useMemo, useRef, useState } from 'react';
import { image } from '@/theme';
import { LanguageModal } from '@/components/shared/Header/index';
import styled from '@emotion/styled';
import { mq } from '@/lib/react-responsive/mediaQuery';
import { LOCAL_STORAGE_LANGUAGE } from '@/constants/storageKey';

const Container = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'white',
  borderBottom: `2px solid ${theme.color.point01}`,
  padding: '2rem 1.6rem',

  [mq('desktop')]: {
    padding: '2rem 12rem',
  },

  img: {
    height: '3.2rem',

    [mq('desktop')]: {
      height: '5.4rem',
    },
  },
}));

const Header = () => {
  const language = localStorage.getItem(LOCAL_STORAGE_LANGUAGE);

  const changedLanguage = useMemo(() => {
    if (language === 'zh_hans') {
      return 'zh-hans';
    }

    if (language === 'zh_hant') {
      return 'zh-hant';
    }

    return language;
  }, [language]);

  const langModalRef = useRef(null);

  const [languageModal, setLanguageModal] = useState(false);

  return (
    <Container>
      <a href={`https://inspirekorea.com/${changedLanguage}`} target="_blank" rel="noreferrer">
        <img src={image.logo.default} alt="Inspire Entertainment Resort" />
      </a>

      <LanguageModal
        languageModal={languageModal}
        setLanguageModal={setLanguageModal}
        langModalRef={langModalRef}
      />
    </Container>
  );
};

export default Header;
