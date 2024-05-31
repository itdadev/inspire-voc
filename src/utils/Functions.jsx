import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LANGUAGE_LIST } from '@/constants/languages';
import { LOCAL_STORAGE_LANGUAGE } from '@/constants/storageKey';
import dayjs from 'dayjs';

const browserLanguageSwitch = () => {
  if (typeof navigator === 'undefined') {
    return undefined;
  }

  const lang = navigator && navigator.language && navigator.language.split('-')[0];

  if (!lang) return undefined;

  switch (lang) {
    case 'ja':
      return 'ja';

    case 'ko-KR':
      return 'ko';

    case 'ko':
      return 'ko';

    case 'zh':
      return 'zh_hans';

    case 'zh-CN':
      return 'zh_hans';

    case 'zh-TW':
      return 'zh_hant';

    case 'en':
      return 'en';

    default:
      return undefined;
  }
};

const checkLangIncludes = (code) => {
  let flag = false;

  for (let i = 0; i < LANGUAGE_LIST?.length; i++) {
    const language = LANGUAGE_LIST[i];

    if (code.includes(language.code)) {
      localStorage.setItem(LOCAL_STORAGE_LANGUAGE, language.code);

      flag = true;

      break;
    }
  }

  return flag;
};
export function useDefaultLanguage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const url = useLocation().pathname + '/';
  // const { ipInformation } = useIpInformation();

  const urlLang = url.split('/')[1];

  let code;

  useEffect(() => {
    if (code && code !== urlLang && !pathname.includes('/not-found')) {
      const replacedURL = `/${code}${url}/`;

      navigate(replacedURL.replace(/\/+$/, ''));
    }
  }, [code, url, urlLang, navigate, pathname]);

  if (urlLang !== '') {
    // IN CASE : If user entered language value after site url.
    code = checkLangIncludes(urlLang) ? urlLang : undefined;
  }

  if (
    code === undefined &&
    localStorage.getItem(LOCAL_STORAGE_LANGUAGE) !== undefined &&
    localStorage.getItem(LOCAL_STORAGE_LANGUAGE) !== null
  ) {
    // Check Local Storage
    code = checkLangIncludes(localStorage.getItem(LOCAL_STORAGE_LANGUAGE))
      ? localStorage.getItem(LOCAL_STORAGE_LANGUAGE)
      : undefined;
  }

  if (code === undefined) {
    // Check Browser Language
    code = browserLanguageSwitch();
  }
  return code;
}

export function switchSlashToEmptySpace(value) {
  if (typeof value === 'string' && value.includes('://')) {
    return value;
  } else if (typeof value === 'string') {
    return value.replaceAll('//', '<wbr/>');
  }
}

export function findLastFalseIndex(arr) {
  for (let i = arr?.length - 1; i >= 0; i--) {
    if (arr?.[i] === false) {
      return i;
    }
  }

  return -1;
}

export function getTimeIndex(arr, option2) {
  const today = dayjs();

  const formattedToday = today.format('YYYY-MM-DD');

  const now = dayjs(`${formattedToday} ${option2}:00`);

  const startTimeArr = arr?.map((time) => {
    const startTime = time.name.split(' ~ ')[0];

    const startDateFormat = `${formattedToday}T${startTime}:00+09:00`;

    return now.isBefore(dayjs(startDateFormat));
  });

  return findLastFalseIndex(startTimeArr);
}

export function changePrimaryFontFamily() {
  const lang = localStorage.getItem(LOCAL_STORAGE_LANGUAGE);

  switch (lang) {
    case 'en':
      return "'Noto Sans', sans-serif";

    case 'ko':
      return "'Noto Sans KR', sans-serif";

    case 'ja':
      return "'Noto Sans JP', sans-serif";

    case 'zh_hant':
      return "'Noto Sans SC', sans-serif";

    case 'zh_hans':
      return "'Noto Sans SC', sans-serif";

    default:
      return "'Noto Sans', sans-serif";
  }
}

export function changeSecondaryFontFamily() {
  const lang = localStorage.getItem(LOCAL_STORAGE_LANGUAGE);

  switch (lang) {
    case 'en':
      return "'Arsenal', sans-serif";

    case 'ko':
      return "'NanumSquare', 'Noto Sans KR', sans-serif";

    case 'ja':
      return "'Noto Sans JP', sans-serif";

    case 'zh_hant':
      return "'Noto Sans SC', sans-serif";

    case 'zh_hans':
      return "'Noto Sans SC', sans-serif";

    default:
      return "'Arsenal', sans-serif";
  }
}
