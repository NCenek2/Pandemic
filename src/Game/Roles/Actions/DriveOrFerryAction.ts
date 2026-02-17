import type { IGameState } from "../../../Intefaces/IGameState";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";
import { isIRoleCommand } from "../../../Intefaces/IRoleCommand";
import type { City } from "../../City";

export class DriveOrFerryAction implements IRoleAction {
  private _previousLocation: City | null = null;

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

    // Do Pre-Action Logic
    if (isIRoleCommand(currentPlayer.role)) {
      currentPlayer.role.onExecute(gameState);
    }

    this._previousLocation = currentPlayer.currentLocation;

    // Move To Destination
    gameState.setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player == currentPlayer) {
          player.Move(destination);
          return player;
        }
        return player;
      }),
    );
  }

  Undo(gameState: IGameState): void {
    const currentPlayer = gameState.currentPlayer!;

    // Do Pre-Undo Logic
    if (isIRoleCommand(currentPlayer.role)) {
      currentPlayer.role.onUndo(gameState);
    }

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
