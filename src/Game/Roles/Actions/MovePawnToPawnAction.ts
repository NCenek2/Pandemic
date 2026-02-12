import type { IGameState } from "../../../Intefaces/IGameState";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";

export class MovePawnToPawnAction implements IRoleAction {
  public Name: string = "Move Pawn To Pawn";

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
}
