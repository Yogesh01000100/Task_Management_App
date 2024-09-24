const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/database/db');
const authRoutes = require('./src/routes/auth');
const profileRoutes = require('./src/routes/profile');
const todoRoutes = require('./src/routes/todo');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/todos', todoRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
