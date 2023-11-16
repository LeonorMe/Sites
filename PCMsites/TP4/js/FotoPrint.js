'use strict';

/**
 * Represents a drawing application that manages a pool of drawing objects.
 * @class
 */
class FotoPrint {
    /**
     * Creates a new instance of the FotoPrint class.
     * @constructor
     */
    constructor() {
        // Keeps track of the object being moved.
        this.thingInMotion = null;
        // Mouse offset in the x-direction during drag.
        this.offsetx = null;
        // Mouse offset in the y-direction during drag.
        this.offsety = null;
        // Creates a pool to manage drawing objects.
        this.shpinDrawing = new Pool(100);

        // Default color for drawing objects.
        this.color = '#add8e6';

        /* TO DO */
    }

    /**
     * Initializes the application with various drawing objects.
     */
    init() {
        // Initialize the application with various drawing objects.
        const r = new Rect(10, 20, 50, 50, this.color);
        this.shpinDrawing.insert(r);

        const o = new Oval(100, 45, 25, 1, 1, this.color);
        this.shpinDrawing.insert(o);

        const h = new Heart(175, 30, 60, this.color);
        this.shpinDrawing.insert(h);

        /* TO DO */

        // Create a picture (loaded from an image file) and insert it into the drawing pool.
        const p = new Picture(10, 100, 100, 100, 'imgs/allison1.jpg');
        this.shpinDrawing.insert(p);
    }

    /**
     * Draws all objects in the pool on the canvas.
     * @param {CanvasRenderingContext2D} cnv - The canvas context to draw on.
     */
    drawObj(cnv) {
        // Draw all objects in the pool on the canvas.
        this.shpinDrawing.stuff.forEach(o => o.draw(cnv));
    }

    /**
     * Checks if an object is being dragged based on mouse coordinates.
     * @param {number} mx - The x coordinate of the mouse.
     * @param {number} my - The y coordinate of the mouse.
     * @returns {boolean} - True if an object is being dragged, false otherwise.
     */
    dragObj(mx, my) {
        // Check if an object is being dragged based on mouse coordinates.
        return this.shpinDrawing.stuff.find((o, i, arr) => {
            if(o.mouseOver(mx, my)) {
                this.offsetx = mx - o.posx;
                this.offsety = my - o.posy;
                this.thingInMotion = arr.length - 1;
                arr.splice(i, 1);
                arr.push(o);
                return true;
            }
            return false;
        });
    }

    /**
     * Move the currently dragged object based on mouse coordinates.
     * @param {number} mx - The x-coordinate of the mouse.
     * @param {number} my - The y-coordinate of the mouse.
     */
    moveObj(mx, my) {
        // Move the currently dragged object based on mouse coordinates.
        this.shpinDrawing.stuff[this.thingInMotion].posx = mx - this.offsetx;
        this.shpinDrawing.stuff[this.thingInMotion].posy = my - this.offsety;
    }

    /**
     * Removes the last object from the pool.
     */
    removeObj() {
        // Remove the last object from the pool.
        this.shpinDrawing.remove();
    }

    /**
     * Inserts a cloned object into the pool based on mouse coordinates.
     * @param {number} mx - The x-coordinate of the mouse.
     * @param {number} my - The y-coordinate of the mouse.
     * @returns {boolean} - Returns true if an object was inserted, false otherwise.
     */
    insertObj(mx, my) {
        // Insert a cloned object into the pool based on mouse coordinates.
        return this.shpinDrawing.stuff.find((o, i, arr) => {
            if(o.mouseOver(mx, my)) {
                this.shpinDrawing.insert(this.cloneObj(o));
                return true;
            }
            return false;
        });

        /* TO DO */
    }

    /**
     * Clones a drawing object based on its type.
     * @param {Object} obj - The object to be cloned.
     * @returns {Object} - The cloned object.
     * @throws {TypeError} - If the object type cannot be cloned.
     */
    cloneObj(obj) {
        // Clone a drawing object based on its type.
        let item = {};

        switch (obj.name) {
            case 'R':
                item = new Rect(obj.posx + 20, obj.posy + 20, obj.w, obj.h, obj.color);
                break;
            case 'P':
                item = new Picture(obj.posx + 20, obj.posy + 20, obj.w, obj.h, obj.impath);
                break;
            case 'O':
                item = new Oval(obj.posx + 20, obj.posy + 20, obj.r, obj.hor, obj.ver, obj.color);
                break;
            case 'H':
                item = new Heart(obj.posx + 20, obj.posy + 20, obj.drx * 4, obj.color);
                break;
            case 'B':
                item = new Bear(obj.posx + 20, obj.posy + 20, obj.size, obj.color);
                break;
            case 'G':
                item = new Ghost(obj.posx + 20, obj.posy + 20, obj.width, obj.height, obj.color);
                break;
            case 'S':
                item = new Star(obj.posx + 20, obj.posy + 20, obj.size, obj.color);
                break;
            case 'T':
                item = new TextObject(obj.posx + 20, obj.posy + 20, obj.w, obj.color, obj.text);
                break;
            default:
                throw new TypeError('Cannot clone this type of object');
        }
        return item;
    }
}


/**
 * Represents a pool of drawing objects.
 * @class
 */
class Pool {
    /**
     * Creates a new pool object with a specified maximum size.
     * @constructor
     * @param {number} maxSize - The maximum size of the pool.
     */
    constructor(maxSize) {
        // Maximum size of the pool.
        this.size = maxSize;
        // Array to store drawing objects.
        this.stuff = [];
    }

    /**
     * Inserts an object into the pool if it's not full.
     * @param {Object} obj - The object to be inserted into the pool.
     */
    insert(obj) {
        // Insert an object into the pool if it's not full.
        if (this.stuff.length < this.size) {
            this.stuff.push(obj);
        } else {
            // Display an alert if the pool is full.
            alert('The pool is full: there isn\'t more memory space to include objects');
            /* TO DO: Consider alternative actions when the pool is full, such as removing the oldest object or expanding the pool size. */
        }
    }

    /**
     * Removes the last object from the pool if it's not empty. Displays an alert if there are no objects to delete.
     */
    remove() {
        // Remove the last object from the pool if it's not empty.
        if (this.stuff.length !== 0) {
            this.stuff.pop();
        } else {
            // Display an alert if there are no objects to delete.
            alert('There are no objects in the pool to delete');
            /* TO DO: Consider alternative actions when attempting to remove an object from an empty pool, such as ignoring the request or prompting the user for additional input. */
        }
    }
}
