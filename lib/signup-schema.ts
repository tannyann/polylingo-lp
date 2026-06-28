import { z } from 'zod';

export const MOTHER_TONGUE_OPTIONS = [
  '日本語',
  'English',
  '中文',
  '한국어',
  'その他',
] as const;

export const signupSchema = z.object({
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('有効なメールアドレスを入力してください'),
  mother_tongue: z.enum(MOTHER_TONGUE_OPTIONS, {
    message: '母語を選択してください',
  }),
  target_languages: z.array(z.string()),
  message: z
    .string()
    .max(200, '200文字以内で入力してください')
    .optional()
    .or(z.literal('')),
  source: z.string().optional(),
});

export type SignupFormValues = z.infer<typeof signupSchema>;

export type SignupApiBody = SignupFormValues;
