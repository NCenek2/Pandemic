import type { IGameState } from "../../../Intefaces/IGameState";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";

export class MovePawnToPawnAction implements IRoleAction {
  public Name: string = "Move Pawn To Pawn";

  public CanExecute(gameState: IGameState): boolean {
    return false;
  }

  public Execute(gameState: IGameState): void {}
}
