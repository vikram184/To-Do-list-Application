const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const router = express.Router();

router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getAllTasks);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
