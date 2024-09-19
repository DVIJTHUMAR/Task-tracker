const Comment = require('../models/comment');
const Task = require('../models/task');

// Add a new comment to a task
exports.addComment = async (req, res) => {
  try {
    // Find the task to which the comment is being added
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    // Create a new comment
    const newComment = new Comment({
      text: req.body.text,
      task: req.params.taskId,
      user: req.user.id, // Assume req.user is set by authMiddleware
    });

    // Save the comment
    const comment = await newComment.save();

    // Optionally, you can add the comment ID to the task's comments array if needed
    task.comments.push(comment._id);
    await task.save();

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all comments for a specific task
exports.getComments = async (req, res) => {
  try {
    // Find the task and populate its comments
    const task = await Task.findById(req.params.taskId).populate('comments');
    if (!task) return res.status(404).json({ error: 'Task not found' });

    // Return the comments
    res.status(200).json(task.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Optionally, you can add update and delete functionality for comments if needed
