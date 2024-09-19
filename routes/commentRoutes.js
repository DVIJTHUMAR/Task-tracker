const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/add/:taskId', authMiddleware, commentController.addComment);
router.get('/:taskId', authMiddleware, commentController.getComments);

module.exports = router;