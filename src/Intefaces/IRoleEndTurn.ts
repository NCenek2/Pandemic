import type { IGameState } from "./IGameState";

export function isIRoleEndTurn(obj: any): obj is IRoleEndTurn {
  return typeof obj?.onTurnEnd === "function";
}

export interface IRoleEndTurn {
  onTurnEnd(gameState: IGameState): void;
}
