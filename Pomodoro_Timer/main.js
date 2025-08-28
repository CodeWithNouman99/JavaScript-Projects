const timeDisplay = document.querySelector('.timer');
const buttonOne = document.querySelector('.one');   // Start
const buttonTwo = document.querySelector('.two');   // Pause
const buttonThree = document.querySelector('.three'); // Reset

let timeLeft = 25 * 60;  // 25 minutes in seconds
let interval;

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  timeDisplay.textContent = `${minutes}:${seconds}`;
}

// Start button
buttonOne.addEventListener('click', () => {
  clearInterval(interval); // stop any previous interval
  interval = setInterval(() => {
    updateDisplay();
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(interval);
      alert("Time's up!");
    }
  }, 1000);
});

// Pause button
buttonTwo.addEventListener('click', () => {
  clearInterval(interval); // pause timer
});

// Reset button
buttonThree.addEventListener('click', () => {
  clearInterval(interval); // stop timer
  timeLeft = 25 * 60;      // reset to 25 min
  updateDisplay();
});

// Initialize display
updateDisplay();
