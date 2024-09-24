const express = require('express');
const router = express.Router();
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todo');
const authenticateToken = require('../middlewares/auth');

router.post('/', authenticateToken, createTodo);
router.get('/', authenticateToken, getTodos);
router.put('/:id', authenticateToken, updateTodo);
router.delete('/:id', authenticateToken, deleteTodo);

module.exports = router;
