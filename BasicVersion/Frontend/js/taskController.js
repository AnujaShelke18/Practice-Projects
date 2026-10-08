import * as taskModel from "./taskModel.js";
import * as taskView from "./taskView.js";

function getDefaultPriority() {
    return localStorage.getItem("defaultPriority") || "High";
}

function addTaskToDOM(task) {
    const { li, checkbox, deleteButton, prioritySelect } = taskView.createTaskElement(task);

    checkbox.addEventListener("change", async function () {
    try {
        await taskModel.toggleTaskStatus(this.dataset.id, this.checked);
        this.nextElementSibling.classList.toggle("completed");
    } catch (err) {
        this.checked = !this.checked;
        alert("Could not update the task.");
    }
});

    deleteButton.addEventListener("click", async function () {
        try{
            await taskModel.deleteTask(this.dataset.id);
            li.remove();
        }catch (err){
            alert("Could not delete the task.");
        }
    });

    prioritySelect.addEventListener("change", async function () {
        try {
        await taskModel.updateTaskPriority((this.dataset.id), this.value);
        } catch (err){
           console.log(err);
           alert("Could not update the priority.");
        }    
    });

    document.getElementById("taskList").appendChild(li);
}

export async function initTaskController() {
    document.getElementById("Addtask").addEventListener("click", async function (e) {
    e.preventDefault();
    try {
        const taskInput = document.getElementById("input");
        const taskValue = taskInput.value.trim();
        if (taskValue === "") {
            alert("Please enter a task.");
            return;
        }
        const newTask = await taskModel.createTask(taskValue, getDefaultPriority());
        addTaskToDOM(newTask);
        taskInput.value = "";
    } catch (err) {
        alert("Couldn't add the new task.");
    }
});

    document.getElementById("search").addEventListener("input", function () {
         taskView.filterTasksBySearch(this.value.trim());
    });

    document.getElementById("taskToggle").addEventListener("click", function (e) {
        e.preventDefault();
        const dropdown = document.getElementById("taskDropdown");
        dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
    });

    document.getElementById("completedTasks").addEventListener("click", function (e) {
        e.preventDefault();
        taskView.filterTasksByStatus(true);
    });

    document.getElementById("pendingTasks").addEventListener("click", function (e) {
        e.preventDefault();
        taskView.filterTasksByStatus(false);
    });

        document.getElementById("priorityTasks").addEventListener("click", function (e) {
        e.preventDefault();
        taskModel.sortByPriority();
        taskView.reorderTaskElements(taskModel.taskArray);
    });

    try {
        const tasks = await taskModel.loadTasks();
        tasks.forEach(addTaskToDOM);
    } catch (err) {
        alert("Could not load tasks. Is the server running?");
    }
}

    