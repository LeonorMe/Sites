"use strict";

/**
 * Represents a drawing object.
 * @abstract
 */
class DrawingObjects {
  /**
   * Creates a new DrawingObjects instance.
   * @abstract
   * @constructor
   * @param {number} px - The x-coordinate of the object's position.
   * @param {number} py - The y-coordinate of the object's position.
   * @param {string} c - The color of the object.
   * @param {string} name - The name of the object.
   */
  constructor(px, py, c, name) {
    // Check if the current instance is of the abstract class itself.
    if (this.constructor === DrawingObjects) {
      // Error Type 1. Abstract class cannot be constructed.
      throw new TypeError("Can not construct abstract class.");
    }

    // Otherwise, this constructor is called from a child class.

    // Check if the child class has implemented the "draw" method.
    if (this.draw === DrawingObjects.prototype.draw) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError("Please implement abstract method draw.");
    }

    // Check if the child class has implemented the "mouseOver" method.
    if (this.mouseOver === DrawingObjects.prototype.mouseOver) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError("Please implement abstract method mouseOver.");
    }

    // Initialize the position and name properties.
    this.posx = px;
    this.posy = py;
    this.color = c;
    this.name = name;
  }

  /**
   * Abstract method that should be implemented by child classes to draw the object on the canvas.
   * @param {CanvasRenderingContext2D} cnv - The canvas context where the object will be drawn.
   * @throws {TypeError} - This method should not be called from child classes.
   */
  draw(cnv) {
    // Error Type 6. The child has implemented this method but also called `super.foo()`.
    throw new TypeError("Do not call the abstract method draw from child.");
  }

  /**
   * Abstract method that should be implemented by child classes to handle mouse over events.
   * @param {number} mx - The x coordinate of the mouse pointer.
   * @param {number} my - The y coordinate of the mouse pointer.
   * @abstract
   */
  mouseOver(mx, my) {
    // Error Type 6. The child has implemented this method but also called `super.foo()`.
    throw new TypeError(
      "Do not call the abstract method mouseOver from child."
    );
  }

  // Helper method to calculate the square of the distance between two points.
  /**
   * Calculates the squared distance between two points.
   * @param {number} px1 - The x-coordinate of the first point.
   * @param {number} py1 - The y-coordinate of the first point.
   * @param {number} px2 - The x-coordinate of the second point.
   * @param {number} py2 - The y-coordinate of the second point.
   * @returns {number} The squared distance between the two points.
   */
  sqDist(px1, py1, px2, py2) {
    const xd = px1 - px2;
    const yd = py1 - py2;

    return xd * xd + yd * yd;
  }
}

/**
 * Represents a rectangle object that can be drawn on a canvas.
 * @extends DrawingObjects
 */
class Rect extends DrawingObjects {
  /**
   * Creates a new instance of the Rect class.
   * @constructor
   * @param {number} px - The x-coordinate of the top-left corner of the rectangle.
   * @param {number} py - The y-coordinate of the top-left corner of the rectangle.
   * @param {number} w - The width of the rectangle.
   * @param {number} h - The height of the rectangle.
   * @param {string} c - The color of the rectangle.
   */
  constructor(px, py, w, h, c) {
    // Call the constructor of the parent class (DrawingObjects) with the specified parameters.
    super(px, py, c, "R");
    // Set the width, height, and color properties for the Rect instance.
    this.w = w;
    this.h = h;
  }

  /**
   * Draws a filled rectangle on the canvas at the specified position with the specified width and height.
   * @param {HTMLCanvasElement} cnv - The canvas element to draw on.
   * @returns {void}
   */
  draw(cnv) {
    // Get the 2D rendering context for the canvas.
    const ctx = cnv.getContext("2d");

    // Set the fill color to the specified color for the rectangle.
    ctx.fillStyle = this.color;

    // Draw a filled rectangle on the canvas at the specified position (this.posx, this.posy)
    // with the specified width (this.w) and height (this.h).
    ctx.fillRect(this.posx, this.posy, this.w, this.h);
  }

  /**
   * Checks if the mouse coordinates are within the boundaries of the rectangle.
   * @param {number} mx - The x-coordinate of the mouse pointer.
   * @param {number} my - The y-coordinate of the mouse pointer.
   * @returns {boolean} True if the mouse is over the rectangle, false otherwise.
   */
  mouseOver(mx, my) {
    // Check if the mouse coordinates (mx, my) are within the boundaries of the rectangle.
    return (
      mx >= this.posx &&
      mx <= this.posx + this.w &&
      my >= this.posy &&
      my <= this.posy + this.h
    );
  }
}

