export const LANGUAGES = {
  JA: "ja",
  EN: "en",
} as const;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

const LANGUAGE_VALUES = new Set<string>(Object.values(LANGUAGES));
export function isValidLanguage(value: string): value is Language {
  return LANGUAGE_VALUES.has(value);
}
