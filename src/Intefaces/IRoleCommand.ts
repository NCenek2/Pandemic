import type { IGameState } from "./IGameState";

export function isIRoleCommand(obj: any): obj is IRoleCommand {
  return typeof obj?.onExecute === "function" && typeof obj?.onUndo === "function";
}

export interface IRoleCommand {
  onExecute(gameState: IGameState): void;
  onUndo(gameState: IGameState): void;
}