/**
 * Represents a picture object that can be drawn on a canvas.
 * @extends DrawingObjects
 */
class Picture extends DrawingObjects {
  /**
   * Creates a new Picture object.
   * @constructor
   * @param {number} px - The x-coordinate of the picture.
   * @param {number} py - The y-coordinate of the picture.
   * @param {number} w - The width of the picture.
   * @param {number} h - The height of the picture.
   * @param {string} impath - The path to the image file.
   */
  constructor(px, py, w, h, impath) {
    // Call the constructor of the parent class (DrawingObjects) with the specified parameters.
    super(px, py, null, "P");
    // Set the width, height, image path, and create an Image object for the Picture instance.
    this.w = w;
    this.h = h;
    this.impath = impath;
    this.imgobj = new Image();
    this.imgobj.src = this.impath;
  }

  /**
   * Draws the image object on the canvas at the specified position and dimensions.
   * If the image is not yet loaded, it adds a load event listener to handle drawing when the image is ready.
   *
   * @param {HTMLCanvasElement} cnv - The canvas element to draw on.
   * @returns {void}
   */
  draw(cnv) {
    // Get the 2D rendering context for the canvas.
    const ctx = cnv.getContext("2d");

    // Check if the image is already loaded and complete.
    if (this.imgobj.complete) {
      // If the image is loaded, draw it on the canvas at the specified position (this.posx, this.posy)
      // with the specified width (this.w) and height (this.h).
      ctx.drawImage(this.imgobj, this.posx, this.posy, this.w, this.h);
    } else {
      // If the image is not yet loaded, add a load event listener to handle drawing when the image is ready.
      // Using a reference to the current instance (self) to access it inside the event listener function.
      const self = this;
      this.imgobj.addEventListener(
        "load",
        function () {
          // Draw the image on the canvas once it's loaded, using the specified position and dimensions.
          ctx.drawImage(self.imgobj, self.posx, self.posy, self.w, self.h);
        },
        false
      );
    }
  }

  /**
   * Checks if the given mouse coordinates are within the boundaries of the image.
   * @param {number} mx - The x-coordinate of the mouse.
   * @param {number} my - The y-coordinate of the mouse.
   * @returns {boolean} - True if the mouse is within the boundaries of the image, false otherwise.
   */
  mouseOver(mx, my) {
    // Check if the mouse coordinates (mx, my) are within the boundaries of the image.
    return (
      mx >= this.posx &&
      mx <= this.posx + this.w &&
      my >= this.posy &&
      my <= this.posy + this.h
    );
  }
}

/**
 * Represents an oval shape that can be drawn on a canvas.
 * @extends DrawingObjects
 */
class Oval extends DrawingObjects {
  /**
   * Creates a new instance of the Oval class.
   * @constructor
   * @param {number} px - The x-coordinate of the center of the oval.
   * @param {number} py - The y-coordinate of the center of the oval.
   * @param {number} r - The radius of the oval.
   * @param {number} hs - The horizontal scaling factor of the oval.
   * @param {number} vs - The vertical scaling factor of the oval.
   * @param {string} c - The fill color for the oval.
   */
  constructor(px, py, r, hs, vs, c) {
    // Call the constructor of the parent class (DrawingObjects) with specified parameters.
    super(px, py, c, "O");
    // Set the radius, horizontal scaling factor, vertical scaling factor, and color for the Oval instance.
    this.r = r;
    this.radsq = r * r; // Square of the radius (used for mouse-over check)
    this.hor = hs; // Horizontal scaling factor
    this.ver = vs; // Vertical scaling factor
  }

  /**
   * Checks if the mouse is over the oval object.
   * @param {number} mx - The x-coordinate of the mouse.
   * @param {number} my - The y-coordinate of the mouse.
   * @returns {boolean} - True if the mouse is over the oval object, false otherwise.
   */
  mouseOver(mx, my) {
    // Define two points: (x1, y1) is the center of the oval, and (x2, y2) is the mouse coordinates scaled by hor and ver.
    const x1 = 0;
    const y1 = 0;
    const x2 = (mx - this.posx) / this.hor;
    const y2 = (my - this.posy) / this.ver;

    // Check if the mouse coordinates are within the oval by comparing the distance squared to the square of the radius.
    return this.sqDist(x1, y1, x2, y2) <= this.radsq;
  }

