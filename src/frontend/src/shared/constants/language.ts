export const LANGUAGES = {
  JA: "ja",
  EN: "en",
} as const;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];
