document.addEventListener("DOMContentLoaded",()=>
{
 const storedTasks = JSON.parse(localStorage.getItem('tasks'))

 if(storedTasks){
    storedTasks.forEach((task)=>tasks.push(task))
    updateTaskList();
    updateStats();

 }
}
)
let tasks = [];

const saveTasks = ()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

const addTask = ()=>{
    const taskInfo = document.getElementById('taskInfo');
    const text = taskInfo.value.trim();

    if(text){
        tasks.push({text:text, completed : false });
        taskInfo.value = ""; 

        updateTaskList();
        updateStats();
    }
  
};

const toggleTaskComplete = (index) =>{
    tasks[index].completed = !tasks[index].completed;
    updateStats();
    saveTasks();
};

const deleteTask=(index) =>{
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();
};

const editTask = (index)=>{
    const taskInfo = document.getElementById('taskInfo');
    taskInfo.value = tasks[index].text

    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();

};

const updateStats = () =>{
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completeTasks/totalTasks )*100;
    const progressBar = document.getElementById('progress');

    progressBar.style.width = `${progress}%`
    document.getElementById('num').innerHTML= `${completeTasks}/${totalTasks}`

    //if(tasks.length && completeTasks === totalTasks){
     //   adhdGoVroom();
    //}

};

const updateTaskList = () => {
    const taskList = document.getElementById('tasklist');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.className = "taskItem";

        listItem.innerHTML = ` 
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} />
                <p>${task.text}</p>
            </div>

            <div class="icons">
                <button class="icon-btn edit-btn" data-index="${index}">✏️</button>
                <button class="icon-btn delete-btn" data-index="${index}">🗑️</button>
            </div>
        `;
   
        const checkbox = listItem.querySelector('.checkbox');
        checkbox.addEventListener('change', () => toggleTaskComplete(index));

        const editBtn = listItem.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => editTask(index))     

        const deleteBtn = listItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTask(index));

        taskList.appendChild(listItem);

    });

};


document.getElementById('newTask').addEventListener('click',function(e){
    e.preventDefault();

    addTask();
});


/*const adhdGoVroom = ()=>{
const defaults = {
  spread: 360,
  ticks: 50,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  shapes: ["star"],
  colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
};

function shoot() {
  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1.2,
    shapes: ["star"],
  });

  confetti({
    ...defaults,
    particleCount: 10,
    scalar: 0.75,
    shapes: ["circle"],
  });
}

setTimeout(shoot, 0);
setTimeout(shoot, 100);
setTimeout(shoot, 200);
}*/






