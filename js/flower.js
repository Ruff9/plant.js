class Flower {
  constructor(plantId, bud) {
    this.plantId = plantId;
    this.bud = bud;
    this.color = randomRedColor();
    this.width = 0;
    this.maxWidth = random(25, 32);
    this.growSpeed = GROWTH_SPEED;
    this.energy = 0;
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.bud.x, this.bud.y, this.width);
  }

  bloom() {
    this.energy = this.energy + this.growSpeed;

    if(this.width >= this.maxWidth) {
      parent(this.plantId).state = 'done';
      return;
    }

    if (this.energy >= 100) {
      this.width ++;
      this.energy = 0;
    }
  }
}
