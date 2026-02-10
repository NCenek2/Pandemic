import { isResearchStation } from "../../../Guards/guards";
import type { IGameState } from "../../../Intefaces/IGameState";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";

export class ShuttleFlightOperationsExpertAction implements IRoleAction {
  public Name: string = "Shuttle Flight";

  public CanExecute(gameState: IGameState): boolean {
    const currentPlayer = gameState.currentPlayer;
    const destination = gameState.selectedCity;

    if (currentPlayer == null || destination == null) return false;

    const condition1 = currentPlayer.currentLocation !== destination;
    const condition2 = currentPlayer.currentLocation.elements.some((element) =>
      isResearchStation(element),
    );

    //// NEEDS LOGIC FOR RESEARCH STATION TO ANY CITY BY DISCARDING CARD

    // Havent done in turn yet
    const condition3 = true;

    return condition1 && condition2 && condition3;
  }

  public Execute(gameState: IGameState): void {
    const currentPlayer = gameState.currentPlayer!;
    const destination = gameState.selectedCity!;

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
}
