const ADJECTIVES = [
  "Gece",
  "Sessiz",
  "Bakır",
  "Amber",
  "Loş",
  "Sıcak",
  "Uzak",
  "Derin",
];

const NOUNS = ["Kuşu", "Yolcu", "Plak", "Nota", "Işık", "Rıhtım", "Akort", "Gölge"];

/** Suggests a random code name candidate; the member can still type their own. */
export function suggestCodeName(): string {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return `${adjective} ${noun}`;
}
