import type { IGameState } from "../../../Intefaces/IGameState";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";

export class StoreEventAction implements IRoleAction {
  public Name: string = "Store Event";

  public CanExecute(gameState: IGameState): boolean {
    return false;
  }

  public Execute(gameState: IGameState): void {}
}
