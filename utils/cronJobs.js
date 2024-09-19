const cron = require('node-cron');
const Task = require('../models/task');
const sendNotification = require('./sendNotification');

const setupCronJobs = () => {
  cron.schedule('0 9 * * *', async () => {
    const now = new Date();
    const tasks = await Task.find({ dueDate: { $lte: now } });

    tasks.forEach(task => {
      // Example: Notify user about overdue task
      sendNotification(task.user, 'Task Due Soon',`Your task "${task.title}" is due soon.`);
    });
  });
};

module.exports = setupCronJobs;