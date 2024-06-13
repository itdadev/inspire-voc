import { z } from 'zod';
import {
  CategoryRequiredText,
  ContentRequiredText,
  EmailInvalidText,
  EmailRequiredText,
  FirstNameRequiredText,
  LastNameRequiredText,
  OptionRequiredText,
  PhoneNumberInvalidText,
  PhoneNumberRequiredText,
  PrivacyPolicyRequiredText,
  TimeRequiredText,
  TitleRequiredText,
} from '@/lib/react-intl/TranslatedTexts';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const zodVoc = z.object({
  first_name: z.string().min(1, { message: <FirstNameRequiredText /> }),
  last_name: z.string().min(1, { message: <LastNameRequiredText /> }),
  email: z
    .string()
    .min(1, { message: <EmailRequiredText /> })
    .email({ message: <EmailInvalidText /> }),
  phone: z
    .string()
    .min(1, { message: <PhoneNumberRequiredText /> })
    .refine(
      (value) => {
        return isValidPhoneNumber(value);
      },
      {
        message: <PhoneNumberInvalidText />,
      }
    ),
  category_key: z.string().min(1, { message: <CategoryRequiredText /> }),
  time_key: z.string().min(1, { message: <TimeRequiredText /> }),
  route_key: z.string().min(1, { message: <OptionRequiredText /> }),
  title: z.string().min(1, { message: <TitleRequiredText /> }),
  content: z.string().min(1, { message: <ContentRequiredText /> }),
  agreeToTerm: z.boolean().refine((value) => value === true, {
    message: <PrivacyPolicyRequiredText />,
  }),
});
