import { isResearchStation } from "../../../Guards/guards";
import type { IGameState } from "../../../Intefaces/IGameState";
import type { IPlayerCard } from "../../../Intefaces/IPlayerCard";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";
import type { City } from "../../City";

export class ShuttleFlightOperationsExpertAction implements IRoleAction {
  public Name: string = "Research to Any City";

  private _previousLocation: City | null = null;
  private _discardedCard: IPlayerCard | null = null;

  public CanExecute(gameState: IGameState): boolean {
    const currentPlayer = gameState.currentPlayer;
    const selectedCard = gameState.selectedCard;
    const destination = gameState.selectedCity;

    if (currentPlayer == null || destination == null || selectedCard == null)
      return false;

    const condition1 = currentPlayer.currentLocation !== destination;
    const condition2 = currentPlayer.currentLocation.elements.some((element) =>
      isResearchStation(element),
    );

    return condition1 && condition2;
  }

  public Execute(gameState: IGameState): void {
    const currentPlayer = gameState.currentPlayer!;
    const cardToDiscard = gameState.selectedCard!;
    const destination = gameState.selectedCity!;

    this._previousLocation = currentPlayer.currentLocation;
    this._discardedCard = cardToDiscard;

    gameState.setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player == currentPlayer) {
          player.Move(destination);
          return player;
        }
        return player;
      }),
    );

    // Remove the selected card
    gameState.setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player == currentPlayer) {
          currentPlayer.removeCard(cardToDiscard);
          gameState.playerCardContainer.current.moveToDiscard(cardToDiscard);
          return player;
        }

        return player;
      }),
    );
  }

  Undo(gameState: IGameState): void {
    const currentPlayer = gameState.currentPlayer!;

    gameState.playerCardContainer.current.removeFromDiscard(
      this._discardedCard!,
    );

    // Move the player back to the previous location
    gameState.setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player == currentPlayer) {
          currentPlayer.Move(this._previousLocation!);
          currentPlayer.addCard(this._discardedCard!);
          return player;
        }

        return player;
      }),
    );
  }
}
