import type { Color } from "../../../Enums/Color";
import { isCube } from "../../../Guards/guards";
import type { IGameState } from "../../../Intefaces/IGameState";
import type { Cube } from "../../Elements/Cube";

export class MedicTurnState {
  private _automaticallyRemovedCubes: Cube[] = [];

  OnExecute(gameState: IGameState): void {
    const currentPlayer = gameState.currentPlayer!;
    const destination = gameState.selectedCity!;

    const curedColors = new Set<Color>(
      gameState.cures.filter((cure) => cure.cured).map((cure) => cure.color) ??
        [],
    );

    this._automaticallyRemovedCubes = [];

    gameState.setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player == currentPlayer) {
          const cubesToRemove = destination.elements.filter(
            (element) =>
              isCube(element) && curedColors.has((element as Cube).color),
          ) as Cube[];
          for (const cube of cubesToRemove) {
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
          }
          return city;
        }
        return city;
      }),
    );
  }
}
