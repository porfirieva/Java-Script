const board = document.querySelector("#board");
const SQUARES_NUMBER = 1500;
const colors = [
  "#ffb3b3",
  "#ffc9b3",
  "#ffefb3",
  "#e3ffb3",
  "#b3ffc1",
  "#b3ffe2",
  "b3e9ff",
  "#b3c7ff",
  "#c6b3ff",
  "#e1b3ff",
  "#ffb3f9",
  "#ffb3c7",
  "#ffb3b3",
];

for (let i = 0; i < SQUARES_NUMBER; i++) {
  const square = document.createElement("div");
  square.classList.add("square");

  square.addEventListener("mouseover", () => setColor(square));

  square.addEventListener("mouseleave", () => removeColor(square));

  board.append(square);
}

function setColor(element) {
  const color = getRandomColor();
  element.style.backgroundColor = color;
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(element) {
  element.style.backgroundColor = "rgb(255, 255, 255)";
  element.style.boxShadow = `0 0 2px rgb(255, 255, 255)`;
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
