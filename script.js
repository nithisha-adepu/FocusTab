// ----- Greeting + Clock -----
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

// ----- To-Do List -----
const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

function renderTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  taskList.innerHTML = "";
  tasks.forEach((t, i) => {
    const li = document.createElement("li");
    li.textContent = t.text;
    if (t.done) li.classList.add("done");
    li.onclick = () => toggleTask(i);
    taskList.appendChild(li);
  });
}

function addNewTask() {
  const val = taskInput.value.trim();
  if (!val) return;
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push({ text: val, done: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  renderTasks();
}

function toggleTask(i) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks[i].done = !tasks[i].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

addTask.onclick = addNewTask;
renderTasks();

// ----- Pomodoro Timer -----
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

// ----- Weather -----
async function loadWeather() {
  const city = "London";
  const apiKey = "YOUR_API_KEY_HERE";
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await res.json();
    document.getElementById("weatherInfo").textContent =
      `${data.name}: ${Math.round(data.main.temp)}°C, ${data.weather[0].main}`;
  } catch (e) {
    document.getElementById("weatherInfo").textContent = "Weather unavailable";
  }
}
loadWeather();

// ----- Quote -----
async function loadQuote() {
  try {
    const res = await fetch("https://zenquotes.io/api/random");
    const data = await res.json();
    document.getElementById("quoteText").textContent = `"${data[0].q}" — ${data[0].a}`;
  } catch {
    document.getElementById("quoteText").textContent = "Keep pushing forward!";
  }
}
loadQuote();
