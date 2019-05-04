var matrix = [
    [1, 0, 1, 0, 2],
    [1, 0, 0, 2, 0],
    [0, 1, 2, 0, 0],
    [3, 0, 1, 0, 0],
    [1, 0, 3, 0, 0],
    [1, 1, 0, 0, 2],
    [1, 1, 0, 0, 0]
 ];
 
 var side = 120;
 var grassArr = [];
 var grasseaterArr = [];
 var predatorArr = [];
 
 
 function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for(var y = 0; y < matrix.length; ++y){
        for(var x = 0; x < matrix[y].length; ++x){
            if(matrix[y][x] == 1){
                var gr = new Grass(x,y,1);
                grassArr.push(gr);
            }
            else if(matrix[y][x] == 2){
                var et = new GrassEater(x,y,2)
                grasseaterArr.push(et);
     
            }
            else if(matrix[y][x] == 3){
                var pr = new Predator(x,y,3)
                predatorArr.push(pr);
     
            }
        }
     }  
 }
 

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
 
            if (matrix[y][x] == 0) {
                fill("gray");           
            }
            else if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }

            rect(x * side, y * side, side, side);
        }
    }

    for(var i in grassArr){
        grassArr[i].mul();
    }

    for (var i in grasseaterArr) {
        grasseaterArr[i].move();
        grasseaterArr[i].eat();
        grasseaterArr[i].mul();
        grasseaterArr[i].die();
    }
    for (var i in predatorArr) {
        predatorArr[i].move();
        predatorArr[i].eat();
        predatorArr[i].mul();
        predatorArr[i].die();
    }
 
   
 }


 
 
 

