import { isCityCard } from "../../../Guards/guards";
import type { IGameState } from "../../../Intefaces/IGameState";
import type { IPlayerCard } from "../../../Intefaces/IPlayerCard";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";
import type { CityCard } from "../../Cards/CityCard";

export class DiscoverCureAction implements IRoleAction {
  public Name: string = "Discover Cure";

  // private playerCards: IPlayerCard[] = [];
  // private chosenColor: Color | null = null;

  public CanExecute(gameState: IGameState): boolean {
    const currentPlayer = gameState.currentPlayer;
    const color = gameState.selectedColor;
    const selectedCards = gameState.uniqueData as IPlayerCard[] | null;

    if (currentPlayer == null || color == null || selectedCards == null)
      return false;

    if (selectedCards.length !== 5) return false;

    for (const card of selectedCards) {
      if (!isCityCard(card)) return false;
      const cityCard = card as CityCard;
      if (cityCard.city.color !== color) return false;
    }

    // Is Already Cured?
    const foundCure = gameState.cures.find((cure) => cure.color === color);
    if (foundCure?.cured) return false;

    // Has Research Station?
    if (!currentPlayer?.currentLocation.hasResearchStation()) return false;

    return true;
  }

  public Execute(gameState: IGameState): void {
    const currentPlayer = gameState.currentPlayer;
    const color = gameState.selectedColor;
    const selectedCards = gameState.uniqueData as IPlayerCard[];

    // Remove Cards from Player Hand
    gameState.setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player == currentPlayer) {
          for (const card of selectedCards) {
            player.removeCard(card);
          }
          return player;
        }
        return player;
      }),
    );

    // Set Cure Status
    gameState.setCures((prevCures) => {
      return prevCures.map((cure) => {
        if (cure.color === color) {
          cure.SetCuredStatus(true);
          return cure;
        }
        return cure;
      });
    });
  }
}
