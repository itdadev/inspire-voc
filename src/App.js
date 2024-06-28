import { Suspense, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from '@emotion/react';
import AppTheme from '@/theme';
import { createTheme } from '@mui/material';

import { Routers } from '@/_root';
import { Header } from '@/components/shared/Header';
import { LOCAL_STORAGE_LANGUAGE } from '@/constants/storageKey';
import { LoadingScreen } from '@/components/loading';
import { useDefaultLanguage } from '@/utils/Functions';
import enUSMsg from '@/utils/languages/en-US.json';
import koMsg from '@/utils/languages/ko.json';
import chHansMsg from '@/utils/languages/ch-hans.json';
import chHantMsg from '@/utils/languages/ch-hant.json';
import jaMsg from '@/utils/languages/ja.json';
import { Footer } from '@/components/shared/footer';

function App() {
  const customMuiTheme = createTheme(AppTheme);
  const defaultLanguage = useDefaultLanguage();

  const locale =
    localStorage.getItem(LOCAL_STORAGE_LANGUAGE) !== null
      ? localStorage.getItem(LOCAL_STORAGE_LANGUAGE)
      : defaultLanguage;

  const changedLocale = useMemo(() => {
    if (locale === 'zh_hans') {
      return 'zh-hans';
    }

    if (locale === 'zh_hant') {
      return 'zh-hant';
    }

    return locale;
  }, [locale]);

  const messages = {
    en: enUSMsg,
    ko: koMsg,
    zh_hans: chHansMsg,
    zh_hant: chHantMsg,
    ja: jaMsg,
  }[locale];

  return (
    defaultLanguage && (
      <IntlProvider locale={changedLocale} messages={messages} defaultLocale={defaultLanguage}>
        <ThemeProvider theme={customMuiTheme}>
          <div>
            <Header />

            <Suspense fallback={<LoadingScreen />}>
              <Routers />
            </Suspense>

            <Footer />
          </div>
        </ThemeProvider>
      </IntlProvider>
    )
  );
}

export default App;
