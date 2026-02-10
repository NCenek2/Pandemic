import { isCube } from "../../../Guards/guards";
import type { ICube } from "../../../Intefaces/ICube";
import type { IGameState } from "../../../Intefaces/IGameState";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";

export class TreatDiseaseActionMedicAction implements IRoleAction {
  public Name: string = "Treat Disease";

  public CanExecute(gameState: IGameState): boolean {
    {
      const currentPlayer = gameState.currentPlayer;

      if (currentPlayer == null) return false;

      return currentPlayer.currentLocation.elements.some((element) =>
        isCube(element),
      );
    }
  }

  public Execute(gameState: IGameState): void {
    const currentPlayer = gameState.currentPlayer;

    const cubes = currentPlayer?.currentLocation.elements.filter((element) =>
      isCube(element),
    ) as ICube[];

    gameState.setCities((prevCities) =>
      prevCities.map((city) => {
        if (city == currentPlayer?.currentLocation) {
          for (const cube of cubes) {
            city.removeCube(cube);
            gameState.cubeContainer.current.addCube(cube);
          }
          return city;
        }
        return city;
      }),
    );
  }
}
