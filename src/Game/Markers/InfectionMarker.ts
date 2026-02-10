export class InfectionMarker {
  private infectionMoveCount: number;
  public infectionRate: number;

  constructor() {
    this.infectionMoveCount = -1;
    this.infectionRate = 2;
  }

  public increaseRate(): void {
    if (this.infectionRate > 2) {
      this.infectionMoveCount = 0;
      this.infectionRate++;
      return;
    }

    this.infectionMoveCount++;
  }

  public clone(): InfectionMarker {
    const clone = new InfectionMarker();
    clone.infectionMoveCount = this.infectionMoveCount;
    clone.infectionRate = this.infectionRate;
    return clone;
  }

  public reset(): void {
    this.infectionMoveCount = -1;
    this.infectionRate = 2;
  }
}
