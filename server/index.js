require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/auth");
const profileRoutes = require("./src/routes/profile");
const todoRoutes = require("./src/routes/todo");
const cors = require("cors");
const app = express();
const port = 3000;

const corsOptions = {
  origin: 'https://todo-manager-client-app.vercel.app',
  //credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("#### test!");
});

app.listen(port, () => {
  console.log(`Server is running on :${port}`);
});
