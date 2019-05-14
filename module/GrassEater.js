var LivingCreature = require("./LivingCreature.js");

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {

        var fullCells = this.chooseCell(0);
        var newCell = Random(fullCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.x = newX;
            this.y = newY;
            this.energy--;
        }
    }
    eat() {
        var grass = Random(this.chooseCell(1));
        if (grass) {
            var newX = grass[0];
            var newY = grass[1];
            matrix[newY][newX] = this.index;

            matrix[this.y][this.x] = 0;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX;
            this.y = newY;
            this.energy += 2;
        }
    }
    mul() {
        // this.multiply++;
        //the same as >
        //var emptyCells = this.chooseCell(0);
        // var newcell = random(emtyCells); 
        var newCell = Random(this.chooseCell(0));
        if (this.energy >= 6 && newCell) {
            // the same as >
            // var newX = newCell[0];
            // var newY = newCell[1];
            // matrix[newY][newX] = this.index;
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grasseaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 0;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in grasseaterArr) {
                if (this.x == grasseaterArr[i].x && this.y == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                }
            }
        }
    }
    left() {
        if (matrix[this.y][this.x - 1] == 0) {
            matrix[this.y][this.x] = 0
            this.x--;
            matrix[this.y][this.x] = 2
        }

    }
    right() {
        if (matrix[this.y][this.x + 1] == 0) {
            matrix[this.y][this.x] = 0
            this.x++;
            matrix[this.y][this.x] = 2
        }
    }
    up() {
        if (matrix[this.y - 1][this.x] == 0) {
            matrix[this.y][this.x] = 0
            this.y--;
            matrix[this.y][this.x] = 2
        }
    }
    down() {
        if (matrix[this.y + 1][this.x] == 0) {
            matrix[this.y][this.x] = 0
            this.y++;
            matrix[this.y][this.x] = 2
        }
    }
}