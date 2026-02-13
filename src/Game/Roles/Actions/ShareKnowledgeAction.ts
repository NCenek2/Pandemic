import { isCityCard } from "../../../Guards/guards";
import type { IGameState } from "../../../Intefaces/IGameState";
import type { IPlayerCard } from "../../../Intefaces/IPlayerCard";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";
import type { CityCard } from "../../Cards/CityCard";
import type { Player } from "../../Player";

export type ShareKnowledgeStateType = {
  player1: Player;
  player1Card: IPlayerCard | null;
  player2: Player;
  player2Card: IPlayerCard | null;
};

export class ShareKnowledgeAction implements IRoleAction {
  public Name: string = "Share Knowledge";

  public CanExecute(gameState: IGameState): boolean {
    const currentPlayer = gameState.currentPlayer;

    const shareKnowledgeState =
      gameState.uniqueData as ShareKnowledgeStateType | null;

    if (currentPlayer == null || shareKnowledgeState == null) return false;

    const player1 = shareKnowledgeState.player1;
    const player2 = shareKnowledgeState.player2;
    const player1Card = shareKnowledgeState.player1Card;
    const player2Card = shareKnowledgeState.player2Card;

    // Cards Aren't null
    if (
      player1Card == null ||
      player2Card == null ||
      !isCityCard(player1Card) ||
      !isCityCard(player2Card)
    )
      return false;

    const cityCard1 = player1Card as CityCard;
    const cityCard2 = player2Card as CityCard;

    const researcherInExchange =
      player1.role.name === "Researcher" || player2.role.name === "Researcher";

    const condition0 = player1 != player2;
    const condition1 = player1.currentLocation == player2.currentLocation;
    const condition2 =
      cityCard1.city == player1.currentLocation || researcherInExchange;
    const condition3 =
      cityCard2.city == player2.currentLocation || researcherInExchange;

    const condition4 = player1 == currentPlayer || player2 == currentPlayer;

    return condition0 && condition1 && (condition2 || condition3) && condition4;
  }

  public Execute(gameState: IGameState): void {
    const shareKnowledgeState = gameState.uniqueData as ShareKnowledgeStateType;

    const player1 = shareKnowledgeState.player1;
    const player2 = shareKnowledgeState.player2;
    const player1Card = shareKnowledgeState.player1Card!;
    const player2Card = shareKnowledgeState.player2Card!;

    gameState.setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player === player1) {
          player1.removeCard(player1Card);
          player1.addCard(player2Card);
          return player;
        } else if (player === player2) {
          player2.removeCard(player2Card);
          player2.addCard(player1Card);
          return player;
        }

        return player;
      }),
    );
  }

  Undo(gameState: IGameState): void {
    throw new Error("Method not implemented.");
  }
}
