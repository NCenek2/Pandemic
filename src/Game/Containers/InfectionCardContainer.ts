import type { InfectionCard } from "../Cards/InfectionCard";

export class InfectionCardContainer {
  private _infectionCards: InfectionCard[];
  public get infectionCards(): InfectionCard[] {
    return this._infectionCards;
  }

  private _discardedInfectionCards: InfectionCard[];
  public get discardedInfectionCards(): InfectionCard[] {
    return this._discardedInfectionCards;
  }

  constructor(infectionCards: InfectionCard[]) {
    this._infectionCards = infectionCards;
    this._discardedInfectionCards = [];
  }

  public shuffleCards(): void {
    for (let j = 0; j < 5; j++) {
      for (let i = 0; i < this._infectionCards.length; i++) {
        const index = Math.floor(Math.random() * this._infectionCards.length);

        [this._infectionCards[i], this._infectionCards[index]] = [
          this._infectionCards[index],
          this._infectionCards[i],
        ];
      }
    }
  }

  private shuffleDiscardedCards(): void {
    for (let j = 0; j < 5; j++) {
      for (let i = 0; i < this.discardedInfectionCards.length; i++) {
        const index = Math.floor(
          Math.random() * this.discardedInfectionCards.length,
        );

        [this.discardedInfectionCards[i], this.discardedInfectionCards[index]] =
          [
            this.discardedInfectionCards[index],
            this.discardedInfectionCards[i],
          ];
      }
    }
  }

  public intensify(): void {
    this.shuffleDiscardedCards();
    while (this._discardedInfectionCards.length > 0) {
      const discardedCard =
        this._discardedInfectionCards.pop() as InfectionCard;
      this._infectionCards.unshift(discardedCard);
    }
  }

  public draw(): InfectionCard | null {
    if (this._infectionCards.length === 0) return null;

    const frontCard = this._infectionCards.shift() as InfectionCard;
    this.moveToDiscard(frontCard);

    return frontCard;
  }

  private moveToDiscard(infectionCard: InfectionCard): boolean {
    if (
      this._discardedInfectionCards.find((dic) => dic === infectionCard) !==
      undefined
    )
      return false;

    this._discardedInfectionCards.push(infectionCard);

    return this.removeInfectionCard(infectionCard);
  }

  public removeInfectionCard(infectionCard: InfectionCard): boolean {
    const filteredInfectionCards = this._infectionCards.filter(
      (ic) => ic !== infectionCard,
    );

    const removed =
      filteredInfectionCards.length != this._infectionCards.length;

    this._infectionCards = filteredInfectionCards;

    return removed;
  }

  public reset(): void {
    while (this._discardedInfectionCards.length > 0) {
      const discardedCard =
        this._discardedInfectionCards.pop() as InfectionCard;
      this._infectionCards.push(discardedCard);
    }
  }
}
