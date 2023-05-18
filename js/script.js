const todoForm = document.querySelector(".form");
const todoInput = document.querySelector(".input");
const tasksList = document.querySelector(".task_list");
const btnAllTask = document.querySelector(".all");
const btnActiveTask = document.querySelector(".open");
const btnNotActiveTask = document.querySelector(".done");

const сolors = [
    "#FF0000",
    "#FFA500",
    "#FFD700",
    "#FFFF00",
    "#32CD32",
    "#E0FFFF",
    "#1E90FF",
    "#FFFFFF",
    "#00FFFF",
    "#F0E68C",
    "#FF00FF",
    "#BDECB6",
];
let tasks = []
if(localStorage.getItem("tasks")){
    tasks = JSON.parse(localStorage.getItem("tasks"));
}
tasks.forEach(function(taskObject){
    const cssClass = taskObject.taskStatus ? 'task_text task_text_done' : 'task_text active';
    let task = document.createElement("li");
    task.id = taskObject.taskId;
    task.className = "task";
    task.innerHTML = `<p class="${cssClass}">${taskObject.taskText}</p>`
    const buttons = `
    <div class="buttins">
        <button data-btn="status" class="btn_status">
            <img class="status" src="./icons/check-mark.png" alt="">
        </button> 
        <button data-btn="delete" class="btn_delete">
            <img class="img_delete" src="./icons/dekete.png" alt="">
        </button>
    </div>`;
    task.insertAdjacentHTML("beforeend",buttons)
    task.style.color = taskObject.taskColor;
    tasksList.append(task);
})

function addTask(){
    const newTask = {
        taskId: Date.now(),
        taskText: todoInput.value,
        taskStatus: false,
    };
    const cssClass = newTask.taskStatus ? 'task_text task_text_done' : 'task_text active';
    let task = document.createElement("li");
    task.id = newTask.taskId;
    task.className = "task ";
    task.innerHTML = `<p class="${cssClass}">${newTask.taskText}</p>`
    const buttons = `
    <div class="buttins">
        <button data-btn="status" class="btn_status">
            <img class="status" src="./icons/check-mark.png" alt="">
        </button> 
        <button data-btn="delete" class="btn_delete">
            <img class="delete" src="./icons/dekete.png" alt="">
        </button>
    </div>`;
    task.insertAdjacentHTML("beforeend",buttons)
    tasksList.append(task);
    colorGenerator(task,newTask)
    tasks.push(newTask);
    seveInLocalStorage();
    todoInput.value = "";
    return task;
};
todoForm.addEventListener("submit", function(e){
    e.preventDefault();
    if(todoInput.value === ""){
        todoInput.style.borderColor = "#ff0000";
    }else{
         addTask();
    }
});
function statusTask(e){
    if(e.target.dataset.btn === "status"){
        const task = e.target.closest(".task");
        const taskText = task.querySelector(".task_text");
        taskText.classList.toggle("task_text_done");
        taskText.classList.toggle("active");
        const taskId = Number(task.id);
        const taskTodo = tasks.find(function(task){
            if(task.taskId === taskId){
                return true;
            }
        });
        taskTodo.taskStatus = !taskTodo.taskStatus;
        seveInLocalStorage()
    };
};
tasksList.addEventListener("click", statusTask);

function deleteTask(e){
    if(e.target.dataset.btn === "delete"){
        const task = e.target.closest(".task");
        const taskId = Number(task.id);
        tasks = tasks.filter(function(task){
            return  task.taskId !== taskId; 
        })
        seveInLocalStorage();
        task.remove();
    };
};
tasksList.addEventListener("click", deleteTask);

function seveInLocalStorage(){
    localStorage.setItem("tasks", JSON.stringify(tasks))
};

function getRandomNambers(){
    return Math.floor(Math.random() * сolors.length);
};
function colorGenerator(task,newTask){
    let colorText = сolors[getRandomNambers()]
    task.style.color = colorText;
    newTask.taskColor = colorText;
};

btnAllTask.addEventListener("click", function(){
    btnNotActiveTask.classList.remove("btn_filter_active");
    btnActiveTask.classList.remove("btn_filter_active");
    btnAllTask.classList.add("btn_filter_active");
    document.querySelectorAll(".task").forEach((item) => {
        item.classList.remove("hidenn");
    });
});
btnActiveTask.addEventListener("click", function(){
    btnAllTask.classList.remove("btn_filter_active");
    btnNotActiveTask.classList.remove("btn_filter_active");
    btnActiveTask.classList.add("btn_filter_active");
    document.querySelectorAll(".task").forEach((item) => {
        item.classList.add("hidenn");
    });
    document.querySelectorAll(".active").forEach((item) => {
        const task =  item.closest(".task");
        task.classList.remove("hidenn");
     });
});
btnNotActiveTask.addEventListener("click", function(){
    btnAllTask.classList.remove("btn_filter_active");
    btnActiveTask.classList.remove("btn_filter_active");
    btnNotActiveTask.classList.add("btn_filter_active");
    document.querySelectorAll(".task").forEach((item) => {
        item.classList.add("hidenn");
    });
    document.querySelectorAll(".task_text_done").forEach((item) => {
       const task =  item.closest(".task");
       task.classList.remove("hidenn");
    });
});
