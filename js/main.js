let table = { plants: [] };
let ground, black, brown;

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

  for ( let i = 0; i < PLANT_COUNT; i++ ) {
    let plant = new Plant(freeSpot());
    table.plants.push(plant);
  }
}

function draw() {
  for (let plant of table.plants) {
    plant.display();
  }
}

function randomSpot() {
  let padding = 50;
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

    for (let plant of table.plants) {
      let min = plant.seed.x - plant.privacy;
      let max = plant.seed.x + plant.privacy;

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
