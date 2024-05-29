import React, { useRef, useState } from 'react';
import { image } from '@/theme';
import { LanguageModal } from '@/components/shared/Header/index';
import styled from '@emotion/styled';

const Container = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '2rem 12rem',
  background: 'white',
  borderBottom: `2px solid ${theme.color.point01}`,
}));

const Header = () => {
  const langModalRef = useRef(null);

  const [languageModal, setLanguageModal] = useState(false);

  return (
    <Container>
      <a href="https://inspirekorea.com/ja" target="_blank" rel="noreferrer">
        <img src={image.logo.default} alt="Inspire Entertainment Resort" height={54} />
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
