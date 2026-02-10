import type { ICity } from "../../Intefaces/ICity";
import type { IPlayerCard } from "../../Intefaces/IPlayerCard";
import type { City } from "../City";

export class CityCard implements IPlayerCard, ICity {
  public readonly city: City;
  public readonly title: string;
  public readonly description: string;
  public readonly kind: "city" = "city";

  constructor(city: City, title: string, description: string = "") {
    this.city = city;
    this.title = title;
    this.description = description;
  }
}
