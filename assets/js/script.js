const canvas = document.getElementById("draw");
const reset = document.getElementById("rest-canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
const context = canvas.getContext("2d");

// Apply some properties to context
context.strokeStyle = "#BADA55";
context.lineJoin = "round";
context.lineCap = "round";
context.lineWidth = 10;

let isDrawing = false;
let lastX,
  lastY,
  hue = 0;
// Init
function init() {
  isDrawing = false;
  lastX = 0;
  lastY = 0;
  hue = 0;
}
document.addEventListener("DOMContentLoaded", init);
function draw(e) {
  if (!isDrawing) return;
  context.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  context.beginPath(); //Begin a new path

  // Start drawing the line
  context.moveTo(lastX, lastY);

  // Go to current mouse location
  context.lineTo(e.offsetX, e.offsetY);

  context.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  hue++;
  if (hue >= 360) hue = 0;
}
// Event Listeners
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY]; //Mouse cursor's coordinates
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

//reset canvas
reset.onclick = () => {
  context.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas
  // reset variables
  init();
};

function setTheme(theme) {
  document.documentElement.style.setProperty("--primary-color", theme);
  localStorage.setItem("iss-theme", theme);
}