  /**
   * Draws an oval on the canvas.
   * @param {HTMLCanvasElement} cnv - The canvas element to draw on.
   */
  draw(cnv) {
    const ctx = cnv.getContext("2d");

    // Save the current canvas state to isolate transformations and styles.
    ctx.save();
    ctx.translate(this.posx, this.posy); // Translate the origin to the oval's position.
    ctx.scale(this.hor, this.ver); // Scale the canvas horizontally and vertically.

    // Set the fill color for the oval.
    ctx.fillStyle = this.color;

    // Begin a path for the oval, draw it as an arc at the transformed origin (0, 0) with the specified radius (this.r).
    ctx.beginPath();
    ctx.arc(0, 0, this.r, 0, 2 * Math.PI, true);
    ctx.closePath(); // Close the path to create a filled oval shape.
    ctx.fill(); // Fill the oval with the specified color.

    // Restore the canvas state to its previous state, undoing the translations and scaling.
    ctx.restore();

    console.log("drawn O");
  }
}

/**
 * Represents a heart shape object that can be drawn on a canvas.
 * @extends DrawingObjects
 */
class Heart extends DrawingObjects {
  /**
   * Creates a new instance of DrawingObjects with specified parameters.
   * @constructor
   * @param {number} px - The x-coordinate of the object.
   * @param {number} py - The y-coordinate of the object.
   * @param {number} w - The width of the object.
   * @param {string} c - The fill color for the heart.
   */
  constructor(px, py, w, c) {
    // Call the constructor of the parent class (DrawingObjects) with specified parameters.
    super(px, py, c, "H");
    // Set the height of the heart, half width, square of the radius, angle, and color.
    this.h = w * 0.7; // Height
    this.drx = w / 4; // Half of the width (radius)
    this.radsq = this.drx * this.drx; // Square of the radius (used for mouse-over check)
    this.ang = 0.25 * Math.PI; // Angle for drawing the arcs
  }

  /**
   * Checks if a point is outside the specified bounding box.
   * @param {number} x - The x-coordinate of the top-left corner of the bounding box.
   * @param {number} y - The y-coordinate of the top-left corner of the bounding box.
   * @param {number} w - The width of the bounding box.
   * @param {number} h - The height of the bounding box.
   * @param {number} mx - The x-coordinate of the point to check.
   * @param {number} my - The y-coordinate of the point to check.
   * @returns {boolean} - True if the point is outside the bounding box, false otherwise.
   */
  outside(x, y, w, h, mx, my) {
    // Check if a point (mx, my) is outside the specified bounding box (x, y, w, h).
    return mx < x || mx > x + w || my < y || my > y + h;
  }

  /**
   * Draws a heart shape on the given canvas context.
   * @param {CanvasRenderingContext2D} cnv - The canvas context to draw on.
   */
  draw(cnv) {
    const ctx = cnv.getContext("2d");

    // Calculate the positions of control points and the tip of the heart.
    const leftctrx = this.posx - this.drx;
    const rightctrx = this.posx + this.drx;
    const cx = rightctrx + this.drx * Math.cos(this.ang);
    const cy = this.posy + this.drx * Math.sin(this.ang);

    // Set the fill color for the heart.
    ctx.fillStyle = this.color;

    // Begin drawing the heart shape with arcs and lines.
    ctx.beginPath();
    ctx.moveTo(this.posx, this.posy); // Move to the starting point.

    // Draw the left half of the heart using an arc.
    ctx.arc(leftctrx, this.posy, this.drx, 0, Math.PI - this.ang, true);

    // Continue to the bottom point of the heart and then to the tip.
    ctx.lineTo(this.posx, this.posy + this.h);
    ctx.lineTo(cx, cy);

    // Draw the right half of the heart using another arc.
    ctx.arc(rightctrx, this.posy, this.drx, this.ang, Math.PI, true);

    ctx.closePath(); // Close the path to complete the heart shape.
    ctx.fill(); // Fill the heart shape with the specified color.
  }

