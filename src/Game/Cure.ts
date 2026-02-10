import type { Color } from "../Enums/Color";

export class Cure {
  public readonly color: Color;

  private _cured: boolean = false;
  public get cured(): boolean {
    return this._cured;
  }

  constructor(color: Color) {
    this.color = color;
  }

  public SetCuredStatus(cured: boolean) {
    this._cured = cured;
  }
}
