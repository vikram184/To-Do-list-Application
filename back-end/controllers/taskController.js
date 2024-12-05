const Task = require('../models/Task');

// Create Task
exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = new Task({
      userId: req.user.id,
      title,
      description,
      createdAt: new Date(), // Add the createdAt timestamp
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  const { title, description, completed } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        completed,
        updatedAt: new Date(), // Add the updatedAt timestamp
      },
      { new: true }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
