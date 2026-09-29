import * as taskModel from "./taskModel.js";
import * as taskView from "./taskView.js";

function getDefaultPriority() {
    return localStorage.getItem("defaultPriority") || "High";
}

function addTaskToDOM(task) {
    const { li, checkbox, deleteButton, prioritySelect } = taskView.createTaskElement(task);

    checkbox.addEventListener("change", function () {
        taskModel.toggleTaskStatus(parseInt(this.dataset.id), this.checked);
        this.nextElementSibling.classList.toggle("completed");
    });

    deleteButton.addEventListener("click", function () {
        taskModel.deleteTask(parseInt(this.dataset.id));
        li.remove();
    });

    prioritySelect.addEventListener("change", function () {
        taskModel.updateTaskPriority(parseInt(this.dataset.id), this.value);
    });

    document.getElementById("taskList").appendChild(li);
}

export function initTaskController() {
    document.getElementById("Addtask").addEventListener("click", function (e) {
        e.preventDefault();
        const taskInput = document.getElementById("input");
        const taskValue = taskInput.value.trim();
        if (taskValue === "") {
            alert("Please enter a task.");
            return;
        }
        taskInput.value = "";
        addTaskToDOM(taskModel.createTask(taskValue, getDefaultPriority()));
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
}