import { Color } from "../../../Enums/Color";
import { isCube } from "../../../Guards/guards";
import type { IGameState } from "../../../Intefaces/IGameState";
import type { Cube } from "../../Elements/Cube";

export class ContainmentSpecialistTurnState {
  private _automaticallyRemovedCubes: Cube[] = [];

  OnExecute(gameState: IGameState): void {
    const currentPlayer = gameState.currentPlayer!;
    const destination = gameState.selectedCity!;

    // If a destination has two or more cubes of 
    // the same color. It will automatically be removed.

    const cubeCountMap = new Map<Color, Cube[]>();
    destination.elements.forEach((element) => {
      if (isCube(element)) {
        const cube = element as Cube;
        if (!cubeCountMap.has(cube.color)) {
          cubeCountMap.set(cube.color, []);
        }
        const cubeArray = cubeCountMap.get(cube.color) as Cube[];
        cubeArray.push(cube);
      }
    });

    this._automaticallyRemovedCubes = [];

    gameState.setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player == currentPlayer) {
          for (let [_, cubes] of cubeCountMap.entries()) {
            if (cubes.length <= 1) continue;

            const cube = cubes[0];

            destination.removeCube(cube);
            gameState.cubeContainer.current.addCube(cube);
            this._automaticallyRemovedCubes.push(cube);
          }
        }

        return player;
      }),
    );
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
            break;
          }
          return city;
        }
        return city;
      }),
    );
  }
}
