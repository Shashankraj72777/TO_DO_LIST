document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.classList.add("incomplete");
    li.innerHTML = `${taskInput.value} 
        <button onclick="removeTask(this)">Delete</button>
        <button onclick="toggleCompletion(this)">Complete</button>`;

    taskList.appendChild(li);
    saveTasks();

    taskInput.value = "";  // Clear input field
}

function removeTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function toggleCompletion(button) {
    let li = button.parentElement;
    li.classList.toggle("completed");
    li.classList.toggle("incomplete");
    button.classList.toggle("complete");
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent.trim(),
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    savedTasks.forEach(task => {
        let li = document.createElement("li");
        li.classList.add(task.completed ? "completed" : "incomplete");
        li.innerHTML = `${task.text} 
            <button onclick="removeTask(this)">Delete</button>
            <button class="${task.completed ? 'complete' : ''}" onclick="toggleCompletion(this)">Complete</button>`;
        taskList.appendChild(li);
    });
}

function checkEnter(event) {
    if (event.key === "Enter") {
        addTask();
    }
}
