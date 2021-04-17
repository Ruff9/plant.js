class Table {
  constructor() {
    this.columns = round(width/BASE_SIZE);
    this.rows = round(height/BASE_SIZE);
    this.cells = [];
    this.plants = [];
  }

  findCellsInContact(origin) {
    function isInContact(cell) {
      return (cell.position.x == origin.position.x && cell.position.y == origin.position.y - 1) ||
             (cell.position.x == origin.position.x && cell.position.y == origin.position.y + 1) ||
             (cell.position.y == origin.position.y && cell.position.x == origin.position.x - 1) ||
             (cell.position.y == origin.position.y && cell.position.x == origin.position.x + 1);
    }

    return this.cells.filter(isInContact);
  }

  findCellByPosition(target) {
    function byPosition(cell) {
      return cell.position.x == target.x && cell.position.y == target.y;
    }

    return this.cells.find(byPosition);
  }
}

class Cell {
  constructor(position, color = black) {
    this.position = position;
    this.color = color;
    this.width = round(width/table.columns);
    this.height = round(height/table.rows);
  }

  display() {
    let bkg = this.color;

    noStroke();
    fill(bkg);

    rect(this.position.x * this.width,
         this.position.y * this.height,
         this.width,
         this.height);
  }
}
