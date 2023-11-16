'use strict';

let app = null;

// Entry point of the application
/**
 * Initializes the FotoPrint app and adds event listeners for mouse actions.
 * @function
 * @returns {void}
 */
function main() {
    // Get the canvas element by its id
    const cnv = document.getElementById('canvas');

    // Create a new instance of the FotoPrint class and draw the initial canvas rectangle
    app = new FotoPrint();
    drawCanvasRect(cnv);  // Function to draw a canvas rectangle

    // Initialize the FotoPrint app and draw objects on the canvas
    app.init();           // Function to initialize the application with various drawing objects
    app.drawObj(cnv);     // Function to draw all objects in the pool on the canvas

    // Add event listeners for the save-as-image and remove buttons
    document.getElementById('save-as-image').addEventListener('click', saveasimage);
    document.getElementById('remove').addEventListener('click', remove);

    // Add event listeners for mouse actions: drag, double-click, and window resize
    cnv.addEventListener('mousedown', drag);
    cnv.addEventListener('dblclick', makenewitem);

    updateCanvasSize();
    window.addEventListener('resize', function () {
        updateCanvasSize();  // Function to update the canvas size on window resize
    });

    /* TO DO */
}

// Function to draw the canvas rectangle
/**
 * Draws a black rectangle border on the canvas.
 * @param {HTMLCanvasElement} cnv - The canvas element to draw on.
 */
function drawCanvasRect(cnv) {
    const ctx = cnv.getContext('2d'); 

    // Clear the canvas and draw a black rectangle border
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.strokeStyle = 'black';

    /* TO DO */

    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, cnv.width, cnv.height);
}

// Drag & Drop operation - mousedown event
/**
 * Handles the drag event for canvas element.
 * @param {MouseEvent} ev - The mouse event object.
 */
function drag(ev) {
    const cnv = document.getElementById('canvas');
    const [xPos, yPos] = getMouseCoord(cnv); 
    const mx = ev.x - xPos;
    const my = ev.y - yPos;

    // If dragging is successful, set cursor and add move and drop event listeners
    if (app.dragObj(mx, my)) {
        cnv.style.cursor = 'pointer';
        cnv.addEventListener('mousemove', move, false);
        cnv.addEventListener('mouseup', drop, false);
    }
}

// Drag & Drop operation - mousemove event
/**
 * Moves an object on the canvas based on mouse coordinates.
 * @param {MouseEvent} ev - The mouse event.
 */
function move(ev) {
    const cnv = document.getElementById('canvas');
    const [xPos, yPos] = getMouseCoord(cnv); 
    const mx = ev.x - xPos;
    const my = ev.y - yPos;

    // Move the object, redraw canvas rectangle, and draw objects
    app.moveObj(mx, my);
    drawCanvasRect(cnv);
    app.drawObj(cnv);
}

// Drag & Drop operation - mouseup event
/**
 * Removes move and drop event listeners and resets cursor.
 */
function drop() {
    const cnv = document.getElementById('canvas'); 

    // Remove move and drop event listeners, reset cursor
    cnv.removeEventListener('mousemove', move, false);
    cnv.removeEventListener('mouseup', drop, false);
    cnv.style.cursor = 'crosshair';
}

// Insert a new Object on Canvas - dblclick event
/**
 * Creates a new item on the canvas at the position of the mouse click event.
 * @param {MouseEvent} ev - The mouse click event.
 */
function makenewitem(ev) {
    let mx = null;
    let my = null;
    const cnv = document.getElementById('canvas');

    // Calculate mouse coordinates relative to the canvas
    let xPos = 0;
    let yPos = 0;
    [xPos, yPos] = getMouseCoord(cnv);
    mx = ev.x - xPos;
    my = ev.y - yPos;

    // If insertion is successful, redraw canvas rectangle and draw objects
    if (app.insertObj(mx, my)) {
        drawCanvasRect(cnv);
        app.drawObj(cnv);
    }
}

// Delete button - onclick event
/**
 * Removes the last object from the canvas, redraws the canvas rectangle, and draws the remaining objects.
 */
function remove() {
    const cnv = document.getElementById('canvas'); 

    // Remove the last object, redraw canvas rectangle, and draw objects
    app.removeObj();
    drawCanvasRect(cnv);
    app.drawObj(cnv);
}

// Save button - onclick event
/**
 * Saves the contents of the canvas element as a PNG image with the specified file name.
 * @function
 * @name saveasimage
 * @returns {void}
 */
function saveasimage() {
    try {
        // Get the canvas element by its ID
        const canvas = document.getElementById('canvas'); 

        // Convert the contents of the canvas to a data URL representing a PNG image
        const dataUrl = canvas.toDataURL('image/png');

        // Create a temporary link element
        const link = document.createElement('a'); 

        // Set the link's href to the data URL and the download attribute to the specified file name
        link.href = dataUrl;
        link.download = 'photo.png';

        // Trigger a click on the link to start the download
        link.click();
    } catch (err) {
        // Display an alert if there is an issue with saving and log the error to the console
        alert('Failed to save the canvas as an image. Please try again.');
        console.error(err);
    }
}

// Function to get mouse coordinates for all browsers
/**
 * Calculates the coordinates of the mouse relative to the top-left corner of the specified element.
 * @param {HTMLElement} el - The element to calculate the coordinates relative to.
 * @returns {Array<number>} An array containing the x and y coordinates of the mouse.
 */
function getMouseCoord(el) {
    let xPos = 0;  // Initialize the x-coordinate
    let yPos = 0;  // Initialize the y-coordinate

    // Traverse the DOM hierarchy to calculate the coordinates
    while (el) {
        if (el.tagName === 'BODY') {
            // Deal with browser quirks with body/window/document and page scroll
            let xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            let yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
            // For all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return [xPos, yPos];
}

/**
 * Updates the size of the canvas and draws the canvas rectangle and objects.
 */
function updateCanvasSize() {
    const cnv = document.getElementById('canvas');
    // Set the width of the canvas to match the body's width
    cnv.width = document.body.clientWidth;

    // Draw the canvas rectangle and objects
    drawCanvasRect(cnv);
    app.drawObj(cnv);
}
