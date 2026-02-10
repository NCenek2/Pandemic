import type { Color } from "../../Enums/Color";
import type { ICube } from "../../Intefaces/ICube";

export class Cube implements ICube {
  public readonly color: Color;
  public readonly kind: "cube" = "cube";

  constructor(color: Color) {
    this.color = color;
  }
}
