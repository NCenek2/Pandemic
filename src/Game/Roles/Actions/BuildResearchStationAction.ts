import { isCityCard } from "../../../Guards/guards";
import type { IGameState } from "../../../Intefaces/IGameState";
import type { IResearchStation } from "../../../Intefaces/IResearchStation";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";
import { CityCard } from "../../Cards/CityCard";

export class BuildResearchStationAction implements IRoleAction {
  //   private _cityCard: CityCard;
  //   private _researchStation: IResearchStation;
  public Name: string = "Build Research Station";

  public CanExecute(gameState: IGameState): boolean {
    const currentPlayer = gameState.currentPlayer;

    if (currentPlayer == null) return false;

    const condition1 =
      currentPlayer.playerCards.find(
        (playerCard) =>
          isCityCard(playerCard) &&
          (playerCard as CityCard).city == currentPlayer?.currentLocation,
      ) != undefined;
    const condition2 = !currentPlayer.currentLocation?.hasResearchStation();
    const condition3 = gameState.researchStationContainer.current.count > 0;

    return condition1 && condition2 && condition3;
  }

  public Execute(gameState: IGameState): void {
    const currentPlayer = gameState.currentPlayer;

    const researchStation =
      gameState.researchStationContainer.current.getStation() as IResearchStation;

    // Remove the city card from the player's hand
    const cityCard = currentPlayer?.playerCards.find(
      (playerCard) =>
        isCityCard(playerCard) &&
        (playerCard as CityCard).city == currentPlayer?.currentLocation,
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

    gameState.setCities((prevCities) =>
      prevCities.map((city) => {
        if (city == currentPlayer?.currentLocation) {
          city.buildResearchStation(researchStation);
          return city;
        }
        return city;
      }),
    );
  }

  Undo(gameState: IGameState): void {
    throw new Error("Method not implemented.");
  }
}
