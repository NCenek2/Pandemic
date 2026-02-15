export const PlayerCount = {
  Two: 2,
  Three: 3,
  Four: 4,
} as const;

export type PlayerCount = (typeof PlayerCount)[keyof typeof PlayerCount];
