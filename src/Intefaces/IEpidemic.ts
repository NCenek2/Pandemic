import type { IPlayerCard } from "./IPlayerCard";

export interface IEpidemic extends IPlayerCard {
  Spread(): void;
}
