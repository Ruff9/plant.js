let table, ground;
let black, brown;

const BASE_SIZE = 12; // pixels
const PLANT_COUNT = 20;
const GROWTH_SPEED = 15; // entre 0 et 100

function setup() {
  createCanvas(windowWidth, windowHeight);
  black = color(0);
  brown = color(30, 20, 10);

  background(black);

  table = new Table();
  ground = floor(table.rows*2/3);

  for ( let k = 0; k < table.columns; k++ ) {
    for ( let l = 0; l < table.rows; l++ ) {
      let cell = new Cell({x: k, y: l});
      if ( l > ground ) cell.color = brown;

      table.cells.push(cell);
      cell.display();
    }
  }

  for ( let i = 0; i < PLANT_COUNT; i++ ) {
    let seed = table.findCellByPosition(freeSpot());
    let plant = new Plant(seed);
  }
}

function draw() {
  for ( let i = 0; i < table.plants.length; i++ ) {
    table.plants[i].display();
  }
}

function randomSpot() {
  return { x: Math.floor(random(15, table.columns - 15)), y: ground };
}

function freeSpot() {
  let taken, available = [];

  if (table.plants.length == 0) return randomSpot();

  if (table.plants.length > 0) {
    taken = table.plants.map(plant => plant.seed.position.x);
  }

  if (taken.length >= 1) {
    taken = taken.reduce((acc, cur) => {
      return acc.concat([cur , cur-1, cur+1]);
    }, []);
  }

  for(let i = 15; i < table.columns - 15; i++) {
    if(!taken.includes(i)) {
      available.push(i);
    }
  }

  let spot = available[Math.floor(Math.random() * available.length)];

  return { x: spot, y: ground };
}

function randomGreenColor() {
  return color(random(0, 20), random(100, 130), random(0, 20));
}

function randomRedColor() {
  return color(190, random(0, 120), random(0, 60));
}
