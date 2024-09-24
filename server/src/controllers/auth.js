const db = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

exports.signup = (req, res) => {
    const { name, email, password } = req.body;
    const id = uuidv4();
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.run(
        `INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`,
        [id, name, email, hashedPassword],
        function (err) {
            if (err) {
                return res.status(400).json({ error: 'User already exists' });
            }
            res.status(201).json({ message: 'User created successfully' });
        }
    );
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY || 'key', { expiresIn: '12h' });
        res.json({ token });
    });
};
