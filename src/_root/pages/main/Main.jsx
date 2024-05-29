import React from 'react';

import { CommonDescOne, CommonTitleOne } from '@/components/ui/text/CommonTexts';
import { CommonContainer } from '@/components/ui/container';
import styled from '@emotion/styled';
import VocForm from '@/_root/pages/main/VocForm';

const Wrapper = styled.div(() => ({
  padding: '8rem 0',
}));

const TitleWrapper = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2rem 0',
  marginBottom: '8rem',
}));

const Main = () => {
  return (
    <CommonContainer>
      <Wrapper>
        <TitleWrapper>
          <CommonTitleOne>Voice of Customer</CommonTitleOne>

          <CommonDescOne>
            At INSPIRE Entertainment Resort, we value the feedback and voices of our guests through
            our dedicated Customer Center.
          </CommonDescOne>
        </TitleWrapper>

        <VocForm />
      </Wrapper>
    </CommonContainer>
  );
};

export default Main;
