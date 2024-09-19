const Task = require('../models/task');
const User = require('../models/user');

// Create a new task
exports.createTask = async (req, res) => {
    console.log(req.body);
    
  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      user: req.user.id,     });

    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('user', 'name');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('user', 'name');
    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          dueDate: req.body.dueDate,
        },
      },
      { new: true } 
        ).populate('user', 'name');

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Assign a task to a user
exports.assignTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    task.user = user._id;
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
