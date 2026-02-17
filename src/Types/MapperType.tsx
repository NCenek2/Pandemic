import type { ReactElement } from "react";
import type { IRoleAction } from "../Intefaces/IRoleAction";

export type MapperItemType = {
  action: IRoleAction;
  element: ReactElement | ReactElement[];
};

export type ActionsType =
  | "Drive/Ferry"
  | "Direct Flight"
  | "Charter Flight"
  | "Shuttle Flight"
  | "Research to Any City"
  | "Build Research Station"
  | "Treat Disease"
  | "Share Knowledge"
  | "Discover Cure"
  | "Use Event"
  | "Store Event"
  | "Move Pawn To Pawn"
  | "Restore City Card";

export type MapperType = Partial<Record<ActionsType, MapperItemType>>;
