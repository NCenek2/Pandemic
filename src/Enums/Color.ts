export const Color = {
  Red: "Red",
  Black: "Black",
  Blue: "Blue",
  Yellow: "Yellow",
} as const;

export type Color = (typeof Color)[keyof typeof Color];
