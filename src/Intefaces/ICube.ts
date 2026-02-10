import type { Color } from "../Enums/Color";
import type { IElement } from "./IElement";

export interface ICube extends IElement {
  kind: "cube";
  color: Color;
}
