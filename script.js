const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const bgToggleButton = document.getElementById('bg-toggle');
const birdSelect = document.getElementById('birdSelector');

const bgDay = new Image();
bgDay.src = 'FlappyBirdAssets/Background/Background1.png';

const bgNight = new Image();
bgNight.src = 'FlappyBirdAssets/Background/Background4.png';

let currentBackground = bgDay;
let isDay = true;

// Bird image setup
const birdImage = new Image();
let birdX = 50;
let birdY = 150;

let birdWidth = 0;
let birdHeight = 0;
let frameIndex = 0;
let totalFrames = 4; // default

// Load and set bird sprite
function loadBird(path, frames) {
  birdImage.src = 'FlappyBirdAssets/Player/' + path;
  totalFrames = frames;

  birdImage.onload = () => {
    birdWidth = birdImage.width / totalFrames;
    birdHeight = birdImage.height;
    frameIndex = 0;
    draw();
  };
}

// On DOM load: load default bird
document.addEventListener('DOMContentLoaded', () => {
  const selectedOption = birdSelect.selectedOptions[0];
  const path = selectedOption.value;
  const frames = parseInt(selectedOption.dataset.frames);

  loadBird(path, frames);
  init();
  startAnimation();
});

// When user selects a new bird
birdSelect.addEventListener('change', () => {
  const selected = birdSelect.selectedOptions[0];
  const path = selected.value;
  const frames = parseInt(selected.dataset.frames);

  loadBird(path, frames);
});

// Animate bird
function startAnimation() {
  setInterval(() => {
    frameIndex = (frameIndex + 1) % totalFrames;
    draw();
  }, 100);
}

function drawBird(x, y) {
  ctx.drawImage(
    birdImage,
    frameIndex * birdWidth, 0,
    birdWidth, birdHeight,
    x, y,
    50, 50 // draw size
  );
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(currentBackground, 0, 0, canvas.width, canvas.height);
  ctx.fillStyle='#ffffff';
  ctx.font='bold 50px Arial';
  ctx.textAlign='center';
  ctx.fillText('Flappy Bird' ,canvas.width/2 ,birdY-20)
  drawBird(birdX, birdY);
}

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  birdX=(canvas.width/2)-(50/2);
  birdY=(canvas.height/2)-(50/2);
  draw();
}

// Background toggle button
bgToggleButton.addEventListener('click', () => {
  isDay = !isDay;
  currentBackground = isDay ? bgDay : bgNight;
  draw();
});

window.addEventListener('resize', init);

const pipeTopImage = new Image();
pipeTopImage.src = 'FlappyBirdAssets/Tiles/St';
