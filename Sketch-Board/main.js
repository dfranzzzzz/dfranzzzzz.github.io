const mainBoard = document.querySelector('#container');
const setSize = document.getElementById('size');

setSize.addEventListener('click', changeSize);
window.addEventListener('load', setDefaultGrid);


function setDefaultGrid () {
  setGridSize(16);
  fillBoard(16);
  changeColor('rgb');
}

function setGridSize(size) {
  mainBoard.style.gridTemplateColumns = `repeat(${size}, auto)`;
  mainBoard.style.gridTemplateRows = `repeat(${size}, auto)`;
}

function fillBoard(size) {
  for (let i = 0; i < size*size; i++) {
    const createGrid = document.createElement('div');
    createGrid.classList.add("gridSquares");
    mainBoard.appendChild(createGrid);
  }
}

function changeSize() {
  let newSize = prompt("Enter board dimension (input x input)");

  if (newSize !== null) {
    newSize = parseInt(newSize);
    if (newSize < 1 || newSize > 64 || Number.isNaN(newSize)) {
      alert('Please Enter a number from 1-64');
      changeSize();
    } else {
      mainBoard.querySelectorAll('.gridSquares').forEach(child => child.remove());
      fillBoard(newSize);
      setGridSize(newSize);
    }
  }
}

function clearBoard() {
  mainBoard.querySelectorAll('.gridSquares').forEach(child => child.style.backgroundColor = 'white');
}

function changeColor(option) {
  const gridElements = document.querySelectorAll('.gridSquares');

  switch(option) {
    case 'rgb':
      gridElements.forEach(gridElement => gridElement.addEventListener('mouseover', setRGB));
      gridElements.forEach(gridElement => gridElement.removeEventListener('mouseover', setEraser));
      gridElements.forEach(gridElement => gridElement.removeEventListener('mouseover', setDarken));
      break;
    
    case 'darken':
      gridElements.forEach(gridElement => gridElement.addEventListener('mouseover', setDarken));
      gridElements.forEach(gridElement => gridElement.removeEventListener('mouseover', setEraser));
      gridElements.forEach(gridElement => gridElement.removeEventListener('mouseover', setRGB));
      break;
    
    case 'eraser':
      gridElements.forEach(gridElement => gridElement.addEventListener('mouseover', setEraser));
      break;
  }
}

function setRGB(e) {
  e.target.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
}

function setEraser(e) {
  e.target.style.backgroundColor = 'white';
}

function setDarken(e) {
  if (e.target.style.backgroundColor.match(/rgba/)) {
    let currentOpacity = Number(e.target.style.backgroundColor.slice(-4, -1));
    if (currentOpacity <= 0.9) {
        e.target.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
    } 
  }  else if (e.target.style.backgroundColor == 'rgb(0, 0, 0)') {
      return;
  } else {
    e.target.style.backgroundColor = `rgba(0, 0, 0, 0.1)`;
  }
}