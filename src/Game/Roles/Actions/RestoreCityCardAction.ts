import { isCityCard } from "../../../Guards/guards";
import type { IGameState } from "../../../Intefaces/IGameState";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";
import type { CityCard } from "../../Cards/CityCard";

export class RestoreCityCardAction implements IRoleAction {
  public Name: string = "Restore City Card";

  private _undiscardedCityCard: CityCard | null = null;

  public CanExecute(gameState: IGameState): boolean {
    const currentPlayer = gameState.currentPlayer;

    if (currentPlayer == null) return false;

    return gameState.playerCardContainer.current.discardedPlayerCards.some(
      (playerCard) => {
        return (
          isCityCard(playerCard) &&
          (playerCard as CityCard).city == currentPlayer.currentLocation
        );
      },
    );
  }

  public Execute(gameState: IGameState): void {
    const currentPlayer = gameState.currentPlayer!;

    const undiscardedCityCard =
      gameState.playerCardContainer.current.discardedPlayerCards.find(
        (playerCard) =>
          isCityCard(playerCard) &&
          (playerCard as CityCard).city == currentPlayer.currentLocation,
      ) as CityCard;

    this._undiscardedCityCard = undiscardedCityCard;

    // Add Card Back To Player's Hand
    gameState.setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player == currentPlayer) {
          gameState.playerCardContainer.current.removeFromDiscard(
            undiscardedCityCard,
          );
          player.addCard(undiscardedCityCard);
          return player;
        }
        return player;
      }),
    );
  }

  Undo(gameState: IGameState): void {
    const currentPlayer = gameState.currentPlayer!;

    // Add Card Back To Player's Hand
    gameState.setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player == currentPlayer) {
          gameState.playerCardContainer.current.moveToDiscard(
            this._undiscardedCityCard!,
          );
          player.removeCard(this._undiscardedCityCard!);
          return player;
        }
        return player;
      }),
    );
  }
}
