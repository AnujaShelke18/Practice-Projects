export function createTaskElement(task) {
    const li = document.createElement("li");
    li.dataset.id = task.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.id = task.id;
    checkbox.checked = task.status;
    li.appendChild(checkbox);

    const span = document.createElement("span");
    span.innerHTML = task.task;
    if (task.status) span.classList.add("completed");
    li.appendChild(span);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
    deleteButton.dataset.id = task.id;
    li.appendChild(deleteButton);

    const prioritySelect = document.createElement("select");
    ["High", "Medium", "Low"].forEach(level => {
        const option = document.createElement("option");
        option.value = level;
        option.innerHTML = level;
        prioritySelect.appendChild(option);
    });
    prioritySelect.value = task.priority;
    prioritySelect.dataset.id = task.id;
    li.appendChild(prioritySelect);

    return { li, checkbox, span, deleteButton, prioritySelect };
}

export function filterTasksByStatus(statusToShow) {
    document.querySelectorAll("#taskList li").forEach(li => {
        const checkbox = li.querySelector('input[type="checkbox"]');
        li.style.display = checkbox.checked === statusToShow ? "list-item" : "none";
    });
}

export function filterTasksBySearch(searchValue) {
    document.querySelectorAll("#taskList li").forEach(li => {
        const text = li.querySelector("span").innerHTML;
        li.style.display = text.toUpperCase().includes(searchValue.toUpperCase()) ? "list-item" : "none";
    });
}

export function reorderTaskElements(sortedTasks) {
    const taskList = document.getElementById("taskList");
    sortedTasks.forEach(task => {
        const li = document.querySelector(`#taskList li[data-id="${task.id}"]`);
        if (li) taskList.appendChild(li);
    });
}

export function clearTaskListDOM() {
    document.getElementById("taskList").innerHTML = "";
}