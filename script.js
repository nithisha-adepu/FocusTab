// greeting 
function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

const hour = new Date().getHours();
let greeting = "Good Evening";
if (hour < 12) greeting = "Good Morning";
else if (hour < 18) greeting = "Good Afternoon";
document.getElementById("greeting").textContent = `${greeting}, User!`;
 
// tomato timer
let time = 25 * 60;
let timerRunning = false;
let interval;

function updateTimerDisplay() {
  const m = Math.floor(time / 60);
  const s = time % 60;
  document.getElementById("timer").textContent = `${m}:${s.toString().padStart(2, '0')}`;
}

document.getElementById("startBtn").onclick = () => {
  if (timerRunning) return;
  timerRunning = true;
  interval = setInterval(() => {
    time--;
    updateTimerDisplay();
    if (time <= 0) {
      clearInterval(interval);
      alert("Pomodoro session complete!");
      timerRunning = false;
      time = 25 * 60;
      updateTimerDisplay();
    }
  }, 1000);
};

document.getElementById("resetBtn").onclick = () => {
  clearInterval(interval);
  time = 25 * 60;
  timerRunning = false;
  updateTimerDisplay();
};

updateTimerDisplay();

// weather 
const weatherApiKey = "dc620184db514e1a93241650250611"; 
const city = "Hyderabad";

async function getWeather() {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}&aqi=no`
    );
    const data = await response.json();

    document.getElementById("weather").innerHTML = `
      <div class="weather-widget">
        <p class="city">${data.location.name}</p>
        <p class="temp">${data.current.temp_c}°C</p>
        <p class="condition">${data.current.condition.text}</p>
        <img src="https:${data.current.condition.icon}" alt="Weather Icon" />
      </div>
    `;
  } catch (error) {
    document.getElementById("weather").innerHTML = `<p>Weather unavailable</p>`;
  }
}

getWeather();

//quotes
async function loadQuote() {
  try {
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();
    document.getElementById("quoteText").textContent = `"${data.content}" — ${data.author}`;
  } catch {
    const fallbackQuotes = [
      "Just keep swimming! 🐠",
      "You got this! 💪",
      "One task at a time! ✅",
      "Progress over perfection! 🚀"
    ];
    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    document.getElementById("quoteText").textContent = randomQuote;
  }
}

document.getElementById("refreshQuote").addEventListener("click", loadQuote);

loadQuote();