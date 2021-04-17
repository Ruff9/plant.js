class Rod {
  constructor(plantId, seed) {
    this.plantId = plantId;
    this.size = 1;
    this.maxSize = Math.floor(random(12, 25));
    this.body = [seed];
    this.color = randomGreenColor();
    this.growSpeed = GROWTH_SPEED;
    this.energy = 0;
  }

  grow() {
    if(this.size == this.maxSize) {
      parent(this.plantId).state = 'blooming';
      return;
    }

    this.body[0].color = this.color;
    this.energy = this.energy + this.growSpeed;

    if (this.energy >= 100) {
      let lastCell = this.body[this.body.length - 1];
      let newCell = table.findCellByPosition({x: lastCell.position.x, y: lastCell.position.y - 1});

      newCell.color = this.color;

      this.size ++;
      this.body.push(newCell);
      this.energy = 0;
    }
  }
}
