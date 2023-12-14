const canvas = document.querySelector("canvas");
const secondsCount = document.querySelector(".seconds");
const level = document.querySelector(".grade");
const context = canvas.getContext("2d");
const sanxDimensions = { width: 353 * 1.2, height: 325 * 1.2 };
let animationFrameId;


document.getElementById('submitBtn').addEventListener('click', function() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId); // Stop the loop
    this.style.display = 'none';  // hide the submit button
  }
  document.getElementById('submitForm').style.display = 'block';
  document.getElementById('watchTime').value = document.querySelector('.seconds').innerText;
});


document.getElementById('submitForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const name = event.target.elements.name.value;
  const watchTime = event.target.elements.watchTime.value;

  fetch('/submit-time', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      watchedTime: parseInt(watchTime, 10),
    }),
  })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        alert('Time submitted successfully');
        document.getElementById('submitForm').style.display = 'none'; // Hide the form again
        window.location.href = 'results.html'; // Redirect to results.html
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
});


const levels = {
  5: "Newbie",
  10: "Plebeian",
  15: "Admirer",
  35: "Master admirer",
  65: "Junior senior",
  105: "Senior",
  150: "Senior senior",
  250: "Külmkapp",
  450: "Käsisaag",
  650: "Zygomite",
  1000: "Senior Zygomite",
  1500: "Rune 2h",
  2500: "Dragon 2h",
  3500: "Dragon slayer",
  4500: "Right hand man",
  10500: "Lvl 99 admirer",
  20500: "Lvl 120 admirer",
  30500: "Owner"
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

  animationFrameId = requestAnimationFrame(loopDraw);
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

