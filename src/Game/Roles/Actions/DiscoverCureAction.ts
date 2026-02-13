import type { Color } from "../../../Enums/Color";
import { isCityCard } from "../../../Guards/guards";
import type { IGameState } from "../../../Intefaces/IGameState";
import type { IPlayerCard } from "../../../Intefaces/IPlayerCard";
import type { IRoleAction } from "../../../Intefaces/IRoleAction";
import type { CityCard } from "../../Cards/CityCard";

export class DiscoverCureAction implements IRoleAction {
  public Name: string = "Discover Cure";

  private _playerCards: IPlayerCard[] = [];
  private _chosenColor: Color | null = null;

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

    this._playerCards = selectedCards;
    this._chosenColor = color;

    // Remove Cards from Player Hand
    gameState.setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player == currentPlayer) {
          for (const card of selectedCards) {
            player.removeCard(card);
            gameState.playerCardContainer.current.moveToDiscard(card);
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

  Undo(gameState: IGameState): void {
    const currentPlayer = gameState.currentPlayer;

    // Add Cards Back to Player Hand
    gameState.setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player == currentPlayer) {
          for (const card of this._playerCards) {
            gameState.playerCardContainer.current.removeFromDiscard(card);
            player.addCard(card);
          }
          return player;
        }
        return player;
      }),
    );

    // Set Cure Status back to false
    gameState.setCures((prevCures) => {
      return prevCures.map((cure) => {
        if (cure.color === this._chosenColor) {
          cure.SetCuredStatus(false);
          return cure;
        }
        return cure;
      });
    });
  }
}
