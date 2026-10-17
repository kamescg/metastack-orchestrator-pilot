import { GREETING_PREFIXES, isLanguage } from './lang.js';

export function greet(name, lang = 'en') {
  if (!isLanguage(lang)) {
    throw new RangeError(`Unsupported language: ${String(lang)}`);
  }
  return `${GREETING_PREFIXES[lang]}, ${name}!`;
}
