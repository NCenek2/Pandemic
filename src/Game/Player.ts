import type { IPlayerCard } from "../Intefaces/IPlayerCard";
import type { IRole } from "../Intefaces/IRole";
import type { City } from "./City";

export class Player {
  private _currentLocation: City;
  public get currentLocation(): City {
    return this._currentLocation;
  }

  private _playerCards: IPlayerCard[];
  public get playerCards(): IPlayerCard[] {
    return this._playerCards;
  }

  private _role: IRole;
  public get role(): IRole {
    return this._role;
  }

  constructor(playerCards: IPlayerCard[], role: IRole, city: City) {
    this._playerCards = playerCards;
    this._role = role;
    this._currentLocation = city;
  }

  public Move(city: City) {
    this._currentLocation = city;
  }

  public addCard(playerCard: IPlayerCard): void {
    this.playerCards.push(playerCard);
  }

  public removeCard(playerCard: IPlayerCard) {
    const newCards = this.playerCards.filter((card) => card != playerCard);
    this._playerCards = newCards;
  }
}
