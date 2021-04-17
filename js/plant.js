class Plant {

  constructor(seed) {
    this.id = Plant.incrementId();
    this.seed = seed;
    this.rod = null;
    this.flower = null;

    this.state = 'waiting';
    this.delay = Math.floor(random(10, 300));
    this.energy = 0;

    this.init(seed);
  }

  init(seed) {
    table.plants.push(this);
    let rod = new Rod(this.id, seed);
    this.rod = rod;
  }

  display() {
    switch (this.state) {
      case 'waiting':
        if (this.energy < this.delay) this.energy++;
        else this.state = 'growing';
        break;
      case 'growing':
        this.rod.grow();
        break;
      case 'blooming':
        if (this.flower == null) {
          let bud = this.rod.body[this.rod.body.length - 1];
          this.flower = new Flower(this.id, bud);
        }
        this.flower.bloom();
        break;
      case 'done':
        break;
    }

    let cells = this.rod.body;
    if (this.flower) { cells = [...cells, ...this.flower.petals].filter(onlyUnique); }

    for (let i = 0; i < cells.length; i++) {
      cells[i].display();
    }
  }

  static incrementId() {
    if (!this.latestId) this.latestId = 1;
    else this.latestId++;
    return this.latestId;
  }
}

function parent(id) {
  let plant = table.plants.find(x => x.id === id);
  return plant;
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
