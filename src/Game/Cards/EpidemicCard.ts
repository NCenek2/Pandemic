import type { IEpidemic } from "../../Intefaces/IEpidemic";
import type { IPlayerCard } from "../../Intefaces/IPlayerCard";

export class EpidemicCard implements IPlayerCard, IEpidemic {
  public readonly title: string;
  public readonly description: string;

  public readonly kind: "epidemic" = "epidemic";

  constructor() {
    this.title = "Epidemic";
    this.description =
      "1-INCREASE\n" +
      "Move the infection rate marker forward 1 space.\n" +
      "2-INFECT\n" +
      "Draw the bottom card from the infection deck and put 3 cubes on that city. Discard that card.\n" +
      "3-INTENSIFY\n" +
      "Shuffle the cards in the infection discard pile and put them on the top of the infection deck.";
  }

  public Spread(): void {}
}
