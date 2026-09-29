export let taskArray = [];
let idCounter = 0;

export function createTask(taskText, priority) {
    const newTask = { id: idCounter++, task: taskText, status: false, priority };
    taskArray.push(newTask);
    return newTask;
}

export function findTask(id) {
    return taskArray.find(t => t.id === id);
}

export function deleteTask(id) {
    taskArray = taskArray.filter(t => t.id !== id);
}

export function toggleTaskStatus(id, status) {
    const task = findTask(id);
    if (task) task.status = status;
}

export function updateTaskPriority(id, priority) {
    const task = findTask(id);
    if (task) task.priority = priority;
}

export function clearAllTasks() {
    taskArray = [];
}

export function sortByPriority() {
    const priorityRank = { High: 1, Medium: 2, Low: 3 };
    taskArray.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);
}