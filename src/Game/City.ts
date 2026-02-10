import type { Color } from "../Enums/Color";
import { isCube, isResearchStation } from "../Guards/guards";
import type { ICube } from "../Intefaces/ICube";
import type { IElement } from "../Intefaces/IElement";
import type { IResearchStation } from "../Intefaces/IResearchStation";

export class City {
  public readonly name: string;
  public readonly color: Color;
  public readonly coordinates: [number, number];

  public readonly connections: City[];

  private _elements: IElement[];

  public get elements(): IElement[] {
    return this._elements;
  }

  constructor(name: string, color: Color, coordinates: [number, number]) {
    this.name = name;
    this.color = color;
    this.coordinates = coordinates;
    this.connections = [];
    this._elements = [];
  }

  private setElements(elements: IElement[]): void {
    this._elements.push(...elements);
  }

  public setConnections(cities: City[]): void {
    this.connections.push(...cities);
  }

  public hasResearchStation(): boolean {
    return this._elements.some((element) => isResearchStation(element));
  }

  public buildResearchStation(researchStation: IResearchStation): boolean {
    if (this._elements.includes(researchStation)) return false;

    this._elements.push(researchStation);
    return true;
  }

  public removeResearchStation(researchStation: IResearchStation): boolean {
    return this.removeElement(researchStation);
  }

  public removeCube(cube: ICube): boolean {
    return this.removeElement(cube);
  }

  public GetCubeCount(): number {
    return this._elements.filter((element) => isCube(element)).length;
  }

  public placeCube(cube: ICube): boolean {
    if (this._elements.includes(cube)) return false;

    this._elements.push(cube);
    return true;
  }

  public clone(): City {
    const clonedCity = new City(this.name, this.color, this.coordinates);
    clonedCity.setConnections(this.connections);
    clonedCity.setElements(this._elements);
    return clonedCity;
  }

  private removeElement(element: IElement): boolean {
    const index = this._elements.indexOf(element);
    if (index === -1) return false;

    this._elements.splice(index, 1);
    return true;
  }
}
