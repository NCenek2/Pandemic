import { InfectionCard } from "../Cards/InfectionCard";
import type { City } from "../City";

export class InfectionCardInitializer {
  public createDeck(cities: City[]): InfectionCard[] {
    let infectionCards: InfectionCard[] = [];

    const firstCity = cities.at(0) as City;

    this.createInfectionCards(new Set<City>(), firstCity, infectionCards);

    return infectionCards;
  }

  private createInfectionCards(
    explored: Set<City>,
    city: City,
    infectionCards: InfectionCard[],
  ): void {
    if (explored.has(city)) return;
    explored.add(city);
    infectionCards.push(new InfectionCard(city));
    for (const connectedCity of city.connections) {
      this.createInfectionCards(explored, connectedCity, infectionCards);
    }
  }
}
