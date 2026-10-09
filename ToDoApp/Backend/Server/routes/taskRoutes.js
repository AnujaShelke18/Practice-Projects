const express = require('express');
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    deleteAll
} = require('../controllers/taskController');

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);
router.delete('/', deleteAll);

module.exports = router;
