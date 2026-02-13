import type { IGameState } from "../../../Intefaces/IGameState";
import type { IResearchStation } from "../../../Intefaces/IResearchStation";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";

export class BuildResearchStationActionOperationsExpertAction implements IRoleAction {
  //   private _researchStation: IResearchStation;
  public Name: string = "Build Research Station";

  public CanExecute(gameState: IGameState): boolean {
    const currentPlayer = gameState.currentPlayer;

    if (currentPlayer == null) return false;

    const condition1 = !currentPlayer.currentLocation?.hasResearchStation();
    const condition2 = gameState.researchStationContainer.current.count > 0;

    // Havent done in turn yet
    const condition3 = true;

    return condition1 && condition2 && condition3;
  }

  public Execute(gameState: IGameState): void {
    const currentPlayer = gameState.currentPlayer!;

    const researchStation =
      gameState.researchStationContainer.current.getStation() as IResearchStation;

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
