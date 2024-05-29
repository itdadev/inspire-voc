import React, { memo, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { List, ListItemButton } from '@mui/material';

import { LANGUAGE_LIST } from '@/constants/languages';
import { LOCAL_STORAGE_LANGUAGE } from '@/constants/storageKey';
import { HEADER_LANGUAGE_MODAL_ZINDEX } from '@/constants/zIndex';
import { mq } from '@/lib/react-responsive/mediaQuery';
import styled from '@emotion/styled';

const LanguageContainer = styled.div(() => ({
  position: 'absolute',
  left: 0,
  zIndex: HEADER_LANGUAGE_MODAL_ZINDEX,
  wordBreak: 'keep-all',

  [mq('desktop')]: {
    background: 'white',
    borderRadius: '1rem',
    border: '1px solid #EEE',
    boxShadow:
      '0 0 0 0 rgba(0, 0, 0, 0.03), 0 8px 18px 0 rgba(0, 0, 0, 0.03), 0 33px 33px 0 rgba(0, 0, 0, 0.03), 0 75px 45px 0 rgba(0, 0, 0, 0.02)',
    minWidth: '16.4rem',
    left: 'auto',
    right: 0,
    marginTop: '0.8rem',
  },
}));

const LanguageHeader = styled.div(({ theme }) => ({
  textAlign: 'left',
  color: 'black',
  fontSize: '1.2rem',
  fontWeight: 700,
  letterSpacing: '0.01rem',
  display: 'none',
  textTransform: 'uppercase',
  padding: '1.6rem 0 0.8rem',
  margin: '0 1.6rem',
  borderBottom: '1px solid #D9D9D9',
  wordSpacing: '999em',
  lineHeight: '1.5',
  cursor: 'default',

  [mq('desktop')]: {
    display: 'block',
  },
}));

const Language = styled.button(() => ({
  position: 'relative',
  minWidth: '7.2rem',
  fontSize: '1.6rem',
  textAlign: 'right',
  color: 'black',
  zIndex: 1900,
  margin: '4rem 0 0 1rem',

  [mq('desktop')]: {
    margin: 0,
  },
}));

const LanguageIn = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0 0.6rem',
  paddingLeft: '1rem',
  wordBreak: 'keep-all',
}));

const ArrowDown = styled.div(({ theme }) => ({
  width: '1.5rem',
  height: '1rem',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${theme.image.downArrow.default})`,
}));

const LanguageModal = ({ langModalRef, languageModal, setLanguageModal }) => {
  const location = useLocation();

  const navigate = useNavigate();

  const handleLanguageSelect = useCallback(
    (code) => {
      localStorage.setItem(LOCAL_STORAGE_LANGUAGE, code);

      navigate(location.pathname.replace(location.pathname.split('/')[1], code));

      window.location.reload(false);
    },
    [location.pathname, navigate]
  );

  function useOutsideModalClicked(modalRef) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setLanguageModal(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [modalRef]);
  }

  useOutsideModalClicked(langModalRef);

  const handleToggleLanguageModal = useCallback(() => {
    setLanguageModal((prev) => !prev);
  }, [setLanguageModal]);

  const currentLanguage = localStorage.getItem(LOCAL_STORAGE_LANGUAGE)
    ? localStorage.getItem(LOCAL_STORAGE_LANGUAGE)
    : false;

  return (
    <Language onClick={handleToggleLanguageModal} ref={langModalRef}>
      <LanguageIn>
        {currentLanguage &&
          LANGUAGE_LIST?.filter((el) => el.code === localStorage.getItem(LOCAL_STORAGE_LANGUAGE))[0]
            .name}

        <ArrowDown />
      </LanguageIn>

      {languageModal && (
        <LanguageContainer>
          <LanguageHeader>switch language</LanguageHeader>

          <List component="div" aria-label="secondary mailbox folder">
            {LANGUAGE_LIST?.map((language) => {
              if (language.code !== currentLanguage) {
                return (
                  <ListItemButton
                    key={language.id}
                    onClick={() => handleLanguageSelect(language.code)}
                  >
                    <p>{language.name}</p>
                  </ListItemButton>
                );
              }

              return null;
            })}
          </List>
        </LanguageContainer>
      )}
    </Language>
  );
};

export default memo(LanguageModal);
