import type { IPlayerCard } from "./IPlayerCard";

export interface IEvent extends IPlayerCard {
  Use(): void;
  Undo(): void;
}
