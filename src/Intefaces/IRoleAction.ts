import type { IGameState } from "./IGameState";

export interface IRoleAction {
  Name: string;

  CanExecute(gameState: IGameState): boolean;
  Execute(gameState: IGameState): void;
  Undo(gameState: IGameState): void;
}
