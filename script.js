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
/* =====================
   TO-DO LIST FUNCTIONALITY
===================== */

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// Load saved tasks from localStorage
window.addEventListener("DOMContentLoaded", loadTasks);

// Add a new task
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = createTaskElement(taskText);
  taskList.appendChild(li);
  saveTasks();

  taskInput.value = "";
}

// Create a task element with delete + toggle complete
function createTaskElement(text, done = false) {
  const li = document.createElement("li");
  li.textContent = text;
  if (done) li.classList.add("done");

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "✕";
  delBtn.className = "delete-btn";
  delBtn.onclick = () => {
    li.classList.add("fade-out");
    setTimeout(() => {
      li.remove();
      saveTasks();
    }, 200);
  };

  // Toggle done
  li.onclick = (e) => {
    if (e.target.tagName === "BUTTON") return; // avoid double-click when deleting
    li.classList.toggle("done");
    saveTasks();
  };

  li.appendChild(delBtn);
  return li;
}

// Save all tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.childNodes[0].textContent.trim(),
      done: li.classList.contains("done"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
  saved.forEach((t) => {
    const li = createTaskElement(t.text, t.done);
    taskList.appendChild(li);
  });
}

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
const weatherApiKey = "dc620184db514e1a93241650250611"; // paste your key here
const city = "Hyderabad"; // or you can make this dynamic later

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
