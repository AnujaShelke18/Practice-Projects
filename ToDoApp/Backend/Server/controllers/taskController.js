const Task = require('../models/Task');

// GET all tasks
async function getTasks(req, res) {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// POST a new task
async function createTask(req, res) {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Update Task
async function updateTask(req, res) {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

//Delete task
async function deleteTask(req, res) {
    try {const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
    res.json({ message: 'Task deleted' });
    
    } catch (err) {
        res.status(500).json({message: err.message});
    }

}

// Delete all tasks
async function deleteAll(req, res) {
    try {
        await Task.deleteMany({});
        res.json({ message: 'All tasks deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getTasks, createTask, updateTask, deleteTask, deleteAll };