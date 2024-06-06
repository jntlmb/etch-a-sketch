const colorPickerBtn = document.getElementById("color-picker");
const colorModeBtn = document.getElementById("color-mode");
const rainbowModeBtn = document.getElementById("rainbow-mode");
const eraseModeBtn = document.getElementById("erase-mode");
const clearBtn = document.getElementById("clear");
const canvas = document.getElementById("canvas");
const sliderSize = document.getElementById("slider");
const sliderText = document.getElementById("slider-text");
const buttons = [colorModeBtn, rainbowModeBtn, eraseModeBtn];

const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#000";
const DEFAULT_MODE = "colorMode";

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

function setCurrentSize(newSize) {
  currentSize = newSize;
}

function setCurrentColor(newColor) {
  currentColor = newColor;
}

clearBtn.onclick = () => reloadCanvas();
colorPickerBtn.oninput = (e) => setCurrentColor(e.target.value);
sliderSize.onmousemove = (e) => updateSliderText(e.target.value);
sliderSize.onmouseup = (e) => changeCanvasSize(e.target.value);

let mouseKeyPressed = false;
document.body.onmousedown = () => (mouseKeyPressed = true);
document.body.onmouseup = () => (mouseKeyPressed = false);

/* ACTIVATE BUTTON & DEFAULT BUTTON */

function resetBtn() {
  buttons.forEach((button) => {
    button.style.color = "#333";
    button.style.backgroundColor = "whitesmoke";
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    resetBtn();
    button.style.color = "whitesmoke";
    button.style.backgroundColor = "#333";

    if (e.target.id === "color-mode") {
      currentMode = "colorMode";
    } else if (e.target.id === "rainbow-mode") {
      currentMode = "rainbowMode";
    } else if (e.target.id === "erase-mode") {
      currentMode = "eraseMode";
    }

    console.log(currentMode);
    console.log(currentColor);
  });
});

function setDefaultButton() {
  colorModeBtn.style.color = "whitesmoke";
  colorModeBtn.style.backgroundColor = "#333";
}

/* SLIDER */

function updateSliderText(newValue) {
  sliderText.innerHTML = `${newValue} x ${newValue}`;
}

/* CANVAS */

function changeCanvasSize(newSize) {
  setCurrentSize(newSize);
  updateSliderText(newSize);
  reloadCanvas();
}

function reloadCanvas() {
  resetCanvas();
  setupCanvas(currentSize);
}

function resetCanvas() {
  canvas.innerHTML = "";
}

function setupCanvas(size) {
  canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const canvasElement = document.createElement("div");
    canvasElement.addEventListener("mouseover", changeColor);
    canvasElement.addEventListener("mousedown", changeColor);

    canvasElement.addEventListener("contextmenu", (e) => e.preventDefault());
    canvasElement.addEventListener("mousedown", (e) => e.preventDefault());
    canvasElement.addEventListener("mouseabove", (e) => e.preventDefault());
    canvasElement.addEventListener("mouseup", (e) => e.preventDefault());
    canvasElement.addEventListener("dragstart", (e) => e.preventDefault());
    canvas.appendChild(canvasElement);
  }
}

function changeColor(e) {
  if (e.type === "mouseover" && !mouseKeyPressed) return;
  if (currentMode === "rainbowMode") {
    const randomRedValue = Math.floor(Math.random() * 256);
    const randomGreenValue = Math.floor(Math.random() * 256);
    const randomBlueValue = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomRedValue}, ${randomGreenValue}, ${randomBlueValue})`;
  } else if (currentMode === "colorMode") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraseMode") {
    e.target.style.backgroundColor = "white";
  }
}

window.onload = () => {
  updateSliderText(DEFAULT_SIZE);
  setupCanvas(DEFAULT_SIZE);
  setDefaultButton();
};
