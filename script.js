let currentDay = 0; // Start with Day 1
let programData; // Variable to store the program data
let count;
const previousButton = document.getElementById('previousBtn');
const nextButton = document.getElementById('nextBtn');

// Function to fetch program data from JSON file
function fetchProgramData() {
  return fetch('data.json')
    .then((response) => response.json())
    .then((data) => {
      programData = data;
      count = 0;
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

// function startProgram() {
//   // Fetch the program data from JSON file
//   fetch('data.json')
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       setDayContent(data[currentDay].MOVEMENT, data[currentDay].DAY);
//     })
//     .catch((error) => console.error('Error loading program data:', error));
// }

function startProgram() {
  // Fetch the program data from JSON file
  fetch('data.json')
    .then((response) => response.json())
    .then((data) => {
      var index = currentDay + 1;
      var output = `<h2>Day ${index}</h2>`;
      data[`DAY ${index}`].forEach((entry) => {
        output += `<p>${entry['MOVEMENT']} @ ${entry['TIME (min)']} min</p>`;
      });

      // Paste the output onto the DOM
      document.getElementById('output-container').innerHTML = output;
    })
    .catch((error) => console.error('Error loading program data:', error));
}

// function startProgram() {
//   // Fetch the program data from JSON file
//   fetch('data.json')
//     .then((response) => response.json())
//     .then((data) => {
//       var index = currentDay + 1;
//       var days = [];
//       data[`DAY ${index}`].forEach((entry) => days.push(entry['MOVEMENT']));
//       console.log(days);
//       // console.log(data[`DAY ${index}`]);
//       // var days = data.days;
//       const currentDayContent = days;
//       const currentDayNumber = `DAY ${index}`;
//       setDayContent(currentDayContent, currentDayNumber);
//     })
//     .catch((error) => console.error('Error loading program data:', error));
// }

// function startProgram2() {
//   // Fetch the program data from JSON file
//   fetch('data.json')
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => console.error('Error loading program data:', error));
// }

// AQUI QUEDE!!!!!! <<<<<< =------- TENGO QUE DEFINIR NUEVAMENTE CURRENTDAYCONTENT Y CURRENT DAY NUMBER
function nextDay() {
  currentDay++;
  if (currentDay < count) {
    startProgram();
  } else {
    // If currentDay exceeds the number of days in the program, reset to the last day
    currentDay = count - 1;
  }
  updateButtonsVisibility();
}

// function nextDay() {
//   currentDay++;
//   if (currentDay < programData.length) {
//     const currentDayContent = programData[currentDay].content;
//     const currentDayNumber = programData[currentDay].day;
//     setDayContent(currentDayContent, currentDayNumber);
//   } else {
//     // If currentDay exceeds the number of days in the program, reset to the last day
//     currentDay = programData.length - 1;
//   }
//   updateButtonsVisibility();
// }

// Function to navigate to the previous day
function previousDay() {
  currentDay--;
  if (currentDay <= count) {
    startProgram();
  } else {
    // If currentDay is negative, reset to the first day
    currentDay = count - 1;
  }
  updateButtonsVisibility();
}

function updateButtonsVisibility() {
  if (currentDay === 0) {
    previousButton.style.display = 'none'; // Hide the previous button
  } else {
    previousButton.style.display = 'inline'; // Show the previous button
  }

  if (currentDay === count - 1) {
    nextButton.style.display = 'none'; // Hide the next button
  } else {
    nextButton.style.display = 'inline'; // Show the next button
  }
}

// Check if the HTML page loaded corresponds to 'program.html'
if (window.location.pathname.endsWith('program.html')) {
  startProgram();
}

document.addEventListener('DOMContentLoaded', function () {
  // Get reference to the button
  var startButton = document.getElementById('startBtn');

  // Add click event listener to the button
  startButton.addEventListener('click', function () {
    // Redirect to program.html
    window.location.href = 'program.html';
  });
});

function goToHomePage() {
  window.location.href = 'index.html';
}

fetchProgramData();
updateButtonsVisibility();
// getData();
