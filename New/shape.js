class Shape {
    constructor(x, y, vx, vy, type, colour) {
      this.position = createVector(x, y);
      this.velocity = createVector(vx, vy);
      this.friction = 0.005;
      this.h = 255 * abs(cos((frameCount / 600) * PI));
      this.fcolor = color(this.h, 255, 255, 100);
      this.ecolor = color(this.h, 255, 255, 200);
      this.radius = random(5, 50); //bubble has a random radius from 5 to 50
      this._type = type; 
      this._colour = color(colour,colour,colour);
    }
    
    update() {
      this.velocity = this.velocity.mult(1 - this.friction);
      this.position = this.position.add(this.velocity); //position is updated depending on the velocity of the particle.
      if(!staticmode){
        this.radius -= 0.1; //particles continually get smaller and smaller
        }
    }
 
    wallBound() {
      if ((this.position.x >= width - this.radius) || (this.position.x <= this.radius) || (this.position.x - this.radius <= 300 && this.position.y <= 400)) { //Bounds left and rights sides of map.
        this.velocity.x = -this.velocity.x; //flip the direction
      }
      else if ((this.position.y >= height - this.radius) || (this.position.y <= this.radius) || (this.position.y - this.radius <= 400 && this.position.x <= 300 )) { //Bounds top and bottom sides.
        this.velocity.y = -this.velocity.y; //flip the direction.
      }
      else {
        return;
      }
    }
  
    display() {
        push();
        translate(this.position.x, this.position.y);
        strokeWeight(1); //thin borders
        
        if(customcolour){
            stroke(this._colour); //outline colour
            fill(this._colour); 
        
        } else if (!customcolour){ //if not custom colours
            stroke(this.ecolor); //outline colour
            fill(this.fcolor);
    
        } if (this._type == 0) {
            ellipse(0, 0, 2 * this.radius, 2 * this.radius);
        } else if (this._type == 1){
            rect(-22.5,-22.5,this.radius,this.radius);
        } else if (this._type == 2){
            triangle(-20, 20, 0, -20, 20, 20);
        } else if (this._type == 3){
            beginShape();
            vertex(0, -20); //top, anticlockwise
            vertex(-7, -5);
            vertex(-25, -5);
            vertex(-10, 3);
            vertex(-15, 20);
            vertex(0, 10);
            vertex(15, 20);
            vertex(10, 3);
            vertex(25, -5);
            vertex(7, -5);
            endShape(CLOSE);
        }
        pop();

    }

    get Friction() {
        return this.friction;
    }
    set Friction(val){
        this.friction = val;
    }
  
}