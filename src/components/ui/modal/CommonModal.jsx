import React, { memo, useCallback, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Fade, Modal } from '@mui/material';
import styled from '@emotion/styled';

import { image } from 'src/theme';
import { DangerouslyHtml } from '@/components/ui/item';
import { mq } from '@/lib/react-responsive/mediaQuery';
import { CommonTitleTwo } from '@/components/ui/text/CommonTexts';

const Container = styled.div(({ noPadding, width }) => ({
  width: '100%',
  padding: noPadding ? 0 : '1.6rem',
  background: 'white',
  borderRadius: '1.5rem',

  [mq('desktop')]: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflowY: 'auto',
    maxHeight: '80vh',
    minWidth: '40rem',
    maxWidth: '90%',
    width: width ? width : 'fit-content',
    padding: noPadding ? 0 : '3rem',
  },
}));

export const Wrapper = styled.div(() => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',

  [mq('desktop')]: {
    width: 'fit-content',
    minWidth: '50rem',
  },
}));

export const Contents = styled.div(() => ({
  position: 'relative',
  height: '100%',
}));

export const TitleWrapper = styled.div(() => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '2rem',
  maxWidth: '80%',

  [mq('desktop')]: {
    alignItems: 'flex-start',
    marginBottom: '4rem',
  },
}));

export const CloseButton = styled.div(() => ({
  position: 'absolute',
  width: 'fit-content',
  top: '2rem',
  right: '3.2rem',
  zIndex: 80,
  padding: '.25rem',

  img: {
    cursor: 'pointer',
  },
}));

const CommonModal = ({
  modalName,
  description,
  openModal,
  setOpenModal,
  children,
  noHeader,
  noPadding,
  noName,
  whiteClose,
}) => {
  const isDesktop = useMediaQuery({ minWidth: 1200 });

  const handleClose = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  useEffect(() => {
    const escKeyModalClose = (e) => {
      if (e.keyCode === 27) {
        // close modal when press Esc button.
        e.preventDefault();

        if (setOpenModal) {
          setOpenModal(false);
        }
      }
    };

    document.addEventListener('keyup', escKeyModalClose);
    return () => document.removeEventListener('keyup', escKeyModalClose);
  }, [setOpenModal]);

  return (
    <Modal
      open={openModal}
      closeAfterTransition
      onClose={handleClose}
      slotProps={{
        overlay: {
          timeout: 500,
        },
      }}
      aria-labelledby={modalName}
      aria-describedby={description}
    >
      <Fade in={openModal}>
        <Container noPadding={noPadding}>
          <CloseButton type="button">
            <img
              src={whiteClose ? image.modalCloseWhiteIcon.default : image.modalCloseIcon.default}
              alt="Close Modal"
              width={isDesktop ? 40 : 32}
              height={isDesktop ? 40 : 32}
              loading="lazy"
              onClick={handleClose}
            />
          </CloseButton>

          <Wrapper>
            {!noHeader && (
              <TitleWrapper>
                <CommonTitleTwo>
                  {noName ? <div></div> : <DangerouslyHtml value={modalName} />}
                </CommonTitleTwo>
              </TitleWrapper>
            )}

            <Contents>{children}</Contents>
          </Wrapper>
        </Container>
      </Fade>
    </Modal>
  );
};

export default memo(CommonModal);
