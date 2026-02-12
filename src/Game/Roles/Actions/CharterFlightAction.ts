import { isCityCard } from "../../../Guards/guards";
import type { IGameState } from "../../../Intefaces/IGameState";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";
import type { CityCard } from "../../Cards/CityCard";

export class CharterFlightAction implements IRoleAction {
  public Name: string = "Charter Flight";

  //   private _removedCityCard: CityCard;
  public CanExecute(gameState: IGameState): boolean {
    const currentPlayer = gameState.currentPlayer;
    const destination = gameState.selectedCity;

    if (currentPlayer == null || destination == null) return false;

    return (
      currentPlayer.playerCards.find(
        (playerCard) =>
          isCityCard(playerCard) &&
          (playerCard as CityCard).city == currentPlayer?.currentLocation &&
          (playerCard as CityCard).city != destination,
      ) != undefined
    );
  }

  public Execute(gameState: IGameState): void {
    const currentPlayer = gameState.currentPlayer!;
    const previousLocation = currentPlayer.currentLocation;
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

    // Remove Current Location City Card from Player's Hand
    const cityCard = currentPlayer?.playerCards.find(
      (playerCard) =>
        isCityCard(playerCard) &&
        (playerCard as CityCard).city == previousLocation,
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
