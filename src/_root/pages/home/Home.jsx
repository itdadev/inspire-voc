// NOTE: 메인 화면 부모 컴포넌트입니다. 섹션 1, 2, 3을 import합니다.
import React from 'react';
import styled from '@emotion/styled';
import { image } from '@/theme';
import { ImageFigure } from '@/components/ui/item';
import { Main } from '@/_root/pages/main';

const Container = styled.div(() => ({
  minHeight: '100vh',
}));

const Home = () => {
  return (
    <Container>
      <ImageFigure src={image.bannerImage} alt="" ratio="9 / 2" local />

      <Main />
    </Container>
  );
};

export default Home;
