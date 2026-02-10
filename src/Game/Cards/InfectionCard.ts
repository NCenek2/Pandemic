import type { ICity } from "../../Intefaces/ICity";
import type { City } from "../City";

export class InfectionCard implements ICity {
  public readonly city: City;

  constructor(city: City) {
    this.city = city;
  }
}
