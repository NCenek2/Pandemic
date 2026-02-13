import { isEventCard } from "../../../Guards/guards";
import type { IGameState } from "../../../Intefaces/IGameState";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";

export class UseEventAction implements IRoleAction {
  public Name: string = "Use Event";

  public CanExecute(gameState: IGameState): boolean {
    const currentPlayer = gameState.currentPlayer;
    const selectedCard = gameState.selectedCard;

    if (currentPlayer == null || selectedCard == null) return false;

    return isEventCard(selectedCard);
  }

  public Execute(gameState: IGameState): void {
    const game = gameState;
    {
      game;
    }
  }

  Undo(gameState: IGameState): void {
    throw new Error("Method not implemented.");
  }
}
