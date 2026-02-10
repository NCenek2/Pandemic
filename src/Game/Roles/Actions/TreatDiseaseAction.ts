import { Color } from "../../../Enums/Color";
import { isCube } from "../../../Guards/guards";
import type { ICube } from "../../../Intefaces/ICube";
import type { IGameState } from "../../../Intefaces/IGameState";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";

export class TreatDiseaseAction implements IRoleAction {
  public Name: string = "Treat Disease";

  public CanExecute(gameState: IGameState): boolean {
    {
      const currentPlayer = gameState.currentPlayer;
      const color = gameState.selectedColor;

      if (currentPlayer == null || color == null) return false;

      const cubeColorCounts: Record<Color, number> = {
        [Color.Red]: 0,
        [Color.Black]: 0,
        [Color.Yellow]: 0,
        [Color.Blue]: 0,
      };

      const cubes = currentPlayer.currentLocation.elements.filter((element) =>
        isCube(element),
      );

      for (const cube of cubes) {
        cubeColorCounts[cube.color] = cubeColorCounts[cube.color] + 1;
      }

      return cubeColorCounts[color] > 0;
    }
  }

  public Execute(gameState: IGameState): void {
    const currentPlayer = gameState.currentPlayer;
    const color = gameState.selectedColor;

    const cube = currentPlayer?.currentLocation.elements.find(
      (element) => isCube(element) && element.color === color,
    ) as ICube;

    gameState.setCities((prevCities) =>
      prevCities.map((city) => {
        if (city == currentPlayer?.currentLocation && cube != null) {
          city.removeCube(cube);
          gameState.cubeContainer.current.addCube(cube);
          return city;
        }
        return city;
      }),
    );
  }
}
