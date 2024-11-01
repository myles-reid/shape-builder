'use strict';

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

function listen(event, element, callback) {
  return element.addEventListener(event, callback);
}

const colourSelect = select('#colour');

listen('focus', colourSelect, () => {
  colourSelect.size = 5;
  colourSelect.style.position = 'absolute'
});

listen('blur', colourSelect, () => {
  colourSelect.size = 0;
  colourSelect.style.position = 'relative'
});

listen('change', colourSelect, () => {
  colourSelect.size = 1;
  colourSelect.blur();
})
