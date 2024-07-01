import React, { memo } from 'react';

import styled from '@emotion/styled';

import { CommonDescOne, CommonTitleOne } from '@/components/ui/text/CommonTexts';
import { PrimaryButton } from '@/components/ui/button';
import { Banner } from '@/components/shared/banner';
import {
  GotoVocText,
  NotFoundDesc1Text,
  NotFoundDesc2Text,
  NotFoundDesc3Text,
} from '@/lib/react-intl/TranslatedTexts';

const Container = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  paddingBottom: '10rem',
}));

const Information = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10rem 0',
  gap: '5rem 0',
  textAlign: 'center',
  whiteSpace: 'break-spaces',
}));

const ButtonWrapper = styled.div(() => ({
  width: '100%',
  padding: '0 1.6rem',
  display: 'flex',
  justifyContent: 'center',
}));

const NotFound = () => {
  return (
    <Container>
      <Banner />

      <Information>
        <CommonTitleOne>
          <NotFoundDesc1Text />
        </CommonTitleOne>

        <CommonDescOne>
          <p>
            <NotFoundDesc2Text />
          </p>

          <p>
            <NotFoundDesc3Text />
          </p>
        </CommonDescOne>
      </Information>

      <ButtonWrapper>
        <PrimaryButton linkTo={`/voc/bus/icn-t1`} thick>
          <GotoVocText />
        </PrimaryButton>
      </ButtonWrapper>
    </Container>
  );
};

export default memo(NotFound);
