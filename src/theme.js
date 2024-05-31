// NOTE: 공통 이미지
import { mq } from '@/lib/react-responsive/mediaQuery';
import { changePrimaryFontFamily, changeSecondaryFontFamily } from '@/utils/Functions';

export const image = {
  // NOTE: icons
  logo: require('@/assets/icons/inspire-logo.svg'),
  downArrow: require('@/assets/icons/down-arrow.svg'),
  modalCloseIcon: require('@/assets/icons/modal-close-icon.svg'),
  modalCloseWhiteIcon: require('@/assets/icons/modal-close-white.svg'),
  fileUploadIcon: require('@/assets/icons/file-upload-icon.svg'),
  closeLineIcon: require('@/assets/icons/close-line.svg'),
  logoWhite: require('@/assets/icons/logo-white-full.svg'),

  // NOTE: images
  bannerImage: require('@/assets/images/banner-image.png'),
};

// NOTE: 공통 컬러
export const color = {
  primary: '#CB88CB',
  point01: '#6F5B7F',
  point02: '#7C8FAC',
  point03: '#9C7BB7',
  point04: '#E7AF1B',
  grey01: '#454545',
  grey02: '#9b9b9b',
  grey03: '#CDCCCC',
  white: '#ffffff',
  red01: '#EB3434',
};

export const AppTheme = {
  image,
  color,
  fontFamily: {
    primaryFont: changePrimaryFontFamily(),
    secondaryFont: changeSecondaryFontFamily(),
  },
  fontWeight: {
    // NOTE: 공통 폰트 굵기
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  },
  palette: {
    primary: {
      main: '#68507C',
    },
  },
  typography: {
    fontFamily: changePrimaryFontFamily(),
    htmlFontSize: 10,

    [mq('mobile')]: {
      fontSize: 14,
    },

    [mq('desktop')]: {
      fontSize: 16,
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: () => ({
          width: '100%',
        }),
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: ({ theme }) => ({
          top: '6rem !important',

          '& .MuiAlert-root': {
            background: theme.color.point02,
            borderRadius: '1rem',
          },
        }),
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          alignItems: 'flex-start',

          '& .MuiCheckbox-root': {
            padding: '0.4rem 0.9rem',
          },

          '& .MuiFormControlLabel-label': {
            overflowWrap: 'anywhere',
            fontSize: '1.6rem',
            lineHeight: '2.8rem',
            color: theme.color.grey01,
          },

          '& .MuiSvgIcon-root': { fontSize: 20 },

          [mq('desktop')]: {
            alignItems: 'center',
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: () => ({
          borderRadius: '0.8rem',
          justifyContent: 'space-between',
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: () => ({
          margin: 0,
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.color.grey01,
          fontSize: '1.6rem',
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: () => ({
          fontSize: '1.4rem !important',
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: () => ({}),
      },
    },
    MuiModal: {
      styleOverrides: {
        root: () => ({
          overflow: 'auto',
          padding: '1.6rem',
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '2.5rem',
        },
      },
    },
  },
};

export default AppTheme;
