import { isCityCard } from "../../../Guards/guards";
import type { IGameState } from "../../../Intefaces/IGameState";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";
import type { CityCard } from "../../Cards/CityCard";
import type { City } from "../../City";

export class DirectFlightAction implements IRoleAction {
  private _removedCityCard: CityCard | null = null;
  private _previousCity: City | null = null;

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

    // Do Pre-Action Logic
    currentPlayer.role.onExecute(gameState);

    this._previousCity = currentPlayer.currentLocation;

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

    this._removedCityCard = cityCard;
  }

  Undo(gameState: IGameState): void {
    const currentPlayer = gameState.currentPlayer!;

    // Do Pre-Undo Logic
    currentPlayer.role.onUndo(gameState);

    // Add Back Player Card
    gameState.playerCardContainer.current.removeFromDiscard(
      this._removedCityCard!,
    );

    // Give Back Card and Mmove Player Back to Previous City
    gameState.setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player == currentPlayer) {
          currentPlayer.Move(this._previousCity!);
          currentPlayer.addCard(this._removedCityCard!);
          return player;
        }

        return player;
      }),
    );
  }
}
