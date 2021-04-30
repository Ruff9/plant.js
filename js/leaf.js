class Leaf {
  constructor(plantId, attach) {
    this.plantId = plantId;
    this.angle = 45;
    this.maxLength = 10;
    this.maxWidth = 4;

    this.body = [attach];
    this.color = randomGreenColor();
  }


}
