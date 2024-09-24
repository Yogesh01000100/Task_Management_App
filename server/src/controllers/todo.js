const db = require('../database/db');
const { v4: uuidv4 } = require('uuid');

exports.createTodo = (req, res) => {
    const { title, status } = req.body;
    const id = uuidv4();
    const userId = req.user.id;

    db.run(
        `INSERT INTO todos (id, user_id, title, status) VALUES (?, ?, ?, ?)`,
        [id, userId, title, status],
        function (err) {
            if (err) {
                return res.status(400).json({ error: 'Error creating todo' });
            }
            res.status(201).json({ message: 'Todo created successfully' });
        }
    );
};

exports.getTodos = (req, res) => {
    const userId = req.user.id;

    db.all(`SELECT * FROM todos WHERE user_id = ?`, [userId], (err, todos) => {
        if (err) {
            return res.status(400).json({ error: 'Error fetching todos' });
        }
        res.json(todos);
    });
};

exports.updateTodo = (req, res) => {
    const todoId = req.params.id;
    const { title, status } = req.body;
    const userId = req.user.id;

    db.run(
        `UPDATE todos SET title = ?, status = ? WHERE id = ? AND user_id = ?`,
        [title, status, todoId, userId],
        function (err) {
            if (err || this.changes === 0) {
                return res.status(400).json({ error: 'Error updating todo' });
            }
            res.json({ message: 'Todo updated successfully' });
        }
    );
};

exports.deleteTodo = (req, res) => {
    const todoId = req.params.id;
    const userId = req.user.id;

    db.run(
        `DELETE FROM todos WHERE id = ? AND user_id = ?`,
        [todoId, userId],
        function (err) {
            if (err || this.changes === 0) {
                return res.status(400).json({ error: 'Error deleting todo' });
            }
            res.json({ message: 'Todo deleted successfully' });
        }
    );
};
