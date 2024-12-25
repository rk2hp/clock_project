const hourHand = document.getElementById("hour-hand");
const minuteHand = document.getElementById("minute-hand");
const secondHand = document.getElementById("second-hand");

const customHourInput = document.getElementById("custom-hour");
const customMinuteInput = document.getElementById("custom-minute");
const setTimeBtn = document.getElementById("set-time-btn");
const resetTimeBtn = document.getElementById("reset-time-btn");

let customTime = null;

function createNumbers(hand, value, count, angle) {
  hand.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const numberDiv = document.createElement("div");
    numberDiv.classList.add("number");
    numberDiv.textContent = value;
    numberDiv.style.transform = `rotate(${-angle}deg)`;
    hand.appendChild(numberDiv);
  }
}

function updateClock() {
  const now = customTime ? new Date(customTime) : new Date();

  const hours = now.getHours() % 12 || 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourAngle = (360 / 12) * hours + (360 / 12) * (minutes / 60);
  const minuteAngle = (360 / 60) * minutes + (360 / 60) * (seconds / 60);
  const secondAngle = (360 / 60) * seconds;

  createNumbers(hourHand, hours, 7, hourAngle);
  createNumbers(minuteHand, minutes,7 , minuteAngle);
  createNumbers(secondHand, seconds, 9, secondAngle);

  hourHand.style.transform = `translate(-50%, -100%) rotate(${hourAngle}deg)`;
  minuteHand.style.transform = `translate(-50%, -100%) rotate(${minuteAngle}deg)`;
  secondHand.style.transform = `translate(-50%, -100%) rotate(${secondAngle}deg)`;

  if (customTime) {
    customTime.setSeconds(customTime.getSeconds() + 1);
  }
}

setTimeBtn.addEventListener("click", () => {
  const customHours = parseInt(customHourInput.value, 10);
  const customMinutes = parseInt(customMinuteInput.value, 10);

  if (!isNaN(customHours) && !isNaN(customMinutes)) {
    customTime = new Date();
    customTime.setHours(customHours);
    customTime.setMinutes(customMinutes);
    customTime.setSeconds(0);
    updateClock();
  }
});

resetTimeBtn.addEventListener("click", () => {
  customTime = null;
  updateClock();
});

setInterval(updateClock, 1000);
updateClock();