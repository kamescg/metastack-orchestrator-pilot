export function shout(text) {
  return text.toUpperCase();
}

export function toJson(text) {
  return JSON.stringify({ greeting: text });
}
