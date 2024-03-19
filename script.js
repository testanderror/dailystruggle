let currentDay = 0; // Start with Day 1
let programData; // Variable to store the program data
let count = 0;
let intervalId;
let state;

const previousButton = document.getElementById('previousBtn');
const nextButton = document.getElementById('nextBtn');

// Function to fetch program data from JSON file
function fetchProgramData() {
  return fetch('data.json')
    .then((response) => response.json())
    .then((data) => {
      programData = data;

      for (const key in data) {
        if (key.includes('DAY')) {
          count++;
        }
      }
    })
    .catch((error) => console.error('Error loading program data:', error));
}

function startProgram() {
  // Fetch the program data from JSON file
  fetch('content.json')
    .then((response) => response.json())
    .then((data) => {
      var outputContainer = document.getElementById('output-container');
      var index = currentDay + 1;
      var output = `<div class='over'><h2><button id='btnTimer'>Day ${index}</button></h2></div>`;
      data[`DAY ${index}`].forEach((entry) => {
        output += `<p>${entry['CONTENT']}`;
        // output += `<p>${entry['MOVEMENT']} @ ${entry['TIME (min)']} min</p>`;
      });

      // Paste the output onto the DOM
      outputContainer.innerHTML = output;
      var btnTimer = document.getElementById('btnTimer');
      btnTimer.classList.add('stopTimer');
      btnTimer.addEventListener('click', startStopwatch);
    })
    .catch((error) => console.error('Error loading program data:', error));
}

function startStopwatch() {
  const btnTimer = document.getElementById('btnTimer');

  // Check if the stopwatch is already running
  if (intervalId) {
    // Stop the stopwatch
    clearInterval(intervalId);
    intervalId = null; // Reset intervalId
    btnTimer.textContent = `Day ${currentDay + 1}`; // Reset button text to original content
    btnTimer.classList.remove('stopTimer'); // Remove the 'stopTimer' class
    state = false; // Reset state
    return;
  }

  let startTime = Date.now();
  state = true;

  // Update the timer every second
  intervalId = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    const timerText = `${hours
      .toString()
      .padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Update the timer display
    btnTimer.textContent = timerText;
    btnTimer.classList.add('stopTimer'); // Add the 'stopTimer' class
  }, 1000);
}

function nextDay() {
  // Ensure fetchProgramData() is called before accessing count
  fetchProgramData().then(() => {
    console.log(count);
    currentDay++;
    if (currentDay < count) {
      startProgram();
    } else {
      currentDay = count - 1;
    }
    updateButtonsVisibility();
  });
}

function previousDay() {
  currentDay--;
  // stopStopwatch(); // Stop the stopwatch when moving to the previous day
  if (currentDay >= 0) {
    startProgram();
  } else {
    // If currentDay is negative, reset to the first day
    currentDay = 0;
  }
  updateButtonsVisibility();
}

function updateButtonsVisibility() {
  if (currentDay != 0) {
    previousButton.style.display = 'inline'; // Show the previous button
  }

  if (currentDay === 27) {
    nextButton.style.display = 'none'; // Hide the next button
  } else {
    nextButton.style.display = 'inline'; // Show the next button
  }
}

// Check if the HTML page loaded corresponds to 'program.html'
if (window.location.pathname.endsWith('program.html')) {
  updateButtonsVisibility();
  startProgram();
}

if (window.location.pathname.endsWith('index.html')) {
  document.getElementById('startBtn').addEventListener('click', () => {
    window.location.href = 'program.html';
  });
}

// Get the stopwatch timer element by its ID
const stopwatchTimer = document.getElementById('btnTimer');

// Add an event listener to the stopwatch timer

document.addEventListener('DOMContentLoaded', function () {
  // Get reference to the button
  const startButton = document.getElementById('startBtn');

  // Add click event listener to the button
  startButton.addEventListener('click', function () {
    // Redirect to program.html
    window.location.href = 'program.html';
  });
});

// coloring title

function getRandomColor() {
  // Generate random values for the red, green, and blue channels within the maroon spectrum
  const red = Math.floor(Math.random() * 70) + 100; // Adjust these values to fine-tune the maroon color range
  const green = Math.floor(Math.random() * 30);
  const blue = Math.floor(Math.random() * 30);
  // Construct the RGB color string
  return `rgb(${red}, ${green}, ${blue})`;
}

function updateTitleColor() {
  const title = document.getElementById('coloring');
  title.style.color = getRandomColor();
}

function updateOverlayColor() {
  const overlay = document.getElementById('overlay');
  overlay.style.color = getRandomColor(); // Set random color for the title
}

function goToHomePage() {
  window.location.href = 'index.html';
}

if (window.location.href.includes('index.html')) {
  setInterval(updateTitleColor, 62.5);
  setInterval(updateOverlayColor, 70);
}

function start() {
  window.location.href = 'program.html';
}

fetchProgramData();
updateButtonsVisibility();

// getData();
