import React from 'react';
import { CommonModal } from '@/components/ui/modal/index';
import { DangerouslyHtml } from '@/components/ui/item';
import styled from '@emotion/styled';
import { mq, mqMax } from '@/lib/react-responsive/mediaQuery';
import { PrivacyPolicyText } from '@/lib/react-intl/TranslatedTexts';

const ModalWrapper = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '3rem 0',
  maxWidth: '80rem',
  textAlign: 'center',
}));

const ContentsWrapper = styled.section(({ theme, disableTopBorder }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem 0',
  marginBottom: '5.6rem',
  fontSize: '1.4rem',
  lineHeight: '1.5em',
  position: 'relative',
  margin: `${disableTopBorder ? '0' : '7.2rem 0'}`,

  [mq('mobile')]: {
    fontSize: '1.4rem',
  },

  [mq('desktop')]: {
    fontSize: '1.8rem',
  },

  p: {
    fontSize: 'inherit',
  },

  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    height: '0.2rem',
    background: 'rgb(151, 151, 151)',
    width: '25.6rem',
    marginTop: '-3.2rem',
    display: `${disableTopBorder ? 'none' : 'block'}`,
  },

  'h1, h2': {
    marginBottom: '2rem',
    lineHeight: '1.5em',
    fontWeight: 700,
    textTransform: 'uppercase',

    [mq('mobile')]: {
      fontSize: '2.4rem',
    },

    [mq('desktop')]: {
      fontSize: '4.8rem',
    },
  },

  h3: {
    marginBottom: '2rem',
    lineHeight: '1.5em',
    fontWeight: 600,

    [mq('mobile')]: {
      fontSize: '1.8rem',
    },

    [mq('desktop')]: {
      fontSize: '2rem',
    },
  },

  'ul, ol': {
    listStyle: 'initial',
    marginTop: '1rem',
    paddingLeft: '2rem',
    marginBottom: '2rem',

    '&>li': {
      fontSize: '1.6rem',
    },

    [mq('desktop')]: {
      paddingLeft: '4rem',

      '&>li': {
        fontSize: '1.8rem',
      },
    },
  },

  ul: {
    '&>li': {
      listStyle: 'initial',
    },
  },

  table: {
    width: '100%',
    minWidth: '60rem',
    height: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,

    overflow: 'hidden',

    tableLayout: 'fixed',

    '& thead': {
      background: theme.color.point01,
      color: theme.color.white,

      th: {
        borderTop: `1px solid ${theme.color.point03}`,
        fontWeight: theme.fontWeight.medium,

        '&:not(:last-of-type)': {
          padding: '2rem',
          borderRight: `1px solid ${theme.color.point03}`,
        },
      },
    },

    '& .fixed': {
      position: 'sticky',
      left: 0,
      zIndex: 2,
    },

    'th, td': {
      padding: '2rem 1.6rem',
      textAlign: 'center',
      borderRight: `1px solid ${theme.color.grey03}`,
      borderTop: `1px solid ${theme.color.grey03}`,
    },

    td: {
      background: theme.color.white,
    },
  },

  '.table-scroll-wrapper': {
    margin: '7.2rem 0',

    [mqMax('desktop')]: {
      overflowX: 'auto',
    },
  },

  '.table-scroll': {
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1rem 5rem',
    borderRadius: '2.5rem',
    overflow: 'hidden',
    [mqMax('desktop')]: {
      lineHeight: '1.4',
      fontWeight: '400',
      fontSize: '1.6rem',
      overflowWrap: 'normal',
      marginBottom: '5rem',
      border: '1px solid rgb(205, 204, 204)',

      overflowX: 'auto',
      background: 'rgb(255, 255, 255)',
    },
  },

  section: {
    '+ section': {
      marginTop: '3.2rem',
    },
  },
}));
const PrivacyPolicyModal = ({ openModal, setOpenModal }) => {
  return (
    <div>
      <CommonModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        fixCloseButton
        modalName={<PrivacyPolicyText />}
      >
        <ModalWrapper>
          <div style={{ width: '100%', textAlign: 'left' }}>
            <ContentsWrapper disableTopBorder={true}>
              <div>
                <DangerouslyHtml value="" />
              </div>
            </ContentsWrapper>
          </div>
        </ModalWrapper>
      </CommonModal>
    </div>
  );
};

export default PrivacyPolicyModal;
