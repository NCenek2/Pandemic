export class OutbreakMarker {
  public outbreaks: number;

  constructor() {
    this.outbreaks = 0;
  }

  public triggerOutBreak(): void {
    this.outbreaks++;
  }

  public clone(): OutbreakMarker {
    const clone = new OutbreakMarker();
    clone.outbreaks = this.outbreaks;
    return clone;
  }

  public reset(): void {
    this.outbreaks = 0;
  }
}
