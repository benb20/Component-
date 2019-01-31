var particles = []; //Array of particles
var Canvas;
var type = 0; //type of object 0 ellipse 1 square 2 triangle.
var overMenu;
var staticmode = false; //in static mode
var customcolour = false;
var customFriction = 0;
var colourvalue;

var ellipsetest;
var squaretest;
var triangletest;
var startest;

function setup() {
  Canvas = createCanvas(window.innerWidth, window.innerHeight);
  Canvas.position(0,0);
  Canvas.style('z-index','-1'); //places to canvas behind the html form elements
  document.body.style.overflow = "hidden"; //hides scrollbars
  pixelDensity(1);
  colorMode(HSB, 255);
}

window.addEventListener("keydown", checkKeyPress, false); //checks for any keypress


function checkTicked(){
  var elbox = document.getElementById('elbox');
  var sqbox = document.getElementById('sqbox');
  var tribox = document.getElementById('tribox');
  var colourbox = document.getElementById('colourbox')
  var starbox = document.getElementById('starbox')

  if (elbox.checked === true){
    ellipsetest = true;
    sqbox.checked = false;
    tribox.checked = false;
    starbox.checked = false;
  } else if (elbox.checked === false){
    ellipsetest = false;
  }
  if (sqbox.checked === true){
    squaretest = true;
    tribox.checked = false;
    elbox.checked = false;
    starbox.checked = false;
  } else if (sqbox.checked === false){
    squaretest = false;
  }
  if (tribox.checked === true){
    triangletest = true;
    sqbox.checked = false;
    elbox.checked = false;
    starbox.checked = false;
  } else if (tribox.checked === false){
    triangletest = false;
  } 
  if(starbox.checked === true){
    startest = true;
    tribox.checked = false;
    sqbox.checked = false;
    elbox.checked = false;
  } else if (starbox.checked === false){
    startest = false;
  }

  if(colourbox.checked === true){
    customcolour = true;
  } else if (colourbox.checked === false){
    customcolour = false;
  }
}

function getCSlider(val) {
  colourvalue = val; 
}
function getFSlider(val){
  customFriction = val/1000;
}

function checkKeyPress(key){
  if(key.keyCode == "82"){ //'r' keycode
    particles.length = 0; //resets objects
  } else if(key.keyCode == "77"){ //'m' keycode
    staticmode = !staticmode; //reverses the mode
  }

}

function draw() {
  background("black");
  var newParticles = [];
  for (var i = 0; i < particles.length; i++) { //increment i while it is less than length of particles array
    particles[i].update(); //updates size, colour etc. of particle
    particles[i].wallBound(); //bounds particle
    particles[i].display(); //calls for the current particle to be displayed
    particles[i].Friction = customFriction;
    if (particles[i].radius > 0) {
      newParticles.push(particles[i]);
    }
    
  }
  particles = newParticles;

  // Test if the cursor is over the box 
  if (mouseX < 300 && mouseY < 400) {
  overmenu = true;  
} else {
  overmenu = false;
}
  push;
  rect(0,-1,300,400,0,0,10,0); //-1 to remove black offset at the top.
  fill(200); //gives menu a gray background
  pop;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseMoved() { //For mouse movement
  var x = mouseX;
  var y = mouseY;
  var vx = (winMouseX - pwinMouseX) * 0.2;
  var vy = (winMouseY - pwinMouseY) * 0.2;

  if(!staticmode){  
    if ((ellipsetest) && (!overmenu) && (x > 50 && x < width -50) && (y > 50 && y < height - 50)){ //push an ellipse
        type = 0;
        particles.push(new Shape(x, y, vx, vy, type, colourvalue));
    } else if ((squaretest) && (!overmenu) && (x > 50 && x < width -50) && (y > 50 && y < height - 50)) {
        type = 1;
        particles.push(new Shape(x, y, vx, vy, type, colourvalue)); //create a new instance of particle
    } else if ((triangletest) && (!overmenu) && (x > 50 && x < width -50) && (y > 50 && y < height - 50)) {
        type = 2;
        particles.push(new Shape(x, y, vx, vy, type, colourvalue)); //create a new instance of particle
    } else if ((startest) && (!overmenu) && (x > 50 && x < width -50) && (y > 50 && y < height - 50)) {
        type = 3;
        particles.push(new Shape(x, y, vx, vy, type, colourvalue)); //create a new instance of particle
    }
  } 
}

