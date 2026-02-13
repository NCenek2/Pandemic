import type { IGameState } from "../../../Intefaces/IGameState";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";

export class StoreEventAction implements IRoleAction {
  public Name: string = "Store Event";

  public CanExecute(gameState: IGameState): boolean {
    const game = gameState;
    {
      game;
    }
    return false;
  }

  public Execute(gameState: IGameState): void {
    const game = gameState;
    {
      game;
    }
  }

  Undo(gameState: IGameState): void {
    const game = gameState;
    {
      game;
    }
  }
}
