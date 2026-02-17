import type { IGameState } from "../../../Intefaces/IGameState";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";
import { isIRoleCommand } from "../../../Intefaces/IRoleCommand";
import type { City } from "../../City";
import type { Player } from "../../Player";

export class MovePawnToPawnAction implements IRoleAction {
  public Name: string = "Move Pawn To Pawn";

  private _selectedPlayer: Player | null = null;
  private _previousLocation: City | null = null;

  public CanExecute(gameState: IGameState): boolean {
    const selectedPlayer = gameState.selectedPlayer;
    const selectedCity = gameState.selectedCity;
    const currentPlayer = gameState.currentPlayer;

    if (selectedPlayer == null || selectedCity == null || currentPlayer == null)
      return false;

    const condition1 = currentPlayer !== selectedPlayer;
    const condition2 = selectedPlayer.currentLocation !== selectedCity;

    return condition1 && condition2;
  }

  public Execute(gameState: IGameState): void {
    const selectedPlayer = gameState.selectedPlayer!;
    const selectedCity = gameState.selectedCity!;

    // Do Pre-Action Logic
    if (isIRoleCommand(selectedPlayer.role)) {
      selectedPlayer.role.onExecute(gameState);
    }

    this._selectedPlayer = selectedPlayer;
    this._previousLocation = selectedPlayer.currentLocation;

    // Move Selected Player To Selected City
    gameState.setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player === selectedPlayer) {
          player.Move(selectedCity);
          return player;
        }
        return player;
      }),
    );
  }

  Undo(gameState: IGameState): void {
    // Do Pre-Undo Logic

    if (isIRoleCommand(this._selectedPlayer!.role)) {
      this._selectedPlayer!.role.onUndo(gameState);
    }

    // Move Selected Player To Previous City
    gameState.setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player === this._selectedPlayer) {
          player.Move(this._previousLocation!);
          return player;
        }
        return player;
      }),
    );
  }
}
