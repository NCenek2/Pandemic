import { isResearchStation } from "../../../Guards/guards";
import type { IGameState } from "../../../Intefaces/IGameState";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";

export class ShuttleFlightOperationsExpertAction implements IRoleAction {
  public Name: string = "Shuttle Flight";

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
}
