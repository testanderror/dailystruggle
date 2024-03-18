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

function setDayContent(content, dayNo) {
  // Set the text content of the DOM elements
  const dayNoElement = document.getElementById('title');
  const dayContent = document.getElementById('content');
  dayNoElement.innerHTML = dayNo;
  dayContent.innerHTML = content;
}

function startProgram() {
  // Fetch the program data from JSON file
  fetch('data.json')
    .then((response) => response.json())
    .then((data) => {
      var outputContainer = document.getElementById('output-container');
      var index = currentDay + 1;
      var output = `<div class='over'><h2><button id='btnTimer'>Day ${index}</button></h2></div>`;
      data[`DAY ${index}`].forEach((entry) => {
        output += `<p>${entry['MOVEMENT']} @ ${entry['TIME (min)']} min</p>`;
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

  if (currentDay === 22) {
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

// Get the stopwatch timer element by its ID
const stopwatchTimer = document.getElementById('btnTimer');

// Add an event listener to the stopwatch timer
stopwatchTimer.addEventListener('click', function () {
  // This function will be called when the stopwatch timer is clicked
  console.log('Stopwatch timer clicked!');
});

document.addEventListener('DOMContentLoaded', function () {
  // Get reference to the button
  const startButton = document.getElementById('startBtn');

  // Add click event listener to the button
  startButton.addEventListener('click', function () {
    // Redirect to program.html
    window.location.href = 'program.html';
  });
});

function start() {
  window.location.href = 'program.html';
}

function goToHomePage() {
  window.location.href = 'index.html';
}

fetchProgramData();
updateButtonsVisibility();
// getData();