  /**
   * Checks if the given point is inside the heart shape.
   * @param {number} mx - The x-coordinate of the point to check.
   * @param {number} my - The y-coordinate of the point to check.
   * @returns {boolean} - True if the point is inside the heart shape, false otherwise.
   */
  mouseOver(mx, my) {
    // Define the positions and dimensions for the bounding rectangle.
    const leftctrx = this.posx - this.drx;
    const rightctrx = this.posx + this.drx;
    const qx = this.posx - 2 * this.drx;
    const qy = this.posy - this.drx;
    const qwidth = 4 * this.drx;
    const qheight = this.drx + this.h;

    // Define two points for comparison (x2, y2) and the slope (m).
    const x2 = this.posx;
    const y2 = this.posy + this.h;
    let m = this.h / (2 * this.drx);

    // Quick test to check if the point is outside the bounding rectangle.
    if (this.outside(qx, qy, qwidth, qheight, mx, my)) {
      return false;
    }

    // Compare the point to the two circle centers of the heart.
    if (this.sqDist(mx, my, leftctrx, this.posy) < this.radsq) return true;
    if (this.sqDist(mx, my, rightctrx, this.posy) < this.radsq) return true;

    // If the point is above the heart and outside the circles, return false.
    if (my <= this.posy) return false;

    // Compare the point to the slopes of the left and right sides of the heart.
    if (mx <= this.posx) {
      return my < m * (mx - x2) + y2;
    } else {
      // Right side
      m = -m;
      return my < m * (mx - x2) + y2;
    }
  }
}

//TO DO: You may need to add more classes other than the following two (e.g., a third new object type and a text object).
class Bear extends DrawingObjects {
  constructor(px, py, r, hs, vs, c) {
    super(px, py, c, "B");
    this.r = r;
    this.hs = hs;
    this.vs = vs;

    this.colorSecundary = "#000000";
    this.colorTerciary = "#ffffff";
    // TODO mudar this.c para this.color
    this.earsL = new Oval(this.posx - 0.7 * this.r, this.posy - 0.9 * this.r, this.r, 0.5, 0.5, this.color);
    this.earsR = new Oval(this.posx + 0.7 * this.r, this.posy - 0.9 * this.r, this.r, 0.5, 0.5, this.color);
    this.earsLins = new Oval(this.posx - 0.7 * this.r, this.posy - 0.9 * this.r, this.r, 0.2, 0.2, this.colorSecundary);
    this.earsRins = new Oval(this.posx + 0.7 * this.r, this.posy - 0.9 * this.r, this.r, 0.2, 0.2, this.colorSecundary);
    this.head = new Oval(this.posx, this.posy, this.r, hs, vs, this.color);

    this.eyeL = new Oval(this.posx - 0.3 * this.r, this.posy - 0.2 * this.r, this.r, 0.25, 0.25, this.colorSecundary);
    this.eyeR = new Oval(this.posx + 0.3 * this.r, this.posy - 0.2 * this.r, this.r, 0.25, 0.25, this.colorSecundary);
    this.eyeLins = new Oval(this.posx - 0.4 * this.r, this.posy - 0.3 * this.r, this.r, 0.1, 0.1, this.colorTerciary);
    this.eyeRins = new Oval(this.posx + 0.2 * this.r, this.posy - 0.3 * this.r, this.r, 0.1, 0.1, this.colorTerciary);
  
    this.nose = new Oval(this.posx, this.posy + 0.3 * this.r, this.r, 0.3, 0.2, this.colorSecundary);
    this.noseIns = new Oval(this.posx - 0.1 * this.r, this.posy + 0.2 * this.r, this.r, 0.1, 0.06, this.colorTerciary);
  }

  mouseOver(mx, my) {
    if (this.head.mouseOver(mx, my) || this.earsL.mouseOver(mx, my) || this.earsR.mouseOver(mx, my) ){
      return true;
    }
  }

  draw(cnv) {
    const ctx = cnv.getContext("2d");
    
    this.earsL.draw(cnv);
    this.earsR.draw(cnv);
    this.earsLins.draw(cnv);
    this.earsRins.draw(cnv);
    this.head.draw(cnv);
    this.eyeL.draw(cnv);
    this.eyeR.draw(cnv);
    this.eyeLins.draw(cnv);
    this.eyeRins.draw(cnv);
    this.nose.draw(cnv);
    this.noseIns.draw(cnv);
    
    ctx.strokeStyle =  this.colorSecundary;
    ctx.beginPath();
    ctx.arc(this.posx - 0.23 * this.r, this.posy + 0.5 * this.r, this.r * 0.2, Math.PI, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.posx + 0.23 * this.r, this.posy + 0.5 * this.r, this.r * 0.2, Math.PI, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath();

    // criar um set pose que altera a posiçao da ovais 
    // fazer uma class geral do set pose e dpeis para cada objeto fazer a sua versão
  }
}

class Ghost extends DrawingObjects {
  constructor(px, py, w, h, c) {
    super(px, py, c, "G");
    this.w = w;
    this.h = h;
  }

