import type { IGameState } from "../../../Intefaces/IGameState";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";

export class MovePawnToPawnAction implements IRoleAction {
  public Name: string = "Move Pawn To Pawn";

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
}
