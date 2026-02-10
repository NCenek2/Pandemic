export const Difficulty = {
  Easy: 4,
  Standard: 5,
  Heroic: 6,
  Legendary: 7,
  Impossible: 8,
} as const;

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];
