import type { IGameState } from "../../../Intefaces/IGameState";
import type { IResearchStation } from "../../../Intefaces/IResearchStation";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";

export class BuildResearchStationActionOperationsExpertAction implements IRoleAction {
  //   private _researchStation: IResearchStation;
  public Name: string = "Build Research Station";

  public CanExecute(gameState: IGameState): boolean {
    const currentPlayer = gameState.currentPlayer;
    const cardToDiscard = gameState.selectedCard!;

    if (cardToDiscard == null || currentPlayer == null) return false;

    const condition1 = !currentPlayer.currentLocation?.hasResearchStation();
    const condition2 = gameState.researchStationContainer.current.count > 0;

    return condition1 && condition2;
  }

  public Execute(gameState: IGameState): void {
    const currentPlayer = gameState.currentPlayer!;
    const cardToDiscard = gameState.selectedCard!;

    const researchStation =
      gameState.researchStationContainer.current.getStation() as IResearchStation;

    // Remove the card from the player's hand
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
}
