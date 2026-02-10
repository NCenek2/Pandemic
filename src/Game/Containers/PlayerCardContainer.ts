import type { Difficulty } from "../../Enums/Difficulty";
import { isEpidemicCard } from "../../Guards/guards";
import type { IPlayerCard } from "../../Intefaces/IPlayerCard";
import { EpidemicCard } from "../Cards/EpidemicCard";

export class PlayerCardContainer {
  private _playerCards: IPlayerCard[];
  public get playerCards(): IPlayerCard[] {
    return this._playerCards;
  }

  constructor(playerCards: IPlayerCard[]) {
    this._playerCards = playerCards;
  }

  public draw(): IPlayerCard | null {
    if (this.playerCards.length === 0) return null;

    const frontCard = this._playerCards.shift() as IPlayerCard;
    this.removeCard(frontCard);

    return frontCard;
  }

  public addCard(playerCard: IPlayerCard): boolean {
    if (this._playerCards.find((pc) => pc === playerCard) !== undefined)
      return false;

    this._playerCards.push(playerCard);
    return true;
  }

  public removeCard(playerCard: IPlayerCard): boolean {
    const filteredCubes = this._playerCards.filter((pc) => pc !== playerCard);

    const removed = filteredCubes.length != this._playerCards.length;

    this._playerCards = filteredCubes;

    return removed;
  }

  public shuffleCards(): void {
    for (let j = 0; j < 5; j++) {
      for (let i = 0; i < this._playerCards.length; i++) {
        const index = Math.floor(Math.random() * this._playerCards.length);

        [this._playerCards[i], this._playerCards[index]] = [
          this._playerCards[index],
          this._playerCards[i],
        ];
      }
    }
  }

  public addEpidemicCards(difficulty: Difficulty): void {
    const size = this._playerCards.length / difficulty;
    const rem = this._playerCards.length % difficulty;

    console.log(
      `Length: ${this._playerCards.length}, Difficulty: ${difficulty}, Size: ${size}, Rem: ${rem}`,
    );

    for (let i = 0; i < difficulty; i++) {
      this._playerCards.push(new EpidemicCard());

      const start = i * size;
      const end = i == difficulty - 1 ? (i + 1) * size + rem : (i + 1) * size;

      const index = start + Math.floor(Math.random() * (end - start));
      const lastIndex = this._playerCards.length - 1;

      [this._playerCards[index], this._playerCards[lastIndex]] = [
        this._playerCards[lastIndex],
        this._playerCards[index],
      ];
    }
  }

  public removeEpidemicCards(): void {
    const filteredCards = this._playerCards.filter((pc) => !isEpidemicCard(pc));
    this._playerCards = filteredCards;
  }

  public printCards(): void {
    for (let index = 0; index < this._playerCards.length; index++) {
      const playerCard = this._playerCards[index];
      console.log(`${index + 1}: ${playerCard.title}`);
    }
  }
}
