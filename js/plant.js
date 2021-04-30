class Plant {
  constructor(seed) {
    this.id = Plant.incrementId();
    this.seed = seed;
    this.rod = null;
    this.flower = null;

    this.state = 'waiting';
    this.delay = Math.floor(random(0, 300));
    // this.delay = 0;
    this.energy = 0;

    this.privacy = 24;

    this.init(seed);
  }

  init(seed) {
    this.rod = new Rod(this.id, seed);
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
        this.flower = this.flower || new Flower(this.id, this.rod.head);
        this.flower.bloom();
        break;
      case 'done':
        break;
    }

    let elements = [this.rod, this.flower];

    for (let element of elements) {
      if (element == null) continue;
      element.display();
    }
  }

  static incrementId() {
    if (!this.latestId) this.latestId = 1;
    else this.latestId++;
    return this.latestId;
  }
}

function parent(id) {
  return table.plants.find(x => x.id === id);
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
