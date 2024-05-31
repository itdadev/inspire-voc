// NOTE: 메인 화면 부모 컴포넌트입니다. 섹션 1, 2, 3을 import합니다.
import React from 'react';
import styled from '@emotion/styled';
import { Main } from '@/_root/pages/main';
import Banner from '../../../components/shared/banner/Banner';

const Container = styled.div(() => ({
  minHeight: '100vh',
}));

const Home = () => {
  return (
    <Container>
      <Banner />

      <Main />
    </Container>
  );
};

export default Home;
