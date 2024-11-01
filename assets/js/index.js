'use strict';

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

function selectAll(selector, scope = document) {
  return scope.querySelectorAll(selector);
}

function listen(event, element, callback) {
  return element.addEventListener(event, callback);
}

const colourSelect = select('#colour');
const shapeSelect = select('#shape');
const createBtn = select('button');
const mainBox = select('.main-box');
const infoText = select('.info-text');
const doc = select('body');


class Shape {
  constructor(shape, colour) {
    this.shape = shape;
    this.colour = colour;
  }

  set colour(colour) {
    this._colour = colour
  }

  set shape(shape) {
    this._shape = shape;
  }

  get colour() {
    return this._colour;
  }

  get shape() {
    return this._shape;
  }

  getInfo() {
    if (this.colour === '#09f') return `Blue ${this.shape}`;
    if (this.colour === '#9f0') return `Green ${this.shape}`;
    if (this.colour === '#f90') return `Orange ${this.shape}`;
    if (this.colour === '#f09') return `Pink ${this.shape}`;
    if (this.colour === '#90f') return `Purple ${this.shape}`;
    return `No selected color ${this.shape}`;
  }
}

const grid = [];


function buildShape() {
  let shape = shapeSelect.value;
  let colour = colourSelect.value;
  const newShape = new Shape(shape, colour);
  grid.push(newShape);
  if (grid.length > 20) grid.shift();

}

function createShape() {
  let shape = grid[grid.length - 1];
  const div = document.createElement('div');
  mainBox.appendChild(div);
  div.style.backgroundColor = shape.colour;
  div.classList.add(shape.shape);
  div.classList.add('created');

  listen('click', div, () => {
    const index = Array.from(mainBox.children).indexOf(div);
    infoText.textContent = `Position ${index + 1}: ${shape.getInfo()}`;
});
}

function removeShape(){
  const shapedDiv = selectAll('.created'); 
  if (shapedDiv.length > 20) shapedDiv[0].remove();
}



listen('click', createBtn, () => {
  buildShape();
  createShape();
  removeShape();
});

listen('click', mainBox, () => {

})

listen('focus', colourSelect, () => {
  colourSelect.size = 5;
  colourSelect.style.position = 'absolute'
});

listen('blur', colourSelect, () => {
  colourSelect.size = 0;
  colourSelect.style.position = 'relative'
});

let defaultShape = '--Shape--';
let defaultColour = '--Colour--';

listen('change', colourSelect, () => {
  colourSelect.size = 1;
  colourSelect.blur();
  if (createBtn.disabled && shapeSelect.value !== defaultShape) {
    createBtn.disabled = false; 
  }
});

listen ('change', shapeSelect, () => {
  if (createBtn.disabled && colourSelect.value !== defaultColour) {
    createBtn.disabled = false;
  }
})
