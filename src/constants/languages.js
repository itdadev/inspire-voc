import chHansMsg from '@/utils/languages/ch-hans.json';
import chHantMsg from '@/utils/languages/ch-hant.json';
import enUSMsg from '@/utils/languages/en-US.json';
import jaMsg from '@/utils/languages/ja.json';
import koMsg from '@/utils/languages/ko.json';

export const LANGUAGE_LIST = [
  { id: 1, name: 'English', code: 'en', message: enUSMsg },
  { id: 2, name: '한국어', code: 'ko', message: koMsg },
  { id: 3, name: '日本語', code: 'ja', message: jaMsg },
  { id: 4, name: '繁體中文', code: 'zh-hant', message: chHantMsg },
  { id: 5, name: '简体中文', code: 'zh-hans', message: chHansMsg },
];

export const SUPPORTED_LANGUAGE_LIST = ['en', 'ko', 'ja', 'zh-hans', 'zh-hant'];
