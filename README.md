
# Programming Summative Assessment 1
## Example explanation
---
In the example I have created, the ellipses have been altered so that they are now instances of 'Shape' class. I have updated the sketch in a variety of different ways:
+ A menu has been added to the upper left hand corner of the page, which utilizes the same bounding/reflecting mechanisms that were previously only on the edges of the window.
+ Instruction information has been added to the example's menu, in a bulleted fashion.
+ There is a checkbox to control whether custom colours are being utlized or not, and a slider to choose the custom color.
+ There are four different checkboxes to choose from which indicate which type of shape object will be created and displayed.
+ Pressing the 'M' key will prevent the instantiation of more objects, and prevent current objects from diminishing.
+ Pressing the 'R' key will reset the current objects on screen, essentially removing them all.
+ Finally, there is a friction slider which can be modified to dictate the velocity of the particles.
---
## Methods and parameters
---
### Constructor method
``` js
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
```
The constructor in this example takes 6 different parameters:
1. x - this is the `x` position of the mouse.
2. y - this is the `y` position of the mouse.
3. vx - the velocity in the x direction.
4. vy - the velocity in the y direction.
5. type - a passed value from 0-3, indicating which of the four shapes will be created.
6. colour - this is the passed value of the slider element.

+ The radius is a random value between 5 and 50, so random sizes of shapes are created. 
+ Position creates a vector with the x and y position of the mouse which can be manipulated later, similar with velocity.
+ Friction is created and used such that the shape velocities are slowed own over time.
+ h is an attribute which has a rapidly fluctuating value from between 0 and 255, so that when it is used the red or hue values change constantly according to time passed. 
+ _type will collect the passed type value.
+ _colour sets a RGB color from the passed slider value.

---
### Other Methods
---
#### update
``` js
update() {
      this.velocity = this.velocity.mult(1 - this.friction);
      this.position = this.position.add(this.velocity); //position is updated depending on the velocity of the particle.
      if(!staticmode){
        this.radius -= 0.1; //particles continually get smaller and smaller
        }
}
```
In this method, the both the velocity and position of each particle are changing continually. this.velocity is being multiplied by (1-this.friction), which means that the velocity will continue to grow smaller and smaller. The position of the particles are changed according to the velocity of the particle. In the example, if pause mode is selected, it is clear to see that all of the particles will eventually reach 0 velocity and a static position. The radius is also continually decremented, until it becomes 0, at which point it is removed from the list of particles. This only occurs if the variable staticmode is false, however. Staticmode can only be entered if the user presses the 'm' key.

#### wallBound
``` js
wallBound() {
    if ((this.position.x >= width - this.radius) || (this.position.x <= this.radius) || (this.position.x - this.radius <= 300 && this.position.y <= 400)) { //Bounds left and  rights sides of map.
        this.velocity.x = -this.velocity.x; //flip the direction
    }
    else if ((this.position.y >= height - this.radius) || (this.position.y <= this.radius) || (this.position.y - this.radius <= 400 && this.position.x <= 300 )) { //Bounds top and bottom sides.
        this.velocity.y = -this.velocity.y; //flip the direction.
    }
    else {
        return;
    }
}
```
This method will check to see if the particles have collided with a certain region on the example, and then reverse the corresponding axis direction if they do. There are 3 conditions in the if statements, any of which can be met in order for the reversion to occur. The first condition in the first if statement checks if the edge of the shape is touching one of the sides of the window. The control menu on the left hand side of the window with the form controls on it is a shape created with dimensions 300x400. Firstly, I let there be an area 300x400 of which if the mouse enters, then there is a variable overmenu which is set to true. Morever, this cancels the creation of any new shapes during this time. Finally, as the cursor moves towards the 'menu', the third condition states that if the x position of the particle meets the edge of the 'menu', then reverse the direction. However, this would mean that the shape would reflect off of any wall extrapolated downwards of the menu, so the sub-condition of the y position being less than 400 had to also be included. 

The second if statement is identical, except for it deals with the y values of the shape and menu instead. If neither of these if statements are met, do nothing. (note - the direction of the shape can easily be changed by letting the value be negation of itself.)

#### display
``` js
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

```
Display will display the correct shape to the canvas. Firstly, push() created a new drawing state. The state is then translated from the default position to the mouse's current x and y position. Strokeweight is initalised with the thinnest setting for the outer edge of the shapes. customcolour is then checked for its current state. If it is true, then we can apply the colour as suggested by the slider element. Otherwise, display the default alternating RBG color. Next, the type of shape is checked. 0 intialised an ellipse, 1 a rectangle (square, in this case), 2 a triangle, and 3 a custom drawn star. the rect() first values are negative to ensure that the shape is creating over the mouse. The custom star shape is created by using beginShape(). 10 vertices are then required in the creation of a star, so they were simply placed in relation to the mouse position, with said position being at the center of the star. endShape(CLOSE) ensures that the lines joining each vertex exists in the order written above from the beginShape() line.

### Getter and Setter
``` js
get Friction() {
    return this.friction;
}
set Friction(val){
    this.friction = val;
}
```

The getter and setter 'Friction' can be used to read the value of friction or update it. In this instance, the friction slider value is set as the object's friction value.

---
## Extra Notes
1. Internal Style Sheet CSS added to the html file for the slider aesthetics.
2. Form created in the HTML file which contains all of the division and elements of the example.
3. All shape checkboxes have an onclick function pointing to the same js function 'checkTicked()'.
4. Colour and Friction sliders have separate onchange js functions (getCSlider and getFSlider, respectively).
5. The friction slider's value is taken and divided by 1000 because the range is too small to enter normally into the slider.
6. Canvas created and styled with z-index -1 so that the canvas does not appear in front of the html elements.
7. The checkTicked function stores the checkbox elements into variables by getElementById, and checks which checkbox is true. '===' has to be used.
8. getCSlider and getFSlider are the js functions assigned to the html slider elements, which essentially obtain the values of the sliders and store them into usable js variables.
9. checkKeyPress will check certain keycodes to have been pressed. In this case, keycode for 'R' and 'M'. 'R' will empty out the particles array whilst 'M' will activate staticmode.
10. windowResized changes the window size if it is changed by the user.
11. The mousemoved function checks for staticmode, then under certain conditions will instantiate a specific object based on the type parameter passed.
12. Finally, the draw function handles the particles array, as well as checks to see if the mouse is over the menu or not and actually created the menu rectangle shape..

## Details & Source

The link to the sketch that I have used for my project can be found via the following link: [https://www.openprocessing.org/sketch/560246](https://www.openprocessing.org/sketch/560246) which is known as "Bounce circles" by Dama. It is licensed under Creative Commons Attribution ShareAlike which can be found at the following links:
+ [https://creativecommons.org/licenses/by-sa/3.0](https://creativecommons.org/licenses/by-sa/3.0) 
+ [https://creativecommons.org/licenses/GPL/2.0/](https://creativecommons.org/licenses/GPL/2.0/) 



