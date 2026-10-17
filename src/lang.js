export const GREETING_PREFIXES = Object.freeze({
  en: 'Hello',
  es: 'Hola',
  fr: 'Bonjour',
  de: 'Hallo',
});

export function isLanguage(code) {
  return typeof code === 'string' && Object.hasOwn(GREETING_PREFIXES, code);
}
