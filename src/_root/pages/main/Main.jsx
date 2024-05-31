import React from 'react';
import styled from '@emotion/styled';

import { CommonDescOne, CommonTitleOne } from '@/components/ui/text/CommonTexts';
import { CommonContainer } from '@/components/ui/container';
import { VocForm } from '@/_root/pages/main/index';

import { PageDescriptionText, VoiceOfCustomerText } from '@/lib/react-intl/TranslatedTexts';

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
  whiteSpace: 'break-spaces',
  textAlign: 'center',
}));

const Main = () => {
  return (
    <CommonContainer>
      <Wrapper>
        <TitleWrapper>
          <CommonTitleOne>
            <VoiceOfCustomerText />
          </CommonTitleOne>

          <CommonDescOne>
            <PageDescriptionText />
          </CommonDescOne>
        </TitleWrapper>

        <VocForm />
      </Wrapper>
    </CommonContainer>
  );
};

export default Main;
