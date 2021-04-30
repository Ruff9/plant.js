let table, ground;
let black, brown;

const BASE_SIZE = 12; // pixels
const PLANT_COUNT = 10;
const GROWTH_SPEED = 50; // entre 0 et 100

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  black = color(0);
  brown = color(30, 20, 10);
  ground = canvas.height *2/3;

  background(black);

  noStroke();
  fill(brown);
  rect(0, ground, windowWidth, canvas.height - ground);

  table = new Table();

  for ( let i = 0; i < PLANT_COUNT; i++ ) {
    let seed = freeSpot();
    let plant = new Plant(seed);
  }
}

function draw() {
  for ( let i = 0; i < table.plants.length; i++ ) {
    table.plants[i].display();
  }
}

class Table {
  constructor() {
    this.plants = [];
  }
}

function randomSpot() {
  let padding = 35;
  return { x: Math.floor(random(padding, canvas.width - padding)), y: ground };
}

function middleSpot() {
  return { x: canvas.width/2, y: ground };
}

function freeSpot() {
  if (table.plants.length == 0) return randomSpot();
  else return findFreeSpot();

  function findFreeSpot() {
    let spot = randomSpot();

    for ( let i = 0; i < table.plants.length; i++ ) {
      let min = table.plants[i].seed.x - table.plants[i].privacy;
      let max = table.plants[i].seed.x + table.plants[i].privacy;

      if(spot.x > min && spot.x < max) return findFreeSpot();
    }

    return spot;
  }
}

function randomGreenColor() {
  return color(random(0, 20), random(100, 130), random(0, 20));
}

function randomRedColor() {
  return color(190, random(0, 120), random(0, 60));
}
