const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/notifications', notificationRoutes);

module.exports = app;