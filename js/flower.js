class Flower {
  constructor(plantId, bud) {
    this.plantId = plantId;
    this.bud = bud;
    this.color = randomRedColor();
    this.petals = [bud];
    this.maxPetals = 35;
    this.growSpeed = GROWTH_SPEED;
    this.energy = 0;
  }

  bloom() {
    this.energy = this.energy + this.growSpeed;

    if(this.petals.length >= this.maxPetals) {
      parent(this.plantId).state = 'done';
      return;
    }

    if (this.energy >= 100) {
      let newPetals = [];

      for (let i = 0; i < this.petals.length; i++) {
        let newP = table.findCellsInContact(this.petals[i]);
        newPetals.push(newP);
      }

      newPetals = newPetals.flat().filter(onlyUnique);

      for (let i = 0; i < newPetals.length; i++) {
        newPetals[i].color = this.color;
      }

      this.petals = this.petals.concat(newPetals);
      this.energy = 0;
    }
  }
}
