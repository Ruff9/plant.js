class Rod {
  constructor(plantId, seed) {
    this.plantId = plantId;
    this.seed = seed;
    this.size = 1;
    this.width = 6;
    this.head = {x:seed.x + this.width/2, y: seed.y};
    this.maxSize = Math.floor(random(150, 250));
    // this.maxSize = 200;

    this.color = brown;
    this.growSpeed = GROWTH_SPEED;
    this.growthMultiplier = 2;
    this.energy = 0;
  }

  display() {
    noStroke();
    fill(this.color);
    rect(this.seed.x, this.seed.y, this.width, -this.size);
  }

  grow() {
    if (this.color == brown) this.color = randomGreenColor();

    if(this.size >= this.maxSize) {
      parent(this.plantId).state = 'blooming';
      return;
    }

    // this.body[0].color = this.color;
    this.energy = this.energy + this.growSpeed;

    if (this.energy >= 100) {
      // let lastCell = this.body[this.body.length - 1];
      // let newCell = table.findCellByPosition({x: lastCell.position.x, y: lastCell.position.y - 1});
      //
      // newCell.color = this.color;

      this.size = this.size + this.growthMultiplier;
      this.head.y = this.head.y - this.growthMultiplier;
      // this.body.push(newCell);
      this.energy = 0;
    }
  }
}
