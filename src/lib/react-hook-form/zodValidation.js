import { z } from 'zod';

export const zodVoc = z.object({
  first_name: z.string().min(1, { message: 'nameRequired' }),
  last_name: z.string().min(1, { message: 'nameRequired' }),
  email: z.string().min(1, 'emailRequired').email({ message: 'emailFormat' }),
  phone: z.string().min(1, { message: 'phoneRequired' }),
  category_key: z.string().min(1, { message: 'categoryRequired' }),
  time_key: z.string().min(1, { message: 'timeRequired' }),
  route_key: z.string().min(1, { message: 'routeRequired' }),
  title: z.string().min(1, { message: 'titleRequired' }),
  content: z.string().min(1, { message: 'contentRequired' }),
  agreeToTerm: z.boolean().refine((value) => value === true, {
    message: 'privacyPolicyRequired',
  }),
});
