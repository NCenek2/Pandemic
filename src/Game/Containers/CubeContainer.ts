import type { Color } from "../../Enums/Color";
import type { ICube } from "../../Intefaces/ICube";
import { Cube } from "../Elements/Cube";

export class CubeContainer {
  private _cubes: ICube[];

  public get cubes(): ICube[] {
    return this._cubes;
  }

  constructor() {
    this._cubes = [];
    for (let i = 0; i < 24; i++) this._cubes.push(new Cube("Black"));
    for (let i = 0; i < 24; i++) this._cubes.push(new Cube("Red"));
    for (let i = 0; i < 24; i++) this._cubes.push(new Cube("Yellow"));
    for (let i = 0; i < 24; i++) this._cubes.push(new Cube("Blue"));
  }

  public getCube(color: Color): ICube | null {
    const cube = this._cubes.find((cube) => cube.color == color);

    if (cube == undefined) return null;

    return cube;
  }

  public addCube(cube: ICube): boolean {
    if (this._cubes.find((c) => c === cube) !== undefined) return false;

    this._cubes.push(cube);
    return true;
  }

  public removeCube(cube: ICube): boolean {
    const filteredCubes = this._cubes.filter((c) => c !== cube);

    const removed = filteredCubes.length != this._cubes.length;

    this._cubes = filteredCubes;

    return removed;
  }
}
