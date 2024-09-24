require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./src/database/db");
const authRoutes = require("./src/routes/auth");
const profileRoutes = require("./src/routes/profile");
const todoRoutes = require("./src/routes/todo");
const cors = require("cors");
const app = express();
const port = 3000;

const corsOptions = {
  //origin: "http://localhost:5173",
  //credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/todos", todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
