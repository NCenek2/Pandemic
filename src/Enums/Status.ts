export const Status = {
  Playing: "Playing",
  Won: "Won",
  Lost: "Lost",
} as const;

export type Status = (typeof Status)[keyof typeof Status];
