import { isCube } from "../../../Guards/guards";
import type { IGameState } from "../../../Intefaces/IGameState";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";
import type { City } from "../../City";
import type { Cure } from "../../Cure";
import type { Cube } from "../../Elements/Cube";

export class DriveOrFerryMedicAction implements IRoleAction {
  private _previousLocation: City | null = null;
  private _automaticallyRemovedCubes: Cube[] = [];

  public Name: string = "Drive or Ferry";

  public CanExecute(gameState: IGameState): boolean {
    const currentPlayer = gameState.currentPlayer;
    const destination = gameState.selectedCity;

    if (currentPlayer == null || destination == null) return false;

    const condition1 = currentPlayer.currentLocation !== destination;
    const condition2 = currentPlayer.currentLocation.connections.some(
      (conn) => conn === destination,
    );

    return condition1 && condition2;
  }

  public Execute(gameState: IGameState): void {
    const currentPlayer = gameState.currentPlayer!;
    const destination = gameState.selectedCity!;

    this._previousLocation = currentPlayer.currentLocation;
    this._automaticallyRemovedCubes = [];

    const destinationCureColor = gameState.cures.find(
      (cure) => cure.color == destination.color,
    ) as Cure;

    // Move To Destination
    gameState.setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player == currentPlayer) {
          player.Move(destination);

          if (destinationCureColor.cured) {
            for (const cube of destination.elements.filter((element) =>
              isCube(element),
            ) as Cube[]) {
              destination.removeCube(cube);
              gameState.cubeContainer.current.addCube(cube);
              this._automaticallyRemovedCubes.push(cube);
            }
          }

          return player;
        }
        return player;
      }),
    );
  }

  Undo(gameState: IGameState): void {
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

    // Move To Previous Location
    gameState.setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player == currentPlayer) {
          player.Move(this._previousLocation!);
          return player;
        }
        return player;
      }),
    );
  }
}