  mouseOver(mx, my) {
    if (my >= this.posy && my <= this.posy + this.h) {
      // detetar se o rato esta sobre
      // ver se esta dentor do quadrado
      const cnv = documento.createElemente("canvas");
      const ctx = cnv.getcontext("2d");
      this.draw(cnv); // desenhar o proproios gost num canvas vazio

      if (ctx.isPointInInPath(mx, my)) {
        // devoove se o pnoto esta nu ultimo path desenhaod no canvas
        console.log;
        return true;
      }
      // existe uma forma alternativa de se criar um path e ver se o ponto esta dentro
    }
  }

  draw(cnv) {
    const ctx = cnv.getContext("2d");

    const curveRadius = 20;
    ctx.beginPath();
    ctx.moveTo(this.posx + curveRadius, this.posy);
    ctx.arcTo(
      this.posx + this.w,
      this.posy,
      this.posx + this.w,
      this.posy + this.h,
      curveRadius
    );
    ctx.lineTo(this.posx + this.w, this.posy + this.h);

    const legW = this.w / 6;

    ctx.lineTo(this.posx + 5 * legW, this.posy + (2 / 3) * this.h);
    ctx.lineTo(this.posx + 4 * legW, this.posy + this.h);
    ctx.lineTo(this.posx + 3 * legW, this.posy + (2 / 3) * this.h);
    ctx.lineTo(this.posx + 2 * legW, this.posy + this.h);
    ctx.lineTo(this.posx + 1 * legW, this.posy + (2 / 3) * this.h);
    ctx.lineTo(this.posx, this.posy + this.h);

    ctx.lineTo(this.posx, this.posy - this.h);
    ctx.arcTo(
      this.posx,
      this.posy - this.h,
      this.posx + curveRadius,
      this.posy,
      curveRadius
    );
    ctx.closePath();
    ctx.fill;
  }
}

// TODO text object
class TextObject extends DrawingObjects {
  constructor(px, py, c, t) {
    super(px, py, c, "T");
    this.text = t;
  }

  mouseOver(mx, my) {}

  draw(cnv) {
    const ctx = cnv.getContext("2d");
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.posx, this.posy);
  }
}

// TODO  fazer um boneco extra
class Star extends DrawingObjects {
  constructor(px, py, r, hs, vs, c) {
    super(px, py, c, "S");
    this.r = r;
    this.hs = hs;
    this.vs = vs;

    //this.earsL = new Oval(this.posx - 0.7 * this.r, this.posy - 0.9 * this.r, this.r, 0.5, 0.5, this.color);
    //this.earsR = new Oval(this.posx + 0.7 * this.r, this.posy - 0.9 * this.r, this.r, 0.5, 0.5, this.color);
    this.head = new Oval(this.posx, this.posy, this.r, hs, vs, this.color);
  }

  mouseOver(mx, my) {
    if (this.head.mouseOver(mx, my)) // || this.earsL.mouseOver(mx, my) || this.earsR.mouseOver(mx, my) ){
      return true;
  }

  draw(cnv) {
    const ctx = cnv.getContext("2d");
    
    //this.earsL.draw(cnv);
    //this.earsR.draw(cnv);
    this.head.setPos(this.posx, this.posy);
    this.head.draw(cnv);
    
    ctx.strokeStyle =  this.colorSecundary;
    ctx.beginPath();
    ctx.arc(this.posx - 0.23 * this.r, this.posy + 0.5 * this.r, this.r * 0.2, Math.PI, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath();
  }

  setPos(mx, my){
    this.head.posx = mx;
    this.head.posy = my;
  }
}

/* Cor - usar bootstrap para ficar mais bonito
<div>
<input type="color" id="object-color"
name="object-color" value"#ffffff" />
<label for="object-color">Object Color</label> 
</div>

<div>
<input type="color" id="background-color" name="background-color" value="#000" />
<label for="background-color">Background Color</label>
</div>

//js
documet.getelementById("onject-color").value

*/

// TODO : por animaçoe sno projeto

// let texto = prompt("texto");

//
