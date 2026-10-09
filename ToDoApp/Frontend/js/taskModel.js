const API_URL = "http://localhost:5000/api/tasks";

export let taskArray = [];

export async function loadTasks() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to load tasks");
    taskArray = await res.json();
    return taskArray;
}

export async function createTask(taskText, priority) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: taskText, priority })
    });
    if (!res.ok) throw new Error("Failed to add task");
    const newTask = await res.json();
    taskArray.push(newTask);
    return newTask;
}

export function findTask(id) {
    return taskArray.find(t => t._id === id);
}

export async function deleteTask(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete task");
    taskArray = taskArray.filter(t => t._id !== id);
}

export async function toggleTaskStatus(id, status) {
    const res = await fetch(`${API_URL}/${id}`, {method: "PATCH", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: status }) 
    });
    if (!res.ok) throw new Error("Failed to update task");
    const task = findTask(id);
    if (task) task.completed = status;
}

export async function updateTaskPriority(id, priority) {
    const res = await fetch(`${API_URL}/${id}`, {method: "PATCH", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priority })
    });
    if (!res.ok) throw new Error("Failed to update task");
    const task = findTask(id);
    if (task) task.priority = priority;
}

export async function clearAllTasks() {
    const res = await fetch(API_URL, {method: "DELETE"});
    if (!res.ok) throw new Error("Failed to delete tasks");
    taskArray = [];
}

export function sortByPriority() {
    const priorityRank = { High: 1, Medium: 2, Low: 3 };
    taskArray.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);
}