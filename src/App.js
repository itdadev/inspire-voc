import { ThemeProvider } from '@emotion/react';

import { createTheme } from '@mui/material';
import AppTheme from '@/theme';

import { Header } from '@/components/shared/Header';
import { useDefaultLanguage } from '@/utils/Functions';
import { IntlProvider } from 'react-intl';

import enUSMsg from '@/utils/languages/en-US.json';
import koMsg from '@/utils/languages/ko.json';
import chHansMsg from '@/utils/languages/ch-hans.json';
import chHantMsg from '@/utils/languages/ch-hant.json';
import jaMsg from '@/utils/languages/ja.json';
import { LOCAL_STORAGE_LANGUAGE } from '@/constants/storageKey';
import { Routers } from '@/_root';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const customMuiTheme = createTheme(AppTheme);
  const defaultLanguage = useDefaultLanguage();

  const locale =
    localStorage.getItem(LOCAL_STORAGE_LANGUAGE) !== null
      ? localStorage.getItem(LOCAL_STORAGE_LANGUAGE)
      : defaultLanguage;

  const messages = {
    en: enUSMsg,
    ko: koMsg,
    'zh-hans': chHansMsg,
    'zh-hant': chHantMsg,
    ja: jaMsg,
  }[locale];

  useEffect(() => {
    navigate('/bus/myeong-dong_daerim/11:00');
  }, [navigate]);

  return (
    defaultLanguage && (
      <IntlProvider locale={locale} messages={messages} defaultLocale={defaultLanguage}>
        <ThemeProvider theme={customMuiTheme}>
          <div>
            <Header />

            <Routers />
          </div>
        </ThemeProvider>
      </IntlProvider>
    )
  );
}

export default App;
