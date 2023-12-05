const canvas = document.querySelector("canvas");
const secondsCount = document.querySelector(".seconds");
const level = document.querySelector(".grade");
const context = canvas.getContext("2d");
const sanxDimensions = { width: 353 * 1.2, height: 325 * 1.2 };


const levels = {
  5: "Sr Assistant",
  10: "Jr Honoror",
  15: "Master Honoror",
  35: "S Tier Honoror",
  65: "Junior Acolyte",
  105: "Acolyte",
  150: "Senior Acolyte",
  250: "Priest",
  450: "Sage",
  650: "Hermit",
  1000: "Senior Hermit",
  1500: "CEO",
  2500: "Pope",
  3500: "Underlord",
  4500: "Lord",
  10500: "OverLord",
  20500: "King",
  30500: "Anunnaki"
}

const startTime = Date.now();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.translate(window.innerWidth / 2, window.innerHeight / 2);

const image = new Image();
image.src = "./assets/sanksi_pilt.jpg";

const loopingSanx = 40;
const offsetDistance = 120;
let currentOffset = 0;

const movementRange = 200

const mouseOffset = {
  x: 0,
  y: 0
}

const movementOffset = {
  x: 0,
  y: 0
}

image.onload = () => {
  startLooping();
};

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.setTransform(1, 0, 0, 1, 0, 0); //Reset the canvas context
  context.translate(window.innerWidth / 2, window.innerHeight / 2);
};

window.addEventListener('mousemove', onMouseMove)

function draw(offset, loopCount) {

  let currentPercentage = (loopingSanx - loopCount) / loopingSanx
  context.drawImage(
    image,
    -sanxDimensions.width / 2 - offset/2 + (movementOffset.x * currentPercentage),
    -sanxDimensions.height / 2 - offset/2 + (movementOffset.y * currentPercentage),
    sanxDimensions.width + offset,
    sanxDimensions.height + offset
  );
}

function onMouseMove(e) {
  mouseOffset.x = (e.clientX - window.innerWidth / 2) / window.innerWidth / 2 * movementRange
  mouseOffset.y = (e.clientY - window.innerHeight / 2) / window.innerHeight / 2 * movementRange
}

function lerp(start, end, amount) {
  return start*(1-amount)+end*amount
}

function loopDraw() {

  movementOffset.x = lerp(movementOffset.x, mouseOffset.x, 0.05)
  movementOffset.y = lerp(movementOffset.y, mouseOffset.y, 0.05)

  for (let i = loopingSanx; i >= 1; i--) {
    draw(i * offsetDistance + currentOffset, i);
  }

  draw(offsetDistance, 1);

  currentOffset++;
  if (currentOffset >= offsetDistance) {
    currentOffset = 0;
  }

  const newTime = Math.floor((Date.now() - startTime) / 1000);

  secondsCount.innerText = newTime;

  if(levels[newTime]) {
    level.innerText = levels[newTime]
  }

  requestAnimationFrame(loopDraw);
}

function startLooping() {
  requestAnimationFrame(loopDraw);
}


// Fetch leaderboard data from the server
function fetchLeaderboardData() {
  fetch('/times')
      .then(response => response.json())
      .then(data => {
        updateLeaderboard(data);
      })
      .catch(error => console.error('Error fetching leaderboard data:', error));
}

// Call the function to fetch and display data
fetchLeaderboardData();

// ... existing code ...

// Call this function to fetch and display leaderboard data
fetchLeaderboardData();

function fetchLeaderboardData() {
  fetch('/times')
      .then(response => response.json())
      .then(data => {
        updateLeaderboard(data);
      })
      .catch(error => console.error('Error fetching leaderboard data:', error));
}

function updateLeaderboard(data) {
  const table = document.getElementById('timesTable');
  // Clear existing table data (except for the header)
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  // Populate table with new data
  data.forEach(entry => {
    const row = table.insertRow();
    const nameCell = row.insertCell(0);
    const timeCell = row.insertCell(1);
    nameCell.textContent = entry.name;
    timeCell.textContent = entry.watchedTime;
  });
}

