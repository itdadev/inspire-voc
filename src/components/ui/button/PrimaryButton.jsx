import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Container = styled.button(({ theme, thick }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontWeight: theme.fontWeight.medium,
  background: theme.color.point01,
  borderRadius: '1.2rem',
  width: '100%',
  padding: thick === 'true' ? '2rem' : '1rem 0',
}));

const ContainerLink = styled(Link)(({ theme, thick }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontWeight: theme.fontWeight.medium,
  background: theme.color.point01,
  borderRadius: '1rem',
  maxWidth: '32rem',
  width: '100%',
  padding: thick === 'true' ? '2rem' : '1rem 0',
}));

const PrimaryButton = ({ children, linkTo, thick, buttonType = 'button', clickEvent }) => {
  return linkTo ? (
    <ContainerLink to={linkTo} thick={thick ? 'true' : 'false'}>
      {children}
    </ContainerLink>
  ) : (
    <Container thick={thick ? 'true' : 'false'} buttonType={buttonType} onClick={clickEvent}>
      {children}
    </Container>
  );
};

export default PrimaryButton;
