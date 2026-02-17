import type { MapperType } from "../Types/MapperType";
import type { IGameState } from "./IGameState";

export type RoleName =
  | "Dispatcher"
  | "Medic"
  | "Quarantine Specialist"
  | "Researcher"
  | "Scientist"
  | "Operations Expert"
  | "Contingency Planner"
  | "Field Operative"
  | "Containment Specialist"
  | "Generalist"
  | "Archivist";

export interface IRole {
  name: RoleName;
  actions: MapperType;
  actionCount: number;
  allowableCards: number;
  onTurnEnd(gameState: IGameState): void;
  onExecute(gameState: IGameState): void;
  onUndo(gameState: IGameState): void;
}
