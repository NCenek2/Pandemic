import { isCube } from "../../../Guards/guards";
import type { IGameState } from "../../../Intefaces/IGameState";
import type { Cube } from "../../Elements/Cube";

export class MedicTurnState {
  private _automaticallyRemovedCubes: Cube[] = [];

  OnExecute(gameState: IGameState): void {
    const destination = gameState.selectedCity!;

    this._automaticallyRemovedCubes = [];

    for (const cube of destination.elements.filter((element) =>
      isCube(element),
    ) as Cube[]) {
      this._automaticallyRemovedCubes.push(cube);
    }
  }

  OnUndo(gameState: IGameState): void {
    const currentPlayer = gameState.currentPlayer!;

    // Place Automatically Removed Cubes Back
    gameState.setCities((prevCities) =>
      prevCities.map((city) => {
        if (city == currentPlayer.currentLocation) {
          for (const cube of this._automaticallyRemovedCubes) {
            city.placeCube(cube);
            gameState.cubeContainer.current.removeCube(cube);
          }
          return city;
        }
        return city;
      }),
    );
  }
}
