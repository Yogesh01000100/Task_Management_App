const db = require('../database/db');

exports.getProfile = (req, res) => {
    const userId = req.user.id;

    db.get(`SELECT id, name, email FROM users WHERE id = ?`, [userId], (err, user) => {
        if (err) {
            return res.status(400).json({ error: 'Error fetching profile' });
        }
        res.json(user);
    });
};

exports.updateProfile = (req, res) => {
    const userId = req.user.id;
    const { name, email, password } = req.body;
    const hashedPassword = password ? bcrypt.hashSync(password, 10) : undefined;

    db.run(
        `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`,
        [name, email, hashedPassword, userId],
        function (err) {
            if (err) {
                return res.status(400).json({ error: 'Error updating profile' });
            }
            res.json({ message: 'Profile updated successfully' });
        }
    );
};
