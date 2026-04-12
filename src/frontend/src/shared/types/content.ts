import type { Language } from "../constants/language";

export interface Contents<T extends object> {
  Contents: Partial<Record<Language, T>>;
}
