var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var Grass = require("./grass.js");
var GrassEater = require("./grassEater.js");
var Predator = require("./predator.js");



app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);




    var w = 50;
    var h = 60;
function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.floor(Math.random() * 100);
            if (r < 20) r = 0;
            else if (r < 40) r = 1;
            else if (r < 60) r = 2;
            else if (r < 75) r = 3;
           // else if (r < 85) r = 4;
           // else if (r < 100) r = 5;
            matrix[y][x] = r;
        }
    }
    return matrix;
}

grassArr = [];
grasseaterArr = [];
predatorArr = [];


Weather = "Summer";
Weatherinit = 1;
Grassinit = 0;
GrassEaterinit = 0;
Predatorinit = 0;

Random = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

matrix = genMatrix(w, h);

for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x] == 1) {
            grassArr.push(new Grass(x, y, 1));
            Grassinit++;
        }
        else if (matrix[y][x] == 2) {
            grasseaterArr.push(new GrassEater(x, y, 2));
            GrassEaterinit++;
        }
        else if (matrix[y][x] == 3) {
            predatorArr.push(new Predator(x, y, 3));
            Predatorinit++;
        }
    }
}


function drawserever() {

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grasseaterArr) {
        grasseaterArr[i].move();
        grasseaterArr[i].mul();
        grasseaterArr[i].eat();
        grasseaterArr[i].die();
    }
    for (var i in predatorArr) {
        predatorArr[i].move();
        predatorArr[i].mul();
        predatorArr[i].eat();
        predatorArr[i].die();
    }

    io.sockets.emit("matrix", matrix);
}

function draw_wheater() {
    Weatherinit++;
    if (Weatherinit == 5) {
        Weatherinit = 1;
    }
    if (Weatherinit == 4) {
        Weather = "Autumn";
    }
    if (Weatherinit == 3) {
        Weather = "Winter";
    }
    if (Weatherinit == 2) {
        Weather = "Spring";
    }
    if (Weatherinit == 1) {
        Weather = "Summer";
    }
    io.sockets.emit("exanak", Weather);
}

io.on('connection', function (socket) {

   socket.on("Sxmvec", function (arr) {
        var x = arr[0];
        var y = arr[1];
        

        var directions = [
            [x - 1, y - 1],
            [x, y - 1],
            [x + 1, y - 1],
            [x - 1, y],
            [x + 1, y],
            [x - 1, y + 1],
            [x, y + 1],
            [x + 1, y + 1],
        ];

        if (matrix[y][x] == 1) {
            for (var i in grassArr) {
                if (y == grassArr[i].y && x == grassArr[i].x) {
                    grassArr.splice(i, 1);
                    break;
                }

            }
        }
        else if (matrix[y][x] == 2) {
            for (var i in grasseaterArr) {
                if (y == grasseaterArr[i].y && x == grasseaterArr[i].x) {
                    grasseaterArr.splice(i, 1);
                    break;
                }

            }
        }
        else if (matrix[y][x] == 3) {
            for (var i in predatorArr) {
                if (y == predatorArr[i].y && x == predatorArr[i].x) {
                    predatorArr.splice(i, 1);
                    break;
                }

            }
        }
       
        
        matrix[y][x] = 0

        for (var i in directions) {
            var harevanx = directions[i][0];
            var harevany = directions[i][1];

            if (matrix[harevany][harevanx] == 1) {
                for (var i in grassArr) {
                    if (harevany == grassArr[i].y && harevanx == grassArr[i].x) {
                        grassArr.splice(i, 1);
                        break;
                    }

                }
            }
            else if (matrix[harevany][harevanx] == 2) {
                for (var i in grasseaterArr) {
                    if (harevany == grasseaterArr[i].y && harevanx == grasseaterArr[i].x) {
                        grasseaterArr.splice(i, 1);
                        break;
                    }

                }
            }
            else if (matrix[harevany][harevanx] == 3) {
                for (var i in predatorArr) {
                    if (harevany == predatorArr[i].y && harevanx == predatorArr[i].x) {
                        predatorArr.splice(i, 1);
                        break;
                    }

                }
            }
           
            matrix[harevany][harevanx] = 0
        }
    })

});

var obj = { "info": [] };

function main() {
    var file = "Statistics.json"
    obj.info.push(
        { "Cnvac xoter qanaky": Grassinit, "Cnvac Xotakerneri qanaky": GrassEaterinit, "Gishatichneri qanaky": Predatorinit});
    fs.writeFileSync(file, JSON.stringify(obj,null,3));


}


setInterval(main, 3000)
setInterval(drawserever, 3000);
setInterval(draw_wheater, 3000);






