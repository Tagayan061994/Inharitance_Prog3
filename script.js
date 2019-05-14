//knchum enq socket.io ev haytarum en side canvasi hamar
var side = 20;
var socket = io();
//haytarum enq popoxakan exanaki hamar vory kereva menak script.js-um
var weatherclient = "Summer";
//serveri exanaky beruma talisa cleintin
socket.on("exanak", function (w) {
    weatherclient = w;
   // console.log(weather);
});
 //setup
 function setup() {
    frameRate(5);
    createCanvas(20 * side , 20 * side);
    background('blue');  
 }
 
//haytararum enq function vory kashxati exanaky stanalu depqum,w parametrov kga serveri exanaky
function drawWeather(w) {
 var p = document.getElementById('seasons');
 var weather = w;
 console.log(weather);

 if (weather == "Summer") {
        p.innerText = "Summer";
    } else if (weather == "Winter") {
        p.innerText = "Winter";
    } else if (weather == "Autumn") {
        p.innerText = "Autumn";
    } else if (weather == "Spring") {
        p.innerText = "Spring";
    }
    
 }

 //draw functiony uxaki serveric ekac matrixi hashvin 
 function drawMatrix(matrix) {
    background('#33FFFF'); 

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                fill("#33FFFF");
                rect(x * side, y * side, side, side);
            }

            else if (matrix[y][x] == 1) {
                if (weatherclient == "Summer") {
                    fill("green");
                } else if (weatherclient != "Summer") {
                    fill("#A79F15");
                }
                rect(x * side, y * side, side, side);
            }

            else if (matrix[y][x] == 2) {
                if (weatherclient == "Winter") {
                    fill("#696968");
                } else if (weatherclient != "Winter") {
                    fill("Yellow");
                }
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
        }
    }
}

//yndunuma serveric matrixy ev kanchuma drawMatrix
socket.on("matrix", drawMatrix);
//yndunuma exanaky serveric ev nkaruma exanaky
socket.on("exanak", drawWeather);

//function event
 function mousePressed() {

    var x = Math.floor(mouseX / side);
    var y = Math.floor(mouseY / side);
    arr = [x, y];
    console.log(arr);
    socket.emit("Sxmvec", arr)

}
//function
function keyPressed() {
    if (keyCode == LEFT_ARROW) {
         var left = "left"
    } else if (keyCode == RIGHT_ARROW) {
         var right = "right"
    } else if (keyCode == UP_ARROW) {
        var up = "up"
    } else if (keyCode == DOWN_ARROW) {
          var down = "down"
    }
     data = {
        keyleft: left,
        keyright: right,
        keyup: up,
        keydown : down
    }
    socket.emit("keyevent", data) ;
}
