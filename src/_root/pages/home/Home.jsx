// NOTE: 메인 화면 부모 컴포넌트입니다. 섹션 1, 2, 3을 import합니다.
import React from 'react';
import styled from "@emotion/styled";
import {Link} from "react-router-dom";

const Container = styled.div(({theme}) => ({
  color: theme.color.primary
}));

const Home = () => {
  return (
    <Container>
      Hello Developer!

      <div>
        <Link to="login">로그인</Link>
      </div>
    </Container>
  );
};

export default Home;