import { isCityCard } from "../../../Guards/guards";
import type { IGameState } from "../../../Intefaces/IGameState";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";
import type { CityCard } from "../../Cards/CityCard";

export class DirectFlightAction implements IRoleAction {
  // private CityCard _removedCityCard;
  // private City _previousCity;

  public Name: string = "Direct Flight";

  public CanExecute(gameState: IGameState): boolean {
    const currentPlayer = gameState.currentPlayer;
    const destination = gameState.selectedCity;

    if (currentPlayer == null || destination == null) return false;

    return (
      currentPlayer.currentLocation != destination &&
      currentPlayer.playerCards.some(
        (playerCard) =>
          isCityCard(playerCard) &&
          (playerCard as CityCard).city == destination,
      )
    );
  }

  public Execute(gameState: IGameState): void {
    const currentPlayer = gameState.currentPlayer!;
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

    // Remove Destination City Card from Player's Hand
    const cityCard = currentPlayer?.playerCards.find(
      (playerCard) =>
        isCityCard(playerCard) && (playerCard as CityCard).city == destination,
    ) as CityCard;

    gameState.setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player == currentPlayer) {
          currentPlayer.removeCard(cityCard);
          gameState.playerCardContainer.current.moveToDiscard(cityCard);
          return player;
        }

        return player;
      }),
    );
  }
}
