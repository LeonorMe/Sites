'use strict';

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
            throw new TypeError('Can not construct abstract class.');
        }

        // Otherwise, this constructor is called from a child class.

        // Check if the child class has implemented the "draw" method.
        if (this.draw === DrawingObjects.prototype.draw) {
            // Error Type 4. Child has not implemented this abstract method.
            throw new TypeError('Please implement abstract method draw.');
        }

        // Check if the child class has implemented the "mouseOver" method.
        if (this.mouseOver === DrawingObjects.prototype.mouseOver) {
            // Error Type 4. Child has not implemented this abstract method.
            throw new TypeError('Please implement abstract method mouseOver.');
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
        throw new TypeError('Do not call the abstract method draw from child.');
    }

    /**
     * Abstract method that should be implemented by child classes to handle mouse over events.
     * @param {number} mx - The x coordinate of the mouse pointer.
     * @param {number} my - The y coordinate of the mouse pointer.
     * @abstract
     */
    mouseOver(mx, my) {
        // Error Type 6. The child has implemented this method but also called `super.foo()`.
        throw new TypeError('Do not call the abstract method mouseOver from child.');
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

        return ((xd * xd) + (yd * yd));
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
        super(px, py, c, 'R');
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
        const ctx = cnv.getContext('2d');

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
            (mx >= this.posx) &&
            (mx <= (this.posx + this.w)) &&
            (my >= this.posy) &&
            (my <= (this.posy + this.h))
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
        super(px, py, null, 'P');
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
        const ctx = cnv.getContext('2d');

        // Check if the image is already loaded and complete.
        if (this.imgobj.complete) {
            // If the image is loaded, draw it on the canvas at the specified position (this.posx, this.posy)
            // with the specified width (this.w) and height (this.h).
            ctx.drawImage(this.imgobj, this.posx, this.posy, this.w, this.h);
        } else {
            // If the image is not yet loaded, add a load event listener to handle drawing when the image is ready.
            // Using a reference to the current instance (self) to access it inside the event listener function.
            const self = this;
            this.imgobj.addEventListener('load', function () {
                // Draw the image on the canvas once it's loaded, using the specified position and dimensions.
                ctx.drawImage(self.imgobj, self.posx, self.posy, self.w, self.h);
            }, false);
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
            (mx >= this.posx) &&
            (mx <= (this.posx + this.w)) &&
            (my >= this.posy) &&
            (my <= (this.posy + this.h))
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
        super(px, py, c, 'O');
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
        return (this.sqDist(x1, y1, x2, y2) <= this.radsq);
    }

    /**
     * Draws an oval on the canvas.
     * @param {HTMLCanvasElement} cnv - The canvas element to draw on.
     */
    draw(cnv) {
        const ctx = cnv.getContext('2d');

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
        super(px, py, c, 'H');
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
        const ctx = cnv.getContext('2d');

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
        } else { // Right side
            m = -m;
            return my < m * (mx - x2) + y2;
        }
    }
}

//TO DO: You may need to add more classes other than the following two (e.g., a third new object type and a text object).
/*class Bear extends DrawingObjects
{
    constructor () {
        super(px, py, 'B');

    }

    mouseOver (mx, my) {

    }

    draw (cnv) {
        const ctx = cnv.getContext('2d');


    }
}

class Ghost extends DrawingObjects
{
    constructor () {
        super(px, py, 'G');

    }

    mouseOver (mx, my) {

    }

    draw (cnv) {
        const ctx = cnv.getContext('2d');


    }
}
*/
