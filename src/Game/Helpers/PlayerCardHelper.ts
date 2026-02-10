import type { IPlayerCard } from "../../Intefaces/IPlayerCard";
import { CityCard } from "../Cards/CityCard";
import { City } from "../City";

export class PlayerCardHelper {
  public createDeck(cities: City[]): IPlayerCard[] {
    const playerCards: IPlayerCard[] = [];

    const firstCity = cities.at(0) as City;

    // City Cards
    this.createCityCards(new Set<City>(), firstCity, playerCards);

    // playerCards.push(new EventCard("Event 1", "Event 1"));
    // playerCards.push(new EventCard("Event 2", "Event 2"));
    // playerCards.push(new EventCard("Event 3", "Event 3"));
    // playerCards.push(new EventCard("Event 4", "Event 4"));

    return playerCards;
  }

  private createCityCards(
    explored: Set<City>,
    city: City,
    cards: IPlayerCard[],
  ): void {
    if (explored.has(city)) return;
    explored.add(city);

    const newPlayerCard = new CityCard(city, city.name);
    cards.push(newPlayerCard);

    for (const connection of city.connections) {
      this.createCityCards(explored, connection, cards);
    }
  }
}
